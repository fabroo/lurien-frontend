import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import AuthService from '../../Services/AuthService';
const Nose1 = () => {
    const [toggle, setToggle] = useState(false);
    const { dark, open2, setOpenn } = useContext(AuthContext);
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
    return (
        <>
            <h1>NOSE 1</h1>
        </>
    )
}

export default Nose1