

let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let bookmarkCollection = mongoose.Schema({

		id : uuid.v4(),
		titulo : { type : String},
		descripcion : { type : String},
		url : { type : String}
});

let valorB = mongoose.model('bookmark', bookmarkCollection);

let bookmarkList = {

	update : function(idV, idN){

		return valorB.update(idV,idN)
			then( valorB =>{

				return valorB;
			})
			.catch(error => {
				throw Error(error);
			});
	}
}

module.exports = {

	bookmarkList
    
};
