import React, {Component} from 'react';
import Suggestion from './Suggestion';

export default class SuggestionsContainer extends Component {
    
    
    state = {
        hasSuggestions: false,
    }

    componentDidMount() {
        if (this.props.suggestions.length < 1) {
            this.setState({
                hasSuggestions: false
            })
        } else {
            this.setState({
                hasSuggestions: true
            })
        }
    }

    renderSuggestions = () => {
        return (
            this.props.suggestions.map(stock => {
                return (
                    <Suggestion stock={stock} />
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



