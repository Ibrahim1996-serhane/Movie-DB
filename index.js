const express = require('express')
const application = express()
const port = 3001
application.get('/', (req, resend) => {
    resend.send('Ok')
})
application.listen(port, () => {
    console.log("application at http://localhost:3001")
})
