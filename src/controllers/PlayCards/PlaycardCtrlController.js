const PCCtrl = require('../../models/PlayCards/PlaycardCtrl');
const errDB = require('../../common/_sendErrorsDB');
const sequelize = require("sequelize");
const {Op} = require("sequelize");

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
    }
}