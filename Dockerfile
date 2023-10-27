# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the "test_db_client" subfolder
COPY siswa-usm/test_db_client/package*.json ./

# Install project dependencies
RUN npm install

# Copy all source files from the "test_db_client" subfolder
COPY siswa-usm/test_db_client/ ./

# Build the React app (if needed)
# RUN npm run build

# Expose the port the app will run on (adjust based on your app)
EXPOSE 8090

# Define the command to start your app (adjust based on your project)
CMD [ "npm", "start" ]
