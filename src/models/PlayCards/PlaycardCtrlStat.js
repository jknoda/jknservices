const { Sequelize, Model, DataTypes } = require('sequelize');

class PlaycardCtrlStat extends Model {
    static init(sequelize) {
        super.init({
            idf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            rodada: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            ptoa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ptob: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            as_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            as_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            al_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            al_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cs_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cs_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cl_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cl_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rl_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rl_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rs_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rs_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            morto_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            morto_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            batida_a: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            batida_b: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            obs: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'playcardctrlstat'
        })
    }
}

module.exports = PlaycardCtrlStat;