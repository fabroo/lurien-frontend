import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import AuthService from '../../Services/AuthService';
import swal from 'sweetalert';
import '../../styles/admin.css'
import No from '../../images/no.svg'
import Si from '../../images/si.svg'
import Eliminar from '../../images/no-rojo.svg'
import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/storage";
import Loading from '../../images/img.gif'
import AddUser from './addManager'

import Btn_nuevoUser from '../../images/boton-agregarusuario.svg';
import Btn_noregistrado from '../../images/boton-noregistrado.svg';
import Btn_siregistrado from '../../images/boton-siregistrado.svg';

const Tabla = (areas) => {
    //actual user
    const { user } = useContext(AuthContext);
    let [content, setContent] = useState(null) //list of company users
    let [registradoClass, setRegistradoClass] = useState({ style: { display: 'none', margin: 'auto .5rem' } })
    let [noregistradoClass, setNoRegistradoClass] = useState({ style: { display: 'none', margin: 'auto .5rem' } })
    let [modal, setModal] = useState({ username: "", dni: "" })
    let [loading, isLoading] = useState(false); //loading message
// eslint-disable-next-line
    const [toggle, setToggle] = useState(false);
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


    useEffect(() => { //fetch user list at the beggining

        isLoading(true) //begin to load
        async function showw() {
            if (user.role === "admin" || user.role === "mod") {
                AuthService.getData(user.companyID).then(async res => {
                    //consts
                    const all = res.data;
                    const users = [];
                    all.forEach(async user => { //only display registered users
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
            } else if (user.role === "manager") {
                AuthService.getManUser(user.manArea).then(async res => {
                    const all = res.data.message.msgBody;
                    const users = [];
                    all.forEach(async user => { //only display registered users
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
        }
        showw()

    }, [user.companyID, user.role, user.manArea]); //si se rompe saca lo de aca adentro

    const showWich = (yesOrNo) => { //only users depending if they are registered or not
        if (yesOrNo) { //set the button classes
            setRegistradoClass({ display: 'none' })
            setNoRegistradoClass({ display: 'block' })
        } else {
            setRegistradoClass({ display: 'block' })
            setNoRegistradoClass({ display: 'none' })
        }
        //get company users
        if (user.role === "admin" || user.role === "mod") {
            AuthService.getData(user.companyID).then(async res => {
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
                setContent(users.sort(function (a, b) { //sort users alphabetically
                    if (a.username < b.username) { return -1; }
                    if (a.username > b.username) { return 1; }
                    return 0;
                }));

                isLoading(false) //done loading
                setRegistradoClass({ display: 'block' })
                setNoRegistradoClass({ display: 'block' })
            }, [])
        } else if (user.role === "manager") {
            AuthService.getManUser(user.manArea).then(async res => {
                const all = res.data.message.msgBody;
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
            .then(async (value) => {
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
    const wipeFotos = async (user) => { //eliminar los datos del usuario en el pickle
        let dni = user.dni
        let companyID = user.companyID
        // if (user.modeloEntrenado && user.createdAccount) {
        if (user.createdAccount) {
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
                            await AuthService.wipeFotos(dni, companyID).then(async res => {
                                var storage = firebase.storage().ref(`${companyID}/model/${dni}/`)
                                var str = await firebase.storage().ref(`${companyID}/model/${dni}/`).listAll()
                                var length = str.items.length - 1
                                for (let i = 0; i <= length; i++) {
                                    storage.child(`${i}.png`).delete()
                                }

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
    const setOpenModelSi = (user) => {
        setModal({ username: user.username, dni: user.dni, pfp: user.pfp })
    }
    return (
        <>
            <div onClick={() => {
                if (open2) {
                    setOpenn(false)
                }
            }} >
                <div className="botonera flex-row-reverse container" style={{ display: 'flex' }} >
                    <button className="btn boton-tabla m-2 none" style={registradoClass} onClick={() => showWich(true)}>
                        <img src={Btn_siregistrado} alt="reg" />

                        <p>Registrados</p>
                    </button>
                    <button className="btn boton-tabla m-2 none" style={noregistradoClass} onClick={() => showWich(false)}>
                        <img src={Btn_noregistrado} alt="no_reg" />

                        <p>No registrados</p>
                    </button>
                    <button type="button" className="btn boton-tabla m-2" data-toggle="modal" data-target="#exampleModalCenter">
                        <img src={Btn_nuevoUser} alt="nuevo_user" />

                        <p>Crear usuario</p>
                    </button>
                    <AddUser prueba1={["caca"]} user={user} />

                </div>

                <div className="contenedor-de-tabla container" onClick={() => {
                    if (open2) {
                        setOpenn(false)
                    }
                }}>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title dni-text" id="exampleModalLabel">{modal.username}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span style={{ color: "white" }} aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group" style={{ alignItems: "center", textAlign: 'center' }}>
                                        <img src={modal.pfp} style={{ width: "600px" }} alt="pfp" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                                        <th>Area</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content ? (
                                        content.map(user =>
                                            <tr key={user._id} >

                                                <td data-toggle="modal" data-target="#exampleModal" style={{ cursor: 'pointer' }} onClick={() => setOpenModelSi(user)} >{!user.createdAccount ? (<p>No registrado</p>) : (<p>{user.username}</p>)}</td>
                                                <td  ><p>{user.dni}</p></td>
                                                <td >{user.createdAccount ? (<p><a rel="noopener noreferrer" href={"https://mail.google.com/mail/u/0/?view=cm&fs=1&to=" + user.mail + "&tf=1"} target="_blank">{user.mail}</a></p>) : (<p>No creada</p>)}</td>
                                                <td > {!user.modeloEntrenado ? (<img src={No} alt="no" />) : (<img src={Si} alt="si" />)}</td>
                                                <td >{user.createdAccount ? <img className="img-fluid profile-imgs" src={user.pfp} alt={user.username} /> : (<p>no hay :(</p>)}</td>


                                                <td><p>{user.role}</p></td>
                                                <td><p onClick={() => wipeFotos(user)}>{user.cantidadFotos}</p></td>
                                                <td><p>{String(user.area)}</p></td>

                                                <td className="boton-elim-border"> {user.role !== "admin" ? (<img alt="remove" className="btn-elim" src={Eliminar} onClick={() => chau(user._id)} />) : user.role !== "mod" ? ((<img alt="remove" className="btn-elim" src={Eliminar} onClick={() => chau(user._id)} />)) : (<p>es admin bro</p>)} </td>
                                            </tr>)

                                    ) : (<tr><td>No content...</td></tr>)}
                                </tbody>
                            </table>

                        </div>
                    ) : (
                            <div className="a" style={{ alignItems: 'center', textAlign: 'center' }}>
                                <img src={Loading} alt="loading" style={{ width: '100px', color: "white" }} />
                            </div>
                        )}

                </div>

            </div>
        </>
    )
}

export default Tabla