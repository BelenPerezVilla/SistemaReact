import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Login from './modules/login';
import Inventario from './modules/inventario';
import Dashboard from './modules/Dashboard'; // El nuevo módulo

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('inventario'); // 'inventario' o 'dashboard'

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      {/* BARRA DE NAVEGACIÓN */}
      <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            AUTO-SYSTEM PRO
          </Typography>
          
          <Button 
            color="inherit" 
            startIcon={<DashboardIcon />} 
            onClick={() => setView('dashboard')}
            sx={{ fontWeight: view === 'dashboard' ? 'bold' : 'normal' }}
          >
            Dashboard
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<ListAltIcon />} 
            onClick={() => setView('inventario')}
            sx={{ mx: 2, fontWeight: view === 'inventario' ? 'bold' : 'normal' }}
          >
            Inventario
          </Button>

          <Button 
            variant="contained" 
            color="error" 
            size="small"
            onClick={() => setIsAuthenticated(false)}
          >
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      {/* CONTENIDO DINÁMICO */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {view === 'inventario' ? (
          <Inventario /> 
        ) : (
          <Dashboard />
        )}
      </Container>
    </Box>
  );
}

export default App;