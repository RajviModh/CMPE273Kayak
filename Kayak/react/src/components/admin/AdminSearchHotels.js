import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import Message from "../Message";
const {Toolbar, Data: {Selectors}, Editors, Formatters} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;

class AdminSearchHotels extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'HID',
                name: 'Hotel Id',
                filterable: true,
                editable: false,
                sortable: true,
                width:100,
                height:500
            },
            {
                key: 'name',
                name: 'Hotel Name',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'city',
                name: 'City',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'state',
                name: 'State',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'stars',
                name: 'Star Ratings',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'freebies',
                name: 'Freebies',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'RID',
                name: 'Room Id',
                filterable: true,
                editable: false,
                sortable: true,
                width:100
            },
            {
                key: 'type',
                name: 'Room Type',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'total_rooms',
                name: 'Total Rooms',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'rent',
                name: 'Rent',
                filterable: true,
                editable: true,
                sortable: true,
                width:100
            },
            {
                key: 'delete',
                name: 'Delete',
                filterable: true,
                editable: false,
                sortable: true,
                width:200
            }
        ];
        this.state =
            {
                message:'',
                rows: '',
                filters: {},
                sortColumn: null,
                sortDirection: null,
                HID: '',
                name:'',
                city: '',
                state:'',
                stars:'',
                freebies:'',
                RID:'',
                type:'',
                total_rooms:'',
                rent:''
            };
    }

    componentWillMount() {
        this.adminViewHotels(this.state);

    }

    adminViewHotels = (flightdata) => {

        API.adminViewHotels(flightdata)
            .then((res) => {
                //alert("in Admin view" + JSON.stringify(res));
                if (res.status === '201') {
                    console.log("in 201");
                    //alert("searchResult:"+JSON.stringify(res.results));
                    let rows = this.createRows(res.results);
                    //alert("BeforeStateSetting:" + JSON.stringify(rows));
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

   /* adminSearchHotels = (hoteldata) => {
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
    };*/

    adminDeleteHotels =(hoteldata) => {
        alert("in delete" + JSON.stringify(hoteldata));
        var payload={HID:hoteldata};
        API.adminDeleteHotels(payload)
            .then((res) => {
                if (res.status === '201') {
                    alert("deleted successfully");
                    this.setState({
                        message: "Record deleted successfully!",

                    });
                    window.location.href = '/adminsearchhotels';

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

                HID : search[i].HID,
                name: search[i].name,
                city: search[i].city,
                state : search[i].state,
                stars: search[i].stars,
                freebies: search[i].freebies,
                RID:search[i].RID,
                type:search[i].type,
                total_rooms:search[i].total_rooms,
                rent:search[i].rent,

                delete : <button className="btn btn-primary" style={{height:20, paddingTop:0, paddingBottom:18}} onClick={() => this.adminDeleteHotels(search[i].HID)}>Delete</button>

            });
            // alert("rows" + JSON.stringify(rows));
        }
        return rows;
    };
    getRows = () => {
        return Selectors.getRows(this.state);
    };

    getSize = () => {
        return this.getRows().length;
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

        var payload = {HID:updatedRow.HID, newValue:newValue, columnName:columnName};
        console.log("========== payload : " + JSON.stringify(payload));

        //-------------------------------------API Call

        API.adminUpdateHotels(payload)
            .then((res) => {
                if (res.status === '201') {
                    console.log("in 201");
                    this.setState({
                        message: "Record updated successfully",
                        columnName:''

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




    render() {

        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="col-sm-12 col-md-12"><hr/><br/></div>
                        <h2 style={{color:'orange'}}><u>HOTELS</u></h2>
                        {/*<div className="col-sm-4 col-md-4">
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
                            onClearFilters={this.onClearFilters}/>
                        <br/>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        <Message message={this.state.message} />
                    </div>
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

        );
    }
}

export default withRouter(AdminSearchHotels);