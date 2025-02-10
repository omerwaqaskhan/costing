FROM nginx

COPY --from=ampham-frontend ./app/dist /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
