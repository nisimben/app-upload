# Use an official Node.js runtime as a parent image
FROM node:14.20.0

# Create and set the working directory in the container
WORKDIR /app

# Copy your application code to the container
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port your app runs on (adjust the port as needed)
EXPOSE 3000

# Specify the command to start your application
# CMD ["npm", "start"]