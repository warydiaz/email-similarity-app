# Usa la imagen de Node.js como base
FROM node:18.16.1

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /home/vistaadmin/apps/dockerWorkDir

# Copia el archivo package.json y package-lock.json (si está disponible) al directorio de trabajo del contenedor
COPY /package*.json ./

# Instala las dependencias de la aplicación dentro del contenedor
RUN npm install

# Copia el resto de los archivos de la aplicación desde tu máquina local al directorio de trabajo del contenedor
COPY . .

# Compila el código TypeScript
RUN npm run build

# Comando para ejecutar la aplicación cuando el contenedor se inicie
CMD npm start