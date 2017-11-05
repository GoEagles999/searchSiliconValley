var express = require('express');
var request = require('request')
var router = express.Router();

router.get('/getData', function(req, res, next) {
  var season = req.query.season
  var filtered = []
  request('https://gist.githubusercontent.com/thekiwi/ab70294c8d7ab790d9b6d70df9d3d145/raw/14513c7b841b37b2406dda4d3b9143a25700a68e/silicon-valley.json', function (error,response,body) {
    var data = JSON.parse(body)
    if (season) {
      //build filtered data
      for(var i=0;i<data._embedded.episodes.length;i++) {
        if (data._embedded.episodes[i].season == season) {
          filtered.push(data._embedded.episodes[i])
        }
      }
      //send filtered data
      res.send(filtered)
    } else {
      //send whole data
      res.send(data)
    }
  })
});

module.exports = router;
