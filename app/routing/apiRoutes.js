var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    
    friends.push(req.body);
    res.json(true);

    var surveyScoreParse = req.body.scores.map(function(element) {
      
      return parseInt(element, 10)
      
      
    })
    
    function add(a, b) {
      return a + b
    }

    var surveySum = surveyScoreParse.reduce(add, 0)

    req.body.totalScore = surveySum;
    console.log(friends)
  });

};