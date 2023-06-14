# serverless-challenge

# Instalaciones necesarias 
sudo apt install aws-sdk
sudo apt install serverless
npm install serverless-offline -g 
# configurar variables de entorno para AWS
guia en https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

# configurar variables de entorno para la BD
export POSTGRES_DB_NAME=db_serverless
export POSTGRES_DB_HOST=100.26.195.248
export POSTGRES_DB_PORT=5432
export POSTGRES_DB_USERNAME=postgres
export POSTGRES_DB_PASSWORD=6RMiOm9neEcGjhz

# creacion de base de datos
CREATE DATABASE db_serverless;
CREATE TABLE empleado (
  id SERIAL PRIMARY KEY,
  edad INTEGER NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  cargo VARCHAR(50) NOT NULL,
  estado boolean default true,
  fechacreacion timestamp default now(),
  fechamodificacion timestamp default now()
);

# levantar proyecto offline 
npm run invoke:offline

# deployar 
npm run deploy