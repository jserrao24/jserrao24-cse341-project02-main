const router = require('express').Router();
const { validate, artistSchema } = require('../middleware/validation');
const artistController = require('../controllers/artistController');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', artistController.getAll);
router.get('/:id', artistController.getById);

router.post('/', isAuthenticated, validate(artistSchema), artistController.createArtist);

router.put('/:id', isAuthenticated, validate(artistSchema),artistController.updateArtist);

router.delete('/:id', isAuthenticated, artistController.deleteArtist);

module.exports = router;