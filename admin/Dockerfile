# Use official Node.js Alpine image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and lock file to install deps first
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the full project files into the container
COPY . .

# Build the Next.js project
RUN npm run build

# Expose Next.js default port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
