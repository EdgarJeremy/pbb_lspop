/**
 * Database
 */
const Query = require("../config/database");

/**
 * Utis
 */
const _ = require("lodash");

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
    },
    ambil_spop: (limit, offset, where = {}, cb) => {
        if (!_.isEmpty(where))
            Query.where(where);

        Query.limit(limit, offset)
            .get("spop", cb);
    },
    ambil_total_spop: (where = {}, cb) => {
        if (!_.isEmpty(where))
            Query.where(where);

        Query.count("spop", cb);
    },
    ambil_lspop: (limit, offset, where = {}, cb) => {
        if (!_.isEmpty(where))
            Query.where(where);

        Query.limit(limit, offset)
            .get("lspop", cb);
    },
    ambil_total_lspop: (where = {}, cb) => {
        if (!_.isEmpty(where))
            Query.where(where);
            
        Query.count("lspop", cb);
    },
    approve_spop: (id, cb) => {
        Query.where({ id_spop: id })
            .update("spop", { approved: true }, null, cb);
    },
    approve_lspop: (id, cb) => {
        Query.where({ id_lspop: id })
            .update("lspop", { approved: true }, null, cb);
    }
}

module.exports = form;