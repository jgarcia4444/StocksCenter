
const trackQuote = (stock) => {
    return {
        type: "TRACK_QUOTE",
        stock: {
            symbol: stock.symbol,
            name: stock.name
        }
    }
}
//

export default trackQuote