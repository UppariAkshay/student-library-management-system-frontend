
const LibraryAdmin = () => {
    return <div>
        <h1>Library</h1>
            <div>
                <form className="border border-3 border-dark rounded p-3">
                    <div className="d-flex flex-direction-row">
                        <label>Student Name:</label>
                        <select className="form-control">
                            <option>option 1</option>
                            <option>option 2</option>
                            <option>option 3</option>
                        </select>
                    </div>
                    <div className="d-flex flex-direction-row">
                        <label>Boook Name:</label>
                        <select className="form-control">
                            <option>option 1</option>
                            <option>option 2</option>
                            <option>option 3</option>
                        </select>
                    </div>
                    <div className="d-flex flex-direction-row">
                        <label>Start Date: </label>
                        <input className="form-control" type="date" />
                    </div>
                    <div className="d-flex flex-direction-row">
                        <label>End Date: </label>
                        <input  className="form-control"type="date" />
                    </div>
                    
                    <div className="d-flex flex-direction-row">
                        <button className='btn btn-primary'>Save</button>
                        <button className="btn btn-dark">Cancel</button>
                    </div>
                </form>
                <div>
                    <h1>Grid</h1>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
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
                    <div className="d-flex flex-direction-row">
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-dark">Delete</button>
                    </div>
                </div>
            </div>
    </div>
}

export default LibraryAdmin