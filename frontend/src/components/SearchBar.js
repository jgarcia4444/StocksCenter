import React, { Component } from 'react';
import './SearchBar.css'

export default class SearchBar extends Component {

    render() {
        return (
           <form onSubmit={this.props.fetchSymbolData}>
                <div className="row form-group">
                    <div className="col-8">
                        <input name="searchBarText" type="text" onChange={(e) => this.props.setSearchQuery(e.target.value)} className="form-control" />
                        <small>Search by stock symbol.</small>
                    </div>
                    <div className="col-4">
                        <button className="form-control" type="Submit">Search</button>
                    </div>
                </div>

            </form> 
        )
    }

}