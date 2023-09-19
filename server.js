const express = require('express');
const app = express();
const PORT = 3000;

//Set ejs as template engine
app.set('view engine', 'ejs');

//Specify the views directory
app.set('views', './views');

//Starting server
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

//Home page route
app.get('/', (req, res) => {
    res.render('home')
});

//Our Services page route
app.get('/services', (req, res) => {
    res.render('services');
});

//Contact Us page route
app.get('/contact', (req, res) =>{
    res.render('contact')
});

//Custom middleware to verify working hours
app.use((req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();//Sun=0,Mon=1,....Sat=6
    const hour = now.getHours();

    const isWorkingHours = dayOfWeek >= 1 && dayOfWeek <=5 && hour>=9 && hour < 17

    if (isWorkingHours) {
        return res.send('Web app is only available durinhg work hours (Monday to Friday from 9 to 17).');
    }

    next();
});