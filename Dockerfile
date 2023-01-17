FROM node:alpine

WORKDIR /dockerApp

COPY . /dockerApp/

EXPOSE 8081

RUN npm install

CMD ["npm", "start"]


