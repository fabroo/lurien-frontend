import React, { Component } from 'react'
import AuthService from '../../Services/AuthService';
import swal from 'sweetalert';
import '../../styles/admin.css'
import No from '../../images/no.svg'
import Eliminar from '../../images/no-rojo.svg'
import Si from '../../images/si.svg'

export default class Tabla_mod extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contenido: null,
            loading: true,
            search: "",
            role: "user",
            username: "",
            dni: 0

        }
    }
    componentDidMount() {
        AuthService.getMod().then(res => {
            var contenido = res.data.sort(function (a, b) {
                if (a.companyID < b.companyID) { return -1; }
                if (a.companyID > b.companyID) { return 1; }
                return 0;
            })
            this.setState({ contenido });
            this.setState({ loading: false })
        }, [])
    }


    chau = (dni) => {
        swal("Estas seguro de ello? No podras volver atrás", {
            buttons: {
                cancel: "Cancelar",
                catch: {
                    text: "Eliminar",
                    value: "borrar",
                }
            },
        })
            .then((value) => {
                switch (value) {

                    case "borrar":
                        swal("Eliminado", "El trabajador no forma mas parte de la empresa", "success");
                        AuthService.removeUser(dni).then(res => {
                            this.showData()
                        }, [])
                        break;

                    default:

                }
            });
    }
    registrarNuevo = async () => {
        const dni = this.state.dni;
        const role = this.state.role;
        const username = String(dni);
        const companyid = this.state.companyid;

        await AuthService.registerNew({ dni: dni, companyID: companyid, role: role, username: username, companyid: companyid }).then(res => {
            // console.log(res)
        }, [])

        this.showData()

    }
    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
        // console.log(this.state)
    }
    showData = () => {

        AuthService.getMod().then(res => {

            this.setState({
                contenido: res.data.sort(function (a, b) {
                    if (a.companyID < b.companyID) { return -1; }
                    if (a.companyID > b.companyID) { return 1; }
                    return 0;
                })
            });
        }, [])
    }


    render() {
        return (
            <div className="container" onClick={() => {
                if (this.state.open2) {
                    this.setState({ open: false })
                }
            }}>
                 <button type="button" className="btn btn-info m-2 " data-toggle="modal" data-target="#exampleModalCenter"> +</button>
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">New User</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="number"
                                        placeholder="User's DNI"
                                        required
                                        name="dni"
                                        className="form-control form-control-lg"
                                        value={this.state.dni}
                                        onChange={(e) => this.handleChange(e)} />
                                    <br /><br />
                                    <input
                                        type="text"
                                        placeholder="User's companyid"
                                        required
                                        name="companyid"
                                        className="form-control form-control-lg"
                                        value={this.state.companyid}
                                        onChange={(e) => this.handleChange(e)} />
                                    <br /><br />
                                    <select name="role" className="form-control form-control-lg" onChange={(e) =>this.handleChange(e)} value={this.state.role}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.registrarNuevo()}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <br/>
                <br/>
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">New User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="arriba d-flex flex-row-reverse">

                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">New User</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="number"
                                        placeholder="User's DNI"
                                        required
                                        name="dni"
                                        className="form-control form-control-lg"
                                        value={this.state.dni}
                                        onChange={(e) => this.handleChange(e)} />
                                    <br /><br />

                                    <input
                                        type="text"
                                        placeholder="User's companyid"
                                        required
                                        name="companyid"
                                        className="form-control form-control-lg"
                                        value={this.state.companyid}
                                        onChange={(e) => this.handleChange(e)} />
                                    <br /><br />

                                    <select name="role" className="form-control form-control-lg" onChange={(e) => this.handleChange(e)} value={this.state.role}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.registrarNuevo()}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!this.state.loading ? (
                    <div>
                        <table className="tabla-admin table table-hover text-center table-responsive-lg">
                            <thead className="thead thead-style">
                                <tr>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>E-Mail</th>
                                    <th>Modelo Entrenado</th>
                                    <th>Profile Picture</th>
                                    <th>Rol</th>
                                    <th>Fotos</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.contenido ? (
                                    this.state.contenido.map(user =>
                                        <tr key={user._id}>

                                            <td>{!user.createdAccount ? (<p>No registrado</p>) : (<p>{user.username}</p>)}</td>
                                            <td ><p>{user.dni}</p></td>
                                            <td>{user.createdAccount ? (<p><a rel="noopener noreferrer" href={"https://mail.google.com/mail/u/0/?view=cm&fs=1&to=" + user.mail + "&tf=1"} target="_blank">{user.mail}</a></p>) : (<p>No creada</p>)}</td>
                                            <td> {!user.modeloEntrenado ? (<img alt="no" src={No}  />) : (<img src={Si} alt="si" />)}</td>
                                            <td>{user.createdAccount ? <img className="img-fluid profile-imgs" src={user.pfp} alt={user.username} /> : (<p>no hay :(</p>)}</td>
                                            <td><p>{user.role}</p></td>
                                            <td><p >{user.cantidadFotos}</p></td>

                                            <td className="boton-elim-border"> <img alt ="eliminar"className="btn-elim" src={Eliminar} onClick={() => this.chau(user._id)} /></td>
                                        </tr>)

                                ) : (<tr><td>No content...</td></tr>)}
                            </tbody>
                        </table>

                    </div>
                ) : (<h1>It is loading!</h1>)}

            </div>
        )
    }
}
