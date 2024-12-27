import './App.css';
import Student from './components/Student'
import LibraryAdmin from './components/LibraryAdmin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/student-mode' component={Student} />
          <Route exact path='/library-mode' component={LibraryAdmin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
