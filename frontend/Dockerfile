FROM node:16-alpine

WORKDIR /usr/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

EXPOSE 3366

CMD ["npm", "run", "dev"]
