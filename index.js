const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

//connext to mongodb
mongoose.connect('mongodb://localhost/ninjago', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({error:err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests');
});
