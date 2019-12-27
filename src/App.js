import React, { Component } from 'react';
import TableComponent from './Components/TableComponent/TableComponent';
import axios from 'axios';
import { SET_COMPANIES_ARRAY } from './CONSTANTS/ACTION_TYPES';
import {COMPANIES_API_URL, COMPANY_INCOME_API_URL} from './CONSTANTS/API_URL';
import { connect } from 'react-redux';
import { getSumIncome, isIncomeFromLastMonth } from './CONSTANTS/FUNCTIONS';
import PaginationListComponent from './Components/PaginationListComponent/PaginationListComponent';
import SearchFieldComponent from './Components/SearchFieldComponent/SearchFieldComponent';

class App extends Component {
  state = { }

  componentDidMount = () => {
    axios.get(COMPANIES_API_URL)
    .then(response => {
      const arrayOfCompaniesFromApi = response.data;
      arrayOfCompaniesFromApi.map((companyObject, index) => {
        axios.get(`${COMPANY_INCOME_API_URL}${companyObject.id}`)
        .then(responseCompanyObject => {
          const totalIncome = responseCompanyObject.data.incomes.reduce(getSumIncome, 0);
          
          const incomesLength = responseCompanyObject.data.incomes.length;
          const averageIncome = Math.round((totalIncome/incomesLength)*100)/100;
          
          const lastMonthIncome = responseCompanyObject.data.incomes.filter(isIncomeFromLastMonth).reduce(getSumIncome, 0);

          this.props.dispatch(
            {
              type:SET_COMPANIES_ARRAY, 
              arrayOfCompanies:arrayOfCompaniesFromApi, 
              companyObjectIndex:index, 
              totalIncome:totalIncome,
              averageIncome:averageIncome,
              lastMonthIncome:lastMonthIncome
            }
          )
        })
      })
    })
    .catch(error => {
        console.log(error.message)
    })
}

  render() { 
    return ( 
      <>
        <SearchFieldComponent />
        <TableComponent/>
        <PaginationListComponent companiesNumber={this.props.arrayOfAllCompanies.length}/>
      </>
     );
  }
}

const mapStateToProps = state => {
  return {
    arrayOfAllCompanies:state.arrayOfAllCompanies

  }
}

export default connect(mapStateToProps)(App);