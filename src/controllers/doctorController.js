const supabase = require('../config/supabase');

exports.searchPatient = async (req, res) => {
    const { abhaId } = req.query;
    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, abha_id')
        .eq('abha_id', abhaId)
        .single();

    if (error) return res.status(404).json({ error: 'Patient not found' });
    res.json(data);
};

exports.getPatientRecords = async (req, res) => {
    const { patientId, doctorId } = req.query;

    // Check consent first
    const { data: consent, error: consentError } = await supabase
        .from('consents')
        .select('status')
        .eq('patient_id', patientId)
        .eq('doctor_id', doctorId)
        .single();

    if (consentError || consent?.status !== 'granted') {
        return res.status(403).json({ error: 'Access denied. No active consent.' });
    }

    const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    // Log access
    await supabase.from('access_logs').insert({
        doctor_id: doctorId,
        patient_id: patientId,
        action: 'view_records',
        timestamp: new Date()
    });

    res.json(data);
};

// Simulate blockchain node memory
const crypto = require('crypto-js');

exports.addRecord = async (req, res) => {
    const { patientId, doctorId, type, description, fileUrl } = req.body;

    // 1. Fetch the last record for this patient chain
    const { data: lastRecord } = await supabase
        .from('medical_records')
        .select('metadata')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    let previousHash = "00000000000000000000000000000000"; // Genesis hash
    if (lastRecord && lastRecord.metadata && lastRecord.metadata.hash) {
        previousHash = lastRecord.metadata.hash;
    }

    // 2. Create Block Data
    const timestamp = new Date().toISOString();
    const blockData = `${patientId}${doctorId}${type}${description}${timestamp}${previousHash}`;

    // 3. Calculate Hash (Proof of Integrity)
    const hash = crypto.SHA256(blockData).toString();

    const metadata = {
        hash: hash,
        previousHash: previousHash,
        timestamp: timestamp,
        verified: true // In a real system, this would be verify by consensus
    };

    const { data, error } = await supabase
        .from('medical_records')
        .insert([{
            patient_id: patientId,
            doctor_id: doctorId,
            type,
            description,
            file_url: fileUrl,
            metadata: metadata
        }])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
