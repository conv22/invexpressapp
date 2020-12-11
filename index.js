const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const categoryRouter = require('./routes/category');
const itemRouter = require('./routes/item')
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.redirect('/categories'));
app.use('/uploads', express.static('uploads'))
app.use('/categories', categoryRouter);
app.use('/items', itemRouter);

async function start () {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => console.log('The server is running on your local host'));
    }
    catch (err) {
        console.log(err);
    };
};

start();
