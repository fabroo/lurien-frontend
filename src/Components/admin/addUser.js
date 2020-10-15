import React, { Component } from 'react'
import AuthService from '../../Services/AuthService';
import swal from 'sweetalert';
import '../../styles/add-user.css'
import Admin from '../../images/admin1.svg'
import Profile from '../../images/profile1.svg'
export default class addUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role: "admin",
            dni: 0,
            companyid: this.props.companyid,
            manager: false,

        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        console.log(this.state)
    }

    handleRole = (e) => {
        if (e.target.name == "manager") {
            this.setState({ manager: true })
        } else {
            this.setState({ manager: false })

        }
    }
    registrarNuevo = async () => {
        const dni = this.state.dni;
        const role = this.state.role;
        const username = String(dni); //until the user creates his account the username will be his DNI
        const companyid = this.state.companyid


        await AuthService.registerNew({ dni: dni, companyID: companyid, role: role, username: username, companyid: companyid }).then(res => {
            console.log(res)
        }, [])
    }
    render() {
        return (
            <div className="arriba d-flex flex-row-reverse">

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" style={{ color: "white" }}>&times;</span>
                                </button>
                            </div>
                            <p className="dni-text">DNI de la persona</p>
                            <div className="modal-body">
                                <input
                                    type="number"
                                    placeholder="User's DNI"
                                    required
                                    name="dni"
                                    className="unpit-dni-user"
                                    value={this.state.dni}
                                    onChange={(e) => this.handleChange(e)} />
                                <br />
                            <p className="dni-text">Seleccione el rol de la persona</p>

                                <div className="categoria-admin">
                                    <div name="manager" className="opeciones option1" style={this.state.manager ? { backgroundColor: "#535353" } : { backgroundColor: "#1E1E1E" }} onClick={(e) => this.handleRole(e)}>
                                        <div className="inside" name="manager">
                                            <img className="op-img" name="manager" src={Admin} alt="Manager" />
                                            <p className="op-p" name="manager">Manager</p>
                                        </div>
                                    </div>
                                    <div name="user" className="opeciones option2" style={!this.state.manager ? { backgroundColor: "#535353" } : { backgroundColor: "#1E1E1E" }} onClick={(e) => this.handleRole(e)}>
                                        <div name="user" className="inside">
                                            <img name="user" className="op-img" src={Profile} alt="User" />
                                            <p name="user" className="op-p">User</p>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <p className="dni-text">Area</p>
                                <div className="modal-body">
                                <select name="role" className="unpit-email-user" onChange={(e) => this.handleChange(e)} value={this.state.role}>
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                                </div>
                                <br/>
                                <p className="dni-text">E-Mail</p>
                                <div className="modal-body">
                                    <input
                                        type="number"
                                        placeholder="User's DNI"
                                        required
                                        name="dni"
                                        className="unpit-email-user"
                                        value={this.state.dni}
                                        onChange={(e) => this.handleChange(e)} />
                                </div>
                               
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.registrarNuevo()}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
