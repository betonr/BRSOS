module.exports = app => {

    app.get("/brsos/api/", (req, res) => {
        res.status(200).json({ status: "API BRSOS - FUNCIONANDO CORRETAMENTE" });
    });

}