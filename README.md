# serverless-challenge

## Instalaciones necesarias 
`sudo apt install aws-sdk`  
`sudo apt install serverless`   
`npm install serverless-offline -g`

---
## configurar variables de entorno para AWS
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

---
## configurar variables de entorno para la BD
`export POSTGRES_DB_NAME=db_serverless `    
`export POSTGRES_DB_HOST=<host-ip>  `  
`export POSTGRES_DB_PORT=5432  `  
`export POSTGRES_DB_USERNAME=postgres  `  
`export POSTGRES_DB_PASSWORD=<password>  `

---
## creacion de base de datos
`CREATE DATABASE db_serverless; `   
`CREATE TABLE empleado (  `  
 `  id SERIAL PRIMARY KEY,`  
 `  edad INTEGER NOT NULL,`  
   `nombre VARCHAR(100) NOT NULL,`  
   `cargo VARCHAR(50) NOT NULL,`  
   `estado boolean default true,`  
   `fechacreacion timestamp default now(),`  
   `fechamodificacion timestamp default now()`  
`);`

---
## levantar proyecto offline 
`npm run invoke:offline`

---
## deployar 
`npm run deploy`

---
## API 
### URL Obtener empleado
*si no se envia el parametro "id" devuelve todos*  
`GET employer/{id}`
### URL Crear empleado
`POST /employer  `  
*todos los campos son requeridos*
#### Parámetros de solicitud
```json
{
  "nombre": "Nombre del empleado",
  "edad": 30,
  "cargo": "Cargo del empleado"
}
```

### URL actualizar empleado
`PATCH /employer  `   
*los campos son opcionales excepto id que es requerido*
#### Parámetros de solicitud
```json
{
  "id": 1
  "nombre": "Nombre del empleado",
  "edad": 30,
  "cargo": "Cargo del empleado"
}
```

### URL Eliminar empleado
`DELETE /employer/{id}`
