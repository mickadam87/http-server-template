FROM node:16 as main
WORKDIR /usr/src/main
COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]