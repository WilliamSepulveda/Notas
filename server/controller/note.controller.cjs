const { join } = require('path');
const Notes = require('..//model/notesModel.cjs');
const { ObjectId } = require('mongodb');

exports.getAllNotes = async (req, res) => {
    try {
        const result = new Notes(); 
        const resultado = await result.findAllCollection({}); 
        res.json(resultado);
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).json({ message: 'Error al obtener las notas' });
    }
};

exports.getNoteByID = async (req, res) => {
    try {
        let nota = new Notes();
        let { id } = req.params;
        console.log("Buscando nota con ID:", id);
        let resultado = await nota.getNoteId(id);
        return res.status(resultado.status).json(resultado);
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).json({ message: 'Error al obtener las notas' });
    }
};
