const express = require('express');
const axios = require('axios');
const router = express.Router();
const { authToken } = require('./auth');

router.get('/', authToken, async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Se requieren los parámetros de latitud y longitud.' });
    }

    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
                latitude: latitude,
                longitude: longitude,
                current_weather: true,
            }
        });

        const temperature = response.data.current_weather.temperature;

        res.json({ temperature });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ message: error.response.data.message || 'Error al obtener el clima.' });
        } else {
            return res.status(500).json({ message: 'Error en la conexión con la API de Open Meteo.' });
        }
    }
});

module.exports = router;
