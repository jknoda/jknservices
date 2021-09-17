module.exports = {
    async teste(req,res){
        return res.send('Teste OK');
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