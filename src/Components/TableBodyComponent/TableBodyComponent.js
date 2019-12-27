import React, { Component } from 'react';
import './TableBodyComponent.scss';
import { connect } from 'react-redux';
import { sortArrayByFilterIdName } from '../../CONSTANTS/FUNCTIONS';

class TableBodyComponent extends Component {

    render() {
        const {arrayOfAllCompanies, filterBy, isAscending, firstObjectDisplayingIndex, lastObjectDisplayingIndex, isFilteredByTextInputArrayDisplaying, filteredArrayByTextInput} = this.props;
        const arrayToDisplay = isFilteredByTextInputArrayDisplaying ? 
                                (sortArrayByFilterIdName(filterBy, filteredArrayByTextInput, isAscending).slice(firstObjectDisplayingIndex, lastObjectDisplayingIndex))
                                :
                                (sortArrayByFilterIdName(filterBy, arrayOfAllCompanies, isAscending).slice(firstObjectDisplayingIndex, lastObjectDisplayingIndex))
        return ( 
            <tbody>
                {arrayToDisplay.map(companyObject => {
                    return (
                        <tr key={companyObject.id}>
                            {Object.keys(companyObject).map(keyName => {
                                return (
                                    <td key={keyName}>
                                        {companyObject[keyName]}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        arrayOfAllCompanies:state.arrayOfAllCompanies,
        filterBy:state.filterBy,
        isAscending:state.isAscending,
        lastObjectDisplayingIndex:state.lastObjectDisplayingIndex,
        firstObjectDisplayingIndex:state.firstObjectDisplayingIndex,
        isFilteredByTextInputArrayDisplaying:state.isFilteredByTextInputArrayDisplaying,
        filteredArrayByTextInput:state.filteredArrayByTextInput
    }
}

export default connect(mapStateToProps)(TableBodyComponent);