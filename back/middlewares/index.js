import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'

module.exports = app => {
  
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.persistence.createConnection()

    app.use(cors({
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(helmet());

}
