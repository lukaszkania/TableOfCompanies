import { HEADERS } from "./TABLE_HEADERS";

const getSumIncome = (sumOfIncome, incomeObject) => {
    return Math.round((sumOfIncome + parseFloat(incomeObject.value))*100) /100
}

// Returns true if month from date object from income object is the same as last month from current date
const isIncomeFromLastMonth = incomeObject => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth()-1);
    const lastMonth = currentDate.getMonth();
    const monthFromIncomeObject = new Date(incomeObject.date).getMonth();
    return lastMonth === monthFromIncomeObject
}

// Sorting given array by html id tag in ascending or descending order
const sortArrayByFilterIdName = (filterIdName, arrayToSort, order) => {
    let sortedArray;
    HEADERS.map(headerName => {
        if(headerName === filterIdName){
            sortedArray = arrayToSort.sort((a, b) => {
                const aKey = a[filterIdName];
                const bKey = b[filterIdName];
                switch(order){
                    case true:
                        if(aKey<bKey){return -1};
                        if(aKey>bKey){return 1};
                        return 0;
                    case false:
                        if(aKey>bKey){return -1};
                        if(aKey<bKey){return 1};
                        return 0;
                    default:
                        break;
                }
            });
        }
    })
    return sortedArray;
}

const addPropertyWithValueToEveryObjectFromArrayOfObjects = (arrayOfObjects, propertyKey, propertyValue) => {
        const arrayWithAddedProperty = arrayOfObjects.slice();
        arrayWithAddedProperty.map(object => {
                object[propertyKey] = propertyValue;
        })
        return arrayWithAddedProperty;
    }

const sortArrayByInputedTextUsingRE = (arrayOfObjects, inputedText) => {
    Array.prototype.unique = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    };

    const regExp = new RegExp(`${inputedText}`, "i");
    let resultArrayByName = arrayOfObjects.filter(companyObject => {
        return companyObject.name.match(regExp)
    })

    let resultArrayByCity = arrayOfObjects.filter(companyObject => {
        return companyObject.city.match(regExp)
    })

    return resultArrayByName.concat(resultArrayByCity).unique()
}

export {getSumIncome, sortArrayByFilterIdName, isIncomeFromLastMonth, addPropertyWithValueToEveryObjectFromArrayOfObjects, sortArrayByInputedTextUsingRE};