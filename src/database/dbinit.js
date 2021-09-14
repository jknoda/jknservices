const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Empresa = require('../models/Empresa/Empresa');
const IP = require('../models/General/IPAccess');
const PLAYCARD = require('../models/Playcards/Playcard');
const PLAYCARDSTAT = require('../models/PlayCards/PlaycardCtrl');

Empresa.init(connection);
IP.init(connection);
PLAYCARD.init(connection);
PLAYCARDSTAT.init(connection);


module.exports = connection;