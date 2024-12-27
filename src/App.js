import './App.css';
import Student from './components/Student'
import LibraryAdmin from './components/LibraryAdmin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';


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
