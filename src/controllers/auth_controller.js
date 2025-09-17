const authService = require('../services/auth_service');

exports.register = async (req, res) => {
    try {
        const newUser = await authService.register(req.body);
        res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await authService.login(req.body.correo, req.body.password);
        if (!user) return res.status(401).json({ message: "Credenciales inválidas" });
        res.status(200).json({ message: "Login exitoso", user });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const response = await authService.forgotPassword(req.body.correo);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar contraseña", error });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const response = await authService.resetPassword(req.body.token, req.body.newPassword);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Error al restablecer contraseña", error });
    }
};
