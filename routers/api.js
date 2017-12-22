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
            }
        }

        Response.setRequiredPost(fields, body, (errorFields) => {
            if (errorFields.length) {
                File.deleteUploaded(files);
                return res.json({ status: "ERRORFIELDS", fields: errorFields });
            }
            fields.push("file_izin_mendirikan_bangunan");
            fields.push("nop");
            fields.push("nop_bersama");
            fields.push("nop_asal");
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
        fields.splice(fields.indexOf("nop"),1);
        fields.splice(fields.indexOf("jenis_pagar"), 1);
        fields.splice(fields.indexOf("approved"), 1);
        fields.splice(fields.indexOf("tanggal_pendaftaran"), 1);
        fields.splice(fields.indexOf("nomor_pendaftaran"), 1);
        fields.splice(fields.indexOf("id_pengguna"), 1);

        Response.setRequiredPost(fields, body, (errorFields) => {
            if (errorFields.length) return res.json({ status: "ERRORFIELDS", fields: errorFields });
            fields.push("nop");
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

router.get("/uploads/:file", function (req, res) {
    res.sendFile(path.resolve(__dirname, "..", "assets", "uploads", req.params.file));
});

router.get("/cek_status", function (req, res) {
    let query = req.query;
    Response.setRequiredPost(["jenis_surat", "nomor_pendaftaran"], query, (errorFields) => {
        if (errorFields.length) return res.json({ status: "ERRORFIELDS", fields: errorFields });
        form.cek_status(query.jenis_surat, query.nomor_pendaftaran, (err, data) => {
            res.json({
                status: (!err && data[0]) ? true : false,
                message: err,
                data: data[0]
            });
        });
    });
});

router.get("/download_surat/:jenis_surat/:nomor_pendaftaran", function (req, res) {
    let model;
    if (req.params.jenis_surat === "spop") {
        model = {
            id_spop: "ID",
            jenis_formulir: "Jenis Formulir",
            jenis_transaksi: "Jenis Transaksi",
            nop: "NOP",
            nop_bersama: "NOP Bersama",
            nop_asal: "NOP Asal",
            nomor_ktp: "Nomor KTP",
            status_wp: "Status WP",
            pekerjaan: "Pekerjaan",
            nama: "Nama",
            npwp: "NPWP",
            telepon: "Nomor Telepon",
            jalan: "Jalan",
            blok_kav_no: "Blok/KAV/NO",
            rt: "RT",
            rw: "RW",
            kelurahan: "Kelurahan",
            dati_ii: "Dati II",
            kodepos: "Kodepos",
            nomor_persil: "Nomor Persil",
            jalan_op: "Jalan Objek Pajak",
            blok_kav_no_op: "Blok/KAV/NO Objek Pajak",
            cabang: "Cabang",
            rt_op: "RT Objek Pajak",
            rw_op: "RW Objek Pajak",
            luas_tanah: "Luas Tanah",
            kode_znt: "Kode ZNT",
            jumlah_bangunan: "Jumlah Bangunan",
            jenis_tanah: "Jenis Tanah",
            file_ktp: "File KTP",
            file_bukti_kepemilikan: "File Bukti Kepemilikan",
            file_surat_keterangan_kelurahan: "File Surat Keterangan Kelurahan",
            file_izin_mendirikan_bangunan: "File Izin Mendirikan Bangunan",
            tanggal_pendaftaran: "Tanggal Pendaftaran",
            nomor_pendaftaran: "Nomor Pendaftaran"
        }
    } else {
        model = {
            jenis_formulir: "Jenis Formulir",
            jenis_transaksi: "Jenis Transaksi",
            nop: "NOP",
            nomor_bangunan: "Nomor Bangunan",
            konstruksi: "Konstruksi",
            jenis_bangunan: "Jenis Bangunan",
            atap: "Atap",
            luas_bangunan: "Luas Bangunan",
            dinding: "Dinding",
            tahun_dibangun: "Tahun Dibangun",
            lantai: "Lantai",
            kondisi_bangunan: "Kondisi Bangunan",
            langit_langit: "Langit-langit",
            jumlah_lantai: "Jumlah Lantai",
            tahun_renovasi: "Tahun Renovasi",
            daya_listrik: "Daya Listrik",
            jumlah_ac_split: "Jumlah AC Split",
            jumlah_ac_window: "Jumlah AC Window",
            ac_central: "AC Central",
            luas_kolam_renang: "Luas Kolam Renang",
            finishing_kolam: "Finishing Kolam",
            luas_perkerasan_halaman_berat: "Luas Perkerasan Halaman (Berat)",
            luas_perkerasan_halaman_dg_penutup_lantai: "Luas Perkerasan Halaman (Dg. Penutup Lantai)",
            luas_perkerasan_halaman_ringan: "Luas Perkerasan Halaman (Ringan)",
            luas_perkerasan_halaman_sedang: "Luas Perkerasan Halaman (Sedang)",
            jumlah_lapangan_teknis_aspal_no_lampu: "Jumlah Lapangan Teknis Aspal (-lampu)",
            jumlah_lapangan_teknis_aspal_with_lampu: "Jumlah Lapangan Teknis Aspal (+lampu)",
            jumlah_lapangan_teknis_beton_no_lampu: "Jumlah Lapangan Teknis Beton (-lampu)",
            jumlah_lapangan_teknis_beton_with_lampu: "Jumlah Lapangan Teknis Beton (+lampu)",
            jumlah_lapangan_teknis_tanah_liat_no_lampu: "Jumlah Lapangan Teknis Tanah Liat (-lampu)",
            jumlah_lapangan_teknis_tanah_liat_with_lampu: "Jumlah Lapangan Teknis Tanah Liat (-lampu)",
            jumlah_lift_barang: "Jumlah Lift Barang",
            jumlah_lift_kapsul: "Jumlah Lift Kapsul",
            jumlah_lift_penumpang: "Jumlah Lift Penumpang",
            jumlah_tangga_berjalan_k_080: "Jumlah Tangga Berjalan (berat <= 80)",
            jumlah_tangga_berjalan_l_080: "Jumlah Tangga Berjalan (berat > 80)",
            panjang_pagar: "Panjang Pagar",
            bahan_pagar: "Bahan Pagar",
            jenis_pagar: "Jenis Pagar",
            jumlah_pabx: "Jumlah Pabx",
            kedalaman_sumur_artesis: "Kedalaman Sumur Artesis",
            pemadam_kebakaran_fire_alarm: "Fire Alarm",
            pemadam_kebakaran_hydrant: "Hydrant",
            pemadam_kebakaran_sprinkler: "Sprinkler"
        }
    }

    form["ambil_" + req.params.jenis_surat](1, 0, { nomor_pendaftaran: req.params.nomor_pendaftaran }, (err, data) => {
        if (data.length === 0) return res.json({ status: false, message: `${req.params.jenis_surat.toUpperCase()} dengan nomor pendaftaran ${req.params.nomor_pendaftaran} tidak ditemukan` });

        const data_r = [];
        for (let item in data[0]) {
            if(!/file_/.test(item))
                data_r.push({ key: item, value: data[0][item] });
        }
        let html = `
            <center>
                <h2 style="margin-top: 50px">NOMOR PENDAFTARAN ${req.params.nomor_pendaftaran}</h2>
                <table style="font-size: 15px" cellpadding="15px" border="1px">
        `;

        for (let i = 0; i < data_r.length; i++) {
            html += `
                <tr>
                    <td><b>${model[data_r[i].key]}</b></td>
                    <td>${data_r[i].value}</td>
                </tr>
            `;
        }

        html += `
                </table>
            </center>
        `;

        res.pdfFromHTML({
            filename: `${req.params.jenis_surat.toUpperCase()} [${req.params.nomor_pendaftaran}]`,
            htmlContent: html,
        });
    });
});

module.exports = router;