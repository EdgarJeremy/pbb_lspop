/**
 * Database
 */
const Query = require("../config/database");
const password_hash = require("password-hash");

/**
 * Utils
 */
const _ = require("lodash");

/**
 * Pengguna model
 */

const pengguna = {
    login: (username, password, callback) => {
        Query.where({ username }).limit(1, 0)
            .get("pengguna", function (err, data) {
                if (err) return callback(err, false);

                if (data.length) {
                    if (password_hash.verify(password, data[0].password)) {
                        return callback(null, {
                            ...data[0],
                            password: undefined
                        });
                    } else {
                        return callback(null, false);
                    }
                } else {
                    return callback(null, false);
                }
            });
    },
    list_fields: (cb) => {
        Query.query("DESCRIBE `pengguna`", function (err, data) {
            if (err) return cb(err, data);
            let fields = [];
            for (let i = 0; i < data.length; i++) {
                fields.push(data[i].Field);
            }
            cb(err, fields);
        });
    },
    ambil_pengguna: (limit, offset, where, cb) => {
        if (!_.isEmpty(where)) {
            Query.where(where);
        }
        Query.select("id_pengguna,nama,username,level,aktif")
            .limit(limit, offset)
            .get("pengguna", cb);
    },
    simpan_pengguna: (pengguna, cb) => {
        pengguna.password = password_hash.generate(pengguna.password);
        Query.insert("pengguna", pengguna, cb);
    },
    edit_pengguna: (pengguna, cb) => {
        Query.update("pengguna", pengguna, { id_pengguna: pengguna.id_pengguna }, cb);
    },
    hapus_pengguna: (id_pengguna, cb) => {
        Query.delete("pengguna", { id_pengguna }, cb);
    }
}

module.exports = pengguna;