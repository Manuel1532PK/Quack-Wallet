const connection = require('../config/db_config');

// Obtener todos los contratos inteligentes
exports.getAllSmartContracts = async () => {
    const [rows] = await connection.execute('SELECT * FROM Contratos_Inteligentes');
    return rows;
};

// Obtener contrato inteligente por ID
exports.getSmartContractById = async (id) => {
    const [rows] = await connection.execute('SELECT * FROM Contratos_Inteligentes WHERE ID_Contratos_Inteligentes = ?', [id]);
    return rows[0];
};

// Crear nuevo contrato inteligente
exports.createSmartContract = async (contractData) => {
    try {
        const [result] = await connection.execute(
            'INSERT INTO Contratos_Inteligentes (Descripcion, Codigo_smart_contract, Fecha_creacion) VALUES (?, ?, NOW())',
            [contractData.Descripcion, contractData.Codigo_smart_contract]
        );
        
        return { 
            ID_Contratos_Inteligentes: result.insertId,
            Descripcion: contractData.Descripcion,
            Codigo_smart_contract: contractData.Codigo_smart_contract
        };
    } catch (error) {
        console.error('Error al crear contrato inteligente:', error);
        throw error;
    }
}

// Actualizar contrato inteligente
exports.updateSmartContract = async (id, contractData) => {
    try {
        await connection.execute(
            'UPDATE Contratos_Inteligentes SET Descripcion = ?, Codigo_smart_contract = ? WHERE ID_Contratos_Inteligentes = ?',
            [contractData.Descripcion, contractData.Codigo_smart_contract, id]
        );
        
        // Obtener el contrato actualizado
        const [rows] = await connection.execute(
            'SELECT * FROM Contratos_Inteligentes WHERE ID_Contratos_Inteligentes = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar contrato:', error);
        throw error;
    }
}

// Eliminar contrato inteligente
exports.deleteSmartContract = async (id) => {
    try {
        await connection.execute(
            'DELETE FROM Contratos_Inteligentes WHERE ID_Contratos_Inteligentes = ?',
            [id]
        );
        return true;
    } catch (error) {
        console.error('Error al eliminar contrato:', error);
        throw error;
    }
}

//Finalizado