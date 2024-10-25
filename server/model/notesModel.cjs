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

};