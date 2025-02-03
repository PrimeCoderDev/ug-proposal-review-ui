# Etapa 1: Construcción de la aplicación Angular
FROM node:20-alpine3.20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
