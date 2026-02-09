const express = require('express');
const FormData = require('form-data');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

class AIChat {
  CREATED_BY = "Ditzzy";
  BASE_URL = "https://app.claila.com/api/v2";
  MODEL = "gpt-5-mini";
  CHAT_MODE = "chat";

  constructor() {
    this.sessionId = null;
    this.csrfToken = null;
    this.cookies = [];
  }

  async getCsrfToken() {
    try {
      const response = await fetch(`${this.BASE_URL}/getcsrftoken`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://app.claila.com/'
        }
      });
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) this.cookies.push(setCookie);
      return (await response.text()).trim();
    } catch (e) { throw new Error("Gagal CSRF"); }
  }

  async downloadImage(url) {
    try {
      const res = await fetch(url, {
        headers: { 'Cookie': this.cookies.join('; '), 'X-CSRF-Token': this.csrfToken }
      });
      const buffer = await res.buffer();
      return `data:${res.headers.get('content-type')};base64,${buffer.toString('base64')}`;
    } catch (e) { return null; }
  }

  parseUrls(text) {
    const urls = [];
    const imgRegex = /!\[.*?\]\((.*?)\)/g;
    const linkRegex = /(?<!\!)\[.*?\]\((.*?)\)/g;
    let m;
    while ((m = imgRegex.exec(text))) urls.push({ type: 'image', url: m[1] });
    while ((m = linkRegex.exec(text))) urls.push({ type: 'link', url: m[1] });
    return urls;
  }

  async sendMessage(msg) {
    if (!this.sessionId) {
      this.sessionId = Math.floor(Date.now() / 1000);
      this.csrfToken = await this.getCsrfToken();
    }
    const form = new FormData();
    form.append("model", this.MODEL);
    form.append("message", msg);
    form.append("sessionId", this.sessionId.toString());
    form.append("chat_mode", this.CHAT_MODE);

    const res = await fetch(`${this.BASE_URL}/aichat`, {
      method: "POST",
      headers: { 'X-CSRF-Token': this.csrfToken, 'Cookie': this.cookies.join('; '), ...form.getHeaders() },
      body: form
    });

    const text = await res.text();
    const urls = this.parseUrls(text);
    for (let u of urls) { if (u.type === 'image') u.base64 = await this.downloadImage(u.url); }

    return { results: { message: text, urls } };
  }
}

const bot = new AIChat();

app.post('/api/chat', async (req, res) => {
  try {
    const out = await bot.sendMessage(req.body.message);
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = app;
