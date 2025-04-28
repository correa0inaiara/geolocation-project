# We are using node's image as base for this one
FROM node:20.18.3

# Create the app directory
WORKDIR /usr/app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Copy everything else on the project
COPY . .

# Expose the port we want to use
EXPOSE 3003

# Tell Docker to run server.js on spin up
CMD [ "node", "src/server.ts" ]