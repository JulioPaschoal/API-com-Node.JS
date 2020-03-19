const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(
                'SELECT * FROM produtos;',
                (error, result, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        quantidade: result.length,
                        produtos: result.map(prod => {
                            return{
                                id_produto: prod.id_produto,
                                nome: prod.nome,
                                preco: prod.preco,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os produtos',
                                    url: 'http://localhost:3000/produtos/' + prod.id_produto
                                }
                            }
                        })
                    }
                    return res.status(200).send({ response })
                }
            )
        });
});

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error })}
            conn.query(
                'INSERT INTO produtos (nome, preco) VALUES (?,?)',
                [req.body.nome, req.body.preco],
                (error, result, fields) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    res.status(201).send({
                        mensagem: 'Produto inserido com sucesso',
                        id_produto: result.insertId
                    });
                }
            )
        });
});

//RETORNA PRODUTO ESPECIFICO POR ID
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: result})
            }
        )
    });
});


//ALTERAR UM PRODUTO 
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Produto Alterado com sucesso',
                });
            }
        )
    });;
});



//DELETAR UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [ req.body.id_produto],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Produto removido com sucesso',
                });
            }
        )
    });;
});

module.exports = router;