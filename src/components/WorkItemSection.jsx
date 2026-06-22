import WorkItemFilters from "./WorkItemFilters";
import WorkItemTable from "./WorkItemTable";

function WorkItemSection({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    clearFilters,
    filteredWorkItems,
    updateWorkItemStatus,
    startEditingWorkItem,
    deleteWorkItem,
}) {
    return (
        <section className="work-items-card">
            <h2>Work Items</h2>

            <WorkItemFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                clearFilters={clearFilters}
            />

            <WorkItemTable
                workItems={filteredWorkItems}
                updateWorkItemStatus={updateWorkItemStatus}
                startEditingWorkItem={startEditingWorkItem}
                deleteWorkItem={deleteWorkItem}
            />

            {filteredWorkItems.length > 0 && (
                <div className="table-footer">
                    <p>
                        Showing 1 to {filteredWorkItems.length} of{" "}
                        {filteredWorkItems.length} items
                    </p>

                    <div className="pagination">
                        <button className="page-btn" type="button">
                            ‹
                        </button>

                        <button className="page-btn active" type="button">
                            1
                        </button>

                        <button className="page-btn" type="button">
                            ›
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default WorkItemSection;