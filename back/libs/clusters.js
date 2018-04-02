import cluster from "cluster"
import os from "os"

import logger from '../libs/logger'

module.exports = app => {

  if (process.env.NODE_ENV == 'production') {
    
    const CPUS = os.cpus()
    if (cluster.isMaster) {

      CPUS.forEach( () => cluster.fork() )

      cluster.on("listening", worker => {
        logger.info(`Cluster pid - ${worker.process.pid} connected`);
      });
      cluster.on("disconnect", worker => {
        logger.error(`Cluster pid - ${worker.process.pid} disconnected`);
      });
      cluster.on("exit", function(worker)  {
        logger.error(`Cluster pid - ${worker.process.pid} is dead`);
        cluster.fork();
      });

    } else {
      //slave 
      const application = new app.libs.boot
      application.start()
    }  

  } else {
    const application = new app.libs.boot
    application.start()
  }

}