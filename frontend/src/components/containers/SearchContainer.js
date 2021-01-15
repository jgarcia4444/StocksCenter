import React, {Component} from 'react';
import './SearchContainer.css';
import SearchBar from '../searchBar/SearchBar';
import SuggestionsContainer from './SuggestionsContainer';
import StockDetailsContainer from './StockDetailsContainer';
import fetchStocks from '../../actions/fetchStocks';
import { connect } from 'react-redux';

class SearchContainer extends Component {

    state = {
        searchQuery: "",
        suggestions: [],
        selectedStock: null
    }

    componentDidMount() {
        this.props.fetchStocks()
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
        const { searchSelectedStock } = this.props
        return (
            <div className="container search-container">
                {this.props.loadingStocks || this.props.loadingSuggestedStockInfo ? loadingOverlay : null}
                <h3>Search Stocks</h3>
                <SearchBar searchValue={this.state.searchQuery} setSearchQuery={this.handleInputChange} />
                <h4>{searchSelectedStock.keys !== undefined ? null : "Suggestions"}</h4>
                <div className="suggestions-component">
                    {Object.keys(searchSelectedStock).length !== 0 ? <StockDetailsContainer /> : <SuggestionsContainer setSelectedStock={this.setSelectedStock} suggestions={this.state.suggestions} />}
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
        loadingStocks: state.loadingStocks,
        searchSelectedStock: state.searchSelectedStock
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(SearchContainer);