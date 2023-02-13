const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/products", require("./routes/productRoute"));
app.use("/api/prices", require("./routes/priceRoute"));
app.use("/api/user", require("./routes/authRoute"));

app.use(errorHandler);
app.listen(port, () => console.log(`Port is ${port}`));
