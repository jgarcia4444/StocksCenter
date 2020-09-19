import React, {Component} from 'react';
import SearchBar from '../SearchBar';

export default class SearchContainer extends Component {

    
        state = {
            searchSymbolQuery: ""
        }

        handleFormSubmitted = (symbol) => {
            console.log(`${symbol}, sent from search container`)
        }

    render() {
        return (
            <div className="container search-container">
                <h3>Search Stocks</h3>
                <SearchBar fetchSymbolData={this.handleFormSubmitted} />
            </div>
        )
    }

}