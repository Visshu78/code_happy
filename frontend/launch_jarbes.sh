#!/bin/bash
echo "🚀 ACTIVATING JARBES DEFENSE SYSTEM..."

# 1. CLEANUP: Clear the battlefield
echo "🧹 [1/3] Stopping old processes..."
sudo killall -9 asterisk 2>/dev/null
sudo fuser -k 8000/tcp 2>/dev/null
sleep 2

# 2. CORE: Start Asterisk as a Daemon (Background Service)
echo "🔹 [2/3] Starting Core Engine..."
sudo asterisk
# Wait for it to warm up
sleep 3
echo "   ✅ Core Engine Active."

# 3. INTERFACE: Start Secure Web Server
echo "🔹 [3/3] Establishing Secure Link (HTTPS)..."
cd ~/voip-project/frontend
sudo python3 ../secure_server.py
