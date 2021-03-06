var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var List = require('../models/list');
var Item = require('../models/item')

//Token authentication middleware.
router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, 'secret', function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  })
});

//Get route for lists - uses the current user then populates their lists.
router.get('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id)
    .populate('lists')
    .exec(function (err, user) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: user.lists
      });
    });
});

router.get('/:listid', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  List.findById(req.params.listid)
    .populate('items')
    .exec(function (err, list) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: list
      });
    });
});

//A route that looks up items not in a given list. Used for adding items to a list.
router.get('/:listid/excludes', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Item.find({ $and: [{ lists: { $ne: req.params.listid } }, { user: decoded.user._id }] }, (err, item) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: item
    });
  })
});

router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    var list = new List({
      title: req.body.title,
      user: user._id
    });
    list.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      user.lists.push(result);
      user.save();
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
});

router.patch('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  List.findById(req.params.id, (err, list) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!list) {
      return res.status(500).json({
        title: 'No List Found!',
        error: { message: 'List not found' }
      });
    }
    if (list.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: { message: 'Users do not match' }
      });
    }
    const updates = {
      title: req.body.title
    }
    list.update(updates, (err, result) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated list title',
        obj: result
      });
    });
  });
});

router.delete('/:id', (req, res, next) => {
  var decoded = jwt.decode(req.query.token);
  List.findById(req.params.id, (err, list) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!list) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: { message: 'List not found' }
      });
    }
    if (list.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: { message: 'Users do not match' }
      });
    }
    list.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      User.findByIdAndUpdate(decoded.user._id, { '$pull': { 'lists': req.params.id } }, err => {
        if (err) { res.status(500).json({ message: 'Error deleting list from user db array' }) };
        res.status(200).json({
          message: "List has been removed."
        })
      })
    });
  });
});

module.exports = router;