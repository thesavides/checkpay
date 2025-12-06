// PayMyBill - Main Application Logic

const PayMyBillApp = {
    currentScreen: 'welcome-screen',
    userData: {},
    
    // Initialize the application
    init: function() {
        this.setupEventListeners();
        this.loadMockTransactions();
        this.showScreen('welcome-screen');
    },
    
    // Setup all event listeners
    setupEventListeners: function() {
        // Language selector
        document.getElementById('language-select')?.addEventListener('change', (e) => {
            i18n.setLanguage(e.target.value);
        });
        
        // Welcome screen
        document.getElementById('get-started-btn')?.addEventListener('click', () => {
            this.showScreen('kyc-screen');
        });
        
        // KYC screen
        this.setupKYCHandlers();
        
        // Dashboard
        this.setupDashboardHandlers();
        
        // Check cashing
        this.setupCheckHandlers();
        
        // Card screen
        this.setupCardHandlers();
        
        // Transactions
        this.setupTransactionHandlers();
        
        // Bill pay
        this.setupBillPayHandlers();
        
        // Profile
        this.setupProfileHandlers();
        
        // Navigation
        this.setupNavigationHandlers();
    },
    
    // Show a specific screen
    showScreen: function(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show requested screen
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenId;
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    },
    
    // KYC handlers
    setupKYCHandlers: function() {
        const passportInput = document.getElementById('passport-input');
        const passportDropZone = document.getElementById('passport-drop-zone');
        const passportContinue = document.getElementById('passport-continue');
        const selfieInput = document.getElementById('selfie-input');
        const selfieDropZone = document.getElementById('selfie-drop-zone');
        const selfieSubmit = document.getElementById('selfie-submit');
        
        // Passport upload
        passportDropZone?.addEventListener('click', () => passportInput.click());
        passportInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleFileUpload(e.target.files[0], 'passport');
                passportContinue.disabled = false;
            }
        });
        
        document.getElementById('passport-remove')?.addEventListener('click', () => {
            this.removeUpload('passport');
            passportContinue.disabled = true;
        });
        
        passportContinue?.addEventListener('click', () => {
            document.getElementById('passport-upload').style.display = 'none';
            document.getElementById('selfie-capture').style.display = 'block';
            document.querySelectorAll('.progress-step')[1].classList.add('active');
        });
        
        // Selfie upload
        selfieDropZone?.addEventListener('click', () => selfieInput.click());
        selfieInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleFileUpload(e.target.files[0], 'selfie');
                selfieSubmit.disabled = false;
            }
        });
        
        document.getElementById('selfie-remove')?.addEventListener('click', () => {
            this.removeUpload('selfie');
            selfieSubmit.disabled = true;
        });
        
        selfieSubmit?.addEventListener('click', () => {
            this.submitKYC();
        });
        
        document.getElementById('kyc-back-btn')?.addEventListener('click', () => {
            this.showScreen('welcome-screen');
        });
    },
    
    // Handle file upload and preview
    handleFileUpload: function(file, type) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById(`${type}-preview`);
            const img = document.getElementById(`${type}-img`);
            img.src = e.target.result;
            preview.style.display = 'block';
            document.getElementById(`${type}-drop-zone`).style.display = 'none';
        };
        reader.readAsDataURL(file);
    },
    
    // Remove uploaded file
    removeUpload: function(type) {
        const preview = document.getElementById(`${type}-preview`);
        const img = document.getElementById(`${type}-img`);
        const input = document.getElementById(`${type}-input`);
        
        img.src = '';
        preview.style.display = 'none';
        input.value = '';
        document.getElementById(`${type}-drop-zone`).style.display = 'flex';
    },
    
    // Submit KYC
    submitKYC: function() {
        // Simulate API call
        this.showLoadingScreen();
        
        setTimeout(() => {
            this.showScreen('dashboard-screen');
            this.showSuccessModal(i18n.t('kyc.title'), i18n.t('modal.successMessage'));
        }, 2000);
    },
    
    // Dashboard handlers
    setupDashboardHandlers: function() {
        // Balance toggle
        document.getElementById('toggle-balance')?.addEventListener('click', (e) => {
            const display = document.getElementById('balance-display');
            const hidden = document.getElementById('balance-hidden');
            const icon = e.currentTarget.querySelector('.material-icons');
            
            if (display.style.display === 'none') {
                display.style.display = 'block';
                hidden.style.display = 'none';
                icon.textContent = 'visibility';
            } else {
                display.style.display = 'none';
                hidden.style.display = 'block';
                icon.textContent = 'visibility_off';
            }
        });
        
        // Quick actions
        document.getElementById('cash-check-btn')?.addEventListener('click', () => {
            this.showScreen('check-screen');
        });
        
        document.getElementById('view-card-btn')?.addEventListener('click', () => {
            this.showScreen('card-screen');
        });
        
        document.getElementById('pay-bill-btn')?.addEventListener('click', () => {
            this.showScreen('billpay-screen');
        });
        
        document.getElementById('view-all-btn')?.addEventListener('click', () => {
            this.showScreen('transactions-screen');
        });
        
        document.getElementById('settings-btn')?.addEventListener('click', () => {
            this.showScreen('profile-screen');
        });
    },
    
    // Check cashing handlers
    setupCheckHandlers: function() {
        // Back button
        document.getElementById('check-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
            this.resetCheckFlow();
        });
        
        // Front capture
        const frontInput = document.getElementById('check-front-input');
        const frontUpload = document.querySelector('#check-front-capture .upload-area');
        const frontContinue = document.getElementById('check-front-continue');
        
        frontUpload?.addEventListener('click', () => frontInput.click());
        frontInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleCheckImage(e.target.files[0], 'front');
                frontContinue.disabled = false;
            }
        });
        
        document.getElementById('check-front-remove')?.addEventListener('click', () => {
            this.removeCheckImage('front');
            frontContinue.disabled = true;
        });
        
        frontContinue?.addEventListener('click', () => {
            document.getElementById('check-front-capture').style.display = 'none';
            document.getElementById('check-back-capture').style.display = 'block';
            document.getElementById('check-step-2').classList.add('active');
        });
        
        // Back capture
        const backInput = document.getElementById('check-back-input');
        const backUpload = document.querySelector('#check-back-capture .upload-area');
        const backContinue = document.getElementById('check-back-continue');
        
        backUpload?.addEventListener('click', () => backInput.click());
        backInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleCheckImage(e.target.files[0], 'back');
                backContinue.disabled = false;
            }
        });
        
        document.getElementById('check-back-remove')?.addEventListener('click', () => {
            this.removeCheckImage('back');
            backContinue.disabled = true;
        });
        
        backContinue?.addEventListener('click', () => {
            document.getElementById('check-back-capture').style.display = 'none';
            document.getElementById('check-confirm').style.display = 'block';
            document.getElementById('check-step-3').classList.add('active');
        });
        
        // Submit check
        document.getElementById('check-submit')?.addEventListener('click', () => {
            this.processCheck();
        });
    },
    
    // Handle check image upload
    handleCheckImage: function(file, side) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById(`check-${side}-preview`);
            const img = document.getElementById(`check-${side}-img`);
            img.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    },
    
    // Remove check image
    removeCheckImage: function(side) {
        const preview = document.getElementById(`check-${side}-preview`);
        const img = document.getElementById(`check-${side}-img`);
        const input = document.getElementById(`check-${side}-input`);
        
        img.src = '';
        preview.style.display = 'none';
        input.value = '';
    },
    
    // Reset check flow
    resetCheckFlow: function() {
        document.getElementById('check-front-capture').style.display = 'block';
        document.getElementById('check-back-capture').style.display = 'none';
        document.getElementById('check-confirm').style.display = 'none';
        document.getElementById('check-processing').style.display = 'none';
        
        document.querySelectorAll('#check-screen .progress-step').forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        this.removeCheckImage('front');
        this.removeCheckImage('back');
    },
    
    // Process check
    processCheck: function() {
        document.getElementById('check-confirm').style.display = 'none';
        document.getElementById('check-processing').style.display = 'block';
        
        // Simulate processing
        setTimeout(() => {
            document.querySelector('.processing-step.active').classList.remove('active');
            document.querySelector('.processing-step.active').classList.add('completed');
            document.querySelectorAll('.processing-step')[2].classList.add('active');
        }, 2000);
        
        setTimeout(() => {
            document.querySelector('.processing-step.active').classList.remove('active');
            document.querySelector('.processing-step.active').classList.add('completed');
            
            setTimeout(() => {
                this.showScreen('dashboard-screen');
                this.showSuccessModal(i18n.t('check.title'), 'Check deposited successfully! Funds will be available in 2-3 minutes.');
                this.resetCheckFlow();
            }, 1000);
        }, 4000);
    },
    
    // Card screen handlers
    setupCardHandlers: function() {
        document.getElementById('card-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
        });
        
        // Reveal PAN
        document.getElementById('reveal-pan')?.addEventListener('click', (e) => {
            const display = document.getElementById('card-pan-display');
            const icon = e.currentTarget.querySelector('.material-icons');
            
            if (display.textContent.includes('••••')) {
                display.textContent = '4532 7689 3421 9876';
                icon.textContent = 'visibility_off';
                
                // Auto-hide after 10 seconds
                setTimeout(() => {
                    display.textContent = '•••• •••• •••• 4532';
                    icon.textContent = 'visibility';
                }, 10000);
            } else {
                display.textContent = '•••• •••• •••• 4532';
                icon.textContent = 'visibility';
            }
        });
        
        // Freeze card toggle
        document.getElementById('card-freeze-toggle')?.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.showSuccessModal('Card Frozen', 'Your card has been temporarily frozen.');
            } else {
                this.showSuccessModal('Card Unfrozen', 'Your card is now active.');
            }
        });
    },
    
    // Transaction handlers
    setupTransactionHandlers: function() {
        document.getElementById('transactions-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
        });
        
        // Filter chips
        document.querySelectorAll('.filter-chips .chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                
                const filter = e.target.getAttribute('data-filter');
                this.filterTransactions(filter);
            });
        });
    },
    
    // Filter transactions
    filterTransactions: function(filter) {
        const transactions = document.querySelectorAll('#all-transactions .transaction-item');
        
        transactions.forEach(transaction => {
            if (filter === 'all') {
                transaction.style.display = 'flex';
            } else {
                const status = transaction.querySelector('.transaction-status');
                if (status && status.classList.contains(filter)) {
                    transaction.style.display = 'flex';
                } else {
                    transaction.style.display = 'none';
                }
            }
        });
    },
    
    // Bill pay handlers
    setupBillPayHandlers: function() {
        document.getElementById('billpay-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
        });
        
        document.getElementById('submit-payment-btn')?.addEventListener('click', () => {
            const biller = document.getElementById('biller-select').value;
            const amount = document.getElementById('billpay-amount-input').value;
            
            if (!biller || !amount) {
                alert('Please fill in all fields');
                return;
            }
            
            this.showLoadingScreen();
            
            setTimeout(() => {
                this.showScreen('dashboard-screen');
                this.showSuccessModal('Payment Submitted', 'Your payment has been scheduled successfully.');
            }, 2000);
        });
    },
    
    // Profile handlers
    setupProfileHandlers: function() {
        document.getElementById('profile-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
        });
        
        document.getElementById('language-settings-btn')?.addEventListener('click', () => {
            this.showScreen('welcome-screen');
        });
    },
    
    // Navigation handlers
    setupNavigationHandlers: function() {
        // All navigation buttons
        const navButtons = [
            { ids: ['nav-home-2', 'nav-home-3', 'nav-home-4'], screen: 'dashboard-screen' },
            { ids: ['nav-transactions', 'nav-transactions-2', 'nav-transactions-4'], screen: 'transactions-screen' },
            { ids: ['nav-card', 'nav-card-3', 'nav-card-4'], screen: 'card-screen' },
            { ids: ['nav-profile', 'nav-profile-2', 'nav-profile-3'], screen: 'profile-screen' }
        ];
        
        navButtons.forEach(({ ids, screen }) => {
            ids.forEach(id => {
                document.getElementById(id)?.addEventListener('click', () => {
                    this.showScreen(screen);
                });
            });
        });
    },
    
    // Load mock transactions
    loadMockTransactions: function() {
        const transactions = [
            {
                type: 'check',
                title: 'Check Deposit',
                date: new Date(Date.now() - 86400000),
                amount: 850.00,
                status: 'completed'
            },
            {
                type: 'bill',
                title: 'Electric Bill',
                date: new Date(Date.now() - 172800000),
                amount: -125.50,
                status: 'completed'
            },
            {
                type: 'topup',
                title: 'Account Top-up',
                date: new Date(Date.now() - 259200000),
                amount: 500.00,
                status: 'pending'
            },
            {
                type: 'bill',
                title: 'Internet Bill',
                date: new Date(Date.now() - 345600000),
                amount: -89.99,
                status: 'completed'
            }
        ];
        
        this.renderTransactions(transactions, 'recent-transactions', 3);
        this.renderTransactions(transactions, 'all-transactions');
    },
    
    // Render transactions
    renderTransactions: function(transactions, containerId, limit = null) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const transactionsToShow = limit ? transactions.slice(0, limit) : transactions;
        
        container.innerHTML = transactionsToShow.map(tx => `
            <div class="transaction-item">
                <div class="transaction-icon ${tx.type}">
                    <span class="material-icons">${this.getTransactionIcon(tx.type)}</span>
                </div>
                <div class="transaction-info">
                    <div class="transaction-title">${tx.title}</div>
                    <div class="transaction-date">${i18n.formatDate(tx.date)} • ${i18n.formatTime(tx.date)}</div>
                    <span class="transaction-status ${tx.status}">${this.capitalizeFirst(tx.status)}</span>
                </div>
                <div class="transaction-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
                    ${tx.amount > 0 ? '+' : ''}${i18n.formatCurrency(Math.abs(tx.amount))}
                </div>
            </div>
        `).join('');
    },
    
    // Get transaction icon
    getTransactionIcon: function(type) {
        const icons = {
            check: 'check_circle',
            bill: 'receipt',
            topup: 'add_circle'
        };
        return icons[type] || 'account_balance_wallet';
    },
    
    // Capitalize first letter
    capitalizeFirst: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    // Show loading screen
    showLoadingScreen: function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('active');
        }
    },
    
    // Hide loading screen
    hideLoadingScreen: function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('active');
        }
    },
    
    // Show success modal
    showSuccessModal: function(title, message) {
        const modal = document.getElementById('success-modal');
        const titleEl = document.getElementById('success-title');
        const messageEl = document.getElementById('success-message');
        
        if (modal && titleEl && messageEl) {
            titleEl.textContent = title;
            messageEl.textContent = message;
            modal.classList.add('active');
        }
    }
};

// Close success modal
document.getElementById('success-modal-close')?.addEventListener('click', () => {
    document.getElementById('success-modal').classList.remove('active');
});

// Close modal on background click
document.getElementById('success-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'success-modal') {
        document.getElementById('success-modal').classList.remove('active');
    }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        PayMyBillApp.init();
    });
} else {
    PayMyBillApp.init();
}
