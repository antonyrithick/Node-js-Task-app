const express = require("express");
const dbconfig = require("./app/dbconfig");
require("dotenv").config();
const models = require("./app/models/employee");
const ticket = require("./app/models/Ticket");
const userRoute = require("./app/routes/userRoute");
const ticketRoute = require("./app/routes/ticketRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRoute);
app.use("/api", ticketRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server is running..." + PORT);
});
