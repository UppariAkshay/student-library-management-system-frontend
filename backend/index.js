const express = require('express')
const path = require('path')

const multer = require('multer')

const { open } = require('sqlite')
const sqlite3 = require('sqlite3')

const cors = require('cors');  

const dbPath = path.join(__dirname, 'studentLibraryDatabase.db')

let db = null

const app = express()
app.use(cors())
app.use(express.json())

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    
    // Create table if it doesn't exist
    const createStudentTableQuery = `
      CREATE TABLE IF NOT EXISTS student (
        Name TEXT,
        Class TEXT,
        Photo_path TEXT,
        video_path TEXT
      )
    `;

    const createBookTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
    Name TEXT,
    Author TEXT,
    Publication TEXT,
    Year DATE)`
    
    // Execute the query to create the table
    await db.run(createStudentTableQuery)
    await db.run(createBookTableQuery)
    
    app.listen(5000, () => {
      console.log('Server Running at http://localhost:5000/')
    })
  } catch (e) {
    console.log(`DB Error is ${e.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}