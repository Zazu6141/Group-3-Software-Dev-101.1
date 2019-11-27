//load components

var express = require('express');
var app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pug = require('pug');


//login to server
//var connection = mysql.createConnection('mysql://be627f988962c9:a66b1e98@us-cdbr-iron-east-05.cleardb.net/heroku_4d509a908d16f19?reconnect=true?multipleStatements=true');
var connection = mysql.createConnection({
	host: 'us-cdbr-iron-east-05.cleardb.net',
	user: 'be627f988962c9',
	password: 'a66b1e98',
	database: 'heroku_4d509a908d16f19',
	multipleStatements: true
});
db = connection.connect();

//set view engine to ejs
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/'));

//load add clothes page
app.get('/add_clothes', function(req, res) {
	
	res.render('additem');
});

//insert data into item table on submit
app.post('/add_clothes', function(req, res) {
	var article = req.body.article; //article of clothing selection
	var season = req.body.season; //season selection
	var brand = req.body.brand; //brand text
	var color = req.body.color; //color text
	var description = req.body.description; //description text
	var materials = req.body.materials; //materials text
	
	//insert query
	var insert_item = "INSERT INTO item(item_id, brand, color, type, image, description, materials) VALUES (DEFAULT, '" + brand + "', '" + color + "', '" + article + "', '" + season + "', '" + description + "', '" + materials + "');";

	//execute query
	connection.query(insert_item);
	res.redirect('add_washing_instructions');

});

//load add washing instructions page
app.get('/add_washing_instructions', function(req, res) {
	res.render('add_washing_instructions');
});

//insert data into washing_instructions on submit
app.post('/add_washing_instructions', function(req, res) {
	var wash_type = req.body.wash_type; //wash type selection
	var wash_temp = req.body.wash_temp; //wash temperature selection
	var wash_cycle = req.body.wash_cycle; //wash cycle selection
	var drying_type = req.body.drying_type; //drying type selection
	var drying_temp = req.body.drying_temp; // drying temperature selection
	var bleach = req.body.bleach; // bleach selection
	var iron = req.body.iron; //iron selection

	var get_item_id = "SELECT * FROM item ORDER BY item_id DESC LIMIT 1;"; //query to get most recent item_id which is necessary for washing_instructions primary key
	//execute query to get item_id
	connection.query(get_item_id, (err, result) => {
		//query to insert data into washing_instructions, includes results from get_item_id query
		var insert_wash = "INSERT INTO washing_instructions(wash_id, item_id, wash_type, wash_temp, wash_cycle, drying_type, drying_temp, bleach, iron) VALUES (DEFAULT, '" + result[0].item_id + "', '" + wash_type + "', '" + wash_temp + "', '" + wash_cycle + "', '" + drying_type + "', '" + drying_temp + "', '" + bleach + "', '" + iron + "');";
		//execute query to insert
		connection.query(insert_wash);
	});
	
	//redirect to view_closet on completion
	res.redirect('/view_closet');
})

//load view closet page
app.get('/view_closet', function(req, res) {
	//query to get all clothes form item table
	var get_clothes = "SELECT * FROM item;";

	//execute query
	connection.query(get_clothes, (err, result) => {
		//redirect to home page on error
		if (err) {
			res.redirect('/closet.html');
		}
		res.render('view_closet', {
			//pass query results through reslt array
			data: result
		})
	})


});

//passes user selection of worn clothes to item table, updates worn column only
app.post('/view_closet', function(req, res) {

	//gets all clothes checked off as worn
	var worn_selections = req.body.worn;

	//query to set all worn selections to true
	var worn_clothes = "UPDATE item SET worn = true WHERE ";
	var x;

	if (worn_selections != undefined) {
		//single selection not given in array form, needs to be converted to array
		if (!Array.isArray(worn_selections)) {
			worn_selections = [worn_selections];
		}
		//add where clauses with or
		for (x=0; x<worn_selections.length; x++) {
			if (x>0) {
				var where = " OR item_id = '" + worn_selections[x] + "'";
			}
			else {
				var where = "item_id = '" + worn_selections[x] + "'";
			}
			worn_clothes += where;
		}
		worn_clothes += ";";

		//only execute query if user has made at least one selection
		connection.query(worn_clothes);
	}

	//render page
	res.render('view_closet');

});

//load available_loads page
app.get('/available_loads', function(req, res) {
	//query to get all worn clothes
	var get_clothes = "SELECT * FROM item WHERE worn = true;";

	//execute query
	connection.query(get_clothes, (err, result) => {
		//redirect to home page on error
		if (err) {
			res.redirect('/closet.html');
		}

		res.render('available_loads', {
			//query results stored in result array
			data: result
		})
	})
});

//passes user selection of washed clothes to item table, updates worn column only
app.post('/available_loads', function(req, res) {
	//gets all washed selections
	var wash_selections = req.body.wash;

	//query to set all user selections as not worn
	var wash_clothes = "UPDATE item SET worn = false WHERE ";
	var i;

	if (wash_selections != undefined) {
		//single selection not given in array form, needs to be converted to array
		if (!Array.isArray(wash_selections)) {
			wash_selections = [wash_selections];
		}
		//add where clauses with or
		for (i=0; i<wash_selections.length; i++) {
			if (i>0) {
				var where = " OR item_id = '" + wash_selections[i] + "'";
			}
			else {
				var where = "item_id = '" + wash_selections[i] + "'";
			}
			wash_clothes += where;
		}
		wash_clothes += ";";

		//only execute query if user has made at least one selection
		connection.query(wash_clothes);
	}
	//render page
	res.render('available_loads');
});

//loads delete_clothes page
app.get('/delete_clothes', function(req, res) {
	//query to load all clothes
	var get_clothes = "SELECT * FROM item;";

	//execute query
	connection.query(get_clothes, (err, result) => {
		//redirect to home page on error
		if (err) {
			res.redirect('/closet.html');
		}

		//query results stored in result array
		res.render('delete_clothes', {
			data: result
		})
	})
});

//passes user selection of clothes to delete to item table, deletes selected rows from table
app.post('/delete_clothes', function(req, res) {
	//gets all selected items to delete
	var delete_selections = req.body.delete;

	//query to delete all user selected items
	var delete_clothes = "DELETE FROM item WHERE ";
	var i;

	if (delete_selections != undefined) {
		//single selection not given in array form, needs to be converted to array
		if (!Array.isArray(delete_selections)) {
			delete_selections = [delete_selections];
		}
		//add where clauses with or
		for (i=0; i<delete_selections.length; i++) {
			if (i>0) {
				var where = " OR item_id = '" + delete_selections[i] + "'";
			}
			else {
				var where = "item_id = '" + delete_selections[i] + "'";
			}
			delete_clothes += where;
			delete_clothes += " ";
		}
		delete_clothes += ";";

		//only execute query if user has made at least one selection
		connection.query(delete_clothes);
	}

	res.render('delete_clothes');


})


app.listen(3000);
console.log('3000 is the magic port');