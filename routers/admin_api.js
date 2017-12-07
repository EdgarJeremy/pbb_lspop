/**
 * Admin Api Router
 */

const router = require("express").Router();
const Response = require("../utils/response");
const path = require("path");
const _ = require("lodash");

/**
 * Models
 */
const form = require("../models/form");
const pengguna = require("../models/pengguna");

router.use(function (req, res, next) {
    let session = req.session;
    if(_.isEmpty(session.userdata)) {
        return res.json({status: "SESSION_INVALID",message: "Anda telah logout"});
    }
    next();
});

router.get("/ambil_spop", function (req, res) {

    form.list_fields_spop((err, fields) => {
        if (err) return res.json({ status: false, message: err });
        const { limit = 30, offset = 0 } = req.query;
        let get = Response.filterMethodField(req.query, fields);

        form.ambil_spop(limit, offset, get, (err, data) => {

            if (err) return res.json({ status: false, message: err });
            form.ambil_total_spop(get, (err, total) => {
                if (err) return res.json({ status: false, message: err });
                res.json({
                    status: true,
                    data: {
                        total: total,
                        spops: data
                    }
                });
            });

        });

    });

});

router.get("/ambil_lspop", function (req, res) {

    form.list_fields_lspop((err, fields) => {

        const { limit = 30, offset = 0 } = req.query;
        let get = Response.filterMethodField(req.query, fields);

        form.ambil_lspop(limit, offset, get, (err, data) => {
            if (err) return res.json({ status: false, message: err });
            form.ambil_total_lspop(get, (err, total) => {
                if (err) return res.json({ status: false, message: err });
                res.json({
                    status: true,
                    data: {
                        total: total,
                        lspops: data
                    }
                })
            })
        });

    });

});

router.get("/approve_spop", function (req, res) {
    if (req.query.id_spop) {
        form.approve_spop(req.query.id_spop, (err, data) => {
            if (err) return res.json({ status: false, message: err });
            res.json({ status: true, data: data });
        })
    } else {
        res.json({
            status: false,
            message: "Sertakan `id_spop` dalam request"
        });
    }
});

router.get("/approve_lspop", function (req, res) {
    if (req.query.id_lspop) {
        form.approve_lspop(req.query.id_lspop, (err, data) => {
            if (err) return res.json({ status: false, message: err });
            res.json({ status: true, data: data });
        });
    } else {
        res.json({
            status: false,
            message: "Sertakan `id_lspop` dalam request"
        });
    }
});

router.get("/ambil_pengguna", function (req, res) {

    pengguna.list_fields((err, fields) => {
        const { limit = 30, offset = 0 } = req.query;
        let get = Response.filterMethodField(req.query, fields);

        pengguna.ambil_pengguna(limit, offset, get, (err, data) => {
            if (err) return res.json({ status: false, message: err });
            res.json({ 
                status: true,
                data: data
            });
        });

    });

});

router.post("/simpan_pengguna", function (req, res) {
    let body = req.body;

    pengguna.list_fields((err, fields) => {
        if (err) return res.json({ status: false, message: err });
        fields.splice(fields.indexOf("id_pengguna"), 1);
        fields.push("r_password");
        Response.setRequiredPost(fields, body, (errorFields) => {
            if (errorFields.length) {
                return res.json({ status: "ERRORFIELDS", fields: errorFields });
            }
            if (body.password !== body.r_password) {
                return res.json({ status: "ERRORFIELDS", fields: ["r_password"] });
            }
            fields.splice(fields.indexOf("r_password"));
            body = Response.filterMethodField(body, fields);
            pengguna.simpan_pengguna(body, (err, data) => {
                if (err) return res.json({ status: false, message: err });
                res.json({
                    status: true,
                    message: err,
                    data: data
                });
            });
        });
    });

});

router.get("/logout", function (req, res) {
    let session = req.session;
    session.destroy((err) => {
        console.log(err);
        res.json({
            message: "From logout",
            session: session
        });
    });
});


module.exports = router;