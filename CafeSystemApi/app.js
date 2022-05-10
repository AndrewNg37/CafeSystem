var cafeRouter = require('./routes/cafe');
var employeeRouter = require('./routes/employee');
var cors = require('cors');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(cors());
app.use("/uploads", express.static('uploads'));
// app.use(express.json());
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/api', cafeRouter);
app.use('/api', employeeRouter);

app.listen(port);