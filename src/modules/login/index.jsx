import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { fakeLogin } from './queries';

// REVISA ESTO: Debe recibir { onLoginSuccess } entre llaves
const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Llamamos a la simulación de la base de datos
      const response = await fakeLogin(form.email, form.password);
      
      // 2. Si todo sale bien, avisamos al padre para que cambie la pantalla
      if (response.success) {
        onLoginSuccess(); 
      }
    } catch (err) {
      setError(err); // Aquí atrapamos el "Usuario incorrecto"
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" textAlign="center" mb={2}>SISTEMA AUTOMOTRIZ</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth name="email" label="Correo" margin="normal" 
            onChange={handleChange} value={form.email} 
          />
          <TextField 
            fullWidth name="password" label="Contraseña" type="password" margin="normal" 
            onChange={handleChange} value={form.password} 
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button 
            fullWidth type="submit" variant="contained" sx={{ mt: 3 }} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "ENTRAR"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;