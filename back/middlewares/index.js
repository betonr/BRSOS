import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'

import logger from '../libs/logger'

module.exports = app => {

    app.use(morgan("common", {
      skip: (req, res) => res.statusCode >= 400,
      stream: {
        write: (msg) => {
          logger.info(msg)
        }
      }
    }))

    app.use(morgan("common", {
      skip: (req, res) => res.statusCode < 400,
      stream: {
        write: (msg) => {
          logger.error(msg)
        }
      }
    }))
  
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.persistence.createConnection()

    app.use(cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(helmet());

}
