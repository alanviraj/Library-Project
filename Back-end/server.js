require('dotenv').config({path: "./config.env"});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error_handler');
const ConnectDB = require('./database/db');

//Database connection
ConnectDB();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use('/resumes', express.static('resumes'));

//Routes - Viraj
const author_routes = require('./routes/author_route');
const book_routes = require('./routes/book_route');

//Routes middleware - Viraj
app.use(author_routes);
app.use(book_routes);

//Error Handler(After all middleware routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
// Dhananjaya merge commit

//Viraj Merge Commit
