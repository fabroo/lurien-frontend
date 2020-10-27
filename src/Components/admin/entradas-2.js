import React, { Component } from 'react'
import '../../styles/admin.css'
import Pusher from 'pusher-js'
import Loading from '../../images/img.gif'
import axios from 'axios'
require('dotenv').config()

export default class Nose2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entradas: [],
            user: this.props.user,
            names: ["fabro", "bren", "baritexz", "tievo", "dasdasd", "gati"],
            username: "",
            img: "",
            companyid: this.props.user.companyID
        }
    }
    async componentDidMount() {

        const entradas = await axios.get(`http://${process.env.REACT_APP_IP}:8080/api/entradas/historial/${this.state.companyid}`)
        let dbEntries = entradas.data.entradas

        this.setState({ entradas: dbEntries })
        var pusher = new Pusher('b103ad2b1e20a1198455', {
            cluster: 'us2'
        });

        var channel = pusher.subscribe(this.state.user.companyID);

        channel.bind('updateEntrada', async (data) => {
            this.setState({ entradas: [data, ...this.state.entradas] })
        })
    }
    setOpenModelSi = (uno, dos,tres) => {
        this.setState({ username: uno, img: dos,hour:tres })
    }
    render() {

        return (
            <>
                <div className="body-todo">
                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title dni-text" id="exampleModalLabel">{`[${this.state.hour}], ${this.state.username}`}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span style={{ color: "white" }} aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group" style={{ alignItems: "center", textAlign: 'center' }}>
                                        <img src={this.state.img} style={{ width: "600px" }} alt="pfp" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="testttt" className="container entradas-panel" >
                        {this.state.entradas.length > 0 ? (this.state.entradas.map(entrada =>
                            <div key={entrada.hour + Math.random(50) * 50} className="entrada">
                                <div className="1"></div>
                                <div className="contenido-entrada">
                                    <img data-toggle="modal" data-target="#exampleModal1" onClick={() => this.setOpenModelSi(entrada.name, entrada.img,entrada.hour)} className="foto-contenido-entrada" src={entrada.img} alt="" />
                                    <p>{`[${entrada.hour}] entrada de: ${entrada.name}`}</p>

                                </div>
                                <div className="3"></div>
                            </div>
                        )) : (
                                <div className="a" style={{ alignItems: 'center', textAlign: 'center', margin: 'auto auto' }}>
                                    <img src={Loading} alt="loading" style={{ width: '200px', color: "white" }} />
                                </div>
                            )}
                    </div>
                    <div className="parte-pagination">
                        <button className="flecha-pagination">&#x3c;</button>
                        <button className="flecha-pagination">&#x3e;</button>
                    </div>
                </div>
            </>
        )
    }
}
