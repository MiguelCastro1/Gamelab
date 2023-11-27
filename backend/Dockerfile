FROM node:16-alpine

# Create app directory
RUN mkdir /usr/app
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3333

# Command to run the app using the start script from package.json
CMD ["npm", "start"]
