FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g tsx

COPY . .

EXPOSE 3010/tcp

CMD ["npm", "run", "start"]

