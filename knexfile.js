// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'bookshelf-dev',
      host: '127.0.0.1'
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: 'bookshelf-test',
      host:     '127.0.0.1',
    }
  }

};
