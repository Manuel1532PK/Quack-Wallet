const bcrypt = require('bcryptjs');
const connection = require('../config/db_config');

class UserService {
    constructor() {
        this.connection = connection;
    }
//obtener perfjl
    async getprofile () {
        const [rows] = await this.connection.execute('SELECT * FROM Usuarios ');
        return rows;
        }

//obtener ID
    async findById(id){
        const [rows] = await this.connection.execute('SELECT * FROM Usuarios WHERE ID_Usuarios = ?', [id]);
        return rows[0];
    }

//Obtener correo
    async findByEmail(correo) {
        const [rows] = await this.connection.execute('SELECT * FROM Usuarios WHERE Correo = ?', [correo]);
        return rows[0];
    }

// Crear usuario con billetera usando el procedimiento almacenado
    async createUser(userData) {
        try {
            const hash_password = await bcrypt.hash(userData.Hash_Password, 10);
            const pin_seguridad = await bcrypt.hash(userData.Pin_Seguridad, 10);

            // Llamar al procedimiento almacenado
            const [result] = await this.connection.execute(
                'CALL CrearUsuarioConBilletera(?, ?, ?, ?, ?)',
                [
                    userData.Nombre_Usuario,
                    userData.correo,
                    userData.Telefono,
                    hash_password,
                    pin_seguridad
                ]
            );

            return result[0][0];
        } catch (error) {
            console.error('Error en createUser service:', error);
            throw error;
        }
    };

//actualizar usuario
    async updateuser(userData) {
        const {id, Nombre_Usuario, Correo} = userData;
        await this.connection.execute(
            'UPDATE Usuarios SET Nombre_Usuario = ?, Correo = ? WHERE ID_Usuarios = ?',
            [Nombre_Usuario, Correo, id]
        );
        return this.findById(id);
    }
    
//actualizar contraseña
    async updatePassword(id, oldPassword, newPassword) {
        const [rows] = await this.connection.execute(
            'SELECT Hash_Password FROM Usuarios WHERE ID_Usuarios = ?',
            [id]
        );

        if (!rows[0]) throw new Error('Usuario no encontrado');

        const isMatch = await bcrypt.compare(oldPassword, rows[0].Hash_Password);
        if (!isMatch) throw new Error('Contraseña actual incorrecta');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.connection.execute(
            'UPDATE Usuarios SET Hash_Password = ? WHERE ID_Usuarios = ?',
            [hashedPassword, id]
        );

        return { success: true, message: 'Contraseña actualizada correctamente' };
    }

    //actualizar PIN
    async updatePin(id, oldPin, newPin) {
        const [rows] = await this.connection.execute(
            'SELECT Pin_Seguridad FROM Usuarios WHERE ID_Usuarios = ?',
            [id]
        );
        if (!rows[0]) throw new Error('Usuario no encontrado');

        const isMatch = await bcrypt.compare(oldPin, rows[0].Pin_Seguridad);
        if (!isMatch) throw new Error('PIN actual incorrecto');

        const hashedPin = await bcrypt.hash(newPin, 10);
        await this.connection.execute(
            'UPDATE Usuarios SET Pin_Seguridad = ? WHERE ID_Usuarios = ?',
            [hashedPin, id]
        );
        return { success: true, message: 'PIN actualizado correctamente' };
    }
}
module.exports = UserService;
