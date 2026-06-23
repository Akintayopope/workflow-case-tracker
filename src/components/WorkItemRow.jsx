function WorkItemRow({
    item,
    updateWorkItemStatus,
    startEditingWorkItem,
    deleteWorkItem,
}) {

    function formatDate(dateValue) {
        if (!dateValue) {
            return "";
        }

        return dateValue.split("T")[0];
    }
    const statusClass = item.status
        ? item.status.toLowerCase().replace(" ", "-")
        : "";

    const priorityClass = item.priority ? item.priority.toLowerCase() : "";

    return (
        <tr>
            <td>{item.id}</td>

            <td>
                <div className="title-cell">
                    <div className="title-link">{item.title}</div>
                    <div className="title-description">{item.description}</div>
                </div>
            </td>

            <td>
                {item.assignedToUserId} - {item.assignedToName}
            </td>

            <td>
                <select
                    className={`status-select status-${statusClass}`}
                    value={item.status}
                    onChange={(event) =>
                        updateWorkItemStatus(item.id, event.target.value)
                    }
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </td>

            <td>
                <span className={`badge badge-${priorityClass}`}>
                    {item.priority}
                </span>
            </td>

            <td>{formatDate(item.dueDate)}</td>
            <td>{formatDate(item.createdDate)}</td>

            <td>
                <div className="actions-cell">
                    <button
                        className="icon-btn edit-btn"
                        type="button"
                        onClick={() => startEditingWorkItem(item)}
                        title="Edit"
                    >
                        ✎
                    </button>

                    <button
                        className="icon-btn delete-btn"
                        type="button"
                        onClick={() => deleteWorkItem(item.id)}
                        title="Delete"
                    >
                        🗑
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default WorkItemRow;