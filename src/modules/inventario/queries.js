// Simulamos obtener datos
export const getVehiculos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'VIN-9921', modelo: 'Sedan Sport', estado: 'Ensamblaje', color: 'Rojo' },
        { id: 'VIN-4432', modelo: 'SUV X5', estado: 'Pintura', color: 'Negro' },
      ]);
    }, 800);
  });
};

// Simulamos guardar (Crear o Editar)
export const saveVehiculoQuery = async (auto) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Si no tiene ID, le inventamos uno (Crear), si tiene, lo devolvemos (Editar)
      const data = { ...auto, id: auto.id || `VIN-${Math.floor(Math.random() * 9000)}` };
      resolve(data);
    }, 500);
  });
};

// Simulamos borrar
export const deleteVehiculoQuery = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
};