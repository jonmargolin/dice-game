
# Use the official Nginx image as the base image
FROM nginx:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# Install Node.js and npm
# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
#     apt-get install -y nodejs && \
#     npm install

# Copy the entire application to the working directory
COPY ./dist/apps/dice-app ./build

# Build the React app
# RUN npm run build

# Copy the built app to the Nginx public directory
RUN cp -r build/. /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
