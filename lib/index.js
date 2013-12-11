var _ = require('underscore');

module.exports = Tarjan = function(graph) {
  this.graph = graph;
  
  var index = 0;
  var stack = [];

  this.index = function() {
    return index;
  };

  this.increment = function() {
    ++index;
  };

  this.decrement = function() {
    --index;
  };

  this.contains = function(item) {
    return _.contains(stack, item);
  };

  this.length = function() {
    return stack.length;
  };

  this.push = function(item) {
    stack.push(item);
  };

  this.pop = function() {
    return stack.pop();
  };

  this.scc = [];
};

Tarjan.prototype = {
  run: function() {
    var children = this.graph.children;
    for (var i = 0, l = children.length; i < l; ++i) {
      if (children[i].index === undefined) {
        this.cycles(children[i]);
      }
    }
  },

  cycles: function(v) {
    v.index = this.index();
    v.lowlink = this.index();

    this.increment();

    this.push(v);

    for (var w in v.children) {
      w = v.children[w];

      if (w.index === undefined) {
        this.cycles(w);
        v.lowlink = Math.min(v.lowlink, w.lowlink);
      } else if (this.contains(w)) {
        v.lowlink = Math.min(v.lowlink, w.lowlink);
      }
    }

    if (v.lowlink === v.index) {
      var vertices = [];
      var w;
      if (this.length()) {
        do {
          w = this.pop();
          vertices.push(w);
        } while (!_.isEqual(v, w));
      }
      this.scc.push(vertices);
    }
  }
};

