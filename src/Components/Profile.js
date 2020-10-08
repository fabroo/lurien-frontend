import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '../styles/profile.css'
import Chart from '../images/chart.png'
import AuthService from '../Services/AuthService';
import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/storage";
import axios from 'axios'


const Profile = (props) => {

    const { user, open2, setOpenn } = useContext(AuthContext);
    //const [qrimg, setQrmImg] = useState(null)
    //const [pfp, setPfp] = useState(null)
    const ip = "http://192.168.0.103:8080"
    const [picture, setPicture] = useState(null)
    const onChangeHandler = (e) => {
        setPicture(e.target.files)
        document.getElementById('btnCnfm').classList.remove('hidden')
    }
    useEffect(() => {
        console.log(user)
        // const uwu = async () => {
            
        //     var qr = await axios.get(`${ip}/api/user/qr/${user.companyID}/${user.dni}`)
        //     //console.log("data:image/png;base64," + image.data.img)
        //     setQrmImg(qr.data.img);
        //     var prof = await axios.get(`${ip}/api/user/pfp/${user.companyID}/${user.dni}`)
        //     //console.log("data:image/png;base64," + image.data.img)
        //     setPfp(prof.data.img)
        // }
        // uwu()
    })
    const onClickHandler = () => {
        // console.log("culo sucio")
        // const data = new FormData()
        // data.append('username', user.dni)
        // data.append('companyID', user.companyID)
        // for (var x = 0; x < picture.length; x++) {
        //     let extensiones = ['.jpg', '.jpeg', '.png'];
        //     for (let i = 0; i < extensiones.length; i++) {
        //         if (picture[x].name.includes(extensiones[i])) {
        //             data.append('file', picture[x])
        //         }
        //     }
        // }a
        // AuthService.uploadPfp(data, user.usernaame)
        console.log(typeof(picture[0]))
        var str = firebase.storage().ref(`${user.companyID}/pfp/${user.dni}.jpg`)
        str.put(picture[0]).then(snap =>{
            snap.ref.getDownloadURL().then(url=>{
                
                AuthService.uploadPfp(url, user.companyID, user.dni)
            })
        })
        document.getElementById('btnCnfm').classList.add('hidden')


    }
    return (
        <>
            <div className="total" onClick={() => {
                if (open2) {
                    setOpenn(false)
                    console.log("deja de tocarme")

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
                                    <p>{JSON.stringify(user)}</p>
                                    {/* <img src={user.pfp} alt="pfp" className="profile-picture-img" /> */}
                                    <input required={true} type="file" onChange={onChangeHandler} name="holu" className="change-profile-picture" id="customFile" accept="image/png,image/jpg" />
                                    <input type="button" id="btnCnfm" onClick={() =>onClickHandler()}  className="change-profile-picture hidden" />


                                    <p className="profile-name">{user.username}</p>
                                    <p className="qr-code-text">QR Code:</p>
                                    <img src={`http://resources.lurien.team/${user.companyID}/qrcodes/${user.dni}.png`} alt="qr code" className="qr-code-imag" />
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
                                                <p className="value-field">{user.mail}</p>
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