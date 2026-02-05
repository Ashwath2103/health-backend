const axios = require('axios');

exports.generateClinicalNote = async (req, res) => {
    const { symptoms, diagnosis, treatment, patientHistory } = req.body;

    const prompt = `You are a medical documentation AI assistant. Generate a professional clinical note based on the following information:

Patient History: ${patientHistory || 'Not provided'}
Symptoms: ${symptoms}
Diagnosis: ${diagnosis}
Treatment Plan: ${treatment}

Generate a concise, professional medical record entry in the following format:
- Chief Complaint
- Assessment
- Plan
- Notes

Keep it brief and clinical.`;

    try {
        const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a medical documentation assistant. Generate professional, concise clinical notes." },
                { role: "user", content: prompt }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const generatedNote = response.data.choices[0].message.content;
        res.json({ note: generatedNote });

    } catch (error) {
        console.error("Groq Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate clinical note." });
    }
};
