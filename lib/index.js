/**/// Public: Parser for my flavor of doc
/**///
/**/// Returns
/**/// return - output of docs with option to save as html
var TerrorParser = function() {

}
/**/// Public: does_something
/**///
/**/// Args
/**/// fileContents - the contents of your file in string format
/**///
/**/// Returns
/**/// return - output of docs with option to save as html
TerrorParser.prototype.Parse = function(fileContents) {
  // for each file write out a html header with the file name

  // for each file parse the file looking for /**/// and grab the lines
  // parse the public/private line
  // parse the args
  // parse the returns

  // write the public private out to a line
  // write the args out to a ul
  // write the return out to a ul

  // display that ish
}

module.exports = TerrorParser