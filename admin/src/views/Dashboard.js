import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const AppointmentsChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token') || localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved to localStorage:', token);
        } else {
            localStorage.removeItem('token');
            console.log('No token found in URL, token removed from localStorage');
        }
    }, [token]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/appointments/monthly');
                const appointments = response.data;

                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const appointmentCounts = Array(12).fill(0);
                appointments.forEach(appointment => {
                    if (appointment.month >= 1 && appointment.month <= 12) {
                        appointmentCounts[appointment.month - 1] = parseInt(appointment.appointmentCount, 10);
                    }
                });

                setChartData({
                    labels: months,
                    datasets: [
                        {
                            label: 'Appointments',
                            data: appointmentCounts,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                });
            } catch (error) {
                console.error('Failed to fetch appointments data', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="content">
            <Row>
                <Col xs="12">
                    <Card className="card-chart">
                        <CardHeader>
                            <Row>
                                <Col className="text-left" sm="6">
                                    <h5 className="card-category">Total Appointments</h5>
                                    <CardTitle tag="h2">Monthly Appointments</CardTitle>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div className="chart-area" style={{ position: 'relative', height: '400px' }}>
                                <Line
                                    data={chartData}
                                    options={{ maintainAspectRatio: false }}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AppointmentsChart;
