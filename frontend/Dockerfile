# Build stage
FROM node:20 AS frontend-build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile  # Use frozen lockfile for consistency

COPY . .

RUN yarn build

# Serve the static files using nginx in the final stage
FROM nginx:alpine AS production

COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
