const { Router } = require('express');

const router = Router();

router.use('/song', require('./song'));
router.use('/artist', require('./artist'));
router.use('/album', require('./album'));
router.use('/playlist', require('./playlist'));
router.use('/search', require('./search'));

module.exports = router;
