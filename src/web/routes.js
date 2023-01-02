import path from 'path';

export default function(app){
    app.get('/', function (_, res) {  
        res.sendFile(path.resolve('templates/index.html'));  
    });
}
