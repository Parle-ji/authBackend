const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

require("./config/database").dbConnect();

const user = require("./routes/authRoutes");
app.use("/api/v1", user);
