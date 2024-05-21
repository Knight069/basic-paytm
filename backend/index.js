// e1db9182f28a06c3b224fe752458f401eb4d5f1749922457dfe640a97ae3d07a
const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index.js")

app.use(cors());
app.use(express.json());

const router = require("./routes/index.js");
const app = express();

app.use("/api/v1", mainRouter);

app.listen(3000);




module.exports = router;