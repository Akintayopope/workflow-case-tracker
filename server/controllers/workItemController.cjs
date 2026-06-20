const workItemService = require("../services/workItemService.cjs");

async function getAllWorkItems(req, res) {
    try {
        const workItems = await workItemService.getAllWorkItems();
        res.json(workItems);
    } catch (error) {
        console.log("Get work items error:", error.message);

        res.status(500).json({
            message: "Failed to get work items",
            error: error.message,
        });
    }
}

async function createWorkItem(req, res) {
    try {
        const { title, assignedTo, priority, dueDate } = req.body;

        if (!title || !assignedTo || !priority || !dueDate) {
            return res.status(400).json({
                message: "Title, assignedTo, priority, and dueDate are required",
            });
        }

        const newWorkItem = await workItemService.createWorkItem(req.body);

        res.status(201).json(newWorkItem);
    } catch (error) {
        console.log("Create work item error:", error.message);

        res.status(500).json({
            message: "Failed to create work item",
            error: error.message,
        });
    }
}

async function updateWorkItem(req, res) {
    try {
        const id = Number(req.params.id);

        const { title, assignedTo, priority, dueDate } = req.body;

        if (!title || !assignedTo || !priority || !dueDate) {
            return res.status(400).json({
                message: "Title, assignedTo, priority, and dueDate are required",
            });
        }

        const updatedWorkItem = await workItemService.updateWorkItem(id, req.body);

        if (!updatedWorkItem) {
            return res.status(404).json({
                message: "Work item not found",
            });
        }

        res.json(updatedWorkItem);
    } catch (error) {
        console.log("Update work item error:", error.message);

        res.status(500).json({
            message: "Failed to update work item",
            error: error.message,
        });
    }
}

async function deleteWorkItem(req, res) {
    try {
        const id = Number(req.params.id);

        const deletedWorkItem = await workItemService.deleteWorkItem(id);

        if (!deletedWorkItem) {
            return res.status(404).json({
                message: "Work item not found",
            });
        }

        res.json({
            message: "Work item deleted successfully",
            deletedWorkItem,
        });
    } catch (error) {
        console.log("Delete work item error:", error.message);

        res.status(500).json({
            message: "Failed to delete work item",
            error: error.message,
        });
    }
}

module.exports = {
    getAllWorkItems,
    createWorkItem,
    updateWorkItem,
    deleteWorkItem,
};