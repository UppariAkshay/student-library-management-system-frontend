

const Student = () => {
    return <div className="d-flex flex-row justify-content-start">
        <div>
            <form className="border border-dark border-3 rounded p-3">
                <h1>Student</h1>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor='studentName' className="form-label">Name:</label>
                    <input id='studentName' className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Class:</label>
                    <input className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Photo:</label>
                    <input className="form-control" type='file' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Video:</label>
                    <input className="form-control" type='file' />
                </div>
                <div className="d-flex flex-direction-row justify-content-spacebetween">
                    <button className="btn btn-dark">Save</button>
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
        <div>
            <form className="border border-dark border-3 rounded p-3">
                <h1>Book</h1>
                <div className="d-flex  flex-direction-row">
                    <label htmlFor='studentName' className="form-label">Name:</label>
                    <input id='studentName' className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Author:</label>
                    <input className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Publication:</label>
                    <input className="form-control" type='text' />
                </div>
                <div className="d-flex  flex-direction-row">
                    <label>Year:</label>
                    <input className="form-control" type='date' />
                </div>
                <div className="d-flex flex-direction-row justify-content-spacebetween">
                    <button className="btn btn-dark">Save</button>
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