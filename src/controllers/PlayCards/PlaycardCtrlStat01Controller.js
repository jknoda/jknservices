const PCGeral = require('../../models/PlayCards/PlaycardCtrlGeral');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async findallstat(req,res){
        const {jogador} = req.body;
        const sql = `
        SELECT * FROM
            (SELECT CT.idf, ST.rodada,
                CT.placara, CT.placarb, 
                (CT.placara > CT.placarb) AS 'venceu',
                'a' AS 'jog',
                ST.ptoa, ST.ptob, 
                ST.asa AS 'as', 
                ST.ala AS 'al', 
                ST.csa AS 'cs', 
                ST.cla AS 'cl', 
                ST.rla AS 'rl', 
                ST.rsa AS 'rs', 
                ST.vula AS 'vul', 
                ST.vulptoa  AS 'vulpto', 
                ST.mortoa  AS 'morto', 
                ST.batidaa AS 'batida',
                ST.data ,
                (CASE 
                    WHEN CT.ava01 = ${jogador} THEN 1
                    ELSE 2
                END) AS njog
            FROM playcardctrl AS CT
            INNER JOIN playcardctrlstat AS ST ON CT.idf = ST.idf
            WHERE CT.ava01 = ${jogador} OR CT.ava02 = ${jogador}) AS JOGA
        UNION
            (SELECT CT.idf, ST.rodada,
                CT.placara, CT.placarb, 
                (CT.placarb > CT.placara) AS 'venceu',
                'b' AS 'jog',
                ST.ptoa, ST.ptob, 
                ST.asb AS 'as', 
                ST.alb AS 'al', 
                ST.csb AS 'cs', 
                ST.clb AS 'cl', 
                ST.rlb AS 'rl', 
                ST.rsb AS 'rs', 
                ST.vulb AS 'vul', 
                ST.vulptob  AS 'vulpto', 
                ST.mortob  AS 'morto', 
                ST.batidab AS 'batida',
                ST.data,
                (CASE 
                    WHEN CT.avb01 = ${jogador} THEN 3
                    ELSE 4
                END) AS njog        
            FROM playcardctrl AS CT
            INNER JOIN playcardctrlstat AS ST ON CT.idf = ST.idf
            WHERE CT.avb01 = ${jogador} OR CT.avb02 = ${jogador})
        `;
        retorno = await PCGeral.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
}