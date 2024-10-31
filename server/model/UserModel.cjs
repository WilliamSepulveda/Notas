const { ObjectId } = require('mongodb');
const connectMongo = require('../config/connect.cjs');

module.exports = class User {
    constructor() {
        this.db = null;
    }

    async connectDB() {
        if (!this.db) {
            const connectMongoInstance = new connectMongo();
            this.db = await connectMongoInstance.connectOpen();
        }
    }

    async insertCollection(data) {
        await this.connectDB();
        try {
            const collection = this.db.collection('usuarios');
            const result = await collection.insertOne(data);
            if (!result.acknowledged) throw new Error('Failed to insert document');
            
            // Devolver el ID del documento insertado en lugar del array ops
            return { status: 200, message: 'Usuario insertado exitosamente', data: result.insertedId }; 
        } catch (error) {
            console.error('Error al insertar el usuario:', error); // Registrar el objeto de error completo
            throw new Error(JSON.stringify({ status: 500, message: 'Error al insertar el usuario', error: error.message }));
        }
    }
    

    async findOneUserByEmail(email) {
        await this.connectDB();
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const collection = this.db.collection('usuarios');
            const user = await collection.findOne({ email });
            if (!user) return { status: 404, message: 'Email no registrado' };
            return { status: 200, message: 'Usuario encontrado', data: user };
        } catch (error) {
            throw new Error(JSON.stringify({ 
                status: 500, 
                message: 'Error al recuperar el usuario por correo', 
                error: error.message 
            }));
        }
    }

    async findExistUserName(userName) {
        await this.connectDB();
        try {
            if (!userName) {
                throw new Error('Username is required');
            }

            const collection = this.db.collection('usuarios');
            const user = await collection.findOne({ userName }); // Cambiado a userName
            if (!user) return { status: 404, message: 'Nombre de usuario no registrado' };
            return { status: 200, message: 'Nombre de usuario encontrado', data: user };
        } catch (error) {
            throw new Error(JSON.stringify({ 
                status: 500, 
                message: 'Error al encontrar el nombre de usuario', 
                error: error.message 
            }));
        }
    }

    async findExistEmail(email) {
        await this.connectDB();
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const collection = this.db.collection('usuarios');
            const user = await collection.findOne({ email });
            if (!user) return { status: 404, message: 'Email no registrado' };
            return { status: 200, message: 'Email encontrado', data: user };
        } catch (error) {
            throw new Error(JSON.stringify({ 
                status: 500, 
                message: 'Error al encontrar el email', 
                error: error.message 
            }));
        }
    }
};
