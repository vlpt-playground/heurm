import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const isDevelopment = process.env.NODE_ENV === 'development'; // 환경이 개발모드인지 확인합니다
const composeEnhancers = isDevelopment ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const configureStore = (initialState) => {
    const store = createStore(modules, initialState, composeEnhancers(
        applyMiddleware(penderMiddleware())
    ));

    // hot-reloading 를 위한 코드
    if(module.hot) {
        module.hot.accept('./modules', () => {
            const nextRootReducer = require('./modules').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export default configureStore;