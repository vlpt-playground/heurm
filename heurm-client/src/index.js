import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import configureStore from 'redux/configureStore';
import { AppContainer } from 'react-hot-loader';
import 'react-toastify/dist/ReactToastify.min.css' 
import socket from 'lib/socket';

const store = configureStore();

socket.initialize(store);
socket.connect('ws://localhost:4000/ws');

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store}/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Root);

if(module.hot) {
    module.hot.accept('./Root', () => render(Root));
}

registerServiceWorker();