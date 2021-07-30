const router = require('express').Router()
const userRouter = require('./user')
const orderRouter = require('./order')

router.use(userRouter)
router.use(orderRouter)

module.exports = router