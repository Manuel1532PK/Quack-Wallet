const historyService = require('../services/history_service');

// Obtener historial de transferencias

// Obtener historial de transferencias
exports.getTransferHistory = async (req, res) => {
    try {
        const history = await historyService.getTransferHistory(req.params.userId);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial de transferencias", error });
    }
};

// Obtener historial de retiros
exports.getWithdrawalHistory = async (req, res) => {
    try {
        const history = await historyService.getWithdrawalHistory(req.params.userId);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial de retiros", error });
    }
};

// Obtener historial de depósitos
exports.getDepositHistory = async (req, res) => {
    try {
        const history = await historyService.getDepositHistory(req.params.userId);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial de depósitos", error });
    }
};

// Obtener todas las transacciones
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await historyService.getAllTransactions(req.params.userId);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener transacciones", error });
    }
};
