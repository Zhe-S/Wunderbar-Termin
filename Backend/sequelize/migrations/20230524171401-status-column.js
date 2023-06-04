"use strict";

module.exports= {
    up: async function up(queryInterface, Sequelize) {
        await queryInterface.addColumn("appointment", "status", {
            allowNull: false,
            type: Sequelize.STRING(32),
            defaultValue: "active"
        })
    },
    down: async function down(queryInterface) {
        await queryInterface.removeColumn("appointment", "status")
    }
}
