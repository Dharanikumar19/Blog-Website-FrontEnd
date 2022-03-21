import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { Provider } from "react-redux"
import store from "./redux/store"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
