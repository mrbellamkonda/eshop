const express = require("express");
const cors = require("cors");

require("dotenv").config({path: "./config.env"});

const app = express();

const port = process.env.PORT || 9005;

app.use(cors());

app.use(express.json());

app.use(require("./routes"));

const dbo = require("./conn");

app.listen(port, () => {
    dbo.connect(function(err) {
        if(err) console.error(err);
    })
    console.log(`server is running on port: ${port}`);
});