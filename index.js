const path = require('path');
const express = require('express');
const {v4:uuid} = require('uuid');
const methodOverride = require('method-override');

const app = express();

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
//To parse incoming JSON in POST request body:
app.use(express.json());
//To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'));
//View folder and EJS Setup
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


//CRUD - Create, Read, Update, Delete

//Fake database
let comments = [
    {
        id: uuid(),
        username: 'Terror',
        comment: 'LOLOLOLOL!'
    },
    {
        id: uuid(),
        username: 'Tyler',
        comment: 'I like to eat a lot!'
    },
    {
        id: uuid(),
        username: 'sk8erb0i',
        comment: 'Plz delete your account, Terror!'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
];

//INDEX - render multiple comments
app.get('/comments', (req, res) => {
    // console.log(comments);
    res.render('index', { comments });
});

//NEW - render a form
app.get('/comments/new', (req, res) => {
    res.render('new');
});

//CREATE - creates a new comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ 
        id: uuid(),
        username,
        comment
    });
    res.redirect('/comments');
});


//SHOW - details about one particular comment
app.get('/comments/:id', (req,res) =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('show', { comment });
});

//EDIT - renders a form to edit a comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('edit', { comment });
});

//UPDATE - updates a particular comment
app.patch('/comments/:id', (req,res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);

    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body
    foundComment.comment = newCommentText;
    //redirect to wherever you want
    res.redirect(`/comments/${id}`);
});

//DELETE - removes a single comment
app.delete('/comments/:id', (req,res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});



app.get('/tacos', (req,res) => {
    res.send("GET / response");
});

app.post('/tacos', (req, res) => {
    console.log(req.body);
});

app.listen(3000, () => console.log('Server started on port 3000'));