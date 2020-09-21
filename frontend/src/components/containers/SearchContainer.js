import React, {Component} from 'react';
import SearchBar from '../SearchBar';
import SuggestionsContainer from './SuggestionsContainer';

export default class SearchContainer extends Component {

    let 
    fetchSearchStock = () => {
        let apiKey = process.env.REACT_APP_STOCKS_API_KEY
        fetch(`${this.state.BaseUrl}/tickers?access_key=${apiKey}`)
            .then(res => res.json())
            .then(json => this.setState({
                stocksData: json.data
            }))
    }

    constructor() {
        super()
        this.state = {
            BaseUrl: "http://api.marketstack.com/v1",
            searchQuery: "",
            stocksData: [],
            suggestions: [],
            selectedStockSymbol: ""
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
        if (query !== "") {
           let suggestions = this.state.stocksData.filter(stock => {
                let stockNameLowercased = stock.name.toLowerCase()
                if (stockNameLowercased.includes(query.toLowerCase())) {
                    return stock
                }
            })
            if (suggestions) {
                this.setState({
                    ...this.state,
                    suggestions: suggestions,
                    searchQuery: query
                })
            } 
        } else {
            this.setState({
                ...this.state,
                suggestions: [],
                searchQuery: ""
            })
        }
    }

    render() {
        return (
            <div className="container search-container">
                <h3>Search Stocks</h3>
                <SearchBar suggestions={this.state.suggestions} setSearchQuery={this.handleInputChange} fetchSearchData={this.handleFormSubmitted} />
                <h4>{this.state.selectedStockSymbol ? `${this.state.selectedStockSymbol} Stock Info` : "Suggestions"}</h4>
                <div className="suggestions-component">
                    {this.state.selectedStockSymbol !== "" ? this.state.selectedStockSymbol : <SuggestionsContainer suggestions={this.state.suggestions} />}
                </div>
            </div>
        )
    }

}