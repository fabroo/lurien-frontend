import React, { useState, useEffect, useContext } from 'react'
import AuthService from '../Services/AuthService';
import swal from 'sweetalert';
import { AuthContext } from '../Context/AuthContext';
import Tabla_mod from '../Components/mod/tabla-mod'


const Mod = props => {
    const [search, setSearch] = useState("");
    let [elinput, setElInput] = useState({ dni: 0, comapnyid: "", role: "user", username: "" })
    let [loading, isLoading] = useState(false)
    let [viewmore, setViewmore] = useState({ display: 'block' })
    
    const handleInput = e => {
        setSearch(e.target.value);
    };

    let [content, setContent] = useState(null)
    let [contenido, setContenido] = useState(null)
    const [toggle,setToggle] = useState(false);


    const {dark,open2,setOpenn} = useContext(AuthContext);

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

    useEffect(() => {
        isLoading(true)

        async function showw() {
            AuthService.getMod().then(res => {
                setContent(res.data.sort(function (a, b) {
                    if (a.companyID < b.companyID) { return -1; }
                    if (a.companyID > b.companyID) { return 1; }
                    return 0;
                }));
                var contendio = res.data.sort(function (a, b) {
                    if (a.companyID < b.companyID) { return -1; }
                    if (a.companyID > b.companyID) { return 1; }
                    return 0;
                })
                setContenido(contendio.slice(0, 7));
                isLoading(false)
            }, [])
        }
        showw()
    }, []);

    const searchh = (e) => {
        if (content) {
            e.preventDefault();
            var contenido = content.filter(function (username) {
                return username.username.includes(search)
            })
            setContenido(contenido)
        }
    }
    const chau = (dni) => {
        swal("Estas seguro de ello? No podras volver atrás", {
            buttons: {
                cancel: "Cancelar",
                catch: {
                    text: "Eliminar",
                    value: "borrar",
                }
            },
        })
            .then((value) => {
                switch (value) {

                    case "borrar":
                        swal("Eliminado", "El trabajador no forma mas parte de la empresa", "success");
                        AuthService.removeUser(dni).then(res => {
                            showData()
                        }, [])
                        break;

                    default:

                }
            });
    }
    const registrarNuevo = async () => {
        const dni = elinput.dni;
        const role = elinput.role;
        const username = String(dni);
        const companyid = elinput.companyid;
        await AuthService.registerNew({ dni: dni, companyID: companyid, role: role, username: username, companyid: companyid }).then(res => {
            //console.log(res)
        }, [])

        showData()

    }
    const handleChange = (e) => {
        setElInput({ ...elinput, [e.target.name]: e.target.value });
    }
    const showData = () => {

        AuthService.getMod().then(res => {
            setContent(res.data.sort(function (a, b) {
                if (a.companyID < b.companyID) { return -1; }
                if (a.companyID > b.companyID) { return 1; }
                return 0;
            }));
            setContenido(res.data.sort(function (a, b) {
                if (a.companyID < b.companyID) { return -1; }
                if (a.companyID > b.companyID) { return 1; }
                return 0;
            }));
            setViewmore({ display: "none" });
        }, [])
    }

    return (
       <>
       <Tabla_mod/>
       </>

    )
}
export default Mod