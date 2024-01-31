const router = require('express').Router();
const { validate, songSchema } = require('../middleware/validation');
const songController = require('../controllers/songController');

router.get('/', songController.getAll);
router.get('/:id', songController.getById);

router.post('/',validate(songSchema), songController.createSong);

router.put('/:id',validate(songSchema), songController.updateSong);

router.delete('/:id',songController.deleteSong);

module.exports = router;