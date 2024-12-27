import { Redirect, useHistory } from "react-router-dom"

const Home = () => {
    const history = useHistory()
    
    return (
        <div>
            <button className="btn btn-primary" onClick={() => history.push('/student-mode')}>Student Mode</button>
            <button className="btn btn-success" onClick={() => history.push('/library-mode')}>Library Mode</button>
        </div>
    )
}

export default Home