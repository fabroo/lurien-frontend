import React, { Component } from 'react'
import '../../styles/admin.css'
import { Bar } from 'react-chartjs-2';

require('dotenv').config()

export default class Nose2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
               
            state: {
                labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],

                datasets: [
                    {
                        label: 'Promedio de entradas',
                        backgroundColor: 'rgba(191,191,191,1)',
                        data: [11.30,8.25,18.32,9.43,10.26,12.21,15.36]
                    }
                ]
            }
        }
    }
    render() {

        return (
            <>
                <div className="contenedor-stats">
                    <div className=" body-todo grafico-stats">
                    <Bar
                        data={this.state.state}
                        options={{
                            title: {
                                display: true,
                                text: 'Ultima semana',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                            }
                        }}
                    />

                    </div>
                </div>
            </>
        )
    }
}
