const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const PedidosController = require('../controllers/pedidos-controller')



router.get('/', PedidosController.getPedidos);
router.post('/', PedidosController.postPedidos);
router.get('/:id_pedido', PedidosController.getIdPedidos);
router.delete('/', PedidosController.deletePedidos);

module.exports = router;