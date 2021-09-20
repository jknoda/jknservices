const PCGeral = require('../../models/PlayCards/PlaycardCtrlGeral');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async findallstat(req,res){
        const {ano, mesini, mesfim} = req.body;
        var jogador = req.body.jogador;
        var parceiro = req.body.parceiro;
        if (jogador == 0 || jogador == parceiro){
            // para ajustar campo njog => njog é sempre em relação ao 'jogador'
            jogador = parceiro;
            parceiro = 0;
        }
        let sqlAuxA = '';
        let sqlAuxB = '';
        if (parceiro == 0){
            sqlAuxA = `
            CT.ava01 = ${jogador} OR CT.ava02 = ${jogador}
            `;
            sqlAuxB = `
            CT.avb01 = ${jogador} OR CT.avb02 = ${jogador}
            `;
        }
        else{
            sqlAuxA = `
                (
                    (CT.ava01 = ${jogador} AND CT.ava02 = ${parceiro})
                    OR (CT.ava01 = ${parceiro} AND CT.ava02 = ${jogador})
                )
            `;
            sqlAuxB = `
                (
                    (CT.avb01 = ${jogador} AND CT.avb02 = ${parceiro})
                    OR (CT.avb01 = ${parceiro} AND CT.avb02 = ${jogador})
                )
            `;

        }
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
            WHERE CT.inicial > 0 
            AND ${sqlAuxA}
            AND YEAR(ST.data) = ${ano} AND MONTH(ST.data) >= ${mesini} AND MONTH(ST.data) <= ${mesfim}) AS JOGA
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
            WHERE CT.inicial > 0 
            AND ${sqlAuxB}
            AND YEAR(ST.data) = ${ano} AND MONTH(ST.data) >= ${mesini} AND MONTH(ST.data) <= ${mesfim})
            ORDER BY idf, rodada
        `;
        retorno = await PCGeral.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
}