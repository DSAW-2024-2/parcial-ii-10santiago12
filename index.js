require('dotenv').config();
const express = require('express');
const app = express();
const loginRoute = require('./auth');
const weatherRoute = require('./weather');
const { authToken } = require('./auth');

app.use(express.json());

app.use('/login', loginRoute);

app.use('/weather', authToken, weatherRoute);

app.get('/', (req, res) => {
    res.send('Bienvenido a la app del clima!!');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});