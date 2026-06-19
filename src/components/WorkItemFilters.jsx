function WorkItemForm() {
    return (
        <section className="form-card">
            <h2>Add New Work Item</h2>

            <form>
                <div className="form-grid">
                    <div className="form-field">
                        <label>Title</label>
                        <input type="text" placeholder="Enter title" />
                    </div>

                    <div className="form-field">
                        <label>Description</label>
                        <textarea placeholder="Enter description"></textarea>
                    </div>

                    <div className="form-field">
                        <label>Assigned To</label>
                        <select>
                            <option>Select officer</option>
                            <option>John Officer</option>
                            <option>Jane Smith</option>
                            <option>Mike Brown</option>
                            <option>Sarah Lee</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label>Priority</label>
                        <select>
                            <option>Select priority</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label>Status</label>
                        <select>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label>Due Date</label>
                        <input type="date" />
                    </div>
                </div>

                <button type="button" className="primary-btn">
                    Add Work Item
                </button>
            </form>
        </section>
    );
}

export default WorkItemForm;