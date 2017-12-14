import config from "../config.js";

const base_url = `${config.api_base_url}/api`;
const axios = require("axios");
const ax = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

const Api = {

    kirim_data_spop: (data_spop, progress) => {
        let form_data = new FormData();
        for (let prop in data_spop) {
            form_data.append(prop, data_spop[prop]);
        }
        return ax.post("/simpan_spop", form_data, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) => {
                let complete = (e.loaded * 100) / e.total;
                progress(complete);
            }
        }).then((response) => response.data);
    },

    kirim_data_lspop: (data_lspop) => {
        return ax.post("/simpan_lspop", data_lspop)
            .then((response) => response.data);
    },

    cek_status: (params) => {
        return ax.get("/cek_status", { params }).then((response) => response.data);
    },

    login: (data, progress) => {
        return ax.post("/login", data, {
            onUploadProgress: (e) => {
                let complete = (e.loaded * 100) / e.total;
                progress(complete);
            }
        }).then((response) => response.data);
    },

    download_surat: (jenis_surat,nomor_pendaftaran) => {
        return ax.get(`/download_surat/${jenis_surat}/${nomor_pendaftaran}`);
    },

    cek: () => {
        return ax.get("/cek").then((response) => response.data);
    },

    logout: () => {
        return ax.get("/logout").then((response) => response.data);
    }

}

export default Api;