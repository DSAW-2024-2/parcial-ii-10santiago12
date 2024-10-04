// weather.js
const express = require('express');
const axios = require('axios'); // Para hacer solicitudes HTTP
const router = express.Router();
const { authToken } = require('./auth'); // Asegúrate de importar el middleware de autenticación

// Endpoint para obtener la temperatura
router.get('/', authToken, async (req, res) => {
    // Obtener latitud y longitud de los parámetros de consulta
    const { latitude, longitude } = req.query;

    // Verificar que se proporcionen ambos parámetros
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Se requieren los parámetros de latitud y longitud.' });
    }

    try {
        // Hacer la solicitud a la API de Open Meteo
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
                latitude: latitude,
                longitude: longitude,
                current_weather: true, // Obtener solo el clima actual
            }
        });

        // Extraer la temperatura de la respuesta
        const temperature = response.data.current_weather.temperature;

        // Devolver la temperatura
        res.json({ temperature });
    } catch (error) {
        // Manejar errores de la API
        if (error.response) {
            return res.status(error.response.status).json({ message: error.response.data.message || 'Error al obtener el clima.' });
        } else {
            return res.status(500).json({ message: 'Error en la conexión con la API de Open Meteo.' });
        }
    }
});

// Exportar el router
module.exports = router;
