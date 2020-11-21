![alt text](https://res.cloudinary.com/sigtam/image/upload/v1605849640/logo_ykvwyl.png)

## QR-Class API

API REST realizada en [Express.js] y el lenguaje [Typescript] para la creación de los servicios del software QR-Class - UFPS 

[Express.js]:<https://expressjs.com/>
[Typescript]:<https://www.typescriptlang.org/>

### Instalación

#### Requerimientos previos
Para ejecutar este proyecto necesitas tener instalado [Node.js] y [Git] en tu computador

[Node.js]:<https://nodejs.org/en/>
[Git]:<https://git-scm.com/>

* Instalamos Typescript de manera global 
```bash
npm install -g typescript
```
* Una vez realizado la instalación de Typescript, procedermos a la comprobación por medio del comando **tsc**: 
```bash
tsc --version
```
En caso de quedar instalado de manera correcta nos debería mostrar su versión
```bash
Version 4.0.2
```
* Clonamos el proyecto a nuestra máquina 
```bash
git clone https://github.com/AnndresRodriguez/qrclass-backend
```

* Instalamos todas las dependencias del proyecto con el siguiente comando 
```bash
npm install
```

* Para el siguiente paso importaremos nuestro sql ([qrclass-database.sql]) de la base de datos aplicación en nuestro motor de base de datos preferido 

[qrclass-database.sql]:<https://res.cloudinary.com/sigtam/raw/upload/v1605888238/qrclass-database_cid7f4.sql>

* Una vez cargada la base de datos **_crearemos en nuestra raíz del projecto_** los siguientes archivos 
  - **.env** (Archivo para almacenar nuestras variables de entorno)
  - **ormconfig.json** (Archivo de configuración para la conexión a la base de datos)

* Archivo **.env**
 <pre> PORT=3000 // Defina el puerto de su preferencia </pre>
 
* Archivo **ormconfig.json** <br/>
En este archivo configuramos las credenciales de conexión a nuestra base de datos (mysql o posgresql) <br/> <br/>
**_type_**: (mysql o posgresql) <br/>
```json
{
    "type": "mysql",
    "host": "",
    "port": "",
    "username": "",
    "password": "",
    "database": "",
    "entities": ["src/models/*.entity{.ts,.js}"],
    "migrations": ["src/migrations/*.ts"],
    "charset": "utf8mb4_spanish_ci",
    "cli": {
        "migrationsDir": "src/migrations"
    },
    "synchronize": false
}
```



* Una vez realizado la instalación de dependencias y la configuración de la base de datos, procederemos a la ejecución del proyecto con el comando: 
```bash
npm run dev
```
* Esto nos creará la salida en el puerto que hayamos seleccionado (en este ejemplo fue el puerto 3000) y veremos nuestra API, para conocer los endpoints nos vamos al archivo [server.ts] 
aquí en nuestro método **_routes_** hallaremos los endpoints disponibles de nuestra aplicación

<pre>
routes(): void {

      this.app.use('/auth', routes.authController);
      this.app.use('/admin', routes.adminController);
      this.app.use('/docentes', routes.docenteController);
      this.app.use('/estudiantes', routes.estudianteController);
      this.app.use('/directores', routes.directorController);
      this.app.use('/materias', routes.materiasController);
      this.app.use('/programa-academicos', routes.programaAcademicoController);
      this.app.use('/departamentos', routes.departamentoController);
      this.app.use(express.static("public"));
}
</pre>

* Despues de ejecutar el proyecto para acceder a cada endpoint basta con escribir en nuestro navegador <a href="#">http://localhost:3000/docentes/</a> en este caso accederemos al listado de docentes

[server.ts]:<https://github.com/AnndresRodriguez/qrclass-backend/blob/master/src/server.ts>

## Preguntas o Sugerencias

En caso de que tengas preguntas o sugerencias, contactar al correo a <andresjoelcr@ufps.edu.co> y estaré dispuesto a ayudarte.   




