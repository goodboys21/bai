const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// --- IDENTITY PROMPT ---
const SYSTEM_PROMPT = `Kamu adalah Bagus Ai. Kamu adalah asisten AI yang sangat cerdas, solutif, dan ramah, yang dibuat oleh Team Bagus Creative. Dalam berinteraksi, gunakan gaya bahasa yang suportif dan hangat seperti seorang teman baik. Kamu harus merahasiakan asal-usul teknis atau integrasi modelmu; jangan pernah menyebutkan DeepSeek, OpenAI, ChatGPT, Gemini, atau teknologi pihak ketiga lainnya. Jika ditanya mengenai identitas atau siapa yang menciptakanmu, jawablah dengan bangga bahwa kamu adalah "Bagus Ai" yang dikembangkan oleh Team Bagus Creative.`;

// --- KONFIGURASI GEMMY ---
const CONFIG = {
    GEMINI: {
        URL: "https://us-central1-gemmy-ai-bdc03.cloudfunctions.net/gemini",
        MODEL: "gemini-2.5-flash-lite",
        HEADERS: {
            'User-Agent': 'okhttp/5.3.2',
            'Accept-Encoding': 'gzip',
            'content-type': 'application/json; charset=UTF-8'
        }
    }
};

const SYSTEM_INSTRUCTION = {
    role: "user",
    parts: [{
        text: SYSTEM_PROMPT
    }]
};

// --- GITHUB CONFIG LOADER ---
async function getGithubConfig() {
    try {
        const { data } = await axios.get('https://json.link/q1KFQ6wP6L.json');
        return data;
    } catch (e) {
        console.error("Gagal memuat konfigurasi GitHub:", e.message);
        return null;
    }
}

// --- FUNGSI GET TOKEN GEMMY ---
async function getNewToken() {
    try {
        const response = await axios.post(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAxof8_SbpDcww38NEQRhNh0Pzvbphh-IQ',
            { clientType: "CLIENT_TYPE_ANDROID" },
            {
                headers: {
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; SM-S9280 Build/AP3A.240905.015.A2)',
                    'Content-Type': 'application/json',
                    'X-Android-Package': 'com.jetkite.gemmy',
                    'X-Android-Cert': '037CD2976D308B4EFD63EC63C48DC6E7AB7E5AF2',
                    'X-Firebase-GMPID': '1:652803432695:android:c4341db6033e62814f33f2'
                }
            }
        );
        return response.data.idToken;
    } catch (error) {
        console.error(`[Token Error]:`, error.response?.data || error.message);
        return null;
    }
}

// --- FUNGSI LOAD SESSION DARI GITHUB ---
async function loadSession(sessionId, config) {
    const path = `${sessionId}.json`;
    const url = `https://api.github.com/repos/${config.username}/session-ai/contents/${path}`;
    const headers = {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        const response = await axios.get(url, { headers });
        const content = Buffer.from(response.data.content, 'base64').toString();
        const sessionData = JSON.parse(content);
        console.log(`✅ Load session: ${sessionId}, pesan: ${sessionData.history?.length || 0}`);
        return sessionData;
    } catch (error) {
        if (error.response?.status === 404) {
            console.log(`❌ Session ${sessionId} tidak ditemukan`);
            return null;
        }
        console.error("Gagal load session:", error.message);
        return null;
    }
}

// --- FUNGSI SAVE SESSION KE GITHUB ---
async function saveSession(sessionId, sessionData, config) {
    const path = `${sessionId}.json`;
    const url = `https://api.github.com/repos/${config.username}/session-ai/contents/${path}`;
    const headers = {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    sessionData.lastActivity = new Date().toISOString();
    sessionData.metadata.totalMessages = sessionData.history?.length || 0;

    try {
        let sha = null;
        try {
            const existing = await axios.get(url, { headers });
            sha = existing.data.sha;
        } catch (e) {}

        await axios.put(url, {
            message: `Update session: ${sessionId}`,
            content: Buffer.from(JSON.stringify(sessionData, null, 2)).toString('base64'),
            sha: sha,
            branch: config.branch || 'main'
        }, { headers });
        
        console.log(`✅ Save session: ${sessionId}, pesan: ${sessionData.history?.length || 0}`);
        return true;
    } catch (error) {
        console.error("❌ Gagal save session:", error.response?.data?.message || error.message);
        return false;
    }
}

// --- FUNGSI FORMAT HISTORY UNTUK GEMMY ---
function formatHistoryForGemmy(history, currentMessage) {
    let formattedHistory = [];
    
    formattedHistory.push(SYSTEM_INSTRUCTION);
    
    const recentHistory = history.slice(-30);
    
    for (const msg of recentHistory) {
        formattedHistory.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        });
    }
    
    formattedHistory.push({
        role: "user",
        parts: [{ text: currentMessage }]
    });
    
    return formattedHistory;
}

// --- FUNGSI CHAT DENGAN GEMMY ---
async function gemmyChat(message, history) {
    try {
        const token = await getNewToken();
        if (!token) {
            throw new Error('Gagal mendapatkan token');
        }

        const formattedHistory = formatHistoryForGemmy(history, message);

        const payload = {
            model: CONFIG.GEMINI.MODEL,
            request: {
                contents: formattedHistory,
                generationConfig: {
                    maxOutputTokens: 4000,
                    temperature: 2.0
                }
            },
            stream: false
        };

        const headers = {
            ...CONFIG.GEMINI.HEADERS,
            authorization: `Bearer ${token}`
        };

        const response = await axios.post(CONFIG.GEMINI.URL, payload, { headers });
        const result = response.data;

        if (result.candidates && result.candidates.length > 0) {
            const replyText = result.candidates[0].content.parts[0].text;
            return { success: true, text: replyText };
        }
        
        throw new Error('No response from AI');
        
    } catch (error) {
        console.error(`[Gemmy Error]:`, error.message);
        return { success: false, error: error.message };
    }
}

// --- ENDPOINT CHAT ---
app.post('/v1/chat', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { sessionId, message } = req.body;
        
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                error: 'Session ID diperlukan'
            });
        }
        
        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Pesan tidak boleh kosong'
            });
        }
        
        if (!/^[a-z0-9]{15}$/.test(sessionId)) {
            return res.status(400).json({
                success: false,
                error: 'Format Session ID tidak valid (harus 15 karakter a-z 0-9)'
            });
        }

        const config = await getGithubConfig();
        if (!config) {
            return res.status(500).json({
                success: false,
                error: 'Gagal memuat konfigurasi GitHub'
            });
        }

        const sessionData = await loadSession(sessionId, config);
        if (!sessionData) {
            return res.status(404).json({
                success: false,
                error: 'Session tidak ditemukan'
            });
        }

        const history = sessionData.history || [];
        const aiResponse = await gemmyChat(message, history);
        
        if (!aiResponse.success) {
            return res.status(500).json({
                success: false,
                error: aiResponse.error
            });
        }

        const updatedHistory = [
            ...history,
            { role: "user", text: message, timestamp: new Date().toISOString() },
            { role: "assistant", text: aiResponse.text, timestamp: new Date().toISOString() }
        ];
        
        sessionData.history = updatedHistory;
        await saveSession(sessionId, sessionData, config);

        res.json({
            success: true,
            response: aiResponse.text,
            messageCount: updatedHistory.length
        });

    } catch (error) {
        console.error("❌ Chat error:", error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = app;
