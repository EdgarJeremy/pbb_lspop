import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import { Link } from "react-router-dom";

export default class Lspop extends React.Component {

    state = {
        jenis_formulir: "LSPOP",
        jenis_transaksi: "Perekaman data bangunan",
        jenis_bangunan: "JPB01 - Perumahan",
        konstruksi: "1 - Baja",
        atap: null
    }

    render() {
        return (
            <MuiThemeProvider>
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
                                <h1>LSPOP</h1>
                                <h3><span>Lampiran Surat Pemberitahuan Objek Pajak</span></h3>
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
                                                    value={this.state.jenis_formulir}
                                                    onChange={(e, i, v) => this.setState({ jenis_formulir: v })}>
                                                    <MenuItem value="LSPOP" primaryText="LSPOP" />
                                                </SelectField>
                                            </td>
                                            <td style={{ paddingLeft: 30, paddingRight: 30 }}>
                                                <span className="overlay">JENIS TRANSAKSI</span>
                                            </td>
                                            <td>
                                                <SelectField
                                                    value={this.state.jenis_transaksi}
                                                    onChange={(e, i, v) => this.setState({ jenis_transaksi: v })}>
                                                    <MenuItem value="Perekaman data bangunan" primaryText="Perekaman data bangunan" />
                                                    <MenuItem value="Pemutakhiran data bangunan" primaryText="Pemutakhiran data bangunan" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">NOP</span></td>
                                            <td className="nops">
                                                <TextField style={{ width: 50 }} /> -
                                                <TextField style={{ width: 50 }} /> -
                                                <TextField style={{ width: 50 }} /> -
                                                <TextField style={{ width: 50 }} /> -
                                                <TextField style={{ width: 50 }} /> -
                                                <TextField style={{ width: 50 }} /> -
                                                <TextField style={{ width: 50 }} />
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card>
                    </div>
                    {/* Rincian Data Bangunan */}
                    <div className="body-container">
                        <Card>
                            <div className="form-section">
                                <h2>Rincian Data Bangunan</h2>
                            </div>
                            <div className="form-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <td><span className="overlay">NOMOR BANGUNAN</span></td>
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">KONSTRUKSI</span></td>
                                            <td>
                                                <SelectField
                                                    value={this.state.konstruksi}
                                                    onChange={(e, i, v) => this.setState({ konstruksi: v })}>
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
                                                    name="jenis_bangunan"
                                                    maxHeight={200}
                                                    autoWidth={true}
                                                    value={this.state.jenis_bangunan}
                                                    onChange={(e, i, v) => this.setState({ jenis_bangunan: v })}>
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
                                                    autoWidth
                                                    value={this.state.atap}
                                                    onChange={(e, i, v) => this.setState({ atap: v })}>
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
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">DINDING</span></td>
                                            <td>
                                                <SelectField
                                                    autoWidth
                                                    value={this.state.dinding}
                                                    onChange={(e, i, v) => this.setState({ dinding: v })}>
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
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">LANTAI</span></td>
                                            <td>
                                                <SelectField
                                                    autoWidth
                                                    value={this.state.lantai}
                                                    onChange={(e, i, v) => this.setState({ lantai: v })}>
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
                                                    autoWidth
                                                    value={this.state.kondisi_bangunan}
                                                    onChange={(e, i, v) => this.setState({ kondisi_bangunan: v })}>
                                                    <MenuItem value="1 - Sangat Baik" primaryText="1 - Sangat Baik" />
                                                    <MenuItem value="2 - Baik" primaryText="2 - Baik" />
                                                    <MenuItem value="3 - Sedang" primaryText="3 - Sedang" />
                                                    <MenuItem value="4 - Jelek" primaryText="4 - Jelek" />
                                                </SelectField>
                                            </td>
                                            <td width="200px"><span className="overlay">LANGIT-LANGIT</span></td>
                                            <td>
                                                <SelectField
                                                    autoWidth
                                                    value={this.state.langit_langit}
                                                    onChange={(e, i, v) => this.setState({ langit_langit: v })}>
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
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">TAHUN RENOVASI</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card>
                    </div>
                    {/* Fasilitas */}
                    <div className="body-container">
                        <Card>
                            <div className="form-section">
                                <h2>Fasilitas</h2>
                            </div>
                            <div className="form-body">
                                <table>
                                    <thead>
                                        <tr style={{paddingTop: "30px"}}>
                                            <td><span className="overlay">DAYA LISTRIK</span></td>
                                            <td width="300px"><TextField placeholder="Watt" /></td>
                                            <td width="200px"><span className="overlay">JUMLAH AC</span></td>
                                            <td className="nops">
                                                <TextField style={{ width: "41%" }} placeholder="Split" /> -
                                                <TextField style={{ width: "41%" }} placeholder="Window" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">AC CENTRAL</span></td>
                                            <td width="300px">
                                                <Checkbox
                                                    label="Tidak ada AC Central"
                                                />
                                            </td>
                                            <td width="200px"><span className="overlay">LUAS KOLAM RENANG</span></td>
                                            <td><TextField placeholder="m2" /></td>
                                        </tr>
                                        <tr style={{ paddingBottom: "30px",borderBottom: "5px solid #222" }}>
                                            <td width="300px" style={{ verticalAlign: "top" }}><span className="overlay">FINISHING KOLAM</span></td>
                                            <td width="300px" style={{ verticalAlign: "top" }}>
                                                <SelectField
                                                    value={this.state.finishing_kolam}
                                                    onChange={(e, i, v) => this.setState({ finishing_kolam: v })}>
                                                    <MenuItem value="12 - Kolam Renang Plester" primaryText="12 - Kolam Renang Plester" />
                                                    <MenuItem value="13 - Kolam Renang Pelapis" primaryText="13 - Kolam Renang Pelapis" />
                                                </SelectField>
                                            </td>
                                            <td style={{ width: "600px" }}>
                                                <span className="overlay">LUAS PERKERASAN HALAMAN</span><br />
                                                <TextField placeholder="Ringan (m2)" style={{ width: "41%" }} />
                                                <TextField placeholder="Berat (m2)" style={{ width: "41%" }} />
                                                <TextField placeholder="Sedang (m2)" style={{ width: "41%" }} />
                                                <TextField placeholder="Dg Penutup Lantai (m2)" style={{ width: "41%" }} />
                                            </td>
                                        </tr>
                                        <tr style={{paddingTop: "30px"}}>
                                            <td style={{ width: "700px" }}>
                                                <span className="overlay">JUMLAH LAPANGAN TEKNIS</span><br />
                                                <TextField placeholder="Beton (+lampu)" style={{ width: "31%" }} />
                                                <TextField placeholder="Aspal (+lampu)" style={{ width: "31%" }} />
                                                <TextField placeholder="Tanah Liat/Rumput (+lampu)" style={{ width: "31%" }} />
                                                <TextField placeholder="Beton (-lampu)" style={{ width: "31%" }} />
                                                <TextField placeholder="Aspal (-lampu)" style={{ width: "31%" }} />
                                                <TextField placeholder="Tanah Liat/Rumput (-lampu)" style={{ width: "31%" }} />
                                            </td>
                                            <td style={{ width: "600px", verticalAlign: "top" }}>
                                                <span className="overlay">JUMLAH LIFT</span><br />
                                                <TextField placeholder="Penumpang" style={{ width: "31%" }} />
                                                <TextField placeholder="Kapsul" style={{ width: "31%" }} />
                                                <TextField placeholder="Barang" style={{ width: "31%" }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "250px" }}><span className="overlay">JUMLAH TANGGA BERJALAN</span></td>
                                            <td width="300px" className="nops">
                                                <TextField placeholder="Lbr <= 0.80M" style={{ width: "41%" }} />
                                                <TextField placeholder="Lbr > 0.80M" style={{ width: "41%" }} />
                                            </td>
                                            <td width="200px"><span className="overlay">PANJANG PAGAR</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">BAHAN PAGAR</span></td>
                                            <td width="300px">
                                                <SelectField
                                                    value={this.state.bahan_pagar}
                                                    onChange={(e, i, v) => this.setState({ bahan_pagar: v })}>
                                                    <MenuItem value="35 - Pagar Besi" primaryText="35 - Pagar Besi" />
                                                    <MenuItem value="36 - Pagar Batako" primaryText="36 - Pagar Batako" />
                                                </SelectField>
                                            </td>
                                            <td width="200px"><span className="overlay">JUMLAH PABX</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                        <tr style={{ paddingBottom: "30px" }}>
                                            <td style={{ verticalAlign: "top" }}><span className="overlay">PEMADAM KEBAKARAN</span></td>
                                            <td width="300px">
                                                <Checkbox
                                                    label="Hydrant"
                                                />
                                                <Checkbox
                                                    label="Sprinkler"
                                                />
                                                <Checkbox
                                                    label="Fire Alarm"
                                                />
                                            </td>
                                            <td width="300px"><span className="overlay">KEDALAMAN SUMUR ARTESIS</span></td>
                                            <td><TextField placeholder="m" /></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </Card>
                    </div>
                    <div className="foot-container-wide">
                        <p><i className="material-icons">warning</i> Pastikan semua data yang anda masukkan sudah benar sebelum menekan tombol di bawah ini</p><br />
                        <RaisedButton
                            backgroundColor="#2ecc71"
                            labelColor="#fff"
                            label="SIMPAN"
                            icon={<i style={{ color: "#fff" }} className="material-icons">save</i>} />
                    </div>
                </Card>
            </MuiThemeProvider>
        );
    }

} 