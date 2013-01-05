var TerrorParser  = require('terrorparser')
  , fs            = require('fs')
  , htmlBuilder   = require('./buildhtml')
/**/// Public: Generate
/**///
/**/// Args
/**/// opts - options object
/**///
/**/// Notes
/**/// note - build documents
var Generate = function(opts) {
  // make sure theres an input path
  if (opts['input']) {
    var folderfiles   = []
      , subfiles      = []
      , files         = []
      , parsedobj     = {}
      , outputFolder  = (opts['output']) ? opts['input'] + '/' + opts['output']
                                         : opts['input'] + '/docs'
    // go through the folder and doc it up
    try {
      folderfiles = fs.readdirSync(opts['input'])
    } catch(err) { /* do nothing for now */ }
    if (folderfiles.length > 0) {
      for (var i=0;i<folderfiles.length;i++) {
        var stat = fs.statSync(opts['input'] + '/' + folderfiles[i])
        // test to see if its a subfolder to go through
        if (stat && stat.isDirectory() && folderfiles[i] !== 'node_modules') {
          // parse the sub docs
          try {
            subfiles = fs.readdirSync(opts['input'] + '/' + folderfiles[i])
          } catch(err) { /* do nothing for now */ }
          // TODO
          // im only going one folder deep for now
          // fix that you lazy sack.....
          for (var j=0;j<subfiles.length;j++)
            if (subfiles[j].indexOf('.js') > -1)
              files.push(folderfiles[i] + '/' + subfiles[j])
        } else {
          if (folderfiles[i].indexOf('.js') > -1 || folderfiles[i].toLowerCase() === 'package.json')
            files.push(folderfiles[i])
        }
      }
      if (files.length > 0) {
        for (var k=0;k<files.length;k++) {
          var nm      = files[k]
            , file    = fs.readFileSync(opts['input'] + '/' + nm, 'utf8')
            , parsed  = null
          console.log('[PARSING]: ' + nm)
          parsed = TerrorParser(file)
          console.log('[PARSED]')
          if (parsed) {
            parsedobj[nm] = parsed
          }
        }
      }
      if (parsedobj != {}) {
        // make sure the output folder exists
        if (!fs.existsSync()) {
          try {
            fs.mkdirSync(outputFolder)
          } catch(err) { /* do nothing for now */ }
        }
        for (x in parsedobj) {
          var pathandfile = outputFolder + '/' + x.replace('.js', '.html').replace('/', '.')
          console.log('[SAVING DOC] : ' + pathandfile)
          htmlBuilder(parsedobj[x], pathandfile)
        }
      }
    }
  }
}

module.exports = Generate
