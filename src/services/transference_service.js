const connection = require('../config/db_config');


// Realizar transferencia
exports.transfer = async (transferData) => {
    const { usuario_origen, usuario_destino, monto, moneda, descripcion } = transferData;

    const [result] = await connection.execute(
        `INSERT INTO Transacciones (Usuarios_ID, Monto, Mneda, Tipo_Transaccion, Descripcion) 
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