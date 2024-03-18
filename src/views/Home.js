import React from 'react'
import '../styles/HomeStyles.css'
import Sidebar from '../components/SideBar';
import Header from '../components/Header';

const Home = () =>{
    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar/>
            </div>
            <div className="right-h">
                <Header/>
                <div className="left-in">
                    <div className="button-container">
                        <button className="custom-button gestion">
                            <span className="button-text">Gestión y Administración</span>
                            <div className="sub-button">Gestionar &gt;</div>
                        </button>
                        <button className="custom-button facturacion">
                            Facturación
                            <div className="sub-button">Gestionar     &gt;</div>
                            </button>
                    </div>
                </div>
                <div className="right-in">
                    <div className="button-container">
                        <button className="custom-button nueva-venta">
                            Nueva Venta (Nuevo préstamo)
                            <div className="sub-button">Gestionar     &gt;</div>
                            </button>
                        <button className="custom-button aprobaciones">
                            Aprobaciones
                            <div className="sub-button">Gestionar     &gt;</div>
                            </button>
                        <button className="custom-button mapa">
                            Mapa
                            <div className="sub-button">Gestionar     &gt;</div>
                            </button>
                        <button className="custom-button configuracion">
                            Configuración
                            <div className="sub-button">Gestionar     &gt;</div>
                            </button>
                    </div>
                </div>
            </div>
        </div>
      );
    }

export default Home