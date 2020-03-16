const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: "Shlok",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "00000000000"
    },
    {
        name: "Coding Ninjas",
        phone: "38258887894"
    },
]

app.get('/', function(request, response){
    
    return response.render('home', {
        title: "Contact List",
        contact_list: contactList
    });
});

app.get('/practice', function(request, response){

    return response.render('practice', {
        title: "Practice",
    });
});

app.post('/create-contact', function(request, response){
    // return response.send('Contact added successfully');
    // console.log(request.body);
    // contactList.push({
    //     name: request.body.name,
    //     phone: request.body.phone
    // });

    // return response.redirect('/');

    contactList.push(request.body);
    
    return response.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log('there is an error in running the server', err);
    }

    console.log('the server is running on port:', port);
});