const userService = require('../services/user_service');

exports.getProfile = async (req, res) => {
    const users = await userService.getProfile();
    res.json(users);
};

exports.findById = async (req, res) => {
    const user = await userService.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json({ message: "Usuario actualizado", user: updatedUser });
};

exports.updatePassword = async (req, res) => {
    const updated = await userService.updatePassword(req.params.id, req.body.contrasena);
    res.json({ message: "Contraseña actualizada", user: updated });
};
