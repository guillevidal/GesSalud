import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/index.js";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from "redux-persist";
import iStorage from "redux-persist/lib/storage";
const persistConfig = {
    key: 'authType',
    storage: iStorage,
    whitelist: ["especialidades","pacientes","especialistas","administrativos","agendas","turnos",
    "pacienteDetallado","especialistaDetallado","administrativoDetallado","turnoDetallado",
    "busquedaEspecialista","creado","modificado","rol","paginado", "enlace_de_pago", "pagos"] // which reducer want to store
  };

const pReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
    pReducer,  
    compose( applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (args) => args, ),
    //compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk)),
);
export const persistor = persistStore(store)
export default {store, persistor};

