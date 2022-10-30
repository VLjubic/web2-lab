// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const { sign } = require("jsonwebtoken");
// const { validateToken } = require("../middleware/ValidateToken");
// let models = require("../database/models/index");
// const User = models.User;
// const Game = models.Game;
// router.post("/user/login", async function (req: any, res: any, next: any) {
//   const { username, password } = req.body;
//   res.send({ username, password });
// });
// router.get("/games", async function (req: any, res: any, next: any) {
//   Game.findAll()
//     .then((games: any) => {
//       res.send(games);
//     })
//     .catch((err: any) => console.log(err));
// });
// module.exports = router;
