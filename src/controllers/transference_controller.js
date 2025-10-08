const transferenceService = require('../services/transference_service');

// Obtener todas las transacciones (transferencias, depósitos, retiros) de un usuario
// Realizar transferencia
exports.transfer = async (req, res) => {
    try {
        const transferData = {
            usuario_origen: req.body.usuario_origen,
            usuario_destino: req.body.usuario_destino,
            monto: req.body.monto,
            moneda: req.body.moneda,
            descripcion: req.body.descripcion
        };
        //Se cargaron todas la variables en una constante llamada transferData o transferencia_Datos
        
        const result = await transferenceService.transfer(transferData);
        res.status(200).json({ 
            message: "Transferencia realizada exitosamente",
            result: result
        });
    } catch (error) {
        res.status(500).json({ message: "Error al realizar transferencia", error });
    }
};

// Realizar depósito
exports.deposit = async (req, res) => {
    try {
        const depositData = { //Se cargaron todas la variables de la base de dato en una sola variable constante
            usuario_id: req.body.usuario_id,
            monto: req.body.monto,
            moneda: req.body.moneda,
            descripcion: req.body.descripcion
        };
        
        const result = await transferenceService.deposit(depositData);
        res.status(200).json({ 
            message: "Depósito realizado exitosamente",
            result: result
        });
    } catch (error) {
        res.status(500).json({ message: "Error al realizar depósito", error });
    }
};

// Realizar retiro
exports.withdraw = async (req, res) => {
    try {
        const withdrawData = { //Se cargaron todas la variables de la base de dato en una sola variable constante 
            usuario_id: req.body.usuario_id,
            monto: req.body.monto,
            moneda: req.body.moneda,
            descripcion: req.body.descripcion
        };
        
        const result = await transferenceService.withdraw(withdrawData);
        res.status(200).json({ 
            message: "Retiro realizado exitosamente",
            result: result
        });
    } catch (error) {
        res.status(500).json({ message: "Error al realizar retiro", error });
    }
};