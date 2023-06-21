# PRISCILA

Aplicación contable

## Preparacion del ambiente de desarrollo

### Frontend

```bash
cd ./src/frontend yarn
```

### Backend

```bash
cd ./src/backend yarn
```

```bash
yarn install
```

Si queremos hacer un build es necesario verificar que el archivo js que llamamos en sr/index.html sea el correcto ya que con cada build vite crea un nuevo hash

### Build

En caso de recibir error durante el proceso de build revisar que se tengan instaladas la depedencias [node-gyp](https://github.com/nodejs/node-gyp#on-windows)
