//Install express server
const express = require('express');
const path = require('path');
var helmet = require('helmet');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));
app.use(helmet());
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
