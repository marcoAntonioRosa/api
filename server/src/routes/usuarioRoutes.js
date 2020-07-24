const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')
const checkAuth = require('../middleware/checkAuth')
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', checkAuth, checkAdmin, controller.getAll);
router.get('/:id', checkAuth, checkAdmin, controller.get);
router.post('/', controller.post);
router.post('/login', controller.login);
router.post('/forgot_password', controller.novaSenha)
router.put('/', checkAuth, controller.update);
router.delete('/:id', checkAuth, controller.delete);

module.exports = router;