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
        'UPDATE Usuarios  SET Hash_Password = ? WHERE ID_Usuarios = ?',
        [newPassword.contrasena, newPassword.id]
    );
    return { id: newPassword.id, contrasena: newPassword.contrasena };
};

//actualizar usuario
exports.updateuser = async (updateuser) => {
    const [result] = await connection.execute(
        'UPDATE usuarios  SET Nombre = ?, Correo = ? WHERE ID_Usuarios = ?',
        [updateuser.nombre, updateuser.correo, updateuser.id]
    );
    return updateuser;
};

// Crear usuario con billetera
exports.createUser = async (nombre, correo, telefono, pin) => {
    try {
        // Validar que ningún parámetro sea undefined
        if ([nombre, correo, telefono, pin].some(param => param === undefined)) {
            throw new Error('Uno o más parámetros son undefined');
        }
        const query = `INSERT INTO Usuarios (Nombre_Usuario, Correo, Telefono, Pin_Seguridad, Fecha_Registro) VALUES (?, ?, ?, ?, NOW()
        )`;
        const [result] = await connection.execute(query, [nombre, correo, telefono, pin]
        );

        return result;

    } catch (error) {
        console.error('Error en createUser service:', error);
        throw error;
    }
};