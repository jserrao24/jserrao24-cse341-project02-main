const router = require('express').Router();
const { validate, artistSchema } = require('../middleware/validation');
const artistController = require('../controllers/artistController');

router.get('/', artistController.getAll);
router.get('/:id', artistController.getById);

router.post('/',validate(artistSchema), artistController.createArtist);

router.put('/:id',validate(artistSchema),artistController.updateArtist);

router.delete('/:id',artistController.deleteArtist);

module.exports = router;