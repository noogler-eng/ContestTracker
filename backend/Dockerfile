FROM node:latest

WORKDIR /usr/src/app

COPY package* ./
RUN npm ci --only=production
COPY . .

RUN npm run compile

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]