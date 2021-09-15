const PCCtrlStat = require('../../models/PlayCards/PlaycardCtrlStat');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async create(req,res){
        const {idf} = req.body;
        var rodada = 0;
        const data = new Date();
        await PCCtrlStat.findOne({
            attributes: ['rodada'],
            where: idf,
            order: [[ 'rodada', 'DESC' ]]
        }).then((data)=>{
            rodada = data.rodada;
        }).catch(function(err){
            rodada = 0;
        }).finally(()=>{
            rodada++;
            PCCtrlStat.create({idf, rodada, data})
            .catch(function(err){
                return errDB(res,err);
            });
        });
        return res.json(rodada);
    },

    async update(req,res){
        const {idf, rodada, dupla, tipo, valor} = req.body;
        const campo = tipo + dupla;
        //console.log(req.body,campo);
        const sql = `
            UPDATE playcardctrlstat
            SET ${campo} = ${campo} + ${valor}
            WHERE idf = ${idf} AND rodada = ${rodada}; 
        `;
        //console.log(sql);
        PCCtrlStat.sequelize.query(sql, {
            type: sequelize.QueryTypes.UPDATE
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json("ok");
    }
    

    /*,

    async vitorias(req,res){
        const {avatar} = req.body;
        const retorno = await PC.count({
            where:{ 
                    [Op.and]:[
                        {avatar:avatar},
                        sequelize.literal("placarnos > placareles")
                    ]
                }
            }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    },
    async derrotas(req,res){
        const {avatar} = req.body;
        const retorno = await PC.count({
            where:{ 
                    [Op.and]:[
                        {avatar:avatar},
                        sequelize.literal("placarnos < placareles")
                    ]
                }
            }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
    */
}