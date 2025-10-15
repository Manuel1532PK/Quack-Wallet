const UserService = require('../services/user_service');
const userService = new UserService();

class UserController {
    async createUser(req, res) {
        try {
            const result = await userService.createUser(req.body);
            res.status(200).json({ message: "Usuario creado", data: result });
        } catch (error) {
            res.status(500).json({ message: "Error del servidor" });
        }
    }

    async getProfile(req, res) {
        try {
            const users = await userService.getprofile();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error del servidor" });
        }
    }

    async findById(req, res) {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(400).json({ message: "Usuario no encontrado" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error del servidor" });
        }
    }

    async updateuser(req, res) {
        try {
            const updatedUser = await userService.updateuser({
                id: req.params.id, 
                Nombre_Usuario: req.body.Nombre_Usuario, 
                Correo: req.body.Correo
            });
            res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Error del servidor" });
        }
    }

    async updatePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            await userService.updatePassword(req.params.id, oldPassword, newPassword);
            res.status(200).json({ message: "Contraseña actualizada" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updatePin(req, res) {
        try {
            const { oldPin, newPin } = req.body;
            await userService.updatePin(req.params.id, oldPin, newPin);
            res.status(200).json({ message: "PIN actualizado" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();