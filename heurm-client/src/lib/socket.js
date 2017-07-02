export default (function() {
    let store = null;
    let socket = null;
    let listen = false;


    const messageHandler = (message) => {
        const data = JSON.parse(message.data);
        if(!listen) return;
        store.dispatch(data);
    }
    
    return {
        connect: (uri) => {
            socket = new WebSocket(uri);
            socket.onmessage = messageHandler;
            socket.onopen = (event) => {
                console.log('connected to ' + uri);
            }
        },
        initialize: (s) => {
            store = s;
        },
        listen: () => {
            listen = true;
        },
        unlisten: () => {
            listen = false;
        }
    }
})();
