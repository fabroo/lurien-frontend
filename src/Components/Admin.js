import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import '../styles/admin.css'
import Notifications from './Notifications'
import ReactTooltip from 'react-tooltip';

import Tabla from '../Components/admin/tabla'
import Nose2 from '../Components/admin/nose2'
import Nose1 from '../Components/admin/nose1'
import Entradas from '../Components/admin/entradas-2'

import b1 from '../images/boton4.svg'
import b3 from '../images/boton2.svg'
import b2 from '../images/boton3.svg'
import b4 from '../images/boton1.svg'
const Admin = props => {
  const { user } = useContext(AuthContext);

  const setAll = () => {
    setTabla(false)
    setEntradas(false)
    setNose1(false)
    setNose2(false)
  }
  const showTabla = () => {
    setAll()
    setTabla(true)
  }
  const showEntradas = () => {
    setAll()
    setEntradas(true)
  }
  const showNose1 = () => {
    setAll()
    setNose1(true)
  }
  const showNose2 = () => {
    setAll()
    setNose2(true)
  }

  const [tabla, setTabla] = useState(true)
  const [entradas, setEntradas] = useState(false)
  const [nose1, setNose1] = useState(false)
  const [nose2, setNose2] = useState(false)

  return (
    <>
      <Notifications />

      <div className="botonera-admin" style={{ marginBottom: '30px' }}>


        <button className="botones-paginas-tabla"  onClick={() => showTabla()} data-tip data-for='sadFace1'><img src={b1} alt="boton1" /> </button>
        <ReactTooltip place="bottom" id='sadFace1' type='dark' effect='solid'>
          <div id="b1" > Tabla de usuarios </div>
        </ReactTooltip>

        <button className="botones-paginas-tabla"  onClick={() => showEntradas()} data-tip data-for='sadFace2'><img src={b2} alt="boton2" /> </button>
        <ReactTooltip place="bottom" id='sadFace2' type='dark' effect='solid'>
          <div id="b2">Registro de entradas</div>
        </ReactTooltip>

        <button  className="botones-paginas-tabla" onClick={() => showNose1()} data-tip data-for='sadFace3'><img src={b3} alt="boton3" /></button>
        <ReactTooltip place="bottom" id='sadFace3' type='dark' effect='solid'>
          <div id="b3" >Analisis de entradas</div>
        </ReactTooltip>

        <button className="botones-paginas-tabla"  onClick={() => showNose2()} data-tip data-for='sadFace'><img src={b4} alt="boton4" /> </button>
        <ReactTooltip place="bottom" id='sadFace' type='dark' effect='solid'>
          <div id="b4">Proximamente..</div>
        </ReactTooltip>


      </div>

      {tabla ? (<Tabla />) : (entradas ? (<Entradas user={user} />) : (nose1 ? (<Nose1 />) : (nose2 ? (<Nose2 />) : (null))))}
    </>
  )
}
export default Admin
