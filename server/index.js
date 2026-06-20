const express = require("express");
const cors = require("cors");

// This file contains the GET, POST, PUT, and DELETE route definitions.
const workItemRoutes = require("./routes/workItemRoutes.cjs");

// Create the Express app
const app = express();

// Define the port where the backend will run
const PORT = 5000;

// Enable CORS so the React frontend can call this backend.
// React runs on localhost:5173 and Express runs on localhost:5000,
// so CORS is needed during development.
app.use(cors());

// Allow Express to read JSON data from request bodies.
// This is needed for POST and PUT requests.
app.use(express.json());

// Optional test route.
// This is useful when you open http://localhost:5000 in the browser.
app.get("/", (req, res) => {
    res.send("Workflow Tracker API is running");
});

// Mount all work item routes under /api/work-items.
//
// This means:
// GET    /api/work-items       -> get all work items
// POST   /api/work-items       -> create a new work item
// PUT    /api/work-items/:id   -> update a work item
// DELETE /api/work-items/:id   -> delete a work item
app.use("/api/work-items", workItemRoutes);

// Start the backend server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
