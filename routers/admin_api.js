/**
 * Admin Api Router
 */

const router = require("express").Router();
const Response = require("../utils/response");
const File = require("../utils/File");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const mime = require("mime-types");
const _ = require("lodash");

const UPLOAD_DIR = "./assets/uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return cb(err);
            cb(null, raw.toString("hex") + path.extname(file.originalname));
        });
    }
});

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
const form = require("../models/form");
const pengguna = require("../models/pengguna");


/**
 * File upload fields
 */
const spop_files = [
    { name: "file_ktp", maxCount: 1 },
    { name: "file_bukti_kepemilikan", maxCount: 1 },
    { name: "file_surat_keterangan_kelurahan", maxCount: 1 },
    { name: "file_izin_mendirikan_bangunan", maxCount: 1 }
];


router.use(function (req, res, next) {
    let session = req.session;
    if (_.isEmpty(session.userdata)) {
        // return res.json({ status: "SESSION_INVALID", message: "Anda telah logout" });
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

router.get("/base64", function (req, res) {
    const query = req.query;
    let base64data = [];

    for (let key in query) {
        if (query[key] == 'null') continue;

        const file_path = path.resolve(__dirname, "..", "assets", "uploads", query[key]);
        const bitmap = fs.readFileSync(file_path);
        base64data.push({ file: key, data: `data:${mime.lookup(file_path)};base64,${new Buffer(bitmap).toString("base64")}` });
    }
    res.json({
        status: true,
        data: base64data
    });
});

router.post("/edit_spop", upload.fields(spop_files), function (req, res) {
    let session = req.session;
    let body = req.body;
    let files = req.files;
    let replacedFiles = [];

    form.ambil_spop(1, 0, { id_spop: body.id_spop }, (err, old_spop) => {
        if (err) return res.json({ status: false, message: err });
        if (old_spop.length === 0) return res.json({ status: false, message: "SPOP tidak ditemukan" });

        old_spop = old_spop[0];


        form.list_fields_spop((err, fields) => {
            if (err) return res.json({ status: false, message: err });

            fields.splice(fields.indexOf("id_spop"), 1);
            fields.splice(fields.indexOf("approved"), 1);
            fields.splice(fields.indexOf("kode_znt"), 1);
            fields.splice(fields.indexOf("file_izin_mendirikan_bangunan"), 1);
            fields.splice(fields.indexOf("id_pengguna"), 1);
            fields.splice(fields.indexOf("tanggal_pendaftaran"), 1);
            fields.splice(fields.indexOf("nomor_pendaftaran"), 1);
            fields.splice(fields.indexOf("nop"), 1);
            fields.splice(fields.indexOf("nop_bersama"), 1);
            fields.splice(fields.indexOf("nop_asal"), 1);

            for (let prop in files) {
                if (prop) {
                    body[prop] = files[prop][0].filename;
                    replacedFiles.push(prop);
                }
            }

            for (let prop in body) {
                if (/file_/.test(prop)) {
                    if (body[prop] === "undefined" || body[prop] === "null" || body[prop] === undefined || body[prop] === null) {
                        delete body[prop];
                        fields.splice(fields.indexOf(prop), 1);
                    }
                }
            }

            Response.setRequiredPost(fields, body, (errorFields) => {
                if (errorFields.length) {
                    File.deleteUploaded(files);
                    return res.json({ status: "ERRORFIELDS", fields: errorFields });
                }
                delete body.id_pengguna;
                form.edit_spop(body, (err, data) => {
                    if (err) {
                        File.deleteUploaded(files);
                    }
                    // replacedFiles.forEach((item,i) => {
                    //     File.deleteOldFile(old_spop[item]);
                    // });
                    res.json({
                        status: (err) ? false : true,
                        message: err,
                        data: data
                    });
                });
            });


        });

    });

});

router.post("/edit_lspop", function (req, res) {
    let session = req.session;
    let body = req.body;

    form.ambil_lspop(1, 0, { id_lspop: body.id_lspop }, (err, old_lspop) => {
        if (err) return res.json({ status: false, message: err });
        if (old_lspop.length === 0) return res.json({ status: false, message: "LSPOP tidak ditemukan" });

        old_lspop = old_lspop[0];

        form.list_fields_lspop((err, fields) => {
            if (err) return res.json({ status: false, message: err });

            fields.splice(fields.indexOf("id_lspop"), 1);
            fields.splice(fields.indexOf("nop"), 1);
            fields.splice(fields.indexOf("jenis_pagar"), 1);
            fields.splice(fields.indexOf("approved"), 1);
            fields.splice(fields.indexOf("tanggal_pendaftaran"), 1);
            fields.splice(fields.indexOf("nomor_pendaftaran"), 1);
            fields.splice(fields.indexOf("id_pengguna"), 1);

            Response.setRequiredPost(fields,body,(errorFields) => {
                if(errorFields.length) {
                    return res.json({status: "ERRORFIELDS",fields: errorFields});
                }
                delete body.id_pengguna;
                form.edit_lspop(body,(err,data) => {
                    res.json({
                        status: (err) ? false : true,
                        message: err,
                        data: data
                    });
                })
            })

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