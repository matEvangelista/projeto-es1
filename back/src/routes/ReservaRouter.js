// routes/ReservaRouter.js
const express = require('express');
const reservaController = require('../controllers/ReservaController');

const router = express.Router();

//reservas
router.get('/api/reservas/:tipo', reservaController.getAll);
router.get('/api/reservas/:tipo/:id', reservaController.getReservaById);
router.post('/api/reservas/:tipo', reservaController.create);
router.put('/api/reservas/:tipo/:id', reservaController.update);
router.delete('/api/reservas/:tipo/:id', reservaController.delete);

//reservas por espaco
router.get('/api/reservas/:tipo/espaco/:idEspaco', reservaController.getAllByEspaco);

//dados da view de reservas
router.get('/api/reservas/view/:tipo', reservaController.getDadosFromView);

module.exports = router;