import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import "../../../styles/ManagementAdministration/ManagementAdministrationStyles.css"


const ReportsAndMetrics = () => {
    const navigate = useNavigate();
    const [pageTitle] = useState('Reportes y métricas');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [units, setUnits] = useState([]);
    const [typeReport, setTypeReport] = useState([]);
    const [errors, setErrors] = useState({});
    const [reportAndMetrics, setReportAndMetrics] = useState({
        id_unit_management: '',
        id_report_type: ''
    });


    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_UNITS_LIST_ENDPOINT}`);
                const data = await response.json();
                setUnits(data['Gestion de Unidades']);
            } catch (error) {
                console.error('Error fetching units:', error);
            }
        };
        fetchUnits();

        const fetchTypeReport = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_REPORT_TYPE_LIST_ENDPOINT}`);
                const data = await response.json();
                setTypeReport(data['Tipo Reportes']);
            } catch (error) {
                console.error('Error fetching Report Type:', error);
            }
        };
        fetchTypeReport();

        const handleClickOutside = (event) => {
          if (!event.target.closest('.sidebar') && isMenuVisible) {
            setIsMenuVisible(false);
            if (window.innerWidth > 768) {
              setSidebarExpanded(false);
            }
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isMenuVisible]);

      const handleSubmit = async (e) => {
        e.preventDefault();    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_REPORT_AND_METRICS_CREATE_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reportAndMetrics)
            });
            const data = await response.json();
            if (data.status === 200) {
                alert('Reporte Y Metrica creado exitosamente');
                navigate('/manage-platform');
            } else {
                alert('Error al crear la Reporte Y Metrica');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };

      const handleChange = (e) => {
        setReportAndMetrics({
            ...reportAndMetrics,
            [e.target.id]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.id]: ''
        });
    };
    return (
        <div className="home-container">
            <FontAwesomeIcon 
                icon={faBars} 
                className="menu-icon" 
                onClick={() => setIsMenuVisible(!isMenuVisible)}
            />
            <Sidebar
                isMenuVisible={isMenuVisible}
                setIsMenuVisible={setIsMenuVisible}
                setParentSidebarExpanded={setSidebarExpanded}
            />
            <div className={`right-h ${sidebarExpanded ? '' : 'contracted'}`}>
                <Header title={pageTitle} backButtonPath="/manage-platform" startItem="Administrar"/>
                <form className="income-form" onSubmit={handleSubmit}>
                    <div className="income-fields">
                        <div className="income-field">
                            <label htmlFor="unit">Unidad</label>
                            <select id="id_unit_management" name="id_unit_management" className="management-select" onChange={handleChange} value={reportAndMetrics.id_unit_management}>
                                <option value="">Seleccione una unidad</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                ))}
                            </select>
                        </div>
                        <div className="income-field">
                            <label htmlFor="ReportType">Tipo de reporte</label>
                            <select id="id_report_type" name="id_report_type" className="management-select" onChange={handleChange} value={reportAndMetrics.id_report_type}>
                                <option value="">Seleccione una unidad</option>
                                {typeReport.map(reportType => (
                                    <option key={reportType.id} value={reportType.id}>{reportType.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="create-button2 create" style={{marginTop:'20px', marginLeft:'33px'}}>Generar reporte</button>
                </form>
            </div>
        </div>
    );
};

export default ReportsAndMetrics;
