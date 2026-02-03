# Secure WebRTC VoIP Communication System

## Overview
This project implements a secure, full-duplex Voice over IP (VoIP) communication system. It bridges a web-based frontend with an Asterisk PBX backend using WebRTC technology. The system is designed for high-fidelity audio transmission over local networks (Wi-Fi/LAN) with mandatory encryption for both signaling and media streams.

The architecture eliminates the need for third-party softphone applications, allowing users to make secure voice calls directly through any modern web browser.

## Key Features
* **WebRTC Integration:** Uses the JsSIP library to enable SIP signaling over WebSockets (WSS).
* **High-Definition Audio:** configured to prioritize the **Opus** codec (48kHz) for superior voice clarity compared to standard G.711 telephony.
* **End-to-End Encryption:**
    * **Signaling:** TLS (Transport Layer Security) protects the SIP control messages.
    * **Media:** SRTP (Secure Real-time Transport Protocol) and DTLS enable encrypted audio streams.
* **Advanced Audio Processing:** The frontend implements browser-native Echo Cancellation, Noise Suppression, and Auto Gain Control (AGC).
* **Network Resilience:** Optimized PJSIP configuration handles NAT traversal and jitter buffering.

## Technology Stack
* **Backend:** Asterisk 18+ (PJSIP Channel Driver)
* **Frontend:** HTML5, JavaScript (JsSIP), CSS3
* **Server Logic:** Python 3 (SSL/HTTPS encapsulation)
* **Protocol:** SIP over Secure WebSockets (WSS)

---

## Prerequisites
Before deploying, ensure the host environment meets the following requirements:
* **Operating System:** Ubuntu 20.04 LTS / Debian 11 or higher.
* **Packages:** `asterisk`, `python3`, `openssl`.
* **Network:** A local static IP address (e.g., `172.16.x.x`) is recommended for the server.

---

## Installation & Setup

### 1. Repository Setup
Clone the repository and navigate to the project directory.
```bash
git clone https://github.com/YOUR_USERNAME/webrtc-voip-system.git
cd webrtc-voip-system
```

### 2. Backend Configuration (Asterisk)
The system relies on the PJSIP channel driver. You must configure the transport, endpoints, and authentication.

1.  **Backup your existing config:**
    ```bash
    sudo cp /etc/asterisk/pjsip.conf /etc/asterisk/pjsip.conf.bak
    ```

2.  **Apply the Project Configuration:**
    Use the provided example configuration as a template.
    ```bash
    sudo cp configs/pjsip.conf.example /etc/asterisk/pjsip.conf
    ```

3.  **Edit the Configuration:**
    Open `/etc/asterisk/pjsip.conf` and update the following:
    * Replace `YOUR_PASSWORD_HERE` with a strong password.
    * Ensure the `external_media_address` matches your server's IP.
    * Verify the paths to your SSL certificates (`dtls_cert_file`, `dtls_ca_file`).

### 3. SSL Certificate Generation
WebRTC mandates HTTPS. You must generate self-signed certificates (or use Let's Encrypt) for the server.

```bash
sudo mkdir -p /etc/asterisk/keys
cd /etc/asterisk/keys
sudo openssl req -new -x509 -days 365 -nodes -out asterisk.crt -keyout asterisk.key
sudo cat asterisk.key > asterisk.pem
```
*Note: Ensure the `asterisk` user has read permissions for these keys.*

### 4. Frontend Configuration
1.  Navigate to the `frontend/` directory.
2.  Open `index.html` (or rename `index.html.example`).
3.  Update the `SERVER_IP` constant to match your host machine's IP address.
4.  Update the default SIP credentials if necessary.

---

## Usage Guide

### Starting the System
To ensure all components start in the correct order, use the following sequence:

1.  **Start Asterisk:**
    ```bash
    sudo systemctl restart asterisk
    ```

2.  **Start the Secure Web Server:**
    Since browsers block microphone access on insecure (HTTP) origins, a Python HTTPS wrapper is used.
    ```bash
    cd frontend
    sudo python3 ../secure_server.py
    ```

### Making a Call
1.  Open a web browser on a client device (Phone/Laptop) and navigate to `https://<YOUR_SERVER_IP>:8000`.
2.  Accept the security warning (required for self-signed certificates).
3.  **Initialize:** Enter your Extension ID (e.g., 6001) and click **Initialize**. Wait for the status to turn green (Online).
4.  **Connect:** On a second device, repeat the process with a different Extension ID (e.g., 6002).
5.  **Call:** Enter the target extension and click **Call**.

---

## Troubleshooting

| Issue | Probable Cause | Solution |
| :--- | :--- | :--- |
| **Microphone Permission Denied** | Browser security policy | Ensure you are accessing the site via `https://`, not `http://`. Reset site permissions. |
| **Registration Failed (408)** | Firewall or Network | Check if Port `8089` (TCP/WSS) is open. Verify the server IP in `index.html`. |
| **No Audio / One-way Audio** | NAT / ICE Failure | Ensure `external_media_address` in `pjsip.conf` matches the actual LAN IP. |
| **Robotic Voice** | Packet Loss / Jitter | Switch transport from UDP to TCP if Wi-Fi signal is weak. |

## License
This project is licensed under the MIT License - see the LICENSE file for details.
