FROM node:24-alpine AS build
WORKDIR /app

COPY site/package*.json ./
RUN npm ci

COPY site/ ./
RUN npm run build

FROM nginx:alpine AS runtime
RUN rm -rf /usr/share/nginx/html/*
COPY site/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
