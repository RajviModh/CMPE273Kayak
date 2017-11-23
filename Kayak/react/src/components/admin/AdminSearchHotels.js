import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
const {Toolbar, Data: {Selectors}, Editors, Formatters} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;

class AdminSearchHotels extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'hId',
                name: 'hId',
                filterable: true,
                editable: false,
                sortable: true
            },
            {
                key: 'hotelName',
                name: 'HotelName',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'city',
                name: 'City',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'delete',
                name: 'Delete',
                filterable: true,
                editable: true,
                sortable: true
            }
        ];
        this.state =
            {
                rows: '',
                filters: {},
                sortColumn: null,
                sortDirection: null,
                hotelName: 'Chariot',
                city: '',
                hId:'',
                operation: '',
                searchResult: []
            };
    }

    adminSearchHotels = (hoteldata) => {
       // alert("in AdminSearch hotels react" + JSON.stringify(hoteldata));
        let status;
        API.adminSearchHotels(hoteldata)
            .then((jsonData) => {

                if (jsonData.status === '201') {
                    console.log("in 201");
                    console.log("searchResult:")
                    let rows = this.createRows(jsonData.results);
                    console.log("BeforeStateSetting:" + rows);
                    this.setState({
                        message: "Displayed successfully",
                        searchResult: jsonData.results,
                        rows: rows

                    });


                }


            })
    };

    adminDeleteHotels =(hoteldata) => {
        alert("in delete" + JSON.stringify(hoteldata));
        var payload={hId:hoteldata};
        API.adminDeleteHotels(payload)
            .then((res) => {
                if (res.status === '201') {
                    alert("deleted successfully");
                    this.setState({
                        message: "Displayed successfully",

                    });

                }
            });
    };

    createRows = (search) => {
        //alert("in create rows "+ JSON.stringify(search.length));
        let rows = [];
        for (let i = 0; i < search.length; i++) {
            rows.push({

                hId : search[i].hId,
                hotelName: search[i].hotelName,
                city: search[i].city,
                delete : <button className="btn btn-primary" onClick={() => this.adminDeleteHotels(search[i].hId)}>Delete</button>

            });
            // alert("rows" + JSON.stringify(rows));
        }
        return rows;
    };
    getRows = () => {
        return this.state.rows;
    };

    getSize = () => {
        return this.state.rows.length;
    };

    rowGetter = (rowIdx) => {
        const rows = this.state.rows;
        //alert("in row getter" + rows[rowIdx]);
        return rows[rowIdx];
    };

    handleGridSort = (sortColumn, sortDirection) => {
        this.setState({sortColumn: sortColumn, sortDirection: sortDirection});
    };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();
        let updatedRow;
        // this.rowGetter();
        console.log("in handlegridrows updated"+ JSON.stringify(rows));
        console.log("in handlegridrows updated"+fromRow +"---"+toRow+"--"+ JSON.stringify(updated));
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            console.log("rows " +JSON.stringify(rowToUpdate.hId));
            updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }
        //console.log("after for loop : "+JSON.stringify(updatedRow.hId)+"--------------"+JSON.stringify(updated));

        //Get key from JSON Object
        let columnName = '';
        for(var column in updated){
            columnName=column;
        }

        //Get value from JSON Object
        var newValue = updated[columnName]

        var payload = {hId:updatedRow.hId, newValue:newValue, columnName:columnName};
        console.log("========== payload : " + JSON.stringify(payload));

        //-------------------------------------API Call

        API.adminUpdateHotels(payload)
            .then((res) => {
                if (res.status === '201') {
                    console.log("in 201");
                    this.setState({
                        message: "Displayed successfully",

                    });

                }
            });

        this.setState({ rows });
    };

    handleFilterChange = (filter) => {
        console.log("handleFilterChange:" + JSON.stringify(filter));
        let newFilters = Object.assign({}, this.state.filters);
        console.log("newFilterInit:" + JSON.stringify(newFilters));
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        console.log("newFilterAfterIf:" + JSON.stringify(newFilters));
        this.setState({filters: newFilters});
    };
    onClearFilters = () => {
        this.setState({filters: {}});
    };


    componentWillMount() {
        this.setState({
            rows: '',
            filters: {},
            sortColumn: null,
            sortDirection: null,
            hotelName: 'Chariot',
            city: '',
            hId:'',
            operation: '',
            searchResult: []
        });
    }

    render() {

        console.log("++++++= rows" + JSON.stringify(this.state.rows));

        console.log("+++++= searchresult" + JSON.stringify(this.state.searchResult));
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                                <label>Search By Name</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="hotelname"

                                    placeholder="Enter Hotel name"
                                    value={this.state.hotelName}
                                    // onChange={(event) => {
                                    //     this.setState({
                                    //         hotelName: event.target.value
                                    //     });
                                    // }}
                                />
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-1">
                            <select name="select" onChange={(event) => {
                                this.setState({
                                    operation: event.target.value
                                });
                            }} style={{width: 60}}>
                                <option>And</option>
                                <option>Or</option>
                            </select>
                        </div>
                        <div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                                <label>Search By City</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="city"
                                    placeholder="Enter city"
                                    value={this.state.city}
                                    onChange={(event) => {
                                        this.setState({
                                            city: event.target.value
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
                                    onClick={() => this.adminSearchHotels(this.state)}>
                                    Search Hotels
                                </button>
                            </div>
                        </div>

                    </div>

                    <div>
                        <ReactDataGrid
                            onGridSort={this.handleGridSort}
                            enableCellSelect={true}
                            columns={this._columns}
                            rowGetter={this.rowGetter}
                            rowsCount={this.state.rows.length}
                            minHeight={500}
                            toolbar={<Toolbar enableFilter={true}/>}
                            onAddFilter={this.handleFilterChange}
                            onGridRowsUpdated={this.handleGridRowsUpdated}
                            onClearFilters={this.onClearFilters}/>
                    </div>

                    {/*+ ":" + hotel.city + ":" + hotel.state + ":" + hotel.hotelPrice*/}

                   {/* <div className="col-sm-12 col-md-12">
                        HI
                        <table>
                            <thead>
                            <tr>
                                <th>HotelName</th>
                                <th></th>
                                <th>City</th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.state.searchResult.map((hotel, i) =>
                                <tr key={i}>{
                                    (

                                        <td>
                                            {hotel.hotelName}&nbsp; {hotel.city}
                                        </td>

                                    )}</tr>
                            )}

                            </tbody>


                        </table>
                    </div>*/}
                </div>
            </div>
        );
    }
}

export default withRouter(AdminSearchHotels);