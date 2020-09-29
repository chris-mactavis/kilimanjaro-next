import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import '../styles/main.css';
// import city from '../store/reducers/city';
import toggleLoading from '../store/reducers/loader';
import shop from '../store/reducers/shop'

const reducers = combineReducers({
  loader: toggleLoading,
  shop: shop
});

// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));

function MyApp({ Component, pageProps }) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
