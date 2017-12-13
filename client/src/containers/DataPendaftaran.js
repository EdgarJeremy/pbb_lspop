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

    model_spop = {
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
        approved: "Approved",
        tanggal_pendaftaran: "Tanggal Pendaftaran",
        nomor_pendaftaran: "Nomor Pendaftaran"
    }

    model_lspop = {
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
        pemadam_kebakaran_sprinkler: "Sprinkler",
        approved: "Approved",
        tanggal_pendaftaran: "Tanggal Pendaftaran",
        nomor_pendaftaran: "Nomor Pendaftaran"
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
        let model = (this.props.match.params.jenis_surat === "spop") ? this.model_spop : this.model_lspop;
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
                                            <TableRowColumn><b>{model[data.key]}</b></TableRowColumn>
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