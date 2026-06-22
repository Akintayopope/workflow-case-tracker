function WorkItemFilters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    clearFilters,
}) {
    return (
        <div className="filters-row">
            <div className="filter-group search-group">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Status Filter</label>

                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Priority Filter</label>

                <select
                    value={priorityFilter}
                    onChange={(event) => setPriorityFilter(event.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="filter-group clear-filter-wrap">
                <label>&nbsp;</label>

                <button className="clear-btn" type="button" onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>
        </div>
    );
}

export default WorkItemFilters;