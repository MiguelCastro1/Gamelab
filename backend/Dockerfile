FROM node:16-alpine

RUN mkdir /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3333

CMD ["npm", "start"]