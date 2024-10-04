// index.js
const express = require('express');
const app = express();
const loginRoute = require('./login/auth');
const { authToken } = require('./login/auth');
const weatherRoute = require('./data/weather'); // Archivo para la consulta del clima

app.use(express.json());

// Ruta para el login
app.use('/login', loginRoute);

// Ruta protegida para consultar el clima
app.use('/weather', authToken, weatherRoute);

// Ruta principal
app.get('/', (req, res) => {
res.send('Consultemos el clima!!! :)');
});

// Manejar rutas no definidas
app.use((req, res) => {
res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
