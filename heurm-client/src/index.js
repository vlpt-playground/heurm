import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import configureStore from 'redux/configureStore';
import { AppContainer } from 'react-hot-loader';
import socket from 'lib/socket';

const store = configureStore();

// 개발환경에선 localhost:4000 에 연결하고, 프로덕션에선 현재 호스트에 알맞는 프로토콜로 접속합니다
const socketURI = process.env.NODE_ENV === 'production' 
                    ? ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws"
                    : 'ws://localhost:4000/ws';

socket.initialize(store, socketURI);


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