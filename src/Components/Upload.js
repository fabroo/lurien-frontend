import React, { useState, useContext, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import swal from 'sweetalert';
import UploadLogo from '../images/upload-logo.svg'
import '../styles/upload.css'
import * as firebase from 'firebase'
import "firebase/auth";
import "firebase/storage";

const Upload = props => {
    const [picture, setPicture] = useState(null);
    const { user } = useContext(AuthContext);
    const [style, setStyle] = useState({ width: '0%' })
    const [porcentaje] = useState({ porcentaje: '0%' })
    const [fotos, setFotos] = useState({ cantidad: 0 })
   
    
    // eslint-disable-next-line
    const [toggle,setToggle] = useState(false);
    const [urls, setUrls] = useState(null)

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

    const onChangeHandler = (e) => {

        let fotos = e.target.files;
        let cantidad = fotos.length
        if (cantidad > 0 && cantidad < 4) {
            setStyle({ width: '0%' })
            setPicture(fotos)
            let urls_1 = [];
            for (var i = 0; i < fotos.length; i++) {
                urls_1.push({ url: URL.createObjectURL(fotos[i]), index: i })
            }
            setUrls(urls_1)
            //console.log("culo", urls_1)
            // console.log(e.target.files)
            setFotos({ cantidad })

        } else {
            alert("maximo 3 fotos perri")
        }
    }


    const onClickHandler = () => {
        if (fotos.cantidad > 0) {
            console.log("entramos")
            var str = firebase.storage().ref(`${user.companyID}/model/${user.dni}/`)
            var arr = []
            for (let i = 0; i < fotos.cantidad; i++) {
                console.log("foto n")
                const pic = picture[i];
                var child = str.child(`${i}.jpg`)
                child.put(pic).then(snap =>{
                    snap.ref.getDownloadURL().then(url=>{
                        arr.push(url)
                        if(arr.length===3){
                            console.log(arr)
                            AuthService.upload(arr, user.companyID, user.dni)
                        }
                    })
                })
                
            }
            
        } else {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Intentaste entregar vacio pa',
                footer: 'Volve a intentar'
            })
        }
    }
    return (
        <div className="contenedor-general" onClick={() => {
            if (open2) {
                setOpenn(false)
                //console.log("deja de tocarme")

            }
        }}>
            <div className="">
                <div className="contenedor">
                    <img src={UploadLogo} alt="" className="logo-upload" />
                    <p className="drag-n-drop">Drag &amp; Drop</p>
                    <p className="or-text">Or</p>
                        <label for="customFile" class="custom-file-upload">
                             Browse Files
</label>
                        <input  type="file" multiple onChange={onChangeHandler}  id="customFile" accept="image/png, image/jpeg,image/jpg"/>

                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={style} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{porcentaje.porcentaje}</div>
                        </div>
                        <div className="img-zone">
                            {urls ? (
                                urls.map((url0) => {
                                    return <div className="cover-img"><img alt="prof-img"id={url0.index} className="image-preview" key={url0.index} src={url0.url} /></div>
                                })
                            ) : (null)}
                        </div>
                        <div className="vacio"></div>
                </div>
                <button type="button" className="boton-aceptar" onClick={onClickHandler}>Upload</button>

            </div>
        </div>
    )
}

export default Upload;