const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const handleSquirrelEvent = require('./squirrelStartupHandler');
const { settings } = require('./settings');
const db = require('./src/server/models/index');

if (app.isPackaged) process.env.APP_PATH = path.dirname(app.getAppPath());

const isDev = settings.isDev;

if (handleSquirrelEvent(app)) return;

if (process.platform === 'win32') {
	app.setLoginItemSettings({
		openAtLogin: false, // true, para ejecutar en el inicio del windows
		path: process.execPath,
		args: ['--processStart', `"${process.execPath}"`, '--', 'start'],
	});
}

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		// icon: './assets/images/Briefcase.png',
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: true,
		},
	});

	const startUrl = url.format({
		pathname: path.join(__dirname, './index.html'),
		protocol: 'file',
		slashes: true,
	});

	console.log(startUrl);

	if (isDev) win.loadURL('http://localhost:5173/');
	else win.loadURL(startUrl);
};

app.whenReady().then(async () => {
	try {
		await db.sequelize.authenticate();
		await db.sequelize.sync();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}

	require('./src/server/index');
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
