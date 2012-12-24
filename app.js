var express = require('express')
  , app     = express()
  , routes  = require('./routes/routes')

app.use(app.router)
app.use(express.static(__dirname + '/public'))
app.use(express.errorHandler())
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/' }))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set('view options', { layout: false })

// Routes
app.get('/', routes.index)
app.post('/parse', routes.parse)

// Start
var port = process.env.PORT || 3000
app.listen(port)
console.log('Express server is running on port:' + port)
