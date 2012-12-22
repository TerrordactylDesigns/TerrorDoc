module.exports = function(app, TerrorParser) {
  /*
   * GET home page.
   */
  app.get('/', function(req, res) {
    res.render('index', { title: 'TerrorDoc' })
  })
  /*
   * POST home page.
   */
  app.post('/', function(req, res) {
    var postData = ''
    req.addListener("data", function(postDataChunk) {
      postData += postDataChunk
    })
    req.addListener("end", function() {
      console.log('[ END POST EVENT ]')
      //console.log(postData)
      TerrorParser.Parse(postData)
    })
  })
}