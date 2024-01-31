const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
    const result = await mongodb.getDatabase().db("artists").collection('artists').find();
    result.toArray().then((artists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artists);
    });
  } catch (error) {
		console.log(error);
	}
};

 const getById = async (req, res) => {
  //#swagger.tags = ['Artists']
  if (ObjectId.isValid(req.params.id)) {
    const artistId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('artists').find({ _id: artistId });
    try {
      result.toArray().then((artists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artists[0]);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    res.status(400).json('Must use a valid artist id to find a artist.');
  }
};

const createArtist = async (req, res) => {
  //#swagger.tags = ['Artists']
  const artist = {
    name: req.body.name,
    genre: req.body.genre
  };
  try {
    const response = await mongodb.getDatabase().db('artists').collection('artists').insertOne(artist);
    if (response.acknowledged) {
      console.log(response.insertedId);
      res.status(201).json(response);
    } 
  } catch (error) {
    res.status(500).json(response.error || 'Some error occurred while creating the artist');
  }
};

const updateArtist = async (req, res) => {
  //#swagger.tags = ['Artists']
  if (ObjectId.isValid(req.params.id)) {
    const artistId = new ObjectId(req.params.id);
    const artist = {
        name: req.body.name,
        genre: req.body.genre
    };
    const response = await mongodb.getDatabase().db().collection('artists').replaceOne({ _id: artistId }, artist);
    if (response.modifiedCount > 0) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the artist');
    }
  } else {
    res.status(400).json('Must use a valid artist id to update a artist.');
  }
};

const deleteArtist = async (req, res) => {
  //#swagger.tags = ['Artists']
  if (ObjectId.isValid(req.params.id)) {
    const artistId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('artists').deleteOne({ _id: artistId });
    if (response.deletedCount > 0) {
      res.status(200).json(repsonse);
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the artist');
    }
  } else {
    res.status(400).json('Must use a valid artist id to delete a artist.');
  }
};

module.exports = {
    getAll,
    getById,
    createArtist,
    updateArtist,
    deleteArtist
};