const { ObjectId } = require('mongodb');
const connectMongo = require('../config/connect.cjs');

module.exports = class Asiento {
    constructor() {
        this.db = null;
    }

    async connectDB() {
        if (!this.db) {
            const connectMongoInstance = new connectMongo();
            this.db = await connectMongoInstance.connectOpen();
        }
    }

    async findAllCollection(query) {
        await this.connectDB();
        try {
            const collection = this.db.collection('notas_historial');
            const result = await collection.find(query).toArray();
            if (!result.length) throw new Error('No documents found');
            return result;
        } catch (error) {
            throw new Error(`Error fetching documents: ${error.message}`);
        }
    }

    async getNoteId(noteId) {
        await this.connectDB();
        try {
            const collection = this.db.collection('notas_historial');
            const result = await collection.findOne({ id: parseInt(noteId) });

            if (!result) {
                return {
                    status: 404,
                    message: 'Nota no encontrada',
                };
            }

            return {
                status: 200,
                data: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: `Error al obtener documentos: ${error.message}`,
            };
        }
    }

    async getNoteTitle(noteTitle) {
        await this.connectDB();
        try {
            const collection = this.db.collection('notas_historial');
            const result = await collection.findOne({ title: { $regex: noteTitle, $options: 'i' } });

            if (!result) {
                return {
                    status: 404,
                    message: 'Nota no encontrada',
                };
            }

            return {
                status: 200,
                data: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: `Error al obtener documentos: ${error.message}`,
            };
        }
    }

    async getHistoryNotes(noteId) {
        await this.connectDB();
        try {
            const collection = this.db.collection('notas_historial');
    
            // Busca todos los documentos relacionados con el noteId para obtener el historial
            const result = await collection.find({ note_id: noteId }).sort({ timestamp: 1 }).toArray(); // Ordena por fecha
    
            if (!result.length) {
                return {
                    status: 404,
                    message: 'Historial de la nota no encontrado',
                };
            }
    
            return {
                status: 200,
                data: result, // Devuelve todos los cambios asociados al noteId
            };
        } catch (error) {
            return {
                status: 500,
                message: `Error al obtener el historial de la nota: ${error.message}`,
            };
        }
    }    

};
