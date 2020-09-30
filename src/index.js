import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/index';
import { BrowserRouter } from 'react-router-dom';
import routes from './pages/Routes';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'normalize.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'assets//stylesGlobal/fonts.sass';
import 'assets//stylesGlobal/media_mixins.sass';
import 'assets//stylesGlobal/variables.sass';
import 'assets//stylesGlobal/styles.sass';
import 'assets/stylesGlobal/scrollbar.sass';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { sessionCheck } from './redux/actions/sessionCheck';
import { fetchUserFullName } from './redux/actions/actionUserFullName';
import { getAlbums } from './redux/actions/actionAlbums';
import { getPersons } from './redux/actions/actionPersons';
import { fetchStories } from './redux/actions/actionStories';
import { querySearch } from './redux/actions/actionSearchQuery';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// const composerEnhancer = composeWithDevTools({
//   name: `Redux`,
//   realtime: true,
//   trace: true,
//   traceLimit: 25
// });

store.dispatch(sessionCheck(store.getState().session.sessionID));
store.dispatch(fetchUserFullName());
store.dispatch(getAlbums());
store.dispatch(getPersons());
store.dispatch(fetchStories());
store.dispatch(querySearch());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <App /> */}
        { routes }
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
