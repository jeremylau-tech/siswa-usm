# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the "test_db_client" subfolder
COPY package.json /app

# Install project dependencies
RUN npm install

# Copy all source files from the "test_db_client" subfolder
COPY . .

# Build the React app (if needed)
# RUN npm run build

# Expose port 80 (the default port for Apache)
EXPOSE 80

# Define the command to start your app (adjust based on your project)
CMD [ "npm", "start" ]
