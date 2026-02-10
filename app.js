// CheckPay - Main Application Logic

const CheckPayApp = {
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
        this.showScreen('dashboard-screen');
        this.showSuccessModal(i18n.t('kyc.title'), i18n.t('modal.successMessage'));
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
    
    // Bill pay biller data by state and utility type
    billerData: {
        electric: {
            CA: ['Pacific Gas & Electric (PG&E)', 'Southern California Edison', 'San Diego Gas & Electric'],
            NY: ['Con Edison', 'National Grid NY', 'NYSEG'],
            TX: ['TXU Energy', 'Reliant Energy', 'Direct Energy TX'],
            FL: ['Florida Power & Light', 'Duke Energy FL', 'Tampa Electric'],
            IL: ['ComEd (Commonwealth Edison)', 'Ameren Illinois'],
            PA: ['PECO Energy', 'PPL Electric', 'Duquesne Light'],
            GA: ['Georgia Power', 'Savannah Electric'],
            OH: ['Ohio Edison', 'AEP Ohio', 'Duke Energy OH'],
            NJ: ['PSE&G', 'JCP&L', 'Atlantic City Electric'],
            WA: ['Puget Sound Energy', 'Seattle City Light'],
            _default: ['Local Electric Company']
        },
        gas: {
            CA: ['SoCalGas', 'PG&E Gas'],
            NY: ['National Grid Gas', 'Con Edison Gas', 'KeySpan Energy'],
            TX: ['Atmos Energy TX', 'CenterPoint Energy'],
            FL: ['TECO Peoples Gas', 'Florida City Gas'],
            IL: ['Nicor Gas', 'Peoples Gas Chicago'],
            PA: ['Columbia Gas PA', 'UGI Utilities'],
            _default: ['Local Gas Company']
        },
        water: {
            CA: ['LA Dept of Water & Power', 'East Bay MUD', 'San Jose Water Co'],
            NY: ['NYC Water Board', 'Suffolk County Water Authority'],
            TX: ['Dallas Water Utilities', 'San Antonio Water System'],
            FL: ['Miami-Dade Water & Sewer', 'JEA Jacksonville'],
            _default: ['Local Water Utility']
        },
        internet: {
            _default: ['Comcast / Xfinity', 'AT&T Internet', 'Spectrum (Charter)', 'Verizon Fios', 'T-Mobile Home Internet', 'CenturyLink / Lumen']
        },
        phone: {
            _default: ['AT&T Wireless', 'Verizon Wireless', 'T-Mobile', 'Cricket Wireless', 'Metro by T-Mobile', 'Boost Mobile']
        },
        cable: {
            _default: ['Comcast / Xfinity TV', 'DirecTV', 'DISH Network', 'Spectrum TV', 'Cox Communications']
        },
        trash: {
            _default: ['Waste Management', 'Republic Services', 'Local Municipal Trash Service']
        },
        insurance: {
            _default: ['State Farm', 'Geico', 'Progressive', 'Allstate', 'USAA', 'Liberty Mutual']
        }
    },

    // Bill pay handlers
    setupBillPayHandlers: function() {
        // Back button
        document.getElementById('billpay-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
            this.resetBillPayFlow();
        });

        // State and utility type selectors populate billers
        document.getElementById('state-select')?.addEventListener('change', () => this.updateBillerOptions());
        document.getElementById('utility-type-select')?.addEventListener('change', () => this.updateBillerOptions());

        // Biller selection enables continue
        document.getElementById('biller-select')?.addEventListener('change', () => {
            const state = document.getElementById('state-select').value;
            const utility = document.getElementById('utility-type-select').value;
            const biller = document.getElementById('biller-select').value;
            document.getElementById('billpay-to-details').disabled = !(state && utility && biller);
        });

        // Step 1 -> Step 2
        document.getElementById('billpay-to-details')?.addEventListener('click', () => {
            const billerName = document.getElementById('biller-select').selectedOptions[0].text;
            document.getElementById('selected-biller-name').textContent = billerName;
            document.getElementById('billpay-select-biller').style.display = 'none';
            document.getElementById('billpay-enter-details').style.display = 'block';
            document.getElementById('billpay-step-2').classList.add('active');
        });

        // Enable review button when required fields filled
        const detailInputs = ['account-number-input', 'billpay-amount-input'];
        detailInputs.forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                const account = document.getElementById('account-number-input').value;
                const amount = document.getElementById('billpay-amount-input').value;
                document.getElementById('billpay-to-review').disabled = !(account && amount);
            });
        });

        // Step 2 -> Step 3 (Review)
        document.getElementById('billpay-to-review')?.addEventListener('click', () => {
            this.populateBillPayReview();
            document.getElementById('billpay-enter-details').style.display = 'none';
            document.getElementById('billpay-review').style.display = 'block';
            document.getElementById('billpay-step-3').classList.add('active');
        });

        // Step 3 -> Step 4 (Checkout)
        document.getElementById('billpay-to-checkout')?.addEventListener('click', () => {
            const amount = document.getElementById('billpay-amount-input').value;
            const formatted = '$' + parseFloat(amount).toFixed(2);
            document.getElementById('checkout-amount').textContent = formatted;
            document.getElementById('checkout-pay-label').textContent = 'Pay ' + formatted;
            document.getElementById('billpay-review').style.display = 'none';
            document.getElementById('billpay-checkout').style.display = 'block';
            document.getElementById('billpay-step-4').classList.add('active');
        });

        // Checkout pay button -> Confirmation
        document.getElementById('checkout-pay-btn')?.addEventListener('click', () => {
            this.processBillPayment();
        });

        // Done button -> Dashboard
        document.getElementById('billpay-done-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
            this.resetBillPayFlow();
        });

        // Search reference number button
        document.getElementById('search-reference-btn')?.addEventListener('click', () => {
            // Auto-fill a demo reference number
            document.getElementById('reference-number-input').value = 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        });
    },

    // Update biller options based on state and utility type
    updateBillerOptions: function() {
        const state = document.getElementById('state-select').value;
        const utility = document.getElementById('utility-type-select').value;
        const billerSelect = document.getElementById('biller-select');

        // Reset biller dropdown
        billerSelect.innerHTML = '<option value="">Choose a biller</option>';
        document.getElementById('billpay-to-details').disabled = true;

        if (!utility) return;

        const utilityBillers = this.billerData[utility] || {};
        const billers = utilityBillers[state] || utilityBillers._default || ['Local Provider'];

        billers.forEach(biller => {
            const option = document.createElement('option');
            option.value = biller.toLowerCase().replace(/[^a-z0-9]/g, '-');
            option.textContent = biller;
            billerSelect.appendChild(option);
        });
    },

    // Populate the review screen with entered data
    populateBillPayReview: function() {
        const stateSelect = document.getElementById('state-select');
        const utilitySelect = document.getElementById('utility-type-select');
        const billerSelect = document.getElementById('biller-select');
        const amount = document.getElementById('billpay-amount-input').value;
        const account = document.getElementById('account-number-input').value;
        const reference = document.getElementById('reference-number-input').value || 'N/A';

        document.getElementById('review-biller').textContent = billerSelect.selectedOptions[0].text;
        document.getElementById('review-state').textContent = stateSelect.selectedOptions[0].text;
        document.getElementById('review-utility').textContent = utilitySelect.selectedOptions[0].text;
        document.getElementById('review-account').textContent = account;
        document.getElementById('review-reference').textContent = reference;
        document.getElementById('review-amount').textContent = '$' + parseFloat(amount).toFixed(2);
    },

    // Process the bill payment (mock)
    processBillPayment: function() {
        const billerSelect = document.getElementById('biller-select');
        const amount = document.getElementById('billpay-amount-input').value;
        const reference = document.getElementById('reference-number-input').value || 'N/A';

        // Generate a transaction ID
        const txnId = 'TXN-' + Date.now().toString(36).toUpperCase();

        // Populate confirmation
        document.getElementById('confirm-biller').textContent = billerSelect.selectedOptions[0].text;
        document.getElementById('confirm-amount').textContent = '$' + parseFloat(amount).toFixed(2);
        document.getElementById('confirm-reference').textContent = reference;
        document.getElementById('confirm-txn-id').textContent = txnId;
        document.getElementById('confirm-date').textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        // Show confirmation
        document.getElementById('billpay-checkout').style.display = 'none';
        document.getElementById('billpay-confirmation').style.display = 'block';
    },

    // Reset bill pay flow
    resetBillPayFlow: function() {
        // Reset all steps to hidden except step 1
        document.getElementById('billpay-select-biller').style.display = 'block';
        document.getElementById('billpay-enter-details').style.display = 'none';
        document.getElementById('billpay-review').style.display = 'none';
        document.getElementById('billpay-checkout').style.display = 'none';
        document.getElementById('billpay-confirmation').style.display = 'none';

        // Reset progress steps
        document.querySelectorAll('#billpay-progress .progress-step').forEach((step, i) => {
            if (i === 0) step.classList.add('active');
            else step.classList.remove('active');
        });

        // Reset form fields
        document.getElementById('state-select').value = '';
        document.getElementById('utility-type-select').value = '';
        document.getElementById('biller-select').innerHTML = '<option value="">Choose a biller</option>';
        document.getElementById('account-number-input').value = '';
        document.getElementById('billpay-amount-input').value = '';
        document.getElementById('reference-number-input').value = '';
        document.getElementById('billpay-to-details').disabled = true;
        document.getElementById('billpay-to-review').disabled = true;
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
        CheckPayApp.init();
    });
} else {
    CheckPayApp.init();
}
