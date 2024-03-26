const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const path = require ('path')
dotenv.config();

//connecting mongodb
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error))

const __dirname = path.resolve()
const app = express()
app.use(express.static(__dirname, '/client/dist'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
app.use(express.json())
app.use(cookieParser())


//importing routes
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

//handling error through middleware
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`server listening to port ${process.env.PORT}`);
})