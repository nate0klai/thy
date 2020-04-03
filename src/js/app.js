import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/index.scss';
import {onReady, onLoad} from "./utils";

import App from 'containers/App.jsx';

onReady(() => {
  ReactDOM.render(<App/>, document.getElementById('root'));
});

onLoad(() => {

});