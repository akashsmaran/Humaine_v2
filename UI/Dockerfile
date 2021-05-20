FROM node:15-alpine3.10 as build
ENV NODE_ENV production
LABEL version="1.0"
LABEL description="This is the base docker image for Humaine frontend react app."
LABEL maintainer = ["saivicky2015@gmail.com", "akashsmaran@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . ./

# COPY --chown=node:node . .

# USER node

RUN npm run build


# production environment
FROM nginx:1.19.10-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]