import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, Stack 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getVehiculos, saveVehiculoQuery, deleteVehiculoQuery } from './queries';
import { inventoryColumns } from './columnconfig';

const Inventario = ({ onLogout }) => {
  const [datos, setDatos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAuto, setSelectedAuto] = useState({ id: '', modelo: '', estado: '', color: '' });

  // Cargar datos al iniciar
  useEffect(() => {
    getVehiculos().then(res => setDatos(res));
  }, []);

  // Abrir modal (si recibe un auto es para EDITAR, si no es para CREAR)
  const handleOpenModal = (auto = { id: '', modelo: '', estado: '', color: '' }) => {
    setSelectedAuto(auto);
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  // Lógica para GUARDAR (Create / Update)
  const onSave = async () => {
    const res = await saveVehiculoQuery(selectedAuto);
    
    if (selectedAuto.id) {
      // Actualizar en la lista local
      setDatos(datos.map(item => item.id === res.id ? res : item));
    } else {
      // Agregar a la lista local
      setDatos([...datos, res]);
    }
    handleCloseModal();
  };

  // Lógica para ELIMINAR
  const onDelete = async (id) => {
    if (confirm("¿Eliminar esta unidad del inventario?")) {
      await deleteVehiculoQuery(id);
      setDatos(datos.filter(item => item.id !== id));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">Planta de Ensamblaje</Typography>
          <Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()} sx={{ mr: 2 }}>
              Registrar Auto
            </Button>
            <Button variant="outlined" color="error" onClick={onLogout}>Salir</Button>
          </Box>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                {inventoryColumns.map(col => (
                  <TableCell key={col.field}><b>{col.headerName}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.estado}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenModal(row)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => onDelete(row.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* FORMULARIO DINÁMICO */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle>{selectedAuto.id ? 'Editar Vehículo' : 'Nuevo Registro'}</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth label="Modelo del Vehículo" margin="normal" 
            value={selectedAuto.modelo} 
            onChange={(e) => setSelectedAuto({...selectedAuto, modelo: e.target.value})} 
          />
          <TextField 
            fullWidth label="Estado (Pintura, Motor, etc)" margin="normal" 
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
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="contained" onClick={onSave}>Guardar en Sistema</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventario;