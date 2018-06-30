const router = require('express').Router();

const Controller = require('../Controller');

router.get('/shipping', Controller.get);
router.post('/create', Controller.post);
router.put('/update', Controller.put);
router.delete('/delete', Controller.delete);
// router.get('/count', Controller.count);

module.exports = router;