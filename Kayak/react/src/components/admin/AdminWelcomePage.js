import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import {Bar, Line, Pie, Doughnut, Bubble} from 'react-chartjs-2';

class AdminWelcomePage extends Component {
    constructor() {
        super();
        this.state =
            {
                flightschartData: {
                    labels: [],
                    datasets: []
                },
                flightschartData1: {
                    labels: [],
                    datasets: []
                },
                flightschartData2: {
                    labels: [],
                    datasets: []
                }
                ,
                hotelschartData: {
                    labels: [],
                    datasets: []
                }
                ,
                hotelschartData1: {
                    labels: [],
                    datasets: []
                }
                ,
                hotelschartData2: {
                    labels: [],
                    datasets: []
                }
                ,
                carschartData: {
                    labels: [],
                    datasets: []
                }
                ,
                carschartData1: {
                    labels: [],
                    datasets: []
                }
                ,
                carschartData2: {
                    labels: [],
                    datasets: []
                }
            };
    }

    componentWillMount() {
        this.adminViewFlightsChart();
        //this.adminViewHotelsChart();
        //this.adminViewCarsChart();
    }

    adminViewFlightsChart = () => {
        API.adminViewFlightsChart()
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
        console.log("in get chart data rows " + JSON.stringify(search));
        var label = [];
        var dataset = [];
        var label1 = [];
        var dataset1 = [];
        var label2 = [];
        var dataset2 = [];
        var label3 = [];
        var dataset3 = [];
        var label4 = [];
        var dataset4 = [];
        var label5 = [];
        var dataset5 = [];
        var label6 = [];
        var dataset6 = [];
        var label7 = [];
        var dataset7 = [];
        var label8 = [];
        var dataset8 = [];
       // console.log("in get chart data rows " + JSON.stringify(search[0]));
        for (let i = 0; i < search[0].length; i++) {

            label.push(search[0][i].airlineName);
            dataset.push(search[0][i].fare);

        }
       // console.log("in get chart data rows " + JSON.stringify(search[1]));
        for (let i = 0; i < search[1].length; i++) {

            label1.push(search[1][i].from);
            dataset1.push(search[1][i].fare);

        }
       // console.log("in get chart data rows " + JSON.stringify(search[2]));
        for (let i = 0; i < search[2].length; i++) {

            label2.push(search[2][i].airlineName);
            dataset2.push(search[2][i].fare);

        }
        for (let i = 0; i < search[3].length; i++) {

            label3.push(search[3][i].hotelName);
            dataset3.push(search[3][i].revenue);

        }
        for (let i = 0; i < search[4].length; i++) {

            label4.push(search[4][i].hotelCity);
            dataset4.push(search[4][i].revenue);

        }
        for (let i = 0; i < search[5].length; i++) {

            label5.push(search[5][i].hotelName);
            dataset5.push(search[5][i].revenue);

        }
        for (let i = 0; i < search[6].length; i++) {

            label6.push(search[6][i].carName);
            dataset6.push(search[6][i].revenue);

        }
        for (let i = 0; i < search[7].length; i++) {

            label7.push(search[7][i].city);
            dataset7.push(search[7][i].revenue);

        }
        for (let i = 0; i < search[8].length; i++) {

            label8.push(search[8][i].carName);
            dataset8.push(search[8][i].revenue);

        }

        this.setState({
            flightschartData: {
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
            },
            flightschartData1: {
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
            },
            flightschartData2: {
                labels: label2,
                datasets: [
                    {
                        label: "City",
                        data: dataset2,
                        backgroundColor: [
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6384',
                            '#BB8FCE',
                            '#900C3F'

                        ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [
                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
            ,
            hotelschartData: {
                labels: label3,
                datasets: [
                    {
                        label: "City",
                        data: dataset3,
                        backgroundColor: [
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6384',
                            '#BB8FCE',
                            '#900C3F'

                        ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [

                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
            ,
            hotelschartData1: {
                labels: label4,
                datasets: [
                    {
                        label: "City",
                        data: dataset4,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [
                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
            ,
            hotelschartData2: {
                labels: label5,
                datasets: [
                    {
                        label: "City",
                        data: dataset5,
                        backgroundColor: [
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6384',
                            '#BB8FCE',
                            '#900C3F'

                        ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [

                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            },
            carschartData: {
                labels: label6,
                datasets: [
                    {
                        label: "City",
                        data: dataset6,
                        backgroundColor: [
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6384',
                            '#BB8FCE',
                            '#900C3F'

                        ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [
                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
            ,
            carschartData1: {
                labels: label7,
                datasets: [
                    {
                        label: "City",
                        data: dataset7,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [
                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
            ,
            carschartData2: {
                labels: label8,
                datasets: [
                    {
                        label: "City",
                        data: dataset8,
                        backgroundColor: [
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6384',
                            '#BB8FCE',
                            '#900C3F'

    ],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: [
                        ],
                        hoverBorderColor: 'rgba(255,99,132,1)',


                    }
                ]
            }
        })
    };


    render() {
        return (
            <div className="fh5co-hero" style={{height:1000}}>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-12">
                            <div className="row">
                            <div className="col-md-4">
                                <div className="fa-bar-chart">
                                    <Bar
                                        data={this.state.flightschartData}
                                        width={500}
                                        height={300}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Top 10 Flight carriers by revenue/year',
                                                fontSize: 20
                                            },
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="fa-pie-chart">
                                    <Line data={this.state.flightschartData1} options={{
                                        title: {
                                            display: true,
                                            text: 'Top 10 cities by revenue',
                                            fontSize: 20
                                        },
                                        maintainAspectRatio: false
                                    }} height={300}/>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <Doughnut data={this.state.flightschartData2} options={{
                                    title: {
                                        display: true,
                                        text: 'Top 10 Flight carriers by revenue/month',
                                        fontSize: 20
                                    },
                                    maintainAspectRatio: false
                                }} height={300} text='Top 10 properties by last month'/>

                            </div>
                            <br/>
                                <br/>
                                <hr/>
                        </div>
                        </div>
                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="fa-bar-chart">
                                        <Bar
                                            data={this.state.hotelschartData}
                                            width={500}
                                            height={300}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: 'Top 10 Hotels by revenue/year',
                                                    fontSize: 20
                                                },
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="fa-pie-chart">
                                        <Line data={this.state.hotelschartData1} options={{
                                            title: {
                                                display: true,
                                                text: 'Top 10 cities by revenue',
                                                fontSize: 20
                                            },
                                            maintainAspectRatio: false
                                        }} height={300}/>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <Doughnut data={this.state.hotelschartData2} height={300} options={{
                                        title: {
                                            display: true,
                                            text: 'Top 10 Hotels by revenue/month',
                                            fontSize: 20
                                        },
                                        maintainAspectRatio: false
                                    }}/>

                                </div>
                                <br/>
                                <br/>
                                <hr/>
                            </div>

                        </div>

                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="fa-bar-chart">
                                        <Bar
                                            data={this.state.carschartData}
                                            width={500}
                                            height={300}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: 'Top 10 Car companies by revenue/year',
                                                    fontSize: 20
                                                },
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="fa-pie-chart">
                                        <Line data={this.state.carschartData1} options={{
                                            title: {
                                                display: true,
                                                text: 'Top 10 cities by revenue',
                                                fontSize: 20
                                            },
                                            maintainAspectRatio: false
                                        }} height={300}/>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <Doughnut data={this.state.carschartData2} height={300} options={{
                                        title: {
                                            display: true,
                                            text: 'Top 10 Car companies by revenue/month',
                                            fontSize: 20
                                        },
                                        maintainAspectRatio: false
                                    }}/>

                                </div>
                                <br/>
                                <br/>
                                <hr/>
                            </div>

                        </div>

                        </div>
                    </div>
                </div>

        );
    }
}

export default withRouter(AdminWelcomePage);

