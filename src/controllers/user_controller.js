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
        // Validar que todos los campos requeridos estén presentes
        const requiredFields = ['Nombre_Usuario', 'Correo', 'Telefono', 'Hash_Password', 'Pin_Seguridad'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Todos los campos son requeridos: ${missingFields.join(', ')}`
            });
        }

        console.log('Datos recibidos:', req.body);

        const result = await userService.createUser(req.body);
        
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            data: result
        });
    } catch (error) {
        console.error('Error en createUser:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            details: error.message
        });
    }
};

exports.login = async (correo, password) => {
    const [rows] = await connection.execute(
        'SELECT * FROM Usuarios WHERE Correo = ?',
        [correo]
    );

    const user = rows[0];
    if (!user) throw new Error('Usuario no encontrado');

    const valid = bcrypt.compareSync(password, user.Hash_Password);
    if (!valid) throw new Error('Contraseña incorrecta');

    return {
        ID_Usuarios: user.ID_Usuarios,
        Nombre_Usuario: user.Nombre_Usuario,
        Correo: user.Correo
    };
};