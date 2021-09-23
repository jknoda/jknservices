const { Sequelize, Model, DataTypes } = require('sequelize');

class PlaycardCtrlInd extends Model {
    static init(sequelize) {
        super.init({
            j_pto: {
                type: DataTypes.INTEGER,
                allowNull: true
            } ,
            j_as: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            j_al: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            j_cs: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            j_cl: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cj_rsl: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            j_rl: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            resultado: {
                type: DataTypes.INTEGER,
                allowNull: true
            }            
        }, {
            sequelize
        })
    }
}

module.exports = PlaycardCtrlInd;