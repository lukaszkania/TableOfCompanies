import React, { Component } from 'react';
import {connect} from 'react-redux';
import { HEADERS } from '../../CONSTANTS/TABLE_HEADERS';
import { CHANGE_TABLE_HEADER_FILTER } from '../../CONSTANTS/ACTION_TYPES';
import './TableHeadComponent.scss';

class TableHeadComponent extends Component {
    state = {  }

    onHeaderClick = event => {
        const targetHeaderId = event.target.id;
        let order = this.props.isAscending; 
        this.props.dispatch({type:CHANGE_TABLE_HEADER_FILTER, tableHeaderId:targetHeaderId, sortingOrder:!order})
    }

    render() { 
        return ( 
            <thead>
                <tr>
                    {HEADERS.map(header => {
                        return (
                            <th id={header} key={header} onClick={this.onHeaderClick}
                            className={this.props.filterBy === header ? ("active"):("deactive")}>
                                {header}
                            </th>
                        )
                    })}
                </tr>
            </thead>
             );
    }
}

const mapStateToProps = state => {
    return {
        filterBy:state.filterBy,
        isAscending:state.isAscending,
    }
}
 
export default connect(mapStateToProps)(TableHeadComponent);