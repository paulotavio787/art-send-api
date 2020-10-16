const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postsRoute = require("./routes/emails");

app.use("/emails", postsRoute);

//ROUTES
app.get("/", (req, res) => {
    res.send("Hello Father")
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONECTION, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("We are in!")
);


//indica qual porta ouvir
app.listen(3300, () => console.log("The Server is Run!!"))