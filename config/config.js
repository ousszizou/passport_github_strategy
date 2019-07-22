require('dotenv').config()

module.exports = {

  port: 3000,
  database: {
    dbURI: process.env.DBURI
  },
  session: {
    cookieKey: process.env.COOKIEKEY
  },
  github: {
    clientID: process.env.CLIENTID ,
    clientSecret: process.env.CLIENTSECRET
  }

}
