import WorkItemRow from "./WorkItemRow";

function WorkItemTable({
    workItems,
    updateWorkItemStatus,
    startEditingWorkItem,
    deleteWorkItem,
}) {
    if (!workItems || workItems.length === 0) {
        return <p className="empty-text">No work items added yet.</p>;
    }

    return (
        <div className="table-wrapper">
            <table className="work-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {workItems.map((item) => (
                        <WorkItemRow
                            key={item.id}
                            item={item}
                            updateWorkItemStatus={updateWorkItemStatus}
                            startEditingWorkItem={startEditingWorkItem}
                            deleteWorkItem={deleteWorkItem}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkItemTable;