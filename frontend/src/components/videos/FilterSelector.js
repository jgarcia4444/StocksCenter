import React from 'react'
import './FilterSelector.css'

const FilterSelector = (props) => {

    return (
        <div className="filter-selector">
            <div onClick={() => props.handleFilterClick("beginner")}  className="filter-option">
                Beginner
            </div>
            <div onClick={() => props.handleFilterClick("intermediate")} className="filter-option">
                Intermediate
            </div>
            <div onClick={() => props.handleFilterClick("advanced")} className="filter-option">
                Advanced
            </div>
        </div>
    )

}

export default FilterSelector;