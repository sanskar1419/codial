const express = require("express");
const router = express.Router();

router.use("/v1", require("./v1")); //Here we have told if the request is for v1 then route it to v1 index.js

module.exports = router;
