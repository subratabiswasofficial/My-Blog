// main Dependencies
const express = require("express");
const app = express();
const path = require("path");

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

//==========MAIN SETUP==========
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// Server listen util
app.listen(process.env.PORT || 5000, () => {
  process.env.PORT
    ? console.log("Env utilized")
    : console.log("Env not utilized");
  console.log(`server running on ${process.env.PORT || 5000}`);
});
