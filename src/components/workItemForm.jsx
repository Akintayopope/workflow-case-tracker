import { useEffect, useState } from "react";

function WorkItemForm({
    onAddWorkItem,
    editingItem,
    onUpdateWorkItem,
    onCancelEdit,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [officers, setOfficers] = useState([]);
    const [assignedToUserId, setAssignedToUserId] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("Pending");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        async function fetchOfficers() {
            try {
                const response = await fetch("http://localhost:5000/api/officers");
                const data = await response.json();
                setOfficers(data);
            } catch (error) {
                console.log("Failed to fetch officers:", error.message);
            }
        }

        fetchOfficers();
    }, []);

    useEffect(() => {
        if (editingItem) {
            setTitle(editingItem.title);
            setDescription(editingItem.description);
            setAssignedToUserId(editingItem.assignedToUserId || "");
            setPriority(editingItem.priority);
            setStatus(editingItem.status);
            setDueDate(editingItem.due_date || editingItem.dueDate);
        }
    }, [editingItem]);

    function resetForm() {
        setTitle("");
        setDescription("");
        setAssignedToUserId("");
        setPriority("");
        setStatus("Pending");
        setDueDate("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            title.trim() === "" ||
            assignedToUserId === "" ||
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
                assignedToUserId,
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
            assignedToUserId,
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
                            value={assignedToUserId}
                            onChange={(event) =>
                                setAssignedToUserId(event.target.value)
                            }
                        >
                            <option value="">Select officer</option>

                            {officers.map((officer) => (
                                <option
                                    key={officer.user_id}
                                    value={officer.user_id}
                                >
                                    {officer.user_id} - {officer.name}
                                </option>
                            ))}
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