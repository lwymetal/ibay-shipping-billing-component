const router = require('express').Router();

const { billingShippingCtrl } = require('../controller/billingShippingController');

router.route('/shipping')
  .get(billingShippingCtrl.get)

router.route('/add')
  .post(billingShippingCtrl.post)

router.route('/update')
  .put(billingShippingCtrl.put)

router.route('/delete')
  .delete(billingShippingCtrl.delete);

module.exports = {
  router: router
};
