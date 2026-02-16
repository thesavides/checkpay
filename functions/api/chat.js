// CheckPay Chatbot — Cloudflare Pages Function
// Proxies chat requests to Anthropic Claude API
// Route: POST /api/chat

const LANGUAGE_MAP = {
    en: 'English',
    es: 'Spanish (Latin American)',
    ph: 'Filipino (Taglish style)',
    yo: 'Yoruba'
};

const SYSTEM_PROMPT = `You are CheckPay's virtual assistant. You help users understand CheckPay's services, features, and how the app works.

RULES:
- Only answer questions about CheckPay services, features, account setup, check clearing, virtual cards, bill payments, identity verification, and related topics.
- If a user asks about something unrelated to CheckPay, politely decline and say something like: "I can only help with CheckPay-related questions. Is there anything about our check clearing, virtual cards, or bill payment services I can help you with?"
- Respond in LANGUAGE_PLACEHOLDER. Match the user's language naturally.
- Keep responses concise (2-4 sentences when possible). Use a warm, reassuring tone.
- Never provide financial advice, investment advice, or legal advice.
- Never ask for or reference specific account numbers, passwords, or sensitive personal information.
- When discussing identity verification, always emphasize safety and privacy protections.
- Do not use markdown formatting. Use plain text only.

ABOUT CHECKPAY:
CheckPay is a multilingual check-to-card wallet web app designed for ITIN-based users (immigrants without SSN). Users can:
- Deposit payroll checks via Remote Deposit Capture (RDC) from their phone
- Verify identity (KYC) using government ID and selfie
- Receive a virtual debit card instantly
- Pay utility bills online
- Request a physical debit card for ATM withdrawals

KEY INFORMATION:

Identity & Accounts:
- No SSN required. CheckPay supports ITIN-based identity verification.
- Account setup requires: government-issued ID, ITIN (if applicable), residential address, and selfie verification.
- Identity verification is required by U.S. banking regulations to protect users from fraud. It replaces in-person ID checks at check-cashing stores.
- User information is encrypted and NEVER shared with immigration authorities. It is used only for identity verification and deposit processing.

Check Clearing:
- Users photograph the front and back of their payroll check using their phone.
- Per-deposit verification (Secure Deposit Confirmation) is required by the clearing bank for each deposit. It includes a selfie, ITIN last-4 confirmation, and check endorsement.
- Selfie verification is NOT surveillance or eye-tracking. It only confirms a real person is making the deposit.
- Deposit statuses progress through: Submitted → Under Review → Accepted → Pending (Clearing) → Cleared.
- Once cleared, funds move from "Pending" to "Available" in the user's balance.
- Processing time depends on the clearing bank and check type.

Fees & Safety:
- Fees may apply to check processing, bill payments, and transfers. All fees are shown before confirmation. No hidden charges.
- Funds are processed through regulated banking partners. Both partner banks are FDIC-insured.
- CheckPay does NOT hold user funds directly.

Banking Partners:
- Check clearing is handled by ClearPath Bank (clearing/sponsor bank).
- Funds are held by Horizon Card Bank (issuing bank), who also issues virtual and physical debit cards.
- Both banks are FDIC-insured, so user money is protected.

Cards:
- Users get a virtual debit card instantly upon account creation.
- The virtual card can be used for online purchases, bill payments, and anywhere cards are accepted.
- Users can add their card to Apple Pay or Google Pay.
- Users can request a physical debit card within the app for ATM cash withdrawals.
- Card features include: freeze/unfreeze, spending limits, PIN change.

Bill Payments:
- Pay utility bills (electric, gas, water), insurance, internet, phone, cable, and more.
- Available across many U.S. states.
- Payments typically process within 1-2 business days.

Languages & Support:
- The app is available in 4 languages: English, Spanish, Filipino, and Yoruba.
- Support is available 24/7.

KYC Process:
- KYC-A (one-time account setup): Personal info → Government ID upload → Selfie → Account provisioning
- KYC-B (per-deposit): Selfie → ITIN confirmation → Payable-to-me checkbox → Endorsement instructions
- This two-step process protects both the user and the banking partners.`;

// Simple in-memory rate limiting (resets on cold start — fine for demo)
const rateLimitMap = new Map();
const RATE_LIMIT = 20; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now - entry.windowStart > RATE_WINDOW) {
        rateLimitMap.set(ip, { windowStart: now, count: 1 });
        return true;
    }

    if (entry.count >= RATE_LIMIT) {
        return false;
    }

    entry.count++;
    return true;
}

export async function onRequestPost(context) {
    const { request, env } = context;

    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(clientIP)) {
        return new Response(JSON.stringify({ error: 'Rate limited. Please wait a moment.' }), {
            status: 429,
            headers: corsHeaders
        });
    }

    // Parse request
    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: corsHeaders
        });
    }

    const { messages, language } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: 'Messages array is required' }), {
            status: 400,
            headers: corsHeaders
        });
    }

    // Validate and limit messages
    const validMessages = messages
        .filter(m => m.role && m.content && ['user', 'assistant'].includes(m.role))
        .slice(-20); // Keep last 20 messages

    if (validMessages.length === 0) {
        return new Response(JSON.stringify({ error: 'No valid messages provided' }), {
            status: 400,
            headers: corsHeaders
        });
    }

    // Build system prompt with language
    const langName = LANGUAGE_MAP[language] || 'English';
    const systemPrompt = SYSTEM_PROMPT.replace('LANGUAGE_PLACEHOLDER', langName);

    // Get API key
    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API not configured' }), {
            status: 500,
            headers: corsHeaders
        });
    }

    // Call Anthropic API
    try {
        const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 500,
                system: systemPrompt,
                messages: validMessages
            })
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error('Anthropic API error:', apiResponse.status, errorText);
            return new Response(JSON.stringify({ error: 'Chat service temporarily unavailable' }), {
                status: 502,
                headers: corsHeaders
            });
        }

        const data = await apiResponse.json();
        const responseText = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

        return new Response(JSON.stringify({
            response: responseText
        }), {
            status: 200,
            headers: corsHeaders
        });

    } catch (err) {
        console.error('Chat API error:', err);
        return new Response(JSON.stringify({ error: 'Chat service temporarily unavailable' }), {
            status: 500,
            headers: corsHeaders
        });
    }
}

// Handle CORS preflight
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
