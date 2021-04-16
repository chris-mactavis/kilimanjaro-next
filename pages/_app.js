import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { NotificationContainer } from 'react-notifications';

import '../styles/sass/main.scss';
import 'react-notifications/lib/notifications.css';

import toggleLoading from '../store/reducers/loader';
import shop from '../store/reducers/shop';
import auth from '../store/reducers/auth';
import liveEvent from "../store/reducers/liveEvents";
import ComponentWrapper from "../components/hoc/ComponentsWrapper";


const reducers = combineReducers({
  loader: toggleLoading,
  shop: shop,
  auth: auth,
  liveEvent: liveEvent
});

// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));

function MyApp({ Component, pageProps }) {

  return  <Provider
              store={store}>
              <ComponentWrapper Component={Component} pageProps={pageProps} />
              <NotificationContainer/>
          </Provider>
}

export default MyApp
