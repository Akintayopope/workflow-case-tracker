const express = require("express");
const workItemController = require("../controllers/workItemController.cjs");

const router = express.Router();

router.get("/", workItemController.getAllWorkItems);

router.post("/", workItemController.createWorkItem);

router.put("/:id", workItemController.updateWorkItem);

router.delete("/:id", workItemController.deleteWorkItem);

module.exports = router;