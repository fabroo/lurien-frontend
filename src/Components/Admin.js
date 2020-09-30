import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import swal from 'sweetalert';
import '../styles/admin.css'
import Luna from '../images/luna1.svg'
import No from '../images/no.svg'
import Si from '../images/si.svg'
import Eliminar from '../images/no-rojo.svg'
import { socket } from "./Navbar";
import Pusher from 'pusher-js'

const Admin = props => {

    //actual user
    const { user } = useContext(AuthContext);
    let [content, setContent] = useState(null) //list of company users
    let [elinput, setElInput] = useState({ dni: 0, role: "user" }) //create new company user 
    let [entradas, setEntradas] = useState([])
    //button classes
    let [registradoClass, setRegistradoClass] = useState({ style: { display: 'none', margin: 'auto .5rem' } })
    let [noregistradoClass, setNoRegistradoClass] = useState({ style: { display: 'none', margin: 'auto .5rem' } })

    let [loading, isLoading] = useState(false); //loading message
    const [toggle, setToggle] = useState(false);

    const getDataSocket = foodItems => {
        console.log("recibi la daya");
    };

    const { dark, open2, setOpenn } = useContext(AuthContext);
    useEffect(() => {
        const owo = () => {
            if (dark) {

                document.body.classList.remove('dark-bg')
                document.body.classList.add('light-bg')
            }
            else {

                document.body.classList.remove('light-bg')
                document.body.classList.add('dark-bg')
            }
            setToggle(dark)
        }
        owo()
    }, [dark])
    useEffect(() => {
        const funcion = () => {

            // socket.on("demo", getDataSocket);
            // socket
            // Pusher.logToConsole = true;

            var pusher = new Pusher('b103ad2b1e20a1198455', {
                cluster: 'us2'
            });

            var channel = pusher.subscribe(user.companyID);
            channel.bind('updateEntrada', (data) => {
                // alert(`nuevo ingreso de ${data.name} a las ${data.hora}`)
                console.log(data)
                let entradass = entradas
                entradass.push(data)
                setEntradas(entradass)
                console.log("[ARRAY]", entradas)

                var node = document.createElement("p");                 // Create a <li> node
                var textnode = document.createTextNode(`nuevo ingreso de ${data.name} a las ${data.hora}`);         // Create a text node
                node.appendChild(textnode);
                document.getElementById("testttt").appendChild(node);  
            });
        }
        funcion()
    }, [])
    useEffect(() => { //fetch user list at the beggining

        isLoading(true) //begin to load

        async function showw() {
            AuthService.getData(user.companyID).then(res => {
                //consts
                const all = res.data;
                const users = [];

                all.forEach(user => { //only display registered users
                    if (user.createdAccount) {
                        users.push(user)
                    }
                })

                setContent(users.sort(function (a, b) { //sort users alphabetically
                    if (a.username < b.username) { return -1; }
                    if (a.username > b.username) { return 1; }
                    return 0;
                }));
                isLoading(false) //done loading

                setRegistradoClass({ display: 'block' })
                setNoRegistradoClass({ display: 'block' })
            }, [])
        }
        showw()

    }, [user.companyID]); //si se rompe saca lo de aca adentro

    const showWich = (yesOrNo) => { //only users depending if they are registered or not
        if (yesOrNo) { //set the button classes
            setRegistradoClass({ display: 'none' })
            setNoRegistradoClass({ display: 'block' })
        } else {
            setRegistradoClass({ display: 'block' })
            setNoRegistradoClass({ display: 'none' })
        }
        //get company users
        AuthService.getData(user.companyID).then(res => {
            const all = res.data;
            const users = [];

            all.forEach(user => {
                if (yesOrNo) {
                    if (user.createdAccount) {
                        users.push(user)
                    }
                } else {
                    if (!user.createdAccount) {
                        users.push(user)
                    }
                }
            })
            //sort them

            setContent(users.sort(function (a, b) {
                if (a.username < b.username) { return -1; }
                if (a.username > b.username) { return 1; }
                return 0;
            }));


        }, [])
    }
    //delete users
    const chau = (dni) => {
        swal("Estas seguro de ello? No podras volver atrás", { //ask for second thoughts uwu
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
                        AuthService.removeUser(dni).then(res => { //remove function
                            showWich(true);
                        }, [])
                        break;

                    default:

                }
            });
    }
    //create new user
    const registrarNuevo = async () => {
        //user data
        const dni = elinput.dni;
        const role = elinput.role;
        const username = String(dni); //until the user creates his account the username will be his DNI
        const companyid = user.companyID


        await AuthService.registerNew({ dni: dni, companyID: user.companyID, role: role, username: username, companyid: companyid }).then(res => {
            !res.data.message.msgError ? (swal('Nice!', res.data.message.msgBody)) : (swal('Error!', res.data.message.msgBody))
        }, [])

        showWich(false)

    }

    const handleChange = (e) => { //handle the create user input
        setElInput({ ...elinput, [e.target.name]: e.target.value });
    }
    const wipeFotos = async (user) => { //eliminar los datos del usuario en el pickle
        let dni = user.dni
        let companyID = user.companyID
        if (user.modeloEntrenado && user.createdAccount) {
            swal("Estas seguro de ello? No podras volver atrás", {
                buttons: {
                    cancel: "Cancelar",
                    catch: {
                        text: "Eliminar",
                        value: "borrar",
                    }
                },
            })
                .then(async (value) => {
                    switch (value) {

                        case "borrar":
                            swal("Eliminado", "Imagenes eliminadas", "success");
                            await AuthService.wipeFotos(dni, companyID).then(res => {
                                //console.log(res)
                            })
                            AuthService.getData(user.companyID).then(res => {
                                const all = res.data;
                                const users = [];

                                all.forEach(user => {
                                    if (user.createdAccount) {
                                        users.push(user)
                                    }
                                })

                                setContent(users.sort(function (a, b) {
                                    if (a.username < b.username) { return -1; }
                                    if (a.username > b.username) { return 1; }
                                    return 0;
                                }));
                            }, [])
                            break;

                        default:

                    }
                });

        } else {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'O no hay fotos o no está registrado..',
                footer: 'Volve a intentar'
            })
        }
    }

    return (
        <>
            <div className="contenedor-de-tabla container" onClick={() => {
                if (open2) {
                    setOpenn(false)
                    console.log("deja de tocarme")

                }
            }}>
                {/* <div className="botonera" style={{ display: 'flex' }} >

                <button className="btn btn-info m-2" ><a style={{ color: 'white' }} href={"http://localhost:8080/api/upload/download/" + user.companyID}>DOWNLOAD DATA</a></button>
                <button className="btn btn-primary m-2 none" style={registradoClass} onClick={() => showWich(true)}>REGISTRADOS</button>
                <button className="btn btn-secondary m-2 none" style={noregistradoClass} onClick={() => showWich(false)}>NO REGISTRADOS</button>
                <button type="button" className="btn btn-info m-2" data-toggle="modal" data-target="#exampleModalCenter"> +</button>

            </div> */}
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
                                        value={elinput.dni}
                                        onChange={handleChange} />
                                    <br /><br />
                                    <select name="role" className="form-control form-control-lg" onChange={handleChange} value={elinput.role}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => registrarNuevo()}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!loading ? (
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
                                {content ? (
                                    content.map(user =>
                                        <tr key={user._id}>

                                            <td>{!user.createdAccount ? (<p>No registrado</p>) : (<p>{user.username}</p>)}</td>
                                            <td ><p>{user.dni}</p></td>
                                            <td>{user.createdAccount ? (<p><a rel="noopener noreferrer" href={"https://mail.google.com/mail/u/0/?view=cm&fs=1&to=" + user.mail + "&tf=1"} target="_blank">{user.mail}</a></p>) : (<p>No creada</p>)}</td>
                                            <td> {!user.modeloEntrenado ? (<img src={No} alt="no" />) : (<img src={Si} alt="si" />)}</td>
                                            <td>{user.createdAccount ? <img className="img-fluid profile-imgs" src={'http://192.168.0.106:8080/api/user/pfp/' + user.companyID + '\\' + user.dni} alt={user.username} /> : (<p>no hay :(</p>)}</td>
                                            {/* para la IP LOCAL poner 192.168.0.106:8080 */}

                                            <td><p>{user.role}</p></td>
                                            <td><p onClick={() => wipeFotos(user)}>{user.cantidadFotos}</p></td>

                                            <td className="boton-elim-border"> {user.role !== "admin" ? (<img className="btn-elim" src={Eliminar} onClick={() => chau(user._id)} />) : user.role !== "mod" ? ((<img className="btn-elim" src={Eliminar} onClick={() => chau(user._id)} />)) : (<p>es admin bro</p>)} </td>
                                        </tr>)

                                ) : (<tr><td>No content...</td></tr>)}
                            </tbody>
                        </table>

                    </div>
                ) : (<h1>It is loading!</h1>)}

            </div>
            <div id="testttt" className="container" style={{ backgroundColor: 'red' }}>
                <h1>ENTRADAS</h1>
                {entradas ? (entradas.map(entrada =>
                    <div key={entrada.hora}>
                        <p >{entrada.name} entro a las {entrada.hora}</p>
                    </div>
                )) : (null)}
            </div>
        </>

    )
}
export default Admin