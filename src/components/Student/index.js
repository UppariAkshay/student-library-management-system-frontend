import { useState, useEffect } from "react"
import ReactPlayer from 'react-player'
import './index.css'

const Student = () => {
    const [studentName, setStudentName] = useState()
    const [studentClass, setStudentClass] = useState()
    const [studentPhoto, setStudentPhoto] = useState()
    const [studentVideo, setStudentVideo] = useState()
    const [studentTableData, setStudentTableData] = useState()
    const [editStudentId, setEditStudentId] = useState(-1)
    const [editStudentData, setEditStudentData] = useState({})
    const [studentFormError, setStudentFormError] = useState('')

    const [bookName, setBookName] = useState()
    const [author, setAuthor] = useState()
    const [publication, setPublication] = useState()
    const [year, setYear] = useState()
    const [bookFormStatus, setBookFormStatus] = useState('')
    const [booksTableData, setBooksTableData] = useState()
    const [editBookRowID, setEditBookRowID] = useState(-1)
    const [editBookName, setEditBookName] = useState()
    const [editBookAuthor, setEditBookAuthor] = useState()
    const [editBookPublication, setEditBookPublication] = useState()
    const [editBookYear, setEditBookYear] = useState()




    useEffect(() => {

        const fetchAllStudent = async () => {
            const response = await fetch('https://student-library-management-system-backend.vercel.app/all-students')
            const data = await response.json()

            setStudentTableData(data)
        }

        const fetchAllBooks = async () => {
            const response = await fetch('https://student-library-management-system-backend.vercel.app/all-books')
            const booksList = await response.json()

            setBooksTableData(booksList)

            console.log(booksList)

            // setBooksTableData(booksList)
        }
        
         fetchAllStudent()
         fetchAllBooks()
    }, [])




    const onSubmitStudentForm = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("photo", studentPhoto)
        formData.append("video", studentVideo)
        formData.append("name", studentName)
        formData.append("classs", studentClass)

        const options = {
            method: 'POST',
            body: formData
        }

        const response = await fetch('https://student-library-management-system-backend.vercel.app/upload-student', options)
        const data = await response.json()

        console.log(response)
        console.log(data)
        
        if (response.ok === true)
        {
            setStudentTableData(prevState => ([...prevState, data]))
            setStudentFormError('')
        }
        else{
            setStudentFormError(data.error)
        }
        
    }

    const onSubmitBookForm = async (e) => {
        e.preventDefault()

        const bookFormData = {bookName, author, publication, year}
        console.log(bookFormData)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookFormData),
        }

        const response = await fetch('https://student-library-management-system-backend.vercel.app/upload-book', options)
        const data = await response.json()

        if (response.ok === true)
        {
            setBooksTableData(data)
        }
    }

    const displayStudentTableData = () => {
        const onClickEdit = (studentId) => {
            setEditStudentId(studentId)
        }

        const onClickSave = async (studentId) => {
            const editStudentFormData = new FormData()
            editStudentFormData.append('student_name', editStudentData.Name)
            editStudentFormData.append('student_class', editStudentData.Class)
            editStudentFormData.append('photo_path', editStudentData.Photo)
            editStudentFormData.append('video_path', editStudentData.Video)

            const options = {
                method: 'POST',
                body: editStudentFormData
            }
            const response = await fetch(`https://student-library-management-system-backend.vercel.app/${studentId}`, options)
            const allStudentsList = await response.json()

            console.log(allStudentsList, 'all students list')

            setStudentTableData(allStudentsList)
            setEditStudentId(-1)


        }

        const onClickDelteStudent = async eachStudent => {
            const options = {
                method: 'DELETE',
            }

            const response = await fetch(`https://student-library-management-system-backend.vercel.app/delete-student/${eachStudent._id}`, options)
            const studentsList = await response.json()

            console.log(studentsList)

            setStudentTableData(studentsList)
        }




        const displayEditFormat = (eachStudent) => {
            return <tr>
                <td>{eachStudent.Id}</td>
                <td><input onChange={ (e) => setEditStudentData(prevState => ({...prevState, Name: e.target.value}))} className="form-control" type="text" /></td>
                <td><input onChange={ (e) => setEditStudentData(prevState => ({...prevState, Class: e.target.value}))} className="form-control" type="text" /></td>
                <td><input onChange={ (e) => setEditStudentData(prevState => ({...prevState, Photo: e.target.files[0]}))} className="form-control" type="file" /></td>
                <td><input onChange={ (e) => setEditStudentData(prevState => ({...prevState, Video: e.target.files[0]}))} className="form-control" type="file" /></td>
                <td><button onClick={ () => onClickSave(eachStudent.Id)} className="btn btn-dark">Save</button> <button onClick={ () => setEditStudentId(-1)} className="btn btn-warning">Cancel</button></td>
                </tr>
        }

        const displayNonEditableFormat = (eachStudent) => {
            console.log('student row and student details are', eachStudent, studentTableData)

            return <tr>
                <td>{eachStudent._id}</td>
                <td>{eachStudent.name}</td>
                <td>{eachStudent.class}</td>
                <td><img className="studentTableImageIMG" src={`data:image/png;base64,${eachStudent.photo}`} /></td>
                <td><video width="200" controls>
                        <source src={`data:video/mp4;base64,${eachStudent.video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video></td>
                <td><button onClick={ (e) => onClickEdit(eachStudent.Id)} className="btn btn-primary">Edit</button><button onClick={ () => onClickDelteStudent(eachStudent)} className="btn btn-dark">Delete</button></td>
        </tr>
        }


        return studentTableData.map(eachStudent => eachStudent.Id === editStudentId ? displayEditFormat(eachStudent) : displayNonEditableFormat(eachStudent))
    }

    const displayBooksTableData = () => {

        const updateBooksDatabase = async (bookId) => {
            
            const options = {
                method: 'POST',
                body: JSON.stringify({Name: editBookName, Author: editBookAuthor, Publication: editBookPublication, Year: editBookYear}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(`https://student-library-management-system-backend.vercel.app/${bookId}`, options)
            const updatedBooksList = await response.json()
            
            if (response.ok === true)
            {
                setBooksTableData(updatedBooksList)
            }
            
            setEditBookRowID(-1)
        }
        
        const onClickEditBook = (bookData) => {
            setEditBookRowID(bookData.Id)
        }

        const deleteBook = async (bookId) => {
            const options = {
                method: 'DELETE',
            }

            const response = await fetch(`https://student-library-management-system-backend.vercel.app/delete-book/${bookId}`, options)
            const allBooksList = await response.json()

            console.log(allBooksList)

            setBooksTableData(allBooksList)
        }



        const displayEditFormat = (eachBook) => {
            return <tr>
                <td>{eachBook.Id}</td>
                <td><input onChange={ (e) => setEditBookName(e.target.value)} className="form-container" type='text' /></td>
                <td><input onChange={ (e) => setEditBookAuthor(e.target.value)} className="form-container" type='text' /></td>
                <td><input onChange={ (e) => setEditBookPublication(e.target.value)} className="form-container" type='text' /></td>
                <td><input onChange={ (e) => setEditBookYear(e.target.value)} className="form-container" type='date' /></td>
                <td><button onClick={ () => updateBooksDatabase(eachBook.Id) } className="btn btn-dark">Save</button></td>
                <td><button className="btn btn-warning" onClick={ () => setEditBookRowID(-1)}>Cancel</button></td>
            </tr>
        }

        const displayNonEditableFormat = (eachBook) => {
            console.log('non edit')
            return <tr> 
            <td>{eachBook._id}</td>
            <td>{eachBook.name}</td>
            <td>{eachBook.author}</td>
            <td>{eachBook.publication}</td>
            <td>{eachBook.year}</td>
            <td><button className="btn btn-primary" onClick={ () => onClickEditBook(eachBook)}>Edit</button><button onClick={ () =>deleteBook(eachBook._id) } className="btn btn-dark">Delete</button></td>
        </tr>
        }

        return booksTableData.map(eachBook => eachBook.Id === editBookRowID ? displayEditFormat(eachBook) : displayNonEditableFormat(eachBook))
    }

    const onClickCancelBookForm = () => {
        setBookName('')
        setAuthor('')
        setPublication('')
        setYear('')
        setBookFormStatus('')
    }




    return <div className="d-flex flex-row justify-content-around studentComponentMainContainerDIV">
        <div>
            <form onSubmit={(e) => onSubmitStudentForm(e)} className="border border-dark border-3 rounded p-3">
                <h1>Student</h1>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor='studentName' className="form-label">Name:</label>
                    <input id='studentName' onChange={(e) => setStudentName(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Class:</label>
                    <input onChange={(e) => setStudentClass(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Photo:</label>
                    <input onChange={(e) => setStudentPhoto(e.target.files[0])} className="form-control" type='file' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Video:</label>
                    <input onChange={(e) => setStudentVideo(e.target.files[0])} className="form-control" type='file' />
                </div>
                <p>{studentFormError}</p>
                <div className="d-flex flex-direction-row justify-content-spacebetween">
                    <button type='submit' className="btn btn-dark">Save</button>
                    <button type="button" className="btn btn-warning">Cancel</button>
                </div>
            </form>
            <p>Grid</p>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Video</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { studentTableData && displayStudentTableData() }
                    </tbody>
                </table>
            </div>
        </div>
        
        <div>
            <form onSubmit={onSubmitBookForm} className="border border-dark border-3 rounded p-3">
                <h1>Book</h1>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor='bookName' className="form-label">Name:</label>
                    <input id="bookName" value={bookName} onChange={(e) => setBookName(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor="author">Author:</label>
                    <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor="publication">Publication:</label>
                    <input id="publication" value={publication} onChange={(e) => setPublication(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor="year">Year:</label>
                    <input id="year" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" type='date' />
                </div>
                <p>{bookFormStatus}</p>
                <div className="d-flex flex-direction-row justify-content-spacebetween">
                    <button type="submit" className="btn btn-dark">Save</button>
                    <button type="button" onClick={onClickCancelBookForm} className="btn btn-warning">Cancel</button>
                </div>
            </form>
            <p>Grid</p>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Publication</th>
                            <th scope="col">Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booksTableData && displayBooksTableData()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default Student