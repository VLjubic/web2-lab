// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const { sign } = require("jsonwebtoken");
// const { validateToken } = require("../middleware/ValidateToken");
// let models = require("../database/models/index");
// const User = models.User;
// // /* register new user */
// // router.post("/register", function (req, res, next) {
// //   const { firstName, lastName, email, username, password } = req.body;
// //   bcrypt.hash(password, 10).then((hashed) => {
// //     User.create({
// //       firstName,
// //       lastName,
// //       email,
// //       username,
// //       password: hashed,
// //       role: "USER",
// //     })
// //       .then((user) => {
// //         const accessToken = sign(
// //           {
// //             userId: user.id,
// //             username: user.username,
// //             firstName: user.firstName,
// //             lastName: user.lastName,
// //             email: user.email,
// //             role: user.role,
// //           },
// //           "secret"
// //         );
// //         res.json({ accessToken: accessToken, user });
// //       })
// //       .catch((err) => {
// //         res.status(500).json({ status: 500, message: "Server error" });
// //       });
// //   });
// // });
// router.post("/", async function (req: any, res: any, next: any) {
//   const { username, password } = req.body;
//   res.redirect("/");
// });
// // router.post("/login", async function (req: any, res: any, next: any) {
// //   const { username, password } = req.body;
// //   const user = await User.findOne({ where: { username: username } }).catch(
// //     (err: any) => res.status(500).json({ status: 500, message: "Server error" })
// //   );
// //   if (user === null) {
// //     res
// //       .status(400)
// //       .json({ status: 400, message: "Pogrešni podaci za prijavu" });
// //   } else {
// //     bcrypt
// //       .compare(password, user.password)
// //       .then((result: any) => {
// //         if (!result) {
// //           res
// //             .status(400)
// //             .json({ status: 400, message: "Pogrešni podaci za prijavu" });
// //         } else {
// //           const accessToken = sign(
// //             {
// //               userId: user.id,
// //               username: user.username,
// //               firstName: user.firstName,
// //               lastName: user.lastName,
// //               role: user.role,
// //               email: user.email,
// //             },
// //             "secret"
// //           );
// //           res.json({ accessToken: accessToken, user });
// //         }
// //       })
// //       .catch((err: any) => res.status(500).json({ status: 500, message: err }));
// //   }
// // });
// // router.put("/edit/:id", validateToken, function (req, res, next) {
// //   let { firstName, lastName, email } = req.body;
// //   let userId = req.params.id;
// //   let password;
// //   if (req.body.password !== "") {
// //     password = req.body.password;
// //     bcrypt.hash(password, 10).then((hashed) => {
// //       User.update(
// //         {
// //           firstName,
// //           lastName,
// //           password: hashed,
// //           email,
// //         },
// //         {
// //           where: {
// //             id: userId,
// //           },
// //         }
// //       )
// //         .then(() => {
// //           res.json({ id: userId });
// //         })
// //         .catch((err) =>
// //           res.status(500).json({ status: 500, message: "Server error" })
// //         );
// //     });
// //   } else {
// //     User.update(
// //       {
// //         firstName,
// //         lastName,
// //         email,
// //       },
// //       {
// //         where: {
// //           id: userId,
// //         },
// //       }
// //     )
// //       .then(() => {
// //         res.json({ id: userId });
// //       })
// //       .catch((err) =>
// //         res.status(500).json({ status: 500, message: "Server error" })
// //       );
// //   }
// // });
// // router.get("/auth", validateToken, function (req, res, next) {
// //   res.json(req.data);
// // });
// module.exports = router;
