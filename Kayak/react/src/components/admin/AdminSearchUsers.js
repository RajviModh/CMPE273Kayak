import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import * as API from '../../api/API';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

class AdminSearchUsers extends Component {
    constructor() {
        super();
        this.state =
            {
                rows: '',
                filters: {},
                sortColumn: null,
                sortDirection: null,
                userName: '',
                operation: '',
                searchResult: []
            };
    }
    render() {
        return (
            <div>
            </div>
        );
    }
}
export default withRouter(AdminSearchUsers);