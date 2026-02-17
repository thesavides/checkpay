// CheckPay - Main Application Logic

const CheckPayApp = {
    currentScreen: 'welcome-screen',
    userData: {},
    isAuthenticated: false,

    // Initialize the application
    init: function() {
        this.setupEventListeners();

        // Check URL parameters for sign-in routing
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('mode') === 'signin') {
            this.isAuthenticated = true;
            this.userData.fullName = 'Chris Squire';
            this.userData.itinLast4 = '7890';
            this.setupDashboard('returning');
            this.showScreen('dashboard-screen');
        } else {
            this.showScreen('welcome-screen');
        }

        // Check for ?view=terms or ?view=privacy URL param
        const viewParam = urlParams.get('view');
        if (viewParam === 'terms' || viewParam === 'privacy') {
            setTimeout(() => this.openTermsModal(viewParam), 300);
        }
    },

    // Setup all event listeners
    setupEventListeners: function() {
        // Welcome screen
        document.getElementById('get-started-btn')?.addEventListener('click', () => {
            this.showScreen('kyc-screen');
        });

        // Welcome screen language dropdown
        var welcomeLangSelect = document.getElementById('welcome-language-select');
        if (welcomeLangSelect) {
            welcomeLangSelect.value = i18n.currentLanguage;
            welcomeLangSelect.addEventListener('change', function() {
                i18n.setLanguage(welcomeLangSelect.value);
                i18n.updateUI();
                CheckPayApp.updateTermsCheckboxLabels();
            });

            // Mobile: abbreviate language selector options
            var langFull = {en: '\u{1F1FA}\u{1F1F8} English', es: '\u{1F1F2}\u{1F1FD} Español', ph: '\u{1F1F5}\u{1F1ED} Filipino', yo: '\u{1F1F3}\u{1F1EC} Yorùbá'};
            var langShort = {en: '\u{1F1FA}\u{1F1F8} EN', es: '\u{1F1F2}\u{1F1FD} ES', ph: '\u{1F1F5}\u{1F1ED} PH', yo: '\u{1F1F3}\u{1F1EC} YO'};
            function updateWelcomeLangLabels() {
                var labels = window.innerWidth <= 968 ? langShort : langFull;
                Array.from(welcomeLangSelect.options).forEach(function(opt) { opt.textContent = labels[opt.value]; });
            }
            updateWelcomeLangLabels();
            window.addEventListener('resize', updateWelcomeLangLabels);
        }

        // Sign in link (demo shortcut — skips KYC)
        document.getElementById('sign-in-link')?.addEventListener('click', () => {
            this.isAuthenticated = true;
            this.userData.itinLast4 = '7890';
            this.userData.fullName = 'Chris Squire';
            this.setupDashboard('returning');
            this.showScreen('dashboard-screen');
        });

        // KYC screen
        this.setupKYCHandlers();

        // Dashboard
        this.setupDashboardHandlers();

        // Check clearing
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

        // Language modal
        this.setupLanguageModal();

        // Terms & Conditions modal
        this.setupTermsModal();
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

        // Show/hide persistent balance header
        const balanceHeader = document.getElementById('balance-header');
        const appContainer = document.getElementById('app');
        const authenticatedScreens = [
            'dashboard-screen', 'check-screen', 'card-screen',
            'transactions-screen', 'billpay-screen', 'profile-screen'
        ];

        if (this.isAuthenticated && authenticatedScreens.includes(screenId)) {
            balanceHeader.style.display = 'flex';
            appContainer.classList.add('has-balance-header');
        } else {
            balanceHeader.style.display = 'none';
            appContainer.classList.remove('has-balance-header');
        }
    },

    // ==========================================
    // KYC-A: Account Verification (4 steps)
    // ==========================================

    setupKYCHandlers: function() {
        // Step 1: Personal Info
        const infoContinue = document.getElementById('kyc-info-continue');

        infoContinue?.addEventListener('click', () => {
            document.getElementById('kyc-personal-info').style.display = 'none';
            document.getElementById('passport-upload').style.display = 'block';
            document.getElementById('kyc-step-2').classList.add('active');
        });

        // Step 2: Government ID upload
        const passportInput = document.getElementById('passport-input');
        const passportDropZone = document.getElementById('passport-drop-zone');
        const passportContinue = document.getElementById('passport-continue');

        passportDropZone?.addEventListener('click', () => passportInput.click());
        passportInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleFileUpload(e.target.files[0], 'passport');
            }
        });

        document.getElementById('passport-remove')?.addEventListener('click', () => {
            this.removeUpload('passport');
        });

        passportContinue?.addEventListener('click', () => {
            document.getElementById('passport-upload').style.display = 'none';
            document.getElementById('selfie-capture').style.display = 'block';
            document.getElementById('kyc-step-3').classList.add('active');
        });

        // Step 3: Selfie
        const selfieInput = document.getElementById('selfie-input');
        const selfieDropZone = document.getElementById('selfie-drop-zone');
        const selfieSubmit = document.getElementById('selfie-submit');

        selfieDropZone?.addEventListener('click', () => selfieInput.click());
        selfieInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleFileUpload(e.target.files[0], 'selfie');
            }
        });

        document.getElementById('selfie-remove')?.addEventListener('click', () => {
            this.removeUpload('selfie');
        });

        // Selfie submit -> Provisioning (Step 4)
        selfieSubmit?.addEventListener('click', () => {
            document.getElementById('selfie-capture').style.display = 'none';
            document.getElementById('kyc-provisioning').style.display = 'block';
            document.getElementById('kyc-step-4').classList.add('active');
            this.runProvisioningAnimation();
        });

        // Back button
        document.getElementById('kyc-back-btn')?.addEventListener('click', () => {
            this.showScreen('welcome-screen');
        });
    },

    // Provisioning animation after KYC-A completes
    runProvisioningAnimation: function() {
        const steps = document.querySelectorAll('#kyc-provisioning .processing-step');

        // Step 1 already shown as completed. Step 2 active.
        setTimeout(() => {
            // Complete step 2 (Creating virtual card)
            steps[1].classList.remove('active');
            steps[1].classList.add('completed');
            steps[1].innerHTML = '<span class="material-icons">check_circle</span>' +
                                '<span>' + (i18n.t('kyc.stepCreatingCard') || 'Creating virtual card') + '</span>';
            // Activate step 3
            steps[2].classList.add('active');
            steps[2].innerHTML = '<div class="step-spinner"></div>' +
                                '<span>' + (i18n.t('kyc.stepActivating') || 'Activating wallet') + '</span>';
        }, 2000);

        setTimeout(() => {
            // Complete step 3
            steps[2].classList.remove('active');
            steps[2].classList.add('completed');
            steps[2].innerHTML = '<span class="material-icons">check_circle</span>' +
                                '<span>' + (i18n.t('kyc.stepActivating') || 'Activating wallet') + '</span>';

            setTimeout(() => {
                // Store user data
                this.isAuthenticated = true;
                const itin = document.getElementById('kyc-itin-input')?.value || '';
                this.userData.itinLast4 = itin.slice(-4) || '7890';
                this.userData.fullName = document.getElementById('kyc-name-input')?.value || 'Chris Squire';

                // Navigate to dashboard
                this.showScreen('dashboard-screen');
                this.showSuccessModal(
                    i18n.t('kyc.accountReady') || 'Account Ready!',
                    i18n.t('kyc.accountReadyMessage') || 'Your account is set up and your virtual card is ready to use.'
                );
            }, 1000);
        }, 4000);
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

    // ==========================================
    // Dashboard
    // ==========================================

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

    // ==========================================
    // Check Clearing (4 steps with KYC-B)
    // ==========================================

    setupCheckHandlers: function() {
        // Back button
        document.getElementById('check-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
            this.resetCheckFlow();
        });

        // Step 1: Front capture
        const frontInput = document.getElementById('check-front-input');
        const frontUpload = document.querySelector('#check-front-capture .upload-area');
        const frontContinue = document.getElementById('check-front-continue');

        frontUpload?.addEventListener('click', () => frontInput.click());
        frontInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleCheckImage(e.target.files[0], 'front');
            }
        });

        document.getElementById('check-front-remove')?.addEventListener('click', () => {
            this.removeCheckImage('front');
        });

        frontContinue?.addEventListener('click', () => {
            document.getElementById('check-front-capture').style.display = 'none';
            document.getElementById('check-back-capture').style.display = 'block';
            document.getElementById('check-step-2').classList.add('active');
        });

        // Step 2: Back capture
        const backInput = document.getElementById('check-back-input');
        const backUpload = document.querySelector('#check-back-capture .upload-area');
        const backContinue = document.getElementById('check-back-continue');

        backUpload?.addEventListener('click', () => backInput.click());
        backInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.handleCheckImage(e.target.files[0], 'back');
            }
        });

        document.getElementById('check-back-remove')?.addEventListener('click', () => {
            this.removeCheckImage('back');
        });

        // Back continue -> KYC-B verify step (not confirm)
        backContinue?.addEventListener('click', () => {
            document.getElementById('check-back-capture').style.display = 'none';
            document.getElementById('check-verify').style.display = 'block';
            document.getElementById('check-step-3').classList.add('active');

            // Show ITIN last 4 from stored user data
            const itinDisplay = document.getElementById('check-itin-last4');
            if (itinDisplay) {
                itinDisplay.textContent = this.userData.itinLast4
                    ? '\u2022\u2022\u2022-\u2022\u2022-' + this.userData.itinLast4
                    : '\u2022\u2022\u2022\u2022';
            }
        });

        // Step 3: KYC-B Verify step
        const checkSelfieInput = document.getElementById('check-selfie-input');
        const checkSelfieZone = document.getElementById('check-selfie-zone');

        checkSelfieZone?.addEventListener('click', () => checkSelfieInput.click());
        checkSelfieInput?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('check-selfie-img').src = ev.target.result;
                    document.getElementById('check-selfie-preview').style.display = 'block';
                    document.getElementById('check-selfie-zone').style.display = 'none';
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        document.getElementById('check-selfie-remove')?.addEventListener('click', () => {
            document.getElementById('check-selfie-img').src = '';
            document.getElementById('check-selfie-preview').style.display = 'none';
            document.getElementById('check-selfie-zone').style.display = 'flex';
            document.getElementById('check-selfie-input').value = '';
        });

        // Verify continue -> Confirm step (with first-deposit Reg E gate)
        document.getElementById('check-verify-continue')?.addEventListener('click', () => {
            if (!this._depositDisclosureAccepted) {
                // First deposit: show Reg E disclosure modal before confirm step
                document.getElementById('deposit-disclosure-modal').classList.add('active');
            } else {
                document.getElementById('check-verify').style.display = 'none';
                document.getElementById('check-confirm').style.display = 'block';
                document.getElementById('check-step-4').classList.add('active');
            }
        });

        // Deposit disclosure modal: "I Acknowledge & Continue"
        document.getElementById('deposit-disclosure-agree')?.addEventListener('click', () => {
            this._depositDisclosureAccepted = true;
            document.getElementById('deposit-disclosure-modal').classList.remove('active');
            document.getElementById('check-verify').style.display = 'none';
            document.getElementById('check-confirm').style.display = 'block';
            document.getElementById('check-step-4').classList.add('active');
        });

        // Deposit disclosure modal: link to full deposit terms
        document.getElementById('disclosure-full-terms-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openTermsModal('deposit');
        });

        // Step 4: Submit check
        document.getElementById('check-submit')?.addEventListener('click', () => {
            this.processCheck();
        });

        // Deposit timeline done button
        document.getElementById('deposit-done-btn')?.addEventListener('click', () => {
            // Move funds from pending to available
            this.setupDashboard('returning');
            this.showScreen('dashboard-screen');
            this.showSuccessModal(
                i18n.t('deposit.clearedTitle') || 'Check Deposited',
                i18n.t('deposit.clearedMessage') || 'Your check has been deposited. Funds are now available!'
            );
            this.resetCheckFlow();
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
        document.getElementById('check-verify').style.display = 'none';
        document.getElementById('check-confirm').style.display = 'none';
        document.getElementById('check-processing').style.display = 'none';

        // Reset progress steps
        document.querySelectorAll('#check-screen .progress-step').forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Reset uploads
        this.removeCheckImage('front');
        this.removeCheckImage('back');

        // Reset KYC-B verify step
        const selfieImg = document.getElementById('check-selfie-img');
        if (selfieImg) selfieImg.src = '';
        const selfiePreview = document.getElementById('check-selfie-preview');
        if (selfiePreview) selfiePreview.style.display = 'none';
        const selfieZone = document.getElementById('check-selfie-zone');
        if (selfieZone) selfieZone.style.display = 'flex';
        const selfieInput = document.getElementById('check-selfie-input');
        if (selfieInput) selfieInput.value = '';
        const checkbox = document.getElementById('check-payable-checkbox');
        if (checkbox) checkbox.checked = false;

        // Reset deposit timeline
        document.querySelectorAll('#check-processing .timeline-item').forEach((item, i) => {
            item.classList.remove('active', 'completed');
            if (i === 0) item.classList.add('completed');
            if (i === 1) item.classList.add('active');
        });
        document.querySelectorAll('#check-processing .timeline-time').forEach(el => { el.textContent = ''; });
        const doneBtn = document.getElementById('deposit-done-btn');
        if (doneBtn) doneBtn.style.display = 'none';
    },

    // Process check — deposit timeline animation
    processCheck: function() {
        document.getElementById('check-confirm').style.display = 'none';
        document.getElementById('check-processing').style.display = 'block';
        // Hide progress bar during timeline view
        const progressBar = document.getElementById('check-progress');
        if (progressBar) progressBar.style.display = 'none';

        // Update pending balance to reflect the check amount
        document.getElementById('header-pending-balance').textContent = '$850.00';

        const now = new Date();
        // Format: "Feb 17, 2:10 PM EST"
        const formatTime = (d) => {
            const month = d.toLocaleDateString([], { month: 'short' });
            const day = d.getDate();
            const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            const tz = d.toLocaleTimeString([], { timeZoneName: 'short' }).split(' ').pop();
            return month + ' ' + day + ', ' + time + ' ' + tz;
        };

        // Set submitted time
        const submittedTime = document.getElementById('timeline-submitted-time');
        if (submittedTime) submittedTime.textContent = formatTime(now);

        // Simulate realistic clearing timeline spanning hours/days
        // Each stage gets a progressively later demo timestamp
        const stageOffsets = [
            { id: 'timeline-review', delay: 2000, hoursOffset: 0.5 },
            { id: 'timeline-accepted', delay: 4000, hoursOffset: 4 },
            { id: 'timeline-pending', delay: 6000, hoursOffset: 24 },
            { id: 'timeline-cleared', delay: 8000, hoursOffset: 48 }
        ];
        const stages = stageOffsets;

        stages.forEach(({ id, delay }, index) => {
            setTimeout(() => {
                const item = document.getElementById(id);
                const timeEl = document.getElementById(id + '-time');

                // Complete current active
                const currentActive = document.querySelector('#check-processing .timeline-item.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                    currentActive.classList.add('completed');
                }

                // Activate this stage
                item.classList.add('active');
                var stageTime = new Date(now.getTime() + (stageOffsets[index].hoursOffset * 60 * 60 * 1000));
                if (timeEl) timeEl.textContent = formatTime(stageTime);

                // On last stage, complete it and show done button
                if (index === stages.length - 1) {
                    setTimeout(() => {
                        item.classList.remove('active');
                        item.classList.add('completed');
                        const doneBtn = document.getElementById('deposit-done-btn');
                        if (doneBtn) doneBtn.style.display = 'block';
                    }, 1500);
                }
            }, delay);
        });
    },

    // ==========================================
    // Card Screen
    // ==========================================

    setupCardHandlers: function() {
        document.getElementById('card-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
        });

        // Reveal PAN
        document.getElementById('reveal-pan')?.addEventListener('click', (e) => {
            const display = document.getElementById('card-pan-display');
            const icon = e.currentTarget.querySelector('.material-icons');

            if (display.textContent.includes('\u2022\u2022\u2022\u2022')) {
                display.textContent = '4532 7689 3421 9876';
                icon.textContent = 'visibility_off';

                setTimeout(() => {
                    display.textContent = '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4532';
                    icon.textContent = 'visibility';
                }, 10000);
            } else {
                display.textContent = '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4532';
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

        // Request physical card
        document.getElementById('request-physical-btn')?.addEventListener('click', () => {
            document.getElementById('physical-card-modal').classList.add('active');
        });

        document.getElementById('physical-card-modal-close')?.addEventListener('click', () => {
            document.getElementById('physical-card-modal').classList.remove('active');
        });

        document.getElementById('physical-card-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'physical-card-modal') {
                document.getElementById('physical-card-modal').classList.remove('active');
            }
        });

        document.getElementById('physical-card-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('physical-card-modal').classList.remove('active');
            this.showSuccessModal('Card Requested', 'Your physical card will arrive in 7-10 business days.');
        });
    },

    // ==========================================
    // Transactions
    // ==========================================

    setupTransactionHandlers: function() {
        document.getElementById('transactions-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
        });

        document.querySelectorAll('.filter-chips .chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');

                const filter = e.target.getAttribute('data-filter');
                this.filterTransactions(filter);
            });
        });
    },

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

    // ==========================================
    // Bill Pay
    // ==========================================

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

    setupBillPayHandlers: function() {
        document.getElementById('billpay-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
            this.resetBillPayFlow();
        });

        document.getElementById('state-select')?.addEventListener('change', () => this.updateBillerOptions());
        document.getElementById('utility-type-select')?.addEventListener('change', () => this.updateBillerOptions());

        document.getElementById('biller-select')?.addEventListener('change', () => {
            // Biller selected — no validation needed for demo
        });

        document.getElementById('billpay-to-details')?.addEventListener('click', () => {
            const billerName = document.getElementById('biller-select').selectedOptions[0].text;
            document.getElementById('selected-biller-name').textContent = billerName;
            document.getElementById('billpay-select-biller').style.display = 'none';
            document.getElementById('billpay-enter-details').style.display = 'block';
            document.getElementById('billpay-step-2').classList.add('active');
        });

        // No validation needed for demo — buttons always enabled

        document.getElementById('billpay-to-review')?.addEventListener('click', () => {
            this.populateBillPayReview();
            document.getElementById('billpay-enter-details').style.display = 'none';
            document.getElementById('billpay-review').style.display = 'block';
            document.getElementById('billpay-step-3').classList.add('active');
        });

        document.getElementById('billpay-to-checkout')?.addEventListener('click', () => {
            const amount = document.getElementById('billpay-amount-input').value;
            const formatted = '$' + parseFloat(amount).toFixed(2);
            document.getElementById('checkout-amount').textContent = formatted;
            document.getElementById('checkout-pay-label').textContent = 'Pay ' + formatted;
            document.getElementById('billpay-review').style.display = 'none';
            document.getElementById('billpay-checkout').style.display = 'block';
            document.getElementById('billpay-step-4').classList.add('active');
        });

        document.getElementById('checkout-pay-btn')?.addEventListener('click', () => {
            this.processBillPayment();
        });

        document.getElementById('billpay-done-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
            this.resetBillPayFlow();
        });

        document.getElementById('search-reference-btn')?.addEventListener('click', () => {
            document.getElementById('reference-number-input').value = 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        });
    },

    updateBillerOptions: function() {
        const state = document.getElementById('state-select').value;
        const utility = document.getElementById('utility-type-select').value;
        const billerSelect = document.getElementById('biller-select');

        billerSelect.innerHTML = '<option value="">Choose a biller</option>';

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

    processBillPayment: function() {
        const billerSelect = document.getElementById('biller-select');
        const amount = document.getElementById('billpay-amount-input').value;
        const reference = document.getElementById('reference-number-input').value || 'N/A';

        const txnId = 'TXN-' + Date.now().toString(36).toUpperCase();

        document.getElementById('confirm-biller').textContent = billerSelect.selectedOptions[0].text;
        document.getElementById('confirm-amount').textContent = '$' + parseFloat(amount).toFixed(2);
        document.getElementById('confirm-reference').textContent = reference;
        document.getElementById('confirm-txn-id').textContent = txnId;
        document.getElementById('confirm-date').textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        document.getElementById('billpay-checkout').style.display = 'none';
        document.getElementById('billpay-confirmation').style.display = 'block';
    },

    resetBillPayFlow: function() {
        document.getElementById('billpay-select-biller').style.display = 'block';
        document.getElementById('billpay-enter-details').style.display = 'none';
        document.getElementById('billpay-review').style.display = 'none';
        document.getElementById('billpay-checkout').style.display = 'none';
        document.getElementById('billpay-confirmation').style.display = 'none';

        document.querySelectorAll('#billpay-progress .progress-step').forEach((step, i) => {
            if (i === 0) step.classList.add('active');
            else step.classList.remove('active');
        });

        document.getElementById('state-select').value = '';
        document.getElementById('utility-type-select').value = '';
        document.getElementById('biller-select').innerHTML = '<option value="">Choose a biller</option>';
        document.getElementById('account-number-input').value = '';
        document.getElementById('billpay-amount-input').value = '';
        document.getElementById('reference-number-input').value = '';
    },

    // ==========================================
    // Profile
    // ==========================================

    setupProfileHandlers: function() {
        document.getElementById('profile-back-btn')?.addEventListener('click', () => {
            this.showScreen('dashboard-screen');
        });

        // Language button opens modal instead of navigating away
        document.getElementById('language-settings-btn')?.addEventListener('click', () => {
            this.openLanguageModal();
        });

        // Sign out → go to landing page
        document.getElementById('sign-out-btn')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    },

    // ==========================================
    // Language Modal
    // ==========================================

    openLanguageModal: function() {
        const modal = document.getElementById('language-modal');
        modal.classList.add('active');

        // Mark current language as active
        document.querySelectorAll('.language-option').forEach(btn => {
            btn.classList.remove('active');
            const check = btn.querySelector('.lang-check');
            if (check) check.style.display = 'none';

            if (btn.dataset.lang === i18n.currentLanguage) {
                btn.classList.add('active');
                if (check) check.style.display = 'inline-block';
            }
        });
    },

    setupLanguageModal: function() {
        // Language option clicks
        document.querySelectorAll('.language-option').forEach(btn => {
            btn.addEventListener('click', () => {
                i18n.setLanguage(btn.dataset.lang);

                // Update all option states
                document.querySelectorAll('.language-option').forEach(b => {
                    b.classList.remove('active');
                    const check = b.querySelector('.lang-check');
                    if (check) check.style.display = 'none';
                });
                btn.classList.add('active');
                const check = btn.querySelector('.lang-check');
                if (check) check.style.display = 'inline-block';

                // Update T&C checkbox labels for new language
                CheckPayApp.updateTermsCheckboxLabels();

                // Sync welcome language dropdown
                var wls = document.getElementById('welcome-language-select');
                if (wls) wls.value = btn.dataset.lang;
            });
        });

        // Close language modal
        document.getElementById('language-modal-close')?.addEventListener('click', () => {
            document.getElementById('language-modal').classList.remove('active');
        });

        document.getElementById('language-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'language-modal') {
                document.getElementById('language-modal').classList.remove('active');
            }
        });
    },

    // ==========================================
    // Navigation
    // ==========================================

    setupNavigationHandlers: function() {
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

    // ==========================================
    // Dashboard Setup
    // ==========================================

    setupDashboard: function(mode) {
        if (mode === 'returning') {
            // Returning user — has balance, active card, transactions
            document.getElementById('balance-display').textContent = '$1,234.56';
            document.getElementById('header-available-balance').textContent = '$1,234.56';
            document.getElementById('header-pending-balance').textContent = '$850.00';
            document.querySelector('.user-name').textContent = 'Chris';

            // Update card preview to active state
            const cardPreview = document.getElementById('card-preview');
            if (cardPreview) {
                cardPreview.querySelector('.card-front').innerHTML = `
                    <div class="card-chip"></div>
                    <div class="card-number">\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4532</div>
                    <div class="card-details">
                        <div>
                            <div class="card-label" data-i18n="card.cardHolder">Card Holder</div>
                            <div class="card-value">CHRIS SQUIRE</div>
                        </div>
                        <div>
                            <div class="card-label" data-i18n="card.expires">Expires</div>
                            <div class="card-value">12/26</div>
                        </div>
                    </div>
                `;
            }

            // Load transaction history
            this.loadMockTransactions();
        }
        // 'new' mode — dashboard HTML already shows $0.00, pending card, empty transactions
    },

    // ==========================================
    // Mock Data & Utilities
    // ==========================================

    loadMockTransactions: function() {
        const transactions = [
            { type: 'check', title: 'Check Deposit', date: new Date(Date.now() - 86400000), amount: 850.00, status: 'completed' },
            { type: 'bill', title: 'Electric Bill', date: new Date(Date.now() - 172800000), amount: -125.50, status: 'completed' },
            { type: 'topup', title: 'Account Top-up', date: new Date(Date.now() - 259200000), amount: 500.00, status: 'pending' },
            { type: 'bill', title: 'Internet Bill', date: new Date(Date.now() - 345600000), amount: -89.99, status: 'completed' }
        ];

        this.renderTransactions(transactions, 'recent-transactions', 3);
        this.renderTransactions(transactions, 'all-transactions');
    },

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
                    <div class="transaction-date">${i18n.formatDate(tx.date)} \u2022 ${i18n.formatTime(tx.date)}</div>
                    <span class="transaction-status ${tx.status}">${this.capitalizeFirst(tx.status)}</span>
                </div>
                <div class="transaction-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
                    ${tx.amount > 0 ? '+' : ''}${i18n.formatCurrency(Math.abs(tx.amount))}
                </div>
            </div>
        `).join('');
    },

    getTransactionIcon: function(type) {
        const icons = { check: 'check_circle', bill: 'receipt', topup: 'add_circle' };
        return icons[type] || 'account_balance_wallet';
    },

    capitalizeFirst: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    showSuccessModal: function(title, message) {
        const modal = document.getElementById('success-modal');
        const titleEl = document.getElementById('success-title');
        const messageEl = document.getElementById('success-message');

        if (modal && titleEl && messageEl) {
            titleEl.textContent = title;
            messageEl.textContent = message;
            modal.classList.add('active');
        }
    },

    // ==========================================
    // Terms & Conditions Modal
    // ==========================================

    _termsDocType: 'terms',
    _termsOriginalLang: 'en',
    _termsViewingLang: 'en',

    setupTermsModal: function() {
        // Close handlers
        document.getElementById('terms-modal-close-x')?.addEventListener('click', () => {
            this.closeTermsModal();
        });
        document.getElementById('terms-modal-close')?.addEventListener('click', () => {
            this.closeTermsModal();
        });
        document.getElementById('terms-save-print')?.addEventListener('click', () => {
            window.print();
        });
        document.getElementById('terms-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'terms-modal') {
                this.closeTermsModal();
            }
        });

        // View English / View in language toggle
        document.getElementById('terms-view-english')?.addEventListener('click', () => {
            this.toggleTermsLanguage();
        });

        // Update checkbox labels and wire links
        this.updateTermsCheckboxLabels();
    },

    openTermsModal: function(docType) {
        docType = docType || 'terms';
        this._termsDocType = docType;
        this._termsOriginalLang = (typeof i18n !== 'undefined') ? i18n.currentLanguage : 'en';
        this._termsViewingLang = this._termsOriginalLang;

        if (typeof termsContent === 'undefined') return;

        this.renderTermsContent(this._termsViewingLang);
        document.getElementById('terms-modal').classList.add('active');
    },

    _getTermsSource: function() {
        if (this._termsDocType === 'deposit' && typeof depositTermsContent !== 'undefined') {
            return depositTermsContent;
        }
        return termsContent;
    },

    renderTermsContent: function(lang) {
        if (typeof termsContent === 'undefined') return;

        var source = this._getTermsSource();
        const data = source[lang] || source.en;
        const isEnglish = (lang === 'en');

        // Title
        document.getElementById('terms-modal-title').textContent = data.title;

        // Disclaimer banner
        const disclaimerEl = document.getElementById('terms-disclaimer');
        const disclaimerText = document.getElementById('terms-disclaimer-text');
        const viewToggleBtn = document.getElementById('terms-view-english');

        if (!isEnglish && data.disclaimer) {
            disclaimerEl.style.display = 'flex';
            disclaimerText.textContent = data.disclaimer;
            viewToggleBtn.textContent = (typeof i18n !== 'undefined' && i18n.t('terms.viewInEnglish'))
                ? i18n.t('terms.viewInEnglish')
                : 'View English (legally binding)';
        } else if (isEnglish && this._termsOriginalLang !== 'en') {
            disclaimerEl.style.display = 'flex';
            disclaimerText.textContent = (typeof i18n !== 'undefined' && i18n.t('terms.legallyBindingNote'))
                ? i18n.t('terms.legallyBindingNote')
                : 'You are viewing the legally binding English version.';
            const langNames = { es: 'Español', ph: 'Filipino', yo: 'Yorùbá' };
            const viewInLabel = (typeof i18n !== 'undefined' && i18n.t('terms.viewInLanguage'))
                ? i18n.t('terms.viewInLanguage')
                : 'View in ';
            viewToggleBtn.textContent = viewInLabel + (langNames[this._termsOriginalLang] || '');
        } else {
            disclaimerEl.style.display = 'none';
        }

        // Body
        const body = document.getElementById('terms-modal-body');
        const updatedLabel = (typeof i18n !== 'undefined' && i18n.t('terms.lastUpdated'))
            ? i18n.t('terms.lastUpdated')
            : 'Last updated';
        let html = '<p class="terms-last-updated">' + updatedLabel + ': ' + data.lastUpdated + '</p>';

        data.sections.forEach(function(section) {
            html += '<div class="terms-section">';
            html += '<h4 class="terms-section-heading">' + section.number + '. ' + section.heading + '</h4>';
            html += '<div class="terms-section-body">' + section.body + '</div>';
            html += '</div>';
        });

        // Acceptance note at bottom
        const acceptNote = (typeof i18n !== 'undefined' && i18n.t('terms.acceptanceNote'))
            ? i18n.t('terms.acceptanceNote')
            : 'BY ENROLLING IN OR USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.';
        html += '<div class="terms-acceptance-note">' + acceptNote + '</div>';

        body.innerHTML = html;
        body.scrollTop = 0;
    },

    toggleTermsLanguage: function() {
        if (this._termsViewingLang === 'en' && this._termsOriginalLang !== 'en') {
            this._termsViewingLang = this._termsOriginalLang;
        } else {
            this._termsViewingLang = 'en';
        }
        this.renderTermsContent(this._termsViewingLang);
    },

    closeTermsModal: function() {
        document.getElementById('terms-modal').classList.remove('active');
    },

    updateTermsCheckboxLabels: function() {
        const t = function(key) {
            return (typeof i18n !== 'undefined' && i18n.t) ? i18n.t(key) : null;
        };

        // KYC-A checkbox
        const kycLabel = document.querySelector('#kyc-tc-checkbox')?.parentElement?.querySelector('span');
        if (kycLabel) {
            kycLabel.innerHTML = (t('terms.iAgreeTo') || 'I agree to the ') +
                '<a href="#" class="tc-link" data-terms="terms">' + (t('terms.termsAndConditions') || 'Terms & Conditions') + '</a>' +
                (t('terms.and') || ' and ') +
                '<a href="#" class="tc-link" data-terms="privacy">' + (t('terms.privacyPolicy') || 'Privacy Policy') + '</a>';
        }

        // Check clearing checkbox
        const checkLabel = document.querySelector('#check-tc-checkbox')?.parentElement?.querySelector('span');
        if (checkLabel) {
            checkLabel.innerHTML = (t('terms.iAgreeTo') || 'I agree to the ') +
                '<a href="#" class="tc-link" data-terms="deposit">' + (t('terms.depositTerms') || 'Deposit Terms') + '</a>' +
                (t('terms.andAuthorize') || ' and authorize check clearing');
        }

        // Re-wire links after rebuilding innerHTML
        this.wireTermsLinks();
    },

    wireTermsLinks: function() {
        var self = this;
        document.querySelectorAll('.tc-link').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent checkbox toggle
                var docType = link.getAttribute('data-terms') || 'terms';
                self.openTermsModal(docType);
            });
        });
    }
};

// Close success modal
document.getElementById('success-modal-close')?.addEventListener('click', () => {
    document.getElementById('success-modal').classList.remove('active');
});

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
