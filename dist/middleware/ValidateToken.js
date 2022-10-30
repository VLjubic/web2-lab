// const { verify } = require("jsonwebtoken");
// const validateToken = (req, res, next) => {
//   const accessToken = req.header("accessToken");
//   if (!accessToken) {
//     return res.json({ error: "Not logged in" });
//   }
//   try {
//     const validToken = verify(accessToken, "secret");
//     if (validToken) {
//       let data = { accessToken: accessToken, user: validToken };
//       req.data = data;
//       return next();
//     }
//   } catch (err) {
//     return res.json({ error: err });
//   }
// };
// module.exports = { validateToken };
