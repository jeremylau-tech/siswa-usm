# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# Copy package.json and package-lock.json from the "test_db_client" subfolder
COPY /test_db_server/package*.json ./

# Install project dependencies
RUN npm install

# Copy the server.js file from the "test_db_client" directory
COPY ./ .

# Expose port 80 (the default port for Apache)
RUN npm run build

CMD [ "node", "server.js" ]
