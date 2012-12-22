var docList = []
  , section = function(privPub, name, argList, ret, notes) {
    this.privPub = privPub  || ''
    this.name    = name     || ''
    this.argList = argList  || []
    this.ret     = ret      || ''
    this.notes   = notes    || ''
  }

function startsWith(str, pattern) {
  return str.slice(0, pattern.length) == pattern
}

function buildParsed(lines, pos) {
  /**/// Public: does_something
  /**///
  /**/// Args
  /**/// arg1 - the_arg_value
  /**/// arg2 - the_arg_value
  /**///
  /**/// Returns
  /**/// return - the_return_value
  var currentDoc  = null
    , argMark     = false
    , returnMark  = false
    , noteMark    = false
  for (i=0;i<pos.length;i++) {
    var line = lines[pos[i]]
    console.log(line)
    //handle initial line
    if (  line.indexOf('Public')  > 0
       || line.indexOf('Private') > 0) {
      // if the object exists, it means we are at a new object so push the first
      if (currentDoc)
        docList.push(currentDoc)
      // start a new object
      var priv    = (line.indexOf('Public') > 0) ? 'Public' : 'Private'
        , split   = line.split(':')
        , name    = split[1]
      currentDoc  = new section(priv, name)
    } else if (line.indexOf('Args') > 0) {
      console.log('args was true')
      argMark = true
    } else if (line.indexOf('Returns') > 0) {
      console.log('returns was true')
      returnMark = true
    } else if (line.indexOf('Notes') > 0) {
      noteMark = true
    } else {
      var j = i
      while (argMark) {
        var argLine = lines[pos[j]]
        console.log('[ARG]'+argLine)
        if (argLine) {
          if (  argLine.indexOf('Returns') > 0
             || argLine.indexOf('Notes')   > 0
             || argLine.indexOf('Public')  > 0
             || argLine.indexOf('Private') > 0) {
            argMark = false
            i = j - 1
          } else {
            currentDoc.argList.push(argLine.replace('/**/// ',''))
            j++
          }
        }
      }
      while (returnMark) {
        var returnLine = lines[pos[j]]
        console.log(returnLine)
        if (returnLine) {
          if (  returnLine.indexOf('Notes')   > 0
             || returnLine.indexOf('Public')  > 0
             || returnLine.indexOf('Private') > 0) {
            returnMark = false
            i = j - 1
          } else {
            currentDoc.ret += returnLine.replace('/**/// ','')
            j++
          }
        } else {
          i = j - 1
          returnMark = false
        }
      }
      while (noteMark) {
        var noteLine = lines[pos[j]]
        console.log(noteLine)
        if (noteLine) {
          if (  noteLine.indexOf('Public')  > 0
             || noteLine.indexOf('Private') > 0) {
            noteMark = false
            i = j - 1
          } else {
            currentDoc.notes += noteLine.replace('/**/// ','')
            j++
          }
        }
      }
    }
  } // END for
  if (currentDoc)
    docList.push(currentDoc)

  /*
    DEBUG
  */
  console.log(docList)
  for (k=0;k<docList[0].argList.length;k++)
    console.log(docList[0].argList[k])
}

function parser(str) {
  var lines = str.split('\n')
    , pos   = []
  for (i=0;i<lines.length;i++)
    if (startsWith(lines[i], '/**/// '))
      pos.push(i)
  if (pos.length > 0)
    buildParsed(lines, pos)
}

var TerrorParser = function() {
  // theres gotta be a correct way to do this.....
  this.x = null
}
TerrorParser.prototype.Parse = function(fileContents) {
  parser(fileContents)
  var page = ''
  // for each file write out a html header with the file name
  for (var i=0;i<docList.length;i++) {

  }
  if (page != '') {

  } else {

  }
  // for each file parse the file looking for /**/// and grab the lines
  //split file to array

  // parse the public/private line
  // parse the args
  // parse the returns

  // write the public private out to a line
  // write the args out to a ul
  // write the return out to a ul

  // display that ish
}

module.exports = TerrorParser