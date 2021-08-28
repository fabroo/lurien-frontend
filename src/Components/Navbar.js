import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import '../styles/navbar.css'
import Logo from '../images/LurienIcon.png'
import Sol from '../images/sol2.svg'
import Luna from '../images/luna1.svg'
import '../styles/navbar-navbar.css';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as Admin } from '../images/admin.svg';
import { ReactComponent as Upload } from '../images/upload.svg';
import { ReactComponent as Logout } from '../images/logout.svg';
import { ReactComponent as Profile } from '../images/profile.svg';
import { ReactComponent as Mod } from '../images/modsvg.svg';
import { CSSTransition } from 'react-transition-group';
const Navbar = props => {
    // const [endpoint,setEndpoint] = useState("http://localhost:3005/")
    const { isAuthenticated, user, setIsAuthenticated, setOpenn, open2, setUser } = useContext(AuthContext);
    const [dark, setdark] = useState(false);
    const authContext = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [setMenuHeight] = useState(null);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }
    const toggleTheme = () => {
        setdark(!dark)
        console.log(dark)
        authContext.setdarkk(dark)
    }


    function NavItem(props) {

        return (
            <li className="nav-item">
                {/* eslint-disable-next-line*/}
                <button  className="icon-button i-b-2 a" style={!dark ? ({ background: '#979797',border:'none' }) : ({ background: '#484a4d',border:'none' })} onClick={() => {
                    setOpen(!open)
                    authContext.setOpenn(true);
                }}>
                    {props.icon}
                </button>

                {open2 && props.children}
            </li>
        );
    }

    function DropdownMenu() {
        const [activeMenu, setActiveMenu] = useState('main');
        const dropdownRef = useRef(null);

        function calcHeight(el) {
            const height = el.offsetHeight;
            setMenuHeight(height);
        }

        function DropdownItem(props) {
            return (

                <button style={{background:'none',border:"none"}} className="menu-item a" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                    <span className="icon-button" style={!dark ? ({ background: '#979797' }) : ({ background: '#484a4d' })}>{props.leftIcon}</span>
                    {props.children}
                    <span className="icon-right" style={!dark ? ({ background: '#979797' }) : ({ background: '#484a4d' })}>{props.rightIcon}</span>
                </button>
            );
        }

        return (
            <div className="dropdown" style={!dark ? ({ background: '#D3D3D3' }) : ({ background: "#242526" })} ref={dropdownRef}>
                <CSSTransition
                    in={activeMenu === 'main'}
                    timeout={500}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="menu">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="nav-link" style={!dark ? ({ color: '#282828' ,padding:'0'}) : ({ color: '#D3D3D3' ,padding:'0'})}>

                                    <DropdownItem icon={<Admin />}><div>
                                    <p style={!dark ? ({ color: '#282828',margin:'0' }) : ({ color: '#D3D3D3',margin:'0' })}>Login</p>
                                </div>
                                    </DropdownItem>
                                </Link>

                                <Link to="/register" className="nav-link " style={!dark ? ({ color: '#282828' ,padding:'0'}) : ({ color: '#D3D3D3',padding:'0' })}>

                                    <DropdownItem icon={<Admin />}><div>
                                    <p style={!dark ? ({ color: '#282828',margin:'0' }) : ({ color: '#D3D3D3',margin:'0' })}>Register</p>
                                </div>
                                    </DropdownItem>
                                </Link>

                            </>
                        ) : (
                                <>
                                    {
                                        user.role !== "user" ?
                                            <Link to="/admin" className="nav-link" style={!dark ? ({ color: '#282828' ,padding:'0'}) : ({ color: '#D3D3D3' ,padding:'0'})}>

                                                <DropdownItem leftIcon={<Admin />}><div>
                                                <p style={!dark ? ({ color: '#282828',margin:'0' }) : ({ color: '#D3D3D3',margin:'0' })}>Admin</p>
                                            </div> </DropdownItem>
                                            </Link> : null

                                    }
                                    
                                    {
                                        user.role === "mod" ? (
                                            <Link to="/mod" className="nav-link" style={!dark ? ({ color: '#282828',padding:'0' }) : ({ color: '#D3D3D3',padding:'0' })}>

                                                <DropdownItem leftIcon={<Mod />}> <div >
                                                <p style={!dark ? ({ color: '#282828',margin:'0' }) : ({ color: '#D3D3D3',margin:'0' })}>Mod</p>
                                            </div>
                                                </DropdownItem>
                                            </Link>

                                        ) : null
                                    }
                                    <Link to="/upload" className="nav-link" style={!dark ? ({ color: '#282828' ,padding:'0'}) : ({ color: '#D3D3D3',padding:'0' })}>

                                        <DropdownItem leftIcon={<Upload />}> <div >
                                        <p style={!dark ? ({ color: '#282828',margin:'0' }) : ({ color: '#D3D3D3',margin:'0' })}>Upload</p>
                                    </div></DropdownItem>
                                    </Link>

                                    <Link to="/profile" className="nav-link" style={!dark ? ({ color: '#282828' ,padding:'0'}) : ({ color: '#D3D3D3' ,padding:'0'})}>
                                        <DropdownItem leftIcon={<Profile />}>  <div >
                                        <p style={!dark ? ({ color: '#282828',margin:'0' }) : ({ color: '#D3D3D3',margin:'0' })}>Profile</p>
                                    </div></DropdownItem>
                                    </Link>

                                    <br /><br /><br />
                                    <br /><br /><br />
                                    <DropdownItem leftIcon={<Logout />}> <div >
                                        <Link
                                            className="nav-link"
                                            style={!dark ? ({ color: '#282828' }) : ({ color: '#D3D3D3' })}
                                            to="/"
                                            onClick={onClickLogoutHandler}>Logout
                                            </Link>
                                    </div></DropdownItem>
                                </>
                            )}
                    </div>
                </CSSTransition>

            </div>
        );
    }
    return (
        <nav className="navbar" onClick={() => {
            if (open2) {
                setOpenn(!open2)
            }
        }} style={!dark ? { background: '#D3D3D3' } : { background: '#212121' }}>
            <div className="logo_section">
                <img src={Logo} className="logo_img" alt="" />
                <Link className="logo_name" to="/" >
                    <div style={!dark ? { color: '#282828' } : { color: '#D3D3D3' }} >Lurien</div>
                </Link>
            </div>

            <div className="culo">
                <ul className="nav-links ul">
                    <div onClick={toggleTheme} className="theme_toggle" style={!dark ? { background: '#F8F8F8' } : { background: '#282828' }}>
                        {/* <div className="back_rec" style={!dark ? { background: '#282828', marginLeft: '4px' } : { background: '#F8F8F8', marginLeft: '47px' }}> */}
                        <div  className="icon_theme" style={!dark ? { marginLeft: '3px' } : { marginLeft: '46px' }}>
                            <img  src={!dark ? Sol : Luna} alt="" />
                        </div>
                        {/* </div> */}
                    </div>
                    {!isAuthenticated ? (<>
                        <div className="nav-rect botones-login-reg" style={dark ? ({ backgroundColor: '#1E1E1E' }) : ({ backgroundColor: '#DADADA' })}>
                            <Link to="/login" className="nav-link" style={dark ? ({ color: '#DADADA' }) : ({ color: '#1E1E1E' })}>
                                Login
                               </Link>
                        </div>

                        <div className="nav-rect botones-login-reg" style={dark ? ({ backgroundColor: '#1E1E1E' }) : ({ backgroundColor: '#DADADA' })}>
                            <Link to="/register" className="nav-link " style={dark ? ({ color: '#DADADA' }) : ({ color: '#1E1E1E' })}>
                                Register
                               </Link>
                        </div>

                        <div className="sidenav-owo">
                            <NavItem icon={<CaretIcon />}>
                                <DropdownMenu></DropdownMenu>
                            </NavItem>
                        </div>

                    </>) : (
                            <>
                                <p className="display-username" style={!dark ? { color: '#282828' } : { color: '#D3D3D3' }} >{user.username}</p>
                                <NavItem icon={<CaretIcon />}>
                                    <DropdownMenu></DropdownMenu>
                                </NavItem>
                            </>
                        )}

                </ul>
            </div>

        </nav>
    )
}

export default Navbar;