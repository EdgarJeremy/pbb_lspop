/**
 * Database
 */
const Query = require("../config/database");

/**
 * Form model
 */

const form = {
    simpan_spop: function(spop, cb) {
        Query.insert("spop", spop, cb);
    },
    list_fields: (cb) => {
        Query.query("DESCRIBE `spop`", function (err, data) {
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