import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import '../index.css'
import Uwu from '../photos/uwu.gif'


export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dark,setdarkk] = useState(false);
    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
        
    }, []);

    return (
        <div>
            {!isLoaded ?
                <div >
                    <div style={{ display: "table", height: "100vh", width: "100vw", textAlign: "center",overflowY:'hidden', overflow: "hidden" }}>
                        <div style={{ display: "table-cell", "verticalAlign": "middle" }}>
                            <div >
                                <h1 style={{ fontSize: "2.7em" }}>Loading...</h1>
                                <br/>
                                <img src={Uwu} alt=""/>

        </div>
                        </div>
                    </div>
                </div> :
                //, dni, setDni, mail, setMail, companyid, setCompanyid,createdAccount,setCreatedAccount 
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated,dark,setdarkk }}>
                    {children}
                </AuthContext.Provider>
            }
        </div >
    )
}