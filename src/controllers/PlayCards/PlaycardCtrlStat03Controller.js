const PCIndGeral = require('../../models/PlayCards/PlaycardCtrlStat');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async findallversus(req,res){
        const {ano} = req.body;
        const sql = `
        SELECT 
            AVG(ST.ptoa) AS ptoa,
            (AVG(ST.ala)+1)*1.5 AS ala,
            (AVG(ST.asa)+1)*1.25 AS asa,
            (AVG(ST.cla)+1)*2.5 AS cla,
            (AVG(ST.csa)+1)*2 AS csa,
            (AVG(ST.rla)+1)*1.75 AS rla,
            (AVG(ST.rsa)+1)*1.5 AS rsa,
            AVG(ST.jogadasa)+1 AS jogadasa,
            AVG(ST.ptob) AS ptob,
            (AVG(ST.alb)+1)*1.5 AS alb,
            (AVG(ST.asb)+1)*1.25 AS asb,
            (AVG(ST.clb)+1)*2.5 AS clb,
            (AVG(ST.csb)+1)*2 AS csb,
            (AVG(ST.rlb)+1)*1.75 AS rlb,
            (AVG(ST.rsb)+1)*1.5 AS rsb,
            AVG(ST.jogadasb)+1 AS jogadasb,
            SUM(ST.ptoa) AS tptoa,
            SUM(ST.ptob) AS tptob,
            CASE
                WHEN SUM(ptoa) > SUM(ptob) THEN
                    "A"
                ELSE
                    "B"
            END AS resultado
        FROM playcardctrlstat ST
        INNER JOIN playcardctrl CT ON CT.idf = ST.idf
        WHERE CT.inicial > 0 AND YEAR(CT.inicio) = ${ano}
        GROUP BY ST.idf
    
        `;
        retorno = await PCIndGeral.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    },

    async findindversus(req,res){
        const {jogador, parceiro} = req.body;
        const sql = `
        SELECT 
            SUM(ptoa) AS ptoa,
            SUM(asa) AS asa,
            SUM(ala) AS ala,
            SUM(csa) AS csa,
            SUM(cla) AS cla,
            SUM(rsa) AS rsa,
            SUM(rla) AS rla,
            SUM(jogadasa) AS jogadasa,
            SUM(ptob) AS ptob,
            SUM(asb) AS asb,
            SUM(alb) AS alb,
            SUM(csb) AS csb,
            SUM(clb) AS clb,
            SUM(rsb) AS rsb,
            SUM(rlb) AS rlb,
            SUM(jogadasb) AS jogadasb
        FROM (
        SELECT 
            AVG(ptoa) AS ptoa,
            AVG(asa) AS asa,
            AVG(ala) AS ala,
            AVG(csa) AS csa,
            AVG(cla) AS cla,
            AVG(rsa) AS rsa,
            AVG(rla) AS rla,
            AVG(jogadasa) AS jogadasa,
            AVG(ptob) AS ptob,
            AVG(asb) AS asb,
            AVG(alb) AS alb,
            AVG(csb) AS csb,
            AVG(clb) AS clb,
            AVG(rsb) AS rsb,
            AVG(rlb) AS rlb,
            AVG(jogadasb) AS jogadasb
        FROM 
         ((SELECT 
            AVG(ST.ptoa) AS ptob,
            (AVG(ST.ala)+1)*1.5 AS alb,
            (AVG(ST.asa)+1)*1.25 AS asb,
            (AVG(ST.cla)+1)*2.5 AS clb,
            (AVG(ST.csa)+1)*2 AS csb,
            (AVG(ST.rla)+1)*1.75 AS rlb,
            (AVG(ST.rsa)+1)*1.5 AS rsb,
            AVG(ST.jogadasa)+1 AS jogadasb,
            0 AS ptoa, 0 AS ala, 0 AS asa, 0 AS cla, 0 AS csa, 0 AS rla, 0 AS rsa, 0 AS jogadasa
         FROM playcardctrlstat ST
         INNER JOIN playcardctrl CT ON CT.idf = ST.idf
         WHERE CT.inicial > 0 AND (CT.ava01 = ${parceiro} OR CT.ava02 = ${parceiro}))
         UNION
         (SELECT 
            AVG(ST.ptob) AS ptob,
            (AVG(ST.alb)+1)*1.5 AS alb,
            (AVG(ST.asb)+1)*1.25 AS asb,
            (AVG(ST.clb)+1)*2.5 AS clb,
            (AVG(ST.csb)+1)*2 AS csb,
            (AVG(ST.rlb)+1)*1.75 AS rlb,
            (AVG(ST.rsb)+1)*1.5 AS rsb,
            AVG(ST.jogadasb)+1 AS jogadasb,
            0 AS ptoa, 0 AS ala, 0 AS asa, 0 AS cla, 0 AS csa, 0 AS rla, 0 AS rsa, 0 AS jogadasa
        FROM playcardctrlstat ST
        INNER JOIN playcardctrl CT ON CT.idf = ST.idf
        WHERE CT.inicial > 0 AND (CT.avb01 = ${parceiro} OR CT.avb02 = ${parceiro}))
        ) AS TODOS_B
        UNION
        SELECT
            AVG(ptoa) AS ptoa,
            AVG(asa) AS asa,
            AVG(ala) AS ala,
            AVG(csa) AS csa,
            AVG(cla) AS cla,
            AVG(rsa) AS rsa,
            AVG(rla) AS rla,
            AVG(jogadasa) AS jogadasa,
            AVG(ptob) AS ptob,
            AVG(asb) AS asb,
            AVG(alb) AS alb,
            AVG(csb) AS csb,
            AVG(clb) AS clb,
            AVG(rsb) AS rsb,
            AVG(rlb) AS rlb,
            AVG(jogadasb) AS jogadasb
        FROM 
         ((SELECT 
            AVG(ST.ptoa) AS ptoa,
            (AVG(ST.ala)+1)*1.5 AS ala,
            (AVG(ST.asa)+1)*1.25 AS asa,
            (AVG(ST.cla)+1)*2.5 AS cla,
            (AVG(ST.csa)+1)*2 AS csa,
            (AVG(ST.rla)+1)*1.75 AS rla,
            (AVG(ST.rsa)+1)*1.5 AS rsa,
            AVG(ST.jogadasa)+1 AS jogadasa,
            0 AS ptob, 0 AS alb, 0 AS asb, 0 AS clb, 0 AS csb, 0 AS rlb, 0 AS rsb, 0 AS jogadasb
         FROM playcardctrlstat ST
         INNER JOIN playcardctrl CT ON CT.idf = ST.idf
         WHERE CT.inicial > 0 AND (CT.ava01 = ${jogador} OR CT.ava02 = ${jogador})) 
         UNION
         (SELECT 
            AVG(ST.ptob) AS ptoa,
            (AVG(ST.alb)+1)*1.5 AS ala,
            (AVG(ST.asb)+1)*1.25 AS asa,
            (AVG(ST.clb)+1)*2.5 AS cla,
            (AVG(ST.csb)+1)*2 AS csa,
            (AVG(ST.rlb)+1)*1.75 AS rla,
            (AVG(ST.rsb)+1)*1.5 AS rsa,
            AVG(ST.jogadasb)+1 AS jogadasa,
            0 AS ptob, 0 AS alb, 0 AS asb, 0 AS clb, 0 AS csb, 0 AS rlb, 0 AS rsb, 0 AS jogadasb    
         FROM playcardctrlstat ST
         INNER JOIN playcardctrl CT ON CT.idf = ST.idf
         WHERE CT.inicial > 0 AND (CT.avb01 = ${jogador} OR CT.avb02 = ${jogador}))
        ) AS TODOS_A
        ) AS TODOS        
        `;
        retorno = await PCIndGeral.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
}