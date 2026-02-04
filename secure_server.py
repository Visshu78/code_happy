import http.server
import ssl

server_address = ('0.0.0.0', 8000)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# Wrap the server with our SSL keys
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile='/etc/asterisk/keys/asterisk.crt', 
                        keyfile='/etc/asterisk/keys/asterisk.key')
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print("🔒 SECURE SERVER RUNNING on https://172.16.208.59:8000")
httpd.serve_forever()
