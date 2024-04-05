import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/SideBar'
import Header from '../../../components/Header'
import 'react-calendar/dist/Calendar.css'
import "../../../styles/ManagementAdministration/SalesStyles.css"

const IncomeHistory = () => {
    const [pageTitle] = useState('Historial de ingresos');
    const [income, setUincome] = useState([]);

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_INCOMES_LIST_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const incomeData = data.Ingresos;
                setUincome(incomeData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchIncome();
    }, []); 

    return (
        <div className="home-container">
            <div className="left-h">
                <Sidebar />
            </div>
            <div className="right-h">
                <Header title={pageTitle} backButtonPath="/income" startItem="General" />
                <div className="income-header">
                    <div className="left-title">
                        <div className="filter-fields">
                            <div className="filter-field">
                                <select id="filterByIdOrField" className="filter-select">
                                    <option value="" disabled selected hidden>/1/ - CN de la sociedad 234235</option>
                                    <option value="id">ID</option>
                                    <option value="field">Campo</option>
                                </select>
                            </div>
                            <div className="filter-field">
                                <select id="filterByUnit" className="filter-select">
                                    <option value="" disabled selected hidden>Todas las unidades:</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="income-form">
                    <table>
                        <thead>
                            <tr>
                                <th>Unidad</th>
                                <th>Caja</th>
                                <th>Trabajador</th>
                                <th>Tipo de gasto</th>
                                <th>Valor</th>
                                <th>Fecha</th>
                                <th>Comentario</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(income) && income.map(inco => (
                            <tr>
                                <td>{inco.id_unit_management}</td>
                                <td>Unidad</td>
                                <td>{inco.id_user_management}</td>
                                <td>{inco.income_type}</td>
                                <td>{inco.value}</td>
                                <td>{inco.date}</td>
                                <td>{inco.comment}</td>
                                <td>{inco.description}</td>
                                <td>Acciones</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default IncomeHistory;
