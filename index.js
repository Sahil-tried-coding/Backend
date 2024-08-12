const express = require("express");
const app = express();
const db_connect = require("./config/Database");
const {sigin,login} = require("./Controllers/Auth");
const router = require("./Routers/router")
const cookie_parser = require("cookie-parser");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser())
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server started at", PORT);
});
db_connect

app.use("/test/v1",router)
