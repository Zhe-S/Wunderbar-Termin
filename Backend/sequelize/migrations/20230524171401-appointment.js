"use strict";

module.exports= {
    up: async function up(queryInterface, Sequelize) {
        await queryInterface.createTable("appointment", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(128),
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING(128),
            },
            date: {
                allowNull: false,
                type: Sequelize.DATEONLY,
            }
        });

        await queryInterface.addIndex("appointment", ["name"]);
        await queryInterface.addIndex("appointment", ["email"]);
        await queryInterface.addIndex("appointment", ["date"]);
    },
    down: async function down(queryInterface) {
        await queryInterface.removeIndex("appointment", ["name"]);
        await queryInterface.removeIndex("appointment", ["email"]);
        await queryInterface.removeIndex("appointment", ["date"]);
        await queryInterface.dropTable("appointment");
    }
}
