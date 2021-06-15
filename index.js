const express = require('express');
const application = express();
const port = 3001;
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
   const search = req.query.s;
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

application.get("/movies/add", (req, resend) => {     
})
application.get("/movies/get", (req, resend) => {
   resend.send({status:200, data:movies});
});
application.get("/movies/edit", (req, resend) => {     
})
application.get("/movies/delete", (req, resend) => {     
})
