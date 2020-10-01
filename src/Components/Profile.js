import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '../styles/profile.css'
import Chart from '../images/chart.png'
import axios from 'axios'


const Profile = (props) => {

    const { user, open2, setOpenn } = useContext(AuthContext);
    const [qrimg,setQrmImg] = useState(null)


    useEffect(()=>{
        const uwu = async ()=>{
            var image = await axios.get(`http://localhost:8080/api/user/qr/${user.companyID}/${user.dni}`)
            //console.log("data:image/png;base64," + image.data.img)
            setQrmImg("data:image/png;base64," + image.data.img);
        }
        uwu()
    })

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
                                    <img src={"https://test-lurien.rj.r.appspot.com/api/user/pfp/" + user.companyID + '/' + user.dni} alt="pfp" className="profile-picture-img" />
                                    <input type="button" value="Change" className="change-profile-picture" />
                                    <p className="profile-name">{user.username}</p>
                                    <p className="qr-code-text">QR Code:</p>
                                    <img src={qrimg} alt="qr code" className="qr-code-imag" />
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