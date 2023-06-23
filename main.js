const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const db = require("./src/server/database");
const { settings } = require("./settings");

const isDev = settings.isDev;
if (isDev) require("./src/server/seed");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "./index.html"),
    protocol: "file",
    slashes: true,
  });

  console.log(startUrl);

  if (isDev) win.loadURL("http://localhost:5173/");
  else win.loadURL(startUrl);
};

app.whenReady().then(async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync({ force: true });
  require("./src/server/index");
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
