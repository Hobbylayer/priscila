const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

const handleSquirrelEvent = require('./squirrelStartupHandler');
const { settings } = require('./settings');

const isDev = settings.isDev;

if (handleSquirrelEvent(app)) return;

const { packagedPath } = prepareSettingsFile(app);
process.env.APP_PATH = packagedPath;

const db = require('./src/server/models/index');

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
	// console.log('START_URL', startUrl);
	if (isDev) win.loadURL('http://localhost:5173/');
	else win.loadURL(startUrl);
};

app.whenReady().then(async () => {
	// if (fs.existsSync(settingsPath)) {
	// 	const settingsData = fs.readFileSync(settingsPath, 'utf8');
	// 	const configFile = JSON.parse(settingsData);

	// 	if (configFile.firstRun) {
	// 		dialog.showOpenDialog({ properties: ['openFile'] }).then((result) => {
	// 			const filePath = result.filePaths[0];
	// 			const settings = {
	// 				firstRun: false,
	// 				databasePath: filePath,
	// 			};
	// 			const settingsJSON = JSON.stringify(settings);
	// 			fs.writeFile(settingsPath, settingsJSON, 'utf8', (err) => {
	// 				if (err) console.error('Error saving settings file:', err);
	// 				else console.log('Settings file saved successfully.');
	// 			});
	// 		});
	// 		const settings = {
	// 			firstRun: false,
	// 			databasePath: userDataPath,
	// 		};
	// 		const settingsJSON = JSON.stringify(settings);
	// 		fs.writeFile(settingsPath, settingsJSON, 'utf8', (err) => {
	// 			if (err) console.error('Error saving settings file:', err);
	// 			else console.log('Settings file saved successfully.');
	// 		});
	// 	}
	// }

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

function prepareSettingsFile(app) {
	const userDataPath = app.getPath('userData');
	const settingsPath = path.join(userDataPath, 'settings.json');
	let firstRun = true;

	if (fs.existsSync(settingsPath)) {
		const settingsData = fs.readFileSync(settingsPath, 'utf8');
		const configFile = JSON.parse(settingsData);
		firstRun = configFile.firstRun || true;

		if (firstRun) {
			const settings = {
				firstRun: false,
				databasePath: userDataPath,
			};
			const settingsJSON = JSON.stringify(settings);
			fs.writeFile(settingsPath, settingsJSON, 'utf8', (err) => {
				if (err) console.error('Error saving settings file:', err);
				else console.log('Settings file saved successfully.');
			});
		}

		return {
			packagedPath: app.isPackaged
				? configFile.databasePath
				: path.join(__dirname, './src/server'),
		};
	}

	const configFile = { firstRun: true, databasePath: userDataPath };
	const settingsJSON = JSON.stringify(configFile);
	fs.writeFile(settingsPath, settingsJSON, 'utf8', (err) => {
		if (err) console.error('Error saving settings file:', err);
		else console.log('Settings file saved successfully.');
	});

	return {
		packagedPath: app.isPackaged
			? configFile.databasePath
			: path.join(__dirname, './src/server'),
	};
}
