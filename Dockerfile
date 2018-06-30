FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Copies both package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
