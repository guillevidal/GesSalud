/* eslint-disable */
import "./App.scss";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import CreatePatient from "./components/forms/CreatePatient/CreatePatient";
import InitialPatient from "./components/initialPys/patientManagement/initial/initialPatient.jsx";
import PatientDetails from "./components/initialPys/patientManagement/initial/patietCardDetails.jsx";
import HomeRRHH from "./components/homeRH/HomeRH.jsx";
import DetailEspecialista from "./components/homeRH/DetailEspecialista";
import PatientEdit from "./components/initialPys/patientManagement/PatientEdit/PatientEdit.jsx";
import SpecialtyEdit from "./components/homeRH/EditSpecialty/EditSpecialty.jsx";
import HomeSpecialist from "./components/specialist/HomeSpecialist.jsx";
import ProfileSpecialist from "./components/specialist/ProfileSpecialist.jsx";
import CreateEmployee from "./components/forms/CreateEmployee/CreateEmployee.jsx";
import DetailAdmin from "./components/homeRH/DetailsAdmin.jsx";
import EditAdmin from "./components/homeRH/EditAdmin/EditAdmin.jsx";
import InitialSpecialty from "./components/initialPys/SpecialtyManagement/Initial/InitialSpecialty.jsx";
import CreateAgenda from "./components/initialPys/SpecialtyManagement/CreateAgenda/CreateAgenda.jsx";
import EditAgenda from "./components/initialPys/SpecialtyManagement/EditAgenda/EditAgenda.jsx";
import LandingAdmin from "./components/admin/LandingAdmin";
import TurnoPys from "./components/initialPys/TurnoManagement/InicialTurno.jsx";
import PatientHistory from "./components/initialPys/patientManagement/patientClinicalData/PatientHistory.jsx";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import RegistroPatient from "./components/Landing/RegistroPatient.jsx";


 function App() {

  const rol = useSelector(state => state.rol)



  return (
    <div className="App">
      {rol === "" && <Redirect to="/" />}

      {rol === "5" && <Redirect to="/LandingAdmin" />}

      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/createPatient">
        {(rol === "1" || rol === "6") && <CreatePatient />}
      </Route>
      <Route exact path="/patientPys">
        {(rol === "1" || rol === "6") && <InitialPatient />}
      </Route>
      <Route exact path="/patientDetails">
        {(rol === "1" || rol === "6") && <PatientDetails />}
      </Route>
      <Route exact path="/patientEdit">
        {(rol === "1" || rol === "6") && <PatientEdit />}
      </Route>
      <Route exact path="/turnoPys">
        {(rol === "1" || rol === "6") && <TurnoPys />}
      </Route>
      <Route exact path="/especialistaPys">
        {(rol === "1" || rol === "6") && <InitialSpecialty />}
      </Route>
      <Route exact path="/createAgenda">
        {(rol === "1" || rol === "6") && <CreateAgenda />}
      </Route>
      <Route exact path="/especialistaPys/agenda/:id">
        {(rol === "1" || rol === "6") && <EditAgenda />}
      </Route>

      <Route exact path="/AdminEdit">
        {(rol === "2" || rol === "7") && <EditAdmin />}
      </Route>
      <Route exact path="/detailAdmin">
        {(rol === "2" || rol === "7") && <DetailAdmin />}
      </Route>
      <Route exact path="/homeRRHH">
        {(rol === "2" || rol === "7") && <HomeRRHH />}
      </Route>
      <Route exact path="/specialtyEdit">
        {(rol === "2" || rol === "7") && <SpecialtyEdit />}
      </Route>
      <Route exact path="/detailEspecialista">
        {(rol === "2" || rol === "7") && <DetailEspecialista />}
      </Route>
      <Route exact path="/createEmployee">
        {(rol === "2" || rol === "7") && <CreateEmployee />}
      </Route>

      <Route exact path="/homeUser">
        {(rol === "3" || rol === "4") && <HomeSpecialist />}
      </Route>
      <Route exact path="/perfilUser">
        {(rol === "3" || rol === "4") && <ProfileSpecialist />}
      </Route>
      <Route exact path="/homeUser/patientHistory/:dni">
        {(rol === "3" || rol === "4") && <PatientHistory />}
      </Route>

      <Route exact path="/LandingAdmin">
        {(rol === "5" || rol === "6" || rol === "7") && <LandingAdmin />}
      </Route>
      <Route exact path="/registrar">
        <RegistroPatient/>
      </Route>
      </div>

  );
}

export default App;
