import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import '../styles/navbar.css'
import Logo from '../images/LurienIcon.png'
import Sol from '../images/sol2.svg'
import Luna from '../images/luna1.svg'
import '../styles/owo.css';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as Admin } from '../images/admin.svg';
import { ReactComponent as Upload } from '../images/upload.svg';
import { ReactComponent as Logout } from '../images/logout.svg';
import { ReactComponent as Profile } from '../images/profile.svg';
import { CSSTransition } from 'react-transition-group';

/**/
const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated,setOpenn,open2, setUser } = useContext(AuthContext);
    const [dark, setdark] = useState(true);
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
        authContext.setdarkk(dark)
        console.log(dark)
    }


    function NavItem(props) {

        return (
            <li className="nav-item">
                {/* eslint-disable-next-line*/} 
                <a href="#" className="icon-button a" onClick={() => {
                    setOpen(!open)
                    authContext.setOpenn(true);
                }}>
                    {props.icon}
                </a>

                {open2 && props.children}
            </li>
        );
    }

    function DropdownMenu() {
        const [activeMenu, setActiveMenu] = useState('main');
        const dropdownRef = useRef(null);

        // useEffect(() => {
        //     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
        // }, [])

        function calcHeight(el) {
            const height = el.offsetHeight;
            setMenuHeight(height);
        }

        function DropdownItem(props) {
            return (

                <a href="#" className="menu-item a" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                    <span className="icon-button">{props.leftIcon}</span>
                    {props.children}
                    <span className="icon-right">{props.rightIcon}</span>
                </a>
            );
        }

        return (
            <div className="dropdown" ref={dropdownRef}>
                <CSSTransition
                    in={activeMenu === 'main'}
                    timeout={500}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="menu">
                        {!isAuthenticated ? (
                            null
                        ) : (
                                <>
                                    {
                                        user.role === "admin" ?
                                            <DropdownItem icon={<Admin />}><div>
                                                <Link to="/admin" className="nav-link">
                                                    Admin
                                                    </Link>
                                            </div> </DropdownItem> : null
                                    }
                                    {
                                        user.role === "mod" ? (
                                            <DropdownItem> <div >
                                                <Link to="/mod" className="nav-link">
                                                    Mod
                                                    </Link>
                                            </div></DropdownItem>
                                        ) : null
                                    }
                                    <DropdownItem leftIcon ={<Upload/>}> <div >
                                        <Link to="/upload" className="nav-link">
                                            Upload
                                            </Link>
                                    </div></DropdownItem>
                                    <DropdownItem leftIcon={<Profile/>}>  <div >
                                        <Link to="/profile" className="nav-link">
                                            Profile
                                            </Link>
                                    </div></DropdownItem>
                                    <br /><br /><br />
                                    <br /><br /><br />
                                    <DropdownItem leftIcon={<Logout/>}> <div >
                                        <Link
                                            className="nav-link"
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
        }}  style={!dark ? { background: '#D3D3D3' } : { background: '#282828' }}>
            <div className="logo_section">
                <img src={Logo} className="logo_img" alt="" />
                <Link className="logo_name" to="/" >
                    <div  style={!dark ? { color: '#282828' } : { color: '#D3D3D3' }} >Lurien</div>
                </Link>
            </div>

            <div className="culo">
                <ul className="nav-links ul">
                    <div className="theme_toggle" style={!dark ? { background: '#F8F8F8' } : { background: '#282828' }}>
                        {/* <div className="back_rec" style={!dark ? { background: '#282828', marginLeft: '4px' } : { background: '#F8F8F8', marginLeft: '47px' }}> */}
                        <div className="icon_theme" style={!dark ? { marginLeft: '3px' } : { marginLeft: '46px' }}>
                            <img  onClick={toggleTheme} src={!dark ? Sol : Luna} alt="" />
                        </div>
                        {/* </div> */}
                    </div>
                    {!isAuthenticated ? (<>
                        <div className="nav-rect">
                            <Link to="/login" className="nav-link">
                                Login
                               </Link>
                        </div>

                        <div className="nav-rect">
                            <Link to="/register" className="nav-link ">
                                Register
                               </Link>
                        </div>
                    </>) : (<NavItem icon={<CaretIcon />}>
                        <DropdownMenu></DropdownMenu>
                    </NavItem>)}

                </ul>
            </div>

        </nav>
    )
}

export default Navbar;