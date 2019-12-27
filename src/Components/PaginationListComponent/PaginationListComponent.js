import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHANGE_PAGINATION_INDEXES_OF_ARRAY_OF_COMPANIES } from '../../CONSTANTS/ACTION_TYPES';
import './PaginationListComponent.scss';

class PaginationListComponent extends Component {
    state = {
    }

    onPaginationListItemClick = event => {
        const firstIndexOfCompanyObjectThatIsDisplaying = event.target.id * this.props.companiesPerPage;
        const lastIndexOfCompanyObjectThatIsDisplaying = firstIndexOfCompanyObjectThatIsDisplaying + this.props.companiesPerPage;
        const newCurrentPage = event.target.textContent;
        this.props.dispatch({
            type:CHANGE_PAGINATION_INDEXES_OF_ARRAY_OF_COMPANIES, 
            firstObjectDisplayingIndex:firstIndexOfCompanyObjectThatIsDisplaying,
            lastObjectDisplayingIndex:lastIndexOfCompanyObjectThatIsDisplaying,
            currentPage:newCurrentPage
        })
        // Remove active class name from all li elements and setting active class name to just clicked element
        let allPaginationNumbers = document.getElementsByTagName("li");
        allPaginationNumbers = [...allPaginationNumbers]
        allPaginationNumbers.map(liElement => {
            liElement.classList.remove("active")
        })
        const clickedElementId = event.target.id;
        const clickedElement = document.getElementById(clickedElementId);
        clickedElement.classList.add("active")
    }

    render() { 
        const {arrayOfAllCompanies, companiesPerPage, currentPage, isFilteredByTextInputArrayDisplaying, filteredArrayByTextInput} = this.props;
        let paginationItemsNumber;
        if(isFilteredByTextInputArrayDisplaying){
            paginationItemsNumber = Math.ceil(filteredArrayByTextInput.length / companiesPerPage);
        }else{
            paginationItemsNumber =  Math.ceil(arrayOfAllCompanies.length / companiesPerPage);
        }
        const arrayOfPaginationListItems = [];
        for (let i = 0; i < paginationItemsNumber; i++) {
            arrayOfPaginationListItems.push(
                <li key={i+1} className={currentPage === i+1 ? ("pagination-item active"):("pagination-item")} id={i} onClick={this.onPaginationListItemClick}>
                    {i + 1}
                </li>)
        }
        return ( 
                <ul id='pagination-list'>
                    {arrayOfPaginationListItems.map((paginationItem) => {
                        return (
                            paginationItem
                        )
                    })}
                </ul>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        arrayOfAllCompanies:state.arrayOfAllCompanies,
        lastObjectDisplayingIndex: state.lastObjectDisplayingIndex,
        firstObjectDisplayingIndex: state.firstObjectDisplayingIndex,
        companiesPerPage:state.companiesPerPage,
        currentPage:state.currentPage,
        isFilteredByTextInputArrayDisplaying:state.isFilteredByTextInputArrayDisplaying,
        filteredArrayByTextInput:state.filteredArrayByTextInput
    }
}

export default connect(mapStateToProps)(PaginationListComponent);