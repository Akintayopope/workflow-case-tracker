const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const workItems = [
    {
        id: 1,
        title: "Review case assignment",
        description: "Check assigned officer and case priority",
        assignedTo: "Jane Smith",
        status: "Pending",
        priority: "High",
        dueDate: "2026-06-25",
        createdDate: "2026-06-19",
    },
    {
        id: 2,
        title: "Update production report",
        description: "Prepare weekly production summary",
        assignedTo: "John Officer",
        status: "In Progress",
        priority: "Medium",
        dueDate: "2026-06-28",
        createdDate: "2026-06-19",
    },
];

app.get("/", (req, res) => {
    res.send("Workflow Tracker API is running");
});

app.get("/api/work-items", (req, res) => {
    res.json(workItems);
});

app.post("/api/work-items", (req, res) => {
    const { title, description, assignedTo, status, priority, dueDate } = req.body;

    if (!title || !assignedTo || !priority || !dueDate) {
        return res.status(400).json({
            message: "Title, assignedTo, priority, and dueDate are required",
        });
    }

    const newWorkItem = {
        id: workItems.length + 1,
        title,
        description,
        assignedTo,
        status: status || "Pending",
        priority,
        dueDate,
        createdDate: new Date().toISOString().split("T")[0],
    };

    workItems.push(newWorkItem);

    res.status(201).json(newWorkItem);
});


app.put("/api/work-items/:id", (req, res) => {
    const id = Number(req.params.id);

    const { title, description, assignedTo, status, priority, dueDate } = req.body;

    const workItemIndex = workItems.findIndex((item) => item.id === id);

    if (workItemIndex === -1) {
        return res.status(404).json({
            message: "Work item not found",
        });
    }

    if (!title || !assignedTo || !priority || !dueDate) {
        return res.status(400).json({
            message: "Title, assignedTo, priority, and dueDate are required",
        });
    }

    const updatedWorkItem = {
        ...workItems[workItemIndex],
        title,
        description,
        assignedTo,
        status,
        priority,
        dueDate,
    };

    workItems[workItemIndex] = updatedWorkItem;

    res.json(updatedWorkItem);
});


app.delete("/api/work-items/:id", (req, res) => {
    const id = Number(req.params.id);

    const workItemIndex = workItems.findIndex((item) => item.id === id);

    if (workItemIndex === -1) {
        return res.status(404).json({
            message: "Work item not found",
        });
    }

    const deletedWorkItem = workItems.splice(workItemIndex, 1);

    res.json({
        message: "Work item deleted successfully",
        deletedWorkItem: deletedWorkItem[0],
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});