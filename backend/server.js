const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "DevOpsHub API is running 🚀"
    });
});


// Get all posts
app.get("/api/posts", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM posts ORDER BY created_at DESC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error getting posts:", error);

        res.status(500).json({
            message: "Failed to get posts"
        });
    }
});


// Get one post
app.get("/api/posts/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM posts WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Error getting post:", error);

        res.status(500).json({
            message: "Failed to get post"
        });
    }
});


// Create a post
app.post("/api/posts", async (req, res) => {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
        return res.status(400).json({
            message: "Title, category and content are required"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO posts (title, category, content)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [title, category, content]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error creating post:", error);

        res.status(500).json({
            message: "Failed to create post"
        });
    }
});


app.listen(PORT, () => {
    console.log(`DevOpsHub API running on http://localhost:${PORT}`);
});