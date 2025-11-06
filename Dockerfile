# Dockerfile

# Step 1: Use lightweight Node.js base image
FROM node:18-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Expose the app port
EXPOSE 3000

# Step 6: Start the app
CMD ["npm", "start"]
