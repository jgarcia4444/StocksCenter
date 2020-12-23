import React, {Component} from 'react';
import './SearchContainer.css';
import SearchBar from '../searchBar/SearchBar';
import SuggestionsContainer from './SuggestionsContainer';
import StockDetailsContainer from './StockDetailsContainer';
import fetchStocks from '../../actions/fetchStocks';
import { connect } from 'react-redux';

class SearchContainer extends Component {

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
            searchQuery: "",
            stocksData: [],
            suggestions: [],
            selectedStock: null
        }
        
    }

    componentDidMount() {
        this.props.fetchStocks()
    }

    handleFormSubmitted = (e) => {
        e.preventDefault();
    }

    handleInputChange = (e) => {
        let query = e.target.value
        if (this.state.selectedStock) {
            this.setState({
                ...this.state,
                selectedStock: null
            })
        } 
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
        const { stocks } = this.props
        if (query !== "") {
           let suggestions = stocks.filter(stock => {
                let stockNameLowercased = stock.name.toLowerCase()
                if (stockNameLowercased.includes(query.toLowerCase())) {
                    return true;
                } else {
                    return false;
                }
            })
            if (this.state.selectedStock) {
                if (suggestions) {
                    this.setState({
                        ...this.state,
                        selectedStock: null,
                        suggestions: suggestions,
                        searchQuery: query
                    })
                }
            } else {
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
                searchQuery: "",
            })
        } 
    }

    render() {
        const loadingOverlay = <div className="loading-overlay"><div className="spinner"></div></div>
        return (
            <div className="container search-container">
                {this.props.loading ? loadingOverlay : null}
                <h3>Search Stocks</h3>
                <SearchBar searchValue={this.state.searchQuery} suggestions={this.state.suggestions} setSearchQuery={this.handleInputChange} fetchSearchData={this.handleFormSubmitted} />
                <h4>{this.state.selectedStock ? null : "Suggestions"}</h4>
                <div className="suggestions-component">
                    {this.state.selectedStock !== null ? <StockDetailsContainer stock={this.state.selectedStock} /> : <SuggestionsContainer setSelectedStock={this.setSelectedStock} suggestions={this.state.suggestions} />}
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        fetchStocks: () => dispatch(fetchStocks())
    }
}

const mapStateToProps = state => {
    return {
        stocks: state.stocks,
        loading: state.loading
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(SearchContainer);