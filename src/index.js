import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore , combineReducers , applyMiddleware , compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth/index';
import roomReducer from './store/reducers/room/index';
import waitingReducer from './store/reducers/room/waiting/index';
import usersReducer from './store/reducers/user/index';
import messageReducer from './store/reducers/room/message/index';

import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
  auth : authReducer,
  room : roomReducer,
  waiting : waitingReducer,
  users : usersReducer,
  message : messageReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( rootReducer , composeEnhancers( applyMiddleware(thunk) ) );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
