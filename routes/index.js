const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req , res) => {
    //res.send('hello world');});
    res.send('hello world');
})

router.use('/contacts', require('./contacts'))

module.exports = router;