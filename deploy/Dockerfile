FROM nginx:1.13

RUN mkdir -p /var/static
WORKDIR /var/static

COPY dist/ ./dist
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/static/dist

CMD ["nginx", "-g", "daemon off;"]
