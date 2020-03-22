const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(pedido => {
                        return{
                            id_pedido:  pedido.id_pedido,
                            id_produto: pedido.id_produto,
                            quantidade: pedido.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os detalhes de um pedido especifico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedido
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
});

//INSERE UM PEDIDOS
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(pedido => {
                        return{
                            id_pedido:  pedido.id_pedido,
                            id_produto: pedido.id_produto,
                            quantidade: pedido.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os detalhes de um pedido especifico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedido
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
});

//RETORNA PEDIDO ESPECIFICO POR ID
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Detalhe do pedido',
            id_pedido: id
        });
    }
});


//DELETAR UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluido'
    });
});



module.exports = router;