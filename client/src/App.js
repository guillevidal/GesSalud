import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CreateSpecialist from './components/Forms/CreateSpecialist/CreateSpecialist'

function App() {
  return (
    <div className="App">

      <Route exact path='/'>
        <Landing />
      </Route>
      <Route exact path='/createSpecialist'>
     
        <CreateSpecialist />
      </Route>

    </div>
  );
}

export default App;
