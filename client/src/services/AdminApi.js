import config from "../config.js";

const base_url = `${config.api_base_url}/administrator`;

const axios = require("axios");
const ax = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

const AdminApi = {

    logout: () => {
        return ax.get("/logout").then((response) => response.data);
    },

    ambil_spop: (params = {}) => {
        return ax.get("/ambil_spop", { params }).then((response) => response.data);
    },

    ambil_lspop: (params = {}) => {
        return ax.get("/ambil_lspop", { params }).then((response) => response.data);
    },

    approve_spop: (id_spop) => {
        return ax.get("/approve_spop", { params: { id_spop } }).then((response) => response.data);
    },

    approve_lspop: (id_lspop) => {
        return ax.get("/approve_lspop", { params: { id_lspop } }).then((response) => response.data);
    },

    ambil_pengguna: (params = {}) => {
        return ax.get("/ambil_pengguna", { params }).then((response) => response.data);
    },

    simpan_pengguna: (pengguna) => {
        return ax.post("/simpan_pengguna", pengguna).then((response) => response.data);
    },

    base64: (params = {}) => {
        return ax.get("/base64", { params }).then((response) => response.data);
    },

    edit_data_spop: (data_spop, progress) => {
        let form_data = new FormData();
        for (let prop in data_spop) {
            form_data.append(prop, data_spop[prop]);
        }
        return ax.post("/edit_spop", form_data, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) => {
                let complete = (e.loaded * 100) / e.total;
                progress(complete);
            }
        }).then((response) => response.data);
    },
    edit_data_lspop: (data_lspop, progress) => {
        return ax.post("/edit_lspop", data_lspop).then((response) => response.data);
    }


}

export default AdminApi;