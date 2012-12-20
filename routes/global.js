/**/// Public: Global Routes
/**///
/**/// Args
/**/// app - express application object
/**///
/**/// Returns
/**/// return - the_return_value
/**///
/**/// Notes
/**/// These should be included LAST for wildcard 404 route
module.exports = function(app) {
  // manual 500 error
  app.get('/500', function(req, res) {
      throw new Error('This is a 500 Error')
  })

  // wildcard route for 404 errors
  app.get('/*', function(req, res) {
      throw new errorHandler.NotFound
  })
}