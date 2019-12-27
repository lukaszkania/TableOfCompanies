import React, { Component } from 'react';
import TableHeadComponent from '../TableHeadComponent/TableHeadComponent';
import TableBodyComponent from '../TableBodyComponent/TableBodyComponent';
import './TableComponent.scss';

class TableComponent extends Component {
    render() {
        return ( 
            <table>
                <TableHeadComponent />
                <TableBodyComponent />
            </table>
         );
    }
}


 
export default TableComponent;