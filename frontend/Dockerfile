# frontend/Dockerfile
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy your HTML files to the nginx folder
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80