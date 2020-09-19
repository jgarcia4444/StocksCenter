import React, { Component } from 'react';

export default class SearchBar extends Component {

    state = {
        searchBarText: ""
    }

    render() {
        return (
           <form>
                <div className="row form-group">
                    <div className="col-8">
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-4">
                        <button className="form-control" type="Submit">Search</button>
                    </div>
                </div>
            </form> 
        )
    }

}