# syntax=docker/dockerfile:1
# Get node as base image
FROM node:16.11.1
# Node environment variable
ENV NODE_ENV=production
# labels
LABEL version="1.0"
LABEL description="Docker image for node.js client of stock tracker"
LABEL maintainer="ConwaySabini@Outlook.com"
# Create app directory
WORKDIR /app
# Copy app files from the project directory to the app directory in the container
COPY ["package.json", "package-lock.json", "./"]
# install dependencies
RUN npm install --production
COPY . .
# Expose the port to run the app on
EXPOSE 3001
# commands to run the app
CMD ["npm", "run", "build"]
