const { User } = require('../models')

const userData =
[
    {
      "name": "John",
      "password": "password12345"
    },
    {
      "name": "Baskin",
      "password": "tigers25"
    },
    {
      "name": "Exotic",
      "password": "imtheking69"
    },
    {
      "name": "Mark",
      "password": "passfun13"
    },
    {
      "name": "George",
      "password": "goodtimes38"
    }
  ]
  
  const userSeeds = () => User.bulkCreate(userData, { individualHooks: true })

  module.exports = userSeeds;
  