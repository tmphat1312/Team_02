FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

FROM nginx:alpine

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
