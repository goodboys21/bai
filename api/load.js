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

// --- ENDPOINT: LOAD HISTORY ---
app.post('/v1/load', async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

        // URL Raw GitHub untuk mengambil konten file JSON
        const url = `https://raw.githubusercontent.com/${config.username}/coigus/${config.branch}/sessions/${sessionId}.json`;
        
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        // Kirim data session
        res.json({
            success: true,
            sessionId: sessionId,
            data: response.data
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
