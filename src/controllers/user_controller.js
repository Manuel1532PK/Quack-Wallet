const userService = require('../services/user_service');


// Obtener perfil de usuario 
exports.getProfile = async (req, res) => {
    try {
        const users = await userService.getprofile();
        
        // Verificar si se encontraron usuarios
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron usuarios"
            });
        }

        res.status(200).json({
            success: true,
            data: users,
            count: users.length
        });
    } catch (error) {
        console.error('Error en getProfile controller:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al obtener perfiles",
            error: error.message 
        });
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
        const updatedUser = await userService.updateuser({id: req.params.id, nombre: req.body.nombre, correo:req.body.correo});
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
        const updatedPassword = await userService.updatePassword({id: req.params.id, Password:req.body.Password});
        res.status(200).json({ 
            message: "Contraseña actualizada exitosamente",
            user: updatedPassword
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar contraseña", error });
    }
};

// Crear nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { nombre, correo, telefono, pin } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!nombre || !correo || !telefono || !pin) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos: Nombre_Usuario, Correo, Telefono, Pin_Seguridad'
            });
        }

        console.log('Datos recibidos:', { nombre, correo, telefono, pin });

        const result = await userService.createUser(nombre, correo, telefono, pin);
        
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            userId: result.insertId
        });
    } catch (error) {
        console.error('Error en createUser:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            details: error.message
        });
    }
};