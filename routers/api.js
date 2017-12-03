/**
 * Api router
 */
const router = require("express").Router();
const response = require("../utils/response");

/**
 * Models
 */
const pengguna = require("../models/pengguna");
const form = require("../models/form");

router.post("/login", function (req, res) {
    let session = req.session;
    let body = req.body;

    response.setRequiredPost(["username", "password"], body, (errorFields) => {
        if (errorFields.length) return res.json({ status: "ERRORFIELDS", fields: errorFields });

        pengguna.login(body.username, body.password, function (err, data) {
            if (err) res.json(err);
            session.userdata = data;
            res.json({
                status: (data.id_pengguna) ? true : false,
                data: data,
                session: session
            });
        });

    });

});

router.get("/cek", function (req, res) {
    let session = req.session;
    res.json({
        status: (session.userdata) ? true : false,
        data: session
    });
});

router.get("/logout", function (req, res) {
    let session = req.session;
    session.destroy((err) => {
        console.log(err);
    });
    res.json({
        message: "From logout",
        session: session
    });
});

router.post("/simpan_spop", function (req, res) {
    let session = req.session;
    let body = req.body;
    form.list_fields((err, fields) => {
        if (err) return res.json({ status: false, message: err });

        fields.splice(fields.indexOf("id_spop"), 1);
        fields.splice(fields.indexOf("approved"), 1);
        fields.splice(fields.indexOf("kode_znt"), 1);

        response.setRequiredPost(fields, body, (errorFields) => {
            if (errorFields.length) return res.json({ status: "ERRORFIELDS", fields: errorFields });
            body = response.filterMethodField(body,fields);
            console.log(body);
            form.simpan_spop(body, (err, data) => {
                res.json({
                    status: (err) ? false : true,
                    message: err,
                    data: data
                });
            });
        });
    });
});

module.exports = router;