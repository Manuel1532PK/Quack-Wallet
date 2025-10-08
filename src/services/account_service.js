const connection = require('../config/db_config');

// Obtener saldo de la billetera del usuario
exports.getBalance = async (userId) => {
        const [rows] = await connection.execute(`
            SELECT Moneda, Saldo FROM Billeteras WHERE ID_Usuarios = ?
         `, [userId]);
        
        return rows[0] || { Moneda: null, Saldo: 0 };
};

// Obtener todas las transacciones del usuario
exports.getAllTransactions = async (userId) => {
    const [rows] = await connection.execute(`
        SELECT * FROM Transacciones WHERE ID_Usuarios = ?
        `, [userId]);
    return rows;
}