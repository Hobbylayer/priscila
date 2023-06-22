import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const createUser = async (data: any) => {
    await axios.post("http://localhost:4000/users", data);
  };
  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Enviar los datos del formulario al servidor
    createUser(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Nombre completo"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        name="age"
        label="Edad"
        variant="outlined"
        type="number"
        fullWidth
        margin="normal"
        value={formData.age}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Registrar
      </Button>
    </form>
  );
};

export default RegisterForm;
