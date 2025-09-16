const db = require('../config/db_config');

// Obtener saldo de la billetera del usuario
exports.getBalance = async (userId) => {
        const [rows] = await db.execute(`
            SELECT Billeteras.Moneda, Billeteras.Saldo 
            FROM Billeteras
            INNER JOIN Transacciones ON Billeteras.ID_Billetera = Transacciones.Billeteras_ID_Billetera
            WHERE Transacciones.Usuarios_ID_Usuarios = ?
            ORDER BY Transacciones.Fecha_Transaccion 
        `, [userId]);
        
        return rows[0] || { Moneda: 'USD', Saldo: 0 };
};

// Obtener historial de transferencias
exports.getTransferHistory = async (userId) => {
        const [rows] = await db.execute(`
            SELECT Transacciones.*, Billeteras.Moneda 
            FROM Transacciones
            INNER JOIN Billeteras ON Transacciones.Billeteras_ID_Billetera = Billeteras.ID_Billetera
            WHERE Transacciones.Usuarios_ID_Usuarios = ? AND Transacciones.Tipo_Transaccion = 'transferencia'
            ORDER BY Transacciones.Fecha_Transaccion
        `, [userId]);
        
        return rows
};

// Obtener historial de retiros
exports.getWithdrawalHistory = async (userId) => {
        const [rows] = await db.execute(`
            SELECT Transacciones.*, Billeteras.Moneda 
            FROM Transacciones
            INNER JOIN Billeteras ON Transacciones.Billeteras_ID_Billetera = Billeteras.ID_Billetera
            WHERE Transacciones.Usuarios_ID_Usuarios = ? AND Transacciones.Tipo_Transaccion = 'retiro'
            ORDER BY Transacciones.Fecha_Transaccion
        `, [userId]);
        
        return rows;
};

// Obtener historial de depósitos
exports.getDepositHistory = async (userId) => {
        const [rows] = await db.execute(`
            SELECT Transacciones.*, Billeteras.Moneda 
            FROM Transacciones
            INNER JOIN Billeteras ON Transacciones.Billeteras_ID_Billetera = Billeteras.ID_Billetera
            WHERE Transacciones.Usuarios_ID_Usuarios = ? AND Transacciones.Tipo_Transaccion = 'deposito'
            ORDER BY Transacciones.Fecha_Transaccion
        `, [userId]);
        
        return rows;
};

// Obtener todas las transacciones
exports.getAllTransactions = async (userId) => {
        const [rows] = await db.execute(`
            SELECT Transacciones.*, Billeteras.Moneda 
            FROM Transacciones
            INNER JOIN Billeteras ON Transacciones.Billeteras_ID_Billetera = Billeteras.ID_Billetera
            WHERE Transacciones.Usuarios_ID_Usuarios = ?
            ORDER BY Transacciones.Fecha_Transaccion
        `, [userId]);
        
        return rows;
};

