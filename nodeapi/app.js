const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose.connect(
    process.env.MONGO_URL, 
    { useNewUrlParser: true }
)
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err.message}`)
});

// import routes
const postRouters = require('./routes/post');
const authRouters = require('./routes/auth');
const userRouters = require('./routes/user');
// apiDocs
app.get('/', (req, res) => {
    fs.readFile("docs/apiDocs.json", (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRouters);
app.use("/", authRouters);
app.use("/", userRouters);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!'});
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => { 
    console.log(`A Note Js API is listening on port: ${port}`) 
});