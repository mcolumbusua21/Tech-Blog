const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res)=> {
  console.log('RECEIVED POST REQUEST AT ?/API/USERS')
  console.log('INCOMING REQUEST=>', req.body)
  const userData = await User.findAll({
    attributes: ('id', 'user_name')
  })
  res.json(userData)
  
})

router.post("/signup", async (req, res) => {
    const user = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

})

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  const updatedUserData = await User.update(req.body, { where: { id: req.params.id } })
})
router.delete('/:id', async (req, res) => {
  const deleteUser  = await User.destroy({ where: { id: req.params.id } })
})

module.exports = router;
