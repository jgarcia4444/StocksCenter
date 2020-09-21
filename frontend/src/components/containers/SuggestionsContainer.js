import React, {Component} from 'react';
import Suggestion from '../Suggestion';

export default class SuggestionsContainer extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            hasSuggestions: false,
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
                    <Suggestion key={stock.symbol} stock={stock} />
                )
            })
        )
    }

    render() {
        if (this.state.hasSuggestions) {
            return (
                <div className="Suggestions-container">
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



