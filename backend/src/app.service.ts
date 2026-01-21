import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  private apiKey = 'devkey';
  private apiSecret = 'secret';

  async createSession(type: 'admin' | 'visitor') {
    const prefix = type === 'admin' ? 'admin' : 'visitor';
    const participantName = `${prefix}-${uuidv4().substring(0, 6)}`;
    
    // HARDCODED ROOM NAME
    const ROOM_NAME = 'emergency-room';

    const at = new AccessToken(this.apiKey, this.apiSecret, {
      identity: participantName,
      ttl: '1h',
    });

    at.addGrant({
      roomJoin: true,
      room: ROOM_NAME,  // <--- Everyone goes here
      canPublish: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();

    // *** DEBUG LOG: READ THIS IN YOUR TERMINAL ***
    console.log(`🎟️ ISSUED TOKEN: User [${participantName}] -> Room [${ROOM_NAME}]`);

    return {
      token,
      identity: participantName,
      type
    };
  }
}