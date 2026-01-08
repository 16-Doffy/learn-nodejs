const user = require('../controllers/user')
const router = require('express').Router()

router.get('/',user.getUsers) //se chay qua userController

module.exports = router