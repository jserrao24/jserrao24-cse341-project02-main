const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Songs']
  try {
    const result = await mongodb.getDatabase().db("songs").collection('songs').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    });
  } catch (error) {
    console.log(error);
  }
};

// const getByArtistId = async (req, res) => {
//   //#swagger.tags = ['Songs']
//   try {
//     const artistId = new ObjectId(req.params.id);
//     const result = await mongodb.getDatabase().db().collection('songs').find({ artist_id: artistId });
//     result.toArray().then((songs) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(songs);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getById = async (req, res) => {
  //#swagger.tags = ['Songs']
  if (ObjectId.isValid(req.params.id)) {
    const songId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("songs").collection('songs').find({ _id: songId });
    try {
      result.toArray().then((songs) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(songs[0]);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    res.status(400).json('Must use a valid artist id to find a artist.');
  }
};

const createSong = async (req, res) => {
  //#swagger.tags = ['Songs']
  const song = {
    title: req.body.title,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
  };
  try {
    const response = await mongodb.getDatabase().db("songs").collection('songs').insertOne(song);
    if (response.acknowledged) {
      console.log(response.insertedId);
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json(response.error || 'Some error occurred while creating the song');
  }
};

const updateSong = async (req, res) => {
  //#swagger.tags = ['Songs']
  if (ObjectId.isValid(req.params.id)) {
    const songId = new ObjectId(req.params.id);
    const song = {
        title: req.body.title,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
    };
    const response = await mongodb.getDatabase().db().collection('songs').replaceOne({ _id: songId }, song);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the song');
    }
  } else {
    res.status(400).json('Must use a valid artist id to update a artist.');
  }
};

const deleteSong = async (req, res) => {
  //#swagger.tags = ['Songs']
  if (ObjectId.isValid(req.params.id)) {
    const songId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('songs').collection('songs').deleteOne({ _id: songId });
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the song');
    }
  } else {
    res.status(400).json('Must use a valid artist id to delete a artist.');
  }
};

module.exports = {
    getAll,
    // getByArtistId,
    getById,
    createSong,
    updateSong,
    deleteSong
};