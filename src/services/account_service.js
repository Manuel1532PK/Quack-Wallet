const connection = require('../config/db_config');

// Obtener saldo de la billetera del usuario
exports.getBalance = async (userId) => {
        const [rows] = await connection.execute(`
            SELECT Moneda, Saldo FROM Billeteras WHERE ID_Usuarios = ?
         `, [userId]);
        
        return rows[0] || { Moneda: null, Saldo: 0 };
};

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

// Realizar transferencia
exports.transfer = async (transferData) => {
    const { usuario_origen, usuario_destino, monto, moneda, descripcion } = transferData;

    const [result] = await connection.execute(
        `INSERT INTO Transacciones (Usuarios_ID, Monto, Moneda, Tipo_Transaccion, Descripcion) 
         VALUES (?, ?, ?, 'transferencia', ?)
         `, [usuario_origen, monto, moneda, descripcion]
    );

    return { id: result.insertId, ...transferData };
};

        //opciones a futuro

        // 2. Iniciar transacción
        // 3. Restar del usuario origen
        // 4. Sumar al usuario destino (o crear billetera si no existe)
        // 5. Registrar transacción de transferencia


// Realizar retiro
exports.withdraw = async (withdrawData) => {
    const { usuario_id, monto, moneda, descripcion } = withdrawData;

    const [result] = await connection.execute(
        `INSERT INTO Transacciones 
         (ID_Usuarios, Monto, Moneda, Tipo_Transaccion, Descripcion) 
         VALUES (?, ?, ?, 'retiro', ?)`,
        [usuario_id, monto, moneda, descripcion]
    );

    return { id: result.insertId, ...withdrawData };
};
        //toca agregar la funcion para que se retire y se registre la transaccion en el historial
        // 1. Realizar retiro
        // 2. Registrar transacción


// Realizar depósito
exports.deposit = async (depositData) => {
    const { usuario_id, monto, moneda, descripcion } = depositData;

    const [result] = await connection.execute(
        `INSERT INTO Transacciones 
         (ID_Usuarios, Monto, Moneda, Tipo_Transaccion, Descripcion) 
         VALUES (?, ?, ?, 'deposito', ?)`,
        [usuario_id, monto, moneda, descripcion]
    );

    return { id: result.insertId, ...depositData };
};
