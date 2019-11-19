CREATE TABLE IF NOT EXISTS closet (
 closet_id INT NOT NULL PRIMARY KEY,
 item_id INT NOT NULL
 user_id INT NOT NULL FOREIGN KEY
);

CREATE TABLE IF NOT EXISTS user_table (
	user_id INT NOT NULL PRIMARY KEY,
	last_name VARCHAR(40) NOT NULL,
	first_name VARCHAR(40) NOT NULL,
	user_name VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL,
	email VARCHAR(40) NOT NULL,
	closet_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS washing_instructions (
	wash_id INT NOT NULL,
	item_id INT NOT NULL,
	wash_type VARCHAR(40) NOT NULL,
	wash_temp VARCHAR(40),
	wash_cycle VARCHAR(40),
	drying_type VARCHAR(40),
	drying_temp VARCHAR(40),
	bleach VARCHAR(40),
	iron VARCHAR(40),
	PRIMARY KEY (wash_id, item_id)
);

CREATE TABLE IF NOT EXISTS item (
	item_id INT NOT NULL PRIMARY KEY,
	brand VARCHAR(40) NOT NULL,
	color VARCHAR(40) NOT NULL,
	type VARCHAR(40) NOT NULL,
	image VARCHAR(40) NOT NULL,
	description VARCHAR(200) NOT NULL,
	materials VARCHAR(40) NOT NULL
);
