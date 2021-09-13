const { Sequelize, Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            EmpCod: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            EmpNome: {
                type: DataTypes.STRING(100),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'empresa'
        })
    }
}

module.exports = Empresa;