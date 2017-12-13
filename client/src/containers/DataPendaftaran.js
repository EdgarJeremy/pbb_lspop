import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";
import { Link, Redirect } from "react-router-dom";
import LinearProgress from "material-ui/LinearProgress";
import LoadingScreen from "../components/LoadingScreen";

import Api from "../services/Api";

export default class DataPendaftaran extends React.Component {

    state = {
        ready: false,
        pendaftaran: null,
        raw: null
    }

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
        file_izin_mendirikan_bangunan: "File Izin Mendirikan Bangunan"
    }

    constructor(props) {
        super(props);
    }

    cekData() {
        Api.cek_status({ jenis_surat: this.props.match.params.jenis_surat, nomor_pendaftaran: this.props.match.params.nomor_pendaftaran })
            .then((response) => {
                if (response.status) {
                    const pendaftaran = [];
                    for (let data in response.data) {
                        if (response.data.hasOwnProperty(data)) {
                            pendaftaran.push({ key: data, value: response.data[data] });
                        }
                    }
                    console.log(pendaftaran);
                    this.setState({
                        ready: true,
                        pendaftaran: pendaftaran,
                        raw: response.data
                    });
                } else {
                    this.setState({
                        ready: true,
                        pendaftaran: null
                    });
                }
            }).catch(err => console.log(err));
    }

    componentWillMount() {
        this.cekData();
    }

    open_attach(nama) {

    }

    render() {
        if (this.state.ready) {
            if (this.state.pendaftaran) {
                return (
                    <MuiThemeProvider>
                        <Card className="container card-flat">
                            <Table>
                                <TableBody showRowHover displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn>
                                            <h2>{this.props.match.params.nomor_pendaftaran}</h2>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            {this.state.raw.approved === 0 ? 
                                                <span className="overlay" style={{backgroundColor: "#e74c3c"}}>BELUM DI APPROVE</span> : 
                                                <span className="overlay" style={{backgroundColor: "#2ecc71"}}>SUDAH DI APPROVE</span>}
                                        </TableRowColumn>
                                    </TableRow>
                                    {this.state.pendaftaran.map((data, i) => (
                                        <TableRow key={i}>
                                            <TableRowColumn><b>{this.model[data.key]}</b></TableRowColumn>
                                            <TableRowColumn>{
                                                (/file_/.test(data.key) && data.value != null) ?
                                                    <div><RaisedButton label="Buka" onClick={() => this.open_attach(data.value)} /></div> :
                                                    data.value
                                            }</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </MuiThemeProvider>
                );
            } else {
                return (<Redirect to="/cek_status" />);
            }
        } else {
            return (
                <MuiThemeProvider>
                    <LoadingScreen fromTop="150px" />
                </MuiThemeProvider>
            )
        }
    }

}