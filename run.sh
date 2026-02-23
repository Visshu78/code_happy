#!/bin/bash
# Detect Current IP
IP_ADDR=$(hostname -I | awk '{print $1}')
echo "🚀 JARBES: System detected at $IP_ADDR"

# Update Asterisk Config to match local network
sudo chattr -i /etc/asterisk/pjsip.conf 2>/dev/null
sudo sed -i "s/external_media_address=.*/external_media_address=$IP_ADDR/g" configs/pjsip.conf
sudo sed -i "s/external_signaling_address=.*/external_signaling_address=$IP_ADDR/g" configs/pjsip.conf
sudo cp configs/pjsip.conf /etc/asterisk/pjsip.conf
sudo chattr +i /etc/asterisk/pjsip.conf
sudo systemctl restart asterisk

echo "✅ Engine Ready. Access Interface at: https://$IP_ADDR:8000/frontend/index.html"
sudo python3 secure_server.py

