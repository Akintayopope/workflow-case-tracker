import WorkItemRow from "./WorkItemRow";


function WorkItemTable() {
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
                    <WorkItemRow
                        id="1"
                        title="Review production roll-up issue"
                        description="Check why officer production is missing"
                        assignedTo="John Officer"
                        status="Pending"
                        priority="Medium"
                        dueDate="2024-05-28"
                        createdDate="2024-05-21"
                    />

                    <WorkItemRow
                        id="2"
                        title="Weekly case inventory check"
                        description="Verify all cases are assigned"
                        assignedTo="Jane Smith"
                        status="In Progress"
                        priority="High"
                        dueDate="2024-05-25"
                        createdDate="2024-05-20"
                    />

                    <WorkItemRow
                        id="3"
                        title="Update training materials"
                        description="Add new process for TL training"
                        assignedTo="Mike Brown"
                        status="Completed"
                        priority="Low"
                        dueDate="2024-05-20"
                        createdDate="2024-05-18"
                    />

                    <WorkItemRow
                        id="4"
                        title="Audit unresolved cases"
                        description="Review and resolve old cases"
                        assignedTo="Sarah Lee"
                        status="Pending"
                        priority="Medium"
                        dueDate="2024-05-30"
                        createdDate="2024-05-21"
                    />
                </tbody>
            </table>
        </div>
    );
}

export default WorkItemTable;
