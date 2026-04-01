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
        console.error("Gagal memuat konfigurasi GitHub dari json.link");
        return null;
    }
}

// --- ENDPOINT: LOAD HISTORY (LANGSUNG KE GITHUB API) ---
app.post('/v1/session/check', async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Anti-cache headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { sessionId } = req.body;
        
        // Validasi sessionId
        if (!sessionId) {
            return res.status(400).json({ 
                success: false,
                error: "Session ID diperlukan" 
            });
        }
        
        if (!/^[a-z0-9]{15}$/.test(sessionId)) {
            return res.status(400).json({ 
                success: false,
                error: "Format Session ID tidak valid (harus 15 karakter a-z 0-9)" 
            });
        }

        const config = await getGithubConfig();
        if (!config) {
            return res.status(500).json({ 
                success: false,
                error: "Gagal konfigurasi database" 
            });
        }

        // Pake GitHub API (bukan raw) dengan timestamp biar ga kena cache
        const path = `${sessionId}.json`;
        const url = `https://api.github.com/repos/${config.username}/session-ai/contents/${path}`;
        
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'If-None-Match': '', // Force fresh request
                'Cache-Control': 'no-cache'
            },
            params: {
                ref: config.branch || 'main',
                t: Date.now() // Force unique request
            }
        });

        // Decode content dari base64
        const content = Buffer.from(response.data.content, 'base64').toString();
        const sessionData = JSON.parse(content);

        // Kirim data session
        res.json({
            success: true,
            sessionId: sessionId,
            data: sessionData
        });

    } catch (e) {
        if (e.response && e.response.status === 404) {
            res.status(404).json({ 
                success: false,
                error: "Session tidak ditemukan di database" 
            });
        } else {
            console.error("Error Load:", e.message);
            res.status(500).json({ 
                success: false,
                error: "Gagal mengambil data dari GitHub: " + e.message 
            });
        }
    }
});

module.exports = app;
