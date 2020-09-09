const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
	db.select("*")
		.from("accounts")
		.then((accounts) => {
			res.status(200).json({ data: accounts });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: error.message });
		});
}); // WORKING

router.post("/", (req, res) => {
	const account = req.body;

	db("accounts")
		.insert(account)
		.returning("id") // do not exclude this line if you plan to support PostgreSQL
		.then((ids) => {
			// the warning: ".returning() is not supported by sqlite3 and will not have any effect."
			// can safely be ignored when using SQLite
			// it will go away when using PostgreSQL
			res.status(201).json({ inserted: ids });
		})
		.catch((error) => {
			console.log(error);

			res.status(500).json({ error: error.message });
		});
}); // WORKING

router.put("/:id", (req, res) => {
	const changes = req.body;
	const postId = req.params.id;

	// where id = id
	db("accounts")
		.where({ id: postId })
		// .where("id", "=", postId) // another way to write the where
		.update(changes)
		.then((count) => {
			if (count) {
				res.status(200).json({ message: "updated successfully" });
			} else {
				res.status(404).json({ message: "not found" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: error.message });
		});
}); // WORKING

router.delete("/:id", (req, res) => {
	const postId = req.params.id;

	// where id = id
	db("accounts")
		.where({ id: postId })
		// .where("id", "=", postId) // another way to write the where
		.del() // delete instead of update
		.then((count) => {
			if (count) {
				res.status(200).json({ message: "removed successfully" });
			} else {
				res.status(404).json({ message: "not found" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: error.message });
		});
}); // WORKING

module.exports = router;
