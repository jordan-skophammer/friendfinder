var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    //Parses the survey answers to intergers.
    var surveyScoreParse = req.body.scores.map(function(element) {
      
      return parseInt(element, 10);
      
    })
    
    //Adds the survey answers together.
    function add(a, b) {
      return a + b
    };

    var surveySum = surveyScoreParse.reduce(add, 0);

    //Appends the survey total to the user array.
    req.body.totalScore = surveySum;

    //Compares the difference between the users score and the existing friends in the array.
    //Then appends the score differnce and sorts the array my desending order.
    for (let i = 0; i< friends.length; i++) {

      var compareFriends = Math.abs(surveySum - friends[i].totalScore);

      friends[i].compareScore = compareFriends;

      friends.sort(function(a, b) {
        return a.compareScore - b.compareScore;
      })
    };

    //Appends the users object to the friends array.
    friends.push(req.body);
    res.json(true);

  });

};