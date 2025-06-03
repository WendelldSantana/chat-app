# batepapo-app/Dockerfile
FROM node:18 AS build

WORKDIR /app

COPY batepapo-app/package*.json ./batepapo-app/
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]