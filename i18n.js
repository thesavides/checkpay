// PayMyBill - Internationalization System
// Modular i18n architecture for easy language expansion

const i18n = {
    currentLanguage: 'en',
    translations: {},
    
    // Translation data for all supported languages
    locales: {
        en: {
            welcome: {
                tagline: 'Cash your check, get your card instantly',
                selectLanguage: 'Select Language',
                getStarted: 'Get Started',
                feature1: 'No bank account needed',
                feature2: 'Get paid in minutes',
                feature3: 'Virtual card instantly'
            },
            kyc: {
                title: 'Verify Your Identity',
                step1: 'Passport',
                step2: 'Selfie',
                passportInfo: 'Take a clear photo of your passport photo page',
                uploadPassport: 'Tap to upload passport',
                selfieInfo: 'Take a selfie to verify your identity',
                takeSelfie: 'Tap to take selfie',
                submitVerification: 'Submit Verification'
            },
            dashboard: {
                welcome: 'Welcome back',
                availableBalance: 'Available Balance',
                cashCheck: 'Cash a Check',
                viewCard: 'View Card',
                payBill: 'Pay a Bill',
                recentActivity: 'Recent Activity'
            },
            check: {
                title: 'Cash a Check',
                front: 'Front',
                back: 'Back',
                confirm: 'Confirm',
                frontInfo: 'Take a photo of the front of your check',
                captureFront: 'Capture Check Front',
                backInfo: 'Take a photo of the back of your check',
                captureBack: 'Capture Check Back',
                confirmInfo: 'Review your check details',
                amount: 'Check Amount',
                processingTime: 'Processing Time',
                fee: 'Processing Fee',
                youReceive: "You'll Receive",
                submitCheck: 'Submit Check',
                processing: 'Processing Your Check',
                processingMessage: 'This usually takes 2-3 minutes',
                stepValidating: 'Validating check images',
                stepVerifying: 'Verifying funds',
                stepDepositing: 'Depositing to account'
            },
            card: {
                title: 'My Card',
                cardHolder: 'Card Holder',
                expires: 'Expires',
                freezeCard: 'Freeze Card',
                freezeDescription: 'Temporarily disable transactions',
                spendingLimits: 'Spending Limits',
                changePin: 'Change PIN',
                changePinDescription: 'Update your card PIN'
            },
            transactions: {
                title: 'Activity',
                all: 'All',
                pending: 'Pending',
                completed: 'Completed',
                failed: 'Failed',
                checkDeposit: 'Check Deposit',
                billPayment: 'Bill Payment',
                accountTopup: 'Account Top-up'
            },
            billpay: {
                title: 'Pay a Bill',
                selectBiller: 'Select Biller',
                chooseBiller: 'Choose a biller',
                accountNumber: 'Account Number',
                amount: 'Amount',
                paymentDate: 'Payment Date',
                processingInfo: 'Payments typically process within 1-2 business days',
                submitPayment: 'Submit Payment'
            },
            profile: {
                title: 'Profile & Settings',
                personalInfo: 'Personal Information',
                verificationDocuments: 'Verification Documents',
                contactInfo: 'Contact Information',
                preferences: 'Preferences',
                language: 'Language',
                notifications: 'Notifications',
                security: 'Security',
                changePassword: 'Change Password',
                biometric: 'Biometric Login',
                support: 'Support',
                helpCenter: 'Help Center',
                contactSupport: 'Contact Support',
                signOut: 'Sign Out'
            },
            nav: {
                home: 'Home',
                activity: 'Activity',
                card: 'Card',
                profile: 'Profile'
            },
            common: {
                continue: 'Continue',
                close: 'Close',
                viewAll: 'View All',
                cancel: 'Cancel',
                save: 'Save',
                delete: 'Delete'
            },
            modal: {
                success: 'Success!',
                successMessage: 'Your action was completed successfully',
                error: 'Error',
                errorMessage: 'Something went wrong. Please try again.'
            }
        },
        
        es: {
            welcome: {
                tagline: 'Cobra tu cheque, obtén tu tarjeta al instante',
                selectLanguage: 'Seleccionar Idioma',
                getStarted: 'Comenzar',
                feature1: 'No necesitas cuenta bancaria',
                feature2: 'Te pagan en minutos',
                feature3: 'Tarjeta virtual al instante'
            },
            kyc: {
                title: 'Verifica tu Identidad',
                step1: 'Pasaporte',
                step2: 'Selfie',
                passportInfo: 'Toma una foto clara de la página de foto de tu pasaporte',
                uploadPassport: 'Toca para subir pasaporte',
                selfieInfo: 'Toma una selfie para verificar tu identidad',
                takeSelfie: 'Toca para tomar selfie',
                submitVerification: 'Enviar Verificación'
            },
            dashboard: {
                welcome: 'Bienvenido de nuevo',
                availableBalance: 'Saldo Disponible',
                cashCheck: 'Cobrar un Cheque',
                viewCard: 'Ver Tarjeta',
                payBill: 'Pagar una Factura',
                recentActivity: 'Actividad Reciente'
            },
            check: {
                title: 'Cobrar un Cheque',
                front: 'Frente',
                back: 'Reverso',
                confirm: 'Confirmar',
                frontInfo: 'Toma una foto del frente de tu cheque',
                captureFront: 'Capturar Frente del Cheque',
                backInfo: 'Toma una foto del reverso de tu cheque',
                captureBack: 'Capturar Reverso del Cheque',
                confirmInfo: 'Revisa los detalles de tu cheque',
                amount: 'Monto del Cheque',
                processingTime: 'Tiempo de Procesamiento',
                fee: 'Tarifa de Procesamiento',
                youReceive: 'Recibirás',
                submitCheck: 'Enviar Cheque',
                processing: 'Procesando tu Cheque',
                processingMessage: 'Esto suele tomar 2-3 minutos',
                stepValidating: 'Validando imágenes del cheque',
                stepVerifying: 'Verificando fondos',
                stepDepositing: 'Depositando en cuenta'
            },
            card: {
                title: 'Mi Tarjeta',
                cardHolder: 'Titular de la Tarjeta',
                expires: 'Vence',
                freezeCard: 'Congelar Tarjeta',
                freezeDescription: 'Desactivar transacciones temporalmente',
                spendingLimits: 'Límites de Gasto',
                changePin: 'Cambiar PIN',
                changePinDescription: 'Actualizar tu PIN de tarjeta'
            },
            transactions: {
                title: 'Actividad',
                all: 'Todas',
                pending: 'Pendientes',
                completed: 'Completadas',
                failed: 'Fallidas',
                checkDeposit: 'Depósito de Cheque',
                billPayment: 'Pago de Factura',
                accountTopup: 'Recarga de Cuenta'
            },
            billpay: {
                title: 'Pagar una Factura',
                selectBiller: 'Seleccionar Proveedor',
                chooseBiller: 'Elige un proveedor',
                accountNumber: 'Número de Cuenta',
                amount: 'Monto',
                paymentDate: 'Fecha de Pago',
                processingInfo: 'Los pagos suelen procesarse en 1-2 días hábiles',
                submitPayment: 'Enviar Pago'
            },
            profile: {
                title: 'Perfil y Configuración',
                personalInfo: 'Información Personal',
                verificationDocuments: 'Documentos de Verificación',
                contactInfo: 'Información de Contacto',
                preferences: 'Preferencias',
                language: 'Idioma',
                notifications: 'Notificaciones',
                security: 'Seguridad',
                changePassword: 'Cambiar Contraseña',
                biometric: 'Inicio de Sesión Biométrico',
                support: 'Soporte',
                helpCenter: 'Centro de Ayuda',
                contactSupport: 'Contactar Soporte',
                signOut: 'Cerrar Sesión'
            },
            nav: {
                home: 'Inicio',
                activity: 'Actividad',
                card: 'Tarjeta',
                profile: 'Perfil'
            },
            common: {
                continue: 'Continuar',
                close: 'Cerrar',
                viewAll: 'Ver Todas',
                cancel: 'Cancelar',
                save: 'Guardar',
                delete: 'Eliminar'
            },
            modal: {
                success: '¡Éxito!',
                successMessage: 'Tu acción se completó exitosamente',
                error: 'Error',
                errorMessage: 'Algo salió mal. Por favor, inténtalo de nuevo.'
            }
        },
        
        ph: {
            welcome: {
                tagline: 'I-cash ang iyong tseke, kumuha ng card agad',
                selectLanguage: 'Pumili ng Wika',
                getStarted: 'Magsimula',
                feature1: 'Hindi kailangan ng bank account',
                feature2: 'Bayad sa loob ng ilang minuto',
                feature3: 'Virtual card kaagad'
            },
            kyc: {
                title: 'I-verify ang Iyong Pagkakakilanlan',
                step1: 'Pasaporte',
                step2: 'Selfie',
                passportInfo: 'Kumuha ng malinaw na larawan ng pahina ng litrato ng iyong pasaporte',
                uploadPassport: 'Pindutin para mag-upload ng pasaporte',
                selfieInfo: 'Kumuha ng selfie upang i-verify ang iyong pagkakakilanlan',
                takeSelfie: 'Pindutin para kumuha ng selfie',
                submitVerification: 'Isumite ang Verification'
            },
            dashboard: {
                welcome: 'Maligayang pagbabalik',
                availableBalance: 'Available na Balanse',
                cashCheck: 'Mag-cash ng Tseke',
                viewCard: 'Tingnan ang Card',
                payBill: 'Magbayad ng Bill',
                recentActivity: 'Kamakailang Aktibidad'
            },
            check: {
                title: 'Mag-cash ng Tseke',
                front: 'Harapan',
                back: 'Likod',
                confirm: 'Kumpirmahin',
                frontInfo: 'Kumuha ng larawan ng harapan ng iyong tseke',
                captureFront: 'Kunan ang Harapan ng Tseke',
                backInfo: 'Kumuha ng larawan ng likod ng iyong tseke',
                captureBack: 'Kunan ang Likod ng Tseke',
                confirmInfo: 'Suriin ang detalye ng iyong tseke',
                amount: 'Halaga ng Tseke',
                processingTime: 'Oras ng Pagproseso',
                fee: 'Bayad sa Pagproseso',
                youReceive: 'Makakatanggap Ka ng',
                submitCheck: 'Isumite ang Tseke',
                processing: 'Pinoproseso ang Iyong Tseke',
                processingMessage: 'Karaniwang tumatagal ito ng 2-3 minuto',
                stepValidating: 'Vina-validate ang mga larawan ng tseke',
                stepVerifying: 'Vine-verify ang mga pondo',
                stepDepositing: 'Dinideposito sa account'
            },
            card: {
                title: 'Ang Aking Card',
                cardHolder: 'May-ari ng Card',
                expires: 'Mag-e-expire',
                freezeCard: 'I-freeze ang Card',
                freezeDescription: 'Pansamantalang i-disable ang mga transaksyon',
                spendingLimits: 'Mga Limitasyon sa Paggastos',
                changePin: 'Palitan ang PIN',
                changePinDescription: 'I-update ang iyong PIN ng card'
            },
            transactions: {
                title: 'Aktibidad',
                all: 'Lahat',
                pending: 'Nakabinbin',
                completed: 'Nakumpleto',
                failed: 'Nabigo',
                checkDeposit: 'Deposito ng Tseke',
                billPayment: 'Pagbabayad ng Bill',
                accountTopup: 'Pag-top-up ng Account'
            },
            billpay: {
                title: 'Magbayad ng Bill',
                selectBiller: 'Pumili ng Biller',
                chooseBiller: 'Pumili ng biller',
                accountNumber: 'Numero ng Account',
                amount: 'Halaga',
                paymentDate: 'Petsa ng Pagbabayad',
                processingInfo: 'Karaniwang pinoproseso ang mga pagbabayad sa loob ng 1-2 araw ng negosyo',
                submitPayment: 'Isumite ang Pagbabayad'
            },
            profile: {
                title: 'Profile at Mga Setting',
                personalInfo: 'Personal na Impormasyon',
                verificationDocuments: 'Mga Dokumento ng Verification',
                contactInfo: 'Impormasyon sa Pakikipag-ugnayan',
                preferences: 'Mga Kagustuhan',
                language: 'Wika',
                notifications: 'Mga Notification',
                security: 'Seguridad',
                changePassword: 'Palitan ang Password',
                biometric: 'Biometric Login',
                support: 'Suporta',
                helpCenter: 'Help Center',
                contactSupport: 'Makipag-ugnayan sa Suporta',
                signOut: 'Mag-sign Out'
            },
            nav: {
                home: 'Home',
                activity: 'Aktibidad',
                card: 'Card',
                profile: 'Profile'
            },
            common: {
                continue: 'Magpatuloy',
                close: 'Isara',
                viewAll: 'Tingnan Lahat',
                cancel: 'Kanselahin',
                save: 'I-save',
                delete: 'Tanggalin'
            },
            modal: {
                success: 'Tagumpay!',
                successMessage: 'Matagumpay na nakumpleto ang iyong aksyon',
                error: 'Error',
                errorMessage: 'May nangyaring mali. Pakisubukan muli.'
            }
        },
        
        yo: {
            welcome: {
                tagline: 'Gba ṣẹki rẹ, gba kaadi rẹ lẹsẹkẹsẹ',
                selectLanguage: 'Yan Ede',
                getStarted: 'Bẹrẹ',
                feature1: 'Ko nilo akaun banki',
                feature2: 'Gba owo laarin iṣẹju diẹ',
                feature3: 'Kaadi foju lẹsẹkẹsẹ'
            },
            kyc: {
                title: 'Ṣe Idanimọ Rẹ',
                step1: 'Iwe-irinna',
                step2: 'Foti ara ẹni',
                passportInfo: 'Ya aworan ti o han kedere ti oju-iwe aworan iwe-irinna rẹ',
                uploadPassport: 'Tẹ lati gbejade iwe-irinna',
                selfieInfo: 'Ya foti ara rẹ lati ṣe idanimọ rẹ',
                takeSelfie: 'Tẹ lati ya foti ara ẹni',
                submitVerification: 'Fi Idanimọ ranṣẹ'
            },
            dashboard: {
                welcome: 'Kaabo pada',
                availableBalance: 'Iye Owo to Wa',
                cashCheck: 'Gba Ṣẹki',
                viewCard: 'Wo Kaadi',
                payBill: 'San Iwe-owo',
                recentActivity: 'Iṣẹ Laipe'
            },
            check: {
                title: 'Gba Ṣẹki',
                front: 'Iwaju',
                back: 'Ẹhin',
                confirm: 'Jẹrisi',
                frontInfo: 'Ya aworan iwaju ṣẹki rẹ',
                captureFront: 'Ya Iwaju Ṣẹki',
                backInfo: 'Ya aworan ẹhin ṣẹki rẹ',
                captureBack: 'Ya Ẹhin Ṣẹki',
                confirmInfo: 'Ṣayẹwo alaye ṣẹki rẹ',
                amount: 'Iye Ṣẹki',
                processingTime: 'Akoko Ṣiṣẹ',
                fee: 'Owo Ṣiṣẹ',
                youReceive: 'Iwọ Yoo Gba',
                submitCheck: 'Fi Ṣẹki ranṣẹ',
                processing: 'Nṣiṣẹ Ṣẹki Rẹ',
                processingMessage: 'Eyi maa ngba iṣẹju 2-3',
                stepValidating: 'Nṣe idanimọ aworan ṣẹki',
                stepVerifying: 'Nṣayẹwo owo',
                stepDepositing: 'Nfi sinu akaun'
            },
            card: {
                title: 'Kaadi Mi',
                cardHolder: 'Onitelorun Kaadi',
                expires: 'Yoo Pari',
                freezeCard: 'Pa Kaadi',
                freezeDescription: 'Pa iṣowo fun igba diẹ',
                spendingLimits: 'Opin Lilo Owo',
                changePin: 'Yipada PIN',
                changePinDescription: 'Ṣe imudojuiwọn PIN kaadi rẹ'
            },
            transactions: {
                title: 'Iṣẹ',
                all: 'Gbogbo',
                pending: 'Nduro',
                completed: 'Ti pari',
                failed: 'Ti kuna',
                checkDeposit: 'Ifipamọ Ṣẹki',
                billPayment: 'Sisanwo Iwe-owo',
                accountTopup: 'Fikun Akaun'
            },
            billpay: {
                title: 'San Iwe-owo',
                selectBiller: 'Yan Olugba Iwe-owo',
                chooseBiller: 'Yan olugba iwe-owo',
                accountNumber: 'Nọmba Akaun',
                amount: 'Iye Owo',
                paymentDate: 'Ọjọ Sisanwo',
                processingInfo: 'Sisanwo maa ngba ọjọ iṣowo 1-2',
                submitPayment: 'Fi Sisanwo ranṣẹ'
            },
            profile: {
                title: 'Profaili ati Eto',
                personalInfo: 'Alaye Ti ara ẹni',
                verificationDocuments: 'Awọn Iwe Idanimọ',
                contactInfo: 'Alaye Olubasọrọ',
                preferences: 'Awọn Ayanfẹ',
                language: 'Ede',
                notifications: 'Awọn Iwifun',
                security: 'Aabo',
                changePassword: 'Yi Ọrọigbaniwọle Pada',
                biometric: 'Wiwọle Biometric',
                support: 'Atilẹyin',
                helpCenter: 'Ile-iṣẹ Iranlọwọ',
                contactSupport: 'Kan si Atilẹyin',
                signOut: 'Jade'
            },
            nav: {
                home: 'Ile',
                activity: 'Iṣẹ',
                card: 'Kaadi',
                profile: 'Profaili'
            },
            common: {
                continue: 'Tẹsiwaju',
                close: 'Tiipa',
                viewAll: 'Wo Gbogbo',
                cancel: 'Fagilee',
                save: 'Fipamọ',
                delete: 'Paare'
            },
            modal: {
                success: 'Aṣeyọri!',
                successMessage: 'Iṣẹ rẹ ti pari ni aṣeyọri',
                error: 'Aṣiṣe',
                errorMessage: 'Nkan kan ṣẹlẹ. Jọwọ gbiyanju lẹẹkansi.'
            }
        }
    },
    
    // Initialize i18n system
    init: function(defaultLanguage = 'en') {
        this.currentLanguage = localStorage.getItem('paymybill-language') || defaultLanguage;
        this.translations = this.locales[this.currentLanguage];
        this.updateUI();
    },
    
    // Change language
    setLanguage: function(languageCode) {
        if (this.locales[languageCode]) {
            this.currentLanguage = languageCode;
            this.translations = this.locales[languageCode];
            localStorage.setItem('paymybill-language', languageCode);
            this.updateUI();
            return true;
        }
        return false;
    },
    
    // Get translation by key path
    t: function(keyPath) {
        const keys = keyPath.split('.');
        let value = this.translations;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Translation missing for key: ${keyPath}`);
                return keyPath; // Fallback to key path
            }
        }
        
        return value;
    },
    
    // Update all UI elements with translations
    updateUI: function() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' && element.placeholder) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update language selector
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
        }
        
        // Update current language display in settings
        const currentLangDisplay = document.getElementById('current-language-display');
        if (currentLangDisplay) {
            const languageNames = {
                'en': 'English',
                'es': 'Español',
                'ph': 'Filipino',
                'yo': 'Yorùbá'
            };
            currentLangDisplay.textContent = languageNames[this.currentLanguage];
        }
    },
    
    // Format currency based on locale
    formatCurrency: function(amount, currency = 'USD') {
        const localeMap = {
            'en': 'en-US',
            'es': 'es-MX',
            'ph': 'fil-PH',
            'yo': 'yo-NG'
        };
        
        const locale = localeMap[this.currentLanguage] || 'en-US';
        
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Format date based on locale
    formatDate: function(date) {
        const localeMap = {
            'en': 'en-US',
            'es': 'es-MX',
            'ph': 'fil-PH',
            'yo': 'yo-NG'
        };
        
        const locale = localeMap[this.currentLanguage] || 'en-US';
        
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    },
    
    // Format time based on locale
    formatTime: function(date) {
        const localeMap = {
            'en': 'en-US',
            'es': 'es-MX',
            'ph': 'fil-PH',
            'yo': 'yo-NG'
        };
        
        const locale = localeMap[this.currentLanguage] || 'en-US';
        
        return new Intl.DateTimeFormat(locale, {
            hour: 'numeric',
            minute: '2-digit'
        }).format(date);
    }
};

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}
