import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import Pagination from 'react-js-pagination';
import Message from "../Message";
import $ from 'jquery';

const {Toolbar, Data: {Selectors}, Editors, Formatters} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;


class AdminSearchFlights extends Component {


    constructor(props, context) {
        super(props, context);

        this._columns = [
            {
                key: 'f_id',
                name: 'Flight Id',
                filterable: true,
                editable: false,
                sortable: true,
                width:100
            },
            {
                key: 'airline_name',
                name: 'Airline Name',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'fare_e',
                name: 'Economy Fare',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'fare_b',
                name: 'Buisness Fare',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'fare_f',
                name: 'FirstClass Fare',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'fare_child_e',
                name: 'Economy Child Fare',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'fare_child_b',
                name: 'Buisness Child Fare',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'fare_child_f',
                name: 'FirstClass Child Fare',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'day_no',
                name: 'Day',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'time_s',
                name: 'Source Time',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'time_e',
                name: 'Economy Time',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'from',
                name: 'Source',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'to',
                name: 'Destination',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'delete',
                name: 'Delete Record',
                filterable: true,
                sortable: true,
                width:200
            }
        ];
        this.state =
            {
                message:'',
                activePage: 1,
                rows: '',
                filters: {},
                sortColumn: null,
                sortDirection: null,
                f_id: '',
                airline_name: '',
                fare_e: '',
                fare_b: '',
                fare_f: '',
                fare_child_e: '',
                fare_child_b: '',
                fare_child_f: '',
                day_no: '',
                time_s: '',
                time_e: '',
                from: '',
                to: ''
            };
    }



    componentWillMount() {
        this.adminViewFlights(this.state);
    }

    adminViewFlights = () => {

        API.adminViewFlights()
            .then((res) => {
                //  alert("in Admin view" + JSON.stringify(res));
                if (res.status === '201') {
                    console.log("in 201");
                    // alert("searchResult:"+JSON.stringify(res.results));
                    let rows = this.createRows(res.results);
                    // alert("BeforeStateSetting:" + JSON.stringify(rows));
                    this.setState({
                        searchResult: res.results,
                        rows: rows

                    });


                }
                else if (res.status === '401') {
                    this.setState({
                        message: JSON.stringify(res.errors)
                    });

                }
                else{
                    this.setState({
                        message: "Nothing to show! Try connecting to server!"
                    });
                }


            })
    }
    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

/*    adminSearchFlights = (flightdata) => {
        alert("in AdminSearch flights react" + JSON.stringify(flightdata));
        let status;
        API.adminSearchFlights(flightdata)
            .then((res) => {

                if (res.status === '201') {
                    console.log("in 201");
                    alert("searchResult:" + JSON.stringify(res.results));
                    let rows = this.createRows(res.results);
                    alert("BeforeStateSetting:" + JSON.stringify(rows));
                    this.setState({
                        message: "Displayed successfully",
                        searchResult: res.results,
                        rows: rows

                    });


                }


            })
    };*/

    adminDeleteFlights = (hoteldata) => {
        alert("in delete" + JSON.stringify(hoteldata));
        var payload = {f_id: hoteldata};
        API.adminDeleteFlights(payload)
            .then((res) => {
                if (res.status === '201') {
                    alert("deleted successfully");
                    this.setState({
                        message: "Record deleted successfully!",

                    });
                    window.location.href = '/adminsearchflights';

                }
                else if (res.status === '401') {
                    this.setState({
                        message: JSON.stringify(res.errors)
                    });

                }
                else{
                    this.setState({
                        message: "An error caused! Record could not be deleted!"
                    });
                }
            });
    };

    createRows = (search) => {
        //alert("in create rows "+ JSON.stringify(search.length));
        let rows = [];
        for (let i = 0; i < search.length; i++) {
            rows.push({

                f_id: search[i].f_id,
                airline_name: search[i].airline_name,
                fare_e: search[i].fare_e,
                fare_b: search[i].fare_b,
                fare_f: search[i].fare_f,
                fare_child_e: search[i].fare_child_e,
                fare_child_b: search[i].fare_child_b,
                fare_child_f: search[i].fare_child_f,
                day_no: search[i].day_no,
                time_s: search[i].time_s,
                time_e: search[i].time_e,
                from: search[i].from,
                to: search[i].to,
                delete: <button className="btn btn-primary" onClick={() => this.adminDeleteFlights(search[i].f_id)}>
                    Delete</button>

            });
            // alert("rows" + JSON.stringify(rows));
        }
        return rows;
    };
    getRows = () => {
        return Selectors.getRows(this.state);
        //return this.state.rows;
    };

    getSize = () => {
        return this.getRows().length;
        //return this.state.rows.length;
    };

    rowGetter = (rowIdx) => {
       // const rows = this.state.rows;
        let rows = this.getRows();
        // alert("in row getter" + JSON.stringify(rows[rowIdx])+"------------"+ JSON.stringify(rows));
        return rows[rowIdx];
    };

    handleGridSort = (sortColumn, sortDirection) => {
        this.setState({sortColumn: sortColumn, sortDirection: sortDirection});
    };

    handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
        let rows = this.state.rows.slice();
        let updatedRow;
        // this.rowGetter();
        //console.log("in handlegridrows updated" + JSON.stringify(rows));
       //console.log("in handlegridrows updated" + fromRow + "---" + toRow + "--" + JSON.stringify(updated));
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
           // console.log("rows " + JSON.stringify(rowToUpdate.f_id));
            updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }
        //console.log("after for loop : "+JSON.stringify(updatedRow.hId)+"--------------"+JSON.stringify(updated));

        //Get key from JSON Object
        let columnName = '';
        for (var column in updated) {
            columnName = column;
        }

        //Get value from JSON Object
        var newValue = updated[columnName]

        var payload = {f_id: updatedRow.f_id, newValue: newValue, columnName: columnName};
        console.log("========== payload : " + JSON.stringify(payload));

        //-------------------------------------API Call

        API.adminUpdateFlights(payload)
            .then((res) => {
                if (res.status === '201') {
                    alert("in 201");
                    this.setState({
                        message: "Record updated successfully"
                    });
                }
                else if (res.status === '401') {
                    this.setState({
                        message: JSON.stringify(res.errors)
                    });
                }
                else{
                    this.setState({
                        message: "An error caused! Record could not be updated!"
                    });
                }
            });

        this.setState({rows});
    };

    handleFilterChange = (filter) => {

       // console.log("------------" + JSON.stringify(filter));
        let newFilters = Object.assign({}, this.state.filters);
        //console.log("------------" + JSON.stringify(newFilters));
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
           // console.log("------------ 3rd" + JSON.stringify(newFilters));
        } else {
            delete newFilters[filter.column.key];
        }

        this.setState({filters: newFilters});

        //for(i=0;i<)
        //alert("------------------- in state.row" + JSON.stringify(newFilters.column.key));
       // console.log("------------ 3rd" + JSON.stringify(this.state.filters));
    };

    onClearFilters = () => {
        this.setState({filters: {}});
    };

    render() {
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">

                        <h2 style={{color:'orange'}}><u>FLIGHTS</u></h2>


                       {/* <div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                                <label>Search By Flight Name</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="flightname"

                                    placeholder="Enter flight name"
                                    value={this.state.airline_name}
                                    onChange={(event) => {
                                        this.setState({
                                            airline_name: event.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                                <label>Search By Id</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="flightid"
                                    placeholder="Enter flight id"
                                    value={this.state.f_id}
                                    onChange={(event) => {
                                        this.setState({
                                            f_id: event.target.value
                                        });
                                    }}
                                />
                            </div>

                        </div>
                        <div className="col-sm-3 col-md-3">
                            <div className="input-field">
                                <button
                                    className="btn btn-warning"
                                    type="button"
                                    onClick={() => this.adminSearchFlights(this.state)}>
                                    Search Flights
                                </button>
                            </div>
                        </div>

                    </div>

                    <div>*/}
                        <div className="col-sm-12 col-md-12">
                        <ReactDataGrid
                            onGridSort={this.handleGridSort}
                            enableCellSelect={true}
                            columns={this._columns}
                            rowGetter={this.rowGetter}
                            rowsCount={this.getSize()}
                            minHeight={500}
                            toolbar={<Toolbar enableFilter={true}/>}
                            onAddFilter={this.handleFilterChange}
                            onGridRowsUpdated={this.handleGridRowsUpdated}
                            onClearFilters={this.onClearFilters}
                        />
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={450}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                            <br/>
                        </div>
                        <div className="col-sm-12 col-md-12">
                            <Message message={this.state.message} />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(AdminSearchFlights);