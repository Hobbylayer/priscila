const Sequelize = require("sequelize");
const { app } = require("electron");
const path = require("path");

const appPath = app.isPackaged ? path.dirname(app.getPath("exe")) : __dirname;

console.log(appPath);

const dbPath = path.join(appPath, "database.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
