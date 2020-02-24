const dbHandler = require('../../db-handler');
const { Before, After } = require('cucumber')

Before(function () {
  return dbHandler.connect()
})

After(function () {
  return dbHandler.closeDatabase()
})
