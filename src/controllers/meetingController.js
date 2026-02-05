const { AccessToken } = require('livekit-server-sdk');

exports.createMeeting = async (req, res) => {
    const { patientId, patientName, doctorName } = req.body;
    const userId = req.userId;
    const role = req.role;

    // Generate unique room name
    const roomName = `consultation-${Date.now()}`;

    try {
        // Create access token for the current user
        const at = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            {
                identity: role === 'doctor' ? `doctor-${userId}` : `patient-${userId}`,
                name: role === 'doctor' ? doctorName : patientName,
            }
        );

        at.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true,
        });

        const token = await at.toJwt();

        res.json({
            token,
            roomName,
            url: process.env.LIVEKIT_URL
        });

    } catch (error) {
        console.error("LiveKit Error:", error);
        res.status(500).json({ error: "Failed to create meeting" });
    }
};

exports.joinMeeting = async (req, res) => {
    const { roomName, participantName } = req.body;
    const userId = req.userId;
    const role = req.role;

    try {
        const at = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            {
                identity: role === 'doctor' ? `doctor-${userId}` : `patient-${userId}`,
                name: participantName,
            }
        );

        at.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true,
        });

        const token = await at.toJwt();

        res.json({
            token,
            roomName,
            url: process.env.LIVEKIT_URL
        });

    } catch (error) {
        console.error("LiveKit Error:", error);
        res.status(500).json({ error: "Failed to join meeting" });
    }
};
