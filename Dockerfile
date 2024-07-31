
# Use a imagem oficial do Node.js para a fase de construção

FROM node:18-alpine

  

# Crie o diretório de trabalho no contêiner

WORKDIR /usr/app

  

COPY package.json ./

  

RUN npm install

  

COPY . .



ARG MONGO_URI



ARG JWT_SECRET



ENV MONGO_URI=$MONGO_URI



ENV JWT_SECRET=$JWT_SECRET



RUN echo "MONGO_URI=${MONGO_URI}" > .env



RUN echo "JWT_SECRET=${JWT_SECRET}" > .env

  

RUN npm install -g pnpm

  

# Compilação do código TypeScript

RUN pnpm build

  

# Expõe a porta utilizada pelo seu aplicativo Nest.js (por padrão, é a porta 3000)

EXPOSE 3000

  

# Comando para iniciar o aplicativo quando o contêiner for iniciado

CMD ["node", "dist/main"]
