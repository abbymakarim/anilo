const { User } = require('../models/index')
const { generateToken } = require('../helpers/jwt')

class userController{
    static login(req, res){
        let username = req.body.username
        User.findOne({
            where: {
                username
            }
        }).then(result => {
            console.log(result)
            if(result){
                const payload = {
                    userId: result.id,
                    username: result.username,
                    status: result.status
                }
                const access_token = generateToken(payload)
                res.status(200).json({access_token})
            } else {
                res.status(400).json({message: 'Invalid Username'})
            }
        }).catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }
}

module.exports = userController