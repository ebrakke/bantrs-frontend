var express = require('express');
var comment = express.Router();

/*
 * Create comment
 * TODO:
 * create comment 
 * store in DB
 * return comment
 */

comment.post('/', function(req, res) {
  var authToken = req.body.authToken;
  var rid = req.body.rid;
  var content = req.body.content;


  res.json({
  	cid: '1',
    room: {
      rid: '1',
      title: 'Snowpocalypse',
      author: {
        uid: '1',
        username: 'BantrsAddict'
      },
      date: new Date(2015, 2, 1, 12, 0, 0),
      lat: 9876,
      lng: 1234,
      radius: 20,
      members: 2,
      newComments: 2,
      contentType: 1,
      member: true
    },
    author: {
      uid: '1',
      username: 'BantrsAddict'
    },
    date: new Date(2015, 2, 15, 12, 0, 0),
  	comment: "I've been stuck in a parking lot snowbank for 3 months.."
  });
});

/*
 * Get comment
 * TODO:
 * get comment from DB
 * return comment
 */

comment.get('/:id', function(req, res) {
  var authToken = req.body.authToken;

  res.json({
    cid: '1',
    room: {
      rid: '1',
      title: 'Snowpocalypse',
      author: {
        uid: '1',
        username: 'BantrsAddict'
      },
      date: new Date(2015, 2, 1, 12, 0, 0),
      lat: 9876,
      lng: 1234,
      radius: 20,
      members: 2,
      newComments: 2,
      contentType: 1,
      member: true
    },
    author: {
      uid: '1',
      username: 'BantrsAddict'
    },
    date: new Date(2015, 2, 15, 12, 0, 0),
    comment: "I've been stuck in a parking lot snowbank for 3 months.."
  });
});

module.exports = comment;
