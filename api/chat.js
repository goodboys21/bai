const express = require('express');
const FormData = require('form-data');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

class AIChat {
    CREATED_BY = "Ditzzy";
    NOTE = "Thank you for using this scrape, I hope you appreciate me for making this scrape by not deleting wm";
    BASE_URL = "https://app.claila.com/api/v2";
    MODEL = "gpt-5-mini";
    CHAT_MODE = "chat";

    sessionId = null;
    csrfToken = null;
    cookies = [];

    wrapResponse(data) {
        return {
            created_by: this.CREATED_BY,
            note: this.NOTE,
            results: data
        };
    }

    async getCsrfToken() {
        try {
            const response = await fetch(`${this.BASE_URL}/getcsrftoken`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://app.claila.com/',
                    'Origin': 'https://app.claila.com'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to get CSRF token: ${response.statusText}`);
            }

            const setCookie = response.headers.get('set-cookie');
            if (setCookie) {
                this.cookies.push(setCookie);
            }

            const token = await response.text();
            return token.trim();
        } catch (error) {
            throw new Error(`Error fetching CSRF token: ${error}`);
        }
    }

    async downloadImage(imageUrl) {
        try {
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://app.claila.com/',
                'Origin': 'https://app.claila.com',
                'X-CSRF-Token': this.csrfToken
            };

            if (this.cookies.length > 0) {
                headers['Cookie'] = this.cookies.join('; ');
            }

            const response = await fetch(imageUrl, { headers });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type') || '';
            if (!contentType.startsWith('image/')) {
                const text = await response.text();
                throw new Error(`Response is not image. Content-Type: ${contentType}`);
            }

            const buffer = await response.buffer();
            if (buffer.length < 100) {
                throw new Error(`File terlalu kecil, korup kali njir`);
            }

            const base64 = `data:${contentType};base64,${buffer.toString('base64')}`;
            return { base64, buffer, contentType };
        } catch (error) {
            console.error(`Error downloading image from ${imageUrl}:`, error);
            throw error;
        }
    }

    parseUrls(text) {
        const urls = [];
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        let match;

        while ((match = imageRegex.exec(text)) !== null) {
            urls.push({
                type: 'image',
                url: match[2],
                alt: match[1] || undefined
            });
        }

        const linkRegex = /(?<!!)\[([^\]]*)\]\(([^)]+)\)/g;
        while ((match = linkRegex.exec(text)) !== null) {
            urls.push({
                type: 'link',
                url: match[2],
                alt: match[1] || undefined
            });
        }

        const plainUrlRegex = /(?<![\[\(])(https?:\/\/[^\s\)]+)(?![\]\)])/g;
        while ((match = plainUrlRegex.exec(text)) !== null) {
            const alreadyFound = urls.some(u => u.url === match[1]);
            if (!alreadyFound) {
                const isImage = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(match[1]) ||
                                match[1].includes('/image/');
                urls.push({
                    type: isImage ? 'image' : 'link',
                    url: match[1]
                });
            }
        }

        return urls;
    }

    async startChat() {
        this.sessionId = Math.floor(Date.now() / 1000);
        this.csrfToken = await this.getCsrfToken();
    }

    async sendMessage(message, options = {}) {
        if (!this.sessionId || !this.csrfToken) {
            await this.startChat();
        }

        const {
            websearch = false,
            tmp_enabled = 0,
            downloadImages = true
        } = options;

        try {
            const formData = new FormData();
            formData.append("model", this.MODEL);
            formData.append("message", message);
            formData.append("sessionId", this.sessionId.toString());
            formData.append("chat_mode", this.CHAT_MODE);
            formData.append("websearch", websearch.toString());
            formData.append("tmp_enabled", tmp_enabled.toString());

            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://app.claila.com/',
                'Origin': 'https://app.claila.com',
                'X-CSRF-Token': this.csrfToken,
                'Cookie': this.cookies.join('; '),
                ...formData.getHeaders()
            };

            const response = await fetch(`${this.BASE_URL}/aichat`, {
                method: "POST",
                headers,
                body: formData
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            const setCookie = response.headers.get('set-cookie');
            if (setCookie) {
                this.cookies.push(setCookie);
            }

            const responseText = await response.text();
            const parsedUrls = this.parseUrls(responseText);

            if (downloadImages) {
                for (const urlObj of parsedUrls) {
                    if (urlObj.type === 'image') {
                        try {
                            const imgData = await this.downloadImage(urlObj.url);
                            urlObj.base64 = imgData.base64;
                            urlObj.contentType = imgData.contentType;
                        } catch (error) {
                            urlObj.error = error.message;
                        }
                    }
                }
            }

            return this.wrapResponse({
                sessionId: this.sessionId,
                message: responseText,
                websearch,
                tmp_enabled,
                urls: parsedUrls
            });
        } catch (error) {
            throw new Error(`Error sending message: ${error}`);
        }
    }
}

// Inisialisasi Bot
const aiBot = new AIChat();

// Handler API untuk Vercel
app.post('/api/chat', async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Pesan kosong" });

        const result = await aiBot.sendMessage(message, {
            downloadImages: true // Kita nyalakan supaya base64 dikirim ke frontend
        });

        res.json(result);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
