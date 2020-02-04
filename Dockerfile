FROM node:10
 
# Create app directory
WORKDIR /usr/app
 
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
 
RUN yarn install
# If you are building your code for production
# RUN yarn install --only=production
 
# Copy app into container
COPY ./src ./src
COPY ./tsconfig.json .
COPY ./yarn.lock .

CMD [ "yarn", "start" ]