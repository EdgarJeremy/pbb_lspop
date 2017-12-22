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
import config from "../../config.js";
import { Link } from "react-router-dom";

import FormEditSpop from "../../components/FormEditSpop";

const dialogStyle = {
    dialogRoot: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 0
    },
    dialogContent: {
        position: "relative",
        width: "80vw",
        transform: "",
    },
    dialogBody: {
        paddingBottom: 0
    }
};

export default class DaftarSpop extends React.Component {

    state = {
        params: {
            limit: 10,
            offset: 0
        },
        spops: [],
        spop_count: 0,
        page_count: 0,
        ready: false,
        detail_popup: false,
        selected_spop_data: [],
        selected_spop_object: {},
        attach_popup: false,
        attach_file: ""
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
        file_izin_mendirikan_bangunan: "File Izin Mendirikan Bangunan",
        tanggal_pendaftaran: "Tanggal Pendaftaran",
        nomor_pendaftaran: "Nomor Pendaftaran"
    }

    constructor(props) {
        super(props);
        this.match = props.match;
        this.ubah_page = this.ubah_page.bind(this);
    }

    componentWillMount() {
        this.ambil_spop();
    }

    ambil_spop() {
        let params = this.state.params;
        params.approved = this.props.approved;
        AdminApi.ambil_spop(params).then((response) => {
            if (response.status) {
                this.setState({
                    ready: true,
                    spop_count: response.data.total,
                    page_count: Math.ceil(response.data.total / this.state.params.limit),
                    spops: response.data.spops
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
            this.ambil_spop();
        });
    }

    open_detail(spop) {
        const selected_spop_data = [];
        const selected_spop_object = {...spop};

        for (let data in spop) {
            if (spop.hasOwnProperty(data) && data !== "id_spop" && data !== "approved") {
                selected_spop_data.push({ key: data, value: spop[data] });
            }
        }
        selected_spop_object.nop = selected_spop_object.nop.split(".");
        selected_spop_object.nop_bersama = selected_spop_object.nop_bersama.split(".");
        selected_spop_object.nop_asal = selected_spop_object.nop_asal.split(".");
        
        this.setState({ detail_popup: true, selected_spop_object, selected_spop_data });
    }

    open_attach(name) {
        console.log(name);
        this.setState({ attach_popup: true, attach_file: `${config.api_base_url}/api/uploads/${name}` });
    }

    componentDidUpdate() {
        this.Alert = this.refs.Alert;
    }

    approve_spop_prompt(id) {
        this.Alert.setButtons([
            <FlatButton
                label="BATAL"
                primary={true}
                onClick={() => this.Alert.close()}
            />,
            <FlatButton
                label="YA"
                onClick={() => this.approve_spop(id)}
            />
        ]).setTitle("Konfirmasi Approve")
            .setMessage("Apa anda yakin ingin approve?")
            .open();
    }

    approve_spop(id) {
        console.log(id);
        AdminApi.approve_spop(id).then((response) => {
            this.Alert.setButtons([]).cancelable(true)
                .setTitle("Approve berhasil")
                .setMessage("Data berhasil diapprove")
                .open();
            this.ambil_spop();
        }).catch((err) => {
            this.Alert.setButtons([]).cancelable(true)
                .setTitle("Approve gagal")
                .setMessage(JSON.stringify(err))
                .open();
        });
    }

    render() {
        return (
            <div>
                <div className="content-head">
                    <div className="left">
                        <h2 className="content-title">SPOP {(this.props.approved) ? "Terverifikasi" : "Masuk"}</h2>
                    </div>
                    <div className="right">
                        <Link to={`${this.match.path}/tambah`}>
                            <RaisedButton
                                icon={<i style={{ color: "#fff" }} className="material-icons">add_circle</i>}
                                label="TAMBAH"
                                backgroundColor="#3498db"
                                labelColor="#fff" />
                        </Link>
                    </div>
                </div>
                <div className="content">
                    {
                        (!this.state.ready) ? <LoadingScreen color="#222" /> :
                            <div>
                                <Table>
                                    <TableHeader adjustForCheckbox={false} className="content-table-header" displaySelectAll={false}>
                                        <TableRow>
                                            {/* <TableHeaderColumn>NO</TableHeaderColumn> */}
                                            <TableHeaderColumn>NOP</TableHeaderColumn>
                                            <TableHeaderColumn>NAMA WP</TableHeaderColumn>
                                            <TableHeaderColumn>JALAN OP</TableHeaderColumn>
                                            <TableHeaderColumn>RT/RW</TableHeaderColumn>
                                            <TableHeaderColumn>OPSI</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody showRowHover displayRowCheckbox={false}>
                                        {this.state.spops.map((spop, i) => (
                                            <TableRow key={i}>
                                                {/* <TableRowColumn>{i + 1}</TableRowColumn> */}
                                                <TableRowColumn>{spop.nop.split(".").join("")}</TableRowColumn>
                                                <TableRowColumn>{spop.nama.toUpperCase()}</TableRowColumn>
                                                <TableRowColumn>{spop.jalan_op.toUpperCase()}</TableRowColumn>
                                                <TableRowColumn>{`${spop.rt}/${spop.rw}`}</TableRowColumn>
                                                <TableRowColumn>
                                                    <RaisedButton
                                                        onClick={(index) => this.open_detail(spop)}
                                                        labelPosition="before"
                                                        icon={<i className="material-icons">open_in_new</i>}
                                                    />
                                                    {
                                                        (this.props.approved === 0) &&
                                                        <RaisedButton
                                                            onClick={() => this.approve_spop_prompt(spop.id_spop)}
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
                                {/* Data dialog */}
                                <Dialog
                                    contentStyle={{maxWidth: "2000px"}}
                                    autoScrollBodyContent={true}
                                    title={<div>Data SPOP <b>{this.state.selected_spop_object.nomor_pendaftaran}</b></div>}
                                    actions={[
                                        <FlatButton label="SIMPAN" onClick={() => this.refs.FormEditSpop.onSubmit()} />,
                                        <FlatButton label="TUTUP" onClick={() => this.setState({ detail_popup: false })} />
                                    ]}
                                    modal={false}
                                    open={this.state.detail_popup}>
                                    <FormEditSpop form_data={this.state.selected_spop_object} update_data={this.ambil_spop.bind(this)} ref="FormEditSpop" />
                                    {/* <Table>
                                        <TableBody showRowHover displayRowCheckbox={false}>
                                            {this.state.selected_spop_data.map((data, i) => (
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
                                    </Table> */}
                                </Dialog>
                                {/* Attachment dialog */}
                                <Dialog
                                    contentStyle={dialogStyle.dialogContent}
                                    bodyStyle={dialogStyle.dialogBody}
                                    style={dialogStyle.dialogRoot}
                                    autoScrollBodyContent={true}
                                    repositionOnUpdate={false}
                                    title="Attachment"
                                    actions={[
                                        <FlatButton label="TUTUP" onClick={() => this.setState({ attach_popup: false })} />,
                                        <FlatButton label="BUKA WINDOW BARU" onClick={() => window.open(this.state.attach_file)} />
                                    ]}
                                    modal={false}
                                    open={this.state.attach_popup}>
                                    {
                                        (/.pdf/.test(this.state.attach_file)) ?
                                            <iframe style={{ width: "100%", height: "400px" }} src={`http://docs.google.com/gview?url=${this.state.attach_file}&embedded=true`} title={this.state.attach_file} /> :
                                            <img alt={this.state.attach_file} src={this.state.attach_file} />
                                    }
                                </Dialog>
                                <Alert ref="Alert" />
                            </div>
                    }
                </div>
            </div>
        );
    }

}