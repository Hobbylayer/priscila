
# Change Log
Todos los cambios notables realizados a este proyecto seran documentados en este archivo.
 
El formato está basado en [Keep a Changelog](http://keepachangelog.com/)
y se adhiere al proyecto [Semantic Versioning](http://semver.org/).

## [Unreleased] - 20023-06-20
 
### Added
- [PRISCILA-frontend](https://github.com/Hobbylayer/priscila/tree/main/app)
  Agrega frontend vite/react.
- [PROJECTNAME-electron](https://github.com/Hobbylayer/priscila/tree/main/electron)
  Agrega app electron con express API backend.
- Agrega sqlite3.
- Agrega una parte del CRUD: `Create`.
- Agrega scripts para el empaquetado de la aplicación.
- Agrega node script para manejar los cambios del nombre de archivo que ocurre al realizar el build de vite.
 
### Changed
- Rempleza react-router-dom por wouter.

 
### Fixed
- Corrige manejo de rutas al realizar build del proyecto.
- Corrige error generado por no encontrar el path de los archivos estáticos tras realizar el build del proyecto. 
 
## [Unreleased] - 2023-06-21
  
Continuamos con el desarrollo, aún en stage `unreleased` :D 
 
### Added
- Changelog
 
### Changed
- Actuliza readme, con un poco mas de información sobre como ejecutar el proyecto o realizar el empaquetado.

## [Unreleased] - 2023-06-23

Continuamos con el desarrollo, aún en stage `unreleased` :D 
 
### Added
- Agrega dependencia de desarrollo `nodemon` para el servidor.
- Agrega dependecnai de desarollo `sequelize-cli` para facilitar la creación de modelos, migraciones y semillas.
- Agrega configuracion para sequelize-cli.
 
### Changed
- Mofica la estructura de carpetas que se estaba manejando anteriormente.
- Cambia la forma en la que se llaman los modelos de la base de datos y la forma en la que se construyen los modelos y semillas.

### Fixed
- Corrige error en ruta de sqlite al empaquetar la aplicación.
- Corrige error de doble creación de instancia de la aplicación lo que ocasioanaba que se abriera 2 veces la aplicación.
