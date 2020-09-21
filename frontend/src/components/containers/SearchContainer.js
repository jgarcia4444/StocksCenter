import React, {Component} from 'react';
import SearchBar from '../SearchBar';
import SuggestionsContainer from './SuggestionsContainer';

export default class SearchContainer extends Component {

    fetchSearchStock = () => {
        let apiKey = process.env.REACT_APP_STOCKS_API_KEY
        fetch(`http://api.marketstack.com/v1/tickers?access_key=${apiKey}`)
            .then(res => res.json())
            .then(json => this.setState({
                stocksData: json.data
            }))
    }

    constructor() {
        super()
        this.state = {
            searchQuery: "",
            stocksData: [],
            suggestions: []
        }
        
    }

    componentDidMount() {
        this.fetchSearchStock()
    }

    

    handleFormSubmitted = (e) => {
        e.preventDefault();
        console.log(`${this.state.searchQuery}, sent from search container`)
    }

    handleInputChange = (e) => {
        let query = e.target.value
        this.filterByQuery(query)
    }

    filterByQuery = (query) => {
        let suggestions = this.state.stocksData.filter(stock => {
            let stockNameLowercased = stock.name.toLowerCase()
            if (stockNameLowercased.includes(query.toLowerCase())) {
                return stock
            }
        })
        console.log(query)
        console.log(suggestions)
        if (suggestions) {
            this.setState({
                ...this.state,
                suggestions: suggestions,
                searchQuery: query
            })
        }
    }

    render() {
        return (
            <div className="container search-container">
                <h3>Search Stocks</h3>
                <SearchBar suggestions={this.state.suggestions} setSearchQuery={this.handleInputChange} fetchSearchData={this.handleFormSubmitted} />
                <div className="suggestions-component">
                    <SuggestionsContainer suggestions={this.state.suggestions} />
                </div>
            </div>
        )
    }

}