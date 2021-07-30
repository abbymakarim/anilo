const router = require('express').Router()
const orderController = require('../controllers/productController')

router.post('/order', orderController.makeOrder)
router.patch('/confirm', orderController.approveOrder)
router.patch('/cancel', orderController.cancelOrder)
router.get('/customer/check', orderController.customerCheckOrder)
router.get('/admin/check', orderController.adminCheckOrder)

module.exports = router