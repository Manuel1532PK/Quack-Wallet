const userService = require('../services/user_service');


// Obtener perfil de usuario 
exports.getProfile = async (req, res) => {
    try {
        const users = await userService.getprofile();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfiles", error });
    }
};

// Obtener usuario por ID 
exports.findById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
};

// Actualizar usuario
exports.updateuser = async (req, res) => {
    try {
        const updatedUser = await userService.updateuser(req.params.id, req.body.nombre,req.body.correo);
        res.status(200).json({ 
            message: "Usuario actualizado exitosamente",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};

// Actualizar contraseña 
exports.updatePassword = async (req, res) => {
    try {
        const updatedPassword = await userService.updatePassword(req.params.id, req.body.contrasena);
        res.status(200).json({ 
            message: "Contraseña actualizada exitosamente",
            user: updatedPassword
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar contraseña", error });
    }
};