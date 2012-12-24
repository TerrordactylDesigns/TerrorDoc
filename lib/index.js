/*
Copyright (C) 2012 Michael Belardo (http://GPlus.to/TerrorDactylDesigns)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**/// GLOBALS
var docList = []
  , section = function(privPub, name, argList, ret, notes) {
    this.privPub = privPub  || ''
    this.name    = name     || ''
    this.argList = argList  || []
    this.ret     = ret      || ''
    this.notes   = notes    || ''
  }
/**/// Private: startsWith
/**///
/**/// Args
/**/// str      - string to test against
/**/// pattern  - string pattern to check at beginning of str
/**///
/**/// Returns
/**/// return   - boolean value of pattern match result
function startsWith(str, pattern) {
  return str.slice(0, pattern.length) == pattern
}
/**/// Private: buildParsed
/**///
/**/// Args
/**/// lines  - array of all lines
/**/// pos    - array of positions that lines contains the pattern
/**///
/**/// Notes
/**/// note   - fills docList array by building section objects based on parsing
/**///          rules
function buildParsed(lines, pos) {
  // EXAMPLE DOC
  /**/// Public: does_something
  /**///
  /**/// Args
  /**/// arg1 - the_arg_value
  /**/// arg2 - the_arg_value
  /**///
  /**/// Returns
  /**/// return - the_return_value
  /**///
  /**/// Notes
  /**/// note - note_multi_line_requires
  /**///        a_set_of_doc_markers
  var currentDoc  = null
    , argMark     = false
    , returnMark  = false
    , noteMark    = false
  for (i=0;i<pos.length;i++) {
    var line = lines[pos[i]]
    //handle initial line
    if (  line.indexOf('Public')  > 0
       || line.indexOf('Private') > 0) {
      // if the object exists, we are at a new object so push the current
      if (currentDoc)
        docList.push(currentDoc)
      // start a new object
      var priv    = (line.indexOf('Public') > 0) ? 'Public' : 'Private'
        , split   = line.split(':')
        , name    = split[1].trim()
      currentDoc  = new section(priv, name)
    } else if (line.indexOf('Args') > 0) {
      argMark = true
    } else if (line.indexOf('Returns') > 0) {
      returnMark = true
    } else if (line.indexOf('Notes') > 0) {
      noteMark = true
    } else {
      var j = i
      while (argMark) {
        var argLine = lines[pos[j]]
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
        if (noteLine) {
          if (  noteLine.indexOf('Public')  > 0
             || noteLine.indexOf('Private') > 0) {
            noteMark = false
            i = j - 1
          } else {
            currentDoc.notes += noteLine.replace('/**/// ','')
            j++
          }
        } else {
          i = j -1
          noteMark = false
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

  return docList
}
/**/// Private: parser
/**///
/**/// Args
/**/// str  - string value of the entire file contents
/**///
/**/// Notes
/**/// Note - parses each line for TerrorDoc pattern and sends matching lines
/**///        to buildParsed
function parser(str) {
  var lines = str.split('\n')
    , pos   = []
  for (i=0;i<lines.length;i++)
    if (startsWith(lines[i], '/**/// '))
      pos.push(i)
  if (pos.length > 0)
    return buildParsed(lines, pos)
  else
    return docList
}
/**/// Public: TerrorParser
/**///
/**/// Args
/**/// fileContents - string of the read file
/**///
/**/// Returns
/**/// return       - docList containing section objects
var TerrorParser = function() {
  if (arguments.length > 0)
    return parser(arguments[0])
}

module.exports = TerrorParser