const { Sequelize, Model, DataTypes } = require('sequelize');

class PlaycardStat extends Model {
    static init(sequelize) {
        super.init({
            idf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            criador: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            jogadorinicial: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            sala: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ava01: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ava02: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            avb01: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            avb02: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            joga01: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            joga02: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            jogb01: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            jogb02: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            inicio: {
                type: DataTypes.DATE,
                allowNull: true
            },
            fim: {
                type: DataTypes.DATE,
                allowNull: true
            },
            placara: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            placarb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            obs: {
                type: DataTypes.STRING,
                allowNull: true
            }

        }, {
            sequelize,
            tableName: 'playcardctrl'
        })
    }
}

module.exports = PlaycardStat;