const PCCtrlStat = require('../../models/PlayCards/PlaycardCtrlStat');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async create(req,res){
        const {idf, rodada, estatistica} = req.body;
        const data = new Date();
        const ptoa = ptob = asa = asb = ala = alb = csa = csb = cla = clb = rla = rlb = rsa = rsb =
             vula = vulb = vulptoa = vulptob = mortoa = mortob = 
             batidaa = batidab = jogadasa = jogadasb = recall = 0;
        //console.log("nova rodada ",idf);
        await PCCtrlStat.create({idf, rodada, ptoa, ptob, asa, asb, ala, alb, csa, csb, cla, clb, 
            rla, rlb, rsa, rsb, vula, vulb, vulptoa, vulptob, mortoa, mortob, 
            batidaa, batidab, jogadasa, jogadasb, recall, data, estatistica})
        .catch(function(err){
            return errDB(res,err);
        });
        return res.json("Ok");
    },

    async update(req,res){
        const {idf, rodada, dupla, tipo, valor, estatistica} = req.body;
        let campo = "`" + tipo + dupla + "`";
        //console.log(req.body,campo);
        let sql =   `   UPDATE playcardctrlstat`;
        sql += `    SET estatistica = ${estatistica}, `;
        sql +=  `   ${campo} = ${campo} + ${valor}`;
        sql +=  `   WHERE idf = ${idf} AND rodada = ${rodada}; `;
        PCCtrlStat.sequelize.query(sql, {
            type: sequelize.QueryTypes.UPDATE
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json("ok");
    },

    async findall(req,res){
        const{idf, ordem} = req.body;
        retorno = await PCCtrlStat.findAll({
            attributes: ['idf', 'rodada', 'ptoa', 'ptob', 
                'asa', 'asb', 'ala', 'alb', 'csa', 'csb', 
                'cla', 'clb', 'rla', 'rlb', 'rsa', 'rsb', 
                'vula', 'vulb', 'vulptoa', 'vulptob', 
                'mortoa', 'mortob', 'batidaa', 'batidab',
                'jogadasa', 'jogadasb', 'recall', 'data', 'estatistica'],
            where: {
              idf
            },
            order: [
                ['rodada', ordem] 
            ]
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
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