const { Sequelize, Model, DataTypes } = require('sequelize');

class IPAccess extends Model {
    static init(sequelize) {
        super.init({
            idf: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            site: {
                type: DataTypes.STRING(10),
                allowNull: true
            },

            ipnumber: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            data: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'ipaccess'
        })
    }
}

module.exports = IPAccess;