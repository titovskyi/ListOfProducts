import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes';
import * as path from "path";

createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use(express.static('./public'));

    // Set all routes from routes folder
    app.use('/', routes);

    app.all('/*', (req, res, next) => {
      const indexPath = path.join(__dirname, '../');
      res.sendFile('index.html', { root: indexPath + '/public/' });
    });


    app.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  })
  .catch(error => console.log(error));
