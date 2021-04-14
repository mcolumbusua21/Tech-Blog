const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const checkAuth = require('../utils/checkAuth');
const prevAuth = require('../utils/prevAuth')
const sequlize = require('../config/connection')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['id', 'user_name'],
      }],
      order: sequlize.literal('post.created_at DESC'),
      limit: 10,
    });

    const clearData = postData.map(post => post.get());
    for (let i = 0; i < clearData.length; i++) {
      const user = JSON.parse(JSON.stringify(clearData[i].user))
      clearData[i].userName = user.user_name;
    }
    res.render('homepage', { cleanPostData, logged_in: req.session.userId? true:false })
}});

router.get('/signup', (req, res) => {

  res.render('signup')
})

router.get('/login', prevAuth, (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
