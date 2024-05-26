"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: "",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User_1.User, Post_1.Post],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
});
