const pool = require("../db.cjs");

async function getAllWorkItems() {
    const result = await pool.query(`
        SELECT 
            w.id,
            w.title,
            w.description,
            w.assigned_to_user_id AS "assignedToUserId",
            o.name AS "assignedToName",
            w.status,
            w.priority,
            w.due_date AS "dueDate",
            w.created_date AS "createdDate"
        FROM work_items w
        LEFT JOIN officers o
        ON w.assigned_to_user_id = o.user_id
        ORDER BY w.id ASC
    `);

    return result.rows;
}

async function createWorkItem(workItemData) {
    const { title, description, assignedToUserId, status, priority, dueDate } =
        workItemData;

    const result = await pool.query(
        `
        INSERT INTO work_items 
        (title, description, assigned_to_user_id, status, priority, due_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING 
            id,
            title,
            description,
            assigned_to_user_id AS "assignedToUserId",
            status,
            priority,
            due_date AS "dueDate",
            created_date AS "createdDate"
        `,
        [
            title,
            description,
            assignedToUserId,
            status || "Pending",
            priority,
            dueDate,
        ]
    );

    return result.rows[0];
}

async function updateWorkItem(id, workItemData) {
    const { title, description, assignedToUserId, status, priority, dueDate } =
        workItemData;

    const result = await pool.query(
        `
        UPDATE work_items
        SET 
            title = $1,
            description = $2,
            assigned_to_user_id = $3,
            status = $4,
            priority = $5,
            due_date = $6
        WHERE id = $7
        RETURNING
            id,
            title,
            description,
            assigned_to_user_id AS "assignedToUserId",
            status,
            priority,
            due_date AS "dueDate",
            created_date AS "createdDate"
        `,
        [title, description, assignedToUserId, status, priority, dueDate, id]
    );

    return result.rows[0];
}

async function deleteWorkItem(id) {
    const result = await pool.query(
        `
        DELETE FROM work_items
        WHERE id = $1
        RETURNING
            id,
            title,
            description,
            assigned_to_user_id AS "assignedToUserId",
            status,
            priority,
            due_date AS "dueDate",
            created_date AS "createdDate"
        `,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    getAllWorkItems,
    createWorkItem,
    updateWorkItem,
    deleteWorkItem,
};