import cors from 'cors'

module.exports = app => {  

    app.use(cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

}
