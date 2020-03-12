const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os produtos'
    });
});

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto criado '
    });
});

//RETORNA PRODUTO ESPECIFICO POR ID
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Detalhe do produto',
            id: id
        });
    }  else {
        res.status(200).send({
            mensagem: 'Voce passou um ID'
        });
    }
});


//ALTERAR UM PRODUTO 
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto alterado'
    });
});



//DELETAR UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto excluido'
    });
});

module.exports = router;