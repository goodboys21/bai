const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

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

// --- FUNGSI GENERATE SESSION ID (15 digit random) ---
function generateSessionId() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// --- FUNGSI CEK ATAU BUAT REPO SESSION-AI ---
async function ensureRepoExists(config) {
    const repoUrl = `https://api.github.com/repos/${config.username}/session-ai`;
    const headers = {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        // Cek repo sudah ada atau belum
        await axios.get(repoUrl, { headers });
        console.log("✅ Repo session-ai sudah ada");
        return true;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Buat repo baru
            console.log("📁 Repo session-ai belum ada, membuat baru...");
            try {
                await axios.post('https://api.github.com/user/repos', {
                    name: 'session-ai',
                    description: 'Session storage for Bagus Ai',
                    private: false,
                    auto_init: true
                }, { headers });
                console.log("✅ Repo session-ai berhasil dibuat");
                return true;
            } catch (createError) {
                console.error("❌ Gagal membuat repo:", createError.response?.data?.message || createError.message);
                return false;
            }
        }
        console.error("❌ Error cek repo:", error.message);
        return false;
    }
}

// --- FUNGSI BUAT FILE SESSION DI GITHUB ---
async function createSessionFile(sessionId, config) {
    const path = `${sessionId}.json`;
    const url = `https://api.github.com/repos/${config.username}/session-ai/contents/${path}`;
    const headers = {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    // Data session
    const sessionData = {
        sessionId: sessionId,
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        history: [],
        metadata: {
            totalMessages: 0
        }
    };

    try {
        await axios.put(url, {
            message: `Create session: ${sessionId}`,
            content: Buffer.from(JSON.stringify(sessionData, null, 2)).toString('base64'),
            branch: config.branch || 'main'
        }, { headers });
        
        console.log(`✅ Session ${sessionId} berhasil dibuat`);
        return true;
    } catch (error) {
        console.error("❌ Gagal membuat file session:", error.response?.data?.message || error.message);
        return false;
    }
}

// --- ENDPOINT CREATE SESSION ---
app.post('/v1/session/create', async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 1. Ambil config GitHub
        const config = await getGithubConfig();
        if (!config) {
            return res.status(500).json({
                success: false,
                error: 'Gagal memuat konfigurasi GitHub'
            });
        }

        // 2. Pastikan repo session-ai ada
        const repoReady = await ensureRepoExists(config);
        if (!repoReady) {
            return res.status(500).json({
                success: false,
                error: 'Gagal menyiapkan repository session-ai'
            });
        }

        // 3. Generate session ID
        let sessionId = generateSessionId();
        let created = false;
        let attempts = 0;

        // Coba buat file, jika gagal karena sudah ada, generate ulang
        while (!created && attempts < 3) {
            created = await createSessionFile(sessionId, config);
            if (!created) {
                sessionId = generateSessionId();
                attempts++;
            }
        }

        if (!created) {
            return res.status(500).json({
                success: false,
                error: 'Gagal membuat session, coba lagi nanti'
            });
        }

        // 4. Kirim response sukses
        res.json({
            success: true,
            sessionId: sessionId,
            message: 'Session berhasil dibuat',
            createdAt: new Date().toISOString()
        });

    } catch (error) {
        console.error("❌ Create session error:", error.message);
        res.status(500).json({
            success: false,
            error: 'Internal server error: ' + error.message
        });
    }
});

// --- TEST ENDPOINT (optional) ---
app.get('/', (req, res) => {
    res.json({
        service: 'Bagus Ai Session Creator',
        version: '1.0',
        endpoints: {
            createSession: 'POST /v1/create-session'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Endpoint: POST http://localhost:${PORT}/v1/create-session`);
});

module.exports = app;
