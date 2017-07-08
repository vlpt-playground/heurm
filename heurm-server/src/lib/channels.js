module.exports = (function() {
    const channels = {};

    function channel(name) {
        const sockets = {};
        
        return {
            enter: (socket) => {
                sockets[socket.id] = socket;
            },
            leave: (socket) => {
                delete sockets[socket.id];
            },
            get length() {
                return Object.keys(sockets).length;
            },
            broadcast: (data) => {
                for(let key in sockets) {
                    const socket = sockets[key];
                    socket.send(JSON.stringify(data));
                }
            },
            destroy: () => {
                delete channels[name];
            }
        };
    }

    return {
        create: (name) => {
            const c = channel(name);
            channels[name] = c;
            return c;
        },
        remove: (name) => {
            delete channels[name];
        }
    };
})();