# Code_happy
<img width="916" height="719" alt="image" src="https://github.com/user-attachments/assets/ccc6a2f0-92d7-405f-a618-641776a59cec" />


# Voice SOS System (WebRTC + NestJS + LiveKit)

A secure, Dockerized "Talk Now" system allowing web browsers to connect to a voice server via anonymous, rate-limited sessions.

## Project Structure
* `livekit-voice/` - Dockerized LiveKit server (The Voice Engine).
* `backend/` - NestJS API (Handles Security & Token Generation).
* `frontend/` - Vanilla JS Client (The "Talk Now" Button).

## Prerequisites
* Docker & Docker Compose
* Node.js (v18+)
* Python 3 (for simple frontend hosting)

---

## 🚀 How to Run

### 1. Start the Voice Server (LiveKit)
This runs the WebRTC engine in a container.
```bash
cd livekit-voice
docker compose up -d