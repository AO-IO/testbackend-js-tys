import constants from './constants';
/**
 * This module centralize all the environment variables of the application.
 * Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
export default (() => {
  const environment = {
    port: process.env.PORT || 3000,
    database: {
      dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO,
      url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/?directConnection=true',
    },

    jwtSecretKey: process.env.JWT_SECRET_KEY || "secret",
  };

  return environment;
})();
