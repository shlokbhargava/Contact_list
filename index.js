const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

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
    
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching the contacts from the database');
            return;
        }

        return response.render('home', {
            title: "Contact List",
            contact_list: contacts
        });
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

    // contactList.push(request.body);
    
    // return response.redirect('back');

    Contact.create({
        name: request.body.name,
        phone: request.body.phone
    }, function(err, newContact){
        if(err){
            console.log('there is an error in creating Contact');
            return;
        }

        console.log('*********', newContact);
        return response.redirect('back');
    });
});

// For Deleting a Contact
app.get('/delete-contact', function(request, response){
    // let phone = request.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // DATABASE--

    // get the id from query in the ul 
    let id = request.query.id;

    // find the contact in the database and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from the database');
            return;
        }
        return response.redirect('back');
    });
    
});


app.listen(port, function(err){
    if(err){
        console.log('there is an error in running the server', err);
    }

    console.log('the server is running on port:', port);
});