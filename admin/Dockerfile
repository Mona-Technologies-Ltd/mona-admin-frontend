# Use official Node.js Alpine image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the admin subdirectory (your actual app)
COPY admin ./admin

# Set working directory to admin inside container
WORKDIR /app/admin

# Install dependencies
RUN npm install --frozen-lockfile

# Build the Next.js project
RUN npm run build

# Expose Next.js default port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
