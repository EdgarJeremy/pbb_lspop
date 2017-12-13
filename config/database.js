const settings = {
    host: "127.0.0.1",
    database: "form_pajak",
    user: "root",
    password: ""
}

const node_querybuilder = require("node-querybuilder");
const Query = node_querybuilder.QueryBuilder(settings, "mysql", "single");

module.exports = Query;