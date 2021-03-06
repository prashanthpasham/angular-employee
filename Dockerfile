FROM node:12.14.1 as build
#setting working directory
WORKDIR /app
RUN npm cache clean --force
#add source code to docker folder
COPY . .
#install dependencies
RUN npm install && npm run build 



# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/dist/AngularProject .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
