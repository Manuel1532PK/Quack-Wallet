const connection = require('../config/db_config');

// Registrar nuevo usuario
exports.register = async (userData) => {
    const { nombre, correo, hash_password } = userData;
    const [result] = await connection.execute(
        'INSERT INTO Usuarios (Nombre_Usuario, Correo, Hash_Password, Fecha_Registro) VALUES (?, ?, ?, NOW())',
        [nombre, correo, hash_password]
    );
    return { id: result.insertId, nombre, correo };
}

exports.login = async (correo, password) => {
    const token 
        = "fake-jwt-token";
    return { message: "Inicio de sesión exitoso", token, correo, hash_password };
};

exports.forgotPassword = async (correo) => {
    return { message: `Se envió un enlace de recuperación al correo ${correo}` };
};

exports.resetPassword = async (newPassword) => {
    return { message: "Contraseña restablecida correctamente", token, newPassword };
};


//Toca agregar la funcion de token para login y reiniciar contraseña