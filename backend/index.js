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
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        Class TEXT,
        Photo_path TEXT,
        video_path TEXT
      )
    `;

    const createBookTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
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
const { get } = require('http')
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post('/upload-student', upload.fields([{name: 'student_photo'}, {name: 'student_video'}]), async (req, res) => {
    const photo_path = req.files.student_photo ? req.files.student_photo[0].path : null;
    const video_path = req.files?.student_video ? req.files.student_video[0].path : null;
    const {student_name, student_class} = req.body

    const insertIntoDB = `
    INSERT INTO student (Name, Class, Photo_path, video_path) VALUES ('${student_name}', '${student_class}', '${photo_path}', '${video_path}')`

    db.run(insertIntoDB)

    const allStudents = `
    SELECT * FROM student`

    const allStudentsList = await db.all(allStudents)
    
    res.send(allStudentsList)
    
})

app.post('/upload-book', async (request, response) => {
  const {bookName, author, publication, year} = request.body
  const insertNewBook = `INSERT INTO books (Name, Author, Publication, Year) VALUES ('${bookName}', '${author}', '${publication}', '${year}')`

  await db.run(insertNewBook)

  response.send({message: 'Book Added Successfully'})
})

app.get('/all-students', async (request, response) => {
  const getAllStudents = `
  SELECT * FROM student`

  const studentsList = await db.all(getAllStudents)
  response.send(studentsList)
})

app.get('/all-books', async (request, response) => {
  const gettingAllBooks = `
  SELECT * FROM books`

  const booksList = await db.all(gettingAllBooks)

  response.send(booksList)
})

app.post('/update-book/:book_id', async (request, response) => {
  const {Name, Author, Publication, Year} = request.body
  const {book_id} = request.params

  console.log(Name)

  const updateBook = `
  UPDATE books SET Name = '${Name}', Author = '${Author}', Publication = '${Publication}', Year = '${Year}' WHERE Id = ${book_id}`

  await db.run(updateBook)

  const getBooksData = `
  SELECT * FROM books`

  const allBooks = await db.all(getBooksData)

  response.send(allBooks)

})

app.delete('/delete-book/:book_id', async (request, response) => {
  const {book_id} = request.params

  const deleteBook = `
  DELETE FROM books WHERE Id = ${book_id}`

  await db.run(deleteBook)

  const allBooks = `
  SELECT * FROM books`

  const booksList = await db.all(allBooks) 
  response.send(booksList)
})

app.post('/update-student/:student_id', upload.fields([{name: 'photo_path'}, {name: 'video_path'}]) , async (request, response) => {
  const {student_id} = request.params
  const {student_name, student_class} = request.body
  const photo = request.files.photo_path ? request.files.photo_path[0].path : null
  const video = request.files.video_path ? request.files.video_path[0].path : null


  const updateStudent = `
  UPDATE student SET Name = '${student_name}' , Class = '${student_class}', Photo_path = '${photo}', video_path = '${video}' WHERE Id = ${student_id}`

  await db.run(updateStudent)
  
  const getAllStudents = `
  SELECT * FROM student`

  const allStudents = await db.all(getAllStudents)

  console.log(allStudents)

  response.send(allStudents)
})

app.delete('/delete-student/:student_id', async (request, response) => {
  const {student_id} = request.params

  const delteStudent = `
  DELETE FROM student WHERE Id = ${student_id}`

  await db.run(delteStudent)

  const allStudents = `
  SELECT * FROM student`

  const studentsList = await db.all(allStudents)

  response.send(studentsList)
})