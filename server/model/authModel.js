const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
    permission: {
      type: String,
      require: [true, "Please add a permission"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("authModel", authSchema);