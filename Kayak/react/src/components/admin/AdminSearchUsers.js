import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
const {Toolbar, Data: {Selectors}, Editors, Formatters} = require('react-data-grid-addons');
const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;

class AdminSearchUsers extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'user_id',
                name: 'User Id',
                filterable: true,
                editable: false,
                sortable: true
            },
            {
                key: 'user_fname',
                name: 'First Name',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'user_lname',
                name: 'Last Name',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'address1',
                name: 'Address1',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'address2',
                name: 'Address2',
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
                key: 'state',
                name: 'State',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'zip',
                name: 'Zip Code',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'email_id',
                name: 'EmailId',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'password',
                name: 'Password',
                filterable: true,
                editable: true,
                sortable: true
            },
            {
                key: 'phone',
                name: 'Phone',
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
                user_id: '',
                user_fname: '',
                user_lname: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip:'',
                email_id: '',
                password: '',
                phone: ''
            };
    }


    componentWillMount() {
        this.adminViewUsers(this.state);
    }

    adminViewUsers = (flightdata) => {

        API.adminViewUsers(flightdata)
            .then((res) => {
                alert("in Admin view" + JSON.stringify(res));
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
    }

    createRows = (search) => {
        //alert("in create rows "+ JSON.stringify(search.length));
        let rows = [];
        for (let i = 0; i < search.length; i++) {
            rows.push({

                user_id: search[i].user_id,
                user_fname: search[i].user_fname,
                user_lname: search[i].user_lname,
                address1: search[i].address1,
                address2: search[i].address2,
                city: search[i].city,
                state: search[i].state,
                zip:search[i].zip,
                email_id: search[i].email_id,
                password: search[i].password,
                phone: search[i].phone,


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

    handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
        let rows = this.state.rows.slice();
        let updatedRow;
        // this.rowGetter();
        console.log("in handlegridrows updated" + JSON.stringify(rows));
        console.log("in handlegridrows updated" + fromRow + "---" + toRow + "--" + JSON.stringify(updated));
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            console.log("rows " + JSON.stringify(rowToUpdate.f_id));
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

        var payload = {user_id: updatedRow.user_id, newValue: newValue, columnName: columnName};
        console.log("========== payload : " + JSON.stringify(payload));

        //-------------------------------------API Call

        API.adminUpdateUsers(payload)
            .then((res) => {
                alert("in res")
                if (res.status === '201') {
                    alert("in 201");
                    this.setState({
                        message: "Displayed successfully",

                    });

                }
            });

        this.setState({rows});
    };

    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }

        this.setState({filters: newFilters});
    };
    onClearFilters = () => {
        this.setState({filters: {}});
    };

    render() {
        return (
            <div className="fh5co-hero">
                <div className="container">
                    <div className="row justify-content-md-center">

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
                    </div>
                </div>
            </div>
            </div>

        );
    }
}
export default withRouter(AdminSearchUsers);