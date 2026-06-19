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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});