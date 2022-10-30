"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var $ = require("jquery");
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var port = 4010;
var express_openid_connect_1 = require("express-openid-connect");
var config = {
    authRequired: false,
    idpLogout: true,
    secret: "P1KRKMlX_6rJZmXyAsd6WJ0HC2qrN6zuGjhgEUky__E3_l5iLQkiYDsBNPVo2QD9",
    baseURL: "https://localhost:".concat(port),
    clientID: "c1ZHKEPbNm9biPCL62VICwFsCeH3TAD8",
    issuerBaseURL: "https://dev-asumx65k8xpoazea.eu.auth0.com",
    clientSecret: "P1KRKMlX_6rJZmXyAsd6WJ0HC2qrN6zuGjhgEUky__E3_l5iLQkiYDsBNPVo2QD9",
    //clientSecret: process.env.CLIENT_SECRET,
    authorizationParams: {
        response_type: "code"
    }
};
var router = express_1["default"].Router();
// const bcrypt = require("bcrypt");
// const { sign } = require("jsonwebtoken");
// const { validateToken } = require("../middleware/ValidateToken");
var models = require("./database/models/index");
var script = require("./middleware/script");
var User = models.User;
var Game = models.Game;
var Comment = models.Comment;
var Table = models.Table;
models.sequelize
    .authenticate()
    .then(function () { return console.log("Databsae connected"); })["catch"](function (err) { return console.log("Error: ", err); });
models.sequelize.sync().then(function () { return console.log("Database sync"); });
var app = (0, express_1["default"])();
// app.use(auth.setUserInfo);
app.use((0, express_openid_connect_1.auth)(config));
app.set("views", path_1["default"].join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express_1["default"].json());
app.use(cookieParser());
app.use(express_1["default"].static(path_1["default"].join(__dirname, "public")));
app.use(express_1["default"].urlencoded({ extended: true }));
var reqRouter = require("./routes/req");
var authServer = "https://dev-asumx65k8xpoazea.eu.auth0.com";
var isAdmin = function (userInfo) {
    return (userInfo === null || userInfo === void 0 ? void 0 : userInfo.email) == "vlaho.ljubic@fer.hrr";
};
app.get("/", function (req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var username, userInfo;
        return __generator(this, function (_d) {
            if (req.oidc.isAuthenticated()) {
                username = (_b = (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.sub;
            }
            res.render("index", { username: username });
            return [2 /*return*/];
        });
    });
});
app.get("/sign-up", function (req, res) {
    res.oidc.login({
        returnTo: "/",
        authorizationParams: {
            screen_hint: "signup"
        }
    });
});
app.get("/private", (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    var user = req.oidc.user;
    res.render("private", { user: user });
});
app.get("/table", function (req, res) {
    Table.findAll({
        attributes: ["clubName", "points", "difference"],
        order: [
            ["points", "DESC"],
            ["difference", "DESC"],
        ]
    })
        .then(function (table) {
        res.render("table", {
            table: JSON.parse(JSON.stringify(table)),
            user: true
        });
    })["catch"](function (err) { return console.log(err); });
});
// app.get("/login", function (req, res) {
//   console.log(req);
//   //let username: string | undefined;
//   // // if (req.oidc.isAuthenticated()) {
//   //   console.log("jes");
//   //   //res.render("alter");
//   //   //username = req.oidc.user?.name ?? req.oidc.user?.sub;
//   // } else {
//   //   console.log("nije");
//   //   //res.render("login", { username });
//   // }
// });
app.get("/vlaho", function (req, res) { });
// app.post("/user/login", function (req, res) {
//   let data = reqRouter;
//   res.render("games", { data: data });
// });
app.get("/games", function (req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var username, userInfo, admin;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!req.oidc.isAuthenticated()) return [3 /*break*/, 2];
                    username = (_b = (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = req.oidc.user) === null || _c === void 0 ? void 0 : _c.sub;
                    return [4 /*yield*/, req.oidc.fetchUserInfo()];
                case 1:
                    userInfo = _d.sent();
                    admin = isAdmin(userInfo);
                    return [3 /*break*/, 3];
                case 2:
                    username = false;
                    admin = false;
                    _d.label = 3;
                case 3:
                    Game.findAll({
                        attributes: [
                            "id",
                            "round",
                            "homeTeam",
                            "awayTeam",
                            "homeResult",
                            "awayResult",
                        ],
                        order: [["id", "ASC"]]
                    })
                        .then(function (games) {
                        res.render("games", {
                            games: JSON.parse(JSON.stringify(games)),
                            username: username,
                            admin: admin
                        });
                    })["catch"](function (err) { return console.log(err); });
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/getComments", (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var gameId, userInfo, admin, email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gameId = req.body.gameId;
                    return [4 /*yield*/, req.oidc.fetchUserInfo()];
                case 1:
                    userInfo = _a.sent();
                    admin = isAdmin(userInfo);
                    email = userInfo.email;
                    Comment.findAll({
                        attributes: ["id", "gameId", "text", "userId", "createdAt", "updatedAt"],
                        where: {
                            gameId: gameId
                        }
                    })
                        .then(function (comments) {
                        User.findAll({})
                            .then(function (users) {
                            var _a;
                            res.render("comments", {
                                comments: JSON.parse(JSON.stringify(comments)),
                                username: (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name,
                                users: JSON.parse(JSON.stringify(users)),
                                admin: admin,
                                email: email
                            });
                        })["catch"](function (err) { return console.log(err); });
                    })["catch"](function (err) { return console.log(err); });
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/games/deleteComments", (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    var commentId = req.body.commentId;
    Comment.destroy({ where: { id: commentId } })
        .then(function (comment) {
        Game.findAll({
            attributes: [
                "id",
                "round",
                "homeTeam",
                "awayTeam",
                "homeResult",
                "awayResult",
            ]
        })
            .then(function (games) {
            res.status(200);
            res.render("alter");
        })["catch"](function (err) { return console.log(err); });
    })["catch"](function (err) { return console.log(err); });
});
app.post("/games/editComment", (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, commentId, text, userInfo, admin;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, commentId = _a.commentId, text = _a.text;
                    return [4 /*yield*/, req.oidc.fetchUserInfo()];
                case 1:
                    userInfo = _b.sent();
                    admin = isAdmin(userInfo);
                    Comment.update({
                        text: text
                    }, { where: { id: commentId } })
                        .then(function (comment) {
                        Game.findAll({
                            attributes: [
                                "id",
                                "round",
                                "homeTeam",
                                "awayTeam",
                                "homeResult",
                                "awayResult",
                            ]
                        })
                            .then(function (games) {
                            var _a;
                            res.status(200);
                            res.render("games", {
                                games: JSON.parse(JSON.stringify(games)),
                                username: (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name,
                                admin: admin
                            });
                        })["catch"](function (err) { return console.log(err); });
                    })["catch"](function (err) { return console.log(err); });
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/games/editScore", (0, express_openid_connect_1.requiresAuth)(), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, homeResult, awayResult, gameId, userInfo, admin;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, homeResult = _a.homeResult, awayResult = _a.awayResult, gameId = _a.gameId;
                    return [4 /*yield*/, req.oidc.fetchUserInfo()];
                case 1:
                    userInfo = _b.sent();
                    admin = isAdmin(userInfo);
                    Game.update({
                        homeResult: homeResult,
                        awayResult: awayResult,
                        completed: true
                    }, { where: { id: gameId } })
                        .then(function (game) {
                        Game.findAll({
                            attributes: [
                                "id",
                                "round",
                                "homeTeam",
                                "awayTeam",
                                "homeResult",
                                "awayResult",
                            ],
                            order: [["id", "ASC"]]
                        })
                            .then(function (games) {
                            var _a;
                            res.status(200);
                            res.render("games", {
                                games: JSON.parse(JSON.stringify(games)),
                                username: (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name,
                                admin: admin
                            });
                        })["catch"](function (err) { return console.log(err); });
                    })["catch"](function (err) { return console.log(err); });
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/games/addComment", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, admin, _a, gameId, text, userId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.oidc.fetchUserInfo()];
                case 1:
                    userInfo = _b.sent();
                    admin = isAdmin(userInfo);
                    _a = req.body, gameId = _a.gameId, text = _a.text;
                    userId = userInfo.email;
                    Comment.create({
                        gameId: gameId,
                        text: text,
                        userId: userId
                    })
                        .then(function (comment) {
                        Game.findAll({
                            attributes: [
                                "id",
                                "round",
                                "homeTeam",
                                "awayTeam",
                                "homeResult",
                                "awayResult",
                            ]
                        })
                            .then(function (games) {
                            var _a;
                            res.status(200);
                            res.render("games", {
                                games: JSON.parse(JSON.stringify(games)),
                                username: (_a = req.oidc.user) === null || _a === void 0 ? void 0 : _a.name,
                                admin: admin
                            });
                        })["catch"](function (err) { return console.log(err); });
                    })["catch"](function (err) { return console.log(err); });
                    return [2 /*return*/];
            }
        });
    });
});
var hostname = "127.0.0.1";
https_1["default"]
    .createServer({
    key: fs_1["default"].readFileSync("server.key"),
    cert: fs_1["default"].readFileSync("server.cert")
}, app)
    .listen(port, function () {
    console.log("Server running at https://localhost:".concat(port, "/"));
});
// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
module.exports = app;
