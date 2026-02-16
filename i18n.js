// CheckPay - Internationalization System
// Modular i18n architecture for easy language expansion

const i18n = {
    currentLanguage: 'en',
    translations: {},

    // Translation data for all supported languages
    locales: {
        en: {
            welcome: {
                tagline: 'Clear your payroll check, get your card instantly',
                selectLanguage: 'Select Language',
                getStarted: 'Get an Account',
                signIn: 'Already have an account? Sign In',
                feature1: 'No bank account needed',
                feature2: 'Get paid in minutes',
                feature3: 'Virtual card instantly'
            },
            kyc: {
                title: 'Account Verification',
                stepInfo: 'Info',
                stepId: 'ID',
                stepSelfie: 'Selfie',
                stepSetup: 'Setup',
                reassurance: 'One-time setup to activate your account. Your data is encrypted and protected.',
                fullName: 'Full Legal Name',
                dob: 'Date of Birth',
                itin: 'ITIN (Individual Taxpayer ID)',
                itinHint: 'Used only for deposit processing. Never shared.',
                address: 'Street Address',
                city: 'City',
                state: 'State',
                zip: 'ZIP Code',
                encryptedNote: 'Your documents are encrypted end-to-end',
                step1: 'Passport',
                step2: 'Selfie',
                passportInfo: 'Take a clear photo of your passport photo page',
                uploadPassport: 'Tap to upload government ID',
                selfieInfo: 'Take a selfie to verify your identity',
                takeSelfie: 'Tap to take selfie',
                submitVerification: 'Submit Verification',
                provisioning: 'Setting Up Your Account',
                provisioningMessage: 'Creating your virtual card and wallet...',
                stepVerifyingId: 'Verifying identity',
                stepCreatingCard: 'Creating virtual card',
                stepActivating: 'Activating wallet',
                accountReady: 'Account Ready!',
                accountReadyMessage: 'Your account is set up and your virtual card is ready to use.'
            },
            dashboard: {
                welcome: 'Welcome back',
                availableBalance: 'Available Balance',
                cashCheck: 'Clear a Check',
                viewCard: 'View Card',
                payBill: 'Pay a Bill',
                recentActivity: 'Recent Activity'
            },
            balance: {
                pendingBalance: 'Pending'
            },
            check: {
                title: 'Clear a Check',
                front: 'Front',
                back: 'Back',
                verify: 'Verify',
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
                saferMessage: 'Safer than standing in line. Your deposit is protected.',
                processing: 'Processing Your Check',
                processingMessage: 'This usually takes 2-3 minutes',
                stepValidating: 'Validating check images',
                stepVerifying: 'Verifying funds',
                stepDepositing: 'Depositing to account'
            },
            checkVerify: {
                title: 'Secure Deposit Confirmation',
                subtitle: 'Required by the clearing bank to protect your deposit',
                replacesLine: 'This replaces standing in line at a check clearing store',
                takeSelfie: 'Tap to confirm identity',
                itinConfirm: 'ITIN ending in',
                payableToMe: 'This check is payable to me',
                endorseTitle: 'Endorsement Required',
                endorseDetail: 'Sign the back of your check and write "For mobile deposit only - CheckPay"'
            },
            deposit: {
                title: 'Deposit Status',
                subtitle: 'Track your check as it processes',
                submitted: 'Submitted',
                underReview: 'Under Review',
                accepted: 'Accepted',
                pending: 'Pending (Clearing)',
                cleared: 'Cleared',
                clearedMessage: 'Your check has been deposited. Funds are now available!',
                backToDashboard: 'Back to Dashboard'
            },
            card: {
                title: 'My Card',
                cardHolder: 'Card Holder',
                expires: 'Expires',
                freezeCard: 'Freeze Card',
                freezeDescription: 'Temporarily disable transactions',
                spendingLimits: 'Spending Limits',
                changePin: 'Change PIN',
                changePinDescription: 'Update your card PIN',
                requestPhysicalCard: 'Request Physical Card',
                requestPhysicalCardDescription: 'Get a card for ATM withdrawals',
                physicalCardModalTitle: 'Request Physical Card',
                physicalCardModalSubtitle: 'Verify your mailing address to receive your card.',
                requestCardBtn: 'Request Card'
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
                selectState: 'Select State',
                utilityType: 'Utility Type',
                selectBiller: 'Select Biller',
                chooseBiller: 'Choose a biller',
                accountNumber: 'Account Number',
                amount: 'Amount',
                referenceNumber: 'Reference Number',
                paymentDate: 'Payment Date',
                processingInfo: 'Payments typically process within 1-2 business days',
                submitPayment: 'Submit Payment',
                reviewPayment: 'Review Payment',
                proceedToPayment: 'Proceed to Payment',
                paymentSuccessful: 'Payment Successful',
                paymentProcessing: 'Your payment is being processed',
                backToDashboard: 'Back to Dashboard'
            },
            profile: {
                title: 'Profile & Settings',
                selectLanguage: 'Select Language',
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
            },
            landing: {
                navFeatures: 'Features',
                navHowItWorks: 'How It Works',
                navFaq: 'FAQ',
                signIn: 'Sign In',
                getStarted: 'Get Started',
                heroTitle1: 'Clear Your Payroll Check,',
                heroTitle2: 'Card Instantly',
                heroGetYour: 'Get Your ',
                heroDescription: 'No bank account needed. Upload your paycheck, verify your identity, and receive a virtual debit card in minutes. Start spending or paying bills immediately.',
                learnMore: 'Learn More',
                statTime: 'Processing Time',
                statLanguages: 'Languages',
                statSupport: 'Support',
                mockWelcome: 'Welcome back, Chris',
                mockDashboard: 'Your Dashboard',
                mockBalance: 'Available Balance',
                mockVirtualCard: 'VIRTUAL CARD',
                mockExpires: 'EXPIRES',
                mockCvv: 'CVV',
                mockClearCheck: 'Clear Check',
                mockViewCard: 'View Card',
                mockPayBill: 'Pay Bill',
                featuresTitle: 'Everything You Need, All in One Place',
                featuresSubtitle: 'CheckPay offers a comprehensive suite of financial services to help you manage money without a traditional bank account.',
                featureCheckTitle: 'Payroll Check Clearing',
                featureCheckDesc: 'Scan your payroll check and clear it directly to your account. No trips to the bank, no waiting in line.',
                featureCardTitle: 'Virtual Debit Card',
                featureCardDesc: 'Get a virtual card instantly upon account creation. Use it for online purchases, bill payments, and anywhere cards are accepted.',
                featureKycTitle: 'Secure KYC Verification',
                featureKycDesc: 'Simple identity verification with passport and selfie. Your data is encrypted and protected with bank-level security.',
                featureBillTitle: 'Bill Payments',
                featureBillDesc: 'Pay utility bills, subscriptions, and more directly from your account. Schedule payments and never miss a due date.',
                featureMobileTitle: 'Mobile Top-Up',
                featureMobileDesc: 'Send mobile credit to phones worldwide. Support family and friends across any distance with instant top-ups.',
                featureLangTitle: 'Multi-Language Support',
                featureLangDesc: 'Available in English, Spanish, Filipino, and Yoruba. Use the app in your preferred language for a seamless experience.',
                howTitle: 'Simple & Transparent, Every Time',
                howSubtitle: 'Getting started with CheckPay is as easy as 1-2-3. Follow our straightforward process.',
                howStep1Title: 'Verify Your Identity',
                howStep1Desc: 'Upload your passport and take a quick selfie. Our secure system verifies your identity in seconds.',
                howStep2Title: 'Upload Your Check',
                howStep2Desc: 'Take photos of the front and back of your paycheck. Our AI validates the check instantly.',
                howStep3Title: 'Receive Your Card',
                howStep3Desc: 'Get your virtual debit card immediately. Start spending, paying bills, or sending money right away.',
                howStep4Title: 'Start Transacting',
                howStep4Desc: 'Use your card for purchases, pay bills, top up phones, or clear more checks. All from your mobile device.',
                langSectionTitle: 'Available in Your Language',
                langSectionSubtitle: 'CheckPay speaks your language. Choose from English, Spanish, Filipino, or Yoruba for a fully localized experience.',
                faqTitle: 'Frequently Asked Questions',
                faqSubtitle: 'Everything you need to know about CheckPay.',
                faqQ1: 'What is CheckPay?',
                faqA1: 'CheckPay is a secure way to deposit checks, receive funds, and pay bills without standing in line at a check-cashing store or bank. Deposit checks from your phone, get a virtual card to spend your money, and pay bills online.',
                faqQ2: 'Do I need a Social Security Number (SSN)?',
                faqA2: 'No. CheckPay supports ITIN-based identity verification. You are not required to have an SSN to open an account or deposit checks.',
                faqQ3: 'What do I need to create an account?',
                faqA3: 'To open your account, you will need a valid government-issued ID, your ITIN (if applicable), your residential address, and a quick selfie verification. This information is required to verify your identity and open your account securely.',
                faqQ4: 'Why do I need to verify my identity?',
                faqA4: 'U.S. banks are required to verify the identity of account holders and check depositors. This protects you from fraud and ensures your funds are processed safely. Identity verification replaces the in-person ID checks you would normally go through at a check-cashing store.',
                faqQ5: 'Is my information shared with immigration authorities?',
                faqA5: 'No. Your information is encrypted, used only for identity verification and deposit processing, and shared only with required banking and clearing partners. Your information is not used for immigration enforcement purposes.',
                faqQ6: 'Why do I have to confirm my identity again when depositing a check?',
                faqA6: 'When you deposit a check, the clearing bank must confirm that the check belongs to you and the deposit is legitimate. This is called Secure Deposit Confirmation. It replaces the in-person verification you would normally complete at a physical location.',
                faqQ7: 'Is this eye-tracking or surveillance?',
                faqA7: 'No. Selfie verification checks that a real person is making the deposit. It is not tracking you beyond that moment and is not used for monitoring or surveillance. It is used strictly for deposit security.',
                faqQ8: 'How long does it take to receive funds?',
                faqA8: 'You will see the deposit status in your app: Submitted, Under Review, Accepted, Pending, and Cleared. Once cleared, funds move from "Pending" to "Available" in your balance. Processing time depends on the clearing bank and check type.',
                faqQ9: 'Are there fees?',
                faqA9: 'Fees may apply to check deposit processing, check clearing, bill payments, and certain transfers. All fees are displayed before you confirm a transaction. There are no hidden charges.',
                faqQ10: 'Is my money safe?',
                faqA10: 'Funds are processed through regulated banking partners. Your deposits go through a U.S. clearing bank or assigned financial partner. Your data is encrypted and protected with bank-level security.',
                faqQ11: 'Can I get my money as cash?',
                faqA11: 'Yes. You can request a physical debit card inside the app. Once your physical card arrives, you can use it at any ATM to withdraw cash from your account balance.',
                faqQ12: 'Who holds my money?',
                faqA12: 'CheckPay does not hold your funds. When you deposit a check, it is processed and cleared by our clearing partner, ClearPath Bank. Once cleared, your funds are held by Horizon Card Bank, who also issues your virtual and physical debit cards. Both banks are FDIC-insured, so your money is protected.',
                ctaTitle: 'Ready to Get Started?',
                ctaSubtitle: 'Sign up, create your account, scan a check, and get paid. No bank account required.',
                ctaFreeToStart: 'Free to start • No hidden fees • 24/7 support',
                footerPrivacy: 'Privacy Policy',
                footerTerms: 'Terms of Service',
                footerSupport: 'Support',
                footerCopyright: '© 2025 CheckPay. All rights reserved.',
                footerTagline: 'Empowering financial inclusion through technology.'
            }
        },

        es: {
            welcome: {
                tagline: 'Deposita tu cheque de nómina, obtén tu tarjeta al instante',
                selectLanguage: 'Seleccionar Idioma',
                getStarted: 'Obtener una Cuenta',
                signIn: '\u00bfYa tienes cuenta? Iniciar Sesi\u00f3n',
                feature1: 'No necesitas cuenta bancaria',
                feature2: 'Te pagan en minutos',
                feature3: 'Tarjeta virtual al instante'
            },
            kyc: {
                title: 'Verificaci\u00f3n de Cuenta',
                stepInfo: 'Info',
                stepId: 'ID',
                stepSelfie: 'Selfie',
                stepSetup: 'Config',
                reassurance: 'Configuraci\u00f3n \u00fanica para activar tu cuenta. Tus datos est\u00e1n encriptados y protegidos.',
                fullName: 'Nombre Legal Completo',
                dob: 'Fecha de Nacimiento',
                itin: 'ITIN (N\u00famero de Identificaci\u00f3n Fiscal)',
                itinHint: 'Usado solo para procesamiento de dep\u00f3sitos. Nunca se comparte.',
                address: 'Direcci\u00f3n',
                city: 'Ciudad',
                state: 'Estado',
                zip: 'C\u00f3digo Postal',
                encryptedNote: 'Tus documentos est\u00e1n encriptados de extremo a extremo',
                step1: 'Pasaporte',
                step2: 'Selfie',
                passportInfo: 'Toma una foto clara de la p\u00e1gina de foto de tu pasaporte',
                uploadPassport: 'Toca para subir identificaci\u00f3n',
                selfieInfo: 'Toma una selfie para verificar tu identidad',
                takeSelfie: 'Toca para tomar selfie',
                submitVerification: 'Enviar Verificaci\u00f3n',
                provisioning: 'Configurando Tu Cuenta',
                provisioningMessage: 'Creando tu tarjeta virtual y billetera...',
                stepVerifyingId: 'Verificando identidad',
                stepCreatingCard: 'Creando tarjeta virtual',
                stepActivating: 'Activando billetera',
                accountReady: '\u00a1Cuenta Lista!',
                accountReadyMessage: 'Tu cuenta est\u00e1 configurada y tu tarjeta virtual est\u00e1 lista para usar.'
            },
            dashboard: {
                welcome: 'Bienvenido de nuevo',
                availableBalance: 'Saldo Disponible',
                cashCheck: 'Compensar un Cheque',
                viewCard: 'Ver Tarjeta',
                payBill: 'Pagar una Factura',
                recentActivity: 'Actividad Reciente'
            },
            balance: {
                pendingBalance: 'Pendiente'
            },
            check: {
                title: 'Compensar un Cheque',
                front: 'Frente',
                back: 'Reverso',
                verify: 'Verificar',
                confirm: 'Confirmar',
                frontInfo: 'Toma una foto del frente de tu cheque',
                captureFront: 'Capturar Frente del Cheque',
                backInfo: 'Toma una foto del reverso de tu cheque',
                captureBack: 'Capturar Reverso del Cheque',
                confirmInfo: 'Revisa los detalles de tu cheque',
                amount: 'Monto del Cheque',
                processingTime: 'Tiempo de Procesamiento',
                fee: 'Tarifa de Procesamiento',
                youReceive: 'Recibir\u00e1s',
                submitCheck: 'Enviar Cheque',
                saferMessage: 'M\u00e1s seguro que hacer fila. Tu dep\u00f3sito est\u00e1 protegido.',
                processing: 'Procesando tu Cheque',
                processingMessage: 'Esto suele tomar 2-3 minutos',
                stepValidating: 'Validando im\u00e1genes del cheque',
                stepVerifying: 'Verificando fondos',
                stepDepositing: 'Depositando en cuenta'
            },
            checkVerify: {
                title: 'Confirmaci\u00f3n Segura de Dep\u00f3sito',
                subtitle: 'Requerido por el banco para proteger tu dep\u00f3sito',
                replacesLine: 'Esto reemplaza hacer fila en una tienda de compensación de cheques',
                takeSelfie: 'Toca para confirmar identidad',
                itinConfirm: 'ITIN que termina en',
                payableToMe: 'Este cheque es pagadero a m\u00ed',
                endorseTitle: 'Endoso Requerido',
                endorseDetail: 'Firma el reverso de tu cheque y escribe "Solo para dep\u00f3sito m\u00f3vil - CheckPay"'
            },
            deposit: {
                title: 'Estado del Dep\u00f3sito',
                subtitle: 'Sigue tu cheque mientras se procesa',
                submitted: 'Enviado',
                underReview: 'En Revisi\u00f3n',
                accepted: 'Aceptado',
                pending: 'Pendiente (Compensando)',
                cleared: 'Compensado',
                clearedMessage: '\u00a1Tu cheque ha sido depositado. Los fondos ya est\u00e1n disponibles!',
                backToDashboard: 'Volver al Inicio'
            },
            card: {
                title: 'Mi Tarjeta',
                cardHolder: 'Titular de la Tarjeta',
                expires: 'Vence',
                freezeCard: 'Congelar Tarjeta',
                freezeDescription: 'Desactivar transacciones temporalmente',
                spendingLimits: 'L\u00edmites de Gasto',
                changePin: 'Cambiar PIN',
                changePinDescription: 'Actualizar tu PIN de tarjeta',
                requestPhysicalCard: 'Solicitar Tarjeta Física',
                requestPhysicalCardDescription: 'Obtener una tarjeta para retiros en cajeros',
                physicalCardModalTitle: 'Solicitar Tarjeta Física',
                physicalCardModalSubtitle: 'Verifica tu dirección postal para recibir tu tarjeta.',
                requestCardBtn: 'Solicitar Tarjeta'
            },
            transactions: {
                title: 'Actividad',
                all: 'Todas',
                pending: 'Pendientes',
                completed: 'Completadas',
                failed: 'Fallidas',
                checkDeposit: 'Dep\u00f3sito de Cheque',
                billPayment: 'Pago de Factura',
                accountTopup: 'Recarga de Cuenta'
            },
            billpay: {
                title: 'Pagar una Factura',
                selectState: 'Seleccionar Estado',
                utilityType: 'Tipo de Servicio',
                selectBiller: 'Seleccionar Proveedor',
                chooseBiller: 'Elige un proveedor',
                accountNumber: 'N\u00famero de Cuenta',
                amount: 'Monto',
                referenceNumber: 'N\u00famero de Referencia',
                paymentDate: 'Fecha de Pago',
                processingInfo: 'Los pagos suelen procesarse en 1-2 d\u00edas h\u00e1biles',
                submitPayment: 'Enviar Pago',
                reviewPayment: 'Revisar Pago',
                proceedToPayment: 'Proceder al Pago',
                paymentSuccessful: 'Pago Exitoso',
                paymentProcessing: 'Tu pago est\u00e1 siendo procesado',
                backToDashboard: 'Volver al Inicio'
            },
            profile: {
                title: 'Perfil y Configuraci\u00f3n',
                selectLanguage: 'Seleccionar Idioma',
                personalInfo: 'Informaci\u00f3n Personal',
                verificationDocuments: 'Documentos de Verificaci\u00f3n',
                contactInfo: 'Informaci\u00f3n de Contacto',
                preferences: 'Preferencias',
                language: 'Idioma',
                notifications: 'Notificaciones',
                security: 'Seguridad',
                changePassword: 'Cambiar Contrase\u00f1a',
                biometric: 'Inicio de Sesi\u00f3n Biom\u00e9trico',
                support: 'Soporte',
                helpCenter: 'Centro de Ayuda',
                contactSupport: 'Contactar Soporte',
                signOut: 'Cerrar Sesi\u00f3n'
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
                success: '\u00a1\u00c9xito!',
                successMessage: 'Tu acci\u00f3n se complet\u00f3 exitosamente',
                error: 'Error',
                errorMessage: 'Algo sali\u00f3 mal. Por favor, int\u00e9ntalo de nuevo.'
            },
            landing: {
                navFeatures: 'Funciones',
                navHowItWorks: 'C\u00f3mo Funciona',
                navFaq: 'Preguntas',
                signIn: 'Iniciar Sesi\u00f3n',
                getStarted: 'Comenzar',
                heroTitle1: 'Deposita Tu Cheque de N\u00f3mina,',
                heroTitle2: 'Tarjeta al Instante',
                heroGetYour: 'Obt\u00e9n Tu ',
                heroDescription: 'No necesitas cuenta bancaria. Sube tu cheque de n\u00f3mina, verifica tu identidad y recibe una tarjeta de d\u00e9bito virtual en minutos. Empieza a gastar o pagar facturas de inmediato.',
                learnMore: 'Saber M\u00e1s',
                statTime: 'Tiempo de Proceso',
                statLanguages: 'Idiomas',
                statSupport: 'Soporte',
                mockWelcome: 'Bienvenido de nuevo, Chris',
                mockDashboard: 'Tu Panel',
                mockBalance: 'Saldo Disponible',
                mockVirtualCard: 'TARJETA VIRTUAL',
                mockExpires: 'VENCE',
                mockCvv: 'CVV',
                mockClearCheck: 'Compensar Cheque',
                mockViewCard: 'Ver Tarjeta',
                mockPayBill: 'Pagar Factura',
                featuresTitle: 'Todo Lo Que Necesitas, En Un Solo Lugar',
                featuresSubtitle: 'CheckPay ofrece servicios financieros completos para ayudarte a manejar tu dinero sin una cuenta bancaria tradicional.',
                featureCheckTitle: 'Compensaci\u00f3n de Cheques',
                featureCheckDesc: 'Escanea tu cheque de n\u00f3mina y dep\u00f3sitalo directamente en tu cuenta. Sin ir al banco, sin hacer fila.',
                featureCardTitle: 'Tarjeta de D\u00e9bito Virtual',
                featureCardDesc: 'Obt\u00e9n una tarjeta virtual al instante al crear tu cuenta. \u00dasala para compras en l\u00ednea, pagos de facturas y donde acepten tarjetas.',
                featureKycTitle: 'Verificaci\u00f3n KYC Segura',
                featureKycDesc: 'Verificaci\u00f3n de identidad simple con pasaporte y selfie. Tus datos est\u00e1n encriptados y protegidos con seguridad bancaria.',
                featureBillTitle: 'Pago de Facturas',
                featureBillDesc: 'Paga facturas de servicios, suscripciones y m\u00e1s directamente desde tu cuenta. Programa pagos y nunca pierdas una fecha de vencimiento.',
                featureMobileTitle: 'Recarga M\u00f3vil',
                featureMobileDesc: 'Env\u00eda cr\u00e9dito m\u00f3vil a tel\u00e9fonos en todo el mundo. Apoya a familia y amigos a cualquier distancia con recargas instant\u00e1neas.',
                featureLangTitle: 'Soporte Multi-Idioma',
                featureLangDesc: 'Disponible en ingl\u00e9s, espa\u00f1ol, filipino y yoruba. Usa la app en tu idioma preferido para una experiencia completa.',
                howTitle: 'Simple y Transparente, Siempre',
                howSubtitle: 'Comenzar con CheckPay es tan f\u00e1cil como 1-2-3. Sigue nuestro proceso sencillo.',
                howStep1Title: 'Verifica Tu Identidad',
                howStep1Desc: 'Sube tu pasaporte y toma una selfie r\u00e1pida. Nuestro sistema seguro verifica tu identidad en segundos.',
                howStep2Title: 'Sube Tu Cheque',
                howStep2Desc: 'Toma fotos del frente y reverso de tu cheque de n\u00f3mina. Nuestra IA valida el cheque al instante.',
                howStep3Title: 'Recibe Tu Tarjeta',
                howStep3Desc: 'Obt\u00e9n tu tarjeta de d\u00e9bito virtual inmediatamente. Empieza a gastar, pagar facturas o enviar dinero de inmediato.',
                howStep4Title: 'Empieza a Hacer Transacciones',
                howStep4Desc: 'Usa tu tarjeta para compras, paga facturas, recarga tel\u00e9fonos o deposita m\u00e1s cheques. Todo desde tu dispositivo m\u00f3vil.',
                langSectionTitle: 'Disponible en Tu Idioma',
                langSectionSubtitle: 'CheckPay habla tu idioma. Elige entre ingl\u00e9s, espa\u00f1ol, filipino o yoruba para una experiencia completamente localizada.',
                faqTitle: 'Preguntas Frecuentes',
                faqSubtitle: 'Todo lo que necesitas saber sobre CheckPay.',
                faqQ1: '\u00bfQu\u00e9 es CheckPay?',
                faqA1: 'CheckPay es una forma segura de depositar cheques, recibir fondos y pagar facturas sin hacer fila en una tienda de cambio de cheques o banco. Deposita cheques desde tu tel\u00e9fono, obt\u00e9n una tarjeta virtual para gastar tu dinero y paga facturas en l\u00ednea.',
                faqQ2: '\u00bfNecesito un N\u00famero de Seguro Social (SSN)?',
                faqA2: 'No. CheckPay admite verificaci\u00f3n de identidad basada en ITIN. No se requiere un SSN para abrir una cuenta o depositar cheques.',
                faqQ3: '\u00bfQu\u00e9 necesito para crear una cuenta?',
                faqA3: 'Para abrir tu cuenta, necesitar\u00e1s una identificaci\u00f3n oficial v\u00e1lida, tu ITIN (si aplica), tu direcci\u00f3n residencial y una r\u00e1pida verificaci\u00f3n con selfie. Esta informaci\u00f3n se requiere para verificar tu identidad y abrir tu cuenta de forma segura.',
                faqQ4: '\u00bfPor qu\u00e9 necesito verificar mi identidad?',
                faqA4: 'Los bancos de EE.UU. est\u00e1n obligados a verificar la identidad de los titulares de cuentas y depositantes de cheques. Esto te protege del fraude y asegura que tus fondos se procesen de forma segura. La verificaci\u00f3n de identidad reemplaza las verificaciones presenciales que normalmente har\u00edas en una tienda de cambio de cheques.',
                faqQ5: '\u00bfSe comparte mi informaci\u00f3n con autoridades migratorias?',
                faqA5: 'No. Tu informaci\u00f3n est\u00e1 encriptada, se usa solo para verificaci\u00f3n de identidad y procesamiento de dep\u00f3sitos, y se comparte solo con socios bancarios requeridos. Tu informaci\u00f3n no se usa para prop\u00f3sitos de cumplimiento migratorio.',
                faqQ6: '\u00bfPor qu\u00e9 tengo que confirmar mi identidad otra vez al depositar un cheque?',
                faqA6: 'Cuando depositas un cheque, el banco compensador debe confirmar que el cheque te pertenece y que el dep\u00f3sito es leg\u00edtimo. Esto se llama Confirmaci\u00f3n Segura de Dep\u00f3sito. Reemplaza la verificaci\u00f3n presencial que normalmente completar\u00edas en una ubicaci\u00f3n f\u00edsica.',
                faqQ7: '\u00bfEsto es rastreo ocular o vigilancia?',
                faqA7: 'No. La verificaci\u00f3n con selfie comprueba que una persona real est\u00e1 haciendo el dep\u00f3sito. No te rastrea m\u00e1s all\u00e1 de ese momento y no se usa para monitoreo o vigilancia. Se usa estrictamente para seguridad de dep\u00f3sitos.',
                faqQ8: '\u00bfCu\u00e1nto tarda en recibir los fondos?',
                faqA8: 'Ver\u00e1s el estado del dep\u00f3sito en tu app: Enviado, En Revisi\u00f3n, Aceptado, Pendiente y Compensado. Una vez compensado, los fondos pasan de "Pendiente" a "Disponible" en tu saldo. El tiempo de procesamiento depende del banco compensador y tipo de cheque.',
                faqQ9: '\u00bfHay comisiones?',
                faqA9: 'Pueden aplicarse comisiones al procesamiento de dep\u00f3sitos de cheques, compensaci\u00f3n, pagos de facturas y ciertas transferencias. Todas las comisiones se muestran antes de confirmar una transacci\u00f3n. No hay cargos ocultos.',
                faqQ10: '\u00bfEst\u00e1 seguro mi dinero?',
                faqA10: 'Los fondos se procesan a trav\u00e9s de socios bancarios regulados. Tus dep\u00f3sitos pasan por un banco compensador de EE.UU. o un socio financiero asignado. Tus datos est\u00e1n encriptados y protegidos con seguridad bancaria.',
                faqQ11: '\u00bfPuedo obtener mi dinero en efectivo?',
                faqA11: 'S\u00ed. Puedes solicitar una tarjeta de d\u00e9bito f\u00edsica dentro de la app. Una vez que llegue tu tarjeta f\u00edsica, puedes usarla en cualquier cajero autom\u00e1tico para retirar efectivo de tu saldo.',
                faqQ12: '\u00bfQui\u00e9n tiene mi dinero?',
                faqA12: 'CheckPay no retiene tus fondos. Cuando depositas un cheque, es procesado y compensado por nuestro socio compensador, ClearPath Bank. Una vez compensado, tus fondos son retenidos por Horizon Card Bank, quien tambi\u00e9n emite tus tarjetas de d\u00e9bito virtuales y f\u00edsicas. Ambos bancos est\u00e1n asegurados por la FDIC, as\u00ed que tu dinero est\u00e1 protegido.',
                ctaTitle: '\u00bfListo Para Comenzar?',
                ctaSubtitle: 'Reg\u00edstrate, crea tu cuenta, escanea un cheque y cobra. No se requiere cuenta bancaria.',
                ctaFreeToStart: 'Gratis para empezar \u2022 Sin cargos ocultos \u2022 Soporte 24/7',
                footerPrivacy: 'Pol\u00edtica de Privacidad',
                footerTerms: 'T\u00e9rminos de Servicio',
                footerSupport: 'Soporte',
                footerCopyright: '\u00a9 2025 CheckPay. Todos los derechos reservados.',
                footerTagline: 'Impulsando la inclusi\u00f3n financiera a trav\u00e9s de la tecnolog\u00eda.'
            }
        },

        ph: {
            welcome: {
                tagline: 'I-clear ang iyong payroll check, kumuha ng card agad',
                selectLanguage: 'Pumili ng Wika',
                getStarted: 'Kumuha ng Account',
                signIn: 'May account ka na? Mag-sign In',
                feature1: 'Hindi kailangan ng bank account',
                feature2: 'Bayad sa loob ng ilang minuto',
                feature3: 'Virtual card kaagad'
            },
            kyc: {
                title: 'Pag-verify ng Account',
                stepInfo: 'Info',
                stepId: 'ID',
                stepSelfie: 'Selfie',
                stepSetup: 'Setup',
                reassurance: 'Isang beses lang na setup para i-activate ang iyong account. Ang iyong data ay naka-encrypt at protektado.',
                fullName: 'Buong Legal na Pangalan',
                dob: 'Petsa ng Kapanganakan',
                itin: 'ITIN (Individual Taxpayer ID)',
                itinHint: 'Ginagamit lang para sa pagproseso ng deposito. Hindi ibinabahagi.',
                address: 'Address ng Kalye',
                city: 'Lungsod',
                state: 'Estado',
                zip: 'ZIP Code',
                encryptedNote: 'Ang iyong mga dokumento ay naka-encrypt mula dulo hanggang dulo',
                step1: 'Pasaporte',
                step2: 'Selfie',
                passportInfo: 'Kumuha ng malinaw na larawan ng pahina ng litrato ng iyong pasaporte',
                uploadPassport: 'Pindutin para mag-upload ng ID',
                selfieInfo: 'Kumuha ng selfie upang i-verify ang iyong pagkakakilanlan',
                takeSelfie: 'Pindutin para kumuha ng selfie',
                submitVerification: 'Isumite ang Verification',
                provisioning: 'Isineset-up ang Iyong Account',
                provisioningMessage: 'Ginagawa ang iyong virtual card at wallet...',
                stepVerifyingId: 'Vine-verify ang pagkakakilanlan',
                stepCreatingCard: 'Ginagawa ang virtual card',
                stepActivating: 'Ina-activate ang wallet',
                accountReady: 'Handa na ang Account!',
                accountReadyMessage: 'Na-set up na ang iyong account at handa na ang iyong virtual card.'
            },
            dashboard: {
                welcome: 'Maligayang pagbabalik',
                availableBalance: 'Available na Balanse',
                cashCheck: 'Mag-clear ng Tseke',
                viewCard: 'Tingnan ang Card',
                payBill: 'Magbayad ng Bill',
                recentActivity: 'Kamakailang Aktibidad'
            },
            balance: {
                pendingBalance: 'Nakabinbin'
            },
            check: {
                title: 'Mag-clear ng Tseke',
                front: 'Harapan',
                back: 'Likod',
                verify: 'I-verify',
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
                saferMessage: 'Mas ligtas kaysa pumila. Protektado ang iyong deposito.',
                processing: 'Pinoproseso ang Iyong Tseke',
                processingMessage: 'Karaniwang tumatagal ito ng 2-3 minuto',
                stepValidating: 'Vina-validate ang mga larawan ng tseke',
                stepVerifying: 'Vine-verify ang mga pondo',
                stepDepositing: 'Dinideposito sa account'
            },
            checkVerify: {
                title: 'Secure na Kumpirmasyon ng Deposito',
                subtitle: 'Kinakailangan ng clearing bank para protektahan ang iyong deposito',
                replacesLine: 'Kapalit ito ng pagpila sa tindahan ng pag-clear ng tseke',
                takeSelfie: 'Pindutin para kumpirmahin ang pagkakakilanlan',
                itinConfirm: 'ITIN na nagtatapos sa',
                payableToMe: 'Ang tsekeng ito ay nakapangalan sa akin',
                endorseTitle: 'Kailangan ng Endorso',
                endorseDetail: 'Pirmahan ang likod ng iyong tseke at isulat "For mobile deposit only - CheckPay"'
            },
            deposit: {
                title: 'Status ng Deposito',
                subtitle: 'Subaybayan ang iyong tseke habang pinoproseso',
                submitted: 'Naisumite',
                underReview: 'Sinusuri',
                accepted: 'Tinanggap',
                pending: 'Nakabinbin (Kini-clear)',
                cleared: 'Na-clear',
                clearedMessage: 'Naideposito na ang iyong tseke. Available na ang mga pondo!',
                backToDashboard: 'Bumalik sa Dashboard'
            },
            card: {
                title: 'Ang Aking Card',
                cardHolder: 'May-ari ng Card',
                expires: 'Mag-e-expire',
                freezeCard: 'I-freeze ang Card',
                freezeDescription: 'Pansamantalang i-disable ang mga transaksyon',
                spendingLimits: 'Mga Limitasyon sa Paggastos',
                changePin: 'Palitan ang PIN',
                changePinDescription: 'I-update ang iyong PIN ng card',
                requestPhysicalCard: 'Mag-request ng Physical Card',
                requestPhysicalCardDescription: 'Kumuha ng card para sa ATM withdrawals',
                physicalCardModalTitle: 'Mag-request ng Physical Card',
                physicalCardModalSubtitle: 'I-verify ang iyong mailing address para matanggap ang card.',
                requestCardBtn: 'I-request ang Card'
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
                selectState: 'Pumili ng Estado',
                utilityType: 'Uri ng Utility',
                selectBiller: 'Pumili ng Biller',
                chooseBiller: 'Pumili ng biller',
                accountNumber: 'Numero ng Account',
                amount: 'Halaga',
                referenceNumber: 'Numero ng Reperensya',
                paymentDate: 'Petsa ng Pagbabayad',
                processingInfo: 'Karaniwang pinoproseso ang mga pagbabayad sa loob ng 1-2 araw ng negosyo',
                submitPayment: 'Isumite ang Pagbabayad',
                reviewPayment: 'Suriin ang Pagbabayad',
                proceedToPayment: 'Magpatuloy sa Pagbabayad',
                paymentSuccessful: 'Matagumpay ang Pagbabayad',
                paymentProcessing: 'Pinoproseso ang iyong pagbabayad',
                backToDashboard: 'Bumalik sa Dashboard'
            },
            profile: {
                title: 'Profile at Mga Setting',
                selectLanguage: 'Pumili ng Wika',
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
            },
            landing: {
                navFeatures: 'Mga Feature',
                navHowItWorks: 'Paano Gumagana',
                navFaq: 'FAQ',
                signIn: 'Mag-sign In',
                getStarted: 'Magsimula',
                heroTitle1: 'I-clear ang Iyong Payroll Check,',
                heroTitle2: 'Card Agad',
                heroGetYour: 'Kumuha ng ',
                heroDescription: 'Hindi kailangan ng bank account. I-upload ang iyong paycheck, i-verify ang iyong identity, at makakuha ng virtual debit card sa loob ng ilang minuto. Magsimulang gumastos o magbayad ng bills agad.',
                learnMore: 'Alamin Pa',
                statTime: 'Oras ng Pagproseso',
                statLanguages: 'Mga Wika',
                statSupport: 'Suporta',
                mockWelcome: 'Maligayang pagbabalik, Chris',
                mockDashboard: 'Ang Iyong Dashboard',
                mockBalance: 'Available na Balanse',
                mockVirtualCard: 'VIRTUAL CARD',
                mockExpires: 'MAG-E-EXPIRE',
                mockCvv: 'CVV',
                mockClearCheck: 'I-clear Check',
                mockViewCard: 'Tingnan Card',
                mockPayBill: 'Magbayad Bill',
                featuresTitle: 'Lahat ng Kailangan Mo, Sa Isang Lugar',
                featuresSubtitle: 'Nag-aalok ang CheckPay ng kumpletong financial services para tulungan kang pamahalaan ang pera mo nang walang tradisyonal na bank account.',
                featureCheckTitle: 'Payroll Check Clearing',
                featureCheckDesc: 'I-scan ang iyong payroll check at i-clear ito direkta sa iyong account. Walang pagpunta sa bangko, walang pagpila.',
                featureCardTitle: 'Virtual Debit Card',
                featureCardDesc: 'Kumuha ng virtual card agad pagkagawa ng account. Gamitin ito para sa online purchases, bill payments, at kahit saan tumatanggap ng cards.',
                featureKycTitle: 'Secure na KYC Verification',
                featureKycDesc: 'Simpleng identity verification gamit ang passport at selfie. Ang iyong data ay naka-encrypt at protektado ng bank-level security.',
                featureBillTitle: 'Pagbabayad ng Bills',
                featureBillDesc: 'Magbayad ng utility bills, subscriptions, at iba pa direkta mula sa iyong account. Mag-schedule ng payments at huwag palampasin ang due date.',
                featureMobileTitle: 'Mobile Top-Up',
                featureMobileDesc: 'Magpadala ng mobile credit sa mga phone sa buong mundo. Suportahan ang pamilya at mga kaibigan kahit gaano kalayo gamit ang instant top-ups.',
                featureLangTitle: 'Multi-Language Support',
                featureLangDesc: 'Available sa English, Spanish, Filipino, at Yoruba. Gamitin ang app sa iyong preferred na wika para sa seamless na experience.',
                howTitle: 'Simple at Transparent, Palagi',
                howSubtitle: 'Ang pagsisimula sa CheckPay ay kasing-dali ng 1-2-3. Sundin ang aming straightforward na proseso.',
                howStep1Title: 'I-verify ang Iyong Identity',
                howStep1Desc: 'I-upload ang iyong passport at kumuha ng mabilis na selfie. Vine-verify ng aming secure system ang iyong identity sa loob ng ilang segundo.',
                howStep2Title: 'I-upload ang Iyong Check',
                howStep2Desc: 'Kumuha ng mga larawan ng harapan at likod ng iyong paycheck. Vine-validate ng aming AI ang check agad.',
                howStep3Title: 'Tanggapin ang Iyong Card',
                howStep3Desc: 'Kumuha ng iyong virtual debit card agad-agad. Magsimulang gumastos, magbayad ng bills, o magpadala ng pera kaagad.',
                howStep4Title: 'Magsimulang Mag-transact',
                howStep4Desc: 'Gamitin ang iyong card para sa mga pagbili, magbayad ng bills, mag-top up ng phones, o mag-clear ng mas maraming checks. Lahat mula sa iyong mobile device.',
                langSectionTitle: 'Available sa Iyong Wika',
                langSectionSubtitle: 'Nagsasalita ang CheckPay ng iyong wika. Pumili mula sa English, Spanish, Filipino, o Yoruba para sa fully localized na experience.',
                faqTitle: 'Mga Madalas Itanong',
                faqSubtitle: 'Lahat ng kailangan mong malaman tungkol sa CheckPay.',
                faqQ1: 'Ano ang CheckPay?',
                faqA1: 'Ang CheckPay ay isang secure na paraan para mag-deposito ng checks, tumanggap ng funds, at magbayad ng bills nang hindi pumipila sa check-cashing store o bangko. Mag-deposito ng checks mula sa iyong phone, kumuha ng virtual card para gastusin ang pera mo, at magbayad ng bills online.',
                faqQ2: 'Kailangan ko ba ng Social Security Number (SSN)?',
                faqA2: 'Hindi. Suportado ng CheckPay ang ITIN-based identity verification. Hindi kailangan ng SSN para magbukas ng account o mag-deposito ng checks.',
                faqQ3: 'Ano ang kailangan ko para gumawa ng account?',
                faqA3: 'Para buksan ang iyong account, kakailanganin mo ng valid na government-issued ID, ang iyong ITIN (kung naaangkop), ang iyong residential address, at mabilis na selfie verification. Kinakailangan ang impormasyong ito para i-verify ang iyong identity at buksan ang account nang secure.',
                faqQ4: 'Bakit kailangan kong i-verify ang aking identity?',
                faqA4: 'Kinakailangan ng mga bangko sa U.S. na i-verify ang identity ng mga account holders at check depositors. Pinoprotektahan ka nito mula sa fraud at tinitiyak na ang iyong funds ay napoproseso nang ligtas. Pinapalitan ng identity verification ang in-person na ID checks na karaniwang ginagawa mo sa check-cashing store.',
                faqQ5: 'Ibinabahagi ba ang aking impormasyon sa mga awtoridad ng imigrasyon?',
                faqA5: 'Hindi. Ang iyong impormasyon ay naka-encrypt, ginagamit lang para sa identity verification at deposit processing, at ibinabahagi lang sa mga kinakailangang banking partners. Hindi ginagamit ang iyong impormasyon para sa immigration enforcement.',
                faqQ6: 'Bakit kailangan kong kumpirmahin ulit ang aking identity kapag nagde-deposito ng check?',
                faqA6: 'Kapag nagde-deposito ka ng check, kailangang kumpirmahin ng clearing bank na ang check ay sa iyo at lehitimo ang deposito. Ito ay tinatawag na Secure Deposit Confirmation. Pinapalitan nito ang in-person verification na karaniwang ginagawa mo sa isang pisikal na lokasyon.',
                faqQ7: 'Ito ba ay eye-tracking o surveillance?',
                faqA7: 'Hindi. Tinitingnan ng selfie verification na isang totoong tao ang gumagawa ng deposito. Hindi ka nito tina-track lampas sa sandaling iyon at hindi ito ginagamit para sa monitoring o surveillance. Ginagamit ito strictly para sa deposit security.',
                faqQ8: 'Gaano katagal bago matanggap ang mga pondo?',
                faqA8: 'Makikita mo ang deposit status sa iyong app: Naisumite, Sinusuri, Tinanggap, Nakabinbin, at Na-clear. Kapag na-clear na, lumilipat ang mga pondo mula "Nakabinbin" patungo sa "Available" sa iyong balanse. Nakadepende ang processing time sa clearing bank at uri ng check.',
                faqQ9: 'May mga bayad ba?',
                faqA9: 'Maaaring may mga bayad sa check deposit processing, check clearing, bill payments, at ilang mga transfers. Ipinapakita ang lahat ng bayad bago mo kumpirmahin ang transaksyon. Walang mga nakatagong bayad.',
                faqQ10: 'Ligtas ba ang aking pera?',
                faqA10: 'Pinoproseso ang mga pondo sa pamamagitan ng mga regulated banking partners. Dumadaan ang iyong mga deposito sa isang U.S. clearing bank o itinalagang financial partner. Ang iyong data ay naka-encrypt at protektado ng bank-level security.',
                faqQ11: 'Maaari ko bang makuha ang aking pera bilang cash?',
                faqA11: 'Oo. Maaari kang mag-request ng physical debit card sa loob ng app. Kapag dumating na ang iyong physical card, magagamit mo ito sa kahit anong ATM para mag-withdraw ng cash mula sa iyong account balance.',
                faqQ12: 'Sino ang may hawak ng aking pera?',
                faqA12: 'Hindi hinahawakan ng CheckPay ang iyong mga pondo. Kapag nagde-deposito ka ng check, pinoproseso at kini-clear ito ng aming clearing partner, ClearPath Bank. Kapag na-clear na, ang iyong mga pondo ay hinahawakan ng Horizon Card Bank, na nagbi-bigay din ng iyong virtual at physical debit cards. Parehong FDIC-insured ang mga bangko, kaya protektado ang iyong pera.',
                ctaTitle: 'Handa Ka Na Bang Magsimula?',
                ctaSubtitle: 'Mag-sign up, gumawa ng account, mag-scan ng check, at magpabayad. Hindi kailangan ng bank account.',
                ctaFreeToStart: 'Libre magsimula \u2022 Walang nakatagong bayad \u2022 24/7 suporta',
                footerPrivacy: 'Patakaran sa Privacy',
                footerTerms: 'Mga Tuntunin ng Serbisyo',
                footerSupport: 'Suporta',
                footerCopyright: '\u00a9 2025 CheckPay. Lahat ng karapatan ay nakalaan.',
                footerTagline: 'Nagpapalakas ng financial inclusion sa pamamagitan ng teknolohiya.'
            }
        },

        yo: {
            welcome: {
                tagline: 'Gba owó ṣẹki oṣù rẹ, gba kaadi rẹ lẹṣẹkẹṣẹ',
                selectLanguage: 'Yan Ede',
                getStarted: 'Gba Akaun',
                signIn: 'Ni akaun t\u1eb9l\u1eb9? W\u1ecdl\u00e9',
                feature1: 'Ko nilo akaun banki',
                feature2: 'Gba owo laarin i\u1e63\u1eb9ju di\u1eb9',
                feature3: 'Kaadi foju l\u1eb9\u1e63\u1eb9k\u1eb9\u1e63\u1eb9'
            },
            kyc: {
                title: '\u1e62e Idanim\u1ecd Akaun',
                stepInfo: 'Alaye',
                stepId: 'ID',
                stepSelfie: 'Foti',
                stepSetup: 'Eto',
                reassurance: 'Eto \u1eb9\u1eb9kan lati mu akaun r\u1eb9 \u1e63i\u1e63\u1eb9. Data r\u1eb9 wa ni aabo.',
                fullName: 'Oruk\u1ecd Ofin Ni Kikun',
                dob: '\u1eccj\u1ecd \u00ccb\u00ed',
                itin: 'ITIN (N\u1ecdmba Idanim\u1ecd Owo-ori)',
                itinHint: 'A lo fun \u1e63i\u1e63\u1eb9 ifipam\u1ecd nikan. A ko pin fun \u1eb9nikeni.',
                address: 'Adires\u1eb9',
                city: '\u00ccl\u00fa',
                state: 'Ipinl\u1eb9',
                zip: 'Koodu P\u00f3\u00f2s\u00edt\u00ec',
                encryptedNote: 'Aw\u1ecdn iwe r\u1eb9 wa ni aabo lati ib\u1eb9r\u1eb9 de opin',
                step1: 'Iwe-irinna',
                step2: 'Foti ara \u1eb9ni',
                passportInfo: 'Ya aworan ti o han kedere ti oju-iwe aworan iwe-irinna r\u1eb9',
                uploadPassport: 'T\u1eb9 lati gbejade ID',
                selfieInfo: 'Ya foti ara r\u1eb9 lati \u1e63e idanim\u1ecd r\u1eb9',
                takeSelfie: 'T\u1eb9 lati ya foti ara \u1eb9ni',
                submitVerification: 'Fi Idanim\u1ecd ran\u1e63\u1eb9',
                provisioning: 'N\u1e63eto Akaun R\u1eb9',
                provisioningMessage: 'N\u1e63\u1eb9da kaadi foju ati apam\u1ecdwo r\u1eb9...',
                stepVerifyingId: 'N\u1e63e idanim\u1ecd',
                stepCreatingCard: 'N\u1e63\u1eb9da kaadi foju',
                stepActivating: 'Nmu apam\u1ecdwo \u1e63i\u1e63\u1eb9',
                accountReady: 'Akaun Ti \u1e62etan!',
                accountReadyMessage: 'Akaun r\u1eb9 ti setan ati kaadi foju r\u1eb9 setan lati lo.'
            },
            dashboard: {
                welcome: 'Kaabo pada',
                availableBalance: 'Iye Owo to Wa',
                cashCheck: 'Fi \u1e62\u1eb9ki kal\u1eb9',
                viewCard: 'Wo Kaadi',
                payBill: 'San Iwe-owo',
                recentActivity: 'I\u1e63\u1eb9 Laipe'
            },
            balance: {
                pendingBalance: 'Nduro'
            },
            check: {
                title: 'Fi \u1e62\u1eb9ki kal\u1eb9',
                front: 'Iwaju',
                back: '\u1eb8hin',
                verify: '\u1e62ay\u1eb9wo',
                confirm: 'J\u1eb9risi',
                frontInfo: 'Ya aworan iwaju \u1e63\u1eb9ki r\u1eb9',
                captureFront: 'Ya Iwaju \u1e62\u1eb9ki',
                backInfo: 'Ya aworan \u1eb9hin \u1e63\u1eb9ki r\u1eb9',
                captureBack: 'Ya \u1eb8hin \u1e62\u1eb9ki',
                confirmInfo: '\u1e62ay\u1eb9wo alaye \u1e63\u1eb9ki r\u1eb9',
                amount: 'Iye \u1e62\u1eb9ki',
                processingTime: 'Akoko \u1e62i\u1e63\u1eb9',
                fee: 'Owo \u1e62i\u1e63\u1eb9',
                youReceive: 'Iw\u1ecd Yoo Gba',
                submitCheck: 'Fi \u1e62\u1eb9ki ran\u1e63\u1eb9',
                saferMessage: 'O ni aabo ju lati duro ni ila lo. Ifipam\u1ecd r\u1eb9 wa ni aabo.',
                processing: 'N\u1e63i\u1e63\u1eb9 \u1e62\u1eb9ki R\u1eb9',
                processingMessage: 'Eyi maa ngba i\u1e63\u1eb9ju 2-3',
                stepValidating: 'N\u1e63e idanim\u1ecd aworan \u1e63\u1eb9ki',
                stepVerifying: 'N\u1e63ay\u1eb9wo owo',
                stepDepositing: 'Nfi sinu akaun'
            },
            checkVerify: {
                title: 'Ijeri\u1e63i Ifipam\u1ecd Aabo',
                subtitle: 'Banki nilo eyi lati daabo bo ifipam\u1ecd r\u1eb9',
                replacesLine: 'Eyi ropo diduro ni ila ni ile i\u1e63\u1eb9-\u1e63\u1eb9ki',
                takeSelfie: 'T\u1eb9 lati j\u1eb9risi idanim\u1ecd',
                itinConfirm: 'ITIN ti o pari ni',
                payableToMe: 'A k\u1ecd \u1e63\u1eb9ki yii si oruk\u1ecd mi',
                endorseTitle: 'Ifowosi Nilo',
                endorseDetail: 'Fi owo si \u1eb9hin \u1e63\u1eb9ki r\u1eb9 ki o k\u1ecd "Fun ifipam\u1ecd foonu nikan - CheckPay"'
            },
            deposit: {
                title: 'Ipo Ifipam\u1ecd',
                subtitle: 'T\u1eb9le \u1e63\u1eb9ki r\u1eb9 bi a \u1e63e n\u1e63i\u1e63\u1eb9',
                submitted: 'Ti Fi Ran\u1e63\u1eb9',
                underReview: 'Ab\u1eb9wo',
                accepted: 'Ti Gba',
                pending: 'Nduro (Nsisan)',
                cleared: 'Ti pari',
                clearedMessage: 'A ti fi \u1e63\u1eb9ki r\u1eb9 pam\u1ecd. Owo ti wa!',
                backToDashboard: 'Pada si Ile'
            },
            card: {
                title: 'Kaadi Mi',
                cardHolder: 'Eni to ni Kaadi',
                expires: 'Yoo Pari',
                freezeCard: 'Da Kaadi Duro',
                freezeDescription: 'Da i\u1e63owo duro fun igba di\u1eb9',
                spendingLimits: 'Opin Lilo Owo',
                changePin: 'Yipada PIN',
                changePinDescription: 'Ṣe imudojuiwọn PIN kaadi rẹ',
                requestPhysicalCard: 'Beere fun Kaadi Gidi',
                requestPhysicalCardDescription: 'Gba kaadi fun yiyọ owo ni ATM',
                physicalCardModalTitle: 'Beere fun Kaadi Gidi',
                physicalCardModalSubtitle: 'Jẹrisi adirẹsi ifiranṣẹ rẹ lati gba kaadi rẹ.',
                requestCardBtn: 'Beere fun Kaadi'
            },
            transactions: {
                title: 'I\u1e63\u1eb9',
                all: 'Gbogbo',
                pending: 'Nduro',
                completed: 'Ti pari',
                failed: 'Ti kuna',
                checkDeposit: 'Ifipam\u1ecd \u1e62\u1eb9ki',
                billPayment: 'Sisanwo Iwe-owo',
                accountTopup: 'Fikun Akaun'
            },
            billpay: {
                title: 'San Iwe-owo',
                selectState: 'Yan Ipinl\u1eb9',
                utilityType: 'Iru I\u1e63\u1eb9',
                selectBiller: 'Yan Olugba Iwe-owo',
                chooseBiller: 'Yan olugba iwe-owo',
                accountNumber: 'N\u1ecdmba Akaun',
                amount: 'Iye Owo',
                referenceNumber: 'N\u1ecdmba It\u1ecdkasi',
                paymentDate: '\u1eccj\u1ecd Sisanwo',
                processingInfo: 'Sisanwo maa ngba \u1ecdj\u1ecd i\u1e63owo 1-2',
                submitPayment: 'Fi Sisanwo ran\u1e63\u1eb9',
                reviewPayment: '\u1e62ay\u1eb9wo Sisanwo',
                proceedToPayment: 'T\u1eb9siwaju si Sisanwo',
                paymentSuccessful: 'Sisanwo ti \u1e62a\u1e63ey\u1ecdri',
                paymentProcessing: 'Sisanwo r\u1eb9 n\u1e63i\u1e63\u1eb9',
                backToDashboard: 'Pada si Ile'
            },
            profile: {
                title: 'Profaili ati Eto',
                selectLanguage: 'Yan Ede',
                personalInfo: 'Alaye Ti ara \u1eb9ni',
                verificationDocuments: 'Aw\u1ecdn Iwe Idanim\u1ecd',
                contactInfo: 'Alaye Olubas\u1ecdro',
                preferences: 'Aw\u1ecdn Ayanf\u1eb9',
                language: 'Ede',
                notifications: 'Aw\u1ecdn Iwifun',
                security: 'Aabo',
                changePassword: 'Yi \u1ecdr\u1ecdigbaniwole Pada',
                biometric: 'Wiw\u1ecdle Biometric',
                support: 'Atil\u1eb9yin',
                helpCenter: 'Ile-i\u1e63\u1eb9 Iranl\u1ecdw\u1ecd',
                contactSupport: 'Kan si Atil\u1eb9yin',
                signOut: 'Jade'
            },
            nav: {
                home: 'Ile',
                activity: 'I\u1e63\u1eb9',
                card: 'Kaadi',
                profile: 'Profaili'
            },
            common: {
                continue: 'T\u1eb9siwaju',
                close: 'Tiipa',
                viewAll: 'Wo Gbogbo',
                cancel: 'Fagilee',
                save: 'Fipam\u1ecd',
                delete: 'Paare'
            },
            modal: {
                success: 'A\u1e63ey\u1ecdri!',
                successMessage: 'I\u1e63\u1eb9 r\u1eb9 ti pari ni a\u1e63ey\u1ecdri',
                error: 'A\u1e63i\u1e63e',
                errorMessage: 'Nkan kan \u1e63\u1eb9l\u1eb9. J\u1ecdw\u1ecd gbiyanju l\u1eb9\u1eb9kansi.'
            },
            landing: {
                navFeatures: 'Aw\u1ecdn \u1eb8ya',
                navHowItWorks: 'B\u00ed O \u1e62e N\u1e63i\u1e63\u1eb9',
                navFaq: '\u00ccb\u00e8\u00e8r\u00e8',
                signIn: 'W\u1ecdl\u00e9',
                getStarted: 'B\u1eb9r\u1eb9',
                heroTitle1: 'Gba Ow\u00f3 \u1e62\u1eb9ki O\u1e63\u00f9 R\u1eb9,',
                heroTitle2: 'Kaadi L\u1eb9\u1e63\u1eb9k\u1eb9\u1e63\u1eb9',
                heroGetYour: 'Gba ',
                heroDescription: 'K\u00f2 n\u00edl\u00f2 akaun banki. Gbe \u1e63\u1eb9ki o\u1e63\u00f9 r\u1eb9 s\u00edl\u1eb9, j\u1eb9r\u00eds\u00ed idanim\u1ecd r\u1eb9, k\u00ed o gba kaadi d\u1eb9b\u00edti foj\u00fa l\u00e1\u00e0r\u00edn i\u1e63\u1eb9j\u00fa d\u00ed\u1eb9. B\u1eb9r\u1eb9 l\u00e1ti n\u00e1w\u00f3 t\u00e0b\u00ed san \u00edw\u00e9-ow\u00f3 l\u1eb9\u1e63\u1eb9k\u1eb9\u1e63\u1eb9.',
                learnMore: 'K\u1eb9 Sii',
                statTime: '\u00c0k\u00f3k\u00f2 \u1e62i\u1e63\u1eb9',
                statLanguages: 'Aw\u1ecdn Ed\u00e8',
                statSupport: 'Atil\u1eb9yin',
                mockWelcome: 'Kaabo pada, Chris',
                mockDashboard: 'Dashboard R\u1eb9',
                mockBalance: 'Iye Ow\u00f3 to Wa',
                mockVirtualCard: 'KAADI FOJ\u00da',
                mockExpires: 'YOO PARI',
                mockCvv: 'CVV',
                mockClearCheck: 'Fi \u1e62\u1eb9ki',
                mockViewCard: 'Wo Kaadi',
                mockPayBill: 'San Owo',
                featuresTitle: 'Gbogbo Ohun T\u00ed O N\u00edl\u00f2, N\u00ed Ibi Kan',
                featuresSubtitle: 'CheckPay n fun \u1ecd gbogbo iru i\u1e63\u1eb9 ow\u00f3 l\u00e1ti r\u00e0n \u1ecd l\u1ecdw\u1ecd l\u00e1ti \u1e63\u00e0k\u00f3s\u00f3 ow\u00f3 r\u1eb9 l\u00e1\u00ecl\u00e9s\u00ed akaun banki.',
                featureCheckTitle: 'Gba Ow\u00f3 \u1e62\u1eb9ki O\u1e63\u00f9',
                featureCheckDesc: 'Ya \u1e63\u1eb9ki o\u1e63\u00f9 r\u1eb9 k\u00ed o gba ow\u00f3 r\u1eb9 t\u00e0\u00e1r\u00e0 s\u00ed akaun r\u1eb9. K\u00f2 s\u00ed l\u00edl\u00f2 s\u00ed banki, k\u00f2 s\u00ed d\u00edd\u00far\u00f3 n\u00ed \u00ecl\u00e0.',
                featureCardTitle: 'Kaadi D\u1eb9b\u00edti Foj\u00fa',
                featureCardDesc: 'Gba kaadi foj\u00fa l\u1eb9\u1e63\u1eb9k\u1eb9\u1e63\u1eb9 n\u00edgb\u00e0 t\u00ed o b\u00e1 \u1e63\u00ed akaun. Lo fun r\u00edr\u00e0 l\u00f3r\u00ed \u00e0y\u00e9l\u00faj\u00e1ra, s\u00edsan \u00edw\u00e9-ow\u00f3, \u00e0ti nibikibi t\u00ed a gba kaadi.',
                featureKycTitle: 'Idanim\u1ecd KYC Aabo',
                featureKycDesc: 'Idanim\u1ecd ir\u1ecdrun p\u1eb9lu iwe-irinna \u00e0ti fot\u00f3 ara \u1eb9ni. Data r\u1eb9 wa n\u00ed aabo p\u1eb9lu \u00e0\u00e0b\u00f2 t\u00f3 d\u00f3gba ti banki.',
                featureBillTitle: 'S\u00edsan \u00cdw\u00e9-ow\u00f3',
                featureBillDesc: 'San \u00edw\u00e9-ow\u00f3 \u00ecr\u00e0nl\u1ecdw\u1ecd, \u00ecforuk\u1ecdsiw\u00e9, \u00e0ti di\u1eb9 s\u00ed\u00ed t\u00e0\u00e1r\u00e0 l\u00e1ti akaun r\u1eb9. \u1e62e \u00e8t\u00f2 s\u00edsan k\u00ed o m\u00e1 padanu \u1ecdj\u1ecd \u00ecsan.',
                featureMobileTitle: 'Fikun Ow\u00f3 Foonu',
                featureMobileDesc: 'Ran ow\u00f3 foonu si awon foonu ni gbogbo aiye. \u1e62\u00e8 \u00e0til\u1eb9yin \u00e8b\u00ed \u00e0ti \u1ecdr\u1eb9 p\u1eb9lu fikun l\u1eb9\u1e63\u1eb9k\u1eb9\u1e63\u1eb9.',
                featureLangTitle: '\u00c0til\u1eb9yin Ed\u00e8 P\u00fap\u1ecd',
                featureLangDesc: 'W\u00e0 n\u00ed G\u1eb9\u1eb9si, Sp\u00e1n\u00ed\u1e63\u00ec, Filipino, \u00e0ti Yor\u00f9b\u00e1. Lo app n\u00e1\u00e0 n\u00ed ed\u00e8 t\u00ed o f\u1eb9r\u00e0n fun \u00ecr\u00edr\u00ed d\u00e1rad\u00e1ra.',
                howTitle: 'R\u1ecdr\u00f9n \u00e0ti Kedere, N\u00edgb\u00e0gbogbo',
                howSubtitle: 'B\u00edb\u1eb9r\u1eb9 p\u1eb9lu CheckPay r\u1ecdr\u00f9n b\u00ed\u00ed 1-2-3. T\u1eb9l\u1eb9 \u00ecl\u00e0n\u00e0 wa t\u00ed \u00f3 r\u1ecdr\u00f9n.',
                howStep1Title: 'J\u1eb9r\u00eds\u00ed Idanim\u1ecd R\u1eb9',
                howStep1Desc: 'Gbe iwe-irinna r\u1eb9 s\u00edl\u1eb9 k\u00ed o ya fot\u00f3 ara \u1eb9ni. \u1eb8r\u1ecd wa n\u1e63e idanim\u1ecd r\u1eb9 l\u00e1\u00e0r\u00edn i\u1e63\u1eb9j\u00fa d\u00ed\u1eb9.',
                howStep2Title: 'Gbe \u1e62\u1eb9ki R\u1eb9 S\u00edl\u1eb9',
                howStep2Desc: 'Ya aw\u1ecdran iwaju \u00e0ti \u1eb9hin \u1e63\u1eb9ki o\u1e63\u00f9 r\u1eb9. AI wa \u1e63e \u00e0y\u1eb9w\u00f2 \u1e63\u1eb9ki n\u00e1\u00e0 l\u1eb9\u1e63\u1eb9k\u1eb9\u1e63\u1eb9.',
                howStep3Title: 'Gba Kaadi R\u1eb9',
                howStep3Desc: 'Gba kaadi d\u1eb9b\u00edti foj\u00fa r\u1eb9 l\u1eb9\u1e63\u1eb9k\u1eb9\u1e63\u1eb9. B\u1eb9r\u1eb9 l\u00e1ti n\u00e1w\u00f3, san \u00edw\u00e9-ow\u00f3, t\u00e0b\u00ed r\u00e0n ow\u00f3 l\u1ecdw\u1ecdl\u1ecdw\u1ecd.',
                howStep4Title: 'B\u1eb9r\u1eb9 I\u1e63owo',
                howStep4Desc: 'Lo kaadi r\u1eb9 fun r\u00edr\u00e0, san \u00edw\u00e9-ow\u00f3, fi ow\u00f3 k\u00fan foonu, t\u00e0b\u00ed gba ow\u00f3 \u1e63\u1eb9ki di\u1eb9 sii. Gbogbo r\u1eb9 l\u00e1ti \u1eb9r\u1ecd alago r\u1eb9.',
                langSectionTitle: 'W\u00e0 N\u00ed Ed\u00e8 R\u1eb9',
                langSectionSubtitle: 'CheckPay n s\u1ecdro ed\u00e8 r\u1eb9. Yan l\u00e1ti G\u1eb9\u1eb9si, Sp\u00e1n\u00ed\u1e63\u00ec, Filipino, t\u00e0b\u00ed Yor\u00f9b\u00e1 fun \u00ecr\u00edr\u00ed n\u00ed ed\u00e8 r\u1eb9.',
                faqTitle: 'Aw\u1ecdn \u00ccb\u00e8\u00e8r\u00e8 T\u00ed A M\u00e1a N B\u00e8\u00e8r\u00e8',
                faqSubtitle: 'Gbogbo ohun t\u00ed o n\u00edl\u00f2 l\u00e1ti m\u1ecd n\u00edpa CheckPay.',
                faqQ1: 'K\u00ed ni CheckPay?',
                faqA1: 'CheckPay j\u1eb9 \u1ecdna aabo l\u00e1ti fi \u1e63\u1eb9ki pam\u1ecd, gba ow\u00f3, \u00e0ti san \u00edw\u00e9-ow\u00f3 l\u00e1\u00ecl\u00e9s\u00ed d\u00edd\u00far\u00f3 n\u00ed \u00ecl\u00e0 n\u00ed il\u00e9 \u00ect\u00e0j\u00e0 iy\u00edpad\u00e0 \u1e63\u1eb9ki t\u00e0b\u00ed banki. Fi \u1e63\u1eb9ki pam\u1ecd l\u00e1ti foonu r\u1eb9, gba kaadi foj\u00fa l\u00e1ti l\u00f3 ow\u00f3 r\u1eb9, k\u00ed o san \u00edw\u00e9-ow\u00f3 l\u00f3r\u00ed \u00e0y\u00e9l\u00faj\u00e1ra.',
                faqQ2: '\u1e62\u00e9 mo n\u00edl\u00f2 N\u1ecdmba Aabo Awujo (SSN)?',
                faqA2: 'R\u00e0r\u00e1. CheckPay \u1e63\u00e8 \u00e0til\u1eb9yin idanim\u1ecd t\u00f3 da l\u00f3r\u00ed ITIN. K\u00f2 n\u00edl\u00f2 SSN l\u00e1ti \u1e63\u00ed akaun t\u00e0b\u00ed fi \u1e63\u1eb9ki pam\u1ecd.',
                faqQ3: 'K\u00ed ni mo n\u00edl\u00f2 l\u00e1ti \u1e63\u1eb9da akaun?',
                faqA3: 'L\u00e1ti \u1e63\u00ed akaun r\u1eb9, iw\u1ecd yoo n\u00edl\u00f2 ID ij\u1ecdba t\u00f3 wulo, ITIN r\u1eb9 (t\u00ed \u00f3 b\u00e1 y\u1eb9), adires\u1eb9 ibi t\u00ed o ngb\u00e9, \u00e0ti \u00e0y\u1eb9w\u00f2 fot\u00f3 ara \u1eb9ni. A n\u00edl\u00f2 alaye y\u00ec\u00ed l\u00e1ti j\u1eb9r\u00eds\u00ed idanim\u1ecd r\u1eb9 k\u00ed o \u1e63\u00ed akaun r\u1eb9 l\u00e1\u00e0b\u00f2.',
                faqQ4: 'K\u00ed l\u00f3d\u00e9 t\u00ed mo fi n\u00edl\u00f2 l\u00e1ti j\u1eb9r\u00eds\u00ed idanim\u1ecd mi?',
                faqA4: 'Aw\u1ecdn banki Am\u1eb9r\u00edka ni l\u00e1ti j\u1eb9r\u00eds\u00ed idanim\u1ecd aw\u1ecdn t\u00f3 n\u00ed akaun \u00e0ti aw\u1ecdn t\u00f3 n fi \u1e63\u1eb9ki pam\u1ecd. \u00c8y\u00ec d\u00e0\u00e1b\u00f2 b\u00f2 \u1ecd l\u1ecddw\u1ecd j\u00edb\u00ect\u00ec \u00f3 s\u00ec r\u00ed d\u00e1j\u00fa p\u00e9 a \u1e63i\u1e63\u1eb9 ow\u00f3 r\u1eb9 l\u00e1\u00e0b\u00f2. Idanim\u1ecd y\u00ec\u00ed ropo \u00e0y\u1eb9w\u00f2 ID t\u00ed a m\u00e1a n \u1e63e n\u00ed il\u00e9 \u00ect\u00e0j\u00e0 \u1e63\u1eb9ki.',
                faqQ5: '\u1e62\u00e9 a pin al\u00e1y\u00e8 mi p\u1eb9lu aw\u1ecdn al\u00e1\u1e63\u1eb9 i\u1e63\u00e8w\u00e1-\u00edl\u00e9?',
                faqA5: 'R\u00e0r\u00e1. Al\u00e1y\u00e8 r\u1eb9 wa n\u00ed aabo, a lo nikan fun idanim\u1ecd \u00e0ti \u1e63i\u1e63\u1eb9 ifipam\u1ecd, a s\u00ec pin nikan p\u1eb9lu aw\u1ecdn al\u00e1bar\u00e0 banki t\u00ed a n\u00edl\u00f2. A k\u00f2 lo al\u00e1y\u00e8 r\u1eb9 fun i\u1e63\u1eb9 il\u00e9-i\u1e63\u1eb9 i\u1e63\u00e8w\u00e1-\u00edl\u00e9.',
                faqQ6: 'K\u00ed l\u00f3d\u00e9 t\u00ed mo fi n\u00edl\u00f2 l\u00e1ti j\u1eb9r\u00eds\u00ed idanim\u1ecd mi l\u1eb9\u1eb9kansi n\u00edgb\u00e0 t\u00ed mo b\u00e1 n fi \u1e63\u1eb9ki pam\u1ecd?',
                faqA6: 'N\u00edgb\u00e0 t\u00ed o b\u00e1 fi \u1e63\u1eb9ki pam\u1ecd, banki gbod\u1ecd j\u1eb9r\u00eds\u00ed p\u00e9 \u1e63\u1eb9ki n\u00e1\u00e0 j\u1eb9 tir\u1eb9 \u00e0ti p\u00e9 ifipam\u1ecd n\u00e1\u00e0 j\u1eb9 t\u00f3\u00f3t\u1ecd. \u00c8y\u00ec ni a pe n\u00ed Ij\u1eb9r\u00eds\u00ed Ifipam\u1ecd Aabo. \u00d3 ropo \u00e0y\u1eb9w\u00f2 t\u00ed a m\u00e1a n \u1e63e gan-an n\u00ed ibi kan.',
                faqQ7: '\u1e62\u00e9 \u00e8y\u00ec j\u1eb9 \u00ect\u1ecdp\u00edn\u00fa oj\u00fa t\u00e0b\u00ed i\u1e63\u1ecdj\u1ecd?',
                faqA7: 'R\u00e0r\u00e1. Fot\u00f3 ara \u1eb9ni n \u1e63ay\u1eb9w\u00f2 p\u00e9 \u1eb9ni gidi ni t\u00f3 n \u1e63e ifipam\u1ecd. K\u00f2 t\u1ecfp\u00edn\u00fa \u1ecd ju \u00e0k\u00f2k\u00f2 y\u00e9n l\u1ecd \u00e0 k\u00f2 s\u00ed l\u00f3 fun i\u1e63\u1ecdj\u1ecd t\u00e0b\u00ed \u00e0b\u00f2j\u00fat\u00f3. A lo nikan fun aabo ifipam\u1ecd.',
                faqQ8: '\u00cdgb\u00e0 w\u00f2 ni ow\u00f3 yoo d\u00e9?',
                faqA8: 'Iw\u1ecd yoo r\u00ed ipo ifipam\u1ecd n\u00ed app r\u1eb9: Ti Fi Ran\u1e63\u1eb9, Ab\u1eb9wo, Ti Gba, Nduro, \u00e0ti Ti Pari. N\u00edgb\u00e0 t\u00ed \u00f3 b\u00e1 pari, ow\u00f3 yoo l\u1ecd l\u00e1ti "Nduro" s\u00ed "Wa" n\u00ed iy\u00e9 ow\u00f3 r\u1eb9. \u00c0k\u00f3k\u00f2 \u1e63i\u1e63\u1eb9 da l\u00f3r\u00ed banki \u00e0ti iru \u1e63\u1eb9ki.',
                faqQ9: '\u1e62\u00e9 ow\u00f3 k\u00e0n w\u00e0?',
                faqA9: 'Ow\u00f3 l\u00e8 k\u00e0n fun \u1e63i\u1e63\u1eb9 ifipam\u1ecd \u1e63\u1eb9ki, sisanw\u00f3 \u00edw\u00e9-ow\u00f3, \u00e0ti aw\u1ecdn gb\u00edgb\u00e9 kan. A f\u00ec gbogbo ow\u00f3 h\u00e0n k\u00ed o t\u00f3 j\u1eb9r\u00eds\u00ed i\u1e63owo. K\u00f2 s\u00ed ow\u00f3 t\u00ed a pam\u1ecd.',
                faqQ10: '\u1e62\u00e9 ow\u00f3 mi wa l\u00e1\u00e0b\u00f2?',
                faqA10: 'A \u1e63i\u1e63\u1eb9 ow\u00f3 nipas\u1eb9 aw\u1ecdn al\u00e1bar\u00e0 banki t\u00ed a \u1e63e \u00e0k\u00f3s\u00f3. Ifipam\u1ecd r\u1eb9 gba nipas\u1eb9 banki Am\u1eb9r\u00edka t\u00e0b\u00ed al\u00e1bar\u00e0 ow\u00f3 t\u00ed a yan. Data r\u1eb9 wa n\u00ed aabo p\u1eb9lu \u00e0\u00e0b\u00f2 t\u00f3 d\u00f3gba ti banki.',
                faqQ11: '\u1e62\u00e9 mo l\u00e8 gba ow\u00f3 mi b\u00ed\u00ed ow\u00f3-l\u00e1\u00e0m\u00fa?',
                faqA11: 'B\u1eb9\u1eb9ni. O l\u00e8 b\u00e8\u00e8r\u00e8 fun kaadi gidi n\u00ed in\u00fa app. N\u00edgb\u00e0 t\u00ed kaadi gidi r\u1eb9 b\u00e1 d\u00e9, o l\u00e8 lo n\u00ed ATM \u00e8y\u00edk\u00e9y\u00ec l\u00e1ti gba ow\u00f3 l\u00e1ti iy\u00e9 ow\u00f3 r\u1eb9.',
                faqQ12: 'Ta ni \u00f3 n \u1e63e \u00e0m\u00f3j\u00fat\u00f3 ow\u00f3 mi?',
                faqA12: 'CheckPay k\u00f2 di ow\u00f3 r\u1eb9 m\u00fa. N\u00edgb\u00e0 t\u00ed o b\u00e1 fi \u1e63\u1eb9ki pam\u1ecd, ClearPath Bank ni \u00f3 n \u1e63i\u1e63\u1eb9 \u00e0ti gba. N\u00edgb\u00e0 t\u00ed \u00f3 b\u00e1 pari, Horizon Card Bank ni \u00f3 n di ow\u00f3 r\u1eb9 m\u00fa, t\u00f3 s\u00ec t\u00fan n fun \u1ecd n\u00ed kaadi d\u1eb9b\u00edti foj\u00fa \u00e0ti gidi r\u1eb9. Aw\u1ecdn banki mej\u00e8ej\u00ec ni FDIC \u1e63e \u00e0b\u00f2, n\u00edtor\u00ed n\u00e1\u00e0 ow\u00f3 r\u1eb9 wa l\u00e1\u00e0b\u00f2.',
                ctaTitle: '\u1e62\u00e9 O Ti \u1e62etan L\u00e1ti B\u1eb9r\u1eb9?',
                ctaSubtitle: 'Foruk\u1ecdsi, \u1e63\u1eb9da akaun r\u1eb9, ya \u1e63\u1eb9ki, k\u00ed o gba ow\u00f3 r\u1eb9. K\u00f2 n\u00edl\u00f2 akaun banki.',
                ctaFreeToStart: '\u00d2f\u1eb9 l\u00e1ti b\u1eb9r\u1eb9 \u2022 K\u00f2 s\u00ed ow\u00f3 \u00ecpam\u1ecd \u2022 Atil\u1eb9yin 24/7',
                footerPrivacy: '\u00ccl\u00e0n\u00e0 Aabo',
                footerTerms: 'Aw\u1ecdn Of\u00ecn I\u1e63\u1eb9',
                footerSupport: 'Atil\u1eb9yin',
                footerCopyright: '\u00a9 2025 CheckPay. Gbogbo \u1eb9t\u1ecd w\u00e0.',
                footerTagline: 'Nmu \u00ecfowos\u00ed ow\u00f3 r\u1ecd p\u1eb9lu \u00ecm\u1ecd-\u1eb9r\u1ecd.'
            }
        }
    },

    // Initialize i18n system
    init: function(defaultLanguage = 'en') {
        let storedLang = localStorage.getItem('checkpay-language');

        // Auto-detect language on first visit
        if (!storedLang) {
            const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
            if (browserLang.startsWith('es')) storedLang = 'es';
            else if (browserLang.startsWith('fil') || browserLang.startsWith('tl')) storedLang = 'ph';
            else if (browserLang.startsWith('yo')) storedLang = 'yo';
            else storedLang = defaultLanguage;
        }

        this.currentLanguage = storedLang;
        this.translations = this.locales[this.currentLanguage];
        this.updateUI();
    },

    // Change language
    setLanguage: function(languageCode) {
        if (this.locales[languageCode]) {
            this.currentLanguage = languageCode;
            this.translations = this.locales[languageCode];
            localStorage.setItem('checkpay-language', languageCode);
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
                // Fallback to key path
                return null;
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

            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update current language display in settings
        const currentLangDisplay = document.getElementById('current-language-display');
        if (currentLangDisplay) {
            const languageNames = {
                'en': 'English',
                'es': 'Espa\u00f1ol',
                'ph': 'Filipino',
                'yo': 'Yor\u00f9b\u00e1'
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
