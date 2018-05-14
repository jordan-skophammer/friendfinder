var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    
    var surveyScoreParse = req.body.scores.map(function(element) {
      
      return parseInt(element, 10)
      
    })
    
    function add(a, b) {
      return a + b
    }

    var surveySum = surveyScoreParse.reduce(add, 0)

    req.body.totalScore = surveySum;
    // 
    for (let i = 0; i< friends.length; i++) {
      var compareFriends = Math.abs(surveySum - friends[i].totalScore)

      friends[i].compareScore = compareFriends

      friends.sort(function(a, b) {
        return a.compareScore - b.compareScore
      })
    }
    
    // console.log(friends)

    friends.push(req.body);
    res.json(true);

    // console.log(friends)
  });

};