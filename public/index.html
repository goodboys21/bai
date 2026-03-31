<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover">
    <title>Bagus Ai</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #1a1a1a;
            --sidebar-bg: #f5f5f7;
            --card-bg: #f0f0f2;
            --border-color: #ddd;
            --input-bg: #f0f0f2;
            --icon-color: #555;
            --theme-icon: #f59e0b;
            --user-bubble: #e3f2fd;
            --ai-bubble: #f1f1f1;
            --shadow: rgba(0,0,0,0.05);
            --accent-color: #8b8bff;
        }

        [data-theme="dark"] {
            --bg-color: #0a0a0a;
            --text-color: white;
            --sidebar-bg: #0f0f12;
            --card-bg: #1e1e1e;
            --border-color: #333;
            --input-bg: #1e1e1e;
            --icon-color: #888;
            --theme-icon: #a78bfa;
            --user-bubble: #0b3d91;
            --ai-bubble: #262626;
            --shadow: rgba(0,0,0,0.3);
        }

        * {
            margin: 0; padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        html, body {
            background-color: var(--bg-color);
            color: var(--text-color);
            height: 100%; width: 100%;
            overflow: hidden; 
            position: fixed; left: 0; top: 0;
        }

        #preloader-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: var(--bg-color); display: flex; flex-direction: column;
            align-items: center; justify-content: center; z-index: 9999;
        }

        .loader {
            position: relative; width: 3.5em; height: 3.5em;
            transform: rotate(165deg); margin-bottom: 25px;
        }

        .loader:before, .loader:after {
            content: ""; position: absolute; top: 50%; left: 50%; display: block;
            width: 0.6em; height: 0.6em; border-radius: 0.3em; transform: translate(-50%, -50%);
        }

        .loader:before { animation: before8 2s infinite; }
        .loader:after { animation: after6 2s infinite; }

        @keyframes before8 {
            0% { width: 0.6em; box-shadow: 1.2em -0.6em rgba(225, 20, 98, 0.75), -1.2em 0.6em rgba(111, 202, 220, 0.75); }
            35% { width: 3.5em; box-shadow: 0 -0.6em rgba(225, 20, 98, 0.75), 0 0.6em rgba(111, 202, 220, 0.75); }
            70% { width: 0.6em; box-shadow: -1.2em -0.6em rgba(225, 20, 98, 0.75), 1.2em 0.6em rgba(111, 202, 220, 0.75); }
            100% { box-shadow: 1.2em -0.6em rgba(225, 20, 98, 0.75), -1.2em 0.6em rgba(111, 202, 220, 0.75); }
        }

        @keyframes after6 {
            0% { height: 0.6em; box-shadow: 0.6em 1.2em rgba(61, 184, 143, 0.75), -0.6em -1.2em rgba(233, 169, 32, 0.75); }
            35% { height: 3.5em; box-shadow: 0.6em 0 rgba(61, 184, 143, 0.75), -0.6em 0 rgba(233, 169, 32, 0.75); }
            70% { height: 0.6em; box-shadow: 0.6em -1.2em rgba(61, 184, 143, 0.75), -0.6em 1.2em rgba(233, 169, 32, 0.75); }
            100% { box-shadow: 0.6em 1.2em rgba(61, 184, 143, 0.75), -0.6em -1.2em rgba(233, 169, 32, 0.75); }
        }

        .loading-text { font-size: 14px; letter-spacing: 2px; opacity: 0.8; }

        #content-ready {
            height: 100%; width: 100%;
            display: flex; flex-direction: column;
            filter: blur(20px); transition: filter 1s ease;
            position: relative;
        }

        header {
            flex-shrink: 0; height: 60px; padding: 0 20px;
            display: flex; justify-content: space-between; align-items: center;
            background-color: var(--bg-color); z-index: 2000; border-bottom: 1px solid var(--border-color);
        }
        .header-left { display: flex; align-items: center; gap: 15px; }
        .header-logo-text { font-weight: 700; font-size: 18px; }
        .header-actions { display: flex; align-items: center; gap: 18px; }
        .burger-btn, .theme-toggle, .new-chat-btn { cursor: pointer; font-size: 20px; color: var(--icon-color); }

        #sidebar {
            position: fixed; top: 0; left: -280px; width: 280px; height: 100%;
            background-color: var(--sidebar-bg); z-index: 4000;
            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 20px; display: flex; flex-direction: column; border-right: 1px solid var(--border-color);
        }
        #sidebar.open { left: 0; }
        #overlay-bg { 
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); display: none; z-index: 3500; 
            opacity: 0; transition: opacity 0.3s ease;
        }

        .sidebar-header { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
        .sidebar-logo { background: #2a2a3c; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--accent-color); font-size: 20px; }
        .menu-label { color: #888; font-size: 11px; font-weight: bold; text-transform: uppercase; margin: 15px 0 10px 0; }
        .menu-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; cursor: pointer; color: var(--text-color); font-size: 14px; margin-bottom: 4px; }
        .menu-item.active { background: rgba(139, 139, 255, 0.15); color: var(--accent-color); font-weight: 500; }
        .history-list { flex: 1; overflow-y: auto; }
        .history-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; margin-bottom: 8px; border-radius: 10px; font-size: 14px; }
        .trash-btn { color: #ff4d4d !important; cursor: pointer; padding: 5px; }

        #app-container { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 20px; display: flex; flex-direction: column; position: relative; }
        
        .welcome-view { 
            width: 100%; max-width: 450px; text-align: center; margin: auto; 
            display: flex; flex-direction: column; align-items: center; gap: 20px;
            transition: transform 0.4s ease, opacity 0.4s ease; 
        }
        h1 { font-size: 32px; font-weight: bold; min-height: 40px; }
        .sob-container { color: #f472b6; border-right: 3px solid var(--accent-color); animation: blink 0.7s infinite; }
        @keyframes blink { 50% { border-color: transparent; } }

        .suggestion-list { width: 100%; display: flex; flex-direction: column; gap: 12px; transition: 0.4s ease; }
        .suggestion-list.hide { transform: translateY(20px); opacity: 0; pointer-events: none; }
        .card { background: var(--card-bg); padding: 16px; border-radius: 15px; font-size: 14px; text-align: left; cursor: pointer; box-shadow: 0 2px 4px var(--shadow); width: 100%; }

        #chat-window { width: 100%; max-width: 600px; margin: 0 auto; display: none; flex-direction: column; gap: 15px; padding-bottom: 10px; }
        .bubble { max-width: 85%; padding: 12px 16px; border-radius: 20px; font-size: 15px; line-height: 1.4; animation: bubblePop 0.3s ease-out; position: relative; }
        @keyframes bubblePop { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .user-bubble { align-self: flex-end; background-color: var(--user-bubble); border-bottom-right-radius: 4px; }
        .ai-bubble { align-self: flex-start; background-color: var(--ai-bubble); border-bottom-left-radius: 4px; padding-bottom: 35px; }

        .copy-btn { position: absolute; bottom: 8px; left: 16px; font-size: 11px; cursor: pointer; opacity: 0.6; display: flex; align-items: center; gap: 5px; }
        .typing-dots { display: flex; gap: 4px; padding: 10px 0; }
        .dot { width: 6px; height: 6px; background: var(--icon-color); border-radius: 50%; animation: dotPulse 1s infinite alternate; }
        @keyframes dotPulse { from { opacity: 0.4; } to { opacity: 1; } }

        /* Style untuk gambar di chat bubble - Style WA */
        .chat-image-container {
            margin-top: 8px;
            position: relative;
            display: inline-block;
            width: 200px;
            height: 200px;
            border-radius: 16px;
            overflow: hidden;
            background: var(--card-bg);
            cursor: pointer;
        }
        
        .chat-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.2s;
        }
        
        .chat-image:hover {
            transform: scale(1.02);
        }
        
        /* Style untuk pesan yang memiliki gambar */
        .message-with-image {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        
        .message-text {
            word-wrap: break-word;
        }
        
        /* Style preview gambar di input (1:1) */
        .image-preview-container {
            position: relative;
            width: 60px;
            height: 60px;
            border-radius: 12px;
            overflow: hidden;
            background: var(--card-bg);
            margin-bottom: 8px;
            display: inline-block;
        }
        
        .image-preview-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .remove-img-btn {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ff4d4d;
            color: white;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
            border: 2px solid var(--bg-color);
            z-index: 10;
        }
        
        .remove-img-btn:hover {
            background: #ff3333;
            transform: scale(1.05);
        }
        
        /* Preview area di input */
        .preview-area {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;
            flex-wrap: wrap;
        }

        footer { flex-shrink: 0; padding: 10px 15px; background-color: var(--bg-color); z-index: 2000; border-top: 1px solid var(--border-color); }
        .input-box { width: 100%; max-width: 500px; margin: 0 auto; background: var(--input-bg); border-radius: 24px; padding: 8px 16px; border: 1px solid var(--border-color); }
        .input-row { display: flex; align-items: flex-end; gap: 12px; width: 100%; }
        
        textarea {
            background: transparent; border: none; outline: none; color: var(--text-color); 
            flex: 1; font-size: 16px; padding: 10px 0; resize: none; max-height: 150px;
            line-height: 1.5; overflow-y: auto;
        }

        .icon-btn { color: var(--icon-color); cursor: pointer; font-size: 18px; margin-bottom: 10px; }
        #inner-preview { display: none; }
        
        /* Modal untuk preview gambar */
        .image-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .image-modal img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
        }
    </style>
</head>
<body>

    <div id="preloader-overlay"><div class="loader"></div><div class="loading-text">Loading...</div></div>

    <div id="content-ready">
        <div id="overlay-bg"></div>
        <div id="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo"><i class="fa-solid fa-microchip"></i></div>
                <span style="font-weight: 700; font-size: 18px;">Bagus Ai<span style="color:var(--accent-color);">.</span></span>
            </div>
            <p class="menu-label">Platform</p>
            <div class="menu-item active"><i class="fa-regular fa-comment-dots"></i> Chat AI</div>
            <div class="menu-item"><i class="fa-solid fa-wand-magic-sparkles"></i> Create Image</div>
            <div class="menu-item"><i class="fa-solid fa-paintbrush"></i> Edit Image</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 25px;">
                <p class="menu-label" style="margin: 0;">History</p>
                <i class="fa-solid fa-plus" style="color:var(--accent-color); cursor:pointer;"></i>
            </div>
            <div class="history-list" id="history-list"></div>
        </div>

        <header id="main-header">
            <div class="header-left">
                <i class="fa-solid fa-bars burger-btn" id="burger-trigger"></i>
                <span class="header-logo-text">Bagus Ai<span style="color:var(--accent-color);">.</span></span>
            </div>
            <div class="header-actions">
                <i class="fa-regular fa-pen-to-square new-chat-btn" id="new-session-btn" title="New Chat"></i>
                <i class="fa-regular fa-sun theme-toggle" id="theme-btn"></i>
            </div>
        </header>

        <div id="app-container">
            <div class="welcome-view" id="welcome-view">
                <h1><span style="color:#60a5fa">Halo,</span> <span id="typer" class="sob-container"></span></h1>
                <div class="suggestion-list" id="bubble-wrap">
                    <div class="card" onclick="fillInput('Buatkan API Node.js')">Buatkan API Node.js</div>
                    <div class="card" onclick="fillInput('Jelaskan Microservices')">Jelaskan Microservices</div>
                    <div class="card" onclick="fillInput('Panduan Keamanan Web')">Panduan Keamanan Web</div>
                </div>
            </div>
            <div id="chat-window"></div>
        </div>

        <footer>
            <div class="input-box">
                <div id="inner-preview" class="preview-area"></div>
                <div class="input-row">
                    <i class="fa-regular fa-image icon-btn" id="gallery-trigger"></i>
                    <input type="file" id="file-input" accept="image/*" style="display: none;">
                    <textarea id="chat-input" placeholder="Ketik pesan..." rows="1"></textarea>
                    <i class="fa-solid fa-paper-plane icon-btn" id="send-btn" style="color:var(--accent-color);"></i>
                </div>
            </div>
        </footer>
    </div>
    
    <!-- Modal untuk preview gambar -->
    <div id="imageModal" class="image-modal" onclick="closeModal()">
        <img id="modalImage" src="">
    </div>

<script>
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const welcomeView = document.getElementById('welcome-view');
    const appContainer = document.getElementById('app-container');
    const bubbleWrap = document.getElementById('bubble-wrap');
    const content = document.getElementById('content-ready');
    const fileInput = document.getElementById('file-input');
    const innerPreview = document.getElementById('inner-preview');
    const historyList = document.getElementById('history-list');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay-bg');
    
    // State untuk gambar yang akan dikirim
    let pendingImage = null;
    let pendingImageUrl = null;

    // --- STATE MANAGEMENT ---
    let chatHistory = JSON.parse(localStorage.getItem('bagus_ai_history')) || [];
    let currentSessionId = localStorage.getItem('bagus_ai_session') || null;
    let isChatStarted = false;

    function forceScroll() { 
        setTimeout(() => {
            appContainer.scrollTop = appContainer.scrollHeight;
        }, 100);
    }

    // --- INITIALIZATION ---
    window.onload = async () => {
        const pathId = window.location.pathname.split('/')[1]; 
        
        if (pathId && pathId.length > 5) {
            await loadSessionFromApi(pathId);
        } else {
            renderHistory();
        }

        setTimeout(() => {
            document.getElementById('preloader-overlay').style.display = 'none';
            content.style.filter = 'blur(0px)';
            type();
        }, 1500);
    };

    // --- NEW API LOAD FUNCTION ---
    async function loadSessionFromApi(sessionId) {
        try {
            chatWindow.innerHTML = '<div class="bubble ai-bubble"><div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div style="margin-top: 5px; font-size: 12px;">Memuat percakapan...</div></div>';
            chatWindow.style.display = 'flex';
            welcomeView.style.display = 'none';
            isChatStarted = true;

            const response = await fetch('https://bai-rho.vercel.app/v1/session/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId: sessionId })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Gagal memuat sesi`);
            }

            const result = await response.json();
            
            if (!result.success || !result.data || !result.data.history) {
                throw new Error('Data sesi tidak valid');
            }

            const sessionData = result.data;
            const messages = sessionData.history;
            
            chatWindow.innerHTML = '';
            
            currentSessionId = sessionId;
            localStorage.setItem('bagus_ai_session', sessionId);
            window.history.pushState({}, '', `/${sessionId}`);
            
            let localHistory = JSON.parse(localStorage.getItem('bagus_ai_history')) || [];
            if (!localHistory.find(h => h.sessionId === sessionId) && messages.length > 0) {
                const firstUserMsg = messages.find(m => m.role === 'user');
                const title = firstUserMsg ? firstUserMsg.text.substring(0, 25) + (firstUserMsg.text.length > 25 ? '...' : '') : "Percakapan Lama";
                localHistory.unshift({ 
                    title: title, 
                    sessionId: sessionId,
                    timestamp: sessionData.createdAt || new Date().toISOString()
                });
                localStorage.setItem('bagus_ai_history', JSON.stringify(localHistory));
            }
            renderHistory();
            
            for (let i = 0; i < messages.length; i++) {
                const msg = messages[i];
                const bubble = document.createElement('div');
                bubble.className = `bubble ${msg.role === 'user' ? 'user-bubble' : 'ai-bubble'}`;
                
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message-with-image';
                
                if (msg.role === 'assistant' || msg.role === 'bot' || msg.role === 'ai') {
                    let displayText = msg.text || '';
                    if (displayText) {
                        const textSpan = document.createElement('div');
                        textSpan.className = 'message-text';
                        textSpan.innerHTML = formatAiResponse(displayText);
                        messageDiv.appendChild(textSpan);
                    }
                    if (msg.image) {
                        const imgContainer = document.createElement('div');
                        imgContainer.className = 'chat-image-container';
                        imgContainer.onclick = () => openImageModal(msg.image);
                        const img = document.createElement('img');
                        img.className = 'chat-image';
                        img.src = msg.image;
                        img.alt = 'Gambar';
                        imgContainer.appendChild(img);
                        messageDiv.appendChild(imgContainer);
                    }
                    bubble.appendChild(messageDiv);
                    chatWindow.appendChild(bubble);
                    addCopyBtn(bubble);
                } else if (msg.role === 'user') {
                    if (msg.text) {
                        const textSpan = document.createElement('div');
                        textSpan.className = 'message-text';
                        textSpan.innerText = msg.text;
                        messageDiv.appendChild(textSpan);
                    }
                    if (msg.image) {
                        const imgContainer = document.createElement('div');
                        imgContainer.className = 'chat-image-container';
                        imgContainer.onclick = () => openImageModal(msg.image);
                        const img = document.createElement('img');
                        img.className = 'chat-image';
                        img.src = msg.image;
                        img.alt = 'Gambar';
                        imgContainer.appendChild(img);
                        messageDiv.appendChild(imgContainer);
                    }
                    bubble.appendChild(messageDiv);
                    chatWindow.appendChild(bubble);
                }
                
                forceScroll();
                if (msg.role === 'assistant') await delay(100);
            }
            
            forceScroll();
            
        } catch (error) {
            console.error('Error loading session:', error);
            chatWindow.innerHTML = `<div class="bubble ai-bubble">❌ Gagal memuat percakapan: ${error.message}<br><br>Pastikan session ID valid dan coba lagi.</div>`;
        }
    }
    
    // Helper function untuk escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    async function typeMessageWithDelay(element, htmlText, isLast = true) {
        element.innerHTML = htmlText;
        addCopyBtn(element.parentElement);
        forceScroll();
        return new Promise(resolve => setTimeout(resolve, isLast ? 200 : 50));
    }
    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Fungsi untuk membuka modal gambar
    function openImageModal(imageUrl) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        modal.style.display = 'flex';
        modalImg.src = imageUrl;
    }
    
    function closeModal() {
        document.getElementById('imageModal').style.display = 'none';
    }

    // --- NEW SESSION LOGIC ---
    document.getElementById('new-session-btn').onclick = () => {
        isChatStarted = false;
        currentSessionId = null;
        pendingImage = null;
        pendingImageUrl = null;
        innerPreview.innerHTML = '';
        innerPreview.style.display = 'none';
        fileInput.value = '';
        localStorage.removeItem('bagus_ai_session');
        window.history.pushState({}, '', '/');
        chatWindow.innerHTML = ''; 
        chatWindow.style.display = 'none';
        welcomeView.style.display = 'flex'; 
        welcomeView.style.opacity = '1';
        welcomeView.style.transform = 'translateY(0)';
        input.value = ''; 
        input.style.height = 'auto';
        bubbleWrap.classList.remove('hide');
        forceScroll();
    };

    // --- SIDEBAR & HISTORY LOGIC ---
    document.getElementById('burger-trigger').onclick = () => {
        sidebar.classList.add('open');
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);
    };

    overlay.onclick = () => {
        sidebar.classList.remove('open');
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    };

    function renderHistory() {
        historyList.innerHTML = '';
        chatHistory = JSON.parse(localStorage.getItem('bagus_ai_history')) || [];
        if (chatHistory.length === 0) {
            historyList.innerHTML = '<div style="padding: 12px; text-align: center; color: var(--icon-color); font-size: 12px;">Belum ada riwayat chat</div>';
            return;
        }
        chatHistory.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <span onclick="loadSession('${item.sessionId}')" style="cursor:pointer; flex:1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(item.title)}</span>
                <i class="fa-regular fa-trash-can trash-btn" onclick="deleteHistory(event, ${index})"></i>
            `;
            historyList.appendChild(div);
        });
    }

    function deleteHistory(event, index) {
        event.stopPropagation();
        chatHistory.splice(index, 1);
        localStorage.setItem('bagus_ai_history', JSON.stringify(chatHistory));
        renderHistory();
    }

    function loadSession(sid) {
        window.location.href = `/${sid}`;
    }

    // --- FORMATTING LOGIC ---
    function formatAiResponse(text) {
        if (!text) return "";
        return text
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #60a5fa; text-decoration: underline;">🔗 Link</a>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*/g, '•')
            .replace(/\n/g, '<br>');
    }

    function addCopyBtn(bubbleElement) {
        if (bubbleElement.querySelector('.copy-btn')) return;
        const textElement = bubbleElement.querySelector('.message-text');
        if (!textElement) return;
        
        const cB = document.createElement('div');
        cB.className = 'copy-btn';
        cB.innerHTML = '<i class="fa-regular fa-copy"></i> Salin';
        cB.onclick = () => {
            const textToCopy = textElement.innerText || textElement.textContent;
            navigator.clipboard.writeText(textToCopy);
            cB.innerHTML = '<i class="fa-solid fa-check" style="color:#4ade80"></i> Tersalin!';
            setTimeout(() => cB.innerHTML = '<i class="fa-regular fa-copy"></i> Salin', 2000);
        };
        bubbleElement.appendChild(cB);
    }

    // --- SEND LOGIC WITH IMAGE ---
    async function sendMessage() {
        const val = input.value.trim();
        const hasImage = pendingImage !== null;
        
        if (!val && !hasImage) return;

        if (!isChatStarted) {
            isChatStarted = true;
            welcomeView.style.opacity = '0';
            setTimeout(() => { 
                welcomeView.style.display = 'none'; 
                chatWindow.style.display = 'flex'; 
            }, 400);
        }

        // Buat bubble user dengan gambar preview 1:1
        const uB = document.createElement('div');
        uB.className = 'bubble user-bubble';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-with-image';
        
        if (val) {
            const textSpan = document.createElement('div');
            textSpan.className = 'message-text';
            textSpan.innerText = val;
            messageDiv.appendChild(textSpan);
        }
        
        if (hasImage) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'chat-image-container';
            imgContainer.onclick = () => openImageModal(pendingImage);
            const img = document.createElement('img');
            img.className = 'chat-image';
            img.src = pendingImage;
            img.alt = 'Gambar';
            imgContainer.appendChild(img);
            messageDiv.appendChild(imgContainer);
        }
        
        uB.appendChild(messageDiv);
        chatWindow.appendChild(uB);
        
        // Simpan data untuk dikirim
        const imageToSend = pendingImage;
        const textToSend = val;
        
        // Reset input
        input.value = '';
        input.style.height = 'auto';
        pendingImage = null;
        pendingImageUrl = null;
        innerPreview.innerHTML = '';
        innerPreview.style.display = 'none';
        fileInput.value = '';
        forceScroll();

        // Tampilkan loading AI
        const aB = document.createElement('div');
        aB.className = 'bubble ai-bubble';
        aB.innerHTML = `<div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
        chatWindow.appendChild(aB);
        forceScroll();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: textToSend, 
                    image: imageToSend,
                    sessionId: currentSessionId 
                })
            });

            const data = await response.json();
            aB.innerHTML = ''; 
            const aiResponse = data.response || data.text;
            
            if (data.sessionId) {
                let fileId = data.sessionId;
                try {
                    const decoded = JSON.parse(atob(data.sessionId));
                    fileId = decoded.resumeArray?.[0] || Date.now();
                } catch(e) {
                    fileId = data.sessionId;
                }
                
                currentSessionId = data.sessionId;
                localStorage.setItem('bagus_ai_session', data.sessionId);
                window.history.pushState({}, '', `/${fileId}`);
                
                let history = JSON.parse(localStorage.getItem('bagus_ai_history')) || [];
                if (!history.find(h => h.sessionId === fileId)) {
                    const title = textToSend ? textToSend.substring(0, 20) + (textToSend.length > 20 ? '...' : '') : 'Gambar';
                    history.unshift({ title: title, sessionId: fileId });
                    localStorage.setItem('bagus_ai_history', JSON.stringify(history));
                    renderHistory();
                }
            }

            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'message-with-image';
            const textSpan = document.createElement('div');
            textSpan.className = 'message-text';
            textSpan.innerHTML = formatAiResponse(aiResponse);
            aiMessageDiv.appendChild(textSpan);
            aB.appendChild(aiMessageDiv);
            addCopyBtn(aB);
            forceScroll();

        } catch (error) {
            console.error('Send error:', error);
            aB.innerHTML = "⚠️ Waduh Sob, Bagus Ai lagi pusing. Coba ulangi sebentar ya!";
        }
    }

    sendBtn.onclick = sendMessage;
    
    // Enter to send
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // --- UI HELPERS ---
    const phrases = ["Bagus!", "Sob!", "Kreator!"];
    let pIdx = 0, cIdx = 0, isDel = false;
    function type() {
        const cur = phrases[pIdx];
        const el = document.getElementById('typer');
        if(el) {
            el.innerText = isDel ? cur.substring(0, cIdx--) : cur.substring(0, cIdx++);
            let speed = isDel ? 100 : 200;
            if(!isDel && cIdx > cur.length) { isDel = true; speed = 2500; }
            else if(isDel && cIdx < 0) { isDel = false; pIdx = (pIdx + 1) % phrases.length; speed = 500; }
            setTimeout(type, speed);
        }
    }

    const themeBtn = document.getElementById('theme-btn');
    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        themeBtn.className = t === 'dark' ? 'fa-regular fa-moon theme-toggle' : 'fa-regular fa-sun theme-toggle';
    }
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    themeBtn.onclick = () => {
        const now = document.documentElement.getAttribute('data-theme');
        applyTheme(now === 'dark' ? 'light' : 'dark');
    };

    // Image handling dengan preview 1:1
    document.getElementById('gallery-trigger').onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => { 
                pendingImage = ev.target.result;
                
                // Buat preview 1:1
                const previewContainer = document.createElement('div');
                previewContainer.className = 'image-preview-container';
                const img = document.createElement('img');
                img.src = ev.target.result;
                img.alt = 'Preview';
                const removeBtn = document.createElement('div');
                removeBtn.className = 'remove-img-btn';
                removeBtn.innerHTML = '×';
                removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    pendingImage = null;
                    innerPreview.innerHTML = '';
                    innerPreview.style.display = 'none';
                    fileInput.value = '';
                };
                previewContainer.appendChild(img);
                previewContainer.appendChild(removeBtn);
                
                innerPreview.innerHTML = '';
                innerPreview.appendChild(previewContainer);
                innerPreview.style.display = 'block';
                forceScroll();
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.addEventListener('input', function() { this.style.height = 'auto'; this.style.height = (this.scrollHeight) + 'px'; });

    function fillInput(t) { input.value = t; input.dispatchEvent(new Event('input')); sendMessage(); }
    
    // Expose functions to global scope
    window.loadSession = loadSession;
    window.deleteHistory = deleteHistory;
    window.fillInput = fillInput;
    window.openImageModal = openImageModal;
    window.closeModal = closeModal;
</script>
</body>
</html>
