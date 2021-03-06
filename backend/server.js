const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/ErrorMiddleware")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

// Connect to database

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Support Desk API" })
})

// Routes
app.use("/api/users", require("./routes/UserRoutes"))
app.use("/api/tickets", require("./routes/TicketRoutes"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
