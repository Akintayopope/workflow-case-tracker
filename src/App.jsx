import { useEffect, useRef, useState } from "react";
import WorkItemForm from "./components/WorkItemForm";
import WorkItemSection from "./components/WorkItemSection";
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
      })
      .catch((error) => {
        console.log("Fetch work items error:", error);
        alert("Could not load work items.");
      });
  }, []);

  function scrollToForm() {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function addWorkItem(newWorkItem) {
    try {
      const response = await fetch("http://localhost:5000/api/work-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add work item");
      }

      const savedWorkItem = await response.json();

      setWorkItems((currentWorkItems) => [...currentWorkItems, savedWorkItem]);
    } catch (error) {
      console.log("Add work item error:", error);
      alert("Could not add work item. Please try again.");
    }
  }

  async function updateWorkItem(updatedWorkItem) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/work-items/${updatedWorkItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWorkItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update work item");
      }

      const savedUpdatedWorkItem = await response.json();

      setWorkItems((currentWorkItems) =>
        currentWorkItems.map((item) =>
          item.id === savedUpdatedWorkItem.id ? savedUpdatedWorkItem : item
        )
      );

      setEditingItem(null);
    } catch (error) {
      console.log("Update work item error:", error);
      alert("Could not update work item. Please try again.");
    }
  }

  function startEditingWorkItem(item) {
    setEditingItem(item);
    scrollToForm();
  }

  function cancelEdit() {
    setEditingItem(null);
  }

  async function deleteWorkItem(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/work-items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete work item");
      }

      setWorkItems((currentWorkItems) =>
        currentWorkItems.filter((item) => item.id !== id)
      );

      if (editingItem && editingItem.id === id) {
        setEditingItem(null);
      }
    } catch (error) {
      console.log("Delete work item error:", error);
      alert("Could not delete work item. Please try again.");
    }
  }

  async function updateWorkItemStatus(id, newStatus) {
    const itemToUpdate = workItems.find((item) => item.id === id);

    if (!itemToUpdate) {
      return;
    }

    const updatedWorkItem = {
      ...itemToUpdate,
      status: newStatus,
    };

    await updateWorkItem(updatedWorkItem);
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

        <button className="new-work-btn" type="button" onClick={scrollToForm}>
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

      <WorkItemSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        clearFilters={clearFilters}
        filteredWorkItems={filteredWorkItems}
        updateWorkItemStatus={updateWorkItemStatus}
        startEditingWorkItem={startEditingWorkItem}
        deleteWorkItem={deleteWorkItem}
      />
    </div>
  );
}

export default App;