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
        await this.connectDB(); // Make sure to connect to the database
        try {
            const collection = this.db.collection('notas_historial');
            const result = await collection.findOne({ id: parseInt(noteId) }); // Find by the 'id' field
    
            if (!result) {
                return {
                    status: 404,
                    message: 'Nota no encontrada', // Message when no document is found
                };
            }
    
            return {
                status: 200, // Success status
                data: result, // Return the found document
            };
        } catch (error) {
            return {
                status: 500,
                message: `Error al obtener documentos: ${error.message}`, // Handle database error
            };
        }
    }
    async getNoteTitle(noteTitle) {
        await this.connectDB(); // Asegúrate de conectarte a la base de datos
        try {
            const collection = this.db.collection('notas_historial');

            // Realiza la búsqueda de notas que contengan el título buscado (case insensitive)
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
};
