const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config()
const db = require("./config/mongoose")

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require("./routes")
app.use("/", indexRouter)

app.listen(3000);