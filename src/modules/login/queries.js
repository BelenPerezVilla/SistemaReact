export const fakeLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // IMPORTANTE: Escribe exactamente esto en el navegador
      if (email === "admin@test.com" && password === "1234") {
        resolve({ success: true });
      } else {
        reject("Credenciales inválidas. Usa admin@test.com / 1234");
      }
    }, 1000);
  });
};