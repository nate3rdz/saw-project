FROM node:20.5
WORKDIR /app

COPY package*.json ./

RUN apt-get update
RUN npm install -g @angular/cli
RUN npm install

COPY . .

EXPOSE 4201

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4201"]