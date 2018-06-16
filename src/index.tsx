import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = Redux.createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
