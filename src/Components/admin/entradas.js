import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import AuthService from '../../Services/AuthService';
import '../../styles/admin.css'
import Pusher from 'pusher-js'
import axios from 'axios'
require('dotenv').config()
const ip = `http://${process.env.REACT_APP_IP}:8080`

const Entradas = () => {
    //actual user
    const { user } = useContext(AuthContext);
    const [entradasNuevas, setEntradasNuevas] = useState([])
    const [toggle, setToggle] = useState(false);
    const [test, setTest] = useState(null);
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
    const hola = (data) => {
        //console.log("QUE NDA")
        var divisor = document.createElement("DIV")
        //esto es para qeu el css quede bien
        var d1 = document.createElement("DIV")
        var d3 = document.createElement("DIV")
        // aca cierra owo

        var entrada_ = document.createElement("P");
        entrada_.innerHTML = `${data.name}, acaba de entrar, hora: ${data.hora}`;
        divisor.classList.add("entrada")

        divisor.append(d1)
        divisor.append(entrada_)
        divisor.append(d3)

        document.getElementById("testttt").appendChild(divisor);
    }


    useEffect(() => {
        const funcion = () => {
            setEntradasNuevas(localStorage.getItem("entradas"))
            //console.log("NOSE A VER", entradasNuevas)
        }
        funcion()
    }, [localStorage.getItem("entradas")])


    useEffect(() => {
        const funcion = () => {
            var pusher = new Pusher('b103ad2b1e20a1198455', {
                cluster: 'us2'
            });

            var channel = pusher.subscribe(user.companyID);

            channel.bind('updateEntrada', async (data) => {
                setTest(test)
            //console.log("TEST",test)

            });
        }
        funcion()
    }, [])
    return (
        <>
            {/* <button onClick = >caca</button> */}
            <div id="testttt" className="container entradas-panel" >
                {/* {entradasNuevas ? ( <h1>data</h1> ) : (<h1>No hay entradas nuevas hasta el momento</h1>)} */}
            </div>
            <button onClick={() => axios.post(`http://${process.env.REACT_APP_IP}:8080/api/entradas/new`, { name: "fabro", hour: "14:20", companyid: "1a2b3c",img:"https://i1.sndcdn.com/avatars-000703402813-kzxmda-t500x500.jpg" })}>CAZCACACACACA</button>
        </>
    )
}

export default Entradas