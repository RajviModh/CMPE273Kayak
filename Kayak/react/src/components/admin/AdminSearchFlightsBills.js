import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import Message from "../Message";
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class AdminSearchFlightsBills extends Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'BookingYear',
        name: 'Booking Year',
        width: 200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'BookingMonth',
        name: 'Booking Month',
        width:200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'BID',
        name: 'Booking Id',
        width:100,
        filterable: true,
        sortable: true,
      },
      {
        key:'f_id',
        name: 'Flight Id',
        width:100,
        filterable: true,
        sortable: true,
      },
      {
        key: 'booking_date',
        name: 'Booking Date',
        width:100,
        filterable: true,
        sortable: true,
      },
      {
        key: 'airline_name',
        name: 'Airline Name',
        width:200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'time_s',
        name: 'Departure Time',
        width:100,
        filterable: true,
        sortable: true,
      },

      {
        key: 'time_e',
        name: 'Arrival Time',
        width:100,
        filterable: true,
        sortable: true,
      },


      {
        key: 'from',
        name: 'Source',
        width:200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'to',
        name: 'Destination',
        width:200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'booked_seats_e',
        name: 'Economy Class Booked Seats',
        width:100,
        filterable: true,
        sortable: true,

      },
      {
        key: 'booked_seats_b',
        name: 'Buisness Class Booked Seats',
        width:100,
        filterable: true,
        sortable: true,
      },
      {
        key: 'booked_seats_f',
        name: 'FirstClass Booked Seats',
        width:100,
        filterable: true,
        sortable: true,
      },
      {
        key: 'user_fname',
        name: 'User First Name',
        width:200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'user_lname',
        name: 'User Last Name',
        width:200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'phone',
        name: 'Phone',
        width:200,
        filterable: true,
        sortable: true,
      },
      {
        key: 'fare',
        name: 'Total Amount',
        width:100,
        filterable: true,
        sortable: true,
      }

    ];

    this.state = { message:'', rows: '', filters: {} };
  }

  componentWillMount() {
    this.adminViewFlightsBills();
  }

  adminViewFlightsBills = () => {

    API.adminViewFlightsBills()
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
        f_id:search[i].f_id,
        user_fname:search[i].user_fname,
        user_lname:search[i].user_lname,
        phone:search[i].phone,
        airline_name:search[i].airline_name,
        time_s:search[i].time_s,
        time_e:search[i].time_e,
        from:search[i].from,
        to:search[i].to,
        booked_seats_e:search[i].booked_seats_e,
        booked_seats_b : search[i].booked_seats_b,
        booked_seats_f: search[i].booked_seats_f,
        fare: search[i].fare

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
        <h2 style={{color:'orange'}}><u>FLIGHT BILLS</u></h2>

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
export default withRouter(AdminSearchFlightsBills);

