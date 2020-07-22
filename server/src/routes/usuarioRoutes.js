const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, controller.getAll);
router.get('/:id', checkAuth, controller.get);
router.post('/', controller.post);
router.post('/login', controller.login);
router.put('/', checkAuth, controller.update);
router.delete('/:id', checkAuth, controller.delete);

module.exports = router;