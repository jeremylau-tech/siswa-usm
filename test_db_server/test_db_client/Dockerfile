# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the "test_db_client" subfolder
COPY /package*.json ./

# Install project dependencies
RUN npm install
RUN npm install -g react-scripts

# Copy all source files from the "test_db_client" subfolder
COPY ./ .

# Set the working directory to the "test_db_client" folder
WORKDIR /usr/src/app/test_db_client/

# Expose port 80 (the default port for Apache)
EXPOSE 3000

# Define the command to start your app (adjust based on your project)
RUN npm run build
RUN npm install -g serve
CMD [ "serve", "-s", "build"]
