function WorkItemRow({
    id,
    title,
    description,
    assignedTo,
    status,
    priority,
    dueDate,
    createdDate,
}) {
    const statusClass = status ? status.toLowerCase().replace(" ", "-") : "";
    const priorityClass = priority ? priority.toLowerCase() : "";

    return (
        <tr>
            <td>{id}</td>

            <td>
                <p className="item-title">{title}</p>
                <p className="item-description">{description}</p>
            </td>

            <td>{assignedTo}</td>

            <td>
                <span className={`badge status-${statusClass}`}>{status}</span>
            </td>

            <td>
                <span className={`badge priority-${priorityClass}`}>{priority}</span>
            </td>

            <td>{dueDate}</td>
            <td>{createdDate}</td>

            <td>
                <div className="action-buttons">
                    <button type="button" className="edit-btn">
                        ✎
                    </button>

                    <button type="button" className="delete-btn">
                        🗑
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default WorkItemRow;