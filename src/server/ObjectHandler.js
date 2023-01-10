import Server from "./index.js";

class ObjectHandler {

    /** 
     * Socket Handle
     * @type { Server }
     */
    server = null

    objectList = {
        players: []
    }

    constructor(server) {
        this.server = server
    }
}

export default ObjectHandler;