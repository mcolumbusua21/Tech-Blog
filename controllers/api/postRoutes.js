const router = require('express').Router();
const { Post, Comment, User } = require('../../models')
const checkAuth = require('../../utils/checkAuth')

router.post('/', checkAuth, async (req, res) => {
    req.body.user_id = req.session.userId;
    const newPost =  await Post.create(req.body)
    res.json(newPost.id)
})

router.put('/', checkAuth, async (req, res) => {
    const updatedPost = await Post.update(req.body, {
        where:
        {
            id: req.body.id
        }
    })
    res.json(updatedPost)
})

router.delete('/:id', checkAuth, async (req, res) => {
    const deletePost = await Post.destroy({ where: { id: req.params.id } })
    res.json(deletePost)
})