import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoHorariosEntrada() {
    return (
        <div className="app">
            <img src={logo} alt="Logo UC Christus" className="logo" />
            <section className="botones">
                <div className="bot botones_azules titulo-estatica"> CONDICIONES DE ENTRADA </div>
                <div className="info-text">
                    <h3 className="center-title">¿Qué debo cumplir para ser visita?</h3>
                    <p>
                        Las visitas deben ser mayores de 12 años, sin embargo,  se permite el ingreso de menores de 12 años en estos casos.
                    </p>
                    <ul>
                        <li>Hijos(as) o hermanos(as) de pacientes hospitalizados por más de 12 días.</li>
                        <li>Visitas significativas para pacientes en cirugía de alto riesgo o en fin de vida.</li>
                        <li>Lactantes hijos(as) de pacientes o acompañantes hospitalizados.</li>
                        <li>Menores que requieran acompañar a un adulto en Urgencia, Imágenes o Banco de Sangre.</li>
                    </ul>
                    <p>
                        Siempre deben estar acompañados de un adulto responsable.
                    </p>
                    <h3>Condiciones sanitarias de ingreso</h3>
                    <ul>
                        <li>
                            Higiene de manos obligatoria al entrar o salir de salas. </li>
                        <li>
                            Uso de mascarilla si presenta síntomas respiratorios.</li>
                        <li>
                            Seguir instrucciones del personal ante señaléticas especiales.
                        </li>
                    </ul>
                    <h3>
                        Restricción por síntomas
                    </h3>
                    <ul>
                        <li>
                            Visitas o acompañantes con tos, fiebre u otros síntomas no pueden ingresar.
                        </li>
                        <li>
                            En caso de síntomas, el acompañante debe ser reemplazado e informado al equipo clínico.
                        </li>
                    </ul>
                    <h3>
                        Seguridad del paciente
                    </h3>
                    <ul>
                        <li>
                            El hospital puede restringir el ingreso si se incumplen estas condiciones.
                        </li>
                    </ul>
                </div>
                <Link className="bot botones_azules" to="/info_horarios_condiciones">
                    Volver
                </Link>
            </section>
        </div>
    );
}