import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from "redux";
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {
  login: {
    token: localStorage.getItem('token') ? localStorage.getItem('token'): null
  },
  user: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,initialState,composeEnhancer(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
