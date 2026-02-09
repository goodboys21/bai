const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const response = await axios.post(
      "https://chatgpt4online.org/wp-json/mwai/v1/start_session",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        timeout: 15000,
      }
    );

    const data = response.data;

    if (!data || data.success !== true) {
      return res.status(500).json({
        success: false,
        error: "Gagal memulai sesi",
      });
    }

    return res.json({
      success: true,
      sessionId: data.sessionId,
      nonce: data.restNonce,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
};
