const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')
const checkAuth = require('../middleware/checkAuth')
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', checkAuth, checkAdmin, controller.getAll);
router.get('/:id', checkAuth, checkAdmin, controller.get);
router.post('/', controller.signup);
router.post('/login', controller.login);
router.post('/forgot_password', controller.forgotPassword);
router.post('/reset_password', controller.resetPassword);
router.put('/', checkAuth, controller.update);
router.delete('/:id', controller.delete);

module.exports = router;