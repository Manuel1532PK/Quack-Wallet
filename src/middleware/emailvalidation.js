const validators = require('../utils/validators');

const validateEmail = (req, res, next) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ message: "Correo es requerido" });
    }

    if (!validators.isValidEmail(correo)) {
        return res.status(400).json({ message: "Formato de correo inválido" });
    }
    next();
};

module.exports = validateEmail;