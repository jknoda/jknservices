const PCIndGeral = require('../../models/PlayCards/PlaycardCtrlStat');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async findallversus(req,res){
        const {ano} = req.body;
        const sql = `
        SELECT 
            ala / (ala + alb) AS ala,
            asa / (asa + asb) AS asa,
            cla / (cla + clb) AS cla,
            csa / (csa + csb) AS csa,
            rla / (rla + rlb) AS rla,
            rsa / (rsa + rsb) AS rsa,    
            jogadasa / (jogadasa + jogadasb) AS jogadasa,
            alb / (ala + alb) AS alb,
            asb / (asa + asb) AS asb,
            clb / (cla + clb) AS clb,
            csb / (csa + csb) AS csb,
            rlb / (rla + rlb) AS rlb,
            rsb / (rsa + rsb) AS rsb,
            jogadasb / (jogadasa + jogadasb) AS jogadasb,
            resultado
        FROM
        (
                SELECT 
                    #AVG(ST.ptoa) AS ptoa,
                    (AVG(ST.ala)+1)*1.5 AS ala,
                    (AVG(ST.asa)+1)*1.25 AS asa,
                    (AVG(ST.cla)+1)*2.5 AS cla,
                    (AVG(ST.csa)+1)*2 AS csa,
                    (AVG(ST.rla)+1)*1.75 AS rla,
                    (AVG(ST.rsa)+1)*1.5 AS rsa,
                    AVG(ST.jogadasa)+1 AS jogadasa,
                    #AVG(ST.ptob) AS ptob,
                    (AVG(ST.alb)+1)*1.5 AS alb,
                    (AVG(ST.asb)+1)*1.25 AS asb,
                    (AVG(ST.clb)+1)*2.5 AS clb,
                    (AVG(ST.csb)+1)*2 AS csb,
                    (AVG(ST.rlb)+1)*1.75 AS rlb,
                    (AVG(ST.rsb)+1)*1.5 AS rsb,
                    AVG(ST.jogadasb)+1 AS jogadasb,
                    #SUM(ST.ptoa) AS tptoa,
                    #SUM(ST.ptob) AS tptob,
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
        UNION
                SELECT 
                    #AVG(ST.ptoa) AS ptoa,
                    (AVG(ST.alb)+1)*1.5 AS ala,
                    (AVG(ST.asb)+1)*1.25 AS asa,
                    (AVG(ST.clb)+1)*2.5 AS cla,
                    (AVG(ST.csb)+1)*2 AS csa,
                    (AVG(ST.rlb)+1)*1.75 AS rla,
                    (AVG(ST.rsb)+1)*1.5 AS rsa,
                    AVG(ST.jogadasb)+1 AS jogadasa,
                    #AVG(ST.ptob) AS ptob,
                    (AVG(ST.ala)+1)*1.5 AS alb,
                    (AVG(ST.asa)+1)*1.25 AS asb,
                    (AVG(ST.cla)+1)*2.5 AS clb,
                    (AVG(ST.csa)+1)*2 AS csb,
                    (AVG(ST.rla)+1)*1.75 AS rlb,
                    (AVG(ST.rsa)+1)*1.5 AS rsb,
                    AVG(ST.jogadasa)+1 AS jogadasb,
                    #SUM(ST.ptob) AS tptoa,
                    #SUM(ST.ptoa) AS tptob,
                    CASE
                        WHEN SUM(ptob) > SUM(ptoa) THEN
                            "A"
                        ELSE
                            "B"
                    END AS resultado
                FROM playcardctrlstat ST
                INNER JOIN playcardctrl CT ON CT.idf = ST.idf
                WHERE CT.inicial > 0 AND YEAR(CT.inicio) = ${ano}
                GROUP BY ST.idf
        ) TODOS
        `;
        retorno = await PCIndGeral.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    },

    async findindversus(req,res){
        const {dupla01a, dupla01b, dupla02a, dupla02b} = req.body;
        const sql = `
        SELECT 
            ala / (ala + alb) AS ala,
            asa / (asa + asb) AS asa,
            cla / (cla + clb) AS cla,
            csa / (csa + csb) AS csa,
            rla / (rla + rlb) AS rla,
            rsa / (rsa + rsb) AS rsa,    
            jogadasa / (jogadasa + jogadasb) AS jogadasa,
            alb / (ala + alb) AS alb,
            asb / (asa + asb) AS asb,
            clb / (cla + clb) AS clb,
            csb / (csa + csb) AS csb,
            rlb / (rla + rlb) AS rlb,
            rsb / (rsa + rsb) AS rsb,
            jogadasb / (jogadasa + jogadasb) AS jogadasb
        FROM
        (   
            SELECT
                    1 AS indice,
                    (AVG(ala)+1)*1.5 AS ala, 
                    (AVG(asa)+1)*1.25 AS asa, 
                    (AVG(cla)+1)*2.5 AS cla, 
                    (AVG(csa)+1)*2 AS csa, 
                    (AVG(rla)+1)*1.75 AS rla, 
                    (AVG(rsa)+1)*1.5 AS rsa, 
                    (AVG(jogadasa)+1) AS jogadasa
            FROM
            (
                SELECT /* DUPLA A COL A */ 
                    ala, asa, cla, csa, rla, rsa, jogadasa
                FROM playcardctrlstat ST
                INNER JOIN playcardctrl CT ON CT.idf = ST.idf
                WHERE CT.inicial > 0 AND (CT.ava01 = ${dupla01a} OR CT.ava02 = ${dupla01a} OR CT.ava01 = ${dupla01b} OR CT.ava02 = ${dupla01b})
                UNION
                SELECT /* DUPLA A COL B */ 
                    alb AS ala, asb AS asa, clb AS cla, csb AS csa, rlb AS rla, rsb AS rsa, jogadasb AS jogadasa
                FROM playcardctrlstat ST
                INNER JOIN playcardctrl CT ON CT.idf = ST.idf
                WHERE CT.inicial > 0 AND (CT.avb01 = ${dupla01a} OR CT.avb02 = ${dupla01a} OR CT.avb01 = ${dupla01b} OR CT.avb02 = ${dupla01b})
            ) AUX_A
        ) DUPLA_A
        INNER JOIN
        (
            SELECT
                    1 AS indice,
                    (AVG(alb)+1)*1.5 AS alb, 
                    (AVG(asb)+1)*1.25 AS asb, 
                    (AVG(clb)+1)*2.5 AS clb, 
                    (AVG(csb)+1)*2 AS csb, 
                    (AVG(rlb)+1)*1.75 AS rlb, 
                    (AVG(rsb)+1)*1.5 AS rsb, 
                    (AVG(jogadasb)+1) AS jogadasb
            FROM
            (
                SELECT /* DUPLA B COL B */ 
                    alb, asb, clb, csb, rlb, rsb, jogadasb
                FROM playcardctrlstat ST
                INNER JOIN playcardctrl CT ON CT.idf = ST.idf
                WHERE CT.inicial > 0 AND (CT.avb01 = ${dupla02a} OR CT.avb02 = ${dupla02a} OR CT.avb01 = ${dupla02b} OR CT.avb02 = ${dupla02b})
                UNION
                SELECT /* DUPLA A COL A */ 
                    ala AS alb, asa AS asb, cla AS clb, csa AS csb, rla AS rlb, rsa AS rsb, jogadasa AS jogadasb
                FROM playcardctrlstat ST
                INNER JOIN playcardctrl CT ON CT.idf = ST.idf
                WHERE CT.inicial > 0 AND (CT.ava01 = ${dupla02a} OR CT.ava02 = ${dupla02a} OR CT.ava01 = ${dupla02b} OR CT.ava02 = ${dupla02b})
            ) AUX_B
        ) DUPLA_B
        ON DUPLA_A.indice = DUPLA_B.indice
        `;
        retorno = await PCIndGeral.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
}