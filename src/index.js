const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.set('view engine','ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://goblin797:Monkey721@cluster0.skwvd.mongodb.net/kaushik1234?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.get('/functionup/colleges', function(req,res){ //enter localhost:3000/functionup/colleges in crome browser
    res.render('collegeRes.ejs')
})

app.get('/functionup/interns', function(req,res){
    res.render('internRes.ejs')
})

app.get('/functionup/getdetails', function(req,res){
    res.render('getdetails.ejs')
})

app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});