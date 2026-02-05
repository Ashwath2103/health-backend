const axios = require('axios');
const supabase = require('../config/supabase');

exports.chat = async (req, res) => {
    const { message, context } = req.body;
    const userId = req.userId; // Fix: Middleware attaches to req directly

    // 1. Fetch relevant health data if not provided (RAG Lite)
    // In a full RAG system, we would vector search. Here we fetch recent records.
    let healthContext = "Patient History: None available.";

    try {
        const { data: records } = await supabase
            .from('medical_records')
            .select('type, description, created_at, metadata')
            .eq('patient_id', userId)
            .order('created_at', { ascending: false })
            .limit(5);

        if (records && records.length > 0) {
            healthContext = "Recent Medical Records:\n" + records.map(r =>
                `- ${r.created_at.split('T')[0]}: ${r.type} - ${r.description}`
            ).join('\n');
        }
    } catch (err) {
        console.error("Context fetch error", err);
    }

    // 2. Construct System Prompt with Medical Intelligence
    const systemPrompt = `You are HealthBot, an advanced AI medical assistant with prescription capabilities.

PATIENT CONTEXT:
${healthContext}

CAPABILITIES:
- Analyze symptoms and medical history
- Suggest appropriate medications with dosages
- Provide treatment recommendations
- Explain drug interactions and side effects
- Offer lifestyle advice

RESPONSE FORMAT:
When suggesting medications, always include:
1. Medication name
2. Dosage (e.g., "500mg twice daily")
3. Duration (e.g., "for 5 days")
4. Important warnings or side effects

IMPORTANT DISCLAIMERS:
- Always remind patients this is AI-assisted guidance
- Recommend consulting a licensed doctor for serious conditions
- Never suggest controlled substances without proper verification
- Flag potential drug allergies based on patient history

Be concise, professional, and helpful.`;

    try {
        const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
            model: "llama-3.3-70b-versatile", // Fast Groq model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error("Groq Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to communicate with AI brain." });
    }
};
