
const setSearchStock = (stock) => {
    return {
        type: "SELECT_SEARCH_STOCK",
        stock: {
            ...stock
        }
    }
}

export default setSearchStock;