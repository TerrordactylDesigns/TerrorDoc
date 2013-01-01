var TerrorParser  = require('terrorparser')
  , fs            = require('fs')
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
      , outputFolder  = (opts['output']) ? opts['input'] + '/' + opts['output']
                                         : opts['input'] + '/Docs'
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
          console.log(opts['input'] + folderfiles[i])
          // TODO
          // were only going one folder deep for now
          for (var j=0;j<subfiles.length;j++)
            if (subfiles[j].indexOf('.js') > -1)
              files.push(folderfiles[i] + '/' + subfiles[j])
        } else {
          if (folderfiles[i].indexOf('.js') > -1 || folderfiles[i].toLowerCase() === 'package.json')
            files.push(folderfiles[i])
        }
      }
      if (files.length > 0)
        parseAndSave(files, outputFolder, opts)
    }
  }
}
/**/// Private: parseAndSave
/**///
/**/// Args
/**/// files  - array of files
/**/// output - output filepath
function parseAndSave(files, output, opts) {
  console.log(files)
  for (var i=0;i<files.length;i++) {
    if (files[i] !== 'package.json') {
      saveFile(files[i], output, opts)
    } else {

    }
  }
}
/**/// Private: saveFile
/**///
/**/// Args
/**/// data   - parsed terrordoc object
/**/// output - output filepath
function saveFile(data, output, opts) {
  var parsed    = TerrorParser(fs.readFileSync(opts['input'] + '/' + data, 'utf8'))
    , filename  = data.replace('.js', '.html').replace('/', '.')
  // make sure the folder exists
  if (!fs.existsSync()) {
    try {
      fs.mkdirSync(output)
    } catch(err) { /* do nothing for now */ }
  }
  var html = require('./buildhtml')(parsed, output + '/' + filename)
}

module.exports = Generate
