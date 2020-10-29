import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '../styles/profile.css'
import AuthService from '../Services/AuthService';
import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/storage";
import { Line } from 'react-chartjs-2';


const Profile = (props) => {

    const data = {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        datasets: [
            {
                label: 'Tu Registro de Entradas',
                fill: true,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                animation:{
                    duration:1.5
                },
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [11.30, 8, 8.53, 9, 7.30, 7.35, 9]
            }
        ]
    };
    const { user, open2, setOpenn } = useContext(AuthContext);
    const [usuario, setUsuario] = useState(user)
    const [picture, setPicture] = useState(null)
    const onChangeHandler = (e) => {
        setPicture(e.target.files)
        document.getElementById('btnCnfm').classList.remove('hidden')
    }
   
    const onClickHandler = () => {
        var str = firebase.storage().ref(`${user.companyID}/pfp/${user.dni}.jpg`)
        if (picture.length > 0) {
            str.put(picture[0]).then(snap => {
                snap.ref.getDownloadURL().then(url => {
                    AuthService.uploadPfp(url, user.companyID, user.dni)
                    setUsuario({ pfp: url })
                })
            })
            document.getElementById('btnCnfm').classList.add('hidden')

        } else {
            alert("no seleccionaste una foto")
        }

    }
    return (
        <>
            <div className="total" onClick={() => {
                if (open2) {
                    setOpenn(false)
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
                                    <img src={usuario.pfp} alt="pfp" className="profile-picture-img" />
                                    <button className="change-profile-picture" style={{ display: "block", width: "120px", height: "30px" }} onClick={() => document.getElementById('getFile').click()}>Change Photo</button>
                                    <input required={true} type="file" onChange={onChangeHandler} name="holu" style={{ display: 'none' }} id="getFile" accept="image/jpeg,image/png,image/jpg" />
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
                            <Line data={data} className="el-grafico-img" />

                            {/* <div className="el-grafico">
                                 <img src={Chart1} alt="" className="el-grafico-img" /> 
                            
                            </div> */}
                            <p className="ultima-entrada-txt">Tu ultima entrada fue ayer, 8:23 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;