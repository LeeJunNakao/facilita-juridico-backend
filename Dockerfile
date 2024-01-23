FROM node:20-alpine as builder

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 5000

CMD ["yarn", "prod"]
