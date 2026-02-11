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
