import winston from 'winston'
import fs from 'fs'

if(!fs.existsSync('logs')){
    fs.mkdirSync('logs')
}

const logger = new winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ 
            filename: 'logs/access.log', level: 'info', maxsize: 100000, maxFiles: 4
        }),
        new winston.transports.File({ 
            filename: 'logs/error.log', level: 'error', maxsize: 100000, maxFiles: 6
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;