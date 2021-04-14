const { Post, User } = require('../models');
const sequlize = require('../config/connection')
const checkAuth = require('../utils/checkAuth')
const router =  require('express').Router();
