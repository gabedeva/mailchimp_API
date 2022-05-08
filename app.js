const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Make sure fields are filled
    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    // Construct request data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    // convert the data to JSON
    const postData = JSON.stringify(data);

    const options = {
        url: '',
        method: 'POST',
        headers: {
            Authorization: ''
        },
        body: postData
    }

    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail.html')
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html');
            } else {
                res.redirect('/fail.html');
            }
        }
    });
});

app.post('/unsubscribe', (req, res) => {
    const { email } = req.body;

    // Make sure fields are filled
    if ( !email) {
        res.redirect('/fail.html');
        return;
    }

    // Construct request data
    const data = {
        members: [
            {
                email_address: email,
                status: 'unsubscribed',
                // merge_fields: {
                //     FNAME: firstName,
                //     LNAME: lastName
                // }
            }
        ]
    }

    // convert the data to JSON
    const postData = JSON.stringify(data);

    const options = {
        url: '',
        method: 'POST',
        headers: {
            Authorization: ''
        },
        body: postData
    }

    request(options, (err, response, body) => {
        if (err) {
            console.log(err);
            res.redirect('/fail.html')
        } else {
            if (response.statusCode === 200) {
                res.redirect('/unsub.html');
            } else {
                res.redirect('/fail.html');
            }
        }
    });
})

const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`Server started on ${PORT}`));