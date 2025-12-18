Asterisk + WebRTC Plan (Initial)

Purpose:
Provide anonymous voice calling for college support use.

Why Asterisk:
- Open source
- Stable for VoIP
- Works with WebRTC
- Full control over call flow

How it will work (high level):
- Browser connects using WebRTC
- Asterisk acts as media + call server
- Temporary users are created per session
- No real phone numbers involved

Security ideas (initial):
- Rate limiting
- Session-based IDs
- Abuse flags
- IP + fingerprint (not only IP)

Current phase:
Design and configuration only.
No production deployment yet.
