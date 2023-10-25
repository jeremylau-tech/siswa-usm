# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY siswa-usm/test_db_client/package.json ./
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all source files from siswa-usm/test_db_client to the working directory
# COPY siswa-usm/test_db_client/ ./
COPY . .

# Build the React app
# RUN npm run build

# Expose the port the app will run on
EXPOSE 80

# Define the command to start your app
CMD [ "npm", "start" ]
