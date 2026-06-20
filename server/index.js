const express = require("express");
const cors = require("cors");
const pool = require("./db.cjs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/api/work-items", async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT 
        id,
        title,
        description,
        assigned_to AS "assignedTo",
        status,
        priority,
        due_date AS "dueDate",
        created_date AS "createdDate"
      FROM work_items
      ORDER BY id ASC
    `);

        res.json(result.rows);
    } catch (error) {
        console.log("Get work items error:", error.message);
        res.status(500).json({
            message: "Failed to get work items",
        });
    }
});

app.get("/api/work-items", (req, res) => {
    res.json(workItems);
});

app.post("/api/work-items", async (req, res) => {
    try {
        const { title, description, assignedTo, status, priority, dueDate } = req.body;

        if (!title || !assignedTo || !priority || !dueDate) {
            return res.status(400).json({
                message: "Title, assignedTo, priority, and dueDate are required",
            });
        }

        const result = await pool.query(
            `
      INSERT INTO work_items 
      (title, description, assigned_to, status, priority, due_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING 
        id,
        title,
        description,
        assigned_to AS "assignedTo",
        status,
        priority,
        due_date AS "dueDate",
        created_date AS "createdDate"
      `,
            [
                title,
                description,
                assignedTo,
                status || "Pending",
                priority,
                dueDate,
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log("Create work item error:", error.message);
        res.status(500).json({
            message: "Failed to create work item",
        });
    }
});


app.put("/api/work-items/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { title, description, assignedTo, status, priority, dueDate } = req.body;

        if (!title || !assignedTo || !priority || !dueDate) {
            return res.status(400).json({
                message: "Title, assignedTo, priority, and dueDate are required",
            });
        }

        const result = await pool.query(
            `
      UPDATE work_items
      SET 
        title = $1,
        description = $2,
        assigned_to = $3,
        status = $4,
        priority = $5,
        due_date = $6
      WHERE id = $7
      RETURNING
        id,
        title,
        description,
        assigned_to AS "assignedTo",
        status,
        priority,
        due_date AS "dueDate",
        created_date AS "createdDate"
      `,
            [title, description, assignedTo, status, priority, dueDate, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Work item not found",
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.log("Update work item error:", error.message);

        res.status(500).json({
            message: "Failed to update work item",
            error: error.message,
        });
    }
});

app.delete("/api/work-items/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            `
      DELETE FROM work_items
      WHERE id = $1
      RETURNING
        id,
        title,
        description,
        assigned_to AS "assignedTo",
        status,
        priority,
        due_date AS "dueDate",
        created_date AS "createdDate"
      `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Work item not found",
            });
        }

        res.json({
            message: "Work item deleted successfully",
            deletedWorkItem: result.rows[0],
        });
    } catch (error) {
        console.log("Delete work item error:", error.message);

        res.status(500).json({
            message: "Failed to delete work item",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});