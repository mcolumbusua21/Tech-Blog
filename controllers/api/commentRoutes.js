const router = require('express').Router();
const { Comments } = require('../../models');
const checkAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
        const commData = await Comments.findAll();
        res.json(commData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Post a new comment
router.post('/', checkAuth, async (req, res) => {

    try {
        if (req.session) {
            const commData = await Comments.create({
                content: req.body.content,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            res.json(commData)
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);

    }
});

router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const commData = await Comments.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!commData) {
            res.status(404).json({ message: 'No comment with that ID was found' });
            return;
        }
        res.json(commData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
;

module.exports = router;