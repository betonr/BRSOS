import mongoose from 'mongoose'

module.exports = app => {

    const OcorrenciaSchema = mongoose.Schema({
        geometry: {
            type: {type: String, default: 'Point'},
            projection: {type: String, default: 'EPSG:4326'},
            coordinates: {type: [Number], default: [0, 0]}
        },
        photo: { 
            data: Buffer, 
            contentType: String 
        },
        date: Date,
        description: String,
        user: Number,
        category: String,
        victims: Number
    });

    return mongoose.model('ocorrencias', OcorrenciaSchema)

}