# Install dependencies only when needed
FROM docker.io/node:lts as dependencies


WORKDIR /usr/src/app

# Copy installed dependencies from dependencies stage
COPY ./node_modules ./node_modules

# Copy built application files
COPY ./dist/apps/dice-service ./



# If you are using the custom server implementation:
CMD [ "node", "main.js"]