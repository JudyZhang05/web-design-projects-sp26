// how do we know this is a npm project?
// A: Package-json files include node packages

// what command do we run to start an npm project?
// A: npm init -y

// how do we create the node_modules folder if it doesn't exist?
// A: npm i

// what does the below chunk of code do?
// A: import all libraries required
const express = require('express');
const multer = require('multer');
const nunjucks = require('nunjucks');
const nedb = require('@seald-io/nedb');

// what is app?
// A: creates our web server that uses express
const app = express();
// what is database?
// A: creates an external file that stores information in object format {}
// autoload ensures that the file loads when the server is run
const database = new nedb({ filename: 'data.db', autoload: true });

// what is this configuring?
// A: establishing where the image location will be stored
const upload = multer({
	dest: 'public/uploads',
});

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static('public')); // A: establishes that the front-end files will be in the public folder, it allows express to expose those files
app.use(express.urlencoded({ extended: true })); // A: able to access any time of file that is uploaded, allows us to use req.body and read all of the request data from the client
app.set('view engine', 'njk'); // A: sets express the ability to use and send njk data and file
nunjucks.configure('views', {
	autoescape: true,
	express: app,
}); // A: setting the views folder where our njk files are stored and links it to our app

// what type of request is this? what does it do?
// A: GET request, sets what happens when a particular route is hit
app.get('/', (request, response) => {
	// how many different responses can we write? list them.
	// A: Aproximately 5, res.render, res,send, res.redirect, res.json, res.sendFile
	// how many parameters does response.render use? list them.
	// A: optionally two, render file name and variable name of data you want to pass
	// write out the render for index.njk using the database
	database.find({}, (err, foundInDatabase) => {
		response.render('index.njk', {sendingToClient: foundInDatabase})})
});

// what are the three parameters in this function?
// A: route, upload.single, and (req, res) => {}
app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	// what type of data structure is this?
	// A: object
	let data = {
		dataCaption: req.body.text,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	// why do we write this if statement?
	// A: to check if the uploaded image file exists
	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}

	// what does the insert function do?
	// A: adds data to the database
	// js array syntax: array.push()
	database.insert(data);

	res.redirect('/');
});

// what does the number signify?
// A: it is your port number on where your page will be hosted on 
// how do we access this on the web?
// A: locally, http://localhost:6001 | http://127.0.0.1/6001
app.listen(6001, () => {
	console.log('server started on port 6001');
});

// continue answering the questions in the index.njk
