const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashboardRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashBoardRoutes)

router.use((req, res) => {
    res.status(404).send('<h1 Page Not Found</h1>')
})

module.exports = router;
