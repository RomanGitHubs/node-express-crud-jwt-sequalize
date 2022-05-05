'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [{
        role: 'Admin',
        firstName: 'John',
        lastName: 'Doe',
        email: 'qwerty@wew.com',
        password: 'password',
        dob: '22.02.2022'
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }

};
