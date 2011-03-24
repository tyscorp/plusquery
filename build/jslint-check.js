var JSLINT = require("./lib/jslint").JSLINT,
	print = require("sys").print,
	src = require("fs").readFileSync("dist/_plusquery.js", "utf8");

JSLINT(src, { evil: true, forin: true, maxerr: 100 });

var e = JSLINT.errors, w;

for ( var i = 0; i < e.length; i++ ) {
	w = e[i];
	print( "    Problem at line " + w.line + " character " + w.character + ": " + w.reason );
	print( "\n\t" + w.evidence.replace(/^\s*((?:[\S\s]*\S)?)\s*$/, '$1') + "\n" );	
}

if ( e.length > 0 ) {
	print( "\n" + e.length + " Error(s) found.\n" );

} else {
	print( "JSLint check passed.\n" );
}
