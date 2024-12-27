import { Redirect, useHistory } from "react-router-dom"

const Home = () => {
    const history = useHistory()
    
    return (
        <>
        <button onClick={() => history.push('/student-mode')}>Student Mode</button>
        <button onClick={() => history.push('/library-mode')}>Library Mode</button>
        </>
    )
}

export default Home