import React, { Component } from 'react'
import '../../styles/admin.css'
import Pusher from 'pusher-js'
import axios from 'axios'

const ip = "http://192.168.1.203:8080"


export default class Nose2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entradas: [],
            user: this.props.user,
            names: ["fabro", "bren", "baritexz", "tievo", "dasdasd", "gati"]
        }
    }
    componentDidMount() {
        //AGARRAR X ENTRADAS

        var pusher = new Pusher('b103ad2b1e20a1198455', {
            cluster: 'us2'
        });

        var channel = pusher.subscribe(this.state.user.companyID);

        channel.bind('updateEntrada', async (data) => {
            this.setState({ entradas: [data, ...this.state.entradas] })
            // console.log("[STATE]",this.state)
        })
    }
    render() {

        return (
            <>
                <div id="testttt" className="container entradas-panel" >
                    {this.state.entradas.length > 0 ? (this.state.entradas.map(entrada =>
                        <div key={entrada.hora + Math.random(50) * 50} className="entrada">
                            <div className="1"></div>
                            <p>{`Acaba de llegar ${entrada.name} a las ${entrada.hora}`}</p>
                            <div className="3"></div>
                        </div>
                    )) : (<h1>No hay entradas nuevas hasta el momento</h1>)}
                </div>
                <button onClick={() => axios.post("http://192.168.1.203:8080/api/debug/companyid", { name: `${this.state.names[Math.floor(Math.random() * this.state.names.length)]}`, hour: `${Math.floor(Math.random() * 12)}:${Math.floor(Math.random(11) * 59)}`, companyid: "1a2b3c" })}>CAZCACACACACA</button>
            </>
        )
    }
}
