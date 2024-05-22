const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index.js")
const app = express();

app.use(cors());
app.use(express.json());

const router = require("./routes/index.js");

app.use("/api/v1", rootRouter);

app.listen(3000);


// module.exports = router;