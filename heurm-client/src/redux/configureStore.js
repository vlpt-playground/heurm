import { createStore } from 'redux';

import modules from './modules';

// Todo: 미들웨어 적용
const configureStore = (initialState) => {
    const store = createStore(modules, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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