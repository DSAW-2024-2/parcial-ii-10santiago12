// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const loginRoute = require('./auth'); // Ruta para el login
const weatherRoute = require('./weather'); // Asegúrate de que este archivo exista y se llame 'weather.js'

// Middleware para procesar datos JSON
app.use(express.json());

// Ruta para el login
app.use('/login', loginRoute);

// Ruta para obtener el clima
app.use('/weather', weatherRoute); // Asegúrate de que esta ruta esté configurada correctamente

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido!!');
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
