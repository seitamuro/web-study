// Import
const pg = require("pg")
const express = require("express")
const http = require("http")
const cors = require("cors")
const bodyParser = require("body-parser")

// create express instance
const app = express()
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if(!origin || origin.includes("localhost")) {
            callback(null, true)
        } else {
            callback(new Error(`Origin: ${origin} is now allowd`))
        }
    }
}))
const server = http.createServer(app)

// setup socket
const io = require("socket.io")(server)

// connect to PostgreSQL
const { Client } = require("pg")
const client = new Client({
    user: "root",
    host: "127.0.0.1",
    database: "postgres",
    password: "reactappwithpostgresql",
    port: 5432
})
client.connect()

// routing
app.get("/users", (req, res) => {
    client
        .query("SELECT * FROM users")
        .then(users => res.json(users.rows))
        .catch(e => {
            console.log(`${e.stack}`)
            res.json({})
        })
})

app.post("/adduser", (req, res) => {
    const username = req.body.username;
    const age = req.body.age;
    const email = req.body.email;

    client
        .query("INSERT INTO users(username, age, email) VALUES ($1, $2, $3)", [username, age, email])
        .then(response => {
            res.send("success")
        })
        .catch(e => {
            res.send("failed")
        })
})

// listening
server.listen(3001, "localhost", () => {
    console.log("listening on port 3001")
})

// export for testing
module.exports = { app }