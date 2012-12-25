module.exports = [
  { privPub: 'Public',
    name: 'TerrorParser',
    argList: [ 'fileContents - string of the read file' ],
    ret: 'return       - docList containing section objects',
    notes: '' },
  { privPub: 'Private',
    name: 'buildParsed',
    argList:
     [ 'lines  - array of all lines',
       'pos    - array of positions that lines contains the pattern' ],
    ret: '',
    notes: 'note   - fills docList array by building section objects based on parsing         rules' }
]