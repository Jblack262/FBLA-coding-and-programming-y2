const express = require('express');
const app = express();

//middleware
app.use(express.json())
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
require('./middleware/Passport.js')(passport)
// important packages
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: '16MB' }));
app.use(express.urlencoded({ extended: false }));


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/views"));


//navigation routing
app.use('/', require('./routes/index'))
app.use('/api/v1/user', require('./routes/loginRoutes.js'))

//other imported functions
const connectDB = require('./db/connect.js');

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) { console.log(error) }
}
start();