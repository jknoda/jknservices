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
            } ,
            ptob: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            asa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            asb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ala: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            alb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            csa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            csb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cla: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            clb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rla: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rlb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rsa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            rsb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vula: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vulb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vulptoa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vulptob: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            mortoa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            mortob: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            batidaa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            batidab: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            jogadasa: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            jogadasb: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            recall: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            data: {
                type: DataTypes.DATE,
                allowNull: true
            },
            estatistica: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            resultado: {
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