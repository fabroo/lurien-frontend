import React from 'react';
import { Link } from 'react-router-dom'
import Brenda from '../photos/brenda.png'
import Fabro from '../photos/fabro.jpg'
import Tievo from '../photos/tievo.jpg'
const Home = (props) => {


    return (
        <div className="holu"><div className="container">
            <br />
                <div className="jumbotron">
                <h1 className="display-4">Bienvenido a Lurien!</h1>
                <p className="lead">El sistema de seguridad que mediante utilización de reconocimiento facial, es capaz de sistematizar las entradas de tu edificio!</p>
                <hr className="my-4" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi tempore deleniti modi ducimus? Accusantium rem veniam, aperiam tempora, veritatis, deleniti ullam eveniet consectetur laboriosam optio eos placeat. Perferendis, animi sapiente!</p>
                <Link style={{textDecoration:'none'}}className="btn btn-primary btn-lg" to="#" role="button">Conoce mas!</Link>
            </div></div>
    

            <section className="page-section " id="team">
                <div className="container">
                    <div className="text-center" data-aos="zoom-out-up" data-aos-duration="1000">
                        <h2 className="section-heading" >Quienes somos</h2>
                    </div>
                    <div className="row aos-init aos-animate">
                        <div className="col-lg-4" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="50">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle fotoo" src={Brenda} alt="" />

                                <h4>Bren</h4>
                                <p className="text-muted">seguridad</p>
                                <Link className="btn btn-dark btn-social mx-2" to="#!"><i className="fab fa-twitter"></i></Link><Link className="btn btn-dark btn-social mx-2" to="https://www.instagram.com/brenchulain7"><i className="fab fa-instagram"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="100">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle fotoo" src={Tievo} alt="" />

                                <h4>Teivo</h4>
                                <p className="text-muted">pibe firebase</p>
                                <Link className="btn btn-dark btn-social mx-2" to="#!"><i className="fab fa-twitter"></i></Link><Link className="btn btn-dark btn-social mx-2" to="https://www.instagram.com/tievo_/"><i className="fab fa-instagram"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="200">
                            <div className="team-member">
                                <img className="mx-auto rounded-circle fotoo" src={Fabro} alt="" />

                                <h4>Fabro</h4>
                                <p className="text-muted">le toco hacer front</p>
                                <Link className="btn btn-dark btn-social mx-2" to="#!"><i className="fab fa-twitter"></i></Link><Link className="btn btn-dark btn-social mx-2" to="https://www.instagram.com/fabro__________/"><i className="fab fa-instagram"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center"><p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p></div>
                    </div>
                </div>
            </section>

          </div>
    )
}

export default Home;