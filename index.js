const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

require("./config/database").dbConnect();

const user = require("./routes/authRoutes");
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send(`<h1>You are on the home page baby.....</h1>`);
});

app.listen(PORT, () => {
  console.log(`app is runnig on port no => ${PORT}`);
});
