FROM node:20.5
WORKDIR /app

COPY package*.json ./

RUN apt-get update
RUN npm install

COPY . .

EXPOSE 4200
EXPOSE 4203

CMD ["npm", "start"]