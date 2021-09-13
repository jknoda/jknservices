const Empresa = require('../../models/Empresa/Empresa');

module.exports = {
    async findAll(req,res){
        const retorno = await Empresa.findAll();
        return res.json(retorno);
    }
}