import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');


class AdminSearchFlights extends Component {

    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'id',
                name: 'FlightId',
                width: 80
            },
            {
                key: 'task',
                name: 'FlightName',
                filterable: true,
                editable:true,
                sortable: true
            },
            {
                key: 'priority',
                name: 'FlightDate',
                filterable: true,
                sortable: true
            }
    ];
        this.state = { rows: this.createRows(1000), filters: {}, sortColumn: null, sortDirection: null };
    }
    createRows = (numberOfRows) => {
        let rows = [];
        for (let i = 1; i < numberOfRows; i++) {
            rows.push({
                id: i,
                task: 'Task ' + i,
                complete: Math.min(100, Math.round(Math.random() * 110)),
                priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],

            });
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
        const rows = this.getRows();
        return rows[rowIdx];
    };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    };
    handleGridSort = (sortColumn, sortDirection) => {
        this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    };

    handleAddRow = ({ newRowIndex }) => {
        const newRow = {
            value: newRowIndex,
            userStory: '',
            developer: '',
            epic: ''
        };

        let rows = this.state.rows.slice();
        rows = update(rows, {$push: [newRow]});
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
            <div>
                <ReactDataGrid
                    // ref={ node => this.grid = node }
                    onGridSort={this.handleGridSort}
                    enableCellSelect={true}
                    columns={this._columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.getSize()}
                    minHeight={500}
                    onGridRowsUpdated={this.handleGridRowsUpdated}
                    enableRowSelect={true}
                    toolbar={<Toolbar enableFilter={true} onAddRow={this.handleAddRow}/>}
                    onAddFilter={this.handleFilterChange}
                    onClearFilters={this.onClearFilters} />);
            </div>
        );
    }
}
export default withRouter(AdminSearchFlights);