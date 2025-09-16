const express = require('express');
const userRoutes = require('./routes/user_routes');
const accountRoutes = require('./routes/account_routes');
const authRoutes = require('./routes/auth_routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3306;

app.use(express.json());

// Prefijo de la API y montaje de las rutas
app.use('/api/users', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});