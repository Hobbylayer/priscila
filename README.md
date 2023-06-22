# PRISCILA

Aplicación contable

## Preparacion del ambiente de desarrollo

### UI

Utilizamos react para construir la ui

```bash
cd ./src/ui yarn
```

### Electron dependencies and server

```bash
cd ./src yarn
```

Si queremos hacer un build es necesario verificar que el archivo js que llamamos en ./src/ui/src/index.html sea el correcto ya que con cada build vite crea un nuevo hash

### Build

Ingresa al directorio electron y ejecuta el sigueinte comando

```bash
yarn build
```

En caso de recibir error durante el proceso de build revisar que se tengan instaladas la depedencias [node-gyp](https://github.com/nodejs/node-gyp#on-windows)
