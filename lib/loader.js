var parsers = require('./directive-parsers.js');
var transformers = require('./directive-transformers.js');

// Avoid using `bundle` inside webpack by passing all gem paths as an env
if (!process.env.IMPORTANT_JS_GEM_PATHS) {
  require('./utils/bundler-check.js')();
}

module.exports = function(source) {
  this.cacheable();
  var context = this.context;

  var lineParseReducer = function(outputLines, line) {
    var requireMatches = parsers.require(line);
    if (requireMatches) return outputLines.concat(transformers.require(context, requireMatches[3]));

    var requireTreeMatches = parsers.requireTree(line);
    if (requireTreeMatches) return outputLines.concat(transformers.requireTree(context, requireTreeMatches[3]));

    var requireDirectoryMatches = parsers.requireDirectory(line);
    if (requireDirectoryMatches) return outputLines.concat(transformers.requireDirectory(context, requireDirectoryMatches[3]));

    var requireSelfMatches = parsers.requireSelf(line);
    if (requireSelfMatches) return outputLines.concat(transformers.requireSelf(source));

    return outputLines.concat(line);
  };

  // This could be slow since it always goes through all the lines
  output = source.split('\n').reduce(lineParseReducer, []).join('\n');
  return output;
};
