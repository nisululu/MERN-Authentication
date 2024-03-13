const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

//connecting mongodb
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error))

const app = express()
app.use(express.json())

//importing routes
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

app.listen(process.env.PORT, () => {
    console.log(`server listening to port ${process.env.PORT}`);
})