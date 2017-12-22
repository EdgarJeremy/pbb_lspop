import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";


import AdminApi from "../services/AdminApi";
import Alert from "../components/Alert";

export default class FormInputLspop extends React.Component {

    model = {
        "nop": ["", "", "", "", "", "", ""],
        ac_central: false,
        pemadam_kebakaran_hydrant: false,
        pemadam_kebakaran_sprinkler: false,
        pemadam_kebakaran_fire_alarm: false,
        jenis_formulir: "",
        jenis_transaksi: "",
        nomor_bangunan: "",
        konstruksi: "",
        jenis_bangunan: "",
        atap: "",
        luas_bangunan: "",
        dinding: "",
        tahun_dibangun: "",
        lantai: "",
        kondisi_bangunan: "",
        langit_langit: "",
        jumlah_lantai: "",
        tahun_renovasi: "",
        daya_listrik: "",
        jumlah_ac_split: "",
        jumlah_ac_window: "",
        finishing_kolam: "",
        luas_kolam_renang: "",
        luas_perkerasan_halaman_berat: "",
        luas_perkerasan_halaman_ringan: "",
        luas_perkerasan_halaman_sedang: "",
        luas_perkerasan_halaman_dg_penutup_lantai: "",
        jumlah_lapangan_teknis_aspal_with_lampu: "",
        jumlah_lapangan_teknis_beton_with_lampu: "",
        jumlah_lapangan_teknis_beton_no_lampu: "",
        jumlah_lapangan_teknis_aspal_no_lampu: "",
        jumlah_lapangan_teknis_tanah_liat_with_lampu: "",
        jumlah_lapangan_teknis_tanah_liat_no_lampu: "",
        jumlah_lift_penumpang: "",
        jumlah_lift_kapsul: "",
        jumlah_lift_barang: "",
        jumlah_tangga_berjalan_k_080: "",
        jumlah_tangga_berjalan_l_080: "",
        panjang_pagar: "",
        bahan_pagar: "",
        jumlah_pabx: "",
        kedalaman_sumur_artesis: ""
    }

    state = {
        form_data: { ...this.model },
        error_fields: {}
    }

    constructor(props) {
        super(props);
        this.changeSelect = this.changeSelect.bind(this);
        this.changeNop = this.changeNop.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.clearError = this.clearError.bind(this);
        this.clearErrorSelect = this.clearErrorSelect.bind(this);
    }

    changeSelect(name) {
        return (e, i, v) => {
            const { form_data } = this.state;
            form_data[name] = v;
            this.setState({ form_data });
        }
    }

    changeNop(name, index) {
        return (e, v) => {
            const { form_data } = this.state;
            form_data[name][index] = v;
            this.setState({ form_data });
        }
    }

    onChangeText(e, v) {
        const { form_data } = this.state;
        form_data[e.target.name] = v;
        this.setState({ form_data });
    }

    onCheck(name) {
        return (e, b) => {
            const { form_data } = this.state;
            form_data[name] = !form_data[name];
            this.setState({ form_data });
        }
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

    onSubmit() {
        this.Alert.setTitle("Loading..")
            .cancelable(false)
            .withLoading(true)
            .setMessage("Mengupload data...")
            .open();

        const { form_data } = this.state;
        const lspop_data = {
            ...form_data,
            nop: form_data.nop.join(".")
        };
        AdminApi.edit_data_lspop(lspop_data).then((response) => {
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
                    .setMessage(
                    <div>
                        <p>Surat berhasil diedit</p>
                    </div>
                    )
                    .open();
                this.props.update_data();
            } else {
                this.Alert.cancelable(true).withLoading(false).setTitle("Fatal Error").setMessage(JSON.stringify(response.message)).open();
            }
        }).catch(err => {
            this.Alert.cancelable(true).withLoading(false).setTitle("Fatal Error").setMessage(JSON.stringify(err)).open();
        });
    }

    componentDidMount() {
        this.Alert = this.refs.Alert;
        const state = this.state;
        this.setState({
            ...state,
            form_data: this.props.form_data
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {/* Formulir */}
                    <div className="body-container" style={{ width: "100%" }}>
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
                                                    <MenuItem value="LSPOP" primaryText="LSPOP" />
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
                                                    <MenuItem value="Perekaman data bangunan" primaryText="Perekaman data bangunan" />
                                                    <MenuItem value="Pemutakhiran data bangunan" primaryText="Pemutakhiran data bangunan" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">NOP</span></td>
                                            <td className="nops">
                                                <TextField type="number" errorText={this.state.error_fields.nop} value={this.state.form_data.nop[0]} onFocus={this.clearError} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 0)} /> -
                                                <TextField type="number" errorText={this.state.error_fields.nop} value={this.state.form_data.nop[1]} onFocus={this.clearError} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 1)} /> -
                                                <TextField type="number" errorText={this.state.error_fields.nop} value={this.state.form_data.nop[2]} onFocus={this.clearError} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 2)} /> -
                                                <TextField type="number" errorText={this.state.error_fields.nop} value={this.state.form_data.nop[3]} onFocus={this.clearError} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 3)} /> -
                                                <TextField type="number" errorText={this.state.error_fields.nop} value={this.state.form_data.nop[4]} onFocus={this.clearError} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 4)} /> -
                                                <TextField type="number" errorText={this.state.error_fields.nop} value={this.state.form_data.nop[5]} onFocus={this.clearError} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 5)} /> -
                                                <TextField type="number" errorText={this.state.error_fields.nop} value={this.state.form_data.nop[6]} onFocus={this.clearError} name="nop" style={{ width: 50 }} onChange={this.changeNop("nop", 6)} />
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card>
                    </div>
                    {/* Rincian Data Bangunan */}
                    <div className="body-container" style={{ width: "100%" }}>
                        <Card>
                            <div className="form-section">
                                <h2>Rincian Data Bangunan</h2>
                            </div>
                            <div className="form-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <td><span className="overlay">NOMOR BANGUNAN</span></td>
                                            <td width="300px"><TextField type="number" value={this.state.form_data.nomor_bangunan} onFocus={this.clearError} errorText={this.state.error_fields.nomor_bangunan} name="nomor_bangunan" onChange={this.onChangeText} /></td>
                                            <td width="200px"><span className="overlay">KONSTRUKSI</span></td>
                                            <td>
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("konstruksi")}
                                                    errorText={this.state.error_fields.konstruksi}
                                                    value={this.state.form_data.konstruksi}
                                                    onChange={this.changeSelect("konstruksi")}>
                                                    <MenuItem value="1 - Baja" primaryText="1 - Baja" />
                                                    <MenuItem value="2 - Beton" primaryText="2 - Beton" />
                                                    <MenuItem value="3 - Batu Bata" primaryText="3 - Batu Bata" />
                                                    <MenuItem value="4 - Kayu" primaryText="4 - Kayu" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="200px"><span className="overlay">JENIS BANGUNAN</span></td>
                                            <td width="300px">
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("jenis_bangunan")}
                                                    maxHeight={200}
                                                    autoWidth={true}
                                                    errorText={this.state.error_fields.jenis_bangunan}
                                                    value={this.state.form_data.jenis_bangunan}
                                                    onChange={this.changeSelect("jenis_bangunan")}>
                                                    <MenuItem value="JPB01 - Perumahan" primaryText="JPB01 - Perumahan" />
                                                    <MenuItem value="JPB02 - Perkantoran Swasta" primaryText="JPB02 - Perkantoran Swasta" />
                                                    <MenuItem value="JPB03 - Pabrik" primaryText="JPB02 - Pabrik" />
                                                    <MenuItem value="JPB04 - Toko/Apotik/Pasar/Ruko" primaryText="JPB04 - Toko/Apotik/Pasar/Ruko" />
                                                    <MenuItem value="JPB05 - Rumah Sakit/Klinik" primaryText="JPB05 - Rumah Sakit/Klinik" />
                                                    <MenuItem value="JPB06 - Olahraga/Rekreasi" primaryText="JPB06 - Olahraga/Rekreasi" />
                                                    <MenuItem value="JPB07 - Hotel/Wisma" primaryText="JPB07 - Hotel/Wisma" />
                                                    <MenuItem value="JPB08 - Bengkel/Gudang/Pertanian" primaryText="JPB08 - Bengkel/Gudang/Pertanian" />
                                                    <MenuItem value="JPB09 - Gedung/Pemerintahan" primaryText="JPB09 - Gedung/Pemerintahan" />
                                                    <MenuItem value="JPB10 - Lain-lain" primaryText="JPB10 - Lain-lain" />
                                                    <MenuItem value="JPB11 - Bangunan tidak kena pajak" primaryText="JPB11 - Bangunan tidak kena pajak" />
                                                    <MenuItem value="JPB12 - Bangunan Parkir" primaryText="JPB12 - Bangunan Parkir" />
                                                    <MenuItem value="JPB13 - Apartemen" primaryText="JPB13 - Apartemen" />
                                                    <MenuItem value="JPB14 - Pompa Bensin" primaryText="JPB14 - Pompa Bensin" />
                                                    <MenuItem value="JPB15 - Tangki Minyak" primaryText="JPB15 - Tangki Minyak" />
                                                    <MenuItem value="JPB16 - Gedung Sekolah" primaryText="JPB16 - Gedung Sekolah" />
                                                </SelectField>
                                            </td>
                                            <td width="200px"><span className="overlay">ATAP</span></td>
                                            <td>
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("atap")}
                                                    autoWidth
                                                    errorText={this.state.error_fields.atap}
                                                    value={this.state.form_data.atap}
                                                    onChange={this.changeSelect("atap")}>
                                                    <MenuItem value="1 - Decrabon/Beton/GTG Glazur" primaryText="1 - Decrabon/Beton/GTG Glazur" />
                                                    <MenuItem value="2 - GTG Beton/Aluminium" primaryText="2 - GTG Beton/Aluminium" />
                                                    <MenuItem value="3 - GTG Biasa/Sirap" primaryText="3 - GTG Biasa/Sirap" />
                                                    <MenuItem value="4 - ASBES" primaryText="4 - ASBES" />
                                                    <MenuItem value="5 - Seng" primaryText="5 - Seng" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">LUAS BANGUNAN</span></td>
                                            <td width="300px"><TextField type="number" value={this.state.form_data.luas_bangunan} onFocus={this.clearError} errorText={this.state.error_fields.luas_bangunan} name="luas_bangunan" onChange={this.onChangeText} /></td>
                                            <td width="200px"><span className="overlay">DINDING</span></td>
                                            <td>
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("dinding")}
                                                    autoWidth
                                                    errorText={this.state.error_fields.dinding}
                                                    value={this.state.form_data.dinding}
                                                    onChange={this.changeSelect("dinding")}>
                                                    <MenuItem value="1 - Kaca/Aluminium" primaryText="1 - Kaca/Aluminium" />
                                                    <MenuItem value="2 - Beton" primaryText="2 - Beton" />
                                                    <MenuItem value="3 - Batu Bata/Conblok" primaryText="3 - Batu Bata/Conblok" />
                                                    <MenuItem value="4 - Kayu" primaryText="4 - Kayu" />
                                                    <MenuItem value="5 - Seng" primaryText="5 - Seng" />
                                                    <MenuItem value="6 - Tidak Ada" primaryText="6 - Tidak Ada" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">TAHUN DIBANGUN</span></td>
                                            <td width="300px"><TextField type="number" value={this.state.form_data.tahun_dibangun} onFocus={this.clearError} errorText={this.state.error_fields.tahun_dibangun} name="tahun_dibangun" onChange={this.onChangeText} /></td>
                                            <td width="200px"><span className="overlay">LANTAI</span></td>
                                            <td>
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("lantai")}
                                                    autoWidth
                                                    errorText={this.state.error_fields.lantai}
                                                    value={this.state.form_data.lantai}
                                                    onChange={this.changeSelect("lantai")}>
                                                    <MenuItem value="1 - Marmer" primaryText="1 - Marmer" />
                                                    <MenuItem value="2 - Keramik" primaryText="2 - Keramik" />
                                                    <MenuItem value="3 - Teraso" primaryText="3 - Teraso" />
                                                    <MenuItem value="4 - Ubin PC/Papan" primaryText="4 - Ubin PC/Papan" />
                                                    <MenuItem value="5 - Semen" primaryText="5 - Semen" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">KONDISI BANGUNAN</span></td>
                                            <td width="300px">
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("kondisi_bangunan")}
                                                    autoWidth
                                                    errorText={this.state.error_fields.kondisi_bangunan}
                                                    value={this.state.form_data.kondisi_bangunan}
                                                    onChange={this.changeSelect("kondisi_bangunan")}>
                                                    <MenuItem value="1 - Sangat Baik" primaryText="1 - Sangat Baik" />
                                                    <MenuItem value="2 - Baik" primaryText="2 - Baik" />
                                                    <MenuItem value="3 - Sedang" primaryText="3 - Sedang" />
                                                    <MenuItem value="4 - Jelek" primaryText="4 - Jelek" />
                                                </SelectField>
                                            </td>
                                            <td width="200px"><span className="overlay">LANGIT-LANGIT</span></td>
                                            <td>
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("langit_langit")}
                                                    autoWidth
                                                    errorText={this.state.error_fields.langit_langit}
                                                    value={this.state.form_data.langit_langit}
                                                    onChange={this.changeSelect("langit_langit")}>
                                                    <MenuItem value="1 - Marmer" primaryText="1 - Marmer" />
                                                    <MenuItem value="2 - Keramik" primaryText="2 - Keramik" />
                                                    <MenuItem value="3 - Teraso" primaryText="3 - Teraso" />
                                                    <MenuItem value="4 - Ubin PC/Papan" primaryText="4 - Ubin PC/Papan" />
                                                    <MenuItem value="5 - Semen" primaryText="5 - Semen" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">JUMLAH LANTAI</span></td>
                                            <td width="300px"><TextField type="number" value={this.state.form_data.jumlah_lantai} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lantai} name="jumlah_lantai" onChange={this.onChangeText} /></td>
                                            <td width="200px"><span className="overlay">TAHUN RENOVASI</span></td>
                                            <td><TextField type="number" value={this.state.form_data.tahun_renovasi} onFocus={this.clearError} errorText={this.state.error_fields.tahun_renovasi} name="tahun_renovasi" onChange={this.onChangeText} /></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card>
                    </div>
                    {/* Fasilitas */}
                    <div className="body-container" style={{ width: "100%" }}>
                        <Card>
                            <div className="form-section">
                                <h2>Fasilitas</h2>
                            </div>
                            <div className="form-body">
                                <table>
                                    <thead>
                                        <tr style={{ paddingTop: "30px" }}>
                                            <td><span className="overlay">DAYA LISTRIK</span></td>
                                            <td width="300px"><TextField type="number" errorText={this.state.error_fields.daya_listrik} name="daya_listrik" onChange={this.onChangeText} placeholder="Watt" /></td>
                                            <td width="200px"><span className="overlay">JUMLAH AC</span></td>
                                            <td className="nops">
                                                <TextField type="number" value={this.state.form_data.jumlah_ac_split} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_ac_split} name="jumlah_ac_split" onChange={this.onChangeText} style={{ width: "41%" }} placeholder="Split" /> -
                                                <TextField type="number" value={this.state.form_data.jumlah_ac_window} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_ac_window} name="jumlah_ac_window" onChange={this.onChangeText} style={{ width: "41%" }} placeholder="Window" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">AC CENTRAL</span></td>
                                            <td width="300px">
                                                <Checkbox
                                                    onCheck={this.onCheck("ac_central")}
                                                    checked={this.state.form_data.ac_central}
                                                    label="Ada AC Central"
                                                />
                                            </td>
                                            <td width="200px"><span className="overlay">LUAS KOLAM RENANG</span></td>
                                            <td><TextField value={this.state.form_data.luas_kolam_renang} onFocus={this.clearError} errorText={this.state.error_fields.luas_kolam_renang} type="number" name="luas_kolam_renang" onChange={this.onChangeText} placeholder="m2" /></td>
                                        </tr>
                                        <tr style={{ paddingBottom: "30px", borderBottom: "5px solid #222" }}>
                                            <td width="300px" style={{ verticalAlign: "top" }}><span className="overlay">FINISHING KOLAM</span></td>
                                            <td width="300px" style={{ verticalAlign: "top" }}>
                                                <SelectField
                                                    onClick={() => this.clearErrorSelect("finishing_kolam")}
                                                    errorText={this.state.error_fields.finishing_kolam}
                                                    value={this.state.form_data.finishing_kolam}
                                                    onChange={this.changeSelect("finishing_kolam")}>
                                                    <MenuItem value="12 - Kolam Renang Plester" primaryText="12 - Kolam Renang Plester" />
                                                    <MenuItem value="13 - Kolam Renang Pelapis" primaryText="13 - Kolam Renang Pelapis" />
                                                </SelectField>
                                            </td>
                                            <td style={{ width: "600px" }}>
                                                <span className="overlay">LUAS PERKERASAN HALAMAN</span><br />
                                                <TextField value={this.state.form_data.luas_perkerasan_halaman_ringan} onFocus={this.clearError} errorText={this.state.error_fields.luas_perkerasan_halaman_ringan} name="luas_perkerasan_halaman_ringan" type="number" onChange={this.onChangeText} placeholder="Ringan (m2)" style={{ width: "41%" }} />
                                                <TextField value={this.state.form_data.luas_perkerasan_halaman_berat} onFocus={this.clearError} errorText={this.state.error_fields.luas_perkerasan_halaman_berat} name="luas_perkerasan_halaman_berat" type="number" onChange={this.onChangeText} placeholder="Berat (m2)" style={{ width: "41%" }} />
                                                <TextField value={this.state.form_data.luas_perkerasan_halaman_sedang} onFocus={this.clearError} errorText={this.state.error_fields.luas_perkerasan_halaman_sedang} name="luas_perkerasan_halaman_sedang" type="number" onChange={this.onChangeText} placeholder="Sedang (m2)" style={{ width: "41%" }} />
                                                <TextField value={this.state.form_data.luas_perkerasan_halaman_dg_penutup_lantai} onFocus={this.clearError} errorText={this.state.error_fields.luas_perkerasan_halaman_dg_penutup_lantai} name="luas_perkerasan_halaman_dg_penutup_lantai" type="number" onChange={this.onChangeText} placeholder="Dg Penutup Lantai (m2)" style={{ width: "41%" }} />
                                            </td>
                                        </tr>
                                        <tr style={{ paddingTop: "30px" }}>
                                            <td style={{ width: "700px" }}>
                                                <span className="overlay">JUMLAH LAPANGAN TEKNIS</span><br />
                                                <TextField value={this.state.form_data.jumlah_lapangan_teknis_beton_with_lampu} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lapangan_teknis_beton_with_lampu} name="jumlah_lapangan_teknis_beton_with_lampu" type="number" onChange={this.onChangeText} placeholder="Beton (+lampu)" style={{ width: "31%" }} />
                                                <TextField value={this.state.form_data.jumlah_lapangan_teknis_aspal_with_lampu} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lapangan_teknis_aspal_with_lampu} name="jumlah_lapangan_teknis_aspal_with_lampu" type="number" onChange={this.onChangeText} placeholder="Aspal (+lampu)" style={{ width: "31%" }} />
                                                <TextField value={this.state.form_data.jumlah_lapangan_teknis_tanah_liat_with_lampu} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lapangan_teknis_tanah_liat_with_lampu} name="jumlah_lapangan_teknis_tanah_liat_with_lampu" type="number" onChange={this.onChangeText} placeholder="Tanah Liat/Rumput (+lampu)" style={{ width: "31%" }} />
                                                <TextField value={this.state.form_data.jumlah_lapangan_teknis_beton_no_lampu} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lapangan_teknis_beton_no_lampu} name="jumlah_lapangan_teknis_beton_no_lampu" type="number" onChange={this.onChangeText} placeholder="Beton (-lampu)" style={{ width: "31%" }} />
                                                <TextField value={this.state.form_data.jumlah_lapangan_teknis_aspal_no_lampu} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lapangan_teknis_aspal_no_lampu} name="jumlah_lapangan_teknis_aspal_no_lampu" type="number" onChange={this.onChangeText} placeholder="Aspal (-lampu)" style={{ width: "31%" }} />
                                                <TextField value={this.state.form_data.jumlah_lapangan_teknis_tanah_liat_no_lampu} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lapangan_teknis_tanah_liat_no_lampu} name="jumlah_lapangan_teknis_tanah_liat_no_lampu" type="number" onChange={this.onChangeText} placeholder="Tanah Liat/Rumput (-lampu)" style={{ width: "31%" }} />
                                            </td>
                                            <td style={{ width: "600px", verticalAlign: "top" }}>
                                                <span className="overlay">JUMLAH LIFT</span><br />
                                                <TextField value={this.state.form_data.jumlah_lift_penumpang} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lift_penumpang} name="jumlah_lift_penumpang" type="number" onChange={this.onChangeText} placeholder="Penumpang" style={{ width: "31%" }} />
                                                <TextField value={this.state.form_data.jumlah_lift_kapsul} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lift_kapsul} name="jumlah_lift_kapsul" type="number" onChange={this.onChangeText} placeholder="Kapsul" style={{ width: "31%" }} />
                                                <TextField value={this.state.form_data.jumlah_lift_barang} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_lift_barang} name="jumlah_lift_barang" type="number" onChange={this.onChangeText} placeholder="Barang" style={{ width: "31%" }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "250px" }}><span className="overlay">JUMLAH TANGGA BERJALAN</span></td>
                                            <td width="300px" className="nops">
                                                <TextField type="number" value={this.state.form_data.jumlah_tangga_berjalan_k_080} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_tangga_berjalan_k_080} name="jumlah_tangga_berjalan_k_080" onChange={this.onChangeText} placeholder="Lbr <= 0.80M" style={{ width: "41%" }} />
                                                <TextField type="number" value={this.state.form_data.jumlah_tangga_berjalan_l_080} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_tangga_berjalan_l_080} name="jumlah_tangga_berjalan_l_080" onChange={this.onChangeText} placeholder="Lbr > 0.80M" style={{ width: "41%" }} />
                                            </td>
                                            <td width="200px"><span className="overlay">PANJANG PAGAR</span></td>
                                            <td><TextField type="number" value={this.state.form_data.panjang_pagar} onFocus={this.clearError} errorText={this.state.error_fields.panjang_pagar} name="panjang_pagar" onChange={this.onChangeText} /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">BAHAN PAGAR</span></td>
                                            <td width="300px">
                                                <SelectField
                                                    errorText={this.state.error_fields.bahan_pagar}
                                                    onClick={() => this.clearErrorSelect("bahan_pagar")}
                                                    value={this.state.form_data.bahan_pagar}
                                                    onChange={this.changeSelect("bahan_pagar")}>
                                                    <MenuItem value="35 - Pagar Besi" primaryText="35 - Pagar Besi" />
                                                    <MenuItem value="36 - Pagar Batako" primaryText="36 - Pagar Batako" />
                                                </SelectField>
                                            </td>
                                            <td width="200px"><span className="overlay">JUMLAH PABX</span></td>
                                            <td><TextField type="number" value={this.state.form_data.jumlah_pabx} onFocus={this.clearError} errorText={this.state.error_fields.jumlah_pabx} name="jumlah_pabx" onChange={this.onChangeText} /></td>
                                        </tr>
                                        <tr style={{ paddingBottom: "30px" }}>
                                            <td style={{ verticalAlign: "top" }}><span className="overlay">PEMADAM KEBAKARAN</span></td>
                                            <td width="300px">
                                                <Checkbox
                                                    onCheck={this.onCheck("pemadam_kebakaran_hydrant")}
                                                    checked={this.state.form_data.pemadam_kebakaran_hydrant}
                                                    label="Hydrant"
                                                />
                                                <Checkbox
                                                    onCheck={this.onCheck("pemadam_kebakaran_sprinkler")}
                                                    checked={this.state.form_data.pemadam_kebakaran_sprinkler}
                                                    label="Sprinkler"
                                                />
                                                <Checkbox
                                                    onCheck={this.onCheck("pemadam_kebakaran_fire_alarm")}
                                                    checked={this.state.form_data.pemadam_kebakaran_fire_alarm}
                                                    label="Fire Alarm"
                                                />
                                            </td>
                                            <td width="300px"><span className="overlay">KEDALAMAN SUMUR ARTESIS</span></td>
                                            <td><TextField type="number" value={this.state.form_data.kedalaman_sumur_artesis} onFocus={this.clearError} errorText={this.state.error_fields.kedalaman_sumur_artesis} name="kedalaman_sumur_artesis" onChange={this.onChangeText} placeholder="m" /></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card>
                    </div>
                    {/* <div className="foot-container-wide">
                        <p><i className="material-icons">warning</i> Pastikan semua data yang anda masukkan sudah benar sebelum menekan tombol di bawah ini</p><br />
                        <RaisedButton
                            onClick={this.onSubmit}
                            backgroundColor="#2ecc71"
                            labelColor="#fff"
                            label="SIMPAN"
                            icon={<i style={{ color: "#fff" }} className="material-icons">save</i>} />
                    </div> */}
                    <Alert ref="Alert" />
                </div>
            </MuiThemeProvider>
        );
    }

} 