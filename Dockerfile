FROM node:10-alpine as build-stage

RUN mkdir -p /home/tk8web/node_modules && chown -R node:node /home/tk8web

WORKDIR /home/tk8web

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build -- --output-path=./dist/out 

#Stage1
FROM nginx:1.15
#Copy tk8web
COPY --from=build-stage /home/tk8web/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

