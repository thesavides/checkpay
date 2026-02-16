// CheckPay Chatbot Widget
// Self-contained floating chat widget powered by Claude API

const CheckPayChat = {
    isOpen: false,
    messages: [],
    isLoading: false,
    maxMessages: 20,
    hasGreeted: false,

    // Initialize the chatbot
    init: function() {
        this.createWidget();
        this.setupEventListeners();
        this.adjustForBottomNav();

        // Hook into i18n language changes
        if (typeof i18n !== 'undefined') {
            const originalSetLanguage = i18n.setLanguage.bind(i18n);
            i18n.setLanguage = (code) => {
                const result = originalSetLanguage(code);
                this.updateLabels();
                return result;
            };
        }
    },

    // Create and inject widget DOM
    createWidget: function() {
        // FAB button
        const fab = document.createElement('button');
        fab.id = 'chatbot-fab';
        fab.className = 'chatbot-fab';
        fab.setAttribute('aria-label', 'Open chat');
        fab.innerHTML = `
            <span class="material-icons chatbot-fab-icon-chat">chat</span>
            <span class="material-icons chatbot-fab-icon-close">close</span>
        `;
        document.body.appendChild(fab);

        // Chat window
        const win = document.createElement('div');
        win.id = 'chatbot-window';
        win.className = 'chatbot-window';
        win.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <div class="chatbot-avatar">
                        <span class="material-icons">smart_toy</span>
                    </div>
                    <div>
                        <div class="chatbot-title" id="chatbot-title">CheckPay Assistant</div>
                        <div class="chatbot-status" id="chatbot-status">Online</div>
                    </div>
                </div>
                <button class="chatbot-close-btn" id="chatbot-close-btn" aria-label="Close chat">
                    <span class="material-icons">close</span>
                </button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages" role="log" aria-live="polite"></div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" class="chatbot-input"
                       placeholder="Type a message..." autocomplete="off"
                       aria-label="Chat message">
                <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send message">
                    <span class="material-icons">send</span>
                </button>
            </div>
        `;
        document.body.appendChild(win);

        // Update labels from i18n
        this.updateLabels();
    },

    // Set up event listeners
    setupEventListeners: function() {
        const fab = document.getElementById('chatbot-fab');
        const closeBtn = document.getElementById('chatbot-close-btn');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        fab.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.handleSend());

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });
    },

    // Adjust FAB position if bottom nav exists (app.html)
    adjustForBottomNav: function() {
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
            const fab = document.getElementById('chatbot-fab');
            const win = document.getElementById('chatbot-window');
            fab.style.bottom = '84px';
            win.style.bottom = '152px';
        }
    },

    // Toggle chat open/close
    toggleChat: function() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    },

    // Open chat window
    openChat: function() {
        this.isOpen = true;
        const fab = document.getElementById('chatbot-fab');
        const win = document.getElementById('chatbot-window');
        fab.classList.add('active');
        win.classList.add('active');

        // Show greeting on first open
        if (!this.hasGreeted) {
            this.hasGreeted = true;
            const greeting = this.getTranslation('chatbot.greeting') ||
                "Hi! I'm the CheckPay assistant. I can help you with questions about check clearing, virtual cards, bill payments, identity verification, and more. How can I help you?";
            this.addMessage('assistant', greeting);
        }

        // Focus input
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 300);
    },

    // Close chat window
    closeChat: function() {
        this.isOpen = false;
        const fab = document.getElementById('chatbot-fab');
        const win = document.getElementById('chatbot-window');
        fab.classList.remove('active');
        win.classList.remove('active');
    },

    // Handle send button / enter key
    handleSend: function() {
        if (this.isLoading) return;

        const input = document.getElementById('chatbot-input');
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        this.addMessage('user', text);
        this.sendToAPI(text);
    },

    // Add a message to the chat
    addMessage: function(role, content) {
        this.messages.push({ role, content });

        // Trim to max messages
        if (this.messages.length > this.maxMessages) {
            this.messages = this.messages.slice(-this.maxMessages);
        }

        this.renderMessage(role, content);
        this.scrollToBottom();
    },

    // Render a single message bubble
    renderMessage: function(role, content) {
        const container = document.getElementById('chatbot-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-msg chatbot-msg-${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        bubble.textContent = content;

        msgDiv.appendChild(bubble);
        container.appendChild(msgDiv);
    },

    // Show typing indicator
    showTyping: function() {
        const container = document.getElementById('chatbot-messages');
        const typing = document.createElement('div');
        typing.className = 'chatbot-msg chatbot-msg-assistant';
        typing.id = 'chatbot-typing';
        typing.innerHTML = `
            <div class="chatbot-typing">
                <div class="chatbot-typing-dot"></div>
                <div class="chatbot-typing-dot"></div>
                <div class="chatbot-typing-dot"></div>
            </div>
        `;
        container.appendChild(typing);
        this.scrollToBottom();
    },

    // Hide typing indicator
    hideTyping: function() {
        const typing = document.getElementById('chatbot-typing');
        if (typing) typing.remove();
    },

    // Scroll messages to bottom
    scrollToBottom: function() {
        const container = document.getElementById('chatbot-messages');
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 50);
    },

    // Send message to API
    sendToAPI: async function(text) {
        this.isLoading = true;
        const sendBtn = document.getElementById('chatbot-send');
        sendBtn.disabled = true;
        this.showTyping();

        // Build messages for API (only user/assistant, last 20)
        const apiMessages = this.messages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .slice(-20);

        const language = (typeof i18n !== 'undefined') ? i18n.currentLanguage : 'en';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages, language })
            });

            this.hideTyping();

            if (response.status === 429) {
                const errMsg = this.getTranslation('chatbot.rateLimited') ||
                    "You're sending messages too quickly. Please wait a moment.";
                this.addMessage('assistant', errMsg);
            } else if (!response.ok) {
                throw new Error('API error');
            } else {
                const data = await response.json();
                this.addMessage('assistant', data.response);
            }
        } catch (err) {
            this.hideTyping();
            const errMsg = this.getTranslation('chatbot.errorMessage') ||
                'Sorry, something went wrong. Please try again.';
            this.addMessage('assistant', errMsg);
        }

        this.isLoading = false;
        sendBtn.disabled = false;
        document.getElementById('chatbot-input').focus();
    },

    // Get translation from i18n system
    getTranslation: function(key) {
        if (typeof i18n !== 'undefined' && i18n.t) {
            return i18n.t(key);
        }
        return null;
    },

    // Update widget labels from i18n
    updateLabels: function() {
        const title = document.getElementById('chatbot-title');
        const status = document.getElementById('chatbot-status');
        const input = document.getElementById('chatbot-input');

        if (title) title.textContent = this.getTranslation('chatbot.title') || 'CheckPay Assistant';
        if (status) status.textContent = this.getTranslation('chatbot.online') || 'Online';
        if (input) input.placeholder = this.getTranslation('chatbot.placeholder') || 'Type a message...';
        if (input) input.setAttribute('aria-label', this.getTranslation('chatbot.inputLabel') || 'Chat message');
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CheckPayChat.init());
} else {
    CheckPayChat.init();
}
