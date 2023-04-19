const express = require('express');

let app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('/public', __dirname + '/public');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.set('port', process.env.PORT || 7200);  

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}.`);
});