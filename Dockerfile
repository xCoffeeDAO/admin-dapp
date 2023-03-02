FROM node:16 as build
ARG CONFIG_SETUP
WORKDIR /usr/app
COPY package.json .
RUN touch .env
COPY . .
RUN npm rebuild node-sass
RUN npm run copy-${CONFIG_SETUP}-config
RUN npm install
RUN npm run build



FROM node:16
COPY --from=build /usr/app/build ./build
COPY process.yml .
RUN npm i -g pm2 -g serve
EXPOSE 3000

CMD ["pm2-runtime", "process.yml"]