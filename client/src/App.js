import "./App.scss";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import CreatePatient from "./components/forms/CreatePatient/CreatePatient";
import InitialPatient from "./components/initialPys/patientManagement/initial/initialPatient.jsx";
import PatientDetails from "./components/initialPys/patientManagement/initial/patietCardDetails.jsx";
import HomeRRHH from "./components/homeRH/HomeRH.jsx";
import DetailEspecialista from "./components/homeRH/DetailEspecialista";
import PatientEdit from "./components/initialPys/patientManagement/PatientEdit/PatientEdit.jsx";
import SpecialtyEdit from "./components/homeRH/EditSpecialty/EditSpecialty.jsx"
import HomeSpecialist from "./components/specialist/HomeSpecialist.jsx";
import ProfileSpecialist from "./components/specialist/ProfileSpecialist.jsx"
import CreateEmployee from "./components/forms/CreateEmployee/CreateEmployee.jsx"

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
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
      <Route exact path="/patientEdit">
        <PatientEdit />
      </Route>
      <Route exact path="/specialtyEdit">
        <SpecialtyEdit />
      </Route>
      <Route exact path="/detailEspecialista" >     
        <DetailEspecialista />
      </Route>
      <Route exact path="/homeEspecialista">
        <HomeSpecialist /> 
      </Route>
      <Route exact path="/perfilEspecialista">
        <ProfileSpecialist /> 
      </Route>
      <Route exact path="/createEmployee">
       <CreateEmployee />
      </Route>
    </div>
  );
}

export default App;
