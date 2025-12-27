// gen_token.js
const { AccessToken } = require('livekit-server-sdk');

// These must match the keys in your livekit.yaml
const apiKey = 'devkey';
const apiSecret = 'secret';

const createToken = async () => {
  const at = new AccessToken(apiKey, apiSecret, {
    identity: "web_user_1",
  });

  // Grant permission to join "emergency-room"
  at.addGrant({ roomJoin: true, room: "emergency-room" });

  const token = await at.toJwt();
  console.log(token);
};

createToken();