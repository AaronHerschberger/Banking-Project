const express = require('express');
const app = express();
const fs = require('fs');
const servicesRoutes = require('./routes/services');
const accountRoutes = require('./routes/accounts');
const path = require('path');
const {accounts, users, writeJSON} = require('./data');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({entended: true}));

app.get('/', (req,res) => res.render('index', {title:'Account Summary', accounts }));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);


app.get('/profile', (req,res)=>{
  res.render('profile', { user: users[0] });
});

app.listen(4000, () => console.log('AH Project running on port 4000!'));
