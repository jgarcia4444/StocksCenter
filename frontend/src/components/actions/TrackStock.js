
const trackQuote = (stock) => {
    return {
        type: "TRACK_STOCK",
        stock: {
            stock_symbol: stock.symbol,
            name: stock.name
        }
    }
}
//

export default trackQuote