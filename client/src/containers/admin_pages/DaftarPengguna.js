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
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Toggle from 'material-ui/Toggle';


export default class DaftarSpop extends React.Component {

    state = {
        params: {
            limit: 10,
            offset: 0
        },
        penggunas: [],
        pengguna_count: 0,
        page_count: 0,
        ready: false,
        detail_popup: false,
        selected_pengguna_data: [],
        tambah_popup: false,
        pengguna_baru: {},
        pengguna_baru_error_fields: {}
    }

    model = {
        id_pengguna: "ID",
        nama: "Nama",
        username: "Username",
        level: "Level",
        aktif: "Status"
    }

    constructor(props) {
        super(props);
        this.ubah_page = this.ubah_page.bind(this);
        this.simpan_pengguna = this.simpan_pengguna.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.clearError = this.clearError.bind(this);
        this.clearErrorSelect = this.clearErrorSelect.bind(this);
    }

    componentWillMount() {
        this.ambil_pengguna();
    }

    ambil_pengguna() {
        let params = this.state.params;
        AdminApi.ambil_pengguna(params).then((response) => {
            console.log(response);
            if (response.status) {
                this.setState({
                    ready: true,
                    pengguna_count: response.data.total,
                    page_count: Math.ceil(response.data.total / this.state.params.limit),
                    penggunas: response.data
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
            this.ambil_pengguna();
        });
    }

    open_detail(pengguna) {
        const selected_pengguna_data = [];
        for (let data in pengguna) {
            if (pengguna.hasOwnProperty(data)) {
                selected_pengguna_data.push({ key: data, value: pengguna[data] });
            }
        }

        this.setState({ detail_popup: true, selected_pengguna_data });
    }

    simpan_pengguna() {
        console.log(this.state.pengguna_baru);
        AdminApi.simpan_pengguna(this.state.pengguna_baru).then((response) => {
            console.log(response);
            if (response.status === true) {
                this.Alert.cancelable(true).setTitle("Berhasil").setMessage("Pengguna berhasil ditambah di sistem").open();
                this.setState({tambah_popup: false});
                this.ambil_pengguna();
            } else if (response.status === "ERRORFIELDS") {
                const { pengguna_baru_error_fields } = this.state;
                for (let i = 0; i < response.fields.length; i++) {
                    if (response.fields[i] === "r_password") {
                        pengguna_baru_error_fields[response.fields[i]] = `Password tidak cocok`;
                    } else {
                        pengguna_baru_error_fields[response.fields[i]] = `Harus diisi`;
                    }
                }
                this.setState({ pengguna_baru_error_fields });
            } else {
                console.log(response.message);
            }
        }).catch((err) => console.log(err));
    }

    onChangeText(e, v) {
        const { pengguna_baru } = this.state;
        pengguna_baru[e.target.name] = v;
        this.setState({ pengguna_baru });
    }

    onChangeSelect(name) {
        return (e, i, v) => {

            console.log(v);
            const { pengguna_baru } = this.state;
            pengguna_baru[name] = v;
            this.setState({ pengguna_baru });
        }
    }

    onToggle(e, n) {
        const { pengguna_baru } = this.state;
        pengguna_baru.aktif = n;
        this.setState({ pengguna_baru });
    }

    clearErrorSelect(name) {
        const { pengguna_baru_error_fields } = this.state;
        pengguna_baru_error_fields[name] = undefined;
        this.setState({ pengguna_baru_error_fields });
    }

    clearError(e) {
        const { pengguna_baru_error_fields } = this.state;
        pengguna_baru_error_fields[e.target.name] = undefined;
        this.setState({ pengguna_baru_error_fields });
    }

    componentDidUpdate() {
        this.Alert = this.refs.Alert;
    }

    render() {
        return (
            <div>
                <div className="content-head">
                    <div className="left">
                        <h2 className="content-title">PENGGUNA</h2>
                    </div>
                    <div className="right">
                        <RaisedButton
                            onClick={() => this.setState({ tambah_popup: true })}
                            icon={<i style={{ color: "#fff" }} className="material-icons">add_circle</i>}
                            label="TAMBAH"
                            backgroundColor="#3498db"
                            labelColor="#fff" />
                    </div>
                </div>
                <div className="content">
                    {
                        (!this.state.ready) ? <LoadingScreen color="#222" /> :
                            <div>
                                <Table>
                                    <TableHeader adjustForCheckbox={false} className="content-table-header" displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn>NO</TableHeaderColumn>
                                            <TableHeaderColumn>NAMA</TableHeaderColumn>
                                            <TableHeaderColumn>LEVEL</TableHeaderColumn>
                                            <TableHeaderColumn>STATUS</TableHeaderColumn>
                                            <TableHeaderColumn>OPSI</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody showRowHover displayRowCheckbox={false}>
                                        {this.state.penggunas.map((pengguna, i) => (
                                            <TableRow key={i}>
                                                <TableRowColumn>{i + 1}</TableRowColumn>
                                                <TableRowColumn>{pengguna.nama.toUpperCase()}</TableRowColumn>
                                                <TableRowColumn>{pengguna.level.toUpperCase()}</TableRowColumn>
                                                <TableRowColumn>{pengguna.aktif === 0 ? "TERKUNCI" : "AKTIF"}</TableRowColumn>
                                                <TableRowColumn>
                                                    <RaisedButton
                                                        onClick={(index) => this.open_detail(pengguna)}
                                                        labelPosition="before"
                                                        icon={<i className="material-icons">open_in_new</i>}
                                                    />
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
                                    title="Data Pengguna"
                                    actions={[
                                        <FlatButton label="TUTUP" onClick={() => this.setState({ detail_popup: false })} />
                                    ]}
                                    modal={false}
                                    open={this.state.detail_popup}>
                                    <Table>
                                        <TableBody showRowHover displayRowCheckbox={false}>
                                            {this.state.selected_pengguna_data.map((data, i) => (
                                                <TableRow key={i}>
                                                    <TableRowColumn><b>{this.model[data.key]}</b></TableRowColumn>
                                                    <TableRowColumn>{
                                                        (data.key === "aktif") ?
                                                            (data.value === 0 ? "Terkunci" : "Aktif") : data.value
                                                    }</TableRowColumn>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Dialog>
                                <Dialog
                                    autoScrollBodyContent={true}
                                    title="Tambah Pengguna"
                                    actions={[
                                        <FlatButton label="TUTUP" onClick={() => this.setState({ tambah_popup: false })} />,
                                        <FlatButton label="SIMPAN" onClick={this.simpan_pengguna} />
                                    ]}
                                    modal={false}
                                    open={this.state.tambah_popup}>
                                    <Table>
                                        <TableBody showRowHover displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn><b>Nama</b></TableRowColumn>
                                                <TableRowColumn><TextField onFocus={this.clearError} errorText={this.state.pengguna_baru_error_fields.nama} name="nama" onChange={this.onChangeText} /></TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn><b>Username</b></TableRowColumn>
                                                <TableRowColumn><TextField onFocus={this.clearError} errorText={this.state.pengguna_baru_error_fields.username} name="username" onChange={this.onChangeText} /></TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn><b>Password</b></TableRowColumn>
                                                <TableRowColumn><TextField onFocus={this.clearError} errorText={this.state.pengguna_baru_error_fields.password} name="password" onChange={this.onChangeText} type="password" /></TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn><b>Ketik Ulang Password</b></TableRowColumn>
                                                <TableRowColumn><TextField onFocus={this.clearError} errorText={this.state.pengguna_baru_error_fields.r_password} name="r_password" onChange={this.onChangeText} type="password" /></TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn><b>Level</b></TableRowColumn>
                                                <TableRowColumn>
                                                    <SelectField onClick={() => this.clearErrorSelect("level")} errorText={this.state.pengguna_baru_error_fields.level} value={this.state.pengguna_baru.level} onChange={this.onChangeSelect("level")}>
                                                        <MenuItem value="admin" primaryText="Administrator" />
                                                        <MenuItem value="operator" primaryText="General User" />
                                                    </SelectField>
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn><b>Status</b></TableRowColumn>
                                                <TableRowColumn><Toggle onToggle={this.onToggle} toggled={this.state.pengguna_baru.aktif} /></TableRowColumn>
                                            </TableRow>
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