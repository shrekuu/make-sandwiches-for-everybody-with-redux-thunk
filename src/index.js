import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configStore from './store'

const store = configStore()

ReactDOM.render(<App store={store} />, document.getElementById('root'));
