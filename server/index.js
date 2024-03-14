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

//handling error through middleware
app.use((err, req, res, next) => {
    const statusCode= err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server listening to port ${process.env.PORT}`);
})