// src/modules/Dashboard/queries.js
export const getProductionData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Ensamblaje', unidades: 45 },
        { name: 'Pintura', unidades: 28 },
        { name: 'Motor', unidades: 15 },
        { name: 'Calidad', unidades: 32 },
        { name: 'Listo', unidades: 50 },
      ]);
    }, 800);
  });
};