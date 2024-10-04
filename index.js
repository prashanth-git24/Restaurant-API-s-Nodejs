const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
//dot en configuration
dotenv.config();
//DB connection
connectDb();
//rest object

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/restaurant",require("./routes/restaurantroute"));
app.use("/api/v1/category",require("./routes/categoryroutes"));
app.use("/api/v1/food",require("./routes/foodroutes"));

app.get("/", (req, res) => {
    return res
      .status(200)
      .send("<h1>Welcome to Food Server APP API BASE PROJECT </h1>");
  });
//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});