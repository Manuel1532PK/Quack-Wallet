const express = require('express');
const router = express.Router();
const smartcontractsController = require('../controllers/smartcontracts_controller');

router.post('/create', smartcontractsController.createContract);
router.get('/list', smartcontractsController.listContracts);
router.get('/:contractId', smartcontractsController.getContractById);
router.put('/:contractId/update', smartcontractsController.updateContract);
router.delete('/:contractId/delete', smartcontractsController.deleteContract);


module.exports = router;