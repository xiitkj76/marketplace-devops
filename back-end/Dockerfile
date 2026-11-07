# Image backend: Node.js + Express
FROM node:20-alpine

WORKDIR /app

# Install dependency dulu (memanfaatkan cache layer Docker)
COPY package*.json ./
RUN npm ci --omit=dev

# Salin source code
COPY . .

ENV PORT=3001
EXPOSE 3001

CMD ["node", "index.js"]
