FROM nginx:alpine

# Build klasörünü nginx klasörüne kopyala
COPY dist/ /usr/share/nginx/html

# Opsiyonel: Nginx configini değiştirmek istersen
# COPY nginx.conf /etc/nginx/nginx.conf

# 80 portunu aç
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]