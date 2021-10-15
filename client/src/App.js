import './App.scss';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';

import CreateSpecialist from './components/Forms/CreateSpecialist/CreateSpecialist.jsx'


import InitialPys from "./components/initialPys/initial.jsx";

function App() {
  return (
    <div className="App">

      <Route exact path='/'>
        <Landing />
      </Route>
      <Route exact path='/createSpecialist'>
     
        <CreateSpecialist />
      </Route>
      <Route exact path="/initialPys">
        <InitialPys/>
      </Route>
    </div>
  );
}

export default App;
