import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import Message from "../Message";

const {Toolbar, Data: {Selectors}, Editors, Formatters} = require('react-data-grid-addons');

const {AutoComplete: AutoCompleteEditor, DropDownEditor, CheckboxEditor} = Editors;


class AdminSearchCars extends Component {

    constructor(props, context) {
        super(props, context);
        const doors = ['2','4'];
        const bags = ['1','2','3','4'];
        const capacity = ['4','5','6'];
        const type = ['small','medium','large','SUV','luxury','van','convertible','pickupTruck'];
        const categories = ['economy','compact','intermediate','standard'];

        this._columns = [
            {
                key: 'CID',
                name: 'Car Id',
                filterable: true,
                editable: false,
                sortable: true,
                width:100
            },
            {
                key: 'make',
                name: 'Car Make',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'model',
                name: 'Car Model',
                filterable: true,
                editable: true,
                sortable: true,
                width:200
            },
            {
                key: 'capacity',
                name: 'Car Capacity',
                filterable: true,
                editable: true,
                sortable: true,
                editor:<DropDownEditor options={capacity}/>,
                width:200
            },
            {
                key: 'doors',
                name: 'Number Of Doors',
                filterable: true,
                editable: true,
                sortable: true,
                editor:<DropDownEditor options={doors}/>,
                width:200
            },
            {
                key: 'bags',
                name: 'Number Of Bags',
                filterable: true,
                editable: true,
                sortable: true,
                editor:<DropDownEditor options={bags}/>,
                width:200
            },
            {
                key: 'type',
                name: 'Car Type',
                filterable: true,
                editable: true,
                sortable: true,
                editor:<DropDownEditor options={type}/>,
                width:200
            },
            {
                key: 'category',
                name: 'Car Category',
                filterable: true,
                editable: true,
                sortable: true,
                editor:<DropDownEditor options={categories}/>,
                width:200
            },
            {
                key: 'pickup_point',
                name: 'Pickup Point',
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
                rows: '',
                filters: {},
                sortColumn: null,
                sortDirection: null,
                CID:'',
                make:'',
                model:'',
                capacity:'',
                doors:'',
                bags:'',
                type:'',
                category:'',
                pickup_point:''
            };
    }


    componentWillMount() {
        this.adminViewCars(this.state);
    }

    adminViewCars = (flightdata) => {

        API.adminViewCars(flightdata)
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

/*    adminSearchCars = (cardata) => {
       // alert("in AdminSearch flights react" + JSON.stringify(cardata));
        let status;
        API.adminSearchCars(cardata)
            .then((res) => {

                if (res.status === '201') {
                    console.log("in 201");
                    alert("searchResult:"+JSON.stringify(res.results));
                    let rows = this.createRows(res.results);
                   // alert("BeforeStateSetting:" + JSON.stringify(rows));
                    this.setState({
                        message: "Displayed successfully",
                        searchResult: res.results,
                        rows: rows

                    });


                }


            })
    };*/

    adminDeleteCars =(cardata) => {
       // alert("in delete" + JSON.stringify(cardata));
        var payload={CID:cardata};
        API.adminDeleteCars(payload)
            .then((res) => {
                if (res.status === '201') {
                    alert("deleted successfully");
                    this.setState({
                        message: "Record deleted successfully!",

                    });
                    window.location.href = '/adminsearchcars';

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


                CID:search[i].CID,
                make:search[i].make,
                model:search[i].model,
                capacity:search[i].capacity,
                doors:search[i].doors,
                bags:search[i].bags,
                type:search[i].type,
                category:search[i].category,
                pickup_point:search[i].pickup_point,
                delete : <button className="btn btn-primary" onClick={() => this.adminDeleteCars(search[i].CID)}>Delete</button>

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

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();
        let updatedRow;
        // this.rowGetter();
        console.log("in handlegridrows updated"+ JSON.stringify(rows));
        console.log("in handlegridrows updated"+fromRow +"---"+toRow+"--"+ JSON.stringify(updated));
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            console.log("rows " +JSON.stringify(rowToUpdate.f_id));
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

        var payload = {CID:updatedRow.CID, newValue:newValue, columnName:columnName};
        console.log("========== payload : " + JSON.stringify(payload));

        //-------------------------------------API Call

        API.adminUpdateCars(payload)
            .then((res) => {
                if (res.status === '201') {
                    alert("successfully edited");
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

        this.setState({ rows });
    };

    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }

        this.setState({ filters: newFilters });
    };
    onClearFilters = () => {
        this.setState({ filters: {} });
    };
    render() {
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h2 style={{color:'orange'}}><u>CARS</u></h2>
                        {/*<div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                                <label>Search By Car Id</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="carid"

                                    placeholder="Enter car id"
                                    value={this.state.CID}
                                    onChange={(event) => {
                                        this.setState({
                                            CID: event.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-4">
                            <div className="col-sm-4 col-md-4">
                                <label>Search By Make</label>
                            </div>
                            <div className="col-sm-8 col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="make"
                                    placeholder="Enter car make"
                                    value={this.state.make}
                                    onChange={(event) => {
                                        this.setState({
                                            make: event.target.value
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
                                    onClick={() => this.adminSearchCars(this.state)}>
                                    Search Cars
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
                </div>
            </div>

        );
    }
}
export default withRouter(AdminSearchCars);