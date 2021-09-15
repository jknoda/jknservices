const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Empresa = require('../models/Empresa/Empresa');
const IP = require('../models/General/IPAccess');
const PLAYCARD = require('../models/PlayCards/Playcard');
const PLAYCARDCTRL = require('../models/PlayCards/PlaycardCtrl')
const PLAYCARDCTRLSTAT = require('../models/PlayCards/PlaycardCtrlStat')

Empresa.init(connection);
IP.init(connection);
PLAYCARD.init(connection);
PLAYCARDCTRL.init(connection);
PLAYCARDCTRLSTAT.init(connection);


module.exports = connection;