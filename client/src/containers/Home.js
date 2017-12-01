import React from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import "../assets/css/styles.css";
import "../assets/css/grid.css";

export default class Home extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
                <Card className="container card-flat">
                    <div className="logo-container">
                        <img className="logo-image" src={require("../assets/images/logo.png")} alt="Logo" />
                    </div>
                    <hr style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#ddd", marginRight: 30, marginLeft: 30, marginTop: 20, marginBottom: 20 }} />
                    <div className="row boxes">
                        <h2 style={{ marginBottom: 20, textAlign: "center" }}>- Pilih Formulir -</h2>
                        <div className="col-md-6">
                            <Card>
                                <div className="card-header">
                                    <h3>SPOP</h3>
                                </div>
                                <div className="card-body">
                                    <img className="card-icon" alt="SPOP" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRjlCNTRDOyIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGNEEyMDA7IiBkPSJNNTEyLDI1NkwzNjkuNzc4LDExMy43NzhsLTExMi42MjgsMTc2LjdMMTQyLjIyMiwzOTguMjIyTDI1Niw1MTJDMzk3LjM4NCw1MTIsNTEyLDM5Ny4zODQsNTEyLDI1NnoiLz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0U5RUZGNDsiIHBvaW50cz0iMTkzLjY1MywxMTMuNzc4IDE0Mi4yMjIsMTY1LjIwOSAxNDIuMjIyLDM5OC4yMjIgMzY5Ljc3OCwzOTguMjIyIDM2OS43NzgsMTEzLjc3OCAiLz4KPGc+Cgk8cmVjdCB4PSIyNTUuNDMxIiB5PSIxMTMuNzc4IiBzdHlsZT0iZmlsbDojQ0ZEQkU2OyIgd2lkdGg9IjExNC4zNDciIGhlaWdodD0iMjg0LjQ0NCIvPgoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0NGREJFNjsiIHBvaW50cz0iMTkzLjY1MywxNjUuMjA5IDE5My42NTMsMTEzLjc3OCAxNDIuMjIyLDE2NS4yMDkgICIvPgo8L2c+CjxnPgoJPHJlY3QgeD0iMTcwLjY2NyIgeT0iMTk2LjUyNSIgc3R5bGU9ImZpbGw6I0QwRDFEMzsiIHdpZHRoPSIxNzAuNjY3IiBoZWlnaHQ9IjUuMTcyIi8+Cgk8cmVjdCB4PSIxNzAuNjY3IiB5PSIyMjQuOTciIHN0eWxlPSJmaWxsOiNEMEQxRDM7IiB3aWR0aD0iMTcwLjY2NyIgaGVpZ2h0PSI1LjE3MiIvPgoJPHJlY3QgeD0iMTcwLjY2NyIgeT0iMjUzLjQxNCIgc3R5bGU9ImZpbGw6I0QwRDFEMzsiIHdpZHRoPSIxNzAuNjY3IiBoZWlnaHQ9IjUuMTcyIi8+Cgk8cmVjdCB4PSIxNzAuNjY3IiB5PSIyODEuODU5IiBzdHlsZT0iZmlsbDojRDBEMUQzOyIgd2lkdGg9IjE3MC42NjciIGhlaWdodD0iNS4xNzIiLz4KCTxyZWN0IHg9IjE3MC42NjciIHk9IjMxMC4zMDMiIHN0eWxlPSJmaWxsOiNEMEQxRDM7IiB3aWR0aD0iMTcwLjY2NyIgaGVpZ2h0PSI1LjE3MiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0QwRDFEMzsiIGQ9Ik0yNzUuMTc1LDM1My45NzVjLTUuODc1LDAuNzU3LTguNjU0LTEuNzA1LTEyLjEyMi02LjA4OWMtMC43MTctMC45MDctMS4zNTItMS45Ni0yLjM0NS0yLjU4NiAgIGMtMy45MDYtMi40NjMtNy42ODksMC41OTEtMTEuMTA5LDIuNDg4Yy0zLjI4MiwxLjgyMi02LjU2NSwzLjY0My05Ljg0Nyw1LjQ2NWMtMS42NTUsMC45MTktNy4xODQsNS4wNjgtOC45MjMsNC41NDIgICBjMC4xNDcsMC4wNDUtMi43MjctMTEuNDM1LTMuNi0xMy4wMzRjLTEuMTcxLTIuMTQ1LTMuOTQ4LTEuMzAyLTQuNzI3LDAuNjE3Yy0xLjA3MiwyLjY0My0yLjE2NSw1LjUwMS0zLjc0MSw3LjkyOCAgIGMtMi45NjMsNC41NjMtOC43OTcsOC40ODItMTQuNjUsNi4xNDJjLTEuNjUxLTAuNjYtMi44MzYtMS45MDUtMy42MzYtMy40NzJjMi4yMjktMS44NjcsNC4xMy00LjIzNyw1LjQ2My02Ljk2NiAgIGMxLjk2NS00LjAyNCw0LjYxOC0xMC45NDksMi43ODgtMTUuNGMtMS42NDEtMy45OTMtNC45MzQtNC4wMi03Ljg1OC0xLjQyNGMtNS42MDEsNC45NzMtOC4wNjQsMTQuMDkzLTYuMjYsMjEuNjQ3ICAgYy0zLjYyNCwyLjEwMy03LjkzMywyLjMzNC0xMS45MS0xLjQxNGMtMi40MjItMi4yODEtNi4wODUsMS4zNjktMy42NTYsMy42NTZjNS4zMTEsNS4wMDQsMTEuODkzLDUuMjExLDE3LjQ0OSwyLjQ5MyAgIGMwLjg2MiwxLjUwMywxLjkzMywyLjg3NSwzLjI4MSw0LjAxM2MxMC4yLDguNjA3LDE5LjMwMS0wLjMyNiwyNC42MTktOS41MTljMC4yMDUsMi4wNDMsMC4yMDUsNC4wODEsMC43NDYsNi4zMiAgIGMwLjI4MSwxLjE2MiwwLjQ5LDIuMTE5LDEuMzU4LDIuOTUxYzMuNDQ0LDMuMzAzLDguNjE4LTAuNTk4LDExLjY0My0yLjI3N2MzLjc1MS0yLjA4Miw3LjUwMi00LjE2MywxMS4yNTQtNi4yNDQgICBjMy4zODEtMS44NzYsNS45NzItNC4yMzksMTAuMzg1LTEuMzg5YzAuNzQzLDAuNDc5LDEuMDIyLDEuNjkzLDEuNzI2LDIuMjMxYzQuMzA4LDMuMjg5LDguMDQsNS4yMTcsMTMuNjY3LDQuNDkxICAgQzI3OC40MywzNTguNzI2LDI3OC40NzEsMzUzLjU0OSwyNzUuMTc1LDM1My45NzV6IE0yMDIuMTA3LDMzOS42MDljMC45NDYtMS4xODgsMS4xMTctMy4xNywxLjY1OC0wLjg4NCAgIGMwLjM3MSwxLjU2NS0xLjM3NCw1LjM5Mi0xLjk5NSw2LjgxOGMtMC42NDgsMS40ODgtMS41NDUsMi45NS0yLjYxLDQuMjgyQzE5OS4xMzIsMzQ1Ljk0LDIwMC4yODMsMzQxLjg5NywyMDIuMTA3LDMzOS42MDl6Ii8+CjwvZz4KPGc+Cgk8cmVjdCB4PSIyNTUuNDMxIiB5PSIxOTYuNTI1IiBzdHlsZT0iZmlsbDojQTZBOEFBOyIgd2lkdGg9Ijg1LjkwNiIgaGVpZ2h0PSI1LjE3MiIvPgoJPHJlY3QgeD0iMjU1LjQzMSIgeT0iMjI0Ljk3IiBzdHlsZT0iZmlsbDojQTZBOEFBOyIgd2lkdGg9Ijg1LjkwNiIgaGVpZ2h0PSI1LjE3MiIvPgoJPHJlY3QgeD0iMjU1LjQzMSIgeT0iMjUzLjQxNCIgc3R5bGU9ImZpbGw6I0E2QThBQTsiIHdpZHRoPSI4NS45MDYiIGhlaWdodD0iNS4xNzIiLz4KCTxyZWN0IHg9IjI1NS40MzEiIHk9IjI4MS44NTkiIHN0eWxlPSJmaWxsOiNBNkE4QUE7IiB3aWR0aD0iODUuOTA2IiBoZWlnaHQ9IjUuMTcyIi8+Cgk8cmVjdCB4PSIyNTUuNDMxIiB5PSIzMTAuMzAzIiBzdHlsZT0iZmlsbDojQTZBOEFBOyIgd2lkdGg9Ijg1LjkwNiIgaGVpZ2h0PSI1LjE3MiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0E2QThBQTsiIGQ9Ik0yNzUuMTc1LDM1My45NzVjLTUuODc1LDAuNzU3LTguNjU0LTEuNzA1LTEyLjEyMi02LjA4OWMtMC43MTctMC45MDctMS4zNTItMS45Ni0yLjM0NS0yLjU4NiAgIGMtMS43OTUtMS4xMzEtMy41NjItMS4wOTMtNS4yODItMC41NDN2Ni4zNjNjMS4yODYtMC4xMDIsMi42OTEsMC4yMjksNC4zNTUsMS4zMDVjMC43NDMsMC40NzksMS4wMjIsMS42OTMsMS43MjYsMi4yMzEgICBjNC4zMDgsMy4yODksOC4wNCw1LjIxNywxMy42NjcsNC40OTFDMjc4LjQzLDM1OC43MjYsMjc4LjQ3MSwzNTMuNTQ5LDI3NS4xNzUsMzUzLjk3NXoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojMzI0QTVFOyIgZD0iTTMwNC4wNTIsMzM0LjIwMmwtMjMuOTU3LTE1LjMzNGw5OS42NjgtMTU1LjcyNGM0LjIzNC02LjYxNiwxMy4wMjktOC41NDcsMTkuNjQ2LTQuMzExbDAsMCAgYzYuNjE2LDQuMjM0LDguNTQ3LDEzLjAyOSw0LjMxMSwxOS42NDZMMzA0LjA1MiwzMzQuMjAyeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojMkIzQjRFOyIgZD0iTTM5OS40MDgsMTU4LjgzMkwzOTkuNDA4LDE1OC44MzJjLTAuMDcxLTAuMDQ1LTAuMTQ1LTAuMDc5LTAuMjE3LTAuMTI0TDI5MS45NTUsMzI2LjQ2MSAgbDEyLjA5Nyw3Ljc0Mmw5OS42NjgtMTU1LjcyNkM0MDcuOTU0LDE3MS44NjEsNDA2LjAyMywxNjMuMDY2LDM5OS40MDgsMTU4LjgzMnoiLz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0Y5QjU0QzsiIHBvaW50cz0iMjc2Ljc0LDM1MC40OTIgMzA0LjA1MiwzMzQuMjAyIDI4MC4wOTUsMzE4Ljg2NyAiLz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0Y0QTIwMDsiIHBvaW50cz0iMjc2Ljc3LDM1MC4yMTcgMjc2Ljc0LDM1MC40OTIgMzA0LjA1MiwzMzQuMjAyIDI5MS45NTUsMzI2LjQ1OSAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                                </div>
                                <div className="card-foot">
                                    <Link to="/spop">
                                        <RaisedButton
                                            icon={<i className="material-icons">input</i>}
                                            label="INPUT"
                                            fullWidth={true}
                                            primary={false} />
                                    </Link>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Card>
                                <div className="card-header">
                                    <h3>LSPOP</h3>
                                </div>
                                <div className="card-body">
                                    <img className="card-icon" alt="LSPOP" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojM0E5OUQ3OyIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyNjgyQkY7IiBkPSJNNTExLjE3NiwyNzguNDE5QzQ5OS44MDIsNDA5LjMwNCwzOTAuMDE3LDUxMiwyNTYuMTY1LDUxMmMtMy4xMzIsMC02LjI2NCwwLTkuMzk2LTAuMTY1ICBMMTI1LjYxLDM5MC42NzZsMjE5LjczNS0yNzguMDg5TDUxMS4xNzYsMjc4LjQxOXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRDYzMDsiIGQ9Ik0xMzYuOTg0LDEwNi45ODJjNjguOTA0LDAsMTI1LjI4LDAsMTk0LjY3OCwwYzEwLjU1LDAsMTkuMTIyLDguNTcyLDE5LjEyMiwxOS4xMjJ2MTE0LjA3MXYyNy4wMzQgIHY5NS45Mzh2OC4yNDJjMCwxMi44NTgtMTAuMzg1LDIzLjI0My0yMy4yNDMsMjMuMjQzSDEzNi45ODRjLTEwLjU1LDAtMTkuMTIyLTguNTcyLTE5LjEyMi0xOS4xMjJWMTI2LjEwNCAgQzExNy44NjIsMTE1LjU1NCwxMjYuNDM1LDEwNi45ODIsMTM2Ljk4NCwxMDYuOTgyeiIvPgo8cmVjdCB4PSIxMzAuMjIyIiB5PSIxMTguMTkxIiBzdHlsZT0iZmlsbDojRjdGN0Y4OyIgd2lkdGg9IjIwOC4xOTUiIGhlaWdodD0iMjY1LjA2OSIvPgo8Zz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0U4NEY0RjsiIGN4PSIzNjkuNzM3IiBjeT0iMzMyLjQ5MiIgcj0iNjUuNjEyIi8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRTg0RjRGOyIgZD0iTTE0Ny4yMDQsMTM5Ljk1MWgyNi44Njl2MzAuOTloLTI2Ljg2OVYxMzkuOTUxeiBNMTQ3LjIwNCwzMDYuNDQyaDI2Ljg2OXYzMC45OWgtMjYuODY5VjMwNi40NDJ6ICAgIE0xNDcuMjA0LDI1MC44OWgyNi44Njl2MzAuOTloLTI2Ljg2OVYyNTAuODl6IE0xNDcuMjA0LDE5NS4zMzhoMjYuODY5djMwLjk5aC0yNi44NjlWMTk1LjMzOHoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojOTk5OTk5OyIgZD0iTTE4Ni43NjYsMTUxLjMyNWg5MS44MTd2OC4wNzhoLTkxLjgxN0wxODYuNzY2LDE1MS4zMjVMMTg2Ljc2NiwxNTEuMzI1eiBNMTg2Ljc2NiwzMTcuODE2aDkxLjgxNyAgdjguMDc4aC05MS44MTdMMTg2Ljc2NiwzMTcuODE2TDE4Ni43NjYsMzE3LjgxNnogTTE4Ni43NjYsMjYyLjI2NGg5MS44MTd2OC4wNzhoLTkxLjgxN0wxODYuNzY2LDI2Mi4yNjRMMTg2Ljc2NiwyNjIuMjY0eiAgIE0xODYuNzY2LDIwNi43MTJoOTEuODE3djguMDc4aC05MS44MTdMMTg2Ljc2NiwyMDYuNzEyTDE4Ni43NjYsMjA2LjcxMnoiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZENjMwOyIgY3g9IjM2OS43MzciIGN5PSIzMzIuNDkyIiByPSI1NS4zOTIiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMjIuOTI2LDMzNC4zbDE3LjYzOS0xLjk3OGwxOS4xMjIsMTYuOTc5YzAsMCw5LjIzMi0zOC41NzMsNTIuNDItNDcuNjQgIGMtMjEuMSwxMS4zNzQtMzQuMTIyLDMzLjk1OC00Mi44NTksNjUuMTEzYy0yLjE0Myw3LjkxMi03LjkxMiw1Ljc2OS05LjcyNiwzLjQ2MWMtMi45NjctMy43OTItMjIuNzQ4LTI2LjM3NS0zNi41OTUtMzYuMTAxVjMzNC4zeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRTg0RjRGOyIgZD0iTTIxNS45NDMsOTAuODI4aDIuOTY3Yy0wLjgyNC0xLjMxOC0xLjMxOC0yLjk2Ny0xLjMxOC00LjYxNXYtOS44OTFjMC01LjQ0LDQuOTQ2LTkuODksMTEuMDQ0LTkuODkgIGgxMS4zNzRjNi4wOTksMCwxMS4wNDQsNC40NTEsMTEuMDQ0LDkuODl2OS44OWMwLDEuNjQ5LTAuNDk0LDMuMTMyLTEuMzE5LDQuNjE1aDIuOTY3YzIwLjI3NiwwLDM2Ljc1OSwxNS4wMDEsMzYuNzU5LDMzLjEzM2wwLDAgIEgxNzkuMDE5bDAsMGMwLTE4LjI5NywxNi42NDktMzMuMTMzLDM2Ljc1OS0zMy4xMzNoMC4xNjVWOTAuODI4eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojQzk0NTQ1OyIgZD0iTTIzNC40MDYsNjYuNDMxaDUuNzY5YzYuMDk5LDAsMTEuMDQ0LDQuNDUxLDExLjA0NCw5Ljg5djkuODljMCwxLjY0OS0wLjQ5NCwzLjEzMi0xLjMxOSw0LjYxNWgyLjk2NyAgYzIwLjI3NiwwLDM2Ljc1OSwxNS4wMDEsMzYuNzU5LDMzLjEzM2wwLDBoLTU1LjIyMkwyMzQuNDA2LDY2LjQzMUwyMzQuNDA2LDY2LjQzMXoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                                </div>
                                <div className="card-foot">
                                    <RaisedButton
                                        style={{ backgroundColor: "#ccc" }}
                                        icon={<i className="material-icons">input</i>}
                                        label="INPUT"
                                        fullWidth={true}
                                        secondary={false} />
                                </div>
                            </Card>
                        </div>
                    </div>
                    <hr style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#ddd", marginRight: 30, marginLeft: 30, marginTop: 30, marginBottom: 20 }} />
                    <div className="foot-container">
                        <p>Copyright 2017 all rights reserved</p><br />
                        <Link to="/login">Adminstrator area</Link>
                    </div>
                </Card>
            </MuiThemeProvider>
        );
    }

}
