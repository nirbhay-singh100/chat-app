require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();


app.use(cors({credentials: true, origin: true}));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log("server is running on port",PORT);
})