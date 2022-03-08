FROM node:14.18.0

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]

