import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchStockInfo from '../../actions/fetchStockInfo';
import Suggestion from '../suggestion/Suggestion';

class SuggestionsContainer extends Component {
    
        state = {
            hasSuggestions: false,
        }

    componentDidMount() {
        this.checkForSuggestions()
    }

    checkForSuggestions = () => {
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
        this.props.fetchStockInfo(stock)
    }

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

const mapDispatchToProps = dispatch => {
    return {
        fetchStockInfo: (stock) => dispatch(fetchStockInfo(stock))
    }
}

export default connect(
    null,
    mapDispatchToProps
)
(SuggestionsContainer);
