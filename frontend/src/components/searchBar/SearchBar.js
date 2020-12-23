import React, { Component } from 'react';
import './SearchBar.css'

export default class SearchBar extends Component {

    render() {
        return (
            <div className="row form-group">
                <div className="col-6">
                    <input name="searchBarText" type="text" onChange={(e) => this.props.setSearchQuery(e)} className="form-control" value={this.props.searchValue} />
                    <small>Search by company name.</small>
                </div>
            </div>
        )
    }

}