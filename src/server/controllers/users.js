const { User } = require('../models/index');

const usersController = {};

usersController.getUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		console.log(users);
		res.json(users);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: 'Error al obtener los usuarios', info: error });
	}
};

usersController.postUser = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error al crear el usuario' });
	}
};

module.exports = usersController;
