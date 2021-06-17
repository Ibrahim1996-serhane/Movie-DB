const express = require('express');
const application = express();
const port = 3001;
application.use(express.json());
const d = new Date();
const t = "Time is " +d.getHours() + ":" + d.getMinutes();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

application.get('/', (req, resend) => {
    resend.send('Ok')
});
application.listen(port, () => {
    console.log("application at http://localhost:3001")
});

application.get("/test", (req, resend) => {
    resend.status(200).send({ status: 200, message: "ok" });
  });
application.get("/time", (req, resend) => {
    resend.status(200).send({ status: 200, message: t });
  });
application.get("/hello/:id", (req, resend) => {
    resend.send({ status: 200, message: "Hello," + req.params.id });
  });
application.get("/search/:id?", (req, resend) => {
   const search = req.body.s; 
    if (search ==""){
      resend.send({
         status: 200,
         message: "ok",
         data: search 
        });
    } else {
      resend.send({
        status: 500,
        error: true,
        message: "you have to provide a search",
      });
    }
  });

application.post("/movies/add", (req, resend) => {   
  const t= req.body.title;
  const y = req.body.year;
  const r = req.body.rating;
  if(t == "" || y == "" || isNaN(y) || y.length != 4){
    resend.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
  }
  else {        

    if (t!="" && y!="" && r == ""){
      movies.push({ title : t , year :y, rating:4 } )
      resend.send({status:200, data:movies});
    }
    else {
      movies.push({title:t,year:y,rating:r})
      resend.send({status:200, data:movies});
    }
  }  
})
application.get("/movies/get", (req, resend) => {
   resend.send({status:200, data:movies});
});
application.put ("/movies/edit/:id", (req, resend) => {
  selectedId = req.params.id - 1;
  if(req.body.title == "" || typeof req.body.title === "undefined"){
      movies[selectedId] = {title: movies[selectedId].title,year: req.body.year,rating: req.body.rating,};
  } 
  else if(req.body.year == "" || typeof req.body.year === "undefined") {
      movies[selectedId] = {title: req.body.title,year: movies[selectedId].year,rating: req.body.rating,
      };
  } 
  else if(req.body.rating == "" || typeof req.body.rating === "undefined"){
      movies[selectedId] = {title: req.body.title,year: req.body.year,rating: movies[selectedId].rating,
      };
  }resend.status(200).send(movies);
})
application.delete ("/movies/delete/:id", (req, resend) => {  
  if (movies[req.params.id-1]) {
    movies.splice(req.params.id, 1);
    resend.send({ status: 200, data: movies });
  }
  else {
    resend.status(404);
    resend.send({ status: 404, error: true, message: 'the movie ' + req.params.id + ' does not exist' })
  }
     
})
application.get('/movies/get/by-date', (req, resend) => {
 resend.send({status:200, data:movies.sort((a,b) => (a.year < b.year)? 1 : -1)});
});
application.get('/movies/get/by-rate', (req, resend) => {
resend.send({status:200, data:movies.sort((a,b) => (a.rating < b.rating)? 1 : -1)});
});
application.get('/movies/get/by-title', (req, resend) => {
resend.send({status:200, data:movies.sort((a,b) => (a.title > b.title)? 1 : -1)});
});
application.get("/movies/get/id/:id", (req, resend) => {
    if (req.params.id > movies.length){
        resend.status(404);
        resend.send({status:404, error:true, message:'the movie <ID> does not exist'});
    }else{
        resend.send({status:200, data:movies[req.params.id-1]});
    }
})

