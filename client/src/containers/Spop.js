/**
 * Components
 */
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardActions, CardHeader, CardMedia } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';

import LoadingOverlay from "../components/LoadingOverlay";
import Alert from "../components/Alert";


/**
 * Services
 */
import Api from "../services/Api";

export default class Spop extends React.Component {

    model = {
        nop: ["", "", "", "", "", "", ""],
        nop_bersama: ["", "", "", "", "", "", ""],
        nop_asal: ["", "", "", "", "", "", ""],
        jenis_formulir: "",
        jenis_transaksi: "",
        nomor_ktp: "",
        status_wp: "",
        pekerjaan: "",
        nama: "",
        npwp: "",
        telepon: "",
        jalan: "",
        blok_kav_no: "",
        rt: "",
        rw: "",
        kelurahan: "",
        dati_ii: "",
        kodepos: "",
        nomor_persil: "",
        jalan_op: "",
        blok_kav_no_op: "",
        cabang: "",
        rt_op: "",
        rw_op: "",
        luas_tanah: "",
        jumlah_bangunan: "",
        jenis_tanah: "",
        file_ktp: null,
        file_bukti_kepemilikan: null,
        file_surat_keterangan_kelurahan: null,
        file_izin_mendirikan_bangunan: null
    };

    state = {
        form_data: { ...this.model },
        error_fields: {},
        loadingOverlay: false,
        successPopup: false,
        display_file_ktp: "",
        display_file_bukti_kepemilikan: "",
        display_file_surat_keterangan_kelurahan: "",
        display_file_izin_mendirikan_bangunan: ""
    }

    constructor(props) {
        super(props);
        this.changeSelect = this.changeSelect.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clearError = this.clearError.bind(this);
        this.changeFile = this.changeFile.bind(this);
    }

    onChangeText(e, v) {
        const { form_data } = this.state;
        form_data[e.target.name] = v;
        this.setState({ form_data });
    }

    changeNop(where, index) {
        return (e, v) => {
            const { form_data } = this.state;
            form_data[where][index] = v;
            this.setState({ form_data });
        }

    }

    changeSelect(name) {
        return (e, i, v) => {
            const { form_data } = this.state;
            form_data[name] = v;
            this.setState({ form_data });
        }
    }

    onSubmit() {
        const { form_data } = this.state;
        const spop_data = {
            ...form_data,
            nop: form_data.nop.join(""),
            nop_bersama: form_data.nop_bersama.join(""),
            nop_asal: form_data.nop_asal.join("")
        };

        this.Alert.setTitle("Loading..")
            .cancelable(false)
            .withLoading(true)
            .setMessage("Mengupload data...")
            .open();

        Api.kirim_data_spop(spop_data, (complete) => {
            console.log(complete);
            this.Alert.setProgress(complete);
        }).then((response) => {
            this.Alert.setProgress(0);
            if (response.status === "ERRORFIELDS") {
                const { error_fields } = this.state;
                for (let i = 0; i < response.fields.length; i++) {
                    if (response.fields[i] === "nop" || response.fields[i] === "nop_bersama" || response.fields[i] === "nop_asal") {
                        error_fields[response.fields[i]] = `Lengkapi`;
                    } else {
                        error_fields[response.fields[i]] = `Harus diisi`;
                    }
                }
                this.Alert.close();
                this.setState({ error_fields });
            } else if (response.status) {
                this.Alert
                    .cancelable(true)
                    .setTitle("Penginputan berhasil!")
                    .withLoading(false)
                    .setMessage("Data yang anda isi sudah berhasil terinput di database kami")
                    .open();
                this.setState({
                    form_data: {
                        ...this.model,
                        nop: ["", "", "", "", "", "", ""],
                        nop_bersama: ["", "", "", "", "", "", ""],
                        nop_asal: ["", "", "", "", "", "", ""],
                    },
                    error_fields: {},
                    display_file_ktp: "",
                    display_file_bukti_kepemilikan: "",
                    display_file_surat_keterangan_kelurahan: "",
                    display_file_izin_mendirikan_bangunan: ""
                });
            } else {
                this.Alert.cancelable(true).withLoading(false).setTitle("Fatal Error").setMessage(JSON.stringify(response.message)).open();
            }
        }).catch(err => {
            this.Alert.cancelable(true).withLoading(false).setTitle("Fatal Error").setMessage(JSON.stringify(err)).open();
        });
    }

    clearError(e) {
        const { error_fields } = this.state;
        error_fields[e.target.name] = undefined;
        this.setState({ error_fields });
    }

    clearErrorSelect(name) {
        const { error_fields } = this.state;
        error_fields[name] = undefined;
        this.setState({ error_fields });
    }

    changeFile(e) {
        if (e.target.files && e.target.files[0]) {
            const allow = /jpeg|jpg|png|pdf/;
            let inputName = e.target.name;
            let file = e.target.files[0];

            if (allow.test(file.type)) {
                const { form_data } = this.state;
                form_data[inputName] = file;
                let reader = new FileReader();
                reader.onload = (e) => {
                    let newObj = {};
                    newObj[`display_${inputName}`] = e.target.result;
                    this.setState(newObj);
                    const { error_fields } = this.state;
                    error_fields.file_ktp = undefined;
                    error_fields.file_bukti_kepemilikan = undefined;
                    error_fields.file_surat_keterangan_kelurahan = undefined;
                    error_fields.file_izin_mendirikan_bangunan = undefined;
                    this.setState({ error_fields });
                }
                reader.readAsDataURL(file);
            } else {
                this.Alert.cancelable(true).withLoading(false).setTitle("Error")
                    .setMessage(`Tipe file ${file.type} tidak didukung`)
                    .open();
            }

        }
    }

    removeFile(name) {
        const { form_data } = this.state;
        form_data[name] = null;
        let newObj = {};
        newObj[`display_${name}`] = "";
        this.setState({ form_data });
        this.setState(newObj);
    }

    componentDidMount() {
        this.Alert = this.refs.Alert;
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Card className="card-wide">
                        <div className="heading-container">
                            <div className="left" style={{ display: "inline-block" }}>
                                <div style={{ width: "20%", float: "left" }}>
                                    <Link to="/">
                                        <IconButton
                                            tooltip="KEMBALI"
                                            tooltipPosition="top-left">
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </IconButton>
                                    </Link>
                                </div>
                                <div style={{ width: "80%", float: "left" }}>
                                    <h1>SPOP</h1>
                                    <h3><span>Surat Pemberitahuan Objek Pajak</span></h3>
                                </div>
                            </div>
                            <div className="right">
                                <img src={require("../assets/images/logo.png")} alt="Logo" />
                            </div>
                        </div>
                        {/* Formulir */}
                        <div className="body-container">
                            <Card>
                                <div className="form-section">
                                    <h2>Formulir</h2>
                                </div>
                                <div className="form-body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td><span className="overlay">JENIS FORMULIR</span></td>
                                                <td>
                                                    <SelectField
                                                        onClick={() => this.clearErrorSelect("jenis_formulir")}
                                                        errorText={this.state.error_fields.jenis_formulir}
                                                        value={this.state.form_data.jenis_formulir}
                                                        onChange={this.changeSelect("jenis_formulir")}>
                                                        <MenuItem value="SPOP" primaryText="SPOP" />
                                                    </SelectField>
                                                </td>
                                                <td style={{ paddingLeft: 30, paddingRight: 30 }}>
                                                    <span className="overlay">JENIS TRANSAKSI</span>
                                                </td>
                                                <td>
                                                    <SelectField
                                                        onClick={() => this.clearErrorSelect("jenis_transaksi")}
                                                        errorText={this.state.error_fields.jenis_transaksi}
                                                        value={this.state.form_data.jenis_transaksi}
                                                        onChange={this.changeSelect("jenis_transaksi")}>
                                                        <MenuItem value="Perekaman Data OP" primaryText="Perekaman Data OP" />
                                                        <MenuItem value="Pemutakhiran Data OP" primaryText="Pemutakhiran Data OP" />
                                                    </SelectField>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">NOP</span></td>
                                                <td className="nops">
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop[0]} errorText={this.state.error_fields.nop} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 0)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop[1]} errorText={this.state.error_fields.nop} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 1)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop[2]} errorText={this.state.error_fields.nop} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 2)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop[3]} errorText={this.state.error_fields.nop} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 3)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop[4]} errorText={this.state.error_fields.nop} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 4)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop[5]} errorText={this.state.error_fields.nop} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 5)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop[6]} errorText={this.state.error_fields.nop} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 6)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">NOP BERSAMA</span></td>
                                                <td className="nops">
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_bersama[0]} errorText={this.state.error_fields.nop_bersama} name="nop_bersama" style={{ width: 50 }} onChange={this.changeNop("nop_bersama", 0)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_bersama[1]} errorText={this.state.error_fields.nop_bersama} name="nop_bersama" style={{ width: 50 }} onChange={this.changeNop("nop_bersama", 1)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_bersama[2]} errorText={this.state.error_fields.nop_bersama} name="nop_bersama" style={{ width: 50 }} onChange={this.changeNop("nop_bersama", 2)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_bersama[3]} errorText={this.state.error_fields.nop_bersama} name="nop_bersama" style={{ width: 50 }} onChange={this.changeNop("nop_bersama", 3)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_bersama[4]} errorText={this.state.error_fields.nop_bersama} name="nop_bersama" style={{ width: 50 }} onChange={this.changeNop("nop_bersama", 4)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_bersama[5]} errorText={this.state.error_fields.nop_bersama} name="nop_bersama" style={{ width: 50 }} onChange={this.changeNop("nop_bersama", 5)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_bersama[6]} errorText={this.state.error_fields.nop_bersama} name="nop_bersama" style={{ width: 50 }} onChange={this.changeNop("nop_bersama", 6)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">NOP ASAL</span></td>
                                                <td className="nops">
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_asal[0]} errorText={this.state.error_fields.nop_asal} name="nop_asal" style={{ width: 50 }} onChange={this.changeNop("nop_asal", 0)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_asal[1]} errorText={this.state.error_fields.nop_asal} name="nop_asal" style={{ width: 50 }} onChange={this.changeNop("nop_asal", 1)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_asal[2]} errorText={this.state.error_fields.nop_asal} name="nop_asal" style={{ width: 50 }} onChange={this.changeNop("nop_asal", 2)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_asal[3]} errorText={this.state.error_fields.nop_asal} name="nop_asal" style={{ width: 50 }} onChange={this.changeNop("nop_asal", 3)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_asal[4]} errorText={this.state.error_fields.nop_asal} name="nop_asal" style={{ width: 50 }} onChange={this.changeNop("nop_asal", 4)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_asal[5]} errorText={this.state.error_fields.nop_asal} name="nop_asal" style={{ width: 50 }} onChange={this.changeNop("nop_asal", 5)} /> -
                                                    <TextField type="number" onFocus={this.clearError} value={this.state.form_data.nop_asal[6]} errorText={this.state.error_fields.nop_asal} name="nop_asal" style={{ width: 50 }} onChange={this.changeNop("nop_asal", 6)} />
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Card>
                        </div>
                        {/* Data subjek pajak */}
                        <div className="body-container">
                            <Card>
                                <div className="form-section">
                                    <h2>Data Subjek Pajak</h2>
                                </div>
                                <div className="form-body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td><span className="overlay">NOMOR KTP</span></td>
                                                <td width="300px">
                                                    <TextField
                                                        value={this.state.form_data.nomor_ktp}
                                                        onFocus={this.clearError}
                                                        errorText={this.state.error_fields.nomor_ktp}
                                                        type="number"
                                                        name="nomor_ktp"
                                                        onChange={this.onChangeText}
                                                    />
                                                </td>
                                                <td width="200px"><span className="overlay">STATUS WP</span></td>
                                                <td>
                                                    <SelectField
                                                        onClick={() => this.clearErrorSelect("status_wp")}
                                                        errorText={this.state.error_fields.status_wp}
                                                        value={this.state.form_data.status_wp}
                                                        onChange={this.changeSelect("status_wp")}>
                                                        <MenuItem value="1 - Pemilik" primaryText="1 - Pemilik" />
                                                        <MenuItem value="2 - Penyewa" primaryText="2 - Penyewa" />
                                                        <MenuItem value="3 - Pengelola" primaryText="3 - Pengelola" />
                                                        <MenuItem value="4 - Pemakai" primaryText="4 - Pemakai" />
                                                        <MenuItem value="5 - Sengketa" primaryText="5 - Sengketa" />
                                                    </SelectField>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">PEKERJAAN</span></td>
                                                <td width="300px">
                                                    <SelectField
                                                        onClick={() => this.clearErrorSelect("pekerjaan")}
                                                        errorText={this.state.error_fields.pekerjaan}
                                                        value={this.state.form_data.pekerjaan}
                                                        onChange={this.changeSelect("pekerjaan")}>
                                                        <MenuItem value="1 - PNS" primaryText="1 - PNS" />
                                                        <MenuItem value="2 - ABRI" primaryText="2 - ABRI" />
                                                        <MenuItem value="3 - Pensiunan" primaryText="3 - Pensiunan" />
                                                        <MenuItem value="4 - Badan" primaryText="4 - Badan" />
                                                        <MenuItem value="5 - Lainnya" primaryText="5 - Lainnya" />
                                                    </SelectField>
                                                </td>
                                                <td width="200px"><span className="overlay">NAMA</span></td>
                                                <td><TextField value={this.state.form_data.nama} onFocus={this.clearError} name="nama" errorText={this.state.error_fields.nama} onChange={this.onChangeText} /></td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">NPWP</span></td>
                                                <td width="300px"><TextField value={this.state.form_data.npwp} onFocus={this.clearError} name="npwp" errorText={this.state.error_fields.npwp} onChange={this.onChangeText} /></td>
                                                <td width="200px"><span className="overlay">TELEPON</span></td>
                                                <td><TextField value={this.state.form_data.telepon} onFocus={this.clearError} type="number" name="telepon" errorText={this.state.error_fields.telepon} onChange={this.onChangeText} /></td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">JALAN</span></td>
                                                <td width="300px"><TextField value={this.state.form_data.jalan} onFocus={this.clearError} name="jalan" errorText={this.state.error_fields.jalan} onChange={this.onChangeText} /></td>
                                                <td width="200px"><span className="overlay">BLOK/KAV/NO</span></td>
                                                <td><TextField value={this.state.form_data.blok_kav_no} onFocus={this.clearError} name="blok_kav_no" errorText={this.state.error_fields.blok_kav_no} onChange={this.onChangeText} /></td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">RT/RW</span></td>
                                                <td width="300px" className="nops">
                                                    <TextField value={this.state.form_data.rt} onFocus={this.clearError} name="rt" errorText={this.state.error_fields.rt} onChange={this.onChangeText} style={{ width: "41%" }} placeholder="RT" /> /
                                                    <TextField value={this.state.form_data.rw} onFocus={this.clearError} name="rw" errorText={this.state.error_fields.rw} onChange={this.onChangeText} style={{ width: "41%" }} placeholder="RW" />
                                                </td>
                                                <td width="200px"><span className="overlay">KELURAHAN</span></td>
                                                <td><TextField value={this.state.form_data.kelurahan} onFocus={this.clearError} name="kelurahan" errorText={this.state.error_fields.kelurahan} onChange={this.onChangeText} /></td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">Dati II</span></td>
                                                <td width="300px"><TextField value={this.state.form_data.dati_ii} onFocus={this.clearError} name="dati_ii" errorText={this.state.error_fields.dati_ii} onChange={this.onChangeText} /></td>
                                                <td width="200px"><span className="overlay">KODEPOS</span></td>
                                                <td><TextField value={this.state.form_data.kodepos} onFocus={this.clearError} name="kodepos" errorText={this.state.error_fields.kodepos} onChange={this.onChangeText} /></td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Card>
                        </div>
                        {/* Data letak objek pajak */}
                        <div className="body-container">
                            <Card>
                                <div className="form-section">
                                    <h2>Data Letak Objek Pajak</h2>
                                </div>
                                <div className="form-body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td><span className="overlay">NOMOR PERSIL</span></td>
                                                <td width="300px"><TextField value={this.state.form_data.nomor_persil} onFocus={this.clearError} type="number" name="nomor_persil" errorText={this.state.error_fields.nomor_persil} onChange={this.onChangeText} /></td>
                                                <td width="200px"><span className="overlay">JALAN</span></td>
                                                <td><TextField value={this.state.form_data.jalan_op} onFocus={this.clearError} name="jalan_op" errorText={this.state.error_fields.jalan_op} onChange={this.onChangeText} /></td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">BLOK/KAV/NO</span></td>
                                                <td width="300px"><TextField value={this.state.form_data.blok_kav_no_op} onFocus={this.clearError} name="blok_kav_no_op" errorText={this.state.error_fields.blok_kav_no_op} onChange={this.onChangeText} /></td>
                                                <td width="200px"><span className="overlay">CABANG</span></td>
                                                <td>
                                                    <SelectField
                                                        onClick={() => this.clearErrorSelect("cabang")}
                                                        errorText={this.state.error_fields.cabang}
                                                        value={this.state.form_data.cabang}
                                                        onChange={this.changeSelect("cabang")}>
                                                        <MenuItem value="Cabang" primaryText="Cabang" />
                                                        <MenuItem value="Bukan Cabang" primaryText="Bukan Cabang" />
                                                    </SelectField>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">RT/RW</span></td>
                                                <td width="300px" className="nops">
                                                    <TextField value={this.state.form_data.rt_op} onFocus={this.clearError} name="rt_op" errorText={this.state.error_fields.rt_op} onChange={this.onChangeText} style={{ width: "41%" }} placeholder="RT" /> /
                                                    <TextField value={this.state.form_data.rw_op} onFocus={this.clearError} name="rw_op" errorText={this.state.error_fields.rw_op} onChange={this.onChangeText} style={{ width: "41%" }} placeholder="RW" />
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Card>
                        </div>
                        {/* Data Bumi */}
                        <div className="body-container">
                            <Card>
                                <div className="form-section">
                                    <h2>Data Bumi</h2>
                                </div>
                                <div className="form-body">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td><span className="overlay">LUAS TANAH</span></td>
                                                <td width="300px"><TextField value={this.state.form_data.luas_tanah} onFocus={this.clearError} type="number" name="luas_tanah" errorText={this.state.error_fields.luas_tanah} onChange={this.onChangeText} /></td>
                                                <td width="200px"><span className="overlay">KODE ZNT</span></td>
                                                <td>
                                                    <SelectField
                                                        autoWidth
                                                        onClick={() => this.clearErrorSelect("kode_znt")}
                                                        errorText={this.state.error_fields.kode_znt}
                                                        value={this.state.form_data.kode_znt}
                                                        onChange={this.changeSelect("kode_znt")}>
                                                    </SelectField>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span className="overlay">JUMLAH BANGUNAN</span></td>
                                                <td width="300px"><TextField value={this.state.form_data.jumlah_bangunan} onFocus={this.clearError} type="number" name="jumlah_bangunan" errorText={this.state.error_fields.jumlah_bangunan} onChange={this.onChangeText} /></td>
                                                <td width="200px"><span className="overlay">JENIS TANAH</span></td>
                                                <td>
                                                    <SelectField
                                                        autoWidth
                                                        onClick={() => this.clearErrorSelect("jenis_tanah")}
                                                        errorText={this.state.error_fields.jenis_tanah}
                                                        value={this.state.form_data.jenis_tanah}
                                                        onChange={this.changeSelect("jenis_tanah")}>
                                                        <MenuItem value="TANAH+BANGUNAN" primaryText="TANAH+BANGUNAN" />
                                                        <MenuItem value="TANAH KAVLING SIAP BANGUN" primaryText="TANAH KAVLING SIAP BANGUN" />
                                                        <MenuItem value="TANAH KOSONG" primaryText="TANAH KOSONG" />
                                                        <MenuItem value="FASILITAS UMUM" primaryText="FASILITAS UMUM" />
                                                    </SelectField>
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </Card>
                        </div>
                        {/* File Pendukung */}
                        <div className="body-container">
                            <Card>
                                <div className="form-section">
                                    <h2>File Pendukung</h2>
                                </div>
                                <div className="form-body">
                                    <div className="button-group">
                                        <RaisedButton
                                            primary={(this.state.form_data.file_ktp !== null)}
                                            icon={<i style={{ color: ((this.state.form_data.file_ktp !== null) ? "#fff" : "#000") }} className="material-icons">cloud_upload</i>}
                                            label="Upload KTP"
                                            labelPosition="before"
                                            containerElement="label">
                                            <input
                                                accept="image/*,application/pdf"
                                                onChange={this.changeFile}
                                                type="file" name="file_ktp" style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    opacity: 0,
                                                }} />
                                        </RaisedButton>
                                        <RaisedButton
                                            primary={(this.state.form_data.file_bukti_kepemilikan !== null)}
                                            icon={<i style={{ color: ((this.state.form_data.file_bukti_kepemilikan !== null) ? "#fff" : "#000") }} className="material-icons">cloud_upload</i>}
                                            label="Upload Bukti Kepemilikan"
                                            labelPosition="before"
                                            containerElement="label">
                                            <input
                                                accept="image/*,application/pdf"
                                                onChange={this.changeFile}
                                                type="file" name="file_bukti_kepemilikan" style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    opacity: 0,
                                                }} />
                                        </RaisedButton>
                                        <RaisedButton
                                            primary={(this.state.form_data.file_surat_keterangan_kelurahan !== null)}
                                            icon={<i style={{ color: ((this.state.form_data.file_surat_keterangan_kelurahan !== null) ? "#fff" : "#000") }} className="material-icons">cloud_upload</i>}
                                            label="Upload Surat Keterangan Kelurahan"
                                            labelPosition="before"
                                            containerElement="label">
                                            <input
                                                accept="image/*,application/pdf"
                                                onChange={this.changeFile}
                                                type="file" name="file_surat_keterangan_kelurahan" style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    opacity: 0,
                                                }} />
                                        </RaisedButton>
                                        <RaisedButton
                                            primary={(this.state.form_data.file_izin_mendirikan_bangunan !== null)}
                                            icon={<i style={{ color: ((this.state.form_data.file_izin_mendirikan_bangunan !== null) ? "#fff" : "#000") }} className="material-icons">cloud_upload</i>}
                                            label="Upload Izin Mendirikan Bangunan"
                                            labelPosition="before"
                                            containerElement="label">
                                            <input
                                                accept="image/*,application/pdf"
                                                onChange={this.changeFile}
                                                type="file" name="file_izin_mendirikan_bangunan" style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    opacity: 0,
                                                }} />
                                        </RaisedButton>
                                    </div>
                                    <div className="file-group">
                                        {
                                            (!this.state.display_file_ktp &&
                                                !this.state.form_data.file_ktp) ||
                                            <div className="file-box">
                                                <Card style={{ width: "300px" }}>
                                                    <CardHeader style={{ paddingRight: 0 }} title="KTP" />
                                                    <CardMedia>
                                                        {
                                                            (this.state.display_file_ktp.split(";")[0].split(":")[1].split("/")[0] === "image") ?
                                                                <img src={this.state.display_file_ktp} alt="" /> :
                                                                <iframe title="KTP" src={this.state.display_file_ktp} />
                                                        }
                                                    </CardMedia>
                                                    <CardActions>
                                                        <FlatButton onClick={() => this.removeFile("file_ktp")} label="Hapus" />
                                                    </CardActions>
                                                </Card>
                                            </div>
                                        }
                                        {
                                            (!this.state.display_file_bukti_kepemilikan &&
                                                !this.state.form_data.file_bukti_kepemilikan) ||
                                            <div className="file-box">
                                                <Card style={{ width: "300px" }}>
                                                    <CardHeader title="Bukti Kepemilikan" />
                                                    <CardMedia>
                                                        {
                                                            (this.state.display_file_bukti_kepemilikan.split(";")[0].split(":")[1].split("/")[0] === "image") ?
                                                                <img src={this.state.display_file_bukti_kepemilikan} alt="" /> :
                                                                <iframe title="Bukti Kepemilikan" src={this.state.display_file_bukti_kepemilikan} />
                                                        }
                                                    </CardMedia>
                                                    <CardActions>
                                                        <FlatButton onClick={() => this.removeFile("file_bukti_kepemilikan")} label="Hapus" />
                                                    </CardActions>
                                                </Card>
                                            </div>
                                        }
                                        {
                                            (!this.state.display_file_surat_keterangan_kelurahan &&
                                                !this.state.form_data.file_surat_keterangan_kelurahan) ||
                                            <div className="file-box">
                                                <Card style={{ width: "300px" }}>
                                                    <CardHeader title="Surat Keterangan Kelurahan" />
                                                    <CardMedia>
                                                        {
                                                            (this.state.display_file_surat_keterangan_kelurahan.split(";")[0].split(":")[1].split("/")[0] === "image") ?
                                                                <img src={this.state.display_file_surat_keterangan_kelurahan} alt="" /> :
                                                                <iframe title="Surat Keterangan Kelurahan" src={this.state.display_file_surat_keterangan_kelurahan} />
                                                        }
                                                    </CardMedia>
                                                    <CardActions>
                                                        <FlatButton onClick={() => this.removeFile("file_surat_keterangan_kelurahan")} label="Hapus" />
                                                    </CardActions>
                                                </Card>
                                            </div>
                                        }
                                        {
                                            (!this.state.display_file_izin_mendirikan_bangunan &&
                                                !this.state.form_data.file_izin_mendirikan_bangunan) ||
                                            <div className="file-box">
                                                <Card style={{ width: "300px" }}>
                                                    <CardHeader title="Izin Mendirikan Bangunan" />
                                                    <CardMedia>
                                                        {
                                                            (this.state.display_file_izin_mendirikan_bangunan.split(";")[0].split(":")[1].split("/")[0] === "image") ?
                                                                <img src={this.state.display_file_izin_mendirikan_bangunan} alt="" /> :
                                                                <iframe title="Izin Mendirikan Bangunan" src={this.state.display_file_izin_mendirikan_bangunan} />
                                                        }
                                                    </CardMedia>
                                                    <CardActions>
                                                        <FlatButton onClick={() => this.removeFile("file_izin_mendirikan_bangunan")} label="Hapus" />
                                                    </CardActions>
                                                </Card>
                                            </div>
                                        }
                                    </div>
                                    {
                                        (this.state.error_fields.file_ktp ||
                                            this.state.error_fields.file_bukti_kepemilikan ||
                                            this.state.error_fields.file_surat_keterangan_kelurahan
                                        ) &&
                                        <p className="error">Lengkapi file-file pendukung</p>
                                    }

                                </div>
                            </Card>
                        </div>
                        <div className="foot-container-wide">
                            <p>Pastikan semua data yang anda masukkan sudah benar sebelum menekan tombol di bawah ini</p><br />
                            <RaisedButton
                                onClick={this.onSubmit}
                                backgroundColor="#2ecc71"
                                labelColor="#fff"
                                label="SIMPAN"
                                icon={<i style={{ color: "#fff" }} className="material-icons">save</i>} />
                        </div>
                    </Card>
                    <LoadingOverlay visible={this.state.loadingOverlay} loadingColor="#3498db" title="Mengupload data.." />
                    <Alert ref="Alert" />
                </div>
            </MuiThemeProvider>
        );
    }

} 