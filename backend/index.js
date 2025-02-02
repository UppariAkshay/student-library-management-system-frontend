const dotenv = require('dotenv')
dotenv.config()

const express = require('express')

const multer = require('multer')

const cors = require('cors');  

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { buffer } = require('stream/consumers');
const { error } = require('console');



let db = null

const PORT = process.env.PORT

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
  try {
    const { name, classs } = req.body;
    const photo = req.files.photo[0];
    const video = req.files.video[0];

    if (!name || !classs || !photo || !video) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const base64Photo = photo.buffer.toString('base64');
    const base64Video = video.buffer.toString('base64');

    const newStudentData = new StudentData({
      name,
      class: classs,
      photo: base64Photo,
      video: base64Video,
    });

    const savedStudentData = await newStudentData.save();
    res.status(201).send(savedStudentData);
  } catch (error) {
    console.error('Error in /upload-student:', error);
    res.status(500).send({ error: 'Internal Server Error' });
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
  
  const allBooksList = await BooksData.find()
  response.send(allBooksList)
})

app.get('/all-students', async (request, response) => {
  const studentsList = await StudentData.find()
  response.send(studentsList)
})

app.get('/all-books', async (request, response) => {
  const allBooks = await BooksData.find()

  response.send(allBooks)
})

app.delete('/delete-student/:studentID', async (request, response) => {
  try{
    const {studentID} = request.params

    const deletedStudent = await StudentData.findByIdAndDelete(studentID)

    if (!deletedStudent)
    {
      response.status(404)
      response.send({error: "Item not found."})
    }
    else{
      const studentsList = await StudentData.find()
      response.status(200)
      response.send(studentsList)
    }
    
  }
  catch(e)
  {
    response.status(500)
    response.send({error: "Internal server error"})
  }
  
})

app.delete('/delete-book/:bookID', async (request, response) => {
  try{
    const {bookID} = request.params

    const deletedBook = await BooksData.findByIdAndDelete(bookID)

    if (!deletedBook)
    {
      response.status(404)
      response.send({error: "Item not found."})
    }
    else{
      const booksList = await BooksData.find()
      response.status(200)
      response.send(booksList)
    }
    
  }
  catch(e)
  {
    response.status(500)
    response.send({error: "Internal server error"})
  }
  
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});