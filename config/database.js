const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("database connect ho gya.");
    })
    .catch((err) => {
      console.log("database connect nhi huaa");
      console.error(err)
      process.exit(1);
    });
};
