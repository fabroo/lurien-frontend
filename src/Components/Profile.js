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
            <div className="whole-body" onClick={() => {
                if (open2) {
                    setOpenn(false)
                console.log("deja de tocarme")

                }
            }}>
                <div className="profile-picture">
                    <p className="profile-text">Profile Picture</p>
                    <img src={Tievo} alt="" className="profile-picture-img" />
                    <input type="button" value="Change" className="change-profile-picture" />
                    <p className="profile-name">Bruno Tievoli</p>
                </div>
                {/* 
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
               */}
            </div>
            <div className="second-row">
                <div className="qr-zone">
                    <p className="qr-text">QR Code:</p>
                    <img src={QrCode} alt="" className="qr-img" />
                </div>
                <div className="chart-zone">
                    <p className="chart-text">Registro de Entradas</p>
                    <img src={Chart} alt="" className="chart-imng" />
                    <p className="ultima-entrada-text">Ultima entrad: Ayer 2:18 PM</p>
                </div>
            </div>
        </>
    )
}

export default Profile;