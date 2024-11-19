# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .

RUN npm install

# Copy application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the frontend in development mode
CMD ["npm", "start"]
