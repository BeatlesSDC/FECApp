//================================================================================================================
// SERVER SETUP
//================================================================================================================
const path = require("path")
const express = require("express"); // npm installed
const axios = require('axios');
const config = require('../config.js');
const multer = require('multer');
const FormData = require('form-data');
const fs = require("fs");
const compression = require('compression');
const app = express();
const upload = multer();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "../client/dist")));
//================================================================================================================
// SERVER ROUTES
//================================================================================================================
app.use(async (req, res, next) => {
  if (req.url !== '/uploadphoto') {
    try {
      if (req.url.includes('/qa/')) {
        //connect to my API
        console.log('qa request: ', req.url);
        console.log('req params: ', req.params);
        let response = await axios({
          baseURL: 'http://localhost:3001/',
          method: req.method,
          url: req.url,
          data: req.body,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        res.send(response.data);
      } else {
        let response = await axios({
          baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/',
          method: req.method,
          url: req.url,
          data: req.body ?? {},
          headers: {
            'Authorization': config.TOKEN, //this is what will be imported from config file
            'Content-Type': 'application/json'
          }
        });
        res.send(response.data.body);
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    next();
  }
});

app.post('/uploadphoto', upload.any(), (req, res) => {
  const { headers, files } = req;
  const { buffer, originalname: filename } = files[0];
  const formData = new FormData();
  formData.append('image', buffer, {filename: filename});
  console.log(formData);
  axios.create({
    headers: formData.getHeaders()
  }).post(`https://api.imgbb.com/1/upload?key=${config.imgBBToken}`, formData)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});


//================================================================================================================
// SERVER LISTENING
//================================================================================================================
const port = 3000;
app.listen(port, () => {
  console.log(`To get started, visit: http://localhost:${port}`);
});