const { Sequelize, Model, DataTypes } = require('sequelize');

class PlaycardCtrlIndGeral extends Model {
    static init(sequelize) {
        super.init({
            idf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            sala: {
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
            }                        ,
            j_dupla: {
                type: DataTypes.STRING,
                allowNull: true
            } ,
            placara: {
                type: DataTypes.INTEGER,
                allowNull: true
            } ,
            placarb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            j_resultado: {
                type: DataTypes.STRING,
                allowNull: true
            },
            jog: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rodadas: {
                type: DataTypes.INTEGER,
                allowNull: true
            } ,
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
            j_rs: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            j_rl: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            j_jogadas: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize
        })
    }
}

module.exports = PlaycardCtrlIndGeral;