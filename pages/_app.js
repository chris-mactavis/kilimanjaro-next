import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import '../styles/main.css';
// import city from '../store/reducers/city';
import toggleLoading from '../store/reducers/loader';
// import 'react-notifications/lib/notifications.css';

const reducers = combineReducers({
  loader: toggleLoading
});

const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));

function MyApp({ Component, pageProps }) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
