const base_url = `http://${window.location.hostname}:3000/api`;
const axios = require("axios");
const ax = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true
});

const Api = {

    kirim_data_spop: (data_spop) => {
        return ax.post("/simpan_spop",data_spop)
        .then((response) => response.data);
    },

    login: (data,progress) => {
        return ax.post("/login",data,{
            onUploadProgress: (e) => {
                let complete = (e.loaded * 100) / e.total;
                progress(complete);
            }
        }).then((response) => response.data);
    },

    cek: () => {
        return ax.get("/cek").then((response) => response.data);
    },

    logout: () => {
        return ax.get("/logout").then((response) => response.data);
    }

}

export default Api;