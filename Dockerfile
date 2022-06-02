
FROM node:16

WORKDIR /
COPY ./ ./

RUN npm i
RUN npm run build

CMD ["npm", "start"]
EXPOSE 3000