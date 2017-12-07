import React from "react";
import AdminApi from "../../services/AdminApi";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import ReactPaginate from 'react-paginate';
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import LoadingScreen from "../../components/LoadingScreen";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Alert from "../../components/Alert";

export default class DaftarLspop extends React.Component {

    state = {
        params: {
            limit: 10,
            offset: 0
        },
        lspops: [],
        lspop_count: 0,
        page_count: 0,
        ready: false,
        detail_popup: false,
        selected_lspop_data: [],
        attach_popup: false,
        attach_file: ""
    }

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

    constructor(props) {
        super(props);
        this.ubah_page = this.ubah_page.bind(this);
    }

    componentWillMount() {
        this.ambil_lspop();
    }

    ambil_lspop() {
        let params = this.state.params;
        params.approved = this.props.approved;
        AdminApi.ambil_lspop(params).then((response) => {
            if (response.status) {
                this.setState({
                    ready: true,
                    spop_count: response.data.total,
                    page_count: Math.ceil(response.data.total / this.state.params.limit),
                    lspops: response.data.lspops
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    ubah_page(e) {
        const { params } = this.state;
        params.offset = Math.ceil(e.selected * params.limit);
        this.setState({ params }, () => {
            this.ambil_lspop();
        });
    }

    open_detail(lspop) {
        const selected_lspop_data = [];
        for (let data in lspop) {
            if (lspop.hasOwnProperty(data) && data !== "id_spop" && data !== "approved") {
                selected_lspop_data.push({ key: data, value: lspop[data] });
            }
        }

        this.setState({ detail_popup: true, selected_lspop_data });
    }

    componentDidUpdate() {
        this.Alert = this.refs.Alert;
    }

    approve_lspop_prompt(id) {
        this.Alert.setButtons([
            <FlatButton
                label="BATAL"
                primary={true}
                onClick={() => this.Alert.close()}
            />,
            <FlatButton
                label="YA"
                onClick={() => this.approve_lspop(id)}
            />
        ]).setTitle("Konfirmasi Approve")
            .setMessage("Apa anda yakin ingin approve?")
            .open();
    }

    approve_lspop(id) {
        console.log(id);
        AdminApi.approve_lspop(id).then((response) => {
            this.Alert.setButtons([]).cancelable(true)
                .setTitle("Approve berhasil")
                .setMessage("Data berhasil diapprove")
                .open();
            this.ambil_lspop();
        }).catch((err) => {
            this.Alert.setButtons([]).cancelable(true)
                .setTitle("Approve gagal")
                .setMessage(JSON.stringify(err))
                .open();
        })
    }

    render() {
        return (
            <div>
                <h2 className="content-title">LSPOP Masuk</h2>
                <div className="content">
                    {
                        (!this.state.ready) ? <LoadingScreen color="#222" /> :
                            <div>
                                <Table>
                                    <TableHeader adjustForCheckbox={false} className="content-table-header" displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn>NO</TableHeaderColumn>
                                            <TableHeaderColumn>NOP</TableHeaderColumn>
                                            <TableHeaderColumn>JENIS TRANSAKSI</TableHeaderColumn>
                                            <TableHeaderColumn>OPSI</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody showRowHover displayRowCheckbox={false}>
                                        {this.state.lspops.map((lspop, i) => (
                                            <TableRow key={i}>
                                                <TableRowColumn>{i + 1}</TableRowColumn>
                                                <TableRowColumn>{lspop.nop}</TableRowColumn>
                                                <TableRowColumn>{`${lspop.jenis_transaksi}`}</TableRowColumn>
                                                <TableRowColumn>
                                                    <RaisedButton
                                                        onClick={(index) => this.open_detail(lspop)}
                                                        labelPosition="before"
                                                        icon={<i className="material-icons">open_in_new</i>}
                                                    />
                                                    {
                                                        (this.props.approved === 0) &&
                                                        <RaisedButton
                                                            onClick={() => this.approve_lspop_prompt(lspop.id_lspop)}
                                                            primary
                                                            labelPosition="before"
                                                            icon={<i style={{ color: "#fff" }} className="material-icons">check_circle</i>}
                                                        />
                                                    }
                                                </TableRowColumn>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <ReactPaginate previousLabel={"Sebelum"}
                                    nextLabel={"Lanjut"}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.page_count}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.ubah_page}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                                <Divider />
                                <Dialog
                                    autoScrollBodyContent={true}
                                    title="Data LSPOP"
                                    actions={[
                                        <FlatButton label="TUTUP" onClick={() => this.setState({ detail_popup: false })} />
                                    ]}
                                    modal={false}
                                    open={this.state.detail_popup}>
                                    <Table>
                                        <TableBody showRowHover displayRowCheckbox={false}>
                                            {this.state.selected_lspop_data.map((data, i) => (
                                                <TableRow key={i}>
                                                    <TableRowColumn><b>{this.model[data.key]}</b></TableRowColumn>
                                                    <TableRowColumn>{
                                                        data.value
                                                    }</TableRowColumn>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Dialog>
                                <Alert ref="Alert" />
                            </div>
                    }
                </div>
            </div>
        );
    }

}