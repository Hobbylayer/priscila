const User = require("../models/user");

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    password: "password123",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    password: "password456",
  },
];

(async () => {
  try {
    await User.sync({ force: true });
    await User.bulkCreate(users);
  } catch (error) {
    console.error(error);
  }
})();
