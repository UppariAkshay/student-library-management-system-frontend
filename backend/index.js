const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')

const multer = require('multer')

const { open } = require('sqlite')
const sqlite3 = require('sqlite3')

const cors = require('cors');  

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { buffer } = require('stream/consumers')

const dbPath = path.join(__dirname, 'studentLibraryDatabase.db')

let db = null

const PORT = 5000

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB Connection failed', err));

const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  photo: String,
  video: String
})

const StudentData = mongoose.model('studentData',studentSchema)



const booksSchema = new mongoose.Schema({
  name: String,
  author: String,
  publication: String,
  year: String
})

const BooksData = mongoose.model('booksData' ,booksSchema)


const app = express()
app.use(cors())
app.use(bodyParser.json())


const storage = multer.memoryStorage()
const upload = multer({storage});

app.post('/upload-student', upload.fields([{name: 'photo'}, {name: 'video'}]), async (req, res) => {
  
    const photo = req.files.photo[0]
    const video = req.files.video[0]
    const {name, classs} = req.body

    const base64Photo = photo.buffer.toString('base64')
    const base64Video = video.buffer.toString('base64')
    // const base64Video = video.buffer.toString('base64')

    const newStudentData = new StudentData({
      name: name,
      class: classs,
      photo: base64Photo,
      video: base64Video
    })

    const MAX_VIDEO_SIZE = 7 * 1024 * 1024; // 7MB in bytes
    if (video.size > MAX_VIDEO_SIZE) {
      res.status(400).send( {error: 'video file size exceeds the allowed limit of 7MB.'} );
    }else{
      const savedStudentData = await newStudentData.save()
      res.status(200).send(savedStudentData)
    }
    
})

app.post('/upload-book', async (request, response) => {
  const {bookName, author, publication, year} = request.body

  const newBook = new BooksData({
    name: bookName,
    author: author,
    publication: publication,
    year: year
  }) 

  const savedBook = await newBook.save()
  response.send(savedBook)
})

app.get('/all-students', async (request, response) => {
  const studentsList = await StudentData.find()
  response.send(studentsList)
})

app.get('/all-books', async (request, response) => {
  const allBooks = await BooksData.find()

  response.send(allBooks)
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
  const {name} = request.body
  const photo = request.files.photo_path ? request.files.photo_path[0].path : null
  const video = request.files.video_path ? request.files.video_path[0].path : null

  
  
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});