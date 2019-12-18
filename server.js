const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var nodemailer = require('nodemailer');
var cors = require('cors');
var bodyParser = require('body-parser');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'no-reply@ams.queensu.ca',
        pass: 'Welcome2!'
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/send', (req, res, next) => {
    var email = req.body.email;
    var message = req.body.message;

    var mailOptions = {
        from: 'no-reply@ams.queensu.ca', // sender address
        to: email, // list of receivers (usually $email)
        subject: 'AMS Service Quiz Results', // Subject line
        html: message // plaintext body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.json({
                msg: 'fail'
            })
        }
        else {
            console.log('Email sent: ' + info.response);
            res.json({
                msg: 'success'
            })
        }
    });
});


