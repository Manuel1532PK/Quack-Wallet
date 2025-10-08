const connection = require('../config/db_config');

// Crear nueva tarjeta
exports.addCard = async (userId, cardData) => {
    try {
        const [userRows] = await connection.execute(
            'SELECT * FROM Usuarios WHERE ID_Usuarios = ?',
            [userId]
        );

        if (userRows.length === 0) {
            throw new Error('El usuario especificado no existe');
        }

        const [result] = await connection.execute(
            'INSERT INTO Tarjetas_Registro (ID_Usuario, Tipo_tarjeta, Numero) VALUES (?, ?, ?)',
            [userId, cardData.Tipo_tarjeta, cardData.Numero]
        );
        
        return {
            ID_Tarjetas: result.insertId,
            ID_Usuarios: userId,
            Tipo_tarjeta: cardData.Tipo_tarjeta,
            Numero: cardData.Numero,
            mensaje: "Tarjeta registrada exitosamente"
        };
    } catch (error) {
        console.error('Error en agregar tarjeta service:', error);
        throw error;
    }
};

// Listar tarjetas de un usuario
exports.listCards = async (userId) => {
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM Tarjetas_Registro WHERE ID_Usuarios = ?',
            [userId]
        );
        return rows;
    } catch (error) {
        console.error('Error en lista de tarjetas service:', error);
        throw error;
    }
};

// Actualizar tarjeta
exports.updateCard = async (cardId, cardData) => {
    try {
        await connection.execute(
            'UPDATE Tarjetas_Registro SET Tipo_tarjeta = ?, Numero = ? WHERE ID_Tarjetas = ?',
            [cardData.Tipo_tarjeta, cardData.Numero, cardId]
        );

        // Obtener la tarjeta actualizada
        const [rows] = await connection.execute(
            'SELECT * FROM Tarjetas_Registro WHERE ID_Tarjetas = ?',
            [cardId]
        );
        return rows[0];
    } catch (error) {
        console.error('Error en actaulizar la tarjeta service:', error);
        throw error;
    }
}

// Eliminar tarjeta
exports.deleteCard = async (cardId) => {
    try {
        const [result] = await connection.execute(
            'DELETE FROM Tarjetas_Registro WHERE ID_Tarjetas = ?',
            [cardId]
        );
        
        if (result.affectedRows === 0) {
            throw new Error('Tarjeta no encontrada');
        }
        return true;
    } catch (error) {
        console.error('Error en deleteCard service:', error);
        throw error;
    }
};

