import {COMPANIES_PER_PAGE} from '../CONSTANTS/PAGINATION';
import { SET_COMPANIES_ARRAY, CHANGE_TABLE_HEADER_FILTER, CHANGE_PAGINATION_INDEXES_OF_ARRAY_OF_COMPANIES, SET_FILTERED_ARRAY_BY_TEXT_INPUT, CHANGE_DISPLAYING_ARRAY} from '../CONSTANTS/ACTION_TYPES';

const initialState = {
    arrayOfAllCompanies:[],
    filteredArrayByTextInput:[],
    companiesPerPage: COMPANIES_PER_PAGE,
    filterBy:"id",
    currentPage:1,
    isAscending: true, // True for ascending order false for descending order
    lastObjectDisplayingIndex:COMPANIES_PER_PAGE,
    firstObjectDisplayingIndex:0,
    isFilteredByTextInputArrayDisplaying:false // If true, there will be filteredArrayByTextInput display
}

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_COMPANIES_ARRAY:
            const modifiedArray = action.arrayOfCompanies.slice();
            modifiedArray.map(companyObject => {
                modifiedArray[action.companyObjectIndex]["total income"] = action.totalIncome;
                modifiedArray[action.companyObjectIndex]["average income"] = action.averageIncome;
                modifiedArray[action.companyObjectIndex]["last month income"] = action.lastMonthIncome;
            })
            return{
                ...state,
                arrayOfAllCompanies:modifiedArray
            }

        case CHANGE_TABLE_HEADER_FILTER:
            return {
                ...state,
                filterBy:action.tableHeaderId,
                isAscending:action.sortingOrder
            }

        case CHANGE_PAGINATION_INDEXES_OF_ARRAY_OF_COMPANIES:
            return {
                ...state,
                lastObjectDisplayingIndex:action.lastObjectDisplayingIndex,
                firstObjectDisplayingIndex:action.firstObjectDisplayingIndex,
                currentPage:action.currentPage
            }

        case SET_FILTERED_ARRAY_BY_TEXT_INPUT:
            return {
                ...state,
                filteredArrayByTextInput:action.arrayOfCompanies
            }
        
            case CHANGE_DISPLAYING_ARRAY:
                return {
                    ...state,
                    isFilteredByTextInputArrayDisplaying:action.isFilteredByTextInputArrayShouldBeDisplaying
                }
        
        default:
            return state
    }

}

export default rootReducer;