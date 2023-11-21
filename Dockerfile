# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# Copy package.json and package-lock.json from the "test_db_server" subfolder
COPY /test_db_server/package*.json ./

# Install project dependencies
RUN npm install

# Copy all source files from the "test_db_server" subfolder
COPY test_db_server/ .

# Expose the port your server is listening on
EXPOSE 3001

# Command to start your Node.js application
CMD [ "node", "server.js" ]
