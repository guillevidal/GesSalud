import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/index.js";
import thunk from "redux-thunk";

const store = createStore(
    reducer,  
    compose( applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (args) => args, ),
    //compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk)),
);

export default store;