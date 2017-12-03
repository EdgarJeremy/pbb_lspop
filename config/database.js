const settings = {
    host: "localhost",
    database: "form_pajak",
    user: "root",
    password: ""
}

const Query = require("node-querybuilder").QueryBuilder(settings, "mysql", "single");

module.exports = Query;