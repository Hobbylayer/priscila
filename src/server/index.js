const express = require("express");
const cors = require("cors");
// const portfinder = require('portfinder');

const appRoutes = require('./routes');

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(appRoutes);

// portfinder.getPortPromise().then(port => {
//   console.log(`El puerto: ${port} se encuentra disponible`);

//   app.listen(port, () => {
//     console.log(`API lanzada sobre el puerto: ${port}`);
//   })
// }).catch(err => {
//   console.log(`Error al buscar un puerto disponible: ${err.message}`);
// });

const PORT = 4000;

app.listen(PORT, () => {
  console.log("API listening on port " + PORT);
});
