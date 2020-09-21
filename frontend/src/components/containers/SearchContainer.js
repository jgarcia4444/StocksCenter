import React, {Component} from 'react';
import SearchBar from '../SearchBar';

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
        searchSymbolQuery: "",
        stocksData: []
    }

    handleFormSubmitted = (symbol) => {
        console.log(`${symbol}, sent from search container`)
        this.setState({
            searchSymbolQuery: symbol
        })
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