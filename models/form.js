/**
 * Database
 */
const Query = require("../config/database");

/**
 * Utils
 */
const _ = require("lodash");

/**
 * Form model
 */

const form = {
    generate_nomor_pendaftaran: (table, cb) => {
        const date = new Date();
        const sekarang = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        Query.where({ tanggal_pendaftaran: sekarang })
            .count(table, (err, count) => {
                if (err) return cb(err);
                const nomor_pendaftaran = sekarang.split("-").join("") + "-" + (count + 1);
                cb(null, {
                    tanggal_pendaftaran: sekarang,
                    nomor_pendaftaran: nomor_pendaftaran
                });
            });
    },
    simpan_spop: function (spop, cb) {
        this.generate_nomor_pendaftaran("spop", (err, data) => {
            if (err) return cb(err);
            spop.tanggal_pendaftaran = data.tanggal_pendaftaran;
            spop.nomor_pendaftaran = data.nomor_pendaftaran;
            Query.insert("spop", spop, (err,res) => {
                if(err) return cb(err);
                cb(null,data);
            });
        });
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

        Query.limit(limit, offset).order_by("nomor_pendaftaran","desc")
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

        Query.limit(limit, offset).order_by("nomor_pendaftaran","desc")
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
    },
    cek_status: (surat,nomor_pendaftaran,cb) => {
        Query.where({nomor_pendaftaran})
            .get(surat,cb);
    }
}

module.exports = form;