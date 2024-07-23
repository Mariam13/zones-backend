const express = require("express");
const router = express.Router();
const controller = require("../controllers/zone.controller");

router.get("/", controller.get);
router.post("/", controller.insert);
router.delete("/:id(\\d+)", controller.delete);

module.exports = router;
