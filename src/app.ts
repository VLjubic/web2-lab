import express from "express";
import path from "path";
var cookieParser = require("cookie-parser");
import https from "https";
import fs from "fs";
import { auth, requiresAuth } from "express-openid-connect";

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4010;

const config = {
  authRequired: false,
  idpLogout: true,
  secret: process.env.SECRET,
  baseURL: externalUrl || `https://localhost:${port}`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationParams: {
    response_type: "code",
  },
};

var models = require("./database/models/index");
const User = models.User;
const Game = models.Game;
const Comment = models.Comment;
const Table = models.Table;

models.sequelize
  .authenticate()
  .then(() => console.log("Databsae connected"))
  .catch((err: any) => console.log("Error: ", err));

models.sequelize.sync().then(() => console.log("Database sync"));

const app = express();
app.use(auth(config));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const isAdmin = function (userInfo: any) {
  return userInfo?.email == "admin@web2lab.com";
};

app.get("/", async function (req, res) {
  let username: string | undefined;
  if (req.oidc.isAuthenticated()) {
    username = req.oidc.user?.name ?? req.oidc.user?.sub;
  }
  res.render("index", { username });
});

app.get("/table", function (req, res) {
  let username: string | undefined;
  if (req.oidc.isAuthenticated()) {
    username = req.oidc.user?.name ?? req.oidc.user?.sub;
  }
  Table.findAll({
    attributes: ["clubName", "points", "difference"],
    order: [
      ["points", "DESC"],
      ["difference", "DESC"],
    ],
  })
    .then((table: any) => {
      res.render("table", {
        table: JSON.parse(JSON.stringify(table)),
        username,
      });
    })
    .catch((err: any) => console.log(err));
});

app.get("/games", async function (req, res) {
  let username: string | undefined | false;
  let userInfo: any, admin: boolean;
  if (req.oidc.isAuthenticated()) {
    username = req.oidc.user?.name ?? req.oidc.user?.sub;
    userInfo = await req.oidc.fetchUserInfo();
    admin = isAdmin(userInfo);
  } else {
    username = false;
    admin = false;
  }
  Game.findAll({
    attributes: [
      "id",
      "round",
      "homeTeam",
      "awayTeam",
      "homeResult",
      "awayResult",
    ],
    order: [["id", "ASC"]],
  })
    .then((games: any) => {
      res.render("games", {
        games: JSON.parse(JSON.stringify(games)),
        username,
        admin: admin,
      });
    })
    .catch((err: any) => console.log(err));
});

app.post("/getComments", requiresAuth(), async function (req, res) {
  let { gameId } = req.body;
  let userInfo: any, admin: boolean, email: string;
  userInfo = await req.oidc.fetchUserInfo();
  admin = isAdmin(userInfo);
  email = userInfo.email;
  Comment.findAll({
    attributes: ["id", "gameId", "text", "userId", "createdAt", "updatedAt"],
    where: {
      gameId: gameId,
    },
  })
    .then((comments: any) => {
      User.findAll({})
        .then((users: any) => {
          res.render("comments", {
            comments: JSON.parse(JSON.stringify(comments)),
            username: req.oidc.user?.name,
            users: JSON.parse(JSON.stringify(users)),
            admin: admin,
            email: email,
          });
        })
        .catch((err: any) => console.log(err));
    })
    .catch((err: any) => console.log(err));
});

app.post("/games/deleteComments", requiresAuth(), function (req, res) {
  let { commentId } = req.body;
  Comment.destroy({ where: { id: commentId } })
    .then((comment: any) => {
      Game.findAll({
        attributes: [
          "id",
          "round",
          "homeTeam",
          "awayTeam",
          "homeResult",
          "awayResult",
        ],
      })
        .then((games: any) => {
          res.status(200);
          res.render("alter");
        })
        .catch((err: any) => console.log(err));
    })
    .catch((err: any) => console.log(err));
});

app.post("/games/editComment", requiresAuth(), async function (req, res) {
  let { commentId, text } = req.body;
  let userInfo: any, admin: boolean;
  userInfo = await req.oidc.fetchUserInfo();
  admin = isAdmin(userInfo);
  Comment.update(
    {
      text,
    },
    { where: { id: commentId } }
  )
    .then((comment: any) => {
      Game.findAll({
        attributes: [
          "id",
          "round",
          "homeTeam",
          "awayTeam",
          "homeResult",
          "awayResult",
        ],
      })
        .then((games: any) => {
          res.status(200);
          res.render("games", {
            games: JSON.parse(JSON.stringify(games)),
            username: req.oidc.user?.name,
            admin: admin,
          });
        })
        .catch((err: any) => console.log(err));
    })
    .catch((err: any) => console.log(err));
});

app.post("/games/editScore", requiresAuth(), async function (req, res) {
  let { homeResult, awayResult, gameId } = req.body;
  let userInfo: any, admin: boolean;
  userInfo = await req.oidc.fetchUserInfo();
  admin = isAdmin(userInfo);
  Game.update(
    {
      homeResult,
      awayResult,
      completed: true,
    },
    { where: { id: gameId } }
  )
    .then((game: any) => {
      Game.findAll({
        attributes: [
          "id",
          "round",
          "homeTeam",
          "awayTeam",
          "homeResult",
          "awayResult",
        ],
        order: [["id", "ASC"]],
      })
        .then((games: any) => {
          res.status(200);
          res.render("games", {
            games: JSON.parse(JSON.stringify(games)),
            username: req.oidc.user?.name,
            admin: admin,
          });
        })
        .catch((err: any) => console.log(err));
    })
    .catch((err: any) => console.log(err));
});

app.post("/games/addComment", async function (req, res) {
  let userInfo: any, admin: boolean;
  userInfo = await req.oidc.fetchUserInfo();
  admin = isAdmin(userInfo);
  let { gameId, text } = req.body;
  let userId = userInfo.email;
  Comment.create({
    gameId: gameId,
    text: text,
    userId: userId,
  })
    .then((comment: any) => {
      Game.findAll({
        attributes: [
          "id",
          "round",
          "homeTeam",
          "awayTeam",
          "homeResult",
          "awayResult",
        ],
      })
        .then((games: any) => {
          res.status(200);
          res.render("games", {
            games: JSON.parse(JSON.stringify(games)),
            username: req.oidc.user?.name,
            admin: admin,
          });
        })
        .catch((err: any) => console.log(err));
    })
    .catch((err: any) => console.log(err));
});

if (externalUrl) {
  const hostname = "127.0.0.1";
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  });
} else {
  https
    .createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
      },
      app
    )
    .listen(port, function () {
      console.log(`Server running at https://localhost:${port}/`);
    });
}

module.exports = app;
