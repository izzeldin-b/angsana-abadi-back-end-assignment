require('dotenv').config();

const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.APP_PORT;
const db = mysql.createConnection({
    host: process.env.HOST,    
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

app.listen(port, () => {
    console.log(`listening on`,port); 
});

// Show All Notes
app.get("/show-notes", (req, res) => {
    const q = "SELECT * FROM notes";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add New Note (dengan tanggal/waktu)
app.post('/add-note', async (req, res) => {
    const q = "INSERT INTO notes (title, note, datetime) VALUES (?, ?,?)"; 

    const values = [
        req.body.title,
        req.body.note,
        new Date()
    ];

    db.query(q, values, (err, data) => { 
        if (err) {
            console.error("Error inserting note:", err);
            return res.status(500).json(err);
        }
        return res.json("New Note Added"); 
    });
});

// Edit Notes (update juga tanggal/waktu)
app.put('/update-note/:id', async (req, res) => {
    const noteId = req.params.id;
    const { title, note } = req.body;

    const q = "UPDATE notes SET title = ?, note = ?, datetime = CURRENT_TIMESTAMP WHERE id = ?"; 
    db.query(q, [title, note, noteId], (err, data) => {
        if (err) {
            console.error("Error updating note:", err);
            return res.status(500).json(err);
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json({ message: "Note updated successfully" });
    });
});

// Delete A Note
app.delete('/delete-note/:id', async (req, res) => {
    const noteId = req.params.id; 

    const q = "DELETE FROM notes WHERE id = ?";
    db.query(q, [noteId], (err, data) => {
        if (err) {
            console.error("Error deleting note:", err);
            return res.status(500).json(err);
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json({ message: "Note deleted successfully" });
    });
});