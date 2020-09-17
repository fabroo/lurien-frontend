import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom'
import '../styles/profile.css'
import Tievo from '../photos/tievo.jpg'
import QrCode from '../images/Qr.png'
import Chart from '../images/chart.png'
const Profile = (props) => {
    const authContext = useContext(AuthContext);
    const { dark, open2, setOpenn } = useContext(AuthContext);

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
                            <br/>
                     </div>
                        <div className="card-body">
                            <div className="whole-body">
                                <div className="profile-picture">
                                    <p className="profile-text">Profile Picture</p>
                                    <img src={Tievo} alt="" className="profile-picture-img" />
                                    <input type="button" value="Change" className="change-profile-picture" />
                                    <p className="profile-name">Bruno Tievoli</p>
                                    <p className="qr-code-text">QR Code:</p>
                                    <img src={QrCode} alt="" className="qr-code-imag"/>
                                </div>
<div className="c1">
    <div className="c2"></div>
                      <div className="container datos-del-perfil">
                                    <p className="datos-del-perfil-text">Datos del perfil</p>
                                    <div className="fields">
                                        <div className="full-name-field">
                                            <p className="description">Full Name:</p>
                                            <p className="value-field">Bruno Tievoli</p>
                                        </div>
                                        <div className="email-field">
                                            <p className="description">Email:</p>
                                            <p className="value-field">tievolib@gmail.com</p>
                                        </div>
                                        <div className="dni-field">
                                            <p className="description">DNI:</p>
                                            <p className="value-field">45500288</p>
                                        </div>
                                        <div className="companyid-field">
                                            <p className="description">Companyid:</p>
                                            <p className="value-field">1a2b3c</p>
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
                            <br/>
                     </div>
                        <div className="card-body pelele">
                            <p className="registro-txt">
                                Registro de Entradas:
                            </p>
                           <div className="el-grafico">
                                <img src={Chart} alt="" className="el-grafico-img"/>
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