// main Dependencies
const express = require("express");
const app = express();

// test Dependencies
const auth = require("./middleware/auth");

// util Dependencies
require("dotenv").config();

// connect Database
require("./db/configdb")();

//===========MIDDLEWARES==========
app.use(express.json());
// app.use(fileUpload());

//===========ROUTES===============
app.use("/api", require("./api/routes/users"));
app.use("/api", require("./api/routes/posts"));

//============OTHERS=============
app.get("/", (req, res) => {
  res.send("api running");
});

//==========TEST ROUTES==========
app.get("/amiauthed", auth, (req, res) => {
  res.send(req.user);
});

// Server listen util
app.listen(process.env.PORT || 5000, () => {
  process.env.PORT
    ? console.log("Env utilized")
    : console.log("Env not utilized");
  console.log(`server running on ${process.env.PORT || 5000}`);
});
