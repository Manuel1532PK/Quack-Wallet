const smartcontractsService = require('../services/smartcontracts_service');

// Crear nuevo contrato
exports.createContract = async (req, res) => {
    try {
        const contract = await smartcontractsService.createSmartContract(req.body);
        res.status(201).json({
            message: "Contrato inteligente creado exitosamente",
            data: contract
        });
    } catch (error) {
        console.error('Error en createContract:', error);
        res.status(500).json({ 
            error: "Error al crear contrato inteligente",
            details: error.message 
        });
    }
};

// Listar contratos
exports.listContracts = async (req, res) => {
    try {
        const contracts = await smartcontractsService.getAllSmartContracts();
        if (!contracts || contracts.length === 0) {
            return res.status(404).json({
                message: "No se encontraron contratos inteligentes"
            });
        }
        res.status(200).json({
            message: "Contratos inteligentes recuperados exitosamente",
            count: contracts.length,
            data: contracts
        });
    } catch (error) {
        console.error('Error en listContracts:', error);
        res.status(500).json({
            error: "Error al listar contratos inteligentes",
            details: error.message
        });
    }
};

// Obtener contrato por ID
exports.getContractById = async (req, res) => {
    try {
        const contract = await smartcontractsService.getSmartContractById(req.params.contractId);
        if (!contract) {
            return res.status(404).json({ message: "Contrato no encontrado" });
        }
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener contrato inteligente", error });
    }
};

// Actualizar contrato
exports.updateContract = async (req, res) => {
    try {
        const contract = await smartcontractsService.updateSmartContract(req.params.contractId, req.body);
        res.status(200).json({
            message: "Contrato inteligente actualizado exitosamente",
            data: contract
        });
    } catch (error) {
        console.error('Error en updateContract:', error);
        res.status(500).json({
            error: "Error al actualizar contrato inteligente",
            details: error.message
        });
    }
};

// Eliminar contrato
exports.deleteContract = async (req, res) => {
    try {
        // Verificar si el contrato existe antes de eliminarlo
        const contract = await smartcontractsService.getSmartContractById(req.params.contractId);
        if (!contract) {
            return res.status(404).json({
                error: "Contrato no encontrado"
            });
        }

        await smartcontractsService.deleteSmartContract(req.params.contractId);
        res.status(200).json({
            message: "Contrato eliminado exitosamente",
            data: {
                ID_Contratos_Inteligentes: req.params.contractId
            }
        });
    } catch (error) {
        console.error('Error en deleteContract:', error);
        res.status(500).json({
            error: "Error al eliminar contrato inteligente",
            details: error.message
        });
    }
};