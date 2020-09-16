import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import { Link } from 'react-router-dom'
import Message from '../Components/Message';
import '../styles/register.css'


const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", dni: "", companyID: "", mail: "" });
    const [message, setMessage] = useState(null);
    const [picture, setPicture] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChangeHandler = (e) => {
        setPicture(e.target.files)
    }
    const onClickHandler = () => {
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
        // }
        // AuthService.uploadPfp(data, user.username)

        timerID = setTimeout(() => {
            props.history.push('/');
        }, 3000)
    }
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: "", password: "", dni: "", companyID: "", mail: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        //console.log('user: ' + JSON.stringify(user))

        AuthService.register(user).then(data => {
            const { message } = data.data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                onClickHandler()
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000)
            }
        });

    }



    return (
        <div className="body" >
            <div className=""></div>
            <form onSubmit={onSubmit}>
                <div>
                    {message ? <Message message={message} /> : null}
                    <h3 className="login_text">Register</h3>
                </div>
                <div className="campos">
                    {/* <h3>Please Register</h3> */}

                    <div className="inputs">
                        <div className="1"></div>
                        <div className="uwu">
                            <input type="text"
                                name="username"
                                value={user.username}
                                onChange={onChange} className="input"
                                placeholder="Username" />
                            <input type="password"
                                name="password"
                                value={user.password}
                                onChange={onChange} className="input"
                                placeholder="Password" />
                            <input type="text"
                                name="mail"
                                value={user.mail}
                                onChange={onChange} className="input"
                                placeholder="Email " />
                            <input type="text"
                                name="dni"
                                value={user.dni}
                                onChange={onChange} className="input"
                                placeholder="DNI" />
                            <input type="text"
                                name="companyID"
                                value={user.companyID}
                                onChange={onChange} className="input"
                                placeholder="Company ID " />
                        </div>
                        <div className="3"></div>
                    </div>

                    <div className="boton">
                        <div>
                        </div>
                        <div>
                            <button className="aceptar" type="submit">Enter</button>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="textoo">
                        <div>

                        </div>
                        <div>
                            <p className="registrar">Ya tenes cuenta? <Link style={{ color: '##000000', textDecoration: 'none' }} to="/login">Inicia Sesion</Link></p>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </form>
            <div className=""></div>

        </div>

    )
}

export default Register;