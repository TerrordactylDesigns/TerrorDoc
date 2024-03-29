function buildSection(doc) {
  var section = '<div class="fullsection"><h3 class="sectiontitle serif">' + doc.name + ' - <span>'+doc.privPub+'</span></h3>'
  if (doc.argList.length > 0) {
    section += '<div class="section"><h4 class="sectiontitle serif">Arguments:</h4><ul>'
    for (var i=0;i<doc.argList.length;i++) {
      section += '<li>'+doc.argList[i]+'</li>'
    }
    section += '</ul></div>'
  }
  if (doc.ret != '')
    section += '<div class="section"><h4 class="sectiontitle serif">Returns:</h4><p>'+doc.ret+'</p></div>'
  if (doc.notes != '')
    section += '<div class="section"><h4 class="sectiontitle serif">Notes:</h4><p>'+doc.notes+'</p></div>'
  section += '</div>'
  return section
}

var BuildHtml = function(docs, writePath) {
  var start     = '<!DOCTYPE html><html><head><title>TerrorDoc</title><style type="text/css">html,body,div,span,object,iframe,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,form,label,caption,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video{border:0;outline:0;font-size:100%;background:transparent;margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}nav ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:none}a{font-size:100%;vertical-align:baseline;background:transparent;margin:0;padding:0}ins{background-color:#ff9;color:#000;text-decoration:none}mark{background-color:#ff9;color:#000;font-style:italic;font-weight:700}del{text-decoration:line-through}abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}table{border-collapse:collapse;border-spacing:0}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}input,select{vertical-align:middle}html, body {height:100%}.serif { font-family: Georgia, serif }.sansserif { font-family: \'Lucida Grande\', Helvetica, Arial, sans-serif }#logo h1 { margin:0;padding:0; font-size:5em; font-family: Times, serif; color:#CCC;letter-spacing: .1em}#logo h1:hover {-moz-text-shadow: 0px 0px 30px #CFCFCF;-webkit-text-shadow: 0px 0px 30px #CFCFCF;text-shadow: 0px 0px 30px #CFCFCF}#footer, #push { height: 150px; clear:both }#footer {text-align:center;width:960px;margin:0 auto}#footer p {color:#CCC;padding-top:4em}#footer a { color:#CCC }.sociallink { padding:.3em; margin-left: .3em;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;} .sociallink:hover {background: #F1F1F1;}body { font-family: \'Lucida Grande\', Helvetica, Arial, sans-serif}#wrapper {width: 960px;min-height: 100%; height: auto !important; height: 100%;margin: 0 auto -150px}* {-webkit-transition: all 0.2s ease;-moz-transition:    all 0.2s ease;-ms-transition:     all 0.2s ease}ul { list-style: none }a { text-decoration: none }.fullsection {color: #BBB;padding:1em;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;border-bottom: 1px dotted #DDD} .fullsection:hover { background:#F9F9F9;-moz-box-shadow: 0px 0px 8px #DFDFDF;-webkit-box-shadow: 0px 0px 8px #DFDFDF;box-shadow: 0px 0px 8px #DFDFDF}.sectiontitle { color:#999 }h3.sectiontitle span { color:#DDD; font-family: \'Lucida Grande\', Helvetica, Arial, sans-serif} h3.sectiontitle span:hover {-moz-text-shadow: 0px 0px 8px #DFDFDF;-webkit-text-shadow: 0px 0px 8px #DFDFDF;text-shadow: 0px 0px 8px #DFDFDF}.section ul li { margin-bottom:.3em }#downloads {margin-top: .9em;font-size: 1.5em;}.downloadlink {color: #CCC;padding:.3em; margin-left: .3em;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;} .downloadlink:hover {background: #F1F1F1;}</style></head><body><div id="wrapper"><header id="pageheader" class="container"><div id="logo"><a href="/"><h1>TerrorDoc</h1></a></div></header><div id="main-content"><div id="displaypage">'
    , sections  = []
    , end       = '</div></div></div><div id="push"></div></div><div id="footer"><p>Written by:<a href="https://github.com/TerrordactylDesigns">TerrordactylDesigns</a></p></div></body></html>'
    , build     = []
    , fs        = require('fs')
    , complete  = ''
    , writePath = (writePath) ? writePath : './TMP/index.html'
  sections.push(start)
  for (var i=0;i<docs.length;i++)
    sections.push(buildSection(docs[i]))
  sections.push(end)
  complete = sections.join('')
  fs.writeFile(writePath, complete, function(err) {
    if (err) {
      console.log('[ FILE SAVE ERROR ]: ' + err)
    }
  })
  return complete
}

module.exports = BuildHtml