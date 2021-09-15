const express = require('express');

module.exports = function (server) {
    /*
    /*
    * API Públicas - rotas abertas
    */
    const openApi = express.Router();
    server.use('/oapi', openApi);

    const EmpresaController = require('../controllers/Empresa/EmpresaController');
    openApi.get('/empresas', EmpresaController.findAll);

    const MeuipController = require('../controllers/General/MeuipController');
    openApi.get('/ip/create', MeuipController.create);
    openApi.get('/ip/summary', MeuipController.summary);
    openApi.get('/ip/contador', MeuipController.contador);

    const PlaycardController = require('../controllers/PlayCards/PlaycardController');
    openApi.post('/play/update', PlaycardController.update);
    openApi.post('/play/find', PlaycardController.find);

    const PlaycardCtrlController = require('../controllers/PlayCards/PlaycardCtrlController');
    openApi.post('/playctrl/create', PlaycardCtrlController.create);
    openApi.post('/playctrl/end', PlaycardCtrlController.end);

    const PlaycardCtrlStatController = require('../controllers/PlayCards/PlaycardCtrlStatController');
    openApi.post('/playctrlstat/create', PlaycardCtrlStatController.create);
    openApi.post('/playctrlstat/update', PlaycardCtrlStatController.update);
    //openApi.post('/playctrlstat/teste', PlaycardCtrlStatController.teste);

}

