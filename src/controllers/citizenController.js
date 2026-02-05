const supabase = require('../config/supabase');

exports.getProfile = async (req, res) => {
    const { userId } = req.params;
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

exports.getHistory = async (req, res) => {
    const { userId } = req.params;
    const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', userId)
        .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

exports.toggleConsent = async (req, res) => {
    const { patientId, doctorId, status } = req.body;
    // Upsert consent record
    const { data, error } = await supabase
        .from('consents')
        .upsert({ patient_id: patientId, doctor_id: doctorId, status })
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

exports.uploadRecord = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // In a real app, upload this file to Supabase Storage here using fs.readFileSync(req.file.path)
    // For now, we simulate return the path

    res.json({
        message: 'File uploaded successfully',
        fileUrl: `/uploads/${req.file.filename}`
    });
};
