import "reflect-metadata";
import {createConnection} from "typeorm";
import app from './app';

import "./routes"

createConnection({
    type: "sqlite",
    database: "test",
    entities: [
        __dirname + "/entity/*.js"
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    app.listen(3000, () => console.log('Example app listening on port 3000!'));
}).catch(error => console.log(error));