var express = require("express");
var router = express.Router();
const uploadHandler = require("./cloud-storage-handler/upload");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/event", (req, res, next) => {
  res.json({});
});
router.get("/users", (req, res, next) => {
  res.json({});
});
router.post("/upload", uploadHandler);
module.exports = router;
