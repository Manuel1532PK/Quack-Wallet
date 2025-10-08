const connection = require('../config/db_config');

// Obtener historial de transferencias
exports.getTransferHistory = async (userId) => {
        const [rows] = await connection.execute(`
            SELECT * FROM Transacciones WHERE ID_Usuarios = ? AND Tipo_Transaccion = 'transferencia
            `, [userId]);
        
        return rows
};

// Obtener historial de retiros
exports.getWithdrawalHistory = async (userId) => {
        const [rows] = await connection.execute(`
            SELECT * FROM Transacciones WHERE ID_Usuarios = ? AND Tipo_Transaccion = 'retiro
        `, [userId]);
        
        return rows;
};

// Obtener historial de depósitos
exports.getDepositHistory = async (userId) => {
        const [rows] = await connection.execute(`
            SELECT * FROM Transacciones WHERE ID_Usuarios = ? AND Tipo_Transaccion = 'deposito'
            `, [userId]);
        
        return rows;
};

// Obtener todas las transacciones
exports.getAllTransactions = async (userId) => {
        const [rows] = await connection.execute(`
            SELECT * FROM Transacciones WHERE ID_Usuarios = ?
            `, [userId]);
        
        return rows;
};

//Finalizado