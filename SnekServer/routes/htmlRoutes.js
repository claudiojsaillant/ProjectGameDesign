const db = require("../models");
module.exports = function(app) {
  //Homepage 
  app.get("/", function(req, res) {
    if(req.cookies.user != undefined){
      console.log(req.cookies.user)
      res.render("loggedIndex", {
        data: req.cookies.user
      });
    } else {
      res.render("index");
  }

  });

  //Sign Up
  app.get("/signup", function(req, res) {
    res.render("signup");
  })

  //Log In
  app.get("/login", function(req, res) {
    res.render("login");
  })

  app.get("/survival", function(req, res) {
    if(req.cookies.user != undefined){
      res.render("survival", {
        data: req.cookies.user
      });
    } else {
      res.render("index");
  }
  });

app.get("/credits", function(req, res) {
    res.render("credits");
});

app.get("/top", function(req, res) {

  db.Users.find().sort([['highScore', -1]]).lean().then((data)=>{
      let myData = data;
      res.render("top10Players", {
        players: myData
      });
  });
 

});

app.get("/lv1", function(req, res) {
  res.render("lv1");
});

app.get("/lv2", function(req, res) {
  res.render("lv2");
});

app.get("/lv3", function(req, res) {
  res.render("lv3");
});

app.get("/lv4", function(req, res) {
  res.render("lv4");
});

app.get("/lv5", function(req, res) {
  res.render("lv5");
});

app.get("*", function(req, res) {
  res.render("404");
});







  
};