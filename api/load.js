const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// --- GITHUB CONFIG LOADER ---
async function getGithubConfig() {
    try {
        const { data } = await axios.get('https://json.link/q1KFQ6wP6L.json');
        return data; // Mengambil token, username, repo, dan branch
    } catch (e) {
        console.error("Gagal memuat konfigurasi GitHub dari json.link");
        return null;
    }
}

// --- ENDPOINT: LOAD HISTORY ---
app.get('/api/load/:sessionId', async (req, res) => {
    // CORS Headers agar bisa diakses dari frontend domain manapun
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { sessionId } = req.params;

    try {
        const config = await getGithubConfig();
        if (!config) {
            return res.status(500).json({ error: "Gagal konfigurasi database" });
        }

        // URL Raw GitHub untuk mengambil konten file JSON secara langsung
        const url = `https://raw.githubusercontent.com/${config.username}/${config.repo}/${config.branch}/sessions/${sessionId}.json`;
        
        // Kita gunakan header Authorization agar bisa mengakses file di repo PRIVATE
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        // Kirimkan array pesan ke frontend
        res.json(response.data); 

    } catch (e) {
        if (e.response && e.response.status === 404) {
            res.status(404).json({ error: "Sesi percakapan tidak ditemukan di database" });
        } else {
            console.error("Error Load:", e.message);
            res.status(500).json({ error: "Gagal mengambil data dari GitHub" });
        }
    }
});

module.exports = app;
