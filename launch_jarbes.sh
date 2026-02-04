#!/bin/bash
echo "🚀 ACTIVATING JARBES DEFENSE SYSTEM..."

# 1. Start the Asterisk Core (The Brain)
echo "🔹 [1/2] Starting Core Engine..."
sudo killall -9 asterisk 2>/dev/null
sudo asterisk -c &
sleep 2

# 2. Start the Secure Interface (The Link)
echo "🔹 [2/2] Establishing Secure Link (HTTPS)..."
cd ~/voip-project/frontend
# We use sudo because SSL keys require root access
sudo python3 ../secure_server.py
