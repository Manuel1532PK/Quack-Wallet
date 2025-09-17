const accountService = require('../services/account_service');

exports.getBalance = async (req, res) => {
    const balance = await accountService.getBalance(req.params.id);
    res.json(balance);
};

exports.transfer = async (req, res) => {
    const result = await accountService.transfer(req.body.fromId, req.body.toId, req.body.monto);
    res.json(result);
};

exports.transferHistory = async (req, res) => {
    const history = await accountService.transferHistory(req.params.id);
    res.json(history);
};

exports.withdraw = async (req, res) => {
    const result = await accountService.withdraw(req.body.id, req.body.monto);
    res.json(result);
};

exports.withdrawHistory = async (req, res) => {
    const history = await accountService.withdrawHistory(req.params.id);
    res.json(history);
};

exports.deposit = async (req, res) => {
    const result = await accountService.deposit(req.body.id, req.body.monto);
    res.json(result);
};

exports.depositHistory = async (req, res) => {
    const history = await accountService.depositHistory(req.params.id);
    res.json(history);
};

exports.transactions = async (req, res) => {
    const transactions = await accountService.transactions(req.params.id);
    res.json(transactions);
};

exports.logout = async (req, res) => {
    res.json({ message: "Sesión cerrada correctamente" });
};

