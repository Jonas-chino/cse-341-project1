const  mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db('project').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};




const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contacId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('project').collection('contacts').find( {_id:contacId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};



const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('project').collection('contacts').insertOne(contact);
    
    if (response.acknowledged) {
        res.status(201).json(response); // 201 significa "Creado"
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al crear el contacto.');
    }
};

// Actualizar un contacto existente (PUT)
const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contacId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    
    const response = await mongodb.getDatabase().db('project').collection('contacts').replaceOne({ _id: contacId }, contact);
    
    if (response.modifiedCount > 0) {
        res.status(204).send(); // 204 significa "Sin contenido" (éxito sin devolver datos)
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al actualizar el contacto.');
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contacId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project').collection('contacts').deleteOne({ _id: contacId });
    
    if (response.deletedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(response.error || 'Ocurrió un error al eliminar el contacto.');
    }
};

module.exports = { 
    getAll, 
    getSingle, 
    createContact, 
    updateContact, 
    deleteContact 
};


