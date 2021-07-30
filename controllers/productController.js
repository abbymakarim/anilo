const { Product, Order } = require('../models')
const { validateToken } = require('../helpers/jwt')

class orderController {
    static makeOrder(req, res){
        if(req.headers.access_token === undefined){
            res.status(400).json({message: 'Required Login'})
        }
        let decoded = validateToken(req.headers.access_token)
        let {product_id, product, quantity, user_data} = req.body
        let productQuantity
        Product.findOne({
            where: {
                id: product_id
            }
        }).then(data => {
            if(data.quantity - quantity > 0 ){
                productQuantity = data.quantity
                let order = {
                    userId: decoded.userId,
                    status: 'ordered',
                    user_data,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                Order.create(order)
            } else {
                res.status(400).json({message: 'Cannot Purchase Product More Than Quantity'})
            }
        }).then(data => {
            let update = {
                quantity : productQuantity - quantity
            }
            Product.update(update, {
                where: {
                    id: product_id
                }
            })
        }).then(data => {
            res.status(201).json('Order Created')
        }).catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static approveOrder(req, res){
        if(req.headers.access_token === undefined){
            res.status(400).json({message: 'Required Login'})
        }
        let decoded = validateToken(req.headers.access_token)
        if(decoded.status === 'admin'){
            let {order_id} = req.body
            Order.findOne({
                where : {
                    id: order_id
                }
            })
            .then(result => {
                Order.update({status: "shipped"} , {
                    where: {
                        id: order_id
                    }
                })
            })
            .then(result => {
                res.status(200).json({message: "Order Shipped"})
            })
            .catch(err => {
                res.status(500).json({message: 'Internal Server Error'})
            })
        } else {
            res.status(400).json({message: "Not Permitted"})
        }
    }

    static cancelOrder(req, res){
        if(req.headers.access_token === undefined){
            res.status(400).json({message: 'Required Login'})
        }
        let decoded = validateToken(req.headers.access_token)
        if(decoded.status === 'admin'){
            let {order_id} = req.body
            Order.findOne({
                where : {
                    id: order_id
                }
            })
            .then(result => {
                if(result.status === 'shipped'){
                    res.status(400).json('Cannot Cancel Shipped Order')
                }
                Order.update({status: "canceled"} , {
                    where: {
                        id: order_id
                    }
                })
            })
            .then(result => {
                res.status(200).json({message: "Order Canceled"})
            })
            .catch(err => {
                res.status(500).json({message: 'Internal Server Error'})
            })
        } else {
            res.status(400).json({message: "Not Permitted"})
        }
    }

    static customerCheckOrder(req, res){
        if(req.headers.access_token === undefined){
            res.status(400).json({message: 'Required Login'})
        }
        let {order_id} = req.body
        Order.findOne({
            where : {
                id: order_id
            }
        })
        .then(result => {
            res.status(200).json({status: result.status})
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static adminCheckOrder(req, res){
        if(req.headers.access_token === undefined){
            res.status(400).json({message: 'Required Login'})
        }
        let decoded = validateToken(req.headers.access_token)
        if(decoded.status === 'admin'){
            let {order_id} = req.body
            Order.findOne({
                where : {
                    id: order_id
                }
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({message: 'Internal Server Error'})
            })
        } else {
            res.status(400).json({message: "Not Permitted"})
        }
    }
}

module.exports = orderController