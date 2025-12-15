FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Render sets PORT automatically (e.g., 10000)
ENV PORT=$PORT

# ✅ Expose the same port Render will forward to
EXPOSE $PORT

# ✅ Build your app if needed
# RUN npm run build   # only if you have a build step

# ✅ Start your backend
CMD ["sh", "-c", "npx prisma generate && node dist/index.js"]