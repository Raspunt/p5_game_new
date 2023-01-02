import * as dotenv from 'dotenv'
import { Server } from "socket.io";
import initSocket from '../socket/index.js';

dotenv.config();

import httpApp from '../web/index.js';

var io = null;

function startServer() {
    httpApp.listen(process.env.HTTP_PORT,  () => {
        io = new Server(httpApp);
        initSocket(io);

        console.log(`http://${process.env.HOST}:${process.env.HTTP_PORT}`);  
    }); 
    
}

export {io,startServer}
