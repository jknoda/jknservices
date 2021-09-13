const PC = require('../../models/General/Playcard');
const errDB = require('../../common/_sendErrorsDB');

module.exports = {
    async update(req,res){
        const {sala,dados,jogador} = req.body;
        const data = new Date();

        //console.log(JSON.stringify(req.body));

        await PC.create({ sala, data, dados, jogador })
        .catch(function(err){
            PC.update({ data, dados, jogador },{where : { sala }}
            ).catch(function(err){
                return errDB(res,err);
            });
        });
        return res.status(200).send("Ok");
    },

    async find(req,res){
        const {sala} = req.body;
        const retorno = await PC.findOne({
            where : {sala}
        })
        .catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
}