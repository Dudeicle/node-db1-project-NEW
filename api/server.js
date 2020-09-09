const express = require("express");

const AccountsRouter = require("../routers/accountsRouter");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

// server.get("/api/accounts", (req, res) => {
// 	db("accounts")
// 		.then((accounts) => {
// 			res.status(200).json({ data: accounts });
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			res.status(500).json({ error: error.message });
// 		});
// });

server.get("/", (req, res) => {
	res.status(200).json({ api: "up" });
});

module.exports = server;
