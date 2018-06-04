import * as mongoose from 'mongoose'

export interface Ocorrencia extends mongoose.Document {
    geometry: {
        type: string,
        projection: string,
        coordinates: number[]
    },
    photo: Buffer,
    user: string,
    date: Date,
    description: string,
    category: number,
    victims: number
} 

const OcorrenciaSchema = new mongoose.Schema({
    geometry: {
        type: { type: String, default: 'Point' },
        projection: { type: String, default: 'EPSG:4326' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    photo: { 
        data: Buffer, 
        contentType: String 
    },
    user: {
        type: String,
        required: true
    },
    date: Date,
    description: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    victims: {
        type: Number,
        match: /[1-1000]/
    }
})

const saveMiddleware = function (next){
    const ocorrencia: Ocorrencia = this
    ocorrencia.date = new Date()
    next()
}

OcorrenciaSchema.pre('save', saveMiddleware)

export default mongoose.model<Ocorrencia>('ocorrencias', OcorrenciaSchema)
