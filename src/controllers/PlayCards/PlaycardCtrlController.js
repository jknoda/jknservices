const PCCtrl = require('../../models/PlayCards/PlaycardCtrl');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const {Op} = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async create(req,res){
        const {criador,sala,ava01,ava02,avb01,avb02,joga01,joga02,jogb01,jogb02} = req.body;
        const inicial = 0;
        const inicio = new Date();
        const fim = inicio;
        const placara = 0;
        const placarb = 0;
        const obs = "-";
        var idf = 0;
        await PCCtrl.findOne({
            attributes: ['idf'],
            order: [[ 'idf', 'DESC' ]]
        }).then((data)=>{
            idf = data.idf;
        }).finally(()=>{
            idf++;
            PCCtrl.create({idf,criador,inicial,sala,ava01,ava02,avb01,avb02,joga01,joga02,jogb01,jogb02,inicio,fim,placara,placarb,obs})
            .catch(function(err){
                return errDB(res,err);
            });
            return res.json(idf);
        });
    },

    async end(req,res){
        const {idf, inicial, placara, placarb, obs} = req.body;
        const fim = new Date();
        await PCCtrl.update({ inicial, fim, placara, placarb, obs },{where : { idf }}
        ).catch(function(err){
            return errDB(res,err);
        });
        return res.json("ok");
    },

    async findname(req,res){
        const {jogador} = req.body;
        const sql = `
            SELECT 
            CASE 
                WHEN ava01 = ${jogador} THEN joga01 
                WHEN ava02 = ${jogador} THEN joga02
                WHEN avb01 = ${jogador} THEN jogb01
                WHEN avb02 = ${jogador} THEN jogb02
            END AS nome
            FROM playcardctrl
            WHERE (ava01 = ${jogador} OR ava02 = ${jogador} OR avb01 = ${jogador} OR avb02 = ${jogador})
            AND inicial > 0
            ORDER BY idf DESC
            LIMIT 1;
        `;
        retorno = await PCCtrl.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).catch(function(err){
            return errDB(res,err);
        });
        return res.json(retorno);
    }
}