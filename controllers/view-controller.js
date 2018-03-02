
module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },

  // getBuildings(req, res) {
  //   res.render('/', {
  //     message: "ok lets get a new building"
  //   })
  // },

  showBuildings(req, res) {
    console.log('showBuildings in view controller running');
    res.render('buildings/building-queries.ejs', {
      message: "Below are all the buildings: ",
      data: res.locals.buildings
    }); 
  },

  showOne(req, res) {
    console.log('showOne in view controller running');
    res.render('buildings/building-info.ejs', {
      message: "Here is just one building: ",
      data: res.locals.building
    }); 
  },

  showComplaints(req, res) {
    console.log('showComplaints in view controller running');
    res.render('buildings/building-complaints.ejs', {
      message: "Here are the building complaints: ",
      data: res.locals.complaints
    });
  }

};