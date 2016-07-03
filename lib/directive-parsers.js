var regex = {
  require: [
    /(\/\/=)\s*(require)\s+(\S+)/,
    /(#=)\s*(require)\s+(\S+)/,
  ],
  requireTree: [
    /(\/\/=)\s*(require_tree)\s+(\S+)/,
    /(#=)\s*(require_tree)\s+(\S+)/,
  ],
  requireDirectory: [],
  requireSelf: [],
};

function parseDirective(directives) {
  return function parsingDirective(line) {
    return directives
      .map(function(directive) { return directive.exec(line); })
      .find(function(matches) { return matches; });
  };
}

module.exports = {
  require: parseDirective(regex.require),
  requireTree: parseDirective(regex.requireTree),
  requireDirectory: parseDirective(regex.requireDirectory),
  requireSelf: parseDirective(regex.requireSelf),
};
