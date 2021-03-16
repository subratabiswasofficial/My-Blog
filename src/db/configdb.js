// Dependencies
const mongoose = require("mongoose");

console.log(process.env.MONGO_URL_LOCAL);

// main function
const configdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    // if db connected
    console.log("Succefully connected to db");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// export
module.exports = configdb;
