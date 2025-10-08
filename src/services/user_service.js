const connection = require('../config/db_config');

//obtener perfjl
exports.getprofile = async () => {
    const [rows] = await connection.execute('SELECT * FROM Usuarios ');
    return rows;
};

//obtener ID
exports.findById = async (id) => {
    const [rows] = await connection.execute('SELECT * FROM Usuarios WHERE ID_Usuarios = ?', [id]);
    return rows[0];
};

//actualizar contraseña
exports.updatePassword = async (newPassword) => {
    const [result] = await connection.execute(
        'UPDATE Usuarios SET Hash_Password = SHA2(?, 256) WHERE ID_Usuarios = ?',
        [newPassword.hash_password, newPassword.id]
    );
    return { id: newPassword.id, hash_password: newPassword.hash_password };
};

//actualizar usuario
exports.updateuser = async (updateuser) => {
    const [result] = await connection.execute(
        'UPDATE Usuarios SET Nombre_Usuario = ?, Correo = ? WHERE ID_Usuarios = ?',
        [updateuser.nombre_usuario, updateuser.correo, updateuser.id]
    );
    return updateuser;
};

// Crear usuario con billetera usando el procedimiento almacenado
exports.createUser = async (userData) => {
    try {
        console.log('Datos recibidos:', userData); // Para debug

        // Llamar al procedimiento almacenado
        const [result] = await connection.execute(
            'CALL CrearUsuarioConBilletera(?, ?, ?, ?, ?)',
            [
                userData.Nombre_Usuario,
                userData.Correo,
                userData.Telefono,
                userData.Hash_Password,
                userData.Pin_Seguridad
            ]
        );

        console.log('Resultado del procedimiento:', result); // Para debug

        // El procedimiento devuelve un conjunto de resultados
        return result[0][0];

    } catch (error) {
        console.error('Error en createUser service:', error);
        throw error;
    }
};

