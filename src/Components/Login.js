import React, { useState, useContext, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';
import '../styles/login.css'


const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const [toggle, setToggle] = useState(false);
    const authContext = useContext(AuthContext);

    const { dark,open,setOpenn } = useContext(AuthContext);



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
                props.history.push('/profile');
            }
            if (error) {
                setMessage('usuario incorrecto');
            }
        });
    }
    return (
        <div className="body" style={toggle ? { background: '#F8F8F8 ' } : { background: '#272727' }} >
            <div></div>
            <form onSubmit={onSubmit}>

                <div>
                    {message ? <Message message={message} /> : null}
                    <h3 className="login_text" style={toggle ? { color: '#272727 ' } : { color: '#F8F8F8' }}>Login</h3>
                </div>
                <div className="campos">
                    <div className="inputs">
                        <div className="1"></div>
                        <div className="uwu">
                            <input type="number"
                                name="username"
                                onChange={onChange}
                                className="input" style={!toggle ? { color: '#F8F8F8 ' } : { color: '#272727' }}

                                placeholder="DNI" />
                            <input type="password"
                                name="password"
                                className="input"
                                onChange={onChange}
                                placeholder="Password" style={!toggle ? { color: '#F8F8F8 ' , marginBottom: '40px' } : { color: '#272727' , marginBottom: '40px' }}
                            />
                            <div className="boton">
                                <div>
                                </div>
                                <div>
                                    <button className="aceptar" type="submit" style={toggle ? { background: '#272727', color: '#F8F8F8' } : { background: '#F8F8F8', color: '#272727' }}>Enter</button>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div className="textoo" style={toggle ? { color: '#272727' } : { color: '#F8F8F8' }} >
                                <div>

                                </div>
                                <div>
                                    <p className="registrar" style={toggle ? { color: '#272727' } : { color: '#F8F8F8' }}>¿No tienes cuenta? <u>Registrate</u></p>

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