const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const db = require("./database");
const isDev = false;
// if (isDev) return require("./seed");

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

  if (isDev) return win.loadURL("http://127.0.0.1:5173/");
  win.loadURL(startUrl);
};

app.whenReady().then(async () => {
  await db.sequelize.authenticate();
  await require("./server");
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
