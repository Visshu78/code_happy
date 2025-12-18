WebRTC Call Flow (Draft)

1. User opens the website
- Sees a “Talk Now” button
- No login required

2. Browser asks for microphone permission
- User allows mic access
- If denied, call does not start

3. Temporary session is created
- Backend creates a random session ID
- No name, no phone number
- Session expires after call ends

4. Browser connects to Asterisk
- Uses WebRTC (WSS + ICE)
- Audio flows directly between browser and Asterisk

5. Call handling
- Asterisk routes call based on availability
- If counselor is online → connect
- If not → later AI voice bot

6. Abuse handling (basic idea)
- Session can be flagged
- Repeated flags slow or block new sessions
- Not full IP ban to avoid WiFi issues

7. Call end
- Session destroyed
- No call data stored permanently
