import React, {Component} from 'react';
import SearchBar from '../SearchBar';
import SuggestionsContainer from '../SuggestionsContainer';

export default class SearchContainer extends Component {


    componentDidMount() {
        let apiKey = process.env.REACT_APP_STOCKS_API_KEY
        fetch(`http://api.marketstack.com/v1/tickers?access_key=${apiKey}`)
            .then(res => res.json())
            .then(json => this.setState({
                ...this.state,
                stocksData: json.data
            }))
    }

    state = {
        searchQuery: "",
        stocksData: [],
        suggestions: []
    }

    handleFormSubmitted = (e) => {
        e.preventDefault();
        console.log(`${this.state.searchQuery}, sent from search container`)
    }

    handleInputChange = (query) => {
        this.setState({
            ...this.state,
            searchQuery: query
        })

        // suggestions logic
        this.filterBYQuery(query)
    }

    filterQuery = (query) => {
        let suggestions = this.state.stocksData.filter(stock => stock.name.toLowerCase().contains(query))
        
    }

    render() {
        return (
            <div className="container search-container">
                <h3>Search Stocks</h3>
                <SearchBar suggestions={this.state.suggestions} setSearchQuery={this.handleInputChange} fetchSymbolData={this.handleFormSubmitted} />
                <div className="suggestions-component">
                    <SuggestionsContainer suggestions={this.state.stocksData} />
                </div>
            </div>
        )
    }

}