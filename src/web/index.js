import express from 'express'
import routes from './routes.js';


import {createServer} from 'http';
import path from "path"


const expressApp = express(); 
routes(expressApp)
const httpApp = createServer(expressApp); 

expressApp.use(express.static(path.resolve('public')))





export default httpApp;