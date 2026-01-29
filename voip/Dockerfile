FROM alpine:latest
RUN apk add --no-cache asterisk asterisk-sample-config asterisk-pjsip asterisk-srtp asterisk-sounds-en asterisk-sounds-moh
RUN mkdir -p /var/run/asterisk
EXPOSE 5060/udp 5060/tcp 8088 8089 10000-20000/udp
CMD ["/usr/sbin/asterisk", "-f", "-vvvvv"]
