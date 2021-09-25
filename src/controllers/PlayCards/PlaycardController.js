const PC = require('../../models/PlayCards/Playcard');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

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
    },

    async findnow(req,res){
        const {sala} = req.body;
        const sql = `
            SELECT * FROM playcard
            ORDER BY data DESC
            LIMIT 1;
        `;
        retorno = await PC.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }

}