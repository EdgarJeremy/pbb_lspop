/**
 * Database
 */
const Query = require("../config/database");

/**
 * Form model
 */

const form = {
    simpan_spop: (spop, cb) => {
        Query.insert("spop", spop, cb);
    },
    simpan_lspop: (lspop, cb) => {
        Query.insert("lspop", lspop, cb);
    },
    list_fields_spop: (cb) => {
        Query.query("DESCRIBE `spop`", function (err, data) {
            if (err) return cb(err, data);
            let fields = [];
            for (let i = 0; i < data.length; i++) {
                fields.push(data[i].Field);
            }
            cb(err, fields);
        });
    },
    list_fields_lspop: (cb) => {
        Query.query("DESCRIBE `lspop`", function (err, data) {
            if (err) return cb(err, data);
            let fields = [];
            for (let i = 0; i < data.length; i++) {
                fields.push(data[i].Field);
            }
            cb(err, fields);
        });
    }
}

module.exports = form;