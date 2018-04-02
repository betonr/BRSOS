import http from "http"

import logger from '../libs/logger'

module.exports = app => {

  const boot = function() {}

  boot.prototype.start = function(){
    http.createServer(app)
      .listen(app.libs.DSINFO.port, () => {
          logger.info(`API BRSOS running successfully - port ${app.libs.DSINFO.port}`);
      });

    app.use(function(err, req, res, next){
      res.status(400).json(err);
    });
  }  

  return boot;
}  

/*
import https from "https";
import fs from "fs";

module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    const credentials = {
      key: fs.readFileSync("private.key", "utf8"),
      cert: fs.readFileSync("certificate.pem", "utf8")
    }
    https.createServer(credentials, app)
        .listen(app.libs.DSINFO.port, () => {
            console.log(`EditData Pauliceia API running with success - port ${app.libs.DSINFO.port}`);
        });
  }

  // error handler, required as of 0.3.0 
  app.use(function(err, req, res, next){
    res.status(400).json(err);
  });
}*/