# Imagem base do Node.js
FROM node:22-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
