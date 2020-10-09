import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '../styles/profile.css'
import Chart from '../images/chart.png'
import AuthService from '../Services/AuthService';
import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/storage";

const Profile = (props) => {

    const { user, open2, setOpenn } = useContext(AuthContext);
    const [usuario, setUsuario] = useState(user)
    const [picture, setPicture] = useState(null)
    const onChangeHandler = (e) => {
        setPicture(e.target.files)
        document.getElementById('btnCnfm').classList.remove('hidden')
    }
    useEffect(() => {
        //console.log(user)
    })
    const onClickHandler = () => {
        //console.log(typeof(picture[0]))
        var str = firebase.storage().ref(`${user.companyID}/pfp/${user.dni}.jpg`)
        if(picture.length >0){
            str.put(picture[0]).then(snap => {
                snap.ref.getDownloadURL().then(url => {
                    AuthService.uploadPfp(url, user.companyID, user.dni)
                    setUsuario({pfp:url})
                    console.log("[USUARI]",usuario)
                })
            })
            document.getElementById('btnCnfm').classList.add('hidden')
    
        }else{
            alert("no seleccionaste una foto")
        }

    }
    return (
        <>
            <div className="total" onClick={() => {
                if (open2) {
                    setOpenn(false)
                    //console.log("deja de tocarme")

                }
            }}>
                <div className="container container1">
                    <div className="card">
                        <div className="card-header">
                            <br />
                        </div>
                        <div className="card-body">
                            <div className="whole-body">
                                <div className="profile-picture">
                                    <p className="profile-text">Profile Picture</p>
                                    {/* <p>{JSON.stringify(user)}</p> */}
                                    <img src={usuario.pfp} alt="pfp" className="profile-picture-img" />
                                    {/* <label htmlFor="customFile">Cambiar Foto</label> */}

                                    <button className="change-profile-picture"style={{ display: "block", width: "120px", height: "30px" }} onClick={() =>document.getElementById('getFile').click()}>Change Photo</button>
                                    <input required={true} type="file" onChange={onChangeHandler} name="holu" style={{display:'none'}}  id="getFile" accept="image/png,image/jpg" />

                                    

                                    <input type="button" id="btnCnfm" value="Confirmar" onClick={() => onClickHandler()} className="change-profile-picture hidden" />


                                        <p className="profile-name">{user.username}</p>
                                        <p className="qr-code-text">QR Code:</p>
                                        <img src={user.qrLink} alt="qr code" className="qr-code-imag" />
                                </div>
                                    <div className="c1">
                                        <div className="c2"></div>
                                        <div className="container datos-del-perfil">
                                            <p className="datos-del-perfil-text">Datos del perfil</p>
                                            <div className="fields">
                                                <div className="full-name-field">
                                                    <p className="description">Full Name:</p>
                                                    <p className="value-field">{user.username}</p>
                                                </div>
                                                <div className="email-field">
                                                    <p className="description">Email:</p>
                                                    <p className="value-field">{user.mail}</p>
                                                </div>
                                                <div className="dni-field">
                                                    <p className="description">DNI:</p>
                                                    <p className="value-field">{user.dni}</p>
                                                </div>
                                                <div className="companyid-field">
                                                    <p className="description">Companyid:</p>
                                                    <p className="value-field">{user.companyID}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="c2"></div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container container1">
                        <div className="card">
                            <div className="card-header">
                                <br />
                            </div>
                            <div className="card-body pelele">
                                <p className="registro-txt">
                                    Registro de Entradas:
                            </p>
                                <div className="el-grafico">
                                    <img src={Chart} alt="" className="el-grafico-img" />
                                </div>
                                <p className="ultima-entrada-txt">Tu ultima entrada fue ayer, 8:23 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Profile;