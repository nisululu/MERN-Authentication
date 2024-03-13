const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' });

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error))

const app = express()

app.listen(3000, () => {
    console.log("server listening to port 3000");
})