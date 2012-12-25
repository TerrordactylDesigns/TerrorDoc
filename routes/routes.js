var TerrorParser  = require('terrorparser')
  , fs            = require('fs')
  , files         = null
  , path          = require('path')
  , mime          = require('mime')
  , rmDir         = function(dirPath) {
                      try {
                        files = fs.readdirSync(dirPath)
                      } catch(e) {

                      }
                      if (files)
                        for (var i = 0; i < files.length; i++) {
                          var filePath = dirPath + '/' + files[i]
                          if (fs.statSync(filePath).isFile())
                            fs.unlinkSync(filePath)
                        }
                    }
/**/// Public: download
/**///
/**/// Args
/**/// req    - request object
/**/// res    - response object
/**///
/**/// Returns
/**/// return - GET download of TMP file
exports.download = function(req, res) {
  var file = __dirname + '/../TMP/index.html';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.on('data', function(chunk) {
    res.write(chunk);
  });
  filestream.on('end', function() {
    res.end();
  });
}
/**/// Public: index
/**///
/**/// Args
/**/// req    - request object
/**/// res    - response object
/**///
/**/// Returns
/**/// return - GET index.jade
exports.index = function(req, res) {
  // Delete from TMP folder
  rmDir('./TMP')
  res.render('index', { title: 'TerrorDoc', fixed:false})
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
    // save to TMP
    if (data.length > 0) {
      //buildHtml(data)
      require('../lib/buildhtml')(data)
    }
    res.render('display', {title:'TerrorDoc', docs: data, fixed:true})
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
