import React, {Component} from 'react';
import Suggestion from '../suggestion/Suggestion';

export default class SuggestionsContainer extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            hasSuggestions: false,
            BaseUrl: "http://api.marketstack.com/v1",
            selectedStock: {}
        }
    }
    

    componentDidMount() {
        if (this.props.suggestions !== []) {
            this.setState({
                hasSuggestions: true
            })
        } else {
            this.setState({
                hasSuggestions: false
            })
        }
    }

    renderSuggestions = () => {
        return (
            this.props.suggestions.map(stock => {
                return (
                    <Suggestion handleClick={this.handleClick} key={stock.symbol} stock={stock} />
                )
            })
        )
    }

    handleClick = (stock) => {
        this.props.setSelectedStock(stock)
    }
//
    render() {
        if (this.state.hasSuggestions) {
            return (
                <div className="suggestions-container">
                    {this.renderSuggestions()}
                </div>
            )
        } else {
            return (
                <p>No Suggestions Yet.</p>
            )
        }
    }
    
}



