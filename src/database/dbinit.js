const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Empresa = require('../models/Empresa/Empresa');
const IP = require('../models/General/IPAccess');
const PLAYCARD = require('../models/PlayCards/Playcard');
const PLAYCARDCTRL = require('../models/PlayCards/PlaycardCtrl')
const PLAYCARDCTRLSTAT = require('../models/PlayCards/PlaycardCtrlStat')
const PLAYCARDCTRLGERAL = require('../models/PlayCards/PlaycardCtrlGeral')
const PLAYCARDCTRLINDGERAL = require('../models/PlayCards/PlaycardCtrlIndGeral')
const PLAYCARDCTRLIND = require('../models/PlayCards/PlaycardCtrlInd')

Empresa.init(connection);
IP.init(connection);
PLAYCARD.init(connection);
PLAYCARDCTRL.init(connection);
PLAYCARDCTRLSTAT.init(connection);
PLAYCARDCTRLGERAL.init(connection);
PLAYCARDCTRLINDGERAL.init(connection);
PLAYCARDCTRLIND.init(connection);

module.exports = connection;