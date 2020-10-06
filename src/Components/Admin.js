import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import '../styles/admin.css'

import Tabla from '../Components/admin/tabla'
import Entradas from '../Components/admin/entradas'
import Nose1 from '../Components/admin/nose1'
import Nose2 from '../Components/admin/nose2'

const Admin = props => {

  const setAll = () =>{
    setTabla(false)
    setEntradas(false)
    setNose1(false)
    setNose2(false)
  }
  const showTabla = () =>{
    setAll()
    setTabla(true)
    console.log("tabla")
  }
  const showEntradas = () =>{
    setAll()
    setEntradas(true)
  }
  const showNose1 = () =>{
    setAll()
    setNose1(true)
  }
  const showNose2 = () =>{
    setAll()
    setNose2(true)
  }

  const [tabla,setTabla] = useState(true)
  const [entradas,setEntradas] = useState(false)
  const [nose1,setNose1] = useState(false)
  const [nose2,setNose2] = useState(false)

  return (
    <>
    <div className="botonera-admin">
      <button onClick={() => showTabla()}>boton 1</button>
      <button onClick={() => showEntradas()}>boton 2</button>
      <button onClick={() => showNose1()}>boton 3</button>
      <button onClick={() => showNose2()}>boton 4</button>
    </div>
    {tabla ? (<Tabla/>) : (entradas ? (<Entradas/>) : (nose1 ? (<Nose1/>) : (nose2 ? (<Nose2/>) : (null)) ))}

    </>
  )
}
export default Admin