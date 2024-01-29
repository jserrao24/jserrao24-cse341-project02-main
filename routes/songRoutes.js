const router = require('express').Router();
const { validate, songSchema } = require('../middleware/validation');
const songController = require('../controllers/songController');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', songController.getAll);
router.get('/:id', songController.getById);

router.post('/', isAuthenticated, validate(songSchema), songController.createSong);

router.put('/:id', isAuthenticated, validate(songSchema), songController.updateSong);

router.delete('/:id', isAuthenticated, songController.deleteSong);

module.exports = router;