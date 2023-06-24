# PRISCILA

Aplicación que facilitará el manejo de algunas operaciones relacionados a un secretario y auxiliar.

## Preparacion del ambiente de desarrollo

### Interfaz (UI)

Utilizamos react para construir la ui

```bash
$ cd ./src/ui yarn
```
El frontend esta desarrollando usando vite y react, por lo que durante el desarrollo puede ser necesario ejecutar el proyecto localmente

```bash
$ cd ./src/ui
$ yarn dev
```

### Servidor (Backend)

Utilizaremos express para el backend en forma de API REST


```bash
$ cd ./src/server yarn
```

De igual forma durante el desarrollo de la API puede ser necesario ejecutar el servidor localmente, lo que permitiria realizar las peticiones a la ruta `http://localhost:4000/`

```bash
$ cd ./src/server
$ yarn start
```

### Modelos y migraciones (models | migrations)
Para crear un modelo, que posteriormente será una tabla en la base de datos, se utiliza `sequelize-cli`, esta a su vez genera una migración que sequelize usa a su vez como un commit; a continuación un ejemplo de como crearlo desde la cli

```bash
$ npx sequelize-cli model:generate --name User --attributes name:string,email:string,age:integer
```

Tras crear el modelo deseado, se requiere ejecutar la migración, lo que permitira realizar los ajustes a la base de datos, ejemplo crear, modificar o eliminar tablas. Para esto se requiere utilizar el siguiente comando desde la terminarl

```bash
$ npx sequelize-cli db:migrate
```

En caso de querer deshacer los cambios realizados previamente en la base de datos, se puede ejecutar el siguiente comando. (este comando solo deshace la ultima migración)

```bash
$ npx sequelize-cli db:migrate:undo
```

### Semillas (seeders)

Para crear un archivo semilla mediante `sequelize-cli`, se pude seguir el siguiente ejemplo desde la terminal

```bash
$ npx sequelize-cli seed:generate --name demo-users
```

Esto genera un archivo con el nombre que se haya especificado en la carpeta `/seeders` con las funciones `up` y `down` respectivamente, funciones necesarias para manipular la base de datos con la información de la semilla.

```bash
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
```

La ejecución de la semilla se realiza mediante el siguiente comando, el cual puede aceptar opción extra `--debug` para obtener más información en caso de errores 

```bash
$ npx sequelize-cli db:seed:all 

```

Para deshacer los cambios realizados por la ejecución previa se utiliza

```bash
$ npx sequelize-cli db:seed:undo

```

### Electron app

```bash
$ cd yarn
```

Si queremos hacer un build es necesario verificar que el archivo js que llamamos en ./src/ui/src/index.html sea el correcto ya que con cada build vite crea un nuevo hash

### Build

Ingresa al directorio electron y ejecuta el sigueinte comando

```bash
yarn build
```

En caso de recibir error durante el proceso de build revisar que se tengan instaladas la depedencias [node-gyp](https://github.com/nodejs/node-gyp#on-windows)




