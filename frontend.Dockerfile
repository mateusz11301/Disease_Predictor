FROM node:20-alpine AS builder

WORKDIR /app
COPY Frontend/disease_predictor_gui/package*.json ./
RUN npm install

COPY Frontend/disease_predictor_gui ./
RUN npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]