import { faker } from '@faker-js/faker';
import mysql from "mysql2/promise"; // Use promise-based API
import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import methodOverride from "method-override";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files (CSS, etc.)

// Database connection
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mega_app',
    password: 'Silver@1005'
});

// Routes

// 1. Home Route with Forms
app.get("/", (req, res) => {
    res.send(`
    <h1>User Management</h1>
    <form method="POST" action="/add-user">
      <h2>Add User</h2>
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Add User</button>
    </form>
    <br />
    <form method="POST" action="/delete-user?_method=DELETE">
      <h2>Delete User</h2>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Delete User</button>
    </form>
  `);
});

// 2. Add User Route
app.post("/add-user", async (req, res) => {
    const { username, email, password } = req.body;
    const query = "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
    const newUser = [faker.string.uuid(), username, email, password];

    try {
        await connection.query(query, newUser);
        res.send(`<h1>User Added Successfully!</h1><a href="/">Go Back</a>`);
    } catch (err) {
        console.error(err);
        res.status(500).send(`<h1>Error Adding User</h1><a href="/">Go Back</a>`);
    }
});

// 3. Delete User Route
app.delete("/delete-user", async (req, res) => {
    const { email, password } = req.body;
    const query = "DELETE FROM users WHERE email = ? AND password = ?";

    try {
        const [result] = await connection.query(query, [email, password]);
        if (result.affectedRows > 0) {
            res.send(`<h1>User Deleted Successfully!</h1><a href="/">Go Back</a>`);
        } else {
            res.send(`<h1>User Not Found or Incorrect Credentials</h1><a href="/">Go Back</a>`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(`<h1>Error Deleting User</h1><a href="/">Go Back</a>`);
    }
});

// Server Start
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});