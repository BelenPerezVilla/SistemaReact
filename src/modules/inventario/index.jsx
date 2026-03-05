// src/modules/Inventario/index.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, Stack 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { getVehiculos, saveVehiculoQuery, deleteVehiculoQuery } from './queries';
import { inventoryColumns } from './columnconfig';

const Inventario = ({ onLogout }) => {
  // --- ESTADOS ---
  const [datos, setDatos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState({ id: '', modelo: '', estado: '', color: '' });
  
  // ¡NUEVO ESTADO PARA EL FILTRO!
  const [busqueda, setBusqueda] = useState('');

  // Cargar datos al iniciar
  useEffect(() => {
    getVehiculos().then(res => setDatos(res));
  }, []);

  // --- LÓGICA DE FILTRADO ---
  // Filtramos la lista basándonos en lo que el usuario escribe en el buscador
  const datosFiltrados = datos.filter((item) => 
    item.modelo.toLowerCase().includes(busqueda.toLowerCase()) || 
    item.id.toLowerCase().includes(busqueda.toLowerCase())
  );

  // --- LÓGICA DEL MODAL (CRUD) ---
  const handleOpenModal = (auto = { id: '', modelo: '', estado: '', color: '' }) => {
    setSelectedAuto(auto);
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const onSave = async () => {
    const res = await saveVehiculoQuery(selectedAuto);
    if (selectedAuto.id) {
      setDatos(datos.map(item => item.id === res.id ? res : item)); // Editar
    } else {
      setDatos([...datos, res]); // Registrar nuevo
    }
    handleCloseModal();
  };

  const onDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta unidad del inventario?")) {
      await deleteVehiculoQuery(id);
      setDatos(datos.filter(item => item.id !== id));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        
        {/* CABECERA */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">Planta de Ensamblaje</Typography>
          <Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()} sx={{ mr: 2 }}>
              Registrar Auto
            </Button>
            {/* Si no tienes Navbar y dependes del botón salir aquí, descomenta la siguiente línea: */}
            {/* <Button variant="outlined" color="error" onClick={onLogout}>Salir</Button> */}
          </Box>
        </Stack>

        {/* BARRA DE BÚSQUEDA */}
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Buscar por VIN o Modelo..." 
          sx={{ mb: 3, bgcolor: '#fafafa' }}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* TABLA DE INVENTARIO */}
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#e0e0e0' }}>
              <TableRow>
                {inventoryColumns.map(col => (
                  <TableCell key={col.field}><b>{col.headerName}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* ¡ATENCIÓN AQUÍ! Usamos 'datosFiltrados' en lugar de 'datos' */}
              {datosFiltrados.length > 0 ? (
                datosFiltrados.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.modelo}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                    <TableCell>{row.color}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenModal(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => onDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>
                      No se encontraron vehículos que coincidan con la búsqueda.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* MODAL DE REGISTRO / EDICIÓN */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle>{selectedAuto.id ? 'Editar Vehículo' : 'Nuevo Registro'}</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth label="Modelo del Vehículo" margin="normal" 
            value={selectedAuto.modelo} 
            onChange={(e) => setSelectedAuto({...selectedAuto, modelo: e.target.value})} 
          />
          <TextField 
            fullWidth label="Fase de Producción (Ej. Pintura)" margin="normal" 
            value={selectedAuto.estado} 
            onChange={(e) => setSelectedAuto({...selectedAuto, estado: e.target.value})} 
          />
          <TextField 
            fullWidth label="Color" margin="normal" 
            value={selectedAuto.color} 
            onChange={(e) => setSelectedAuto({...selectedAuto, color: e.target.value})} 
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
          <Button variant="contained" onClick={onSave}>Guardar en Sistema</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventario;