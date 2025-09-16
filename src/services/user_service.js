const db = require('../config/db_config');

//obtener perfjl
exports.getprofile = async () => {
    const [rows] = await db.execute('SELECT * FROM Nombre_Usuario');
    return rows;
};

//obtener ID
exports.findById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0];
};

//actualizar contraseña
exports.updatePassword = async (newPassword) => {
    const [result] = await db.execute(
        'UPDATE Nombre_Usuario SET Hash_Password = ? WHERE id = ?',
        [newPassword.contrasena, newPassword.id]
    );
    return { id: newPassword.id, contrasena: newPassword.contrasena};
};

//actualizar usuario
exports.updateuser = async (updateuser) => {
    const [result] = await db.execute(
        'UPDATE Nombre_Usuario SET nombre = ?, correo = ? WHERE id = ?',
        [updateuser.nombre, updateuser.correo, updateuser.id]
    );
    return { id: updateuser.id, nombre: updateuser.nombre, correo: updateuser.correo };
};

