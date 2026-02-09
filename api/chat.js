const express = require('express');
const FormData = require('form-data');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// --- CLASS AIChat (Integrated Scraper) ---
class AIChat {
  CREATED_BY = "Ditzzy";
  NOTE = "Thank you for using this scrape, I hope you appreciate me for making this scrape by not deleting wm";
  BASE_URL = "https://app.claila.com/api/v2";
  MODEL = "gpt-5-mini";
  CHAT_MODE = "chat";

  constructor() {
    this.sessionId = null;
    this.csrfToken = null;
    this.cookies = [];
  }

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
          'Referer': 'https://app.claila.com/',
          'Origin': 'https://app.claila.com'
        }
      });
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) this.cookies.push(setCookie);
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
        'X-CSRF-Token': this.csrfToken,
        'Cookie': this.cookies.join('; ')
      };
      const response = await fetch(imageUrl, { headers });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const contentType = response.headers.get('content-type') || '';
      const buffer = await response.buffer();
      const base64 = `data:${contentType};base64,${buffer.toString('base64')}`;
      return { base64, buffer, contentType };
    } catch (error) {
      console.error(`Error downloading image: ${error}`);
      return null;
    }
  }

  parseUrls(text) {
    const urls = [];
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const linkRegex = /(?<!!)\[([^\]]*)\]\(([^)]+)\)/g;
    const plainUrlRegex = /(?<![\[\(])(https?:\/\/[^\s\)]+)(?![\]\)])/g;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
      urls.push({ type: 'image', url: match[2], alt: match[1] || undefined });
    }
    while ((match = linkRegex.exec(text)) !== null) {
      urls.push({ type: 'link', url: match[2], alt: match[1] || undefined });
    }
    while ((match = plainUrlRegex.exec(text)) !== null) {
      if (!urls.some(u => u.url === match[1])) {
        const isImage = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(match[1]) || match[1].includes('/image/');
        urls.push({ type: isImage ? 'image' : 'link', url: match[1] });
      }
    }
    return urls;
  }

  async startChat() {
    this.sessionId = Math.floor(Date.now() / 1000);
    this.csrfToken = await this.getCsrfToken();
  }

  async sendMessage(message, options = {}) {
    if (!this.sessionId || !this.csrfToken) await this.startChat();
    const { websearch = false, tmp_enabled = 0, downloadImages = true } = options;

    try {
      const formData = new FormData();
      formData.append("model", this.MODEL);
      formData.append("message", message);
      formData.append("sessionId", this.sessionId.toString());
      formData.append("chat_mode", this.CHAT_MODE);
      formData.append("websearch", websearch.toString());
      formData.append("tmp_enabled", tmp_enabled.toString());

      const response = await fetch(`${this.BASE_URL}/aichat`, {
        method: "POST",
        headers: {
          'X-CSRF-Token': this.csrfToken,
          'Cookie': this.cookies.join('; '),
          ...formData.getHeaders()
        },
        body: formData
      });

      const setCookie = response.headers.get('set-cookie');
      if (setCookie) this.cookies.push(setCookie);

      const responseText = await response.text();
      const parsedUrls = this.parseUrls(responseText);

      if (downloadImages) {
        for (const urlObj of parsedUrls) {
          if (urlObj.type === 'image') {
            const imgData = await this.downloadImage(urlObj.url);
            if (imgData) urlObj.base64 = imgData.base64;
          }
        }
      }

      return this.wrapResponse({
        sessionId: this.sessionId,
        message: responseText,
        urls: parsedUrls
      });
    } catch (error) {
      throw new Error(`Error sending message: ${error}`);
    }
  }
}

// Inisialisasi Bot secara global (singleton untuk satu instance serverless)
const aiBot = new AIChat();

// --- ROUTE HANDLER ---
app.all('/api/chat', async (req, res) => {
  // Izinkan CORS supaya HTML lo bisa akses dari mana aja
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const message = req.method === 'POST' ? req.body.message : req.query.message;
    if (!message) return res.status(400).json({ error: "Isi pesan dulu Sob!" });

    const response = await aiBot.sendMessage(message);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export untuk Vercel
module.exports = app;

// Jalankan jika di local
if (require.main === module) {
  app.listen(3000, () => console.log("Local server running on port 3000"));
}
