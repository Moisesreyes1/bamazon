//Require NPM packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//  Create sql connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon_db"
});

//Connect mysql server and sql database
connection.connect(function(err) {
	if (err) throw err;
	start();
});

//Function to select data from mysql
function start() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		// console.log(res);
		runSearch();
	});
}

//Function to prompt user about products
function runSearch() {
	inquirer.prompt({
		type: "list",
		name: "choice",
		message: "Please select product category",
		choices: [
		"Electronics",
		"Entertainment",
		"Luggage",
		"Kitchen"
		]
	})
	.then(function(answer) {
		switch (answer.choice) {
			case "Electronics":
			departmentSearch("electronics");
			break;

			case "Entertainment":
			departmentSearch("entertainment");
			break;

			case "Luggage":
			departmentSearch("luggage");
			break;

			case "Kitchen":
			departmentSearch("kitchen");
			break;
		}
	});
}

//Function to search for luggage
function departmentSearch(department) {
	inquirer.prompt({
		type: "confirm",
		name: "department",
		message: "Are you sure?"
	})
	.then(function(answer) {
		// var query = "SELECT luggage FROM bamazon WHERE ?";
		if (answer) {
		connection.query("SELECT * FROM products WHERE department_name=?", [department], function(err, res) {
			for (var i = 0; i < res.length; i++) {
				console.log("\n------------------------------------------------------------");
				console.log("\nItem_id#: " + res[i].item_id + " || " + res[i].product_name + " || Price: " + res[i].price);
				console.log("\n------------------------------------------------------------");
			}
			itemSelect(res[0].item_id, res[0].product_name, res[0].stock_quantity, res[0].price);
		});
	}
	else {
		runSearch();
	}
	});
}


//Function to select electronic item
function itemSelect() {
	inquirer.prompt({
		type: "input",
		name: "item_id",
		message: "Please type item_id#",
		validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	})
	.then(function(answer) {
		var query = "SELECT * FROM products WHERE ?";
		connection.query(query, { item_id: answer.item_id}, function(err, res) {
				// console.log(res);
				for (var i = 0; i < res.length; i++) {
					console.log("Item_id# " + res[i].item_id + " || " + res[i].product_name + " || Stock quantity: " + res[i].stock_quantity + " || Price: " + res[i].price);
				}
				itemBuy(res[0].item_id, res[0].stock_quantity, res[0].price);
			});
		});
}

//Function to buy item
function itemBuy(itemId,stockQuantity,price) {
	inquirer.prompt({
		type: "input",
		name: "quantity",
		message: "How many would you like to purchase?",
		validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	})
	.then(function(answer) {
		var tempQuant = stockQuantity - answer.quantity;
		var total =   price * answer.quantity;
		var query = "UPDATE products SET stock_quantity =? WHERE item_id =?";
		connection.query(query, [tempQuant, itemId], function(err, res) {
			if (tempQuant > 0) {
			console.log("\n------------------------------------------------------------");
			console.log("\nYour total is ($): " + total);
			console.log("Thank you for your purchase!");
			console.log("Stock left: " + tempQuant);
			console.log("\n------------------------------------------------------------");
			}
			else {
				console.log("\n------------------------------------------------------------");
				console.log("\nSorry, product out of stock\n");
				console.log("\n------------------------------------------------------------");
			}
			runSearch();
		})
	})
}



