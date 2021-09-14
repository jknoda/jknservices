const { Sequelize, Model, DataTypes } = require('sequelize');

class Playcard extends Model {
    static init(sequelize) {
        super.init({
            sala: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            data: {
                type: DataTypes.DATE,
                allowNull: true
            },

            dados: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            jogador: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'playcard'
        })
    }
}

module.exports = Playcard;