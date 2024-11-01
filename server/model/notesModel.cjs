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

    async createNote(data) {
        await this.connectDB();
        try {
            const collection = this.db.collection('notas_historial');
            const result = await collection.insertOne(data);

            return {
                status: 201,
                data: result.ops[0], // Devuelve la nueva nota creada
            };
        } catch (error) {
            return {
                status: 500,
                message: `Error al crear la nota: ${error.message}`,
            };
        }
    }
    async updateNote(noteId, data, userId) {
        await this.connectDB();
        try {

            const collection = this.db.collection('notas_historial');

            const note = await collection.findOne({ _id: new ObjectId(noteId) });
            if (!note) {
                return { status: 404, message: 'Nota no encontrada' };
            }

            // Agregar el contenido actual al historial antes de actualizar
            await this.db.collection('notas_historial').insertOne({
                note_id: noteId,
                content: note.content,
                timestamp: new Date(),
                updatedBy: userId,
            });

            // Actualizar la nota
            const result = await collection.updateOne(
                { _id: new ObjectId(noteId) },
                { $set: { ...data, updatedAt: new Date() } }
            );

            return { status: 200, data: result };
        } catch (error) {
            return {
                status: 500,
                message: `Error al actualizar la nota: ${error.message}`,
            };
        }
    }

    // Método para eliminar una nota
    async deleteNote(noteId) {
        await this.connectDB();
        try {
            const collection = this.db.collection('notas_historial');
            const result = await collection.deleteOne({ _id: new ObjectId(noteId) });

            if (result.deletedCount === 0) {
                return { status: 404, message: 'Nota no encontrada' };
            }

            return { status: 200, message: 'Nota eliminada' };
        } catch (error) {
            return {
                status: 500,
                message: `Error al eliminar la nota: ${error.message}`,
            };
        }
    }
};
