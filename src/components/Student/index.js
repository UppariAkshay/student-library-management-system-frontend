import { useState, useEffect } from "react"
import ReactPlayer from 'react-player'
import './index.css'

const Student = () => {
    const [studentName, setStudentName] = useState()
    const [studentClass, setStudentClass] = useState()
    const [studentPhoto, setStudentPhoto] = useState()
    const [studentVideo, setStudentVideo] = useState()

    const [bookName, setBookName] = useState()
    const [author, setAuthor] = useState()
    const [publication, setPublication] = useState()
    const [year, setYear] = useState()

    const [studentTableData, setStudentTableData] = useState()



    useEffect(() => {

        const fetchAllStudent = async () => {
            const response = await fetch('http://localhost:5000/all-students')
            const data = await response.json()

            setStudentTableData(data)
        }
        
        fetchAllStudent()
    }, [])



    const onSubmitStudentForm = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("student_photo", studentPhoto)
        formData.append("student_video", studentVideo)
        formData.append("student_name", studentName)
        formData.append("student_class", studentClass)

        const options = {
            method: 'POST',
            body: formData
        }

        const response = await fetch('http://localhost:5000/upload', options)
        const data = await response.json()
        console.log(data)
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

        const response = await fetch('http://localhost:5000/upload-book', options)
        const data = await response.json()

        console.log(data)
    }

    const displayTableData = () => {
        return studentTableData.map(each => <tr>

                <td>{each.Name}</td>
                <td>{each.Class}</td>
                <td><img className="studentTableImageIMG" src={`http://localhost:5000/${studentTableData[0].Photo_path}`} /></td>
                <td><ReactPlayer height={100} width={150} url={`http://localhost:5000/${studentTableData[0].video_path}`} controls/></td>
            
        </tr>)
    }




    return <div className="d-flex flex-row justify-content-start">
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
                <div className="d-flex flex-direction-row justify-content-spacebetween">
                    <button type='submit' className="btn btn-dark">Save</button>
                    <button className="btn btn-warning">Cancel</button>
                </div>
            </form>
            <p>Grid</p>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Video</th>
                        </tr>
                    </thead>
                    <tbody>
                        { studentTableData && displayTableData() }
                    </tbody>
                </table>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-dark">Delete</button>
            </div>
        </div>
        <div>
            <form onSubmit={onSubmitBookForm} className="border border-dark border-3 rounded p-3">
                <h1>Book</h1>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor='bookName' className="form-label">Name:</label>
                    <input id="bookName" onChange={(e) => setBookName(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor="author">Author:</label>
                    <input id="author" onChange={(e) => setAuthor(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor="publication">Publication:</label>
                    <input id="publication" onChange={(e) => setPublication(e.target.value)} className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor="year">Year:</label>
                    <input id="year" onChange={(e) => setYear(e.target.value)} className="form-control" type='date' />
                </div>
                <div className="d-flex flex-direction-row justify-content-spacebetween">
                    <button type="submit" className="btn btn-dark">Save</button>
                    <button className="btn btn-warning">Cancel</button>
                </div>
            </form>
            <p>Grid</p>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Publication</th>
                            <th scope="col">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-dark">Delete</button>
            </div>
        </div>
    </div>
}

export default Student