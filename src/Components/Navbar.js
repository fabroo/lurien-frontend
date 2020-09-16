import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import '../styles/navbar.css'
import Logo from '../images/LurienIcon.png'
import Sol from '../images/sol.svg'
import Luna from '../images/luna.svg'

const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser,setdarkk } = useContext(AuthContext);
    const [dark, setdark] = useState(true);
    const authContext = useContext(AuthContext);
    
    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = () => {
        return (
            <>
                <div className="nav-rect">
                    <Link to="/login" className="nav-link">
                        <li data-toggle="collapse" data-target="#navbarSupportedContent">
                            Login
                    </li>
                    </Link>
                </div>
                <div className="nav-rect register-link">
                    <Link to="/register" className="nav-link ">
                        <li data-toggle="collapse" data-target="#navbarSupportedContent">
                            Register
                    </li>
                    </Link>
                </div>
            </>
        )
    }

    const authenticatedNavBar = () => {
        return (
            <>
                {
                    user.role === "admin" ?
                        <div className="nav-rect">
                            <Link to="/admin" className="nav-link">
                                <li data-toggle="collapse" data-target="#navbarSupportedContent">
                                    Admin
                        </li>
                            </Link>
                        </div>: null
                }
                {
                    user.role === "mod" ? (
                        <div className="nav-rect">
                            <Link to="/mod" className="nav-link">
                                <li data-toggle="collapse" data-target="#navbarSupportedContent">
                                    Mod
                </li>
                            </Link>
                        </div>
                    ) : null
                }
                <div className="nav-rect">
                    <Link to="/upload" className="nav-link">

                        <li data-toggle="collapse" data-target="#navbarSupportedContent">
                            Upload
</li>
                    </Link>
                </div>
                <div className="nav-rect">
                    <Link 
                    className = "nav-link"
                        to="/"
                        onClick={onClickLogoutHandler}><li data-toggle="collapse" data-target="#navbarSupportedContent">
                            Logout
                    </li>
                    </Link>
                </div>

            </>
        )
    }

    const toggleTheme = () =>{
        
        setdark(!dark)
        authContext.setdarkk(dark)
        console.log(dark)
    }

    return (
        <nav className="navbar">
            <div className="logo_section">
                <img src={Logo} className="logo_img" alt="" />
                <Link className="logo_name" to="/" >
                    <div>Lurien</div>
                </Link>
            </div>

            <div className="culo">
                <ul className="nav-links">
                    <div className="theme_toggle" onClick={toggleTheme} style = {dark ? {background:'#F8F8F8'} : {background:'#282828'}}>
                        <div className="back_rec" style = {dark ? {background:'#282828',marginLeft:'4px'} : {background:'#F8F8F8',marginLeft:'47px'}}>
                            <div className="icon_theme">
                                <img src={dark ? Sol : Luna} alt=""/>
                            </div>
                        </div>
                    </div>
                    {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                </ul>
            </div>

        </nav>
    )
}

export default Navbar;