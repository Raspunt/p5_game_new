import * as dotenv from 'dotenv'
import { Server as SocketServer } from "socket.io";
import Server from '../server/index.js';

dotenv.config({ path: '.env' });

import httpApp from '../web/index.js';

var io = null;

function startServer() {
    httpApp.listen(process.env.HTTP_PORT, () => {
        io = new SocketServer(httpApp, {
            cors: {
                origin: process.env.HOST_ORIGIN,
                methods: ["GET", "POST"]
            }
        });
        const socketMain = new Server(io);
        socketMain.initSocket();

        console.log(`http://${process.env.HOST}:${process.env.HTTP_PORT}`);
    });

}

export { io, startServer }
