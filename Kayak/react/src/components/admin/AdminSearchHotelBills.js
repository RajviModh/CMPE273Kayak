import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import Message from "../Message";
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class AdminSearchBills extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'BookingYear',
                name: 'Booking Year',
                width: 80,
                width:200,
                filterable: true
            },
            {
                key: 'BookingMonth',
                name: 'Booking Month',
                width:200,
                filterable: true
            },
            {
                key: 'BID',
                name: 'Booking Id',
                width:200,
                filterable: true
            },
            {
                key: 'user_fname',
                name: 'User First Name',
                width:200,
                filterable: true
            },
            {
                key: 'user_lname',
                name: 'User Last Name',
                width:200,
                filterable: true
            },
            {
                key: 'phone',
                name: 'Phone',
                width:200,
                filterable: true
            },
            {
                key: 'from_date',
                name: 'From Date',
                width:200,
                filterable: true
            },
            {
                key: 'to_date',
                name: 'To Date',
                width:200,
                filterable: true
            },
            {
                key: 'booking_date',
                name: 'Booking Date',
                width:200,
                filterable: true
            },
            {
                key: 'HID',
                name: 'Hotel Id',
                width:200,
                filterable: true
            },
            {
                key: 'hotelName',
                name: 'Hotel Name',
                width:200,
                filterable: true
            },
            {
                key: 'type',
                name: 'Room Type',
                width:200,
                filterable: true
            },
            {
                key: 'total_amount',
                name: 'Total Amount',
                width:200,
                filterable: true
            }
        ];

        this.state = { message:'', rows: '', filters: {} };
    }

    componentWillMount() {
        this.adminViewHotelBills();
    }

    adminViewHotelBills = () => {

        API.adminViewHotelBills()
            .then((res) => {
                //alert("in Admin view" + JSON.stringify(res));
                if (res.status === '201') {
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
    };
    createRows = (search) => {
        //alert("in create rows "+ JSON.stringify(search.length));
        let rows = [];
        for (let i = 0; i < search.length; i++) {
            rows.push({
                BookingYear:search[i].BookingYear,
                BookingMonth:search[i].BookingMonth,
                BID:search[i].BID,
                user_fname:search[i].user_fname,
                user_lname:search[i].user_lname,
                phone:search[i].phone,
                from_date:search[i].from_date,
                to_date:search[i].to_date,
                booking_date:search[i].booking_date,
                HID:search[i].HID,
                hotelName : search[i].hotelName,
                type: search[i].type,
                total_amount: search[i].total_amount

            });

        }
       // alert("rows" + JSON.stringify(rows));
        return rows;
    };
    
    getRows = () => {
        return Selectors.getRows(this.state);
    };

    getSize = () => {
        return this.getRows().length;
    };

    rowGetter = (rowIdx) => {
        console.log(rowIdx);
        let rows = this.getRows();
        return rows[rowIdx];
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
        // all filters removed
        this.setState({filters: {} });
    };

    render() {
        return (
            <div className="container">
                <div className="col-sm-12 col-md-12"><hr/><br/></div>
                <h2 style={{color:'orange'}}><u>HOTEL BILLS</u></h2>

                <ReactDataGrid
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    enableCellSelect={true}
                    rowsCount={this.getSize()}
                    minHeight={500}
                    toolbar={<Toolbar enableFilter={true}/>}
                    onAddFilter={this.handleFilterChange}
                    onClearFilters={this.onClearFilters} />);

            </div>

        );
    }
}
export default withRouter(AdminSearchBills);