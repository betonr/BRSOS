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

}
