var express       = require('express')
  , app           = express()
  , TerrorParser  = require('./lib/index')
  , x = new TerrorParser()

app.use(app.router)
app.use(express.static(__dirname + '/public'))
app.use(express.errorHandler())
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set('view options', { layout: false })
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/' }))

// Routes
require('./routes/home')(app, x)
//require('./routes/global')(app) //this is acting weird and 404ing every call

var port = process.env.PORT || 3000
app.listen(port)
console.log('Express server is running on port:' + port)
