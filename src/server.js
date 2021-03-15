const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
// const connectDB = require("./config/db");

// connect Database
// connectDB();

//init Middleware
app.use(express.json());
// app.use(fileUpload());

// define routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/posts", require("./routes/api/posts"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/users", require("./routes/api/upload"));

app.get("/", (req, res) => {
  res.send("api running");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
