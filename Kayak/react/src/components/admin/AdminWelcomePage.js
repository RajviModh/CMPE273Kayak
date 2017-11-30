import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2';

class AdminWelcomePage extends Component {
    constructor() {
        super();
        this.state =
            {
                flightschartData: {
                    labels: [],
                    datasets: []
                },
                carschartData: {
                    labels: [],
                    datasets: []
                },
                hotelschartData: {
                    labels: [],
                    datasets: []
                }
            };
    }

    componentWillMount() {
        this.adminViewCityByRevenue();
        this.adminViewHotelsChart();
        this.adminViewCarsChart();
    }

    adminViewCityByRevenue = () => {
        API.adminViewCityByRevenue()
            .then((res) => {
                if (res.status === '201') {
                    let getChartData = this.getChartData(res.results);
                    this.setState({
                        message: "Displayed successfully",
                        dataResult: res.results,
                        getChartData: getChartData
                    });
                }
            })
    }

    getChartData = (search) => {
        alert("in get chart data rows " + JSON.stringify(search));
        var label1 = [];
        var dataset1 = [];
        for (let i = 0; i < search.length; i++) {
            label1.push(search[i].fare);
            dataset1.push(search[i].airline_name);

        }
        this.setState({
            flightschartData: {
                labels: label1,
                datasets: [
                    {
                        label: "City",
                        data: dataset1,
                        backgroundColor: [
                            'rgba(255,99,132,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,99,132,0.6)',

                        ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
        })
    };


    adminViewHotelsChart = () => {
        API.adminViewHotelsChart()
            .then((res) => {
                if (res.status === '201') {
                    let getChartData1 = this.getChartData1(res.results);
                    this.setState({
                        message: "Displayed successfully",
                        dataResult: res.results,
                        getChartData: getChartData1
                    });
                }
            })
    }

    getChartData1 = (search) => {
        alert("in get chart data rows " + JSON.stringify(search));

        var label = [];
        var dataset = [];

        for (let i = 0; i < search.length; i++) {

            label.push(search[i].to);
            dataset.push(search[i].fare_e);


        }
        this.setState({
            carschartData: {
                labels: label,
                datasets: [
                    {
                        label: "City",
                        data: dataset,
                        backgroundColor: [
                            'rgba(255,99,132,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,99,132,0.6)',

                        ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
        })
    };


    adminViewCarsChart = () => {
        API.adminViewCarsChart()
            .then((res) => {
                if (res.status === '201') {
                    let getChartData2 = this.getChartData2(res.results);
                    this.setState({
                        message: "Displayed successfully",
                        dataResult: res.results,
                        getChartData: getChartData2
                    });
                }
            })
    }

    getChartData2 = (search) => {
        alert("in get chart data rows " + JSON.stringify(search));
        var label = [];
        var dataset = [];
        for (let i = 0; i < search.length; i++) {
            label.push(search[i].from);
            dataset.push(search[i].fare_e);


        }
        this.setState({
            hotelschartData: {
                labels: label,
                datasets: [
                    {
                        label: "City",
                        data: dataset,
                        backgroundColor: [
                            '#CCC',
                            '#36A2EB',
                            '#FFCE56'

                        ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56'
                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
        })
    };

    render() {
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-12">
                            <div className="col-md-4">
                                <div className="fa-bar-chart">
                                    <Bar
                                        data={this.state.flightschartData}
                                        width={500}
                                        height={300}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Largest city',
                                                fontSize: 20
                                            },
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="fa-pie-chart">
                                    <Pie data={this.state.carschartData}/>
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div className="col-md-12">


                            <Doughnut data={this.state.hotelschartData} height={100}/>

                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminWelcomePage);

