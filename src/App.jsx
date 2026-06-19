import { useEffect, useRef, useState } from "react";
import WorkItemForm from "./components/WorkItemForm";
import "./index.css";

function App() {
  const [workItems, setWorkItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editingItem, setEditingItem] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/work-items")
      .then((response) => response.json())
      .then((data) => {
        setWorkItems(data);
      });
  }, []);

  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  function scrollToForm() {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function addWorkItem(newWorkItem) {
    const itemToAdd = {
      ...newWorkItem,
      id: workItems.length + 1,
      createdDate: getTodayDate(),
    };

    setWorkItems([...workItems, itemToAdd]);
  }

  function startEditingWorkItem(item) {
    setEditingItem(item);
    scrollToForm();
  }

  function updateWorkItem(updatedWorkItem) {
    const updatedItems = workItems.map((item) => {
      if (item.id === updatedWorkItem.id) {
        return updatedWorkItem;
      }

      return item;
    });

    setWorkItems(updatedItems);
    setEditingItem(null);
  }

  function cancelEdit() {
    setEditingItem(null);
  }

  function deleteWorkItem(id) {
    const updatedItems = workItems.filter((item) => item.id !== id);
    setWorkItems(updatedItems);

    if (editingItem && editingItem.id === id) {
      setEditingItem(null);
    }
  }

  function updateWorkItemStatus(id, newStatus) {
    const updatedItems = workItems.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }

      return item;
    });

    setWorkItems(updatedItems);
  }

  function clearFilters() {
    setSearchTerm("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  const filteredWorkItems = workItems.filter((item) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || item.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="app">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Track and manage your work items</p>
        </div>

        <button className="new-work-btn" onClick={scrollToForm}>
          + New Work Item
        </button>
      </header>

      <div ref={formRef}>
        <WorkItemForm
          onAddWorkItem={addWorkItem}
          editingItem={editingItem}
          onUpdateWorkItem={updateWorkItem}
          onCancelEdit={cancelEdit}
        />
      </div>

      <section className="work-items-card">
        <h2>Work Items</h2>

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

        {filteredWorkItems.length === 0 ? (
          <p className="empty-text">No work items added yet.</p>
        ) : (
          <>
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
                  {filteredWorkItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td>
                        <div className="title-cell">
                          <div className="title-link">{item.title}</div>
                          <div className="title-description">
                            {item.description}
                          </div>
                        </div>
                      </td>

                      <td>{item.assignedTo}</td>

                      <td>
                        <select
                          className={`status-select status-${item.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
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
                        <span
                          className={`badge badge-${item.priority.toLowerCase()}`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      <td>{item.dueDate}</td>
                      <td>{item.createdDate}</td>

                      <td>
                        <div className="actions-cell">


                          <button
                            className="icon-btn edit-btn"
                            type="button"
                            onClick={() => startEditingWorkItem(item)}
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                          </button>

                          <button
                            className="icon-btn delete-btn"
                            type="button"
                            onClick={() => deleteWorkItem(item.id)}
                            title="Delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M8 6V4h8v2" />
                              <path d="M19 6l-1 14H6L5 6" />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
          </>
        )}
      </section>
    </div>
  );
}

export default App;