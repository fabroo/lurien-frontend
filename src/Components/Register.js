import React, { useState, useRef, useEffect,useContext } from 'react';
import AuthService from '../Services/AuthService';
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import Message from '../Components/Message';
import '../styles/register.css'


const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", dni: "", companyID: "", mail: "" });
    const [message, setMessage] = useState(null);
    const [toggle, setToggle] = useState(false);
    let timerID = useRef(null);

    const {dark} = useContext(AuthContext);
    useEffect(() => {
        const owo = () =>{
            if(dark){
                
                document.body.classList.remove('dark-bg') 
                document.body.classList.add('light-bg') 
            } 
            else{
                
                document.body.classList.remove('light-bg') 
                document.body.classList.add('dark-bg')
            }
            setToggle(dark)
        }
        owo()
    }, [dark])

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);


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
        <div className="body" style = {toggle ? {background:'#F8F8F8 '} : {background:'#272727'}} >
            <div className=""></div>
            <form onSubmit={onSubmit}>
                <div>
                    {message ? <Message message={message} /> : null}
                    <h3 className="login_text"style = {toggle ? {color:'#272727'} : {color:'#F8F8F8'}}>Register</h3>
                </div>
                <div className="campos">
                    {/* <h3>Please Register</h3> */}

                    <div className="inputs">
                        <div className="1"></div>
                        <div className="uwu" >
                            <input type="text"
                                name="username"
                                value={user.username}
                                style = {!toggle ? {color:'#F8F8F8 '} : {color:'#272727'}}
                                onChange={onChange} className="input"
                                placeholder="Username" />
                            <input type="password"
                                name="password"
                                style = {!toggle ? {color:'#F8F8F8 '} : {color:'#272727'}}
                                value={user.password}
                                onChange={onChange} className="input"
                                placeholder="Password" />
                            <input type="text"
                                name="mail"
                                style = {!toggle ? {color:'#F8F8F8 '} : {color:'#272727'}}
                                value={user.mail}
                                onChange={onChange} className="input"
                                placeholder="Email " />
                            <input type="text"
                                name="dni"
                                style = {!toggle ? {color:'#F8F8F8 '} : {color:'#272727'}}
                                value={user.dni}
                                onChange={onChange} className="input"
                                placeholder="DNI" />
                            <input type="text"
                                name="companyID"
                                style = {!toggle ? {color:'#F8F8F8 '} : {color:'#272727'}}
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
                            <p className="registrar"style = {toggle ? {color:'#272727'} : {color:'#F8F8F8'}}>Ya tenes cuenta? <Link style = {toggle ? {color:'#272727'} : {color:'#F8F8F8'}}style={{ color: '##000000', textDecoration: 'none' }} to="/login">Inicia Sesion</Link></p>

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