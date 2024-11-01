// controller/note.controller.cjs
const Notes = require('../model/notesModel.cjs'); 

exports.getAllNotes = async (req, res) => {
    try {
        const notesModel = new Notes(); 
        const resultado = await notesModel.findAllCollection({}); 
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
        
        if (!resultado) { // Asegúrate de manejar el caso cuando no se encuentra la nota
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        return res.status(200).json(resultado); // Devuelve 200 en lugar de resultado.status
    } catch (error) {
        console.error('Error al obtener la nota:', error);
        res.status(500).json({ message: 'Error al obtener la nota' });
    }
};

exports.getNoteByTitle = async (req, res) => {
    try {
        let nota = new Notes();
        let { title } = req.query; // Cambiar a req.query para que funcione con los parámetros de búsqueda
        console.log("Buscando nota por título...", title);
        
        let resultado = await nota.getNoteTitle(title); // Llamada al método que busca por título
        
        if (!resultado) { // Asegúrate de manejar el caso cuando no se encuentra la nota
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        return res.status(200).json(resultado); // Devuelve 200 en lugar de resultado.status
    } catch (error) {
        console.error('Error al obtener la nota:', error);
        res.status(500).json({ message: 'Error al obtener la nota' });
    }
};


exports.getNoteByHistory = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id de la nota desde los parámetros de la ruta
        const asiento = new Notes();

        // Verificar si el usuario tiene rol de administrador
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Acceso denegado: solo administradores" });
        }

        // Obtener el historial de la nota
        const historyResult = await asiento.getHistoryNotes(id); // Asegúrate de implementar este método en tu modelo

        if (historyResult.status !== 200) {
            return res.status(historyResult.status).json({ message: historyResult.message });
        }

        // Devolver el historial de cambios
        return res.status(200).json(historyResult.data);
    } catch (error) {
        return res.status(500).json({ message: `Error al obtener el historial de la nota: ${error.message}` });
    }
}

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;

        const asiento = new Notes();
        const result = await asiento.createNote({ title, content, userId, createdAt: new Date(), updatedAt: new Date() });

        if (result.status !== 201) {
            return res.status(result.status).json({ message: result.message });
        }

        return res.status(201).json(result.data);
    } catch (error) {
        return res.status(500).json({ message: `Error al crear la nota: ${error.message}` });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params; // Aquí obtienes el ID entero desde los parámetros
        const { title, content } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID de nota no proporcionado" });
        }

        const Nota = new Notes();
        const result = await Nota.updateNote(parseInt(id), { title, content }, req.user.id); // Convertimos el ID a entero

        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        return res.status(200).json(result.data);
    } catch (error) {
        return res.status(500).json({ message: `Error al actualizar la nota: ${error.message}` });
    }
};


exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const asiento = new Notes();
        const result = await asiento.deleteNote(id);

        if (result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        return res.status(200).json({ message: result.message });
    } catch (error) {
        return res.status(500).json({ message: `Error al eliminar la nota: ${error.message}` });
    }
};