import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortArrayByInputedTextUsingRE } from '../../CONSTANTS/FUNCTIONS';
import { SET_COMPANIES_ARRAY, SET_FILTERED_ARRAY_BY_TEXT_INPUT, CHANGE_DISPLAYING_ARRAY } from '../../CONSTANTS/ACTION_TYPES';
import './SearchFieldComponent.scss';

class SearchFieldComponent extends Component {
    state = {
        inputedTextValue:"",
    }

    onInputTextChange = event => {
        const newInputedText = event.target.value;
        if(newInputedText != ""){
            const filteredArray = sortArrayByInputedTextUsingRE(this.props.arrayOfAllCompanies, newInputedText)
            this.props.dispatch({type:SET_FILTERED_ARRAY_BY_TEXT_INPUT, arrayOfCompanies:filteredArray})
            this.props.dispatch({type:CHANGE_DISPLAYING_ARRAY, isFilteredByTextInputArrayShouldBeDisplaying:true})
        }else{
            this.props.dispatch({type:CHANGE_DISPLAYING_ARRAY, isFilteredByTextInputArrayShouldBeDisplaying:false})
        }
        this.setState({
            inputedTextValue:newInputedText
        })
    }

    render() { 
        return ( 
                <input onChange={this.onInputTextChange} type="text" placeholder="Wpisz wyszkuwianą fraze">
                </input>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        arrayOfAllCompanies:state.arrayOfAllCompanies,
        filterBy:state.filterBy
    }
}

export default connect(mapStateToProps)(SearchFieldComponent);