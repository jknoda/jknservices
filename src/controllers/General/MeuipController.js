const myip = require('quick-local-ip');
const IP = require('../../models/General/IPAccess');
const errDB = require('../../common/_sendErrorsDB');


module.exports = {
    async create(req,res){
        var idf = parseInt(await IP.count()) + 1;
        const ipnumber = myip.getLocalIP4();
        const data = new Date();
        const site = 'jkn';

        var retorno = await IP.findOne({
            where: { ipnumber, site },
            order: [ [ 'data', 'DESC' ]],
        });
        if (retorno){
            var dia1 = retorno.data.getDay();
            var mes1 = retorno.data.getMonth();
            var ano1 = retorno.data.getFullYear();
            var hora1 = retorno.data.getHours();
            var min1 = retorno.data.getMinutes();
            var dia2 = data.getDay();
            var mes2 = data.getMonth();
            var ano2 = data.getFullYear();
            var hora2 = data.getHours();
            var min2 = data.getMinutes();

            if (dia1 == dia2 && mes1 == mes2 && ano1 == ano2 && hora1 == hora2 && min1 == min2)
            {
                idf = idf - 1;
                return res.send(idf.toString());
            }
        }
        retorno = await IP.create( { idf, site, ipnumber, data } )
        .catch(function (err) {
            return errDB(res, err);
        });
        return res.send(idf.toString());
    },
    async summary(req,res){
        const retorno = await IP.count();
        return res.json(retorno);
    },
    async contador(req,res){
        const retorno = await IP.count();
        return res.send(retorno.toString());
    }
}