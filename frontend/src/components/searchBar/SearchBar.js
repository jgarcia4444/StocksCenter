import React, { Component } from 'react';
import './SearchBar.css'

export default class SearchBar extends Component {

    render() {
        return (
           <form autoComplete="off" onSubmit={this.props.fetchSearchData}>
                <div className="row form-group">
                    <div className="col-6">
                        <input name="searchBarText" type="text" onChange={(e) => this.props.setSearchQuery(e)} className="form-control" value={this.props.searchValue} />
                        <small>Search by company name.</small>
                    </div>
                    {/* <div className="col-4">
                        <button className="form-control" type="Submit">Search</button>
                    </div> */}
                </div>

            </form> 
        )
    }

}