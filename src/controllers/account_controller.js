const accountService = require('../services/account_service');

// Obtener saldo de usuario
exports.getBalance = async (req, res) => {
    try {
        const balance = await accountService.getBalance(req.params.userId);
        res.status(200).json(balance);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener saldo", error });
    }
};

// Obtener todas las transacciones
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await accountService.getAllTransactions(req.params.userId);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener transacciones", error });
    }
};