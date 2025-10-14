import React from "react";
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  sectionStack,
  actionBlue,
  infoText,
} from "../../../../components/ui.js";

export default function InfoComida() {
    return (
        <main className={pageContainer}>
            <img src={logo} alt="Logo UC Christus" className={logoClass} />
            <section className={sectionStack}>
                <div className={`${actionBlue} pointer-events-none`}>CAFETERÍAS, MARKETPLACES, ETC</div>
                <div className={infoText}>
                    <p>
                        El hospital cuenta con sectores para comodidad y consumo personal de acompañantes y visitas:
                    </p>
                    <h3 className="text-base font-semibold text-purple-700">Cafeterías</h3>
                    <ul className="list-disc space-y-2 pl-5">
                        <li>1er piso del Sector Acceso Principal y Sector G (con terraza).</li>
                        <li>2do piso, sala de espera.</li>
                    </ul>
                    <h3 className="text-base font-semibold text-purple-700">Marketplaces</h3>
                    <ul className="list-disc space-y-2 pl-5">
                        <li>1er piso del Sector Acceso Principal y Sector G.</li>
                    </ul>
                    <h3 className="text-base font-semibold text-purple-700">Máquinas expendedoras de alimentos</h3>
                    <ul className="list-disc space-y-2 pl-5">
                        <li>
                            En diferentes pisos del hospital, Imágenes, Urgencia y Banco de Sangre.
                        </li>
                    </ul>
                    <h3 className="text-base font-semibold text-purple-700">App para Room Service</h3>
                    <ul className="list-disc space-y-2 pl-5">
                        <li>
                            Acompañante o visita puede instalar la app “SIMPLY PAY by SODEXO” en Apple o Android Store (pago mediante tarjetas). Acompañante o visita deberá indicar habitación para la entrega.
                        </li>
                    </ul>
                   <p>
                    El hospital permite que los acompañantes traigan alimentos solo para <strong className="text-purple-700">consumo personal</strong> (no compartir con pacientes), siempre que estén en envases sellados (como tuppers o termos). La manipulación, refrigeración y pérdida de estos alimentos es responsabilidad del acompañante. No se permite su almacenamiento en espacios del hospital ni el uso de recursos del personal.
                   </p>
                </div>
                <Link className={actionBlue} to="/info_servicios_visitas">
                    Volver
                </Link>
            </section>
        </main>
    );
}
