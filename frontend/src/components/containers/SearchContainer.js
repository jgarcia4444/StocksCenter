import React, {Component} from 'react';
import SearchBar from '../SearchBar';

export default class SearchContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchSymbolQuery: ""
        }
    }

    render() {
        return (
            <div className="container search-container">
                <h3>Search Stocks</h3>
                <SearchBar />
            </div>
        )
    }

}