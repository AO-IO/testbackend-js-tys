const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const BlogRoutes = require('./routes/blog');
const Imagesoutes = require('./routes/images');
require('dotenv').config()
// console.log(dotenv);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(BlogRoutes)
app.use(Imagesoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});