import React, { Component } from 'react'
import AuthService from '../../Services/AuthService';
import '../../styles/add-user.css'
import Admin from '../../images/admin1.svg'
import Profile from '../../images/profile1.svg'
import axios from 'axios'
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/storage";
export default class addUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role: "",
            mail: "",
            dni: 0,
            user: this.props.user,
            manager: false,
            areas: [],
            areaUser: "",
            companyid:"1a2b3c"
        }
    }
    async componentDidMount() {
        let array = [];
        array = await axios.get(`http://192.168.1.126:8080/api/user/retrieveArea/${this.state.companyid}`)
        array = array.data.message.msgBody
        this.setState({ areas: array })
        console.log("[USER[",this.state.user)
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRole = (e) => {
        if (e.target.name === "manager") {
            this.setState({ manager: true })
        } else {
            this.setState({ manager: false })

        }
    }
    registrarNuevo = async () => {
        const dni = this.state.dni;
        const mail = this.state.mail;
        const { companyID } = this.state.user
        const manArea = this.state.user.role !== "manager" ? this.state.role : null;
        const area = this.state.manager ? null : this.state.user.manArea
        const role = this.state.manager ? "manager" : "user"
        
        await AuthService.registerNew({ dni, companyID, manArea, area, mail, role }).then(res => {
            firebase.storage().ref()
            alert("usuario creado ahcer alo mas")
        }, [])
    }
    render() {
        return (
            <>
                <div className="arriba d-flex flex-row-reverse">

                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" style={{ color: "white" }}>&times;</span>
                                    </button>
                                </div>
                                <p className="dni-text">DNI del Usuario</p>
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
                                        {this.state.user.role !== "manager" ? (
                                            <div name="manager" className="opeciones option1" style={this.state.manager ? { backgroundColor: "#535353" } : { backgroundColor: "#1E1E1E" }} onClick={(e) => this.handleRole(e)}>
                                                <div className="inside" name="manager">
                                                    <img className="op-img" name="manager" src={Admin} alt="Manager" />
                                                    <p className="op-p" name="manager">Manager</p>
                                                </div>
                                            </div>
                                        ) : (null)}
                                        <div name="user" className="opeciones option2" style={!this.state.manager ? { backgroundColor: "#535353" } : { backgroundColor: "#1E1E1E" }} onClick={(e) => this.handleRole(e)}>
                                            <div name="user" className="inside">
                                                <img name="user" className="op-img" src={Profile} alt="User" />
                                                <p name="user" className="op-p">User</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <p className="dni-text">Area</p>
                                    <div className="modal-body">
                                        <select name={this.state.manager ? "role" : "areaUser"} className="unpit-email-user" onChange={(e) => this.handleChange(e)} value={this.state.role} defaultValue={this.state.areas[0]}>
                                           {this.state.user.manArea === null ? (
                                                this.state.areas.length > 0 ? (
                                                    this.state.areas.map(area =>
                                                        <option key={area} value={area}>{area}</option>
                                                    )
                                                ) : (null)
                                           ) : (
                                            <option  key={this.state.user.manArea} value={this.state.user.manArea}>{this.state.user.manArea}</option>

                                           )}
                                        </select>
                                    </div>
                                    <br />
                                    <p className="dni-text">E-Mail</p>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            placeholder="User's Mail"
                                            required
                                            name="mail"
                                            className="unpit-email-user"
                                            value={this.state.mail}
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

            </>
        )
    }
}
