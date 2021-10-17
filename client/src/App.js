import "./App.scss";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import CreateSpecialist from "./components/forms/CreateSpecialist/CreateSpecialist.jsx";
import CreatePatient from "./components/forms/CreatePatient/CreatePatient";
import InitialPatient from "./components/initialPys/patientManagement/initial/initialPatient.jsx";
import PatientDetails from "./components/initialPys/patientManagement/initial/patietCardDetails.jsx";
import HomeRRHH from "./components/homeRH/HomeRH.jsx";
import DetailEspecialista from "./components/homeRH/DetailEspecialista.jsx";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/createSpecialist">
        <CreateSpecialist />
      </Route>
      <Route exact path="/createPatient">
        <CreatePatient />
      </Route>
      <Route exact path="/patientPys">
        <InitialPatient />
      </Route>
      <Route exact path="/patientDetails">
        <PatientDetails />
      </Route>
      <Route exact path="/homeRRHH">
        <HomeRRHH />
      </Route>
      <Route exact path="/detailEspecialista" >
        <DetailEspecialista/>
      </Route>
    </div>
  );
}

export default App;
