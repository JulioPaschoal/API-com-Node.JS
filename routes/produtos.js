const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login')
const ProdutosConctroller = require('../controllers/produtos-controller');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//RETORNA TODOS OS PRODUTOS
router.get('/', ProdutosConctroller.getProdutos);
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutosConctroller.postProdutos);
router.get('/:id_produto', ProdutosConctroller.getIdProdutos);
router.patch('/', login.obrigatorio, ProdutosConctroller.patchProdutos);
router.delete('/', login.obrigatorio, ProdutosConctroller.deleteProdutos);

module.exports = router;