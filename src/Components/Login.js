import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';
import '../styles/login.css'


const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();

        AuthService.login(user).then(data => {
            const { isAuthenticated, user, error } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/');
            }
            if (error) {
                setMessage('usuario incorrecto');
            }
        });
    }
    return (
        <div className="body">
            <div></div>
            <form onSubmit={onSubmit}>

                <div>
                    {message ? <Message message={message} /> : null}
                    <h3 className="login_text">Login</h3>
                </div>
                <div className="campos">
                    <div className="inputs">
                        <div className="1"></div>
                        <div className="uwu">
                            <input type="number"
                                name="username"
                                onChange={onChange}
                                className="input"
                                placeholder="DNI" />
                            <input type="password"
                                name="password"
                                className="input"
                                onChange={onChange}
                                placeholder="Password" 
                                style={{marginBottom:'40px'}}
                                />
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
                                    <p className="registrar">¿No tienes cuenta? <u>Registrate</u></p>

                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                        <div className="3"></div>
                    </div>

                </div>


            </form>
            <div></div>
        </div>
    )
}

export default Login;