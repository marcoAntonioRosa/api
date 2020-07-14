const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController')

router.get('/',  controller.getAll);
router.get('/:id',  controller.get);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id', controller.delete);

module.exports = router;