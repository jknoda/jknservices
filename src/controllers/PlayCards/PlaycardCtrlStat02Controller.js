const PCIndGeral = require('../../models/PlayCards/PlaycardCtrlIndGeral');
const PCInd = require('../../models/PlayCards/PlaycardCtrlInd');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async findallind(req,res){
        const {ano} = req.body;
        const sql = `
            SELECT * FROM
            (SELECT 
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        SUM(ST.ptoa)
                    WHEN (CT.placarb > CT.placara) THEN
                        SUM(ST.ptob)
                END AS pto,
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        (AVG(ST.ala)+1)*1.5
                    WHEN (CT.placarb > CT.placara) THEN
                        (AVG(ST.alb)+1)*1.5
                END AS j_al,
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        (AVG(ST.asa)+1)*1.25
                    WHEN (CT.placarb > CT.placara) THEN
                        (AVG(ST.asb)+1)*1.25
                END AS j_as,    
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        (AVG(ST.cla)+1)*2.5
                    WHEN (CT.placarb > CT.placara) THEN
                        (AVG(ST.clb)+1)*2.5
                END AS j_cl,    
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        (AVG(ST.csa)+1)*2
                    WHEN (CT.placarb > CT.placara) THEN
                        (AVG(ST.csb)+1)*2
                END AS j_cs, 
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        (AVG(ST.rla)+1)*1.75
                    WHEN (CT.placarb > CT.placara) THEN
                        (AVG(ST.rlb)+1)*1.75
                END AS j_rl, 
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        (AVG(ST.rsa)+1)*1.5
                    WHEN (CT.placarb > CT.placara) THEN
                        (AVG(ST.rsb)+1)*1.5
                END AS j_rs,
                CASE
                    WHEN (CT.placara > CT.placarb) THEN
                        AVG(ST.jogadasa)+1
                    WHEN (CT.placarb > CT.placara) THEN
                        AVG(ST.jogadasb)+1
                END AS j_jogadas,
                "V" AS resultado
            FROM playcardctrl CT
            INNER JOIN heroku_04ffe828244e38a.playcardctrlstat ST ON CT.idf = ST.idf
            WHERE CT.inicial > 0 AND YEAR(CT.inicio) = ${ano} AND (CT.placara > CT.placarb OR CT.placarb > CT.placara)
            GROUP BY CT.idf) AS VITORIAS
            UNION
            (SELECT 
                CASE
                    WHEN (CT.placara < CT.placarb) THEN
                        SUM(ST.ptoa)
                    WHEN (CT.placarb < CT.placara) THEN
                        SUM(ST.ptob)
                END AS pto,
                CASE
                WHEN (CT.placara < CT.placarb) THEN
                    (AVG(ST.ala)+1)*1.5
                WHEN (CT.placarb < CT.placara) THEN
                    (AVG(ST.alb)+1)*1.5
                END AS j_al,
                CASE
                    WHEN (CT.placara < CT.placarb) THEN
                        (AVG(ST.asa)+1)*1.25
                    WHEN (CT.placarb < CT.placara) THEN
                        (AVG(ST.asb)+1)*1.25
                END AS j_as,    
                CASE
                    WHEN (CT.placara < CT.placarb) THEN
                        (AVG(ST.cla)+1)*2.5
                    WHEN (CT.placarb < CT.placara) THEN
                        (AVG(ST.clb)+1)*2.5
                END AS j_cl,    
                CASE
                    WHEN (CT.placara < CT.placarb) THEN
                        (AVG(ST.csa)+1)*2
                    WHEN (CT.placarb < CT.placara) THEN
                        (AVG(ST.csb)+1)*2
                END AS j_cs, 
                CASE
                    WHEN (CT.placara < CT.placarb) THEN
                        (AVG(ST.rla)+1)*1.75
                    WHEN (CT.placarb < CT.placara) THEN
                        (AVG(ST.rlb)+1)*1.75
                END AS j_rl, 
                CASE
                    WHEN (CT.placara < CT.placarb) THEN
                        (AVG(ST.rsa)+1)*1.5
                    WHEN (CT.placarb < CT.placara) THEN
                        (AVG(ST.rsb)+1)*1.5
                END AS j_rs,
                CASE
                    WHEN (CT.placara < CT.placarb) THEN
                        AVG(ST.jogadasa)+1
                    WHEN (CT.placarb < CT.placara) THEN
                        AVG(ST.jogadasb)+1
                END AS j_jogadas,                
                "D" AS resultado
            FROM heroku_04ffe828244e38a.playcardctrl CT
            INNER JOIN heroku_04ffe828244e38a.playcardctrlstat ST ON CT.idf = ST.idf
            WHERE CT.inicial > 0  AND YEAR(CT.inicio) = ${ano} AND (CT.placara < CT.placarb OR CT.placarb < CT.placara)
            GROUP BY CT.idf);
        `;
        retorno = await PCIndGeral.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    },

    async findind(req,res){
        const {jogador, parceiro, ano} = req.body;
        const sql = `
            SELECT 
                AVG(rodadas) * AVG(j_pto) AS j_pto,
                AVG(j_as) AS j_as,
                AVG(j_al) AS j_al,
                AVG(j_cs) AS j_cs,
                AVG(j_cl) AS j_cl,
                AVG(j_rs) AS j_rs,
                AVG(j_rl) AS j_rl
            FROM
            (
            SELECT * FROM(SELECT 
                "A" AS ctrl,
                AVG(rodadas) AS rodadas,
                AVG(j_pto) AS j_pto,
                AVG(j_as) AS j_as,
                AVG(j_al) AS j_al,
                AVG(j_cs) AS j_cs,
                AVG(j_cl) AS j_cl,
                AVG(j_rs) AS j_rs,
                AVG(j_rl) AS j_rl,    
                AVG(j_jogadas) AS j_jogadas
            FROM
            (
            SELECT 
                CT.idf,
                ${jogador} AS jogador,
                COUNT(ST.rodada) AS rodadas,
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        ROUND(AVG(ST.ptoa),0)+1
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        ROUND(AVG(ST.ptob),0)+1
                    ELSE
                        0
                END AS j_pto,
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        (ROUND(AVG(ST.asa),0)+1)*1.25
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        (ROUND(AVG(ST.asb),0)+1)+1.25
                    ELSE
                        0
                END AS j_as,
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        (ROUND(AVG(ST.ala),0)+1)*1.5
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        (ROUND(AVG(ST.alb),0)+1)*1.5
                    ELSE
                        0
                END AS j_al,
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        (ROUND(AVG(ST.csa),0)+1)*2
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        (ROUND(AVG(ST.csb),0)+1)*2
                    ELSE
                        0
                END AS j_cs,
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        (ROUND(AVG(ST.cla),0)+1)*2.5
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        (ROUND(AVG(ST.clb),0)+1)*2.5
                    ELSE
                        0
                END AS j_cl,
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        (ROUND(AVG(ST.rsa),0)+1)+1.5
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        (ROUND(AVG(ST.rsb),0)+1)*1.5
                    ELSE
                        0
                END AS j_rs,
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        (ROUND(AVG(ST.rla),0)+1)*1.75
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        (ROUND(AVG(ST.rlb),0)+1)*1.75
                    ELSE
                        0
                END AS j_rl
                CASE 
                    WHEN ava01 = ${jogador} OR ava02 = ${jogador} THEN 
                        ROUND(AVG(ST.jogadasa),0)+1
                    WHEN avb01 = ${jogador} OR avb02 = ${jogador} THEN
                        ROUND(AVG(ST.jogadasb),0)+1
                    ELSE
                        0
                END AS j_jogadas
            FROM playcardctrl CT
            INNER JOIN playcardctrlstat ST ON CT.idf = ST.idf
            WHERE CT.inicial > 0 AND YEAR(CT.inicio) = ${ano}
            GROUP BY CT.idf
            ) RESA 
            WHERE RESA.j_pto > 0
            GROUP BY RESA.jogador) JOGADOR
            UNION
            (
            SELECT 
                "A" AS ctrl,
                AVG(rodadas) AS rodadas,
                AVG(j_pto) AS j_pto,
                AVG(j_as) AS j_as,
                AVG(j_al) AS j_al,
                AVG(j_cs) AS j_cs,
                AVG(j_cl) AS j_cl,
                AVG(j_rs) AS j_rs,
                AVG(j_rl) AS j_rl,
                AVG(j_jogadas) AS j_jogadas
            FROM
            (
            SELECT 
                CT.idf,
                ${parceiro} AS jogador,
                COUNT(ST.rodada) AS rodadas,
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        ROUND(AVG(ST.ptoa),0)+1
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        ROUND(AVG(ST.ptob),0)+1
                    ELSE
                        0
                END AS j_pto,
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        (ROUND(AVG(ST.asa),0)+1)*1.25
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        (ROUND(AVG(ST.asb),0)+1)*1.25
                    ELSE
                        0
                END AS j_as,
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        (ROUND(AVG(ST.ala),0)+1)+1.5
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        (ROUND(AVG(ST.alb),0)+1)+1.5
                    ELSE
                        0
                END AS j_al,
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        (ROUND(AVG(ST.csa),0)+1)*2
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        (ROUND(AVG(ST.csb),0)+1)*2
                    ELSE
                        0
                END AS j_cs,
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        (ROUND(AVG(ST.cla),0)+1)*2.5
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        (ROUND(AVG(ST.clb),0)+1)*2.5
                    ELSE
                        0
                END AS j_cl,
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        (ROUND(AVG(ST.rsa),0)+1)+1.5
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        (ROUND(AVG(ST.rsb),0)+1)+1.5
                    ELSE
                        0
                END AS j_rs,
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        (ROUND(AVG(ST.rla),0)+1)*1.75
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        (ROUND(AVG(ST.rlb),0)+1)*1.75
                    ELSE
                        0
                END AS j_rl
                CASE 
                    WHEN ava01 = ${parceiro} OR ava02 = ${parceiro} THEN 
                        AVG(ST.jogadasa),0)+1
                    WHEN avb01 = ${parceiro} OR avb02 = ${parceiro} THEN
                        AVG(ST.jogadasb),0)+1
                    ELSE
                        0
                END AS j_jogadas
            FROM playcardctrl CT
            INNER JOIN playcardctrlstat ST ON CT.idf = ST.idf
            WHERE CT.inicial > 0 AND YEAR(CT.inicio) = ${ano}
            GROUP BY CT.idf
            ) RESB 
            WHERE RESB.j_pto > 0
            GROUP BY RESB.jogador)
            ) RESULTADO GROUP BY RESULTADO.ctrl;
        `;
        retorno = await PCInd.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
}