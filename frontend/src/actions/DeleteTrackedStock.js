
const deleteTrackedStock = (stockSymbol) => {
    
    return {
        type: 'DELETE_STOCK',
        stock_symbol: stockSymbol
    }
}

export default deleteTrackedStock;