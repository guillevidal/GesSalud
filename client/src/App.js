import './App.scss';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CreateSpecialist from './components/forms/CreateSpecialist/CreateSpecialist.jsx';
import CreatePatient from './components/forms/CreatePatient/CreatePatient';
import InitialPys from "./components/initialPys/initial.jsx";
import InitialPatient from "./components/initialPys/patientManagement/initial/initialPatient.jsx";

function App() {
  return (
    <div className="App">

      <Route exact path='/'>
        <Landing />
      </Route>
      <Route exact path='/createSpecialist'>
        <CreateSpecialist />
      </Route>
      <Route exact path='/createPatient'>
        <CreatePatient />
      </Route>
      <Route exact path="/initialPys">
        <InitialPys/>
      </Route>
      <Route exact path="/patientPys">
        <InitialPatient/>
      </Route>
    </div>
  );
}

export default App;
