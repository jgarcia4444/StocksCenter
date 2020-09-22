import React, {Component} from 'react';
import SearchBar from '../SearchBar';
import SuggestionsContainer from './SuggestionsContainer';
import StockDetailsContainer from '../StockDetailsContainer';

export default class SearchContainer extends Component {

    fetchSearchStock = () => {
        let apiKey = process.env.REACT_APP_STOCKS_API_KEY
        fetch(`${this.state.baseUrl}/tickers?access_key=${apiKey}`)
            .then(res => res.json())
            .then(json => this.setState({
                stocksData: json.data
            }))
    }

    constructor() {
        super()
        this.state = {
            baseUrl: "http://api.marketstack.com/v1",
            searchQuery: "",
            stocksData: [],
            suggestions: [],
            selectedStock: null
        }
        
    }

    componentDidMount() {
        this.fetchSearchStock()
    }

    handleFormSubmitted = (e) => {
        e.preventDefault();
    }

    handleInputChange = (e) => {
        let query = e.target.value
        this.filterByQuery(query)
    }

    setSelectedStock = (stock) => {
        this.setState({
            ...this.state,
            selectedStock: stock,
            searchQuery: ""
        })
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
                <SearchBar searchValue={this.state.searchQuery} suggestions={this.state.suggestions} setSearchQuery={this.handleInputChange} fetchSearchData={this.handleFormSubmitted} />
                <h4>{this.state.selectedStock ? `${this.state.selectedStock.symbol} Stock Info` : "Suggestions"}</h4>
                <div className="suggestions-component">
                    {this.state.selectedStock !== null ? <StockDetailsContainer stock={this.state.selectedStock} /> : <SuggestionsContainer setSelectedStock={this.setSelectedStock} suggestions={this.state.suggestions} />}
                </div>
            </div>
        )
    }

}