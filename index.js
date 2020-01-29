let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let morgan = require('morgan');
let { DATABASE_URL, PORT } = require( './config' );

let { bookmarkList } = require('./model');

let app = express();

let server;
app.use(morgan('dev'));
app.use(express.static('public'));

app.put('/api/bookmarks/:id', jsonParser, (req, res) => {

	let idV = { id : req.params.id};

	let idN = req.body.id;

	console.log(idV);
	console.log(idN);

	
	bookmarkList.update(idV,idN)
		.then( url => {

			return res.status(201).json(url);
		})
		.catch(error => {

			res.statusMessage = "Error en conexcion con la base de datos";
			return res.status(500).json(error);
		})

});

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}