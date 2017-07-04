(function() {
  var _ = function(element) {
    var u = {
      first: function() {
        return element[0];
      },

      last: function() {
        return element[element.length - 1];
      },

      without: function() {
        var args = Array.prototype.slice.call(arguments),
            result = [];
        element.forEach(function(el) {
          if (args.indexOf(el) === -1) {
            result.push(el);
          }
        });
        return result;  
      },

      lastIndexOf: function(target) {
        var index = -1;
        for (var i = element.length - 1; i >= 0; i -= 1) {
          if (target === element[i]) {
            index = i;
            break;
          }
        }

        return index;
      },

      sample: function(quantity) {
        var copy = element.slice(),
            index,
            result;

        if (quantity) {
          result = [];
          for (var i = quantity; i > 0; i -= 1) {
            index = Math.floor(Math.random() * copy.length);
            result.push(copy[index]);
            copy.splice(index, 1);
          }
        } else {
          index = Math.floor(Math.random() * copy.length);
          result = copy[index];
        }

        return result;
      },

      findWhere: function(target) {
        var result = undefined;

        match = function(el) {
          for (var prop in target) {
            if (target[prop] !== el[prop]) {
              return false;
            }
          }
          result = el;
          return true;
        }

        element.some(match);
        return result;
      }, 


      where: function(target) {
        var result = [];

        match = function(el) {
          for (var prop in target) {
            if (target[prop] !== el[prop]) {
              return;
            }
          }

          result.push(el);
        }

        element.forEach(match);
        return result;
      },

      pluck: function(prop) {
        var result = [];  
        element.forEach(function(el) {
          if (el[prop]) {
            result.push(el[prop]);
          }
        });

        return result;
      },

      keys: function() {
        return Object.getOwnPropertyNames(element);
      }, 

      values: function() {
        var result = [];

        var keys = Object.getOwnPropertyNames(element);

        return keys.map(function(key) {
          return element[key];
        })
      }, 

      pick: function() {
        var result = {};
        for (var i = 0; i < arguments.length; i += 1) {
          var prop = arguments[i];
          result[prop] = element[prop];
        }

        return result;
      },

      omit: function() {
        var result = {},
            arg = Array.prototype.slice.call(arguments);
        for (var prop in element) {
          if (arg.indexOf(prop) === -1) {
            result[prop] = element[prop];
          }
        }

        return result;
      },

      has: function(prop) {
        return (prop in element)
      }, 

      isElement: function(element) {
        return element.nodeType === Node.ELEMENT_NODE;
      },

      isArray: function(element) {
        return Array.isArray(element);
      },

      isObject: function(element) {
        var test = Object.prototype.toString.call(element);
        return test === "[object Object]" || test === "[object Function]" || test === "[object Array]";
      },

      isFunction: function(element) {
        var test = Object.prototype.toString.call(element);
        return test === "[object Function]";
      },

      isBoolean: function(element) {
        return Object.prototype.toString.call(element) === "[object Boolean]" || typeof element === "boolean";
      },

      isString: function(element) {
        return Object.prototype.toString.call(element) === "[object String]" || typeof element === "string"
      },

      isNumber: function(element) {
        return Object.prototype.toString.call(element) === "[object Number]" || typeof element === "number";
      }


    }

    return u;
  }

  _.range = function() {
    var result = [];

    if (arguments.length === 1) {
      for (var i = 0; i < arguments[0]; i++) {
        result.push(i);
      }
    } else {
      for (var i = arguments[0]; i < arguments[1]; i++ ) {
        result.push(i);
      }
    }
    return result;
  }

  _.extend = function() {
    for (var i = arguments.length - 1; i >= 1; i -= 1) {
      var source = arguments[i];
      var target = arguments[i - 1];

      for (var prop in source) {
        target[prop] = source[prop];
      }
    }
    return arguments[0];
  }

  _.isElement = function(element) {
    return element.nodeType === Node.ELEMENT_NODE;
  }

  _.isArray = function(element) {
    return Array.isArray(element);
  }

  _.isObject = function(element) {
    var test = Object.prototype.toString.call(element);
    return test === "[object Object]" || test === "[object Function]" || test === "[object Array]";
  }

  _.isFunction = function(element) {
    var test = Object.prototype.toString.call(element);
    return test === "[object Function]";
  },

  _.isBoolean = function(element) {
    return Object.prototype.toString.call(element) === "[object Boolean]" || typeof element === "boolean";
  }

  _.isString = function(element) {
    return Object.prototype.toString.call(element) === "[object String]" || typeof element === "string";
  }

  _.isNumber = function(element) {
    return Object.prototype.toString.call(element) === "[object Number]" || typeof element === "number";
  }




  window._ = _;
})();