function WorkItemFilters() {
    return (
        <form className="filter-form">
            <div className="filter-row">
                <div className="filter-search">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search by title or description" />
                </div>



                <div className="filter-field">
                    <label>Status Filter</label>
                    <select>
                        <option>All</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>

                <div className="filter-field">
                    <label>Priority Filter</label>
                    <select>
                        <option>All</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                <div className="filter-action">
                    <button type="button" className="secondary-btn">Clear Filters</button>
                </div>
            </div>
        </form>
    )
}

export default WorkItemFilters