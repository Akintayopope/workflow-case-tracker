const express = require("express");
const pool = require("../db.cjs");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT user_id, name FROM officers ORDER BY name"
        );

        res.json(result.rows);
    } catch (error) {
        console.log("Get officers error:", error.message);
        res.status(500).json({ message: "Failed to get officers" });
    }
});

module.exports = router;