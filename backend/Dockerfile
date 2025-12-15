FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .



EXPOSE 10000

CMD ["sh", "-c", "npx prisma generate && node dist/index.js"]