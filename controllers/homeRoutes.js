const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const checkAuth = require('../utils/auth');
const prevAuth = require('../utils/stopAuth')
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
router.get('/post/:id', checkAuth, async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
      include: [{
          model: User,
          attributes: ['id', 'user_name'],
      },]
  });
  //serialize post data
  const post = postData.get();
  //pulling out user name to where handlebars can grab it
  const user = JSON.parse(JSON.stringify(post.user));
  post.userName = user.user_name;


  const commentData = await Comment.findAll({
      where: { post_id: post.id },
      include: {
          model: User,
          attributes: ['id', 'user_name'],
      },
  })

  //serialize comment data
  const comments = commentData.map((comment) => comment.get())
  //pull out user names where handlebars can grab it
  for (let i = 0; i < comments.length; i++) {
      const user = comments[i].user;
      comments[i].userName = user.user_name;
  }


  res.render('postpage', { post, comments, loggedIn: req.session.userId? true:false  })
})

module.exports = router;
