const express = require('express');
const application = express();
const port = 3001;
const d = new Date();
const t = "Time is " +d.getHours() + ":" + d.getMinutes();

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