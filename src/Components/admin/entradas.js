import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import AuthService from '../../Services/AuthService';
import '../../styles/admin.css'
import Pusher from 'pusher-js'
const ip = "http://192.168.1.203:8080"

const Entradas = () => {
    //actual user
    const { user } = useContext(AuthContext);
    let [entradas, setEntadas] = useState([]);
    let [entradasNuevas, setEntradasNuevas] = useState([])
    const [toggle, setToggle] = useState(false);
    const { dark, open2, setOpenn } = useContext(AuthContext);

    const rellenar = () => {
        console.log("[LENGTH]",entradas.length)
        // for(var entrada in entradasNuevas){
        //     console.log(`[CULO] ${entrada}`,entradasNuevas[entrada])
        // }
        
    }
    useEffect(() => {
        const funcion = () => {
            var pusher = new Pusher('b103ad2b1e20a1198455', {
                cluster: 'us2'
            });

            var channel = pusher.subscribe(user.companyID);
            channel.bind('updateEntrada', (data) => {
                let entradass = []
                for(var i in entradas){
                    entradass.push(entradas[i])
                }
                entradass.push({name:"juann",hora:"ioasjdiaso"})
                // console.log("data", entradass)
                // setEntradasNuevas([...entradasNuevas,data])
                setEntadas(entradass)
                // setEntradasNuevas(entradass)



                // console.log("[ARRAY]", [...entradasNuevas, data])

            });
        }
        funcion()
    }, [])
    return (
        <>
            {/* <button onClick = >caca</button> */}
            <div id="testttt" className="container entradas-panel" >
                <h1>ENTRADAS</h1>
                {entradasNuevas.length > 0 ? (rellenar()) : (<h1>No hay entradas nuevas hasta el momento</h1>)}
            </div>
        </>
    )
}

export default Entradas