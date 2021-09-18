const { Sequelize, Model, DataTypes } = require('sequelize');

class PlaycardCtrlGeral extends Model {
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
            placara: {
                type: DataTypes.INTEGER,
                allowNull: true
            } ,
            placarb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            venceu: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            jog: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ptoa: {
                type: DataTypes.INTEGER,
                allowNull: true
            } ,
            ptob: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            as: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            al: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cs: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cl: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rl: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rs: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vul: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vulpto: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            morto: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            batida: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            data: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
            sequelize
        })
    }
}

module.exports = PlaycardCtrlGeral;