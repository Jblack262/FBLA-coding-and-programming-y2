const express = require('express');
const app = express();
const path = require('path');

// app.use(express.static('./public'))

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "views")));


//navigation routing
app.use('/', require('./routes/navigation'))

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})