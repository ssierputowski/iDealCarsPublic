### STAGE 1: Build the application ###
FROM node:latest
ENV a=/ideal-angular
ENV e=/ideal-api
ENV PORT=80

COPY .${a}/package.json ./

# Install node_modules
RUN npm install -dd && mkdir ${a} && cp -R ./node_modules ${a}
RUN npm install -g nodemon

RUN rm /package.json

WORKDIR ${a}

# Bring in the source code
COPY .${a} .
RUN $(npm bin)/ng --version
RUN $(npm bin)/ng build --prod
RUN mv ${a}/dist/ideal/* ${a}/dist/
RUN ls -lah

### STAGE 2: Build the server ###
WORKDIR /

COPY .${e}/package.json ./

# Install node_modules
RUN npm install -dd && mkdir ${e} && cp -R ./node_modules ${e} && cp package.json ${e}

WORKDIR ${e}

# Bring in the server source code
COPY .${e} .
RUN echo "$DB_HOST" > ${e}/.env

CMD ["npm","start"]