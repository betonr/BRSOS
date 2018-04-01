import mongoose from 'mongoose';
import url from 'url';

import logger from '../libs/logger'

module.exports = app => {

    mongoose.Promise = global.Promise;

    return () => {
        let cn;

        if(process.env.NODE_ENV && process.env.NODE_ENV=="production"){
            cn = process.env.DB_URL ? process.env.DB_URL : 
                `mongodb://${app.libs.DSINFO.db.user}:${app.libs.DSINFO.db.password}@${app.libs.DSINFO.db.options.host}:${app.libs.DSINFO.db.options.port}/${app.libs.DSINFO.db.database}`
        } else{
            cn = process.env.DB_URL ? process.env.DB_URL : 
                `mongodb://localhost:27017/${app.libs.DSINFO.db.database}`
        }

        mongoose.connect(cn).then(
            () => { logger.info('connection established') },
            ( err ) => { logger.error('Could not connect to the database: ' + err) }
        );

    }

}