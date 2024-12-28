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

const upload = multer( {storage} )

const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post('/upload', upload.fields([{name: 'student_photo'}, {name: 'student_video'}]), async (req, res) => {
    const photo_path = req.files.student_photo ? req.files.student_photo[0].path : null;
    const video_path = req.files?.student_video ? req.files.student_video[0].path : null;
    const {student_name, student_class} = req.body

    const insertIntoDB = `
    INSERT INTO student (Name, Class, Photo_path, video_path) VALUES ('${student_name}', '${student_class}', '${photo_path}', '${video_path}')`

    db.run(insertIntoDB)

    res.send({
        photo_path,
        video_path,
    });
    
})

app.post('/upload-book', async (request, response) => {
  const {bookName, author, publication, year} = request.body
  const insertNewBook = `INSERT INTO books (Name, Author, Publication, Year) VALUES ('${bookName}', '${author}', '${publication}', '${year}')`

  await db.run(insertNewBook)

  response.send('Book Added Successfully')
})

// app.get('/all-students', async (request, response) => {
//   const getAllStudents = `
//   SELECT * FROM student`

//   const studentsList = await db.all(getAllStudents)
//   response.send(studentsList)
// })
