const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/db');
const path = require('path');
const multer = require('multer');
const cloudinaryConfig = require('./config/cloudinary');
require('dotenv').config()

//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//Cors
app.use(cors())

//Base de datos
dbConnection();

//...........Settings.............

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Express

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

//...........Settings.............

//Middlewares
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
});
app.use(multer({storage}).array('images'));
cloudinaryConfig();

//Routes
app.use('/api', require('./routes/telas'));
app.use('/admin', require('./routes/admin'));
app.use('/upload', require('./routes/cloudinary'));

//Server
const server = app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`);
});

//Error
server.on('error', error => console.log(`Error en el servidor ${error}`));