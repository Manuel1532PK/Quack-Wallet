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

// Realizar transferencia
exports.transfer = async (transferData) => {
    try {
        transferData = { usuario_origen, usuario_destino, monto, moneda, descripcion } ;
        
        // 1. Verificar saldo suficiente
        const [saldoRows] = await db.execute(
            'SELECT Saldo FROM Billeteras WHERE Usuarios_ID_Usuarios = ? AND Moneda = ?',
            [usuario_origen, moneda]
        );
        
        if (!saldoRows[0] || saldoRows[0].Saldo < monto) {
            throw new Error('Saldo insuficiente');
        }
        
        // 2. Iniciar transacción
        await db.beginTransaction();
        
        // 3. Restar del usuario origen
        await db.execute(
            'UPDATE Billeteras SET Saldo = Saldo - ? WHERE Usuarios_ID_Usuarios = ? AND Moneda = ?',
            [monto, usuario_origen, moneda]
        );
        
        // 4. Sumar al usuario destino (o crear billetera si no existe)
        const [destinoRows] = await db.execute(
            'SELECT ID_Billetera FROM Billeteras WHERE Usuarios_ID_Usuarios = ? AND Moneda = ?',
            [usuario_destino, moneda]
        );
        
        if (destinoRows[0]) {
            await db.execute(
                'UPDATE Billeteras SET Saldo = Saldo + ? WHERE ID_Billetera = ?',
                [monto, destinoRows[0].ID_Billetera]
            );
        } else {
            await db.execute(
                'INSERT INTO Billeteras (Usuarios_ID_Usuarios, Moneda, Saldo) VALUES (?, ?, ?)',
                [usuario_destino, moneda, monto]
            );
        }
        
        // 5. Registrar transacción de transferencia
        const [billeteraRows] = await db.execute(
            'SELECT ID_Billetera FROM Billeteras WHERE Usuarios_ID_Usuarios = ? AND Moneda = ?',
            [usuario_origen, moneda]
        );
        
        const [result] = await db.execute(
            `INSERT INTO Transacciones 
             (Tipo_Transaccion, Monto, Moneda, Descripcion, Fecha_Transaccion, Usuarios_ID_Usuarios, Billeteras_ID_Billetera) 
             VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
            ['transferencia', monto, moneda, descripcion, usuario_origen, billeteraRows[0].ID_Billetera]
        );
        
        await db.commit();
        return { id: result.insertId, message: 'Transferencia realizada exitosamente' };
        
    } catch (error) {
        await db.rollback();
        throw new Error('Error en transferencia: ' + error.message);
    }
};

