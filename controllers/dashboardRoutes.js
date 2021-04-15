const { Post, User } = require('../models');
const sequlize = require('../config/connection')
const checkAuth = require('../utils/auth')
const router =  require('express').Router();

router.get('/', async (req, res) => {
    res.render('dashboard')
})

module.exports = router;