const express = require("express");
const cors = require("cors");
const User = require("./models/user");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios", info: error });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log("API listening on port " + PORT);
});
