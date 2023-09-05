# Use Node.js Alpine image
FROM node:alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to download dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 3000
# Start the React development server
CMD ["npm", "start"]
