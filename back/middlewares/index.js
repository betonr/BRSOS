import bodyParser from 'body-parser'
import helmet from 'helmet'
import mongoose from 'mongoose'

module.exports = app => {
  
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.persistence.createConnection()

    app.use(helmet());

}
