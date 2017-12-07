/**
 * Api router
 */
const router = require("express").Router();
const Response = require("../utils/response");
const File = require("../utils/File");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const UPLOAD_DIR = "./assets/uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        });
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let filetypes = /jpeg|jpg|png|pdf/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(`Error: supported files : ${filetypes}`);
    }
});

/**
 * Models
 */
const pengguna = require("../models/pengguna");
const form = require("../models/form");

/**
 * File upload fields
 */
const spop_files = [
    { name: "file_ktp", maxCount: 1 },
    { name: "file_bukti_kepemilikan", maxCount: 1 },
    { name: "file_surat_keterangan_kelurahan", maxCount: 1 },
    { name: "file_izin_mendirikan_bangunan", maxCount: 1 }
];

router.post("/login", function (req, res) {
    let session = req.session;
    let body = req.body;

    Response.setRequiredPost(["username", "password"], body, (errorFields) => {
        if (errorFields.length) return res.json({ status: "ERRORFIELDS", fields: errorFields });

        pengguna.login(body.username, body.password, function (err, data) {
            if (err) return res.json(err);
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
        res.json({
            message: "From logout",
            session: session
        });
    });
});

router.post("/simpan_spop", upload.fields(spop_files), function (req, res) {
    let session = req.session;
    let body = req.body;
    let files = req.files;

    console.log(files);

    form.list_fields_spop((err, fields) => {
        if (err) return res.json({ status: false, message: err });

        fields.splice(fields.indexOf("id_spop"), 1);
        fields.splice(fields.indexOf("approved"), 1);
        fields.splice(fields.indexOf("kode_znt"), 1);
        fields.splice(fields.indexOf("file_izin_mendirikan_bangunan"), 1);


        for (let prop in files) {
            if (prop) {
                body[prop] = files[prop][0].filename;
            }
        }

        Response.setRequiredPost(fields, body, (errorFields) => {
            if (errorFields.length) {
                File.deleteUploaded(files);
                return res.json({ status: "ERRORFIELDS", fields: errorFields });
            }
            fields.push("file_izin_mendirikan_bangunan");
            body = Response.filterMethodField(body, fields);
            form.simpan_spop(body, (err, data) => {
                if (err) {
                    File.deleteUploaded(files);
                }
                res.json({
                    status: (err) ? false : true,
                    message: err,
                    data: data
                });
            });
        });
    });
});

router.post("/simpan_lspop", function (req, res) {
    let session = req.session;
    let body = req.body;
    form.list_fields_lspop((err, fields) => {
        if (err) return res.json({ status: false, message: err });
        fields.splice(fields.indexOf("id_lspop"), 1);
        fields.splice(fields.indexOf("jenis_pagar"), 1);
        fields.splice(fields.indexOf(""));
        Response.setRequiredPost(fields, body, (errorFields) => {
            if (errorFields.length) return res.json({ status: "ERRORFIELDS", fields: errorFields });
            body = Response.filterMethodField(body, fields);
            form.simpan_lspop(body, (err, data) => {
                res.json({
                    status: (err) ? false : true,
                    message: err,
                    data: data
                });
            });
        });
    });
});

router.get("/uploads/:img", function (req, res) {
    res.sendFile(path.resolve(__dirname, "..", "assets", "uploads",req.params.img));
});

module.exports = router;