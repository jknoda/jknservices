const PCCtrlStat = require('../../models/PlayCards/PlaycardCtrlStat');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async create(req,res){
        const {idf, rodada} = req.body;
        const data = new Date();
        const ptoa = ptob = asa = asb = ala = alb = csa = csb = cla = clb = rla = rlb = rsa = rsb = vula = vulb = vulptoa = vulptob = mortoa = mortob = batidaa = batidab = recall = 0;
        //console.log("nova rodada");
        await PCCtrlStat.create({idf, rodada, ptoa, ptob, asa, asb, ala, alb, csa, csb, cla, clb, rla, rlb, rsa, rsb, vula, vulb, vulptoa, vulptob, mortoa, mortob, batidaa, batidab, recall, data})
        .catch(function(err){
            return errDB(res,err);
        });
        return res.json("Ok");
    },

    async update(req,res){
        const {idf, rodada, dupla, tipo, valor} = req.body;
        const campo = "`" + tipo + dupla + "`";
        //console.log(req.body,campo);
        const sql = `
            UPDATE playcardctrlstat
            SET ${campo} = ${campo} + ${valor}
            WHERE idf = ${idf} AND rodada = ${rodada}; 
        `;
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