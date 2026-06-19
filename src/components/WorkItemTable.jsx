import WorkItemRow from "./WorkItemRow";

function WorkItemTable({ workItems }) {
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
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            assignedTo={item.assignedTo}
                            status={item.status}
                            priority={item.priority}
                            dueDate={item.dueDate}
                            createdDate={item.createdDate}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkItemTable;
