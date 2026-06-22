import { useEffect, useState } from "react";

function WorkItemForm({
    onAddWorkItem,
    editingItem,
    onUpdateWorkItem,
    onCancelEdit,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("Pending");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (editingItem) {
            setTitle(editingItem.title);
            setDescription(editingItem.description);
            setAssignedTo(editingItem.assignedTo);
            setPriority(editingItem.priority);
            setStatus(editingItem.status);
            setDueDate(editingItem.dueDate);
        }
    }, [editingItem]);

    function resetForm() {
        setTitle("");
        setDescription("");
        setAssignedTo("");
        setPriority("");
        setStatus("Pending");
        setDueDate("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            title.trim() === "" ||
            assignedTo === "" ||
            priority === "" ||
            dueDate === ""
        ) {
            alert("Please complete Title, Assigned To, Priority, and Due Date.");
            return;
        }

        if (editingItem) {
            const updatedWorkItem = {
                ...editingItem,
                title,
                description,
                assignedTo,
                priority,
                status,
                dueDate,
            };

            onUpdateWorkItem(updatedWorkItem);
            resetForm();
            return;
        }

        const newWorkItem = {
            title,
            description,
            assignedTo,
            priority,
            status,
            dueDate,
        };

        onAddWorkItem(newWorkItem);
        resetForm();
    }

    function handleCancelEdit() {
        resetForm();
        onCancelEdit();
    }

    return (
        <section className="form-card">
            <h2>{editingItem ? "Edit Work Item" : "Add New Work Item"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-field">
                        <label>Title *</label>

                        <input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label>Description</label>

                        <textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label>Assigned To *</label>

                        <select
                            value={assignedTo}
                            onChange={(event) => setAssignedTo(event.target.value)}
                        >
                            <option value="">Select officer</option>
                            <option value="John Officer">John Officer</option>
                            <option value="Jane Smith">Jane Smith</option>
                            <option value="Mike Brown">Mike Brown</option>
                            <option value="Sarah Lee">Sarah Lee</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label>Priority *</label>

                        <select
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}
                        >
                            <option value="">Select priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label>Status</label>

                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label>Due Date *</label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(event) => setDueDate(event.target.value)}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-btn">
                        {editingItem ? "Update Work Item" : "Add Work Item"}
                    </button>

                    {editingItem && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}

export default WorkItemForm;