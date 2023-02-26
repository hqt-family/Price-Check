const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/brands/', express.static(path.join(__dirname,'../client/public/brands')));

app.use("/api/products", require("./routes/productRoute"));
app.use("/api/prices", require("./routes/priceRoute"));
app.use("/api/user", require("./routes/authRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

app.use(errorHandler);
app.listen(port, () => console.log(`Port is ${port}`));
