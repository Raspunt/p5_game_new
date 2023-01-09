import * as dotenv from 'dotenv'
import { Server } from "socket.io";
import Socket from '../socket/index.js';

dotenv.config({ path: '.env' });

import httpApp from '../web/index.js';

var io = null;

function startServer() {
    httpApp.listen(process.env.HTTP_PORT, () => {
        io = new Server(httpApp, {
            cors: {
                origin: process.env.HOST_ORIGIN,
                methods: ["GET", "POST"]
            }
        });
        const socketMain = new Socket(io);
        socketMain.initSocket();

        console.log(`http://${process.env.HOST}:${process.env.HTTP_PORT}`);
    });

}

export { io, startServer }
