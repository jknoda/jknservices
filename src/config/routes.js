const express = require('express');

module.exports = function (server) {
    /*
    /*
    * API Públicas - rotas abertas
    */
    const openApi = express.Router();
    server.use('/oapi', openApi);

    const TesteController = require('../controllers/General/TesteController');
    openApi.get('/teste', TesteController.teste);

    const EmpresaController = require('../controllers/Empresa/EmpresaController');
    openApi.get('/empresas', EmpresaController.findAll);

    const MeuipController = require('../controllers/General/MeuipController');
    openApi.get('/ip/create', MeuipController.create);
    openApi.get('/ip/summary', MeuipController.summary);
    openApi.get('/ip/contador', MeuipController.contador);

    const PlaycardController = require('../controllers/PlayCards/PlaycardController');
    openApi.post('/play/update', PlaycardController.update);
    openApi.post('/play/find', PlaycardController.find);
    openApi.post('/play/now', PlaycardController.findnow);

    const PlaycardCtrlController = require('../controllers/PlayCards/PlaycardCtrlController');
    openApi.post('/playctrl/create', PlaycardCtrlController.create);
    openApi.post('/playctrl/end', PlaycardCtrlController.end);
    openApi.post('/playctrl/findname', PlaycardCtrlController.findname);
    openApi.post('/playctrl/findlastgame', PlaycardCtrlController.findlastgame);
    openApi.post('/playctrl/findgame', PlaycardCtrlController.findgame);

    const PlaycardCtrlStatController = require('../controllers/PlayCards/PlaycardCtrlStatController');
    openApi.post('/playctrlstat/create', PlaycardCtrlStatController.create);
    openApi.post('/playctrlstat/update', PlaycardCtrlStatController.update);
    openApi.post('/playctrlstat/findall', PlaycardCtrlStatController.findall);
    //openApi.post('/playctrlstat/teste', PlaycardCtrlStatController.teste);

    const PlaycardCtrlStat01Controller = require('../controllers/PlayCards/PlaycardCtrlStat01Controller');
    openApi.post('/playctrlstat/findallstat', PlaycardCtrlStat01Controller.findallstat);

    const PlaycardCtrlStat02Controller = require('../controllers/PlayCards/PlaycardCtrlStat02Controller');
    openApi.post('/playctrlstat/findallind', PlaycardCtrlStat02Controller.findallind);
    openApi.post('/playctrlstat/findind', PlaycardCtrlStat02Controller.findind);

    const PlaycardCtrlStat03Controller = require('../controllers/PlayCards/PlaycardCtrlStat03Controller');
    openApi.post('/playctrlstat/findallversus', PlaycardCtrlStat03Controller.findallversus);
    openApi.post('/playctrlstat/findindversus', PlaycardCtrlStat03Controller.findindversus);

    
}

