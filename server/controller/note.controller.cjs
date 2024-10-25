const { join } = require('path');
const Notes = require('..//model/notesModel.cjs');

exports.getAllNotes = async (req, res) => {
    try {
        const result = new Notes(); 
        const resultado = await result.findAllCollection({}); 
        res.json(resultado);
    } catch (error) {
        console.error('Error al obtener los asientos:', error);
        res.status(500).json({ message: 'Error al obtener los asientos' });
    }
};
