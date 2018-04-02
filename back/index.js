import express from 'express';
import consign from 'consign';

const app = express();

consign()
    .include('libs/DSINFO.js')
    .then('persistence/createConnection.js')
    .then('persistence')
    .then('models')
    .then('controllers')
    .then('middlewares/auth.js')
    .then('middlewares')
    .then('policies')
    .then('routes')
    .then('libs/boot.js')
    .then('libs/clusters.js') 
    .into(app);
