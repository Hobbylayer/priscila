const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const electron = require('electron');
const { settings } = require('../../../settings');

const isDev = settings.isDev;
const config = isDev
	? require(__dirname + '/../config/config.json')['development']
	: require(__dirname + '/../config/config.json')['production'];

const appPath = process.env.APP_PATH || __dirname + '/../';
// console.log('envPATH',appPath)
// const appPath = app?.isPackaged
// 	? path.dirname(app.getPath('exe'))
// 	: __dirname + '/../';
// const appPath = path.join(__dirname, '../');
const dbPath = path.join(appPath, config.storage);
const db = {};

const sequelize = new Sequelize({
	dialect: config.dialect,
	storage: dbPath,
});

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
