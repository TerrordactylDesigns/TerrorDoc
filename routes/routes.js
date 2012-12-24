var TerrorParser  = require('../lib/index')
/**/// Public: index
/**///
/**/// Args
/**/// req    - request object
/**/// res    - response object
/**///
/**/// Returns
/**/// return - GET index.jade
exports.index = function(req, res) {
  res.render('index', { title: 'TerrorDoc' })
}
/**/// Public: parse
/**///
/**/// Args
/**/// req    - request object
/**/// res    - response object
/**///
/**/// Returns
/**/// return - POST index/post
exports.parse = function(req, res) {
  var postData = ''
  req.addListener('data', function(postDataChunk) {
    postData += postDataChunk
  })
  req.addListener('end', function() {
    console.log('[ POST EVENT RECEIVED ]')
    var data = TerrorParser(postData)
    res.render('display', {title:'TerrorDoc', docs: data})
  })
}
/**/// Public: display
/**///
/**/// Args
/**/// req    - request object
/**/// res    - response object
/**///
/**/// Returns
/**/// return - GET display.jade
exports.display = function(req, res) {
  res.render('display', {})
}
