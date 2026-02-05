const supabase = require('./src/config/supabase');

async function seed() {
    console.log('Seeding database...');

    // 1. Check/Insert Citizen
    const { data: citizen, error: cErr } = await supabase
        .from('users')
        .select('*')
        .eq('abha_id', '12-3456-7890-0000')
        .single();

    if (!citizen && !cErr) { // Assuming no error means not found if using .maybeSingle() but single() returns error
        // Actually single() returns error if not found.
    }

    // Let's just try to insert. If conflict (abha_id unique), it will fail/ignore.
    // We need a way to ensure tables exist first? 
    // We can't ensure tables exist from JS client easily without running SQL.
    // I will assume tables exist. If not, this step will fail and I will see the error.

    const { error: insertError } = await supabase.from('users').upsert([
        {
            name: 'John Doe',
            abha_id: '12-3456-7890-0000',
            role: 'citizen',
            password_hash: 'password123', // In real app, hash this
            contact: '9876543210'
        },
        {
            name: 'Dr. Sarah Smith',
            license_id: 'DOC-88219',
            role: 'doctor',
            password_hash: 'password123',
            hospital_name: 'Apollo Hospital'
        }
    ], { onConflict: 'abha_id, license_id' }); // This might be tricky if unique constraints differ.

    // Better to do separate upserts
    const { error: cError } = await supabase.from('users').upsert({
        name: 'John Doe',
        abha_id: '12-3456-7890-0000',
        role: 'citizen',
        password_hash: 'password123',
        contact: '9876543210'
    }, { onConflict: 'abha_id' }); // Assuming abha_id is unique

    if (cError) console.error('Error seeding citizen:', cError.message);
    else console.log('Citizen seeded: John Doe (12-3456-7890-0000)');

    const { error: dError } = await supabase.from('users').upsert({
        name: 'Dr. Sarah Smith',
        license_id: 'DOC-88219',
        role: 'doctor',
        password_hash: 'password123',
        hospital_name: 'Apollo Hospital'
    }, { onConflict: 'license_id' });

    if (dError) console.error('Error seeding doctor:', dError.message);
    else console.log('Doctor seeded: Dr. Sarah Smith (DOC-88219)');

    // Seed Medical Records
    // We need the citizen UUID first
    const { data: user } = await supabase.from('users').select('id').eq('abha_id', '12-3456-7890-0000').single();

    if (user) {
        await supabase.from('medical_records').insert([
            { patient_id: user.id, type: 'Lab Report', description: 'Blood Test - CBC', file_url: '#', doctor_id: 'System' },
            { patient_id: user.id, type: 'Prescription', description: 'Viral Fever Meds', file_url: '#', doctor_id: 'System' }
        ]);
        console.log('Medical records seeded');
    }

}

seed();
