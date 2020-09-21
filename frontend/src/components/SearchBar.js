import React, { Component } from 'react';
import './SearchBar.css'

export default class SearchBar extends Component {

    state = {
        searchBarText: "",
        searchBarMesage: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.fetchSymbolData(this.state.searchBarText)
    }

    handleChange = (e) => {
        let upperCasedChar = e.target.value.toUpperCase()
        if (this.state.searchBarText.length < 4) {
            this.setState({
                searchBarText: upperCasedChar
            })
        } else {
            if (e.nativeEvent.inputType === "deleteContentBackward") {
                this.setState({
                    searchBarText: upperCasedChar,
                    searchBarMesage: ""
                })
            } else {
                this.setState({
                    ...this.state,
                    searchBarMesage: "Cannot be more than 4 characters long."
                })
            }
            
        }
    }

    render() {
        return (
           <form onSubmit={this.props.fetchSymbolData}>
                <div className="row form-group">
                    <div className="col-8">
                        <input name="searchBarText" type="text" onChange={this.handleChange} className="form-control" value={this.state.searchBarText} />
                        <small>Search by stock symbol. <span className="error-message">{this.state.searchBarMesage}</span></small>
                    </div>
                    <div className="col-4">
                        <button className="form-control" type="Submit">Search</button>
                    </div>
                </div>

            </form> 
        )
    }

}