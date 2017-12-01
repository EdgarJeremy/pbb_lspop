import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

export default class Spop extends React.Component {

    state = {
        jenis_formulir: "SPOP",
        jenis_transaksi: "Perekaman Data OP",
        pekerjaan: "1 - PNS",
        status_wp: "1 - Pemilik",
        cabang: "Cabang",
        kode_znt: null,
        jenis_tanah: "TANAH+BANGUNAN"
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
                                                    value={this.state.jenis_formulir}
                                                    onChange={(e, i, v) => this.setState({ jenis_formulir: v })}>
                                                    <MenuItem value="SPOP" primaryText="SPOP" />
                                                </SelectField>
                                            </td>
                                            <td style={{ paddingLeft: 30, paddingRight: 30 }}>
                                                <span className="overlay">JENIS TRANSAKSI</span>
                                            </td>
                                            <td>
                                                <SelectField
                                                    value={this.state.jenis_transaksi}
                                                    onChange={(e, i, v) => this.setState({ jenis_transaksi: v })}>
                                                    <MenuItem value="Perekaman Data OP" primaryText="Perekaman Data OP" />
                                                    <MenuItem value="Pemutakhiran Data OP" primaryText="Pemutakhiran Data OP" />
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
                                        <tr>
                                            <td><span className="overlay">NOP BERSAMA</span></td>
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
                                        <tr>
                                            <td><span className="overlay">NOP ASAL</span></td>
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
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">STATUS WP</span></td>
                                            <td>
                                                <SelectField
                                                    value={this.state.status_wp}
                                                    onChange={(e, i, v) => this.setState({ status_wp: v })}>
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
                                                    value={this.state.pekerjaan}
                                                    onChange={(e, i, v) => this.setState({ pekerjaan: v })}>
                                                    <MenuItem value="1 - PNS" primaryText="1 - PNS" />
                                                    <MenuItem value="2 - ABRI" primaryText="2 - ABRI" />
                                                    <MenuItem value="3 - Pensiunan" primaryText="3 - Pensiunan" />
                                                    <MenuItem value="4 - Badan" primaryText="4 - Badan" />
                                                    <MenuItem value="5 - Lainnya" primaryText="5 - Lainnya" />
                                                </SelectField>
                                            </td>
                                            <td width="200px"><span className="overlay">NAMA</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">NPWP</span></td>
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">TELEPON</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">JALAN</span></td>
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">BLOK/KAV/NO</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">RT/RW</span></td>
                                            <td width="300px" className="nops">
                                                <TextField style={{ width: "41%" }} /> /
                                                <TextField style={{ width: "41%" }} />
                                            </td>
                                            <td width="200px"><span className="overlay">KELURAHAN</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">Dati II</span></td>
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">KODEPOS</span></td>
                                            <td><TextField /></td>
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
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">JALAN</span></td>
                                            <td><TextField /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">BLOK/KAV/NO</span></td>
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">CABANG</span></td>
                                            <td>
                                                <SelectField
                                                    value={this.state.cabang}
                                                    onChange={(e, i, v) => this.setState({ cabang: v })}>
                                                    <MenuItem value="Cabang" primaryText="Cabang" />
                                                    <MenuItem value="Bukan Cabang" primaryText="Bukan Cabang" />
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">RT/RW</span></td>
                                            <td width="300px" className="nops">
                                                <TextField style={{ width: "41%" }} /> /
                                                <TextField style={{ width: "41%" }} />
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
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">KODE ZNT</span></td>
                                            <td>
                                                <SelectField
                                                    value={this.state.kode_znt}
                                                    onChange={(e, i, v) => this.setState({ kode_znt: v })}>
                                                </SelectField>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className="overlay">JUMLAH BANGUNAN</span></td>
                                            <td width="300px"><TextField /></td>
                                            <td width="200px"><span className="overlay">JENIS TANAH</span></td>
                                            <td>
                                                <SelectField
                                                    value={this.state.jenis_tanah}
                                                    onChange={(e, i, v) => this.setState({ jenis_tanah: v })}>
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
                    <div className="foot-container-wide">
                        <p><i className="material-icons">warning</i> Pastikan semua data yang anda masukkan sudah benar sebelum menekan tombol di bawah ini</p><br />
                        <RaisedButton
                            backgroundColor="#2ecc71"
                            labelColor="#fff"
                            label="SIMPAN"
                            icon={<i style={{color: "#fff"}} className="material-icons">save</i>}/>
                    </div>
                </Card>
            </MuiThemeProvider>
        );
    }

} 