var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('./src/resources')); // using static file 
var bodyParser = require('body-parser'); // for recieve post request
app.use(bodyParser.urlencoded({ extended: false }));
var port = 4321
app.listen(port,()=>{
    console.log('Connected to port: '+port);
})

app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/main', (req,res)=>{
    res.render('main')
})

app.post('/signup', (req,res)=>{
    res.render('main')
})

app.get('/findpw', (req,res)=>{
    res.render('findpw')
})