# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the "test_db_client" directory containing package.json and package-lock.json
COPY ./test_db_client/package*.json ./test_db_client/

# Change the working directory to the "test_db_client" directory
WORKDIR /app/test_db_client

# Install dependencies
RUN npm install

# Expose port 3030
EXPOSE 3030

# Start the React application
CMD ["npm", "start"]
