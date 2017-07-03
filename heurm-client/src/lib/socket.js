export default (function socketHelper() {
    let _store = null;
    let _socket = null;
    let _listen = false;
    let _uri = null;

    const messageHandler = (message) => {
        const data = JSON.parse(message.data);
        if(!_listen) return;
        _store.dispatch(data);
    }

    const disconnectHandler = () => {
        console.log('reconnecting...');
        setTimeout(() => {
            connect(_uri);
        }, 3000);
    }

    function connect(uri) {
        _uri = uri;
        _socket = new WebSocket(uri);
        _socket.onmessage = messageHandler;
        _socket.onopen = (event) => {
            console.log('connected to ' + uri);
        }
        _socket.onclose = disconnectHandler;
    }
    
    return {
        connect: (uri) => {
            connect(uri);
        },
        initialize: (store) => {
            _store = store;
        },
        listen: () => {
            _listen = true;
        },
        unlisten: () => {
            _listen = false;
        }
    }
})();