# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

# Copy package.json and package-lock.json from the "test_db_client" subfolder
COPY /test_db_server/package*.json ./

# Install project dependencies
RUN npm install
RUN npm install -g react-scripts

# Copy the server.js file from the "test_db_client" directory
COPY ./test_db_server/server.js .

# Expose port 80 (the default port for Apache)
EXPOSE 3000

CMD [ "node", "server.js" ]
