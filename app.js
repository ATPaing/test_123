const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

// Initialize express app
const app = express();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc@123',
    database: 'test'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database.');
});


app.use(cors())
// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.json({ limit: '1000mb' }))
app.get("/api/getVideo/:id", async (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM video_storage WHERE id = ${id}`;
    const [result] = await db.promise().query(query);
    if (result.length === 0) {
        return res.status(404).json({ error: 'Video not found' });
    }
    const video = result[0];
    return res.status(200).json(video);
})


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
