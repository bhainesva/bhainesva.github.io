/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/state.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/state.css ***!
  \*************************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.id, "iframe {\n  height: 400px;\n  width: 100%;\n  background: black;\n}", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./src/state.html":
/*!************************!*\
  !*** ./src/state.html ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "state.html";

/***/ }),

/***/ "./node_modules/flyd-forwardto/forwardto.js":
/*!**************************************************!*\
  !*** ./node_modules/flyd-forwardto/forwardto.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var flyd = __webpack_require__(/*! flyd */ "./node_modules/flyd-forwardto/node_modules/flyd/lib/index.js");

module.exports = flyd.curryN(2, function(targ, fn) {
  var s = flyd.stream();
  flyd.map(function(v) { targ(fn(v)); }, s);
  return s;
});


/***/ }),

/***/ "./node_modules/flyd-forwardto/node_modules/flyd/lib/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/flyd-forwardto/node_modules/flyd/lib/index.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var curryN = __webpack_require__(/*! ramda/src/curryN */ "./node_modules/flyd-forwardto/node_modules/ramda/src/curryN.js");

'use strict';

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

// Globals
var toUpdate = [];
var inStream;

function map(f, s) {
  return stream([s], function(self) { self(f(s.val)); });
}

function on(f, s) {
  return stream([s], function() { f(s.val); });
}

function boundMap(f) { return map(f, this); }

var scan = curryN(3, function(f, acc, s) {
  var ns = stream([s], function() {
    return (acc = f(acc, s()));
  });
  if (!ns.hasVal) ns(acc);
  return ns;
});

var merge = curryN(2, function(s1, s2) {
  var s = immediate(stream([s1, s2], function(n, changed) {
    return changed[0] ? changed[0]()
         : s1.hasVal  ? s1()
                      : s2();
  }));
  endsOn(stream([s1.end, s2.end], function(self, changed) {
    return true;
  }), s);
  return s;
});

function ap(s2) {
  var s1 = this;
  return stream([s1, s2], function() { return s1()(s2()); });
}

function initialDepsNotMet(stream) {
  stream.depsMet = stream.deps.every(function(s) {
    return s.hasVal;
  });
  return !stream.depsMet;
}

function updateStream(s) {
  if ((s.depsMet !== true && initialDepsNotMet(s)) ||
      (s.end !== undefined && s.end.val === true)) return;
  if (inStream !== undefined) {
    toUpdate.push(s);
    return;
  }
  inStream = s;
  var returnVal = s.fn(s, s.depsChanged);
  if (returnVal !== undefined) {
    s(returnVal);
  }
  inStream = undefined;
  if (s.depsChanged !== undefined) s.depsChanged = [];
  s.shouldUpdate = false;
  if (flushing === false) flushUpdate();
}

var order = [];
var orderNextIdx = -1;

function findDeps(s) {
  var i, listeners = s.listeners;
  if (s.queued === false) {
    s.queued = true;
    for (i = 0; i < listeners.length; ++i) {
      findDeps(listeners[i]);
    }
    order[++orderNextIdx] = s;
  }
}

function updateDeps(s) {
  var i, o, list, listeners = s.listeners;
  for (i = 0; i < listeners.length; ++i) {
    list = listeners[i];
    if (list.end === s) {
      endStream(list);
    } else {
      if (list.depsChanged !== undefined) list.depsChanged.push(s);
      list.shouldUpdate = true;
      findDeps(list);
    }
  }
  for (; orderNextIdx >= 0; --orderNextIdx) {
    o = order[orderNextIdx];
    if (o.shouldUpdate === true) updateStream(o);
    o.queued = false;
  }
}

var flushing = false;

function flushUpdate() {
  flushing = true;
  while (toUpdate.length > 0) {
    var s = toUpdate.shift();
    if (s.vals.length > 0) s.val = s.vals.shift();
    updateDeps(s);
  }
  flushing = false;
}

function isStream(stream) {
  return isFunction(stream) && 'hasVal' in stream;
}

function streamToString() {
  return 'stream(' + this.val + ')';
}

function updateStreamValue(s, n) {
  if (n !== undefined && n !== null && isFunction(n.then)) {
    n.then(s);
    return;
  }
  s.val = n;
  s.hasVal = true;
  if (inStream === undefined) {
    flushing = true;
    updateDeps(s);
    if (toUpdate.length > 0) flushUpdate(); else flushing = false;
  } else if (inStream === s) {
    markListeners(s, s.listeners);
  } else {
    s.vals.push(n);
    toUpdate.push(s);
  }
}

function markListeners(s, lists) {
  var i, list;
  for (i = 0; i < lists.length; ++i) {
    list = lists[i];
    if (list.end !== s) {
      if (list.depsChanged !== undefined) {
        list.depsChanged.push(s);
      }
      list.shouldUpdate = true;
    } else {
      endStream(list);
    }
  }
}

function createStream() {
  function s(n) {
    return arguments.length > 0 ? (updateStreamValue(s, n), s)
                                : s.val;
  }
  s.hasVal = false;
  s.val = undefined;
  s.vals = [];
  s.listeners = [];
  s.queued = false;
  s.end = undefined;

  s.map = boundMap;
  s.ap = ap;
  s.of = stream;
  s.toString = streamToString;

  return s;
}

function addListeners(deps, s) {
  for (var i = 0; i < deps.length; ++i) {
    deps[i].listeners.push(s);
  }
}

function createDependentStream(deps, fn) {
  var s = createStream();
  s.fn = fn;
  s.deps = deps;
  s.depsMet = false;
  s.depsChanged = fn.length > 1 ? [] : undefined;
  s.shouldUpdate = false;
  addListeners(deps, s);
  return s;
}

function immediate(s) {
  if (s.depsMet === false) {
    s.depsMet = true;
    updateStream(s);
  }
  return s;
}

function removeListener(s, listeners) {
  var idx = listeners.indexOf(s);
  listeners[idx] = listeners[listeners.length - 1];
  listeners.length--;
}

function detachDeps(s) {
  for (var i = 0; i < s.deps.length; ++i) {
    removeListener(s, s.deps[i].listeners);
  }
  s.deps.length = 0;
}

function endStream(s) {
  if (s.deps !== undefined) detachDeps(s);
  if (s.end !== undefined) detachDeps(s.end);
}

function endsOn(endS, s) {
  detachDeps(s.end);
  endS.listeners.push(s.end);
  s.end.deps.push(endS);
  return s;
}

function trueFn() { return true; }

function stream(arg, fn) {
  var i, s, deps, depEndStreams;
  var endStream = createDependentStream([], trueFn);
  if (arguments.length > 1) {
    deps = []; depEndStreams = [];
    for (i = 0; i < arg.length; ++i) {
      if (arg[i] !== undefined) {
        deps.push(arg[i]);
        if (arg[i].end !== undefined) depEndStreams.push(arg[i].end);
      }
    }
    s = createDependentStream(deps, fn);
    s.end = endStream;
    endStream.listeners.push(s);
    addListeners(depEndStreams, endStream);
    endStream.deps = depEndStreams;
    updateStream(s);
  } else {
    s = createStream();
    s.end = endStream;
    endStream.listeners.push(s);
    if (arguments.length === 1) s(arg);
  }
  return s;
}

var transduce = curryN(2, function(xform, source) {
  xform = xform(new StreamTransformer());
  return stream([source], function(self) {
    var res = xform['@@transducer/step'](undefined, source());
    if (res && res['@@transducer/reduced'] === true) {
      self.end(true);
      return res['@@transducer/value'];
    } else {
      return res;
    }
  });
});

function StreamTransformer() { }
StreamTransformer.prototype['@@transducer/init'] = function() { };
StreamTransformer.prototype['@@transducer/result'] = function() { };
StreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };

module.exports = {
  stream: stream,
  isStream: isStream,
  transduce: transduce,
  merge: merge,
  scan: scan,
  endsOn: endsOn,
  map: curryN(2, map),
  on: curryN(2, on),
  curryN: curryN,
  immediate: immediate,
};


/***/ }),

/***/ "./node_modules/flyd-forwardto/node_modules/ramda/src/curryN.js":
/*!**********************************************************************!*\
  !*** ./node_modules/flyd-forwardto/node_modules/ramda/src/curryN.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = __webpack_require__(/*! ./internal/_arity */ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_arity.js");
var _curry1 = __webpack_require__(/*! ./internal/_curry1 */ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curry1.js");
var _curry2 = __webpack_require__(/*! ./internal/_curry2 */ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curry2.js");
var _curryN = __webpack_require__(/*! ./internal/_curryN */ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curryN.js");


/**
 * Returns a curried equivalent of the provided function, with the
 * specified arity. The curried function has two unusual capabilities.
 * First, its arguments needn't be provided one at a time. If `g` is
 * `R.curryN(3, f)`, the following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`,
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var addFourNumbers = function() {
 *        return R.sum([].slice.call(arguments, 0, 4));
 *      };
 *
 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});


/***/ }),

/***/ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_arity.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_arity.js ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = function _arity(n, fn) {
  // jshint unused:vars
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};


/***/ }),

/***/ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curry1.js":
/*!********************************************************************************!*\
  !*** ./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curry1.js ***!
  \********************************************************************************/
/***/ ((module) => {

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0) {
      return f1;
    } else if (a != null && a['@@functional/placeholder'] === true) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};


/***/ }),

/***/ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curry2.js":
/*!********************************************************************************!*\
  !*** ./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curry2.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 = __webpack_require__(/*! ./_curry1 */ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curry1.js");


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
  return function f2(a, b) {
    var n = arguments.length;
    if (n === 0) {
      return f2;
    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
      return f2;
    } else if (n === 1) {
      return _curry1(function(b) { return fn(a, b); });
    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
                          b != null && b['@@functional/placeholder'] === true) {
      return f2;
    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
      return _curry1(function(a) { return fn(a, b); });
    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
      return _curry1(function(b) { return fn(a, b); });
    } else {
      return fn(a, b);
    }
  };
};


/***/ }),

/***/ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curryN.js":
/*!********************************************************************************!*\
  !*** ./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_curryN.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = __webpack_require__(/*! ./_arity */ "./node_modules/flyd-forwardto/node_modules/ramda/src/internal/_arity.js");


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @return {array} An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 */
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (received[combinedIdx] == null ||
           received[combinedIdx]['@@functional/placeholder'] !== true ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (result == null || result['@@functional/placeholder'] !== true) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
};


/***/ }),

/***/ "./node_modules/flyd/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/flyd/lib/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var curryN = __webpack_require__(/*! ramda/src/curryN */ "./node_modules/flyd/node_modules/ramda/src/curryN.js");

// Utility
function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}
function trueFn() { return true; }

// Globals
var toUpdate = [];
var inStream;
var order = [];
var orderNextIdx = -1;
var flushingUpdateQueue = false;
var flushingStreamValue = false;

function flushing() {
  return flushingUpdateQueue || flushingStreamValue;
}


/** @namespace */
var flyd = {}

// /////////////////////////// API ///////////////////////////////// //

/**
 * Creates a new stream
 *
 * __Signature__: `a -> Stream a`
 *
 * @name flyd.stream
 * @param {*} initialValue - (Optional) the initial value of the stream
 * @return {stream} the stream
 *
 * @example
 * var n = flyd.stream(1); // Stream with initial value `1`
 * var s = flyd.stream(); // Stream with no initial value
 */
flyd.stream = function(initialValue) {
  var endStream = createDependentStream([], trueFn);
  var s = createStream();
  s.end = endStream;
  s.fnArgs = [];
  endStream.listeners.push(s);
  if (arguments.length > 0) s(initialValue);
  return s;
}
// fantasy-land Applicative
flyd.stream['fantasy-land/of'] = flyd.stream.of = flyd.stream;


/**
 * Create a new dependent stream
 *
 * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`
 *
 * @name flyd.combine
 * @param {Function} fn - the function used to combine the streams
 * @param {Array<stream>} dependencies - the streams that this one depends on
 * @return {stream} the dependent stream
 *
 * @example
 * var n1 = flyd.stream(0);
 * var n2 = flyd.stream(0);
 * var max = flyd.combine(function(n1, n2, self, changed) {
 *   return n1() > n2() ? n1() : n2();
 * }, [n1, n2]);
 */
flyd.combine = curryN(2, combine);
function combine(fn, streams) {
  var i, s, deps, depEndStreams;
  var endStream = createDependentStream([], trueFn);
  deps = []; depEndStreams = [];
  for (i = 0; i < streams.length; ++i) {
    if (streams[i] !== undefined) {
      deps.push(streams[i]);
      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
    }
  }
  s = createDependentStream(deps, fn);
  s.depsChanged = [];
  s.fnArgs = s.deps.concat([s, s.depsChanged]);
  s.end = endStream;
  endStream.listeners.push(s);
  addListeners(depEndStreams, endStream);
  endStream.deps = depEndStreams;
  updateStream(s);
  return s;
}

/**
 * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.
 *
 * __Signature__: `* -> Boolean`
 *
 * @name flyd.isStream
 * @param {*} value - the value to test
 * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise
 *
 * @example
 * var s = flyd.stream(1);
 * var n = 1;
 * flyd.isStream(s); //=> true
 * flyd.isStream(n); //=> false
 */
flyd.isStream = function(stream) {
  return isFunction(stream) && 'hasVal' in stream;
}

/**
 * Invokes the body (the function to calculate the value) of a dependent stream
 *
 * By default the body of a dependent stream is only called when all the streams
 * upon which it depends has a value. `immediate` can circumvent this behaviour.
 * It immediately invokes the body of a dependent stream.
 *
 * __Signature__: `Stream a -> Stream a`
 *
 * @name flyd.immediate
 * @param {stream} stream - the dependent stream
 * @return {stream} the same stream
 *
 * @example
 * var s = flyd.stream();
 * var hasItems = flyd.immediate(flyd.combine(function(s) {
 *   return s() !== undefined && s().length > 0;
 * }, [s]);
 * console.log(hasItems()); // logs `false`. Had `immediate` not been
 *                          // used `hasItems()` would've returned `undefined`
 * s([1]);
 * console.log(hasItems()); // logs `true`.
 * s([]);
 * console.log(hasItems()); // logs `false`.
 */
flyd.immediate = function(s) {
  if (s.depsMet === false) {
    s.depsMet = true;
    updateStream(s);
  }
  return s;
}

/**
 * Changes which `endsStream` should trigger the ending of `s`.
 *
 * __Signature__: `Stream a -> Stream b -> Stream b`
 *
 * @name flyd.endsOn
 * @param {stream} endStream - the stream to trigger the ending
 * @param {stream} stream - the stream to be ended by the endStream
 * @param {stream} the stream modified to be ended by endStream
 *
 * @example
 * var n = flyd.stream(1);
 * var killer = flyd.stream();
 * // `double` ends when `n` ends or when `killer` emits any value
 * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {
 *   return 2 * n();
 * }, [n]);
*/
flyd.endsOn = function(endS, s) {
  detachDeps(s.end);
  endS.listeners.push(s.end);
  s.end.deps.push(endS);
  return s;
}

/**
 * Map a stream
 *
 * Returns a new stream consisting of every value from `s` passed through
 * `fn`. I.e. `map` creates a new stream that listens to `s` and
 * applies `fn` to every new value.
 * __Signature__: `(a -> result) -> Stream a -> Stream result`
 *
 * @name flyd.map
 * @param {Function} fn - the function that produces the elements of the new stream
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);
 */
// Library functions use self callback to accept (null, undefined) update triggers.
function map(f, s) {
  return combine(function(s, self) { self(f(s.val)); }, [s]);
}
flyd.map = curryN(2, map)

/**
 * Chain a stream
 *
 * also known as flatMap
 *
 * Where `fn` returns a stream this function will flatten the resulting streams.
 * Every time `fn` is called the context of the returned stream will "switch" to that stream.
 *
 * __Signature__: `(a -> Stream b) -> Stream a -> Stream b`
 *
 * @name flyd.chain
 * @param {Function} fn - the function that produces the streams to be flattened
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var filter = flyd.stream('who');
 * var items = flyd.chain(function(filter){
 *   return flyd.stream(findUsers(filter));
 * }, filter);
 */
flyd.chain = curryN(2, chain);

/**
 * Apply a stream
 *
 * Applies the value in `s2` to the function in `s1`.
 *
 * __Signature__: `Stream (a -> b) -> Stream a -> Stream b`
 *
 * @name flyd.ap
 * @param {stream} s1 - The value to be applied
 * @param {stream} s2 - The function expecting the value
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var add = stream(a => b => a + b)
 * var n1 = stream(1)
 * var n2 = stream(2)
 *
 * var added = flyd.ap(n2, flyd.ap(n1, add)) // stream(3)
 * // can also be written using pipe
 * var added_pipe = add
 *   .pipe(ap(n1))
 *   .pipe(ap(n2));
 * added_pipe() // 3
 */
flyd.ap = curryN(2, ap);

/**
 * Listen to stream events
 *
 * Similar to `map` except that the returned stream is empty. Use `on` for doing
 * side effects in reaction to stream changes. Use the returned stream only if you
 * need to manually end it.
 *
 * __Signature__: `(a -> result) -> Stream a -> Stream undefined`
 *
 * @name flyd.on
 * @param {Function} cb - the callback
 * @param {stream} stream - the stream
 * @return {stream} an empty stream (can be ended)
 */
flyd.on = curryN(2, function(f, s) {
  return combine(function(s) { f(s.val); }, [s]);
})

/**
 * Creates a new stream with the results of calling the function on every incoming
 * stream with and accumulator and the incoming value.
 *
 * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`
 *
 * @name flyd.scan
 * @param {Function} fn - the function to call
 * @param {*} val - the initial value of the accumulator
 * @param {stream} stream - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var numbers = flyd.stream();
 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
 * numbers(2)(3)(5);
 * sum(); // 10
 */
flyd.scan = curryN(3, function(f, acc, s) {
  var ns = combine(function(s, self) {
    self(acc = f(acc, s.val));
  }, [s]);
  if (!ns.hasVal) ns(acc);
  return ns;
});

/**
 * Creates a new stream down which all values from both `stream1` and `stream2`
 * will be sent.
 *
 * __Signature__: `Stream a -> Stream a -> Stream a`
 *
 * @name flyd.merge
 * @param {stream} source1 - one stream to be merged
 * @param {stream} source2 - the other stream to be merged
 * @return {stream} a stream with the values from both sources
 *
 * @example
 * var btn1Clicks = flyd.stream();
 * button1Elm.addEventListener(btn1Clicks);
 * var btn2Clicks = flyd.stream();
 * button2Elm.addEventListener(btn2Clicks);
 * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
 */
flyd.merge = curryN(2, function(s1, s2) {
  var s = flyd.immediate(combine(function(s1, s2, self, changed) {
    if (changed[0]) {
      self(changed[0]());
    } else if (s1.hasVal) {
      self(s1.val);
    } else if (s2.hasVal) {
      self(s2.val);
    }
  }, [s1, s2]));
  flyd.endsOn(combine(function() {
    return true;
  }, [s1.end, s2.end]), s);
  return s;
});

/**
 * Creates a new stream resulting from applying `transducer` to `stream`.
 *
 * __Signature__: `Transducer -> Stream a -> Stream b`
 *
 * @name flyd.transduce
 * @param {Transducer} xform - the transducer transformation
 * @param {stream} source - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var t = require('transducers.js');
 *
 * var results = [];
 * var s1 = flyd.stream();
 * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());
 * var s2 = flyd.transduce(tx, s1);
 * flyd.combine(function(s2) { results.push(s2()); }, [s2]);
 * s1(1)(1)(2)(3)(3)(3)(4);
 * results; // => [2, 4, 6, 8]
 */
flyd.transduce = curryN(2, function(xform, source) {
  xform = xform(new StreamTransformer());
  return combine(function(source, self) {
    var res = xform['@@transducer/step'](undefined, source.val);
    if (res && res['@@transducer/reduced'] === true) {
      self.end(true);
      return res['@@transducer/value'];
    } else {
      return res;
    }
  }, [source]);
});

/**
 * Returns `fn` curried to `n`. Use this function to curry functions exposed by
 * modules for Flyd.
 *
 * @name flyd.curryN
 * @function
 * @param {Integer} arity - the function arity
 * @param {Function} fn - the function to curry
 * @return {Function} the curried function
 *
 * @example
 * function add(x, y) { return x + y; };
 * var a = flyd.curryN(2, add);
 * a(2)(4) // => 6
 */
flyd.curryN = curryN

/**
 * Returns a new stream identical to the original except every
 * value will be passed through `f`.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`
 *
 * @name stream.map
 * @param {Function} function - the function to apply
 * @return {stream} a new stream with the values mapped
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.map(function(n) { return n*n; });
 */
function boundMap(f) { return map(f, this); }

/**
 * Returns the result of applying function `fn` to this stream
 *
 * __Signature__: Called bound to `Stream a`: `(a -> Stream b) -> Stream b`
 *
 * @name stream.pipe
 * @param {Function} fn - the function to apply
 * @return {stream} A new stream
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.pipe(flyd.map(function(n){ return n*n; }));
 */
function operator_pipe(f) { return f(this) }

function boundChain(f) {
  return chain(f, this);
}

function chain(f, s) {
  // Internal state to end flat map stream
  var flatEnd = flyd.stream(1);
  var internalEnded = flyd.on(function() {
    var alive = flatEnd() - 1;
    flatEnd(alive);
    if (alive <= 0) {
      flatEnd.end(true);
    }
  });

  internalEnded(s.end);
  var last = flyd.stream();
  var flatStream = flyd.combine(function(s, own) {
    last.end(true)
    // Our fn stream makes streams
    var newS = f(s());
    flatEnd(flatEnd() + 1);
    internalEnded(newS.end);

    // Update self on call -- newS is never handed out so deps don't matter
    last = map(own, newS);
  }, [s]);

  flyd.endsOn(flatEnd.end, flatStream);

  return flatStream;
}

flyd.fromPromise = function fromPromise(p) {
  var s = flyd.stream();
  p.then(function(val) {
    s(val);
    s.end(true);
  });
  return s;
}

flyd.flattenPromise = function flattenPromise(s) {
  return combine(function(s, self) {
    s().then(self);
  }, [s])
}


/**
 * Returns a new stream which is the result of applying the
 * functions from `this` stream to the values in `stream` parameter.
 *
 * `this` stream must be a stream of functions.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`
 *
 * @name stream.ap
 * @param {stream} stream - the values stream
 * @return {stream} a new stream with the functions applied to values
 *
 * @example
 * var add = flyd.curryN(2, function(x, y) { return x + y; });
 * var numbers1 = flyd.stream();
 * var numbers2 = flyd.stream();
 * var addToNumbers1 = flyd.map(add, numbers1);
 * var added = addToNumbers1.ap(numbers2);
 */
function ap(s2, s1) {
  return combine(function(s1, s2, self) { self(s1.val(s2.val)); }, [s1, s2]);
}

function boundAp(s2) {
  return ap(s2, this);
}

/**
 * @private
 */
function fantasy_land_ap(s1) {
  return ap(this, s1);
}

/**
 * Get a human readable view of a stream
 * @name stream.toString
 * @return {String} the stream string representation
 */
function streamToString() {
  return 'stream(' + this.val + ')';
}

/**
 * @name stream.end
 * @memberof stream
 * A stream that emits `true` when the stream ends. If `true` is pushed down the
 * stream the parent stream ends.
 */

/**
 * @name stream.of
 * @function
 * @memberof stream
 * Returns a new stream with `value` as its initial value. It is identical to
 * calling `flyd.stream` with one argument.
 *
 * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`
 *
 * @param {*} value - the initial value
 * @return {stream} the new stream
 *
 * @example
 * var n = flyd.stream(1);
 * var m = n.of(1);
 */

// /////////////////////////// PRIVATE ///////////////////////////////// //
/**
 * @private
 * Create a stream with no dependencies and no value
 * @return {Function} a flyd stream
 */
function createStream() {
  function s(n) {
    if (arguments.length === 0) return s.val
    updateStreamValue(n, s)
    return s
  }
  s.hasVal = false;
  s.val = undefined;
  s.updaters = [];
  s.listeners = [];
  s.queued = false;
  s.end = undefined;

  // fantasy-land compatibility
  s.ap = boundAp;
  s['fantasy-land/map'] = s.map = boundMap;
  s['fantasy-land/ap'] = fantasy_land_ap;
  s['fantasy-land/of'] = s.of = flyd.stream;
  s['fantasy-land/chain'] = s.chain = boundChain;

  s.pipe = operator_pipe;

  // According to the fantasy-land Applicative specification
  // Given a value f, one can access its type representative via the constructor property:
  // `f.constructor.of`
  s.constructor = flyd.stream;

  s.toJSON = function() {
    return s.val;
  }
  s.toString = streamToString;
  return s;
}

/**
 * @private
 * Create a dependent stream
 * @param {Array<stream>} dependencies - an array of the streams
 * @param {Function} fn - the function used to calculate the new stream value
 * from the dependencies
 * @return {stream} the created stream
 */
function createDependentStream(deps, fn) {
  var s = createStream();
  s.fn = fn;
  s.deps = deps;
  s.depsMet = false;
  s.depsChanged = deps.length > 0 ? [] : undefined;
  s.shouldUpdate = false;
  addListeners(deps, s);
  return s;
}

/**
 * @private
 * Check if all the dependencies have values
 * @param {stream} stream - the stream to check depencencies from
 * @return {Boolean} `true` if all dependencies have vales, `false` otherwise
 */
function initialDependenciesMet(stream) {
  stream.depsMet = stream.deps.every(function(s) {
    return s.hasVal;
  });
  return stream.depsMet;
}

function dependenciesAreMet(stream) {
  return stream.depsMet === true || initialDependenciesMet(stream);
}

function isEnded(stream) {
  return stream.end && stream.end.val === true;
}

function listenersNeedUpdating(s) {
  return s.listeners.some(function(s) { return s.shouldUpdate; });
}

/**
 * @private
 * Update a dependent stream using its dependencies in an atomic way
 * @param {stream} stream - the stream to update
 */
function updateStream(s) {
  if (isEnded(s) || !dependenciesAreMet(s)) return;
  if (inStream !== undefined) {
    updateLaterUsing(updateStream, s);
    return;
  }
  inStream = s;
  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
  var returnVal = s.fn.apply(s.fn, s.fnArgs);
  if (returnVal !== undefined) {
    s(returnVal);
  }
  inStream = undefined;
  if (s.depsChanged !== undefined) s.depsChanged = [];
  s.shouldUpdate = false;
  if (flushing() === false) flushUpdate();
  if (listenersNeedUpdating(s)) {
    if (!flushingStreamValue) s(s.val)
    else {
      s.listeners.forEach(function(listener) {
        if (listener.shouldUpdate) updateLaterUsing(updateStream, listener);
      });
    }
  }
}

/**
 * @private
 * Update the dependencies of a stream
 * @param {stream} stream
 */
function updateListeners(s) {
  var i, o, list
  var listeners = s.listeners;
  for (i = 0; i < listeners.length; ++i) {
    list = listeners[i];
    if (list.end === s) {
      endStream(list);
    } else {
      if (list.depsChanged !== undefined) list.depsChanged.push(s);
      list.shouldUpdate = true;
      findDeps(list);
    }
  }
  for (; orderNextIdx >= 0; --orderNextIdx) {
    o = order[orderNextIdx];
    if (o.shouldUpdate === true) updateStream(o);
    o.queued = false;
  }
}

/**
 * @private
 * Add stream dependencies to the global `order` queue.
 * @param {stream} stream
 * @see updateDeps
 */
function findDeps(s) {
  var i
  var listeners = s.listeners;
  if (s.queued === false) {
    s.queued = true;
    for (i = 0; i < listeners.length; ++i) {
      findDeps(listeners[i]);
    }
    order[++orderNextIdx] = s;
  }
}

function updateLaterUsing(updater, stream) {
  toUpdate.push(stream);
  stream.updaters.push(updater);
  stream.shouldUpdate = true;
}

/**
 * @private
 */
function flushUpdate() {
  flushingUpdateQueue = true;
  while (toUpdate.length > 0) {
    var stream = toUpdate.shift();
    var nextUpdateFn = stream.updaters.shift();
    if (nextUpdateFn && stream.shouldUpdate) nextUpdateFn(stream);
  }
  flushingUpdateQueue = false;
}

/**
 * @private
 * Push down a value into a stream
 * @param {stream} stream
 * @param {*} value
 */
function updateStreamValue(n, s) {
  s.val = n;
  s.hasVal = true;
  if (inStream === undefined) {
    flushingStreamValue = true;
    updateListeners(s);
    if (toUpdate.length > 0) flushUpdate();
    flushingStreamValue = false;
  } else if (inStream === s) {
    markListeners(s, s.listeners);
  } else {
    updateLaterUsing(function(s) { updateStreamValue(n, s); }, s);
  }
}

/**
 * @private
 */
function markListeners(s, lists) {
  var i, list;
  for (i = 0; i < lists.length; ++i) {
    list = lists[i];
    if (list.end !== s) {
      if (list.depsChanged !== undefined) {
        list.depsChanged.push(s);
      }
      list.shouldUpdate = true;
    } else {
      endStream(list);
    }
  }
}

/**
 * @private
 * Add dependencies to a stream
 * @param {Array<stream>} dependencies
 * @param {stream} stream
 */
function addListeners(deps, s) {
  for (var i = 0; i < deps.length; ++i) {
    deps[i].listeners.push(s);
  }
}

/**
 * @private
 * Removes an stream from a dependency array
 * @param {stream} stream
 * @param {Array<stream>} dependencies
 */
function removeListener(s, listeners) {
  var idx = listeners.indexOf(s);
  listeners[idx] = listeners[listeners.length - 1];
  listeners.length--;
}

/**
 * @private
 * Detach a stream from its dependencies
 * @param {stream} stream
 */
function detachDeps(s) {
  for (var i = 0; i < s.deps.length; ++i) {
    removeListener(s, s.deps[i].listeners);
  }
  s.deps.length = 0;
}

/**
 * @private
 * Ends a stream
 */
function endStream(s) {
  if (s.deps !== undefined) detachDeps(s);
  if (s.end !== undefined) detachDeps(s.end);
}

/**
 * @private
 */
/**
 * @private
 * transducer stream transformer
 */
function StreamTransformer() { }
StreamTransformer.prototype['@@transducer/init'] = function() { };
StreamTransformer.prototype['@@transducer/result'] = function() { };
StreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };

module.exports = flyd;


/***/ }),

/***/ "./node_modules/flyd/node_modules/ramda/src/curryN.js":
/*!************************************************************!*\
  !*** ./node_modules/flyd/node_modules/ramda/src/curryN.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/flyd/node_modules/ramda/src/internal/_arity.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/flyd/node_modules/ramda/src/internal/_curry1.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/flyd/node_modules/ramda/src/internal/_curry2.js");

var _curryN = /*#__PURE__*/__webpack_require__(/*! ./internal/_curryN */ "./node_modules/flyd/node_modules/ramda/src/internal/_curryN.js");

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
module.exports = curryN;

/***/ }),

/***/ "./node_modules/flyd/node_modules/ramda/src/internal/_arity.js":
/*!*********************************************************************!*\
  !*** ./node_modules/flyd/node_modules/ramda/src/internal/_arity.js ***!
  \*********************************************************************/
/***/ ((module) => {

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
module.exports = _arity;

/***/ }),

/***/ "./node_modules/flyd/node_modules/ramda/src/internal/_curry1.js":
/*!**********************************************************************!*\
  !*** ./node_modules/flyd/node_modules/ramda/src/internal/_curry1.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/flyd/node_modules/ramda/src/internal/_isPlaceholder.js");

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
module.exports = _curry1;

/***/ }),

/***/ "./node_modules/flyd/node_modules/ramda/src/internal/_curry2.js":
/*!**********************************************************************!*\
  !*** ./node_modules/flyd/node_modules/ramda/src/internal/_curry2.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ "./node_modules/flyd/node_modules/ramda/src/internal/_curry1.js");

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/flyd/node_modules/ramda/src/internal/_isPlaceholder.js");

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
module.exports = _curry2;

/***/ }),

/***/ "./node_modules/flyd/node_modules/ramda/src/internal/_curryN.js":
/*!**********************************************************************!*\
  !*** ./node_modules/flyd/node_modules/ramda/src/internal/_curryN.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./_arity */ "./node_modules/flyd/node_modules/ramda/src/internal/_arity.js");

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/flyd/node_modules/ramda/src/internal/_isPlaceholder.js");

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}
module.exports = _curryN;

/***/ }),

/***/ "./node_modules/flyd/node_modules/ramda/src/internal/_isPlaceholder.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/flyd/node_modules/ramda/src/internal/_isPlaceholder.js ***!
  \*****************************************************************************/
/***/ ((module) => {

function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
module.exports = _isPlaceholder;

/***/ }),

/***/ "./node_modules/ramda/es/bind.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/bind.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");



/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */
var bind = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function bind(fn, thisObj) {
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bind);

/***/ }),

/***/ "./node_modules/ramda/es/compose.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/compose.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compose)
/* harmony export */ });
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe.js */ "./node_modules/ramda/es/pipe.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");



/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return _pipe_js__WEBPACK_IMPORTED_MODULE_0__.default.apply(this, (0,_reverse_js__WEBPACK_IMPORTED_MODULE_1__.default)(arguments));
}

/***/ }),

/***/ "./node_modules/ramda/es/curry.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/curry.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");



/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN, R.partial
 * @example
 *
 *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      const curriedAddFourNumbers = R.curry(addFourNumbers);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */
var curry = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function curry(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn.length, fn);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curry);

/***/ }),

/***/ "./node_modules/ramda/es/curryN.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/curryN.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");





/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */
var curryN = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function curryN(length, fn) {
  if (length === 1) {
    return (0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn);
  }
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_2__.default)(length, (0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__.default)(length, [], fn));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curryN);

/***/ }),

/***/ "./node_modules/ramda/es/equals.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/equals.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_equals.js */ "./node_modules/ramda/es/internal/_equals.js");



/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
var equals = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function equals(a, b) {
  return (0,_internal_equals_js__WEBPACK_IMPORTED_MODULE_1__.default)(a, b, [], []);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (equals);

/***/ }),

/***/ "./node_modules/ramda/es/filter.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/filter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/_filter.js */ "./node_modules/ramda/es/internal/_filter.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfilter.js */ "./node_modules/ramda/es/internal/_xfilter.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");








/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__.default)(['filter'], _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_2__.default, function (pred, filterable) {
  return (0,_internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__.default)(filterable) ? (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__.default)(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__.default)(filterable)) :
  // else
  (0,_internal_filter_js__WEBPACK_IMPORTED_MODULE_6__.default)(pred, filterable);
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filter);

/***/ }),

/***/ "./node_modules/ramda/es/flip.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/flip.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");



/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */
var flip = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function flip(fn) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flip);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arity.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arity.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arity)
/* harmony export */ });
function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arrayFromIterator.js":
/*!**************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arrayFromIterator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayFromIterator)
/* harmony export */ });
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_checkForMethod.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_checkForMethod.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _checkForMethod)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");


/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_complement.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_complement.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _complement)
/* harmony export */ });
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry1.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry1.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry1)
/* harmony export */ });
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry2.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry2.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry2)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");



/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? f2 : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b) {
          return fn(a, _b);
        });
      default:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? f2 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a) {
          return fn(_a, b);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry3.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry3.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curry3)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");




/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? f3 : (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a, _b) {
          return fn(_a, _b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a, _c) {
          return fn(_a, b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b, _c) {
          return fn(a, _b, _c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_a) {
          return fn(_a, b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_b) {
          return fn(a, _b, c);
        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curryN.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curryN.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _curryN)
/* harmony export */ });
/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");



/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : (0,_arity_js__WEBPACK_IMPORTED_MODULE_1__.default)(left, _curryN(length, combined, fn));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dispatchable.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dispatchable.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _dispatchable)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isTransformer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isTransformer.js */ "./node_modules/ramda/es/internal/_isTransformer.js");



/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if ((0,_isTransformer_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_equals.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_equals.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _equals)
/* harmony export */ });
/* harmony import */ var _arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arrayFromIterator.js */ "./node_modules/ramda/es/internal/_arrayFromIterator.js");
/* harmony import */ var _includesWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _functionName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_functionName.js */ "./node_modules/ramda/es/internal/_functionName.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _objectIs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_objectIs.js */ "./node_modules/ramda/es/internal/_objectIs.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type.js */ "./node_modules/ramda/es/type.js");








/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__.default)(aIterator);
  var b = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__.default)(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (b, aItem) {
    return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__.default)(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if ((0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__.default)(a, b)) {
    return true;
  }

  var typeA = (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.default)(a);

  if (typeA !== (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.default)(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && (0,_functionName_js__WEBPACK_IMPORTED_MODULE_4__.default)(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && (0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__.default)(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!(0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__.default)(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__.default)(a);
  if (keysA.length !== (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__.default)(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);

  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!((0,_has_js__WEBPACK_IMPORTED_MODULE_6__.default)(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_filter.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_filter.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _filter)
/* harmony export */ });
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_functionName.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_functionName.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _functionName)
/* harmony export */ });
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_has.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_has.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _has)
/* harmony export */ });
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_includes.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_includes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _includes)
/* harmony export */ });
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_indexOf.js */ "./node_modules/ramda/es/internal/_indexOf.js");


function _includes(a, list) {
  return (0,_indexOf_js__WEBPACK_IMPORTED_MODULE_0__.default)(list, a, 0) >= 0;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_includesWith.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_includesWith.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _includesWith)
/* harmony export */ });
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_indexOf.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_indexOf.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _indexOf)
/* harmony export */ });
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../equals.js */ "./node_modules/ramda/es/equals.js");


function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if ((0,_equals_js__WEBPACK_IMPORTED_MODULE_0__.default)(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArguments.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArguments.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");


var toString = Object.prototype.toString;
var _isArguments = /*#__PURE__*/function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return (0,_has_js__WEBPACK_IMPORTED_MODULE_0__.default)('callee', x);
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArguments);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArray.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArrayLike.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArrayLike.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isString.js */ "./node_modules/ramda/es/internal/_isString.js");




/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
var _isArrayLike = /*#__PURE__*/(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function isArrayLike(x) {
  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.default)(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.default)(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArrayLike);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isFunction.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isFunction)
/* harmony export */ });
function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isObject.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isObject)
/* harmony export */ });
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isPlaceholder.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isPlaceholder.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isPlaceholder)
/* harmony export */ });
function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isString.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isString)
/* harmony export */ });
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isTransformer.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isTransformer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isTransformer)
/* harmony export */ });
function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_map.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_map.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _map)
/* harmony export */ });
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_objectIs.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_objectIs.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Object.is === 'function' ? Object.is : _objectIs);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_pipe.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_pipe.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _pipe)
/* harmony export */ });
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_quote.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_quote.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _quote)
/* harmony export */ });
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduce.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduce.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _reduce)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");
/* harmony import */ var _xwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xwrap.js */ "./node_modules/ramda/es/internal/_xwrap.js");
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bind.js */ "./node_modules/ramda/es/bind.js");




function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName]((0,_bind_js__WEBPACK_IMPORTED_MODULE_0__.default)(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = (0,_xwrap_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn);
  }
  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__.default)(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toISOString.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toISOString.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_toISOString);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toString.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toString)
/* harmony export */ });
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _quote_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_quote.js */ "./node_modules/ramda/es/internal/_quote.js");
/* harmony import */ var _toISOString_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_toISOString.js */ "./node_modules/ramda/es/internal/_toISOString.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reject.js */ "./node_modules/ramda/es/reject.js");







function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return (0,_includes_js__WEBPACK_IMPORTED_MODULE_0__.default)(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function (obj, keys) {
    return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (k) {
      return (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__.default)(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + (0,_map_js__WEBPACK_IMPORTED_MODULE_1__.default)(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + (0,_map_js__WEBPACK_IMPORTED_MODULE_1__.default)(recur, x).concat(mapPairs(x, (0,_reject_js__WEBPACK_IMPORTED_MODULE_3__.default)(function (k) {
        return (/^\d+$/.test(k)
        );
      }, (0,_keys_js__WEBPACK_IMPORTED_MODULE_4__.default)(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_toISOString_js__WEBPACK_IMPORTED_MODULE_5__.default)(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : (0,_quote_js__WEBPACK_IMPORTED_MODULE_2__.default)(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, (0,_keys_js__WEBPACK_IMPORTED_MODULE_4__.default)(x)).join(', ') + '}';
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfBase.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfBase.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfilter.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfilter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XFilter = /*#__PURE__*/function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__.default.init;
  XFilter.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__.default.result;
  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xfilter);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xwrap.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xwrap.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _xwrap)
/* harmony export */ });
var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

/***/ }),

/***/ "./node_modules/ramda/es/invoker.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/invoker.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");





/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      const sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      const sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */
var invoker = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function invoker(arity, method) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__.default)(arity + 1, function () {
    var target = arguments[arity];
    if (target != null && (0,_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__.default)(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError((0,_toString_js__WEBPACK_IMPORTED_MODULE_3__.default)(target) + ' does not have a method named "' + method + '"');
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invoker);

/***/ }),

/***/ "./node_modules/ramda/es/keys.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/keys.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArguments.js */ "./node_modules/ramda/es/internal/_isArguments.js");




// cover IE < 9 keys issues
var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && (0,_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj);
  for (prop in obj) {
    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__.default)(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__.default)(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keys);

/***/ }),

/***/ "./node_modules/ramda/es/pipe.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pipe.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pipe)
/* harmony export */ });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_pipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_pipe.js */ "./node_modules/ramda/es/internal/_pipe.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");





/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__.default)(arguments[0].length, (0,_reduce_js__WEBPACK_IMPORTED_MODULE_1__.default)(_internal_pipe_js__WEBPACK_IMPORTED_MODULE_2__.default, arguments[0], (0,_tail_js__WEBPACK_IMPORTED_MODULE_3__.default)(arguments)));
}

/***/ }),

/***/ "./node_modules/ramda/es/reduce.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reduce.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");



/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */
var reduce = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__.default)(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__.default);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduce);

/***/ }),

/***/ "./node_modules/ramda/es/reject.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reject.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_complement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_complement.js */ "./node_modules/ramda/es/internal/_complement.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/es/filter.js");




/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var reject = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function reject(pred, filterable) {
  return (0,_filter_js__WEBPACK_IMPORTED_MODULE_1__.default)((0,_internal_complement_js__WEBPACK_IMPORTED_MODULE_2__.default)(pred), filterable);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reject);

/***/ }),

/***/ "./node_modules/ramda/es/reverse.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/reverse.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");



/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
var reverse = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function reverse(list) {
  return (0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_1__.default)(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reverse);

/***/ }),

/***/ "./node_modules/ramda/es/slice.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/slice.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");



/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
var slice = /*#__PURE__*/(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__.default)('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slice);

/***/ }),

/***/ "./node_modules/ramda/es/tail.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/tail.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
var tail = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/(0,_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_1__.default)('tail', /*#__PURE__*/(0,_slice_js__WEBPACK_IMPORTED_MODULE_2__.default)(1, Infinity)));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tail);

/***/ }),

/***/ "./node_modules/ramda/es/toString.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/toString.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_toString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_toString.js */ "./node_modules/ramda/es/internal/_toString.js");



/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
var toString = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function toString(val) {
  return (0,_internal_toString_js__WEBPACK_IMPORTED_MODULE_1__.default)(val, []);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toString);

/***/ }),

/***/ "./node_modules/ramda/es/type.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/type.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */
var type = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (type);

/***/ }),

/***/ "./node_modules/snabbdom/es/h.js":
/*!***************************************!*\
  !*** ./node_modules/snabbdom/es/h.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ h),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./node_modules/snabbdom/es/vnode.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./node_modules/snabbdom/es/is.js");


function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (_is__WEBPACK_IMPORTED_MODULE_1__.array(c)) {
            children = c;
        }
        else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (_is__WEBPACK_IMPORTED_MODULE_1__.array(b)) {
            children = b;
        }
        else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (children !== undefined) {
        for (i = 0; i < children.length; ++i) {
            if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(children[i]))
                children[i] = (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.vnode)(undefined, undefined, undefined, children[i], undefined);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.vnode)(sel, data, children, text, undefined);
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (h);
//# sourceMappingURL=h.js.map

/***/ }),

/***/ "./node_modules/snabbdom/es/htmldomapi.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/es/htmldomapi.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlDomApi": () => (/* binding */ htmlDomApi),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
var htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (htmlDomApi);
//# sourceMappingURL=htmldomapi.js.map

/***/ }),

/***/ "./node_modules/snabbdom/es/is.js":
/*!****************************************!*\
  !*** ./node_modules/snabbdom/es/is.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "array": () => (/* binding */ array),
/* harmony export */   "primitive": () => (/* binding */ primitive)
/* harmony export */ });
var array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
//# sourceMappingURL=is.js.map

/***/ }),

/***/ "./node_modules/snabbdom/es/snabbdom.js":
/*!**********************************************!*\
  !*** ./node_modules/snabbdom/es/snabbdom.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* reexport safe */ _h__WEBPACK_IMPORTED_MODULE_3__.h),
/* harmony export */   "thunk": () => (/* reexport safe */ _thunk__WEBPACK_IMPORTED_MODULE_4__.thunk),
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./node_modules/snabbdom/es/vnode.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./node_modules/snabbdom/es/is.js");
/* harmony import */ var _htmldomapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi */ "./node_modules/snabbdom/es/htmldomapi.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ "./node_modules/snabbdom/es/h.js");
/* harmony import */ var _thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thunk */ "./node_modules/snabbdom/es/thunk.js");



function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.default)('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];


function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : _htmldomapi__WEBPACK_IMPORTED_MODULE_2__.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return (0,_vnode__WEBPACK_IMPORTED_MODULE_0__.default)(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (_is__WEBPACK_IMPORTED_MODULE_1__.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (_is__WEBPACK_IMPORTED_MODULE_1__.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
            }
            else {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
            }
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
//# sourceMappingURL=snabbdom.js.map

/***/ }),

/***/ "./node_modules/snabbdom/es/thunk.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/thunk.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "thunk": () => (/* binding */ thunk),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ "./node_modules/snabbdom/es/h.js");

function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
var thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return (0,_h__WEBPACK_IMPORTED_MODULE_0__.h)(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thunk);
//# sourceMappingURL=thunk.js.map

/***/ }),

/***/ "./node_modules/snabbdom/es/vnode.js":
/*!*******************************************!*\
  !*** ./node_modules/snabbdom/es/vnode.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vnode": () => (/* binding */ vnode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (vnode);
//# sourceMappingURL=vnode.js.map

/***/ }),

/***/ "./node_modules/snabbdom/h.js":
/*!************************************!*\
  !*** ./node_modules/snabbdom/h.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var vnode_1 = __webpack_require__(/*! ./vnode */ "./node_modules/snabbdom/vnode.js");
var is = __webpack_require__(/*! ./is */ "./node_modules/snabbdom/is.js");
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (children !== undefined) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
exports.default = h;
//# sourceMappingURL=h.js.map

/***/ }),

/***/ "./node_modules/snabbdom/htmldomapi.js":
/*!*********************************************!*\
  !*** ./node_modules/snabbdom/htmldomapi.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map

/***/ }),

/***/ "./node_modules/snabbdom/is.js":
/*!*************************************!*\
  !*** ./node_modules/snabbdom/is.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map

/***/ }),

/***/ "./node_modules/snabbdom/modules/attributes.js":
/*!*****************************************************!*\
  !*** ./node_modules/snabbdom/modules/attributes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
function updateAttrs(oldVnode, vnode) {
    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, "");
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                }
                else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                }
                else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
exports.default = exports.attributesModule;
//# sourceMappingURL=attributes.js.map

/***/ }),

/***/ "./node_modules/snabbdom/modules/class.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/class.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map

/***/ }),

/***/ "./node_modules/snabbdom/modules/eventlisteners.js":
/*!*********************************************************!*\
  !*** ./node_modules/snabbdom/modules/eventlisteners.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (typeof handler === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            }
            else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        }
        else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i], vnode, event);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type, on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        }
        else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        }
        else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
exports.eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};
exports.default = exports.eventListenersModule;
//# sourceMappingURL=eventlisteners.js.map

/***/ }),

/***/ "./node_modules/snabbdom/modules/props.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/props.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
exports.default = exports.propsModule;
//# sourceMappingURL=props.js.map

/***/ }),

/***/ "./node_modules/snabbdom/modules/style.js":
/*!************************************************!*\
  !*** ./node_modules/snabbdom/modules/style.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.
var raf = (typeof window !== 'undefined' && (window.requestAnimationFrame).bind(window)) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
var reflowForced = false;
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed' && style.delayed) {
            for (var name2 in style.delayed) {
                cur = style.delayed[name2];
                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                    setNextFrame(elm.style, name2, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    if (!reflowForced) {
        getComputedStyle(document.body).transform;
        reflowForced = true;
    }
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
function forceReflow() {
    reflowForced = false;
}
exports.styleModule = {
    pre: forceReflow,
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
exports.default = exports.styleModule;
//# sourceMappingURL=style.js.map

/***/ }),

/***/ "./node_modules/snabbdom/tovnode.js":
/*!******************************************!*\
  !*** ./node_modules/snabbdom/tovnode.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var vnode_1 = __webpack_require__(/*! ./vnode */ "./node_modules/snabbdom/vnode.js");
var htmldomapi_1 = __webpack_require__(/*! ./htmldomapi */ "./node_modules/snabbdom/htmldomapi.js");
function toVNode(node, domApi) {
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    var text;
    if (api.isElement(node)) {
        var id = node.id ? '#' + node.id : '';
        var cn = node.getAttribute('class');
        var c = cn ? '.' + cn.split(' ').join('.') : '';
        var sel = api.tagName(node).toLowerCase() + id + c;
        var attrs = {};
        var children = [];
        var name_1;
        var i = void 0, n = void 0;
        var elmAttrs = node.attributes;
        var elmChildren = node.childNodes;
        for (i = 0, n = elmAttrs.length; i < n; i++) {
            name_1 = elmAttrs[i].nodeName;
            if (name_1 !== 'id' && name_1 !== 'class') {
                attrs[name_1] = elmAttrs[i].nodeValue;
            }
        }
        for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i], domApi));
        }
        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
    }
    else if (api.isText(node)) {
        text = api.getTextContent(node);
        return vnode_1.default(undefined, undefined, undefined, text, node);
    }
    else if (api.isComment(node)) {
        text = api.getTextContent(node);
        return vnode_1.default('!', {}, [], text, node);
    }
    else {
        return vnode_1.default('', {}, [], undefined, node);
    }
}
exports.toVNode = toVNode;
exports.default = toVNode;
//# sourceMappingURL=tovnode.js.map

/***/ }),

/***/ "./node_modules/snabbdom/vnode.js":
/*!****************************************!*\
  !*** ./node_modules/snabbdom/vnode.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;
//# sourceMappingURL=vnode.js.map

/***/ }),

/***/ "./src/state.css":
/*!***********************!*\
  !*** ./src/state.css ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var content = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./state.css */ "./node_modules/css-loader/dist/cjs.js!./src/state.css");

if (typeof content === 'string') {
  content = [[module.id, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/bind.js":
/*!****************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/bind.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = __webpack_require__(/*! ./internal/_arity */ "./node_modules/union-type/node_modules/ramda/src/internal/_arity.js");
var _curry2 = __webpack_require__(/*! ./internal/_curry2 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js");


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */
module.exports = _curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/compose.js":
/*!*******************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/compose.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pipe = __webpack_require__(/*! ./pipe */ "./node_modules/union-type/node_modules/ramda/src/pipe.js");
var reverse = __webpack_require__(/*! ./reverse */ "./node_modules/union-type/node_modules/ramda/src/reverse.js");


/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
module.exports = function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/curryN.js":
/*!******************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/curryN.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = __webpack_require__(/*! ./internal/_arity */ "./node_modules/union-type/node_modules/ramda/src/internal/_arity.js");
var _curry1 = __webpack_require__(/*! ./internal/_curry1 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js");
var _curry2 = __webpack_require__(/*! ./internal/_curry2 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js");
var _curryN = __webpack_require__(/*! ./internal/_curryN */ "./node_modules/union-type/node_modules/ramda/src/internal/_curryN.js");


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_arity.js":
/*!***************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_arity.js ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_checkForMethod.js":
/*!************************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_checkForMethod.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArray = __webpack_require__(/*! ./_isArray */ "./node_modules/union-type/node_modules/ramda/src/internal/_isArray.js");


/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
module.exports = function _checkForMethod(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
      fn.apply(this, arguments) :
      obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isPlaceholder = __webpack_require__(/*! ./_isPlaceholder */ "./node_modules/union-type/node_modules/ramda/src/internal/_isPlaceholder.js");


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 = __webpack_require__(/*! ./_curry1 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js");
var _isPlaceholder = __webpack_require__(/*! ./_isPlaceholder */ "./node_modules/union-type/node_modules/ramda/src/internal/_isPlaceholder.js");


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2
             : _curry1(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
             : fn(a, b);
    }
  };
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_curry3.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_curry3.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 = __webpack_require__(/*! ./_curry1 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js");
var _curry2 = __webpack_require__(/*! ./_curry2 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js");
var _isPlaceholder = __webpack_require__(/*! ./_isPlaceholder */ "./node_modules/union-type/node_modules/ramda/src/internal/_isPlaceholder.js");


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3
             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _curry1(function(_c) { return fn(a, b, _c); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
             : fn(a, b, c);
    }
  };
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_curryN.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_curryN.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = __webpack_require__(/*! ./_arity */ "./node_modules/union-type/node_modules/ramda/src/internal/_arity.js");
var _isPlaceholder = __webpack_require__(/*! ./_isPlaceholder */ "./node_modules/union-type/node_modules/ramda/src/internal/_isPlaceholder.js");


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined)
                     : _arity(left, _curryN(length, combined, fn));
  };
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_isArray.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_isArray.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_isArrayLike.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_isArrayLike.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 = __webpack_require__(/*! ./_curry1 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js");
var _isArray = __webpack_require__(/*! ./_isArray */ "./node_modules/union-type/node_modules/ramda/src/internal/_isArray.js");
var _isString = __webpack_require__(/*! ./_isString */ "./node_modules/union-type/node_modules/ramda/src/internal/_isString.js");


/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
module.exports = _curry1(function isArrayLike(x) {
  if (_isArray(x)) { return true; }
  if (!x) { return false; }
  if (typeof x !== 'object') { return false; }
  if (_isString(x)) { return false; }
  if (x.nodeType === 1) { return !!x.length; }
  if (x.length === 0) { return true; }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_isPlaceholder.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_isPlaceholder.js ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_isString.js":
/*!******************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_isString.js ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_pipe.js":
/*!**************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_pipe.js ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = function _pipe(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_reduce.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_reduce.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isArrayLike = __webpack_require__(/*! ./_isArrayLike */ "./node_modules/union-type/node_modules/ramda/src/internal/_isArrayLike.js");
var _xwrap = __webpack_require__(/*! ./_xwrap */ "./node_modules/union-type/node_modules/ramda/src/internal/_xwrap.js");
var bind = __webpack_require__(/*! ../bind */ "./node_modules/union-type/node_modules/ramda/src/bind.js");


module.exports = (function() {
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      idx += 1;
    }
    return xf['@@transducer/result'](acc);
  }

  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();
    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      step = iter.next();
    }
    return xf['@@transducer/result'](acc);
  }

  function _methodReduce(xf, acc, obj, methodName) {
    return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
  return function _reduce(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }
    if (_isArrayLike(list)) {
      return _arrayReduce(fn, acc, list);
    }
    if (typeof list['fantasy-land/reduce'] === 'function') {
      return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
    }
    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }
    if (typeof list.next === 'function') {
      return _iterableReduce(fn, acc, list);
    }
    if (typeof list.reduce === 'function') {
      return _methodReduce(fn, acc, list, 'reduce');
    }

    throw new TypeError('reduce: list must be array or iterable');
  };
}());


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_xwrap.js":
/*!***************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_xwrap.js ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = (function() {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function() {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
  XWrap.prototype['@@transducer/step'] = function(acc, x) {
    return this.f(acc, x);
  };

  return function _xwrap(fn) { return new XWrap(fn); };
}());


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/pipe.js":
/*!****************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/pipe.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _arity = __webpack_require__(/*! ./internal/_arity */ "./node_modules/union-type/node_modules/ramda/src/internal/_arity.js");
var _pipe = __webpack_require__(/*! ./internal/_pipe */ "./node_modules/union-type/node_modules/ramda/src/internal/_pipe.js");
var reduce = __webpack_require__(/*! ./reduce */ "./node_modules/union-type/node_modules/ramda/src/reduce.js");
var tail = __webpack_require__(/*! ./tail */ "./node_modules/union-type/node_modules/ramda/src/tail.js");


/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
module.exports = function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length,
                reduce(_pipe, arguments[0], tail(arguments)));
};


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/reduce.js":
/*!******************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/reduce.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry3 = __webpack_require__(/*! ./internal/_curry3 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry3.js");
var _reduce = __webpack_require__(/*! ./internal/_reduce */ "./node_modules/union-type/node_modules/ramda/src/internal/_reduce.js");


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *                -               -10
 *               / \              / \
 *              -   4           -6   4
 *             / \              / \
 *            -   3   ==>     -3   3
 *           / \              / \
 *          -   2           -1   2
 *         / \              / \
 *        0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */
module.exports = _curry3(_reduce);


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/reverse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/reverse.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 = __webpack_require__(/*! ./internal/_curry1 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js");
var _isString = __webpack_require__(/*! ./internal/_isString */ "./node_modules/union-type/node_modules/ramda/src/internal/_isString.js");


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
module.exports = _curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') :
                           Array.prototype.slice.call(list, 0).reverse();
});


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/slice.js":
/*!*****************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/slice.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _checkForMethod = __webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/union-type/node_modules/ramda/src/internal/_checkForMethod.js");
var _curry3 = __webpack_require__(/*! ./internal/_curry3 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry3.js");


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));


/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/tail.js":
/*!****************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/tail.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _checkForMethod = __webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/union-type/node_modules/ramda/src/internal/_checkForMethod.js");
var _curry1 = __webpack_require__(/*! ./internal/_curry1 */ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js");
var slice = __webpack_require__(/*! ./slice */ "./node_modules/union-type/node_modules/ramda/src/slice.js");


/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
module.exports = _curry1(_checkForMethod('tail', slice(1, Infinity)));


/***/ }),

/***/ "./node_modules/union-type/union-type.js":
/*!***********************************************!*\
  !*** ./node_modules/union-type/union-type.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var curryN = __webpack_require__(/*! ramda/src/curryN */ "./node_modules/union-type/node_modules/ramda/src/curryN.js");
var compose = __webpack_require__(/*! ramda/src/compose */ "./node_modules/union-type/node_modules/ramda/src/compose.js");
var isString = function(s) { return typeof s === 'string'; };
var isNumber = function(n) { return typeof n === 'number'; };
var isBoolean = function(b) { return typeof b === 'boolean'; };
var isObject = function(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
};
var isFunction = function(f) { return typeof f === 'function'; };
var isArray = Array.isArray || function(a) { return 'length' in a; };

var mapConstrToFn = function(group, constr) {
  return constr === String    ? isString
       : constr === Number    ? isNumber
       : constr === Boolean   ? isBoolean
       : constr === Object    ? isObject
       : constr === Array     ? isArray
       : constr === Function  ? isFunction
       : constr === undefined ? group
                              : constr;
};

var numToStr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];

var validate = function(group, validators, name, args) {
  var validator, v, i;
  if (args.length > validators.length) {
    throw new TypeError('too many arguments supplied to constructor ' + name
      + ' (expected ' + validators.length + ' but got ' + args.length + ')');
  }
  for (i = 0; i < args.length; ++i) {
    v = args[i];
    validator = mapConstrToFn(group, validators[i]);
    if (Type.check === true &&
        (validator.prototype === undefined || !validator.prototype.isPrototypeOf(v)) &&
        (typeof validator !== 'function' || !validator(v))) {
      var strVal = typeof v === 'string' ? "'" + v + "'" : v; // put the value in quotes if it's a string
      throw new TypeError('wrong value ' + strVal + ' passed as ' + numToStr[i] + ' argument to constructor ' + name);
    }
  }
};

function valueToArray(value) {
  var i, arr = [];
  for (i = 0; i < value._keys.length; ++i) {
    arr.push(value[value._keys[i]]);
  }
  return arr;
}

function extractValues(keys, obj) {
  var arr = [], i;
  for (i = 0; i < keys.length; ++i) arr[i] = obj[keys[i]];
  return arr;
}

function constructor(group, name, fields) {
  var validators, keys = Object.keys(fields), i;
  if (isArray(fields)) {
    validators = fields;
  } else {
    validators = extractValues(keys, fields);
  }
  function construct() {
    var val = Object.create(group.prototype), i;
    val._keys = keys;
    val._name = name;
    if (Type.check === true) {
      validate(group, validators, name, arguments);
    }
    for (i = 0; i < arguments.length; ++i) {
      val[keys[i]] = arguments[i];
    }
    return val;
  }
  group[name] = keys.length === 0 ? construct() : curryN(keys.length, construct);
  if (keys !== undefined) {
    group[name+'Of'] = function(obj) {
      return construct.apply(undefined, extractValues(keys, obj));
    };
  }
}

function rawCase(type, cases, value, arg) {
  var wildcard = false;
  var handler = cases[value._name];
  if (handler === undefined) {
    handler = cases['_'];
    wildcard = true;
  }
  if (Type.check === true) {
    if (!type.prototype.isPrototypeOf(value)) {
      throw new TypeError('wrong type passed to case');
    } else if (handler === undefined) {
      throw new Error('non-exhaustive patterns in a function');
    }
  }
  if (handler !== undefined) {
    var args = wildcard === true ? [arg]
             : arg !== undefined ? valueToArray(value).concat([arg])
             : valueToArray(value);
    return handler.apply(undefined, args);
  }
}

var typeCase = curryN(3, rawCase);
var caseOn = curryN(4, rawCase);

function createIterator() {
  return {
    idx: 0,
    val: this,
    next: function() {
      var keys = this.val._keys;
      return this.idx === keys.length
        ? {done: true}
        : {value: this.val[keys[this.idx++]]};
    }
  };
}

function Type(desc) {
  var key, res, obj = {};
  obj.case = typeCase(obj);
  obj.caseOn = caseOn(obj);

  obj.prototype = {};
  obj.prototype[Symbol ? Symbol.iterator : '@@iterator'] = createIterator;
  obj.prototype.case = function (cases) { return obj.case(cases, this); };
  obj.prototype.caseOn = function (cases) { return obj.caseOn(cases, this); };

  for (key in desc) {
    res = constructor(obj, key, desc[key]);
  }
  return obj;
}

Type.check = true;

Type.ListOf = function (T) {
  var List = Type({List:[Array]});
  var innerType = Type({T: [T]}).T;
  var validate = List.case({
    List: function (array) {
      try {
        for(var n = 0; n < array.length; n++) {
          innerType(array[n]);
        }
      } catch (e) {
        throw new TypeError('wrong value '+ array[n] + ' passed to location ' + numToStr[n] + ' in List');
      }
      return true;
    }
  });
  return compose(validate, List.List);
};

module.exports = Type;


/***/ }),

/***/ "./src/js/components/collapser.js":
/*!****************************************!*\
  !*** ./src/js/components/collapser.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/curry.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./src/js/components/raw.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/js/util.js");



const {h, mounterFor} = _util__WEBPACK_IMPORTED_MODULE_1__.default;
const forwardTo = __webpack_require__(/*! flyd-forwardto */ "./node_modules/flyd-forwardto/forwardto.js");
const Type = __webpack_require__(/*! union-type */ "./node_modules/union-type/union-type.js");

const of = (Component, args) => {
  // model
  // {
  //   collapsed: bool
  //   contents: child component model
  // }
  const init = (collapsed=false, contents=Component.init(...args)) => ({
    collapsed,
    contents,
  });

  const Action = Type({
    Toggle: [],
    Modify: [Component.Action],
  });

  const update = Action.caseOn({
    Toggle: (model) => ({...model, collapsed: !model.collapsed}),
    Modify: (componentAction, model) => ({...model, contents: Component.update(componentAction, model.contents)}),
  });

  const view = ramda__WEBPACK_IMPORTED_MODULE_2__.default((action$, model) =>
    h('div.collapse', [
      h('button', {on: {click: [action$, Action.Toggle]}}, 'Collapse Section'),
      h('div', {style: model.collapsed ? {height: '1px', overflow: 'hidden'} : {overflow: 'hidden'}},
        [
          Component.view(forwardTo(action$, Action.Modify), model.contents),
        ]
      ),
    ])
  );

  const mount = mounterFor({view, update});
  return {init, view, update, Action, mount};
}

const defaultCollapser = of(_raw__WEBPACK_IMPORTED_MODULE_0__.default);
// export const collapser = {of, ...defaultCollapser}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({of, ...defaultCollapser});

/***/ }),

/***/ "./src/js/components/raw.js":
/*!**********************************!*\
  !*** ./src/js/components/raw.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Type = __webpack_require__(/*! union-type */ "./node_modules/union-type/union-type.js");

const init = (content) => content

const Action = Type({});

const update = (action, model) => model

const view = (action$, model) => model

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({init, view, update, Action});

/***/ }),

/***/ "./src/js/components/resizer.js":
/*!**************************************!*\
  !*** ./src/js/components/resizer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/curry.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/compose.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./src/js/components/raw.js");


const {h, mounterFor} = _util__WEBPACK_IMPORTED_MODULE_0__.default;

const forwardTo = __webpack_require__(/*! flyd-forwardto */ "./node_modules/flyd-forwardto/forwardto.js");
const Type = __webpack_require__(/*! union-type */ "./node_modules/union-type/union-type.js");

const of = (Component, args) => {
  // model
  // {
  //   width: Number
  //   contents: child component model
  // }
  const Action = Type({
    SetWidth: [Number],
    Modify: [Component.Action],
  });

  const init = (width, contents=Component.init(...args)) => ({
    width,
    contents,
  });

  const update = Action.caseOn({
    SetWidth: (width, model) => ({...model, width: width}),
    Modify: (componentAction, model) => ({...model, contents: Component.update(componentAction, model.contents)}),
  });

  const view = ramda__WEBPACK_IMPORTED_MODULE_2__.default((action$, model) =>
    h('div', [
      h('button', {on: {click: [action$, Action.SetWidth(320)]}}, 'Mobile'),
      h('button', {on: {click: [action$, Action.SetWidth(1300)]}}, 'Desktop'),
      h('div', {style: {width: `${model.width}px`, transition: 'width 0.5s'}},
        [
          Component.view(forwardTo(action$, Action.Modify), model.contents),
        ]
      ),
    ])
  );

  const targetValue = (ev) => ev.target.value;

  const ifEnter = ramda__WEBPACK_IMPORTED_MODULE_2__.default(function(fn, val, ev) {
    if (ev.keyCode === 13) return fn(val);
  });

  const inputView = ramda__WEBPACK_IMPORTED_MODULE_2__.default((action$, model) =>
    h('div', [
      h('input', {on: {keydown: (ev, el) => ifEnter(ramda__WEBPACK_IMPORTED_MODULE_3__.default(action$, Action.SetWidth, parseInt), targetValue(ev), ev)}}, 'Mobile'),
      h('div', {style: {width: `${model.width}px`, transition: 'width 0.5s'}},
        [
          Component.view(forwardTo(action$, Action.Modify), model.contents),
        ]
      ),
    ])
  );

  const mount = mounterFor({view, update});
  return {init, view, update, Action, mount};
}

const defaultResizer = of(_raw__WEBPACK_IMPORTED_MODULE_1__.default);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({of, ...defaultResizer});

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "qs": () => (/* binding */ qs),
/* harmony export */   "qsAll": () => (/* binding */ qsAll),
/* harmony export */   "onReady": () => (/* binding */ onReady),
/* harmony export */   "mounterFor": () => (/* binding */ mounterFor),
/* harmony export */   "toVNode": () => (/* binding */ toVNode),
/* harmony export */   "patch": () => (/* binding */ patch),
/* harmony export */   "h": () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/invoker.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/curry.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/flip.js");

const flyd = __webpack_require__(/*! flyd */ "./node_modules/flyd/lib/index.js");
const snabbdom = __webpack_require__(/*! snabbdom */ "./node_modules/snabbdom/es/snabbdom.js");
const patch = snabbdom.init([ // Init patch function with chosen modules
  __webpack_require__(/*! snabbdom/modules/class */ "./node_modules/snabbdom/modules/class.js").default, // makes it easy to toggle classes
  __webpack_require__(/*! snabbdom/modules/props */ "./node_modules/snabbdom/modules/props.js").default, // for setting properties on DOM elements
  __webpack_require__(/*! snabbdom/modules/style */ "./node_modules/snabbdom/modules/style.js").default, // handles styling on elements with support for animations
  __webpack_require__(/*! snabbdom/modules/attributes */ "./node_modules/snabbdom/modules/attributes.js").default, // for setting attributes on DOM elements
  __webpack_require__(/*! snabbdom/modules/eventlisteners */ "./node_modules/snabbdom/modules/eventlisteners.js").default, // attaches event listeners
]);
const h = __webpack_require__(/*! snabbdom/h */ "./node_modules/snabbdom/h.js").default; // helper function for creating vnodes
const toVNode = __webpack_require__(/*! snabbdom/tovnode */ "./node_modules/snabbdom/tovnode.js").default;

const qs = ramda__WEBPACK_IMPORTED_MODULE_0__.default(1, 'querySelector');
const qsAll = ramda__WEBPACK_IMPORTED_MODULE_0__.default(1, 'querySelectorAll');

const l = ramda__WEBPACK_IMPORTED_MODULE_1__.default((tag, x) => {console.log(tag, x); return x})

const onReady = (cb) => {
  if (document.readyState === "complete"
       || document.readyState === "loaded"
       || document.readyState === "interactive") {
    cb.bind(undefined)();
  } else {
    document.addEventListener('DOMContentLoaded', cb.bind(undefined));
  }
}

const mounterFor = (Component) => {
  const {view, update} = Component;
  return (initialState, container) => {
    const action$ = flyd.stream();
    const model$ = flyd.scan(ramda__WEBPACK_IMPORTED_MODULE_2__.default(update), initialState, action$);
    const vnode$ = flyd.map(view(action$), model$);
    flyd.scan(patch, container, vnode$);
  }
}

const noFRPMounterFor = (Component) => {
  const {view, update} = Component;
  return (oldState, oldVnode) => {
    const newVnode = view((action) => {
      const newState = update(oldState, action);
      run(newState, newVnode);
    }, oldState);
    patch(oldVnode, newVnode);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ patch, onReady, mounterFor, toVNode, h, l, qs});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/js/pages/state.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state.html */ "./src/state.html");
/* harmony import */ var _state_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_state_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../state.css */ "./src/state.css");
/* harmony import */ var _state_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_state_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _components_resizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/resizer */ "./src/js/components/resizer.js");
/* harmony import */ var _components_collapser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/collapser */ "./src/js/components/collapser.js");







(0,_util__WEBPACK_IMPORTED_MODULE_2__.onReady)(() => {
  const collapseEl = document.querySelector('.js-collapser');
  _components_collapser__WEBPACK_IMPORTED_MODULE_4__.default.mount(_components_collapser__WEBPACK_IMPORTED_MODULE_4__.default.init(false, (0,_util__WEBPACK_IMPORTED_MODULE_2__.toVNode)(collapseEl.children[0])), collapseEl);

  const resizeEl = document.querySelector('.js-resizer');
  _components_resizer__WEBPACK_IMPORTED_MODULE_3__.default.mount(_components_resizer__WEBPACK_IMPORTED_MODULE_3__.default.init(1300, (0,_util__WEBPACK_IMPORTED_MODULE_2__.toVNode)(resizeEl.children[0])), resizeEl);

  const collapsableResizerEl = document.querySelector('.js-resize-inside-collapse');
  const collapsableResizer = _components_collapser__WEBPACK_IMPORTED_MODULE_4__.default.of(_components_resizer__WEBPACK_IMPORTED_MODULE_3__.default, [1300, (0,_util__WEBPACK_IMPORTED_MODULE_2__.toVNode)(collapsableResizerEl.children[0])]);
  collapsableResizer.mount(collapsableResizer.init(false), collapsableResizerEl);

  const resizableCollapserEl = document.querySelector('.js-collapse-inside-resize');
  const resizableCollapser = _components_resizer__WEBPACK_IMPORTED_MODULE_3__.default.of(_components_collapser__WEBPACK_IMPORTED_MODULE_4__.default, [false, (0,_util__WEBPACK_IMPORTED_MODULE_2__.toVNode)(resizableCollapserEl.children[0])]);
  resizableCollapser.mount(resizableCollapser.init(1300), resizableCollapserEl);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL3N0YXRlLmNzcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL3N0YXRlLmh0bWwiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkLWZvcndhcmR0by9mb3J3YXJkdG8uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkLWZvcndhcmR0by9ub2RlX21vZHVsZXMvZmx5ZC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkLWZvcndhcmR0by9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2N1cnJ5Ti5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQtZm9yd2FyZHRvL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FyaXR5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC1mb3J3YXJkdG8vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkxLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC1mb3J3YXJkdG8vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC1mb3J3YXJkdG8vbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnlOLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnlOLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcml0eS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkxLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5Ti5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNQbGFjZWhvbGRlci5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9jb21wb3NlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvY3VycnkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9lcXVhbHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9mbGlwLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2FyaXR5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2FycmF5RnJvbUl0ZXJhdG9yLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2NvbXBsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY3VycnkxLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2N1cnJ5Mi5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19jdXJyeTMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY3VycnlOLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19lcXVhbHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fZmlsdGVyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2Z1bmN0aW9uTmFtZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19oYXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faW5jbHVkZXNXaXRoLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2luZGV4T2YuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNBcnJheS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzT2JqZWN0LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNTdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNUcmFuc2Zvcm1lci5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19tYXAuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fb2JqZWN0SXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fcGlwZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19xdW90ZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9JU09TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feGZCYXNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX3hmaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feHdyYXAuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnZva2VyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMva2V5cy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3BpcGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9yZWplY3QuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9yZXZlcnNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvc2xpY2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy90YWlsLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvdG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy90eXBlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2h0bWxkb21hcGkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9pcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3NuYWJiZG9tLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvdGh1bmsuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy92bm9kZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2guanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9odG1sZG9tYXBpLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vaXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9ldmVudGxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL3N0eWxlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vdG92bm9kZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL3Zub2RlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvc3RhdGUuY3NzPzA1YjkiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9iaW5kLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnlOLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcml0eS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5MS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5Ti5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcnJheS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzU3RyaW5nLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19waXBlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3h3cmFwLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpcGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVkdWNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JldmVyc2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2xpY2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFpbC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvdW5pb24tdHlwZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL2pzL2NvbXBvbmVudHMvY29sbGFwc2VyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvanMvY29tcG9uZW50cy9yYXcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL3NyYy9qcy9jb21wb25lbnRzL3Jlc2l6ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL3NyYy9qcy91dGlsLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvanMvcGFnZXMvc3RhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQTJCLG1CQUFPLENBQUMscUdBQWdEO0FBQ25GO0FBQ0Esa0NBQWtDLGtCQUFrQixnQkFBZ0Isc0JBQXNCLEdBQUc7Ozs7Ozs7Ozs7OztBQ0ZoRjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCOztBQUU5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QSxFQUFFLDhEQUFhLENBQUMsNkRBQVksT0FBTyw4Q0FBTzs7QUFFMUM7QUFDQSw2QkFBNkIsNkRBQVksQ0FBQyx3REFBTyxTQUFTLDhDQUFPO0FBQ2pFOztBQUVBO0FBQ0EsNkJBQTZCLDJEQUFVLENBQUMsMERBQVMsVUFBVSw4Q0FBTztBQUNsRTtBQUNBLENBQUMsRSIsImZpbGUiOiJzdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiaWZyYW1lIHtcXG4gIGhlaWdodDogNDAwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbn1cIiwgXCJcIl0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCJ7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbX2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIihcIi5jb25jYXQoaXRlbVsyXSwgXCIpIGFuZCAoXCIpLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIilcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCkuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzdGF0ZS5odG1sXCI7IiwidmFyIGZseWQgPSByZXF1aXJlKCdmbHlkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmx5ZC5jdXJyeU4oMiwgZnVuY3Rpb24odGFyZywgZm4pIHtcbiAgdmFyIHMgPSBmbHlkLnN0cmVhbSgpO1xuICBmbHlkLm1hcChmdW5jdGlvbih2KSB7IHRhcmcoZm4odikpOyB9LCBzKTtcbiAgcmV0dXJuIHM7XG59KTtcbiIsInZhciBjdXJyeU4gPSByZXF1aXJlKCdyYW1kYS9zcmMvY3VycnlOJyk7XG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuICEhKG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNhbGwgJiYgb2JqLmFwcGx5KTtcbn1cblxuLy8gR2xvYmFsc1xudmFyIHRvVXBkYXRlID0gW107XG52YXIgaW5TdHJlYW07XG5cbmZ1bmN0aW9uIG1hcChmLCBzKSB7XG4gIHJldHVybiBzdHJlYW0oW3NdLCBmdW5jdGlvbihzZWxmKSB7IHNlbGYoZihzLnZhbCkpOyB9KTtcbn1cblxuZnVuY3Rpb24gb24oZiwgcykge1xuICByZXR1cm4gc3RyZWFtKFtzXSwgZnVuY3Rpb24oKSB7IGYocy52YWwpOyB9KTtcbn1cblxuZnVuY3Rpb24gYm91bmRNYXAoZikgeyByZXR1cm4gbWFwKGYsIHRoaXMpOyB9XG5cbnZhciBzY2FuID0gY3VycnlOKDMsIGZ1bmN0aW9uKGYsIGFjYywgcykge1xuICB2YXIgbnMgPSBzdHJlYW0oW3NdLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKGFjYyA9IGYoYWNjLCBzKCkpKTtcbiAgfSk7XG4gIGlmICghbnMuaGFzVmFsKSBucyhhY2MpO1xuICByZXR1cm4gbnM7XG59KTtcblxudmFyIG1lcmdlID0gY3VycnlOKDIsIGZ1bmN0aW9uKHMxLCBzMikge1xuICB2YXIgcyA9IGltbWVkaWF0ZShzdHJlYW0oW3MxLCBzMl0sIGZ1bmN0aW9uKG4sIGNoYW5nZWQpIHtcbiAgICByZXR1cm4gY2hhbmdlZFswXSA/IGNoYW5nZWRbMF0oKVxuICAgICAgICAgOiBzMS5oYXNWYWwgID8gczEoKVxuICAgICAgICAgICAgICAgICAgICAgIDogczIoKTtcbiAgfSkpO1xuICBlbmRzT24oc3RyZWFtKFtzMS5lbmQsIHMyLmVuZF0sIGZ1bmN0aW9uKHNlbGYsIGNoYW5nZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSksIHMpO1xuICByZXR1cm4gcztcbn0pO1xuXG5mdW5jdGlvbiBhcChzMikge1xuICB2YXIgczEgPSB0aGlzO1xuICByZXR1cm4gc3RyZWFtKFtzMSwgczJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIHMxKCkoczIoKSk7IH0pO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsRGVwc05vdE1ldChzdHJlYW0pIHtcbiAgc3RyZWFtLmRlcHNNZXQgPSBzdHJlYW0uZGVwcy5ldmVyeShmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHMuaGFzVmFsO1xuICB9KTtcbiAgcmV0dXJuICFzdHJlYW0uZGVwc01ldDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3RyZWFtKHMpIHtcbiAgaWYgKChzLmRlcHNNZXQgIT09IHRydWUgJiYgaW5pdGlhbERlcHNOb3RNZXQocykpIHx8XG4gICAgICAocy5lbmQgIT09IHVuZGVmaW5lZCAmJiBzLmVuZC52YWwgPT09IHRydWUpKSByZXR1cm47XG4gIGlmIChpblN0cmVhbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9VcGRhdGUucHVzaChzKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaW5TdHJlYW0gPSBzO1xuICB2YXIgcmV0dXJuVmFsID0gcy5mbihzLCBzLmRlcHNDaGFuZ2VkKTtcbiAgaWYgKHJldHVyblZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcyhyZXR1cm5WYWwpO1xuICB9XG4gIGluU3RyZWFtID0gdW5kZWZpbmVkO1xuICBpZiAocy5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBzLmRlcHNDaGFuZ2VkID0gW107XG4gIHMuc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gIGlmIChmbHVzaGluZyA9PT0gZmFsc2UpIGZsdXNoVXBkYXRlKCk7XG59XG5cbnZhciBvcmRlciA9IFtdO1xudmFyIG9yZGVyTmV4dElkeCA9IC0xO1xuXG5mdW5jdGlvbiBmaW5kRGVwcyhzKSB7XG4gIHZhciBpLCBsaXN0ZW5lcnMgPSBzLmxpc3RlbmVycztcbiAgaWYgKHMucXVldWVkID09PSBmYWxzZSkge1xuICAgIHMucXVldWVkID0gdHJ1ZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICBmaW5kRGVwcyhsaXN0ZW5lcnNbaV0pO1xuICAgIH1cbiAgICBvcmRlclsrK29yZGVyTmV4dElkeF0gPSBzO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZURlcHMocykge1xuICB2YXIgaSwgbywgbGlzdCwgbGlzdGVuZXJzID0gcy5saXN0ZW5lcnM7XG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICBsaXN0ID0gbGlzdGVuZXJzW2ldO1xuICAgIGlmIChsaXN0LmVuZCA9PT0gcykge1xuICAgICAgZW5kU3RyZWFtKGxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGlzdC5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBsaXN0LmRlcHNDaGFuZ2VkLnB1c2gocyk7XG4gICAgICBsaXN0LnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICBmaW5kRGVwcyhsaXN0KTtcbiAgICB9XG4gIH1cbiAgZm9yICg7IG9yZGVyTmV4dElkeCA+PSAwOyAtLW9yZGVyTmV4dElkeCkge1xuICAgIG8gPSBvcmRlcltvcmRlck5leHRJZHhdO1xuICAgIGlmIChvLnNob3VsZFVwZGF0ZSA9PT0gdHJ1ZSkgdXBkYXRlU3RyZWFtKG8pO1xuICAgIG8ucXVldWVkID0gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZsdXNoaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGZsdXNoVXBkYXRlKCkge1xuICBmbHVzaGluZyA9IHRydWU7XG4gIHdoaWxlICh0b1VwZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgdmFyIHMgPSB0b1VwZGF0ZS5zaGlmdCgpO1xuICAgIGlmIChzLnZhbHMubGVuZ3RoID4gMCkgcy52YWwgPSBzLnZhbHMuc2hpZnQoKTtcbiAgICB1cGRhdGVEZXBzKHMpO1xuICB9XG4gIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzU3RyZWFtKHN0cmVhbSkge1xuICByZXR1cm4gaXNGdW5jdGlvbihzdHJlYW0pICYmICdoYXNWYWwnIGluIHN0cmVhbTtcbn1cblxuZnVuY3Rpb24gc3RyZWFtVG9TdHJpbmcoKSB7XG4gIHJldHVybiAnc3RyZWFtKCcgKyB0aGlzLnZhbCArICcpJztcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3RyZWFtVmFsdWUocywgbikge1xuICBpZiAobiAhPT0gdW5kZWZpbmVkICYmIG4gIT09IG51bGwgJiYgaXNGdW5jdGlvbihuLnRoZW4pKSB7XG4gICAgbi50aGVuKHMpO1xuICAgIHJldHVybjtcbiAgfVxuICBzLnZhbCA9IG47XG4gIHMuaGFzVmFsID0gdHJ1ZTtcbiAgaWYgKGluU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgdXBkYXRlRGVwcyhzKTtcbiAgICBpZiAodG9VcGRhdGUubGVuZ3RoID4gMCkgZmx1c2hVcGRhdGUoKTsgZWxzZSBmbHVzaGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGluU3RyZWFtID09PSBzKSB7XG4gICAgbWFya0xpc3RlbmVycyhzLCBzLmxpc3RlbmVycyk7XG4gIH0gZWxzZSB7XG4gICAgcy52YWxzLnB1c2gobik7XG4gICAgdG9VcGRhdGUucHVzaChzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXJrTGlzdGVuZXJzKHMsIGxpc3RzKSB7XG4gIHZhciBpLCBsaXN0O1xuICBmb3IgKGkgPSAwOyBpIDwgbGlzdHMubGVuZ3RoOyArK2kpIHtcbiAgICBsaXN0ID0gbGlzdHNbaV07XG4gICAgaWYgKGxpc3QuZW5kICE9PSBzKSB7XG4gICAgICBpZiAobGlzdC5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxpc3QuZGVwc0NoYW5nZWQucHVzaChzKTtcbiAgICAgIH1cbiAgICAgIGxpc3Quc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW5kU3RyZWFtKGxpc3QpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHJlYW0oKSB7XG4gIGZ1bmN0aW9uIHMobikge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMCA/ICh1cGRhdGVTdHJlYW1WYWx1ZShzLCBuKSwgcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzLnZhbDtcbiAgfVxuICBzLmhhc1ZhbCA9IGZhbHNlO1xuICBzLnZhbCA9IHVuZGVmaW5lZDtcbiAgcy52YWxzID0gW107XG4gIHMubGlzdGVuZXJzID0gW107XG4gIHMucXVldWVkID0gZmFsc2U7XG4gIHMuZW5kID0gdW5kZWZpbmVkO1xuXG4gIHMubWFwID0gYm91bmRNYXA7XG4gIHMuYXAgPSBhcDtcbiAgcy5vZiA9IHN0cmVhbTtcbiAgcy50b1N0cmluZyA9IHN0cmVhbVRvU3RyaW5nO1xuXG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoZGVwcywgcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyArK2kpIHtcbiAgICBkZXBzW2ldLmxpc3RlbmVycy5wdXNoKHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlcGVuZGVudFN0cmVhbShkZXBzLCBmbikge1xuICB2YXIgcyA9IGNyZWF0ZVN0cmVhbSgpO1xuICBzLmZuID0gZm47XG4gIHMuZGVwcyA9IGRlcHM7XG4gIHMuZGVwc01ldCA9IGZhbHNlO1xuICBzLmRlcHNDaGFuZ2VkID0gZm4ubGVuZ3RoID4gMSA/IFtdIDogdW5kZWZpbmVkO1xuICBzLnNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICBhZGRMaXN0ZW5lcnMoZGVwcywgcyk7XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBpbW1lZGlhdGUocykge1xuICBpZiAocy5kZXBzTWV0ID09PSBmYWxzZSkge1xuICAgIHMuZGVwc01ldCA9IHRydWU7XG4gICAgdXBkYXRlU3RyZWFtKHMpO1xuICB9XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihzLCBsaXN0ZW5lcnMpIHtcbiAgdmFyIGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKHMpO1xuICBsaXN0ZW5lcnNbaWR4XSA9IGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV07XG4gIGxpc3RlbmVycy5sZW5ndGgtLTtcbn1cblxuZnVuY3Rpb24gZGV0YWNoRGVwcyhzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5kZXBzLmxlbmd0aDsgKytpKSB7XG4gICAgcmVtb3ZlTGlzdGVuZXIocywgcy5kZXBzW2ldLmxpc3RlbmVycyk7XG4gIH1cbiAgcy5kZXBzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIGVuZFN0cmVhbShzKSB7XG4gIGlmIChzLmRlcHMgIT09IHVuZGVmaW5lZCkgZGV0YWNoRGVwcyhzKTtcbiAgaWYgKHMuZW5kICE9PSB1bmRlZmluZWQpIGRldGFjaERlcHMocy5lbmQpO1xufVxuXG5mdW5jdGlvbiBlbmRzT24oZW5kUywgcykge1xuICBkZXRhY2hEZXBzKHMuZW5kKTtcbiAgZW5kUy5saXN0ZW5lcnMucHVzaChzLmVuZCk7XG4gIHMuZW5kLmRlcHMucHVzaChlbmRTKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIHRydWVGbigpIHsgcmV0dXJuIHRydWU7IH1cblxuZnVuY3Rpb24gc3RyZWFtKGFyZywgZm4pIHtcbiAgdmFyIGksIHMsIGRlcHMsIGRlcEVuZFN0cmVhbXM7XG4gIHZhciBlbmRTdHJlYW0gPSBjcmVhdGVEZXBlbmRlbnRTdHJlYW0oW10sIHRydWVGbik7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGRlcHMgPSBbXTsgZGVwRW5kU3RyZWFtcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcmcubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChhcmdbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZXBzLnB1c2goYXJnW2ldKTtcbiAgICAgICAgaWYgKGFyZ1tpXS5lbmQgIT09IHVuZGVmaW5lZCkgZGVwRW5kU3RyZWFtcy5wdXNoKGFyZ1tpXS5lbmQpO1xuICAgICAgfVxuICAgIH1cbiAgICBzID0gY3JlYXRlRGVwZW5kZW50U3RyZWFtKGRlcHMsIGZuKTtcbiAgICBzLmVuZCA9IGVuZFN0cmVhbTtcbiAgICBlbmRTdHJlYW0ubGlzdGVuZXJzLnB1c2gocyk7XG4gICAgYWRkTGlzdGVuZXJzKGRlcEVuZFN0cmVhbXMsIGVuZFN0cmVhbSk7XG4gICAgZW5kU3RyZWFtLmRlcHMgPSBkZXBFbmRTdHJlYW1zO1xuICAgIHVwZGF0ZVN0cmVhbShzKTtcbiAgfSBlbHNlIHtcbiAgICBzID0gY3JlYXRlU3RyZWFtKCk7XG4gICAgcy5lbmQgPSBlbmRTdHJlYW07XG4gICAgZW5kU3RyZWFtLmxpc3RlbmVycy5wdXNoKHMpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSBzKGFyZyk7XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbnZhciB0cmFuc2R1Y2UgPSBjdXJyeU4oMiwgZnVuY3Rpb24oeGZvcm0sIHNvdXJjZSkge1xuICB4Zm9ybSA9IHhmb3JtKG5ldyBTdHJlYW1UcmFuc2Zvcm1lcigpKTtcbiAgcmV0dXJuIHN0cmVhbShbc291cmNlXSwgZnVuY3Rpb24oc2VsZikge1xuICAgIHZhciByZXMgPSB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSh1bmRlZmluZWQsIHNvdXJjZSgpKTtcbiAgICBpZiAocmVzICYmIHJlc1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSA9PT0gdHJ1ZSkge1xuICAgICAgc2VsZi5lbmQodHJ1ZSk7XG4gICAgICByZXR1cm4gcmVzWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIFN0cmVhbVRyYW5zZm9ybWVyKCkgeyB9XG5TdHJlYW1UcmFuc2Zvcm1lci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHsgfTtcblN0cmVhbVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24oKSB7IH07XG5TdHJlYW1UcmFuc2Zvcm1lci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihzLCB2KSB7IHJldHVybiB2OyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RyZWFtOiBzdHJlYW0sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgdHJhbnNkdWNlOiB0cmFuc2R1Y2UsXG4gIG1lcmdlOiBtZXJnZSxcbiAgc2Nhbjogc2NhbixcbiAgZW5kc09uOiBlbmRzT24sXG4gIG1hcDogY3VycnlOKDIsIG1hcCksXG4gIG9uOiBjdXJyeU4oMiwgb24pLFxuICBjdXJyeU46IGN1cnJ5TixcbiAgaW1tZWRpYXRlOiBpbW1lZGlhdGUsXG59O1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfY3VycnlOID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnlOJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGVcbiAqIHNwZWNpZmllZCBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy5cbiAqIEZpcnN0LCBpdHMgYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzXG4gKiBgUi5jdXJyeU4oMywgZilgLCB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgYFIuX19gIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgYFIuX19gLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFkZEZvdXJOdW1iZXJzID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgcmV0dXJuIFIuc3VtKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCA0KSk7XG4gKiAgICAgIH07XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgYWRkRm91ck51bWJlcnMpO1xuICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgdmFyIGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBjdXJyeU4obGVuZ3RoLCBmbikge1xuICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIF9jdXJyeTEoZm4pO1xuICB9XG4gIHJldHVybiBfYXJpdHkobGVuZ3RoLCBfY3VycnlOKGxlbmd0aCwgW10sIGZuKSk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8vIGpzaGludCB1bnVzZWQ6dmFyc1xuICBzd2l0Y2ggKG4pIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYTApIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNjogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA3OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA4OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgOTogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAxMDogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gX2FyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn07XG4iLCIvKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTEoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKGEpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGYxO1xuICAgIH0gZWxzZSBpZiAoYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vX2N1cnJ5MScpO1xuXG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5Mihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjIoYSwgYikge1xuICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgcmV0dXJuIGYyO1xuICAgIH0gZWxzZSBpZiAobiA9PT0gMSAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmMjtcbiAgICB9IGVsc2UgaWYgKG4gPT09IDEpIHtcbiAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uKGIpIHsgcmV0dXJuIGZuKGEsIGIpOyB9KTtcbiAgICB9IGVsc2UgaWYgKG4gPT09IDIgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGIgIT0gbnVsbCAmJiBiWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGYyO1xuICAgIH0gZWxzZSBpZiAobiA9PT0gMiAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGZuKGEsIGIpOyB9KTtcbiAgICB9IGVsc2UgaWYgKG4gPT09IDIgJiYgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbihiKSB7IHJldHVybiBmbihhLCBiKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbihhLCBiKTtcbiAgICB9XG4gIH07XG59O1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vX2FyaXR5Jyk7XG5cblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHthcnJheX0gQW4gYXJyYXkgb2YgYXJndW1lbnRzIHJlY2VpdmVkIHRodXMgZmFyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeU4obGVuZ3RoLCByZWNlaXZlZCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb21iaW5lZCA9IFtdO1xuICAgIHZhciBhcmdzSWR4ID0gMDtcbiAgICB2YXIgbGVmdCA9IGxlbmd0aDtcbiAgICB2YXIgY29tYmluZWRJZHggPSAwO1xuICAgIHdoaWxlIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCB8fCBhcmdzSWR4IDwgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIGlmIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCAmJlxuICAgICAgICAgIChyZWNlaXZlZFtjb21iaW5lZElkeF0gPT0gbnVsbCB8fFxuICAgICAgICAgICByZWNlaXZlZFtjb21iaW5lZElkeF1bJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddICE9PSB0cnVlIHx8XG4gICAgICAgICAgIGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAocmVzdWx0ID09IG51bGwgfHwgcmVzdWx0WydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSAhPT0gdHJ1ZSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpIDogX2FyaXR5KGxlZnQsIF9jdXJyeU4obGVuZ3RoLCBjb21iaW5lZCwgZm4pKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjdXJyeU4gPSByZXF1aXJlKCdyYW1kYS9zcmMvY3VycnlOJyk7XG5cbi8vIFV0aWxpdHlcbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiAhIShvYmogJiYgb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jYWxsICYmIG9iai5hcHBseSk7XG59XG5mdW5jdGlvbiB0cnVlRm4oKSB7IHJldHVybiB0cnVlOyB9XG5cbi8vIEdsb2JhbHNcbnZhciB0b1VwZGF0ZSA9IFtdO1xudmFyIGluU3RyZWFtO1xudmFyIG9yZGVyID0gW107XG52YXIgb3JkZXJOZXh0SWR4ID0gLTE7XG52YXIgZmx1c2hpbmdVcGRhdGVRdWV1ZSA9IGZhbHNlO1xudmFyIGZsdXNoaW5nU3RyZWFtVmFsdWUgPSBmYWxzZTtcblxuZnVuY3Rpb24gZmx1c2hpbmcoKSB7XG4gIHJldHVybiBmbHVzaGluZ1VwZGF0ZVF1ZXVlIHx8IGZsdXNoaW5nU3RyZWFtVmFsdWU7XG59XG5cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBmbHlkID0ge31cblxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFQSSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbVxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuc3RyZWFtXG4gKiBAcGFyYW0geyp9IGluaXRpYWxWYWx1ZSAtIChPcHRpb25hbCkgdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHN0cmVhbVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuID0gZmx5ZC5zdHJlYW0oMSk7IC8vIFN0cmVhbSB3aXRoIGluaXRpYWwgdmFsdWUgYDFgXG4gKiB2YXIgcyA9IGZseWQuc3RyZWFtKCk7IC8vIFN0cmVhbSB3aXRoIG5vIGluaXRpYWwgdmFsdWVcbiAqL1xuZmx5ZC5zdHJlYW0gPSBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgdmFyIGVuZFN0cmVhbSA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShbXSwgdHJ1ZUZuKTtcbiAgdmFyIHMgPSBjcmVhdGVTdHJlYW0oKTtcbiAgcy5lbmQgPSBlbmRTdHJlYW07XG4gIHMuZm5BcmdzID0gW107XG4gIGVuZFN0cmVhbS5saXN0ZW5lcnMucHVzaChzKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSBzKGluaXRpYWxWYWx1ZSk7XG4gIHJldHVybiBzO1xufVxuLy8gZmFudGFzeS1sYW5kIEFwcGxpY2F0aXZlXG5mbHlkLnN0cmVhbVsnZmFudGFzeS1sYW5kL29mJ10gPSBmbHlkLnN0cmVhbS5vZiA9IGZseWQuc3RyZWFtO1xuXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGRlcGVuZGVudCBzdHJlYW1cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKC4uLlN0cmVhbSAqIC0+IFN0cmVhbSBiIC0+IGIpIC0+IFtTdHJlYW0gKl0gLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5jb21iaW5lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbWJpbmUgdGhlIHN0cmVhbXNcbiAqIEBwYXJhbSB7QXJyYXk8c3RyZWFtPn0gZGVwZW5kZW5jaWVzIC0gdGhlIHN0cmVhbXMgdGhhdCB0aGlzIG9uZSBkZXBlbmRzIG9uXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBkZXBlbmRlbnQgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuMSA9IGZseWQuc3RyZWFtKDApO1xuICogdmFyIG4yID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgbWF4ID0gZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKG4xLCBuMiwgc2VsZiwgY2hhbmdlZCkge1xuICogICByZXR1cm4gbjEoKSA+IG4yKCkgPyBuMSgpIDogbjIoKTtcbiAqIH0sIFtuMSwgbjJdKTtcbiAqL1xuZmx5ZC5jb21iaW5lID0gY3VycnlOKDIsIGNvbWJpbmUpO1xuZnVuY3Rpb24gY29tYmluZShmbiwgc3RyZWFtcykge1xuICB2YXIgaSwgcywgZGVwcywgZGVwRW5kU3RyZWFtcztcbiAgdmFyIGVuZFN0cmVhbSA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShbXSwgdHJ1ZUZuKTtcbiAgZGVwcyA9IFtdOyBkZXBFbmRTdHJlYW1zID0gW107XG4gIGZvciAoaSA9IDA7IGkgPCBzdHJlYW1zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHN0cmVhbXNbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVwcy5wdXNoKHN0cmVhbXNbaV0pO1xuICAgICAgaWYgKHN0cmVhbXNbaV0uZW5kICE9PSB1bmRlZmluZWQpIGRlcEVuZFN0cmVhbXMucHVzaChzdHJlYW1zW2ldLmVuZCk7XG4gICAgfVxuICB9XG4gIHMgPSBjcmVhdGVEZXBlbmRlbnRTdHJlYW0oZGVwcywgZm4pO1xuICBzLmRlcHNDaGFuZ2VkID0gW107XG4gIHMuZm5BcmdzID0gcy5kZXBzLmNvbmNhdChbcywgcy5kZXBzQ2hhbmdlZF0pO1xuICBzLmVuZCA9IGVuZFN0cmVhbTtcbiAgZW5kU3RyZWFtLmxpc3RlbmVycy5wdXNoKHMpO1xuICBhZGRMaXN0ZW5lcnMoZGVwRW5kU3RyZWFtcywgZW5kU3RyZWFtKTtcbiAgZW5kU3RyZWFtLmRlcHMgPSBkZXBFbmRTdHJlYW1zO1xuICB1cGRhdGVTdHJlYW0ocyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzdXBwbGllZCBhcmd1bWVudCBpcyBhIEZseWQgc3RyZWFtIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKiAtPiBCb29sZWFuYFxuICpcbiAqIEBuYW1lIGZseWQuaXNTdHJlYW1cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGlzIGEgRmx5ZCBzdHJlYW1uLCBgZmFsc2VgIG90aGVyd2lzZVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcyA9IGZseWQuc3RyZWFtKDEpO1xuICogdmFyIG4gPSAxO1xuICogZmx5ZC5pc1N0cmVhbShzKTsgLy89PiB0cnVlXG4gKiBmbHlkLmlzU3RyZWFtKG4pOyAvLz0+IGZhbHNlXG4gKi9cbmZseWQuaXNTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgcmV0dXJuIGlzRnVuY3Rpb24oc3RyZWFtKSAmJiAnaGFzVmFsJyBpbiBzdHJlYW07XG59XG5cbi8qKlxuICogSW52b2tlcyB0aGUgYm9keSAodGhlIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgdmFsdWUpIG9mIGEgZGVwZW5kZW50IHN0cmVhbVxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgYSBkZXBlbmRlbnQgc3RyZWFtIGlzIG9ubHkgY2FsbGVkIHdoZW4gYWxsIHRoZSBzdHJlYW1zXG4gKiB1cG9uIHdoaWNoIGl0IGRlcGVuZHMgaGFzIGEgdmFsdWUuIGBpbW1lZGlhdGVgIGNhbiBjaXJjdW12ZW50IHRoaXMgYmVoYXZpb3VyLlxuICogSXQgaW1tZWRpYXRlbHkgaW52b2tlcyB0aGUgYm9keSBvZiBhIGRlcGVuZGVudCBzdHJlYW0uXG4gKlxuICogX19TaWduYXR1cmVfXzogYFN0cmVhbSBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuaW1tZWRpYXRlXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIGRlcGVuZGVudCBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIHNhbWUgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIHZhciBoYXNJdGVtcyA9IGZseWQuaW1tZWRpYXRlKGZseWQuY29tYmluZShmdW5jdGlvbihzKSB7XG4gKiAgIHJldHVybiBzKCkgIT09IHVuZGVmaW5lZCAmJiBzKCkubGVuZ3RoID4gMDtcbiAqIH0sIFtzXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgZmFsc2VgLiBIYWQgYGltbWVkaWF0ZWAgbm90IGJlZW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2VkIGBoYXNJdGVtcygpYCB3b3VsZCd2ZSByZXR1cm5lZCBgdW5kZWZpbmVkYFxuICogcyhbMV0pO1xuICogY29uc29sZS5sb2coaGFzSXRlbXMoKSk7IC8vIGxvZ3MgYHRydWVgLlxuICogcyhbXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgZmFsc2VgLlxuICovXG5mbHlkLmltbWVkaWF0ZSA9IGZ1bmN0aW9uKHMpIHtcbiAgaWYgKHMuZGVwc01ldCA9PT0gZmFsc2UpIHtcbiAgICBzLmRlcHNNZXQgPSB0cnVlO1xuICAgIHVwZGF0ZVN0cmVhbShzKTtcbiAgfVxuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIHdoaWNoIGBlbmRzU3RyZWFtYCBzaG91bGQgdHJpZ2dlciB0aGUgZW5kaW5nIG9mIGBzYC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgU3RyZWFtIGEgLT4gU3RyZWFtIGIgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5lbmRzT25cbiAqIEBwYXJhbSB7c3RyZWFtfSBlbmRTdHJlYW0gLSB0aGUgc3RyZWFtIHRvIHRyaWdnZXIgdGhlIGVuZGluZ1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gYmUgZW5kZWQgYnkgdGhlIGVuZFN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHRoZSBzdHJlYW0gbW9kaWZpZWQgdG8gYmUgZW5kZWQgYnkgZW5kU3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuID0gZmx5ZC5zdHJlYW0oMSk7XG4gKiB2YXIga2lsbGVyID0gZmx5ZC5zdHJlYW0oKTtcbiAqIC8vIGBkb3VibGVgIGVuZHMgd2hlbiBgbmAgZW5kcyBvciB3aGVuIGBraWxsZXJgIGVtaXRzIGFueSB2YWx1ZVxuICogdmFyIGRvdWJsZSA9IGZseWQuZW5kc09uKGZseWQubWVyZ2Uobi5lbmQsIGtpbGxlciksIGZseWQuY29tYmluZShmdW5jdGlvbihuKSB7XG4gKiAgIHJldHVybiAyICogbigpO1xuICogfSwgW25dKTtcbiovXG5mbHlkLmVuZHNPbiA9IGZ1bmN0aW9uKGVuZFMsIHMpIHtcbiAgZGV0YWNoRGVwcyhzLmVuZCk7XG4gIGVuZFMubGlzdGVuZXJzLnB1c2gocy5lbmQpO1xuICBzLmVuZC5kZXBzLnB1c2goZW5kUyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIE1hcCBhIHN0cmVhbVxuICpcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIGNvbnNpc3Rpbmcgb2YgZXZlcnkgdmFsdWUgZnJvbSBgc2AgcGFzc2VkIHRocm91Z2hcbiAqIGBmbmAuIEkuZS4gYG1hcGAgY3JlYXRlcyBhIG5ldyBzdHJlYW0gdGhhdCBsaXN0ZW5zIHRvIGBzYCBhbmRcbiAqIGFwcGxpZXMgYGZuYCB0byBldmVyeSBuZXcgdmFsdWUuXG4gKiBfX1NpZ25hdHVyZV9fOiBgKGEgLT4gcmVzdWx0KSAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gcmVzdWx0YFxuICpcbiAqIEBuYW1lIGZseWQubWFwXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIHRoZSBlbGVtZW50cyBvZiB0aGUgbmV3IHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gbWFwXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBtYXBwZWQgdmFsdWVzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBudW1iZXJzID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgc3F1YXJlZE51bWJlcnMgPSBmbHlkLm1hcChmdW5jdGlvbihuKSB7IHJldHVybiBuKm47IH0sIG51bWJlcnMpO1xuICovXG4vLyBMaWJyYXJ5IGZ1bmN0aW9ucyB1c2Ugc2VsZiBjYWxsYmFjayB0byBhY2NlcHQgKG51bGwsIHVuZGVmaW5lZCkgdXBkYXRlIHRyaWdnZXJzLlxuZnVuY3Rpb24gbWFwKGYsIHMpIHtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24ocywgc2VsZikgeyBzZWxmKGYocy52YWwpKTsgfSwgW3NdKTtcbn1cbmZseWQubWFwID0gY3VycnlOKDIsIG1hcClcblxuLyoqXG4gKiBDaGFpbiBhIHN0cmVhbVxuICpcbiAqIGFsc28ga25vd24gYXMgZmxhdE1hcFxuICpcbiAqIFdoZXJlIGBmbmAgcmV0dXJucyBhIHN0cmVhbSB0aGlzIGZ1bmN0aW9uIHdpbGwgZmxhdHRlbiB0aGUgcmVzdWx0aW5nIHN0cmVhbXMuXG4gKiBFdmVyeSB0aW1lIGBmbmAgaXMgY2FsbGVkIHRoZSBjb250ZXh0IG9mIHRoZSByZXR1cm5lZCBzdHJlYW0gd2lsbCBcInN3aXRjaFwiIHRvIHRoYXQgc3RyZWFtLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAoYSAtPiBTdHJlYW0gYikgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5jaGFpblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyB0aGUgc3RyZWFtcyB0byBiZSBmbGF0dGVuZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIG1hcFxuICogQHJldHVybiB7c3RyZWFtfSBhIG5ldyBzdHJlYW0gd2l0aCB0aGUgbWFwcGVkIHZhbHVlc1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZmlsdGVyID0gZmx5ZC5zdHJlYW0oJ3dobycpO1xuICogdmFyIGl0ZW1zID0gZmx5ZC5jaGFpbihmdW5jdGlvbihmaWx0ZXIpe1xuICogICByZXR1cm4gZmx5ZC5zdHJlYW0oZmluZFVzZXJzKGZpbHRlcikpO1xuICogfSwgZmlsdGVyKTtcbiAqL1xuZmx5ZC5jaGFpbiA9IGN1cnJ5TigyLCBjaGFpbik7XG5cbi8qKlxuICogQXBwbHkgYSBzdHJlYW1cbiAqXG4gKiBBcHBsaWVzIHRoZSB2YWx1ZSBpbiBgczJgIHRvIHRoZSBmdW5jdGlvbiBpbiBgczFgLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBTdHJlYW0gKGEgLT4gYikgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5hcFxuICogQHBhcmFtIHtzdHJlYW19IHMxIC0gVGhlIHZhbHVlIHRvIGJlIGFwcGxpZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzMiAtIFRoZSBmdW5jdGlvbiBleHBlY3RpbmcgdGhlIHZhbHVlXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBtYXBwZWQgdmFsdWVzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBhZGQgPSBzdHJlYW0oYSA9PiBiID0+IGEgKyBiKVxuICogdmFyIG4xID0gc3RyZWFtKDEpXG4gKiB2YXIgbjIgPSBzdHJlYW0oMilcbiAqXG4gKiB2YXIgYWRkZWQgPSBmbHlkLmFwKG4yLCBmbHlkLmFwKG4xLCBhZGQpKSAvLyBzdHJlYW0oMylcbiAqIC8vIGNhbiBhbHNvIGJlIHdyaXR0ZW4gdXNpbmcgcGlwZVxuICogdmFyIGFkZGVkX3BpcGUgPSBhZGRcbiAqICAgLnBpcGUoYXAobjEpKVxuICogICAucGlwZShhcChuMikpO1xuICogYWRkZWRfcGlwZSgpIC8vIDNcbiAqL1xuZmx5ZC5hcCA9IGN1cnJ5TigyLCBhcCk7XG5cbi8qKlxuICogTGlzdGVuIHRvIHN0cmVhbSBldmVudHNcbiAqXG4gKiBTaW1pbGFyIHRvIGBtYXBgIGV4Y2VwdCB0aGF0IHRoZSByZXR1cm5lZCBzdHJlYW0gaXMgZW1wdHkuIFVzZSBgb25gIGZvciBkb2luZ1xuICogc2lkZSBlZmZlY3RzIGluIHJlYWN0aW9uIHRvIHN0cmVhbSBjaGFuZ2VzLiBVc2UgdGhlIHJldHVybmVkIHN0cmVhbSBvbmx5IGlmIHlvdVxuICogbmVlZCB0byBtYW51YWxseSBlbmQgaXQuXG4gKlxuICogX19TaWduYXR1cmVfXzogYChhIC0+IHJlc3VsdCkgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIHVuZGVmaW5lZGBcbiAqXG4gKiBAbmFtZSBmbHlkLm9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIHRoZSBjYWxsYmFja1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gYW4gZW1wdHkgc3RyZWFtIChjYW4gYmUgZW5kZWQpXG4gKi9cbmZseWQub24gPSBjdXJyeU4oMiwgZnVuY3Rpb24oZiwgcykge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzKSB7IGYocy52YWwpOyB9LCBbc10pO1xufSlcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbSB3aXRoIHRoZSByZXN1bHRzIG9mIGNhbGxpbmcgdGhlIGZ1bmN0aW9uIG9uIGV2ZXJ5IGluY29taW5nXG4gKiBzdHJlYW0gd2l0aCBhbmQgYWNjdW11bGF0b3IgYW5kIHRoZSBpbmNvbWluZyB2YWx1ZS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKGEgLT4gYiAtPiBhKSAtPiBhIC0+IFN0cmVhbSBiIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuc2NhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHsqfSB2YWwgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgYWNjdW11bGF0b3JcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHNvdXJjZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbnVtYmVycyA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgc3VtID0gZmx5ZC5zY2FuKGZ1bmN0aW9uKHN1bSwgbikgeyByZXR1cm4gc3VtK247IH0sIDAsIG51bWJlcnMpO1xuICogbnVtYmVycygyKSgzKSg1KTtcbiAqIHN1bSgpOyAvLyAxMFxuICovXG5mbHlkLnNjYW4gPSBjdXJyeU4oMywgZnVuY3Rpb24oZiwgYWNjLCBzKSB7XG4gIHZhciBucyA9IGNvbWJpbmUoZnVuY3Rpb24ocywgc2VsZikge1xuICAgIHNlbGYoYWNjID0gZihhY2MsIHMudmFsKSk7XG4gIH0sIFtzXSk7XG4gIGlmICghbnMuaGFzVmFsKSBucyhhY2MpO1xuICByZXR1cm4gbnM7XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbSBkb3duIHdoaWNoIGFsbCB2YWx1ZXMgZnJvbSBib3RoIGBzdHJlYW0xYCBhbmQgYHN0cmVhbTJgXG4gKiB3aWxsIGJlIHNlbnQuXG4gKlxuICogX19TaWduYXR1cmVfXzogYFN0cmVhbSBhIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQubWVyZ2VcbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UxIC0gb25lIHN0cmVhbSB0byBiZSBtZXJnZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UyIC0gdGhlIG90aGVyIHN0cmVhbSB0byBiZSBtZXJnZWRcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBzdHJlYW0gd2l0aCB0aGUgdmFsdWVzIGZyb20gYm90aCBzb3VyY2VzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBidG4xQ2xpY2tzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIGJ1dHRvbjFFbG0uYWRkRXZlbnRMaXN0ZW5lcihidG4xQ2xpY2tzKTtcbiAqIHZhciBidG4yQ2xpY2tzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIGJ1dHRvbjJFbG0uYWRkRXZlbnRMaXN0ZW5lcihidG4yQ2xpY2tzKTtcbiAqIHZhciBhbGxDbGlja3MgPSBmbHlkLm1lcmdlKGJ0bjFDbGlja3MsIGJ0bjJDbGlja3MpO1xuICovXG5mbHlkLm1lcmdlID0gY3VycnlOKDIsIGZ1bmN0aW9uKHMxLCBzMikge1xuICB2YXIgcyA9IGZseWQuaW1tZWRpYXRlKGNvbWJpbmUoZnVuY3Rpb24oczEsIHMyLCBzZWxmLCBjaGFuZ2VkKSB7XG4gICAgaWYgKGNoYW5nZWRbMF0pIHtcbiAgICAgIHNlbGYoY2hhbmdlZFswXSgpKTtcbiAgICB9IGVsc2UgaWYgKHMxLmhhc1ZhbCkge1xuICAgICAgc2VsZihzMS52YWwpO1xuICAgIH0gZWxzZSBpZiAoczIuaGFzVmFsKSB7XG4gICAgICBzZWxmKHMyLnZhbCk7XG4gICAgfVxuICB9LCBbczEsIHMyXSkpO1xuICBmbHlkLmVuZHNPbihjb21iaW5lKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9LCBbczEuZW5kLCBzMi5lbmRdKSwgcyk7XG4gIHJldHVybiBzO1xufSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzdHJlYW0gcmVzdWx0aW5nIGZyb20gYXBwbHlpbmcgYHRyYW5zZHVjZXJgIHRvIGBzdHJlYW1gLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBUcmFuc2R1Y2VyIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIGZseWQudHJhbnNkdWNlXG4gKiBAcGFyYW0ge1RyYW5zZHVjZXJ9IHhmb3JtIC0gdGhlIHRyYW5zZHVjZXIgdHJhbnNmb3JtYXRpb25cbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UgLSB0aGUgc3RyZWFtIHNvdXJjZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgdCA9IHJlcXVpcmUoJ3RyYW5zZHVjZXJzLmpzJyk7XG4gKlxuICogdmFyIHJlc3VsdHMgPSBbXTtcbiAqIHZhciBzMSA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgdHggPSB0LmNvbXBvc2UodC5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4geCAqIDI7IH0pLCB0LmRlZHVwZSgpKTtcbiAqIHZhciBzMiA9IGZseWQudHJhbnNkdWNlKHR4LCBzMSk7XG4gKiBmbHlkLmNvbWJpbmUoZnVuY3Rpb24oczIpIHsgcmVzdWx0cy5wdXNoKHMyKCkpOyB9LCBbczJdKTtcbiAqIHMxKDEpKDEpKDIpKDMpKDMpKDMpKDQpO1xuICogcmVzdWx0czsgLy8gPT4gWzIsIDQsIDYsIDhdXG4gKi9cbmZseWQudHJhbnNkdWNlID0gY3VycnlOKDIsIGZ1bmN0aW9uKHhmb3JtLCBzb3VyY2UpIHtcbiAgeGZvcm0gPSB4Zm9ybShuZXcgU3RyZWFtVHJhbnNmb3JtZXIoKSk7XG4gIHJldHVybiBjb21iaW5lKGZ1bmN0aW9uKHNvdXJjZSwgc2VsZikge1xuICAgIHZhciByZXMgPSB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSh1bmRlZmluZWQsIHNvdXJjZS52YWwpO1xuICAgIGlmIChyZXMgJiYgcmVzWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID09PSB0cnVlKSB7XG4gICAgICBzZWxmLmVuZCh0cnVlKTtcbiAgICAgIHJldHVybiByZXNbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfSwgW3NvdXJjZV0pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBgZm5gIGN1cnJpZWQgdG8gYG5gLiBVc2UgdGhpcyBmdW5jdGlvbiB0byBjdXJyeSBmdW5jdGlvbnMgZXhwb3NlZCBieVxuICogbW9kdWxlcyBmb3IgRmx5ZC5cbiAqXG4gKiBAbmFtZSBmbHlkLmN1cnJ5TlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGFyaXR5IC0gdGhlIGZ1bmN0aW9uIGFyaXR5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0byBjdXJyeVxuICogQHJldHVybiB7RnVuY3Rpb259IHRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIGFkZCh4LCB5KSB7IHJldHVybiB4ICsgeTsgfTtcbiAqIHZhciBhID0gZmx5ZC5jdXJyeU4oMiwgYWRkKTtcbiAqIGEoMikoNCkgLy8gPT4gNlxuICovXG5mbHlkLmN1cnJ5TiA9IGN1cnJ5TlxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIGlkZW50aWNhbCB0byB0aGUgb3JpZ2luYWwgZXhjZXB0IGV2ZXJ5XG4gKiB2YWx1ZSB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIGBmYC5cbiAqXG4gKiBfTm90ZTpfIFRoaXMgZnVuY3Rpb24gaXMgaW5jbHVkZWQgaW4gb3JkZXIgdG8gc3VwcG9ydCB0aGUgZmFudGFzeSBsYW5kXG4gKiBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IENhbGxlZCBib3VuZCB0byBgU3RyZWFtIGFgOiBgKGEgLT4gYikgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgc3RyZWFtLm1hcFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSB0aGUgZnVuY3Rpb24gdG8gYXBwbHlcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggdGhlIHZhbHVlcyBtYXBwZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG51bWJlcnMgPSBmbHlkLnN0cmVhbSgwKTtcbiAqIHZhciBzcXVhcmVkTnVtYmVycyA9IG51bWJlcnMubWFwKGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4qbjsgfSk7XG4gKi9cbmZ1bmN0aW9uIGJvdW5kTWFwKGYpIHsgcmV0dXJuIG1hcChmLCB0aGlzKTsgfVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBmdW5jdGlvbiBgZm5gIHRvIHRoaXMgc3RyZWFtXG4gKlxuICogX19TaWduYXR1cmVfXzogQ2FsbGVkIGJvdW5kIHRvIGBTdHJlYW0gYWA6IGAoYSAtPiBTdHJlYW0gYikgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgc3RyZWFtLnBpcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRvIGFwcGx5XG4gKiBAcmV0dXJuIHtzdHJlYW19IEEgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbnVtYmVycyA9IGZseWQuc3RyZWFtKDApO1xuICogdmFyIHNxdWFyZWROdW1iZXJzID0gbnVtYmVycy5waXBlKGZseWQubWFwKGZ1bmN0aW9uKG4peyByZXR1cm4gbipuOyB9KSk7XG4gKi9cbmZ1bmN0aW9uIG9wZXJhdG9yX3BpcGUoZikgeyByZXR1cm4gZih0aGlzKSB9XG5cbmZ1bmN0aW9uIGJvdW5kQ2hhaW4oZikge1xuICByZXR1cm4gY2hhaW4oZiwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGNoYWluKGYsIHMpIHtcbiAgLy8gSW50ZXJuYWwgc3RhdGUgdG8gZW5kIGZsYXQgbWFwIHN0cmVhbVxuICB2YXIgZmxhdEVuZCA9IGZseWQuc3RyZWFtKDEpO1xuICB2YXIgaW50ZXJuYWxFbmRlZCA9IGZseWQub24oZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFsaXZlID0gZmxhdEVuZCgpIC0gMTtcbiAgICBmbGF0RW5kKGFsaXZlKTtcbiAgICBpZiAoYWxpdmUgPD0gMCkge1xuICAgICAgZmxhdEVuZC5lbmQodHJ1ZSk7XG4gICAgfVxuICB9KTtcblxuICBpbnRlcm5hbEVuZGVkKHMuZW5kKTtcbiAgdmFyIGxhc3QgPSBmbHlkLnN0cmVhbSgpO1xuICB2YXIgZmxhdFN0cmVhbSA9IGZseWQuY29tYmluZShmdW5jdGlvbihzLCBvd24pIHtcbiAgICBsYXN0LmVuZCh0cnVlKVxuICAgIC8vIE91ciBmbiBzdHJlYW0gbWFrZXMgc3RyZWFtc1xuICAgIHZhciBuZXdTID0gZihzKCkpO1xuICAgIGZsYXRFbmQoZmxhdEVuZCgpICsgMSk7XG4gICAgaW50ZXJuYWxFbmRlZChuZXdTLmVuZCk7XG5cbiAgICAvLyBVcGRhdGUgc2VsZiBvbiBjYWxsIC0tIG5ld1MgaXMgbmV2ZXIgaGFuZGVkIG91dCBzbyBkZXBzIGRvbid0IG1hdHRlclxuICAgIGxhc3QgPSBtYXAob3duLCBuZXdTKTtcbiAgfSwgW3NdKTtcblxuICBmbHlkLmVuZHNPbihmbGF0RW5kLmVuZCwgZmxhdFN0cmVhbSk7XG5cbiAgcmV0dXJuIGZsYXRTdHJlYW07XG59XG5cbmZseWQuZnJvbVByb21pc2UgPSBmdW5jdGlvbiBmcm9tUHJvbWlzZShwKSB7XG4gIHZhciBzID0gZmx5ZC5zdHJlYW0oKTtcbiAgcC50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgIHModmFsKTtcbiAgICBzLmVuZCh0cnVlKTtcbiAgfSk7XG4gIHJldHVybiBzO1xufVxuXG5mbHlkLmZsYXR0ZW5Qcm9taXNlID0gZnVuY3Rpb24gZmxhdHRlblByb21pc2Uocykge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzLCBzZWxmKSB7XG4gICAgcygpLnRoZW4oc2VsZik7XG4gIH0sIFtzXSlcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlXG4gKiBmdW5jdGlvbnMgZnJvbSBgdGhpc2Agc3RyZWFtIHRvIHRoZSB2YWx1ZXMgaW4gYHN0cmVhbWAgcGFyYW1ldGVyLlxuICpcbiAqIGB0aGlzYCBzdHJlYW0gbXVzdCBiZSBhIHN0cmVhbSBvZiBmdW5jdGlvbnMuXG4gKlxuICogX05vdGU6XyBUaGlzIGZ1bmN0aW9uIGlzIGluY2x1ZGVkIGluIG9yZGVyIHRvIHN1cHBvcnQgdGhlIGZhbnRhc3kgbGFuZFxuICogc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSAoYSAtPiBiKWA6IGBhIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIHN0cmVhbS5hcFxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSB2YWx1ZXMgc3RyZWFtXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBmdW5jdGlvbnMgYXBwbGllZCB0byB2YWx1ZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGFkZCA9IGZseWQuY3VycnlOKDIsIGZ1bmN0aW9uKHgsIHkpIHsgcmV0dXJuIHggKyB5OyB9KTtcbiAqIHZhciBudW1iZXJzMSA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgbnVtYmVyczIgPSBmbHlkLnN0cmVhbSgpO1xuICogdmFyIGFkZFRvTnVtYmVyczEgPSBmbHlkLm1hcChhZGQsIG51bWJlcnMxKTtcbiAqIHZhciBhZGRlZCA9IGFkZFRvTnVtYmVyczEuYXAobnVtYmVyczIpO1xuICovXG5mdW5jdGlvbiBhcChzMiwgczEpIHtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24oczEsIHMyLCBzZWxmKSB7IHNlbGYoczEudmFsKHMyLnZhbCkpOyB9LCBbczEsIHMyXSk7XG59XG5cbmZ1bmN0aW9uIGJvdW5kQXAoczIpIHtcbiAgcmV0dXJuIGFwKHMyLCB0aGlzKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBmYW50YXN5X2xhbmRfYXAoczEpIHtcbiAgcmV0dXJuIGFwKHRoaXMsIHMxKTtcbn1cblxuLyoqXG4gKiBHZXQgYSBodW1hbiByZWFkYWJsZSB2aWV3IG9mIGEgc3RyZWFtXG4gKiBAbmFtZSBzdHJlYW0udG9TdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHN0cmVhbSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gc3RyZWFtVG9TdHJpbmcoKSB7XG4gIHJldHVybiAnc3RyZWFtKCcgKyB0aGlzLnZhbCArICcpJztcbn1cblxuLyoqXG4gKiBAbmFtZSBzdHJlYW0uZW5kXG4gKiBAbWVtYmVyb2Ygc3RyZWFtXG4gKiBBIHN0cmVhbSB0aGF0IGVtaXRzIGB0cnVlYCB3aGVuIHRoZSBzdHJlYW0gZW5kcy4gSWYgYHRydWVgIGlzIHB1c2hlZCBkb3duIHRoZVxuICogc3RyZWFtIHRoZSBwYXJlbnQgc3RyZWFtIGVuZHMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdHJlYW0ub2ZcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHN0cmVhbVxuICogUmV0dXJucyBhIG5ldyBzdHJlYW0gd2l0aCBgdmFsdWVgIGFzIGl0cyBpbml0aWFsIHZhbHVlLiBJdCBpcyBpZGVudGljYWwgdG9cbiAqIGNhbGxpbmcgYGZseWQuc3RyZWFtYCB3aXRoIG9uZSBhcmd1bWVudC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSAoYSlgOiBgYiAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gdGhlIGluaXRpYWwgdmFsdWVcbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIG5ldyBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4gPSBmbHlkLnN0cmVhbSgxKTtcbiAqIHZhciBtID0gbi5vZigxKTtcbiAqL1xuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUFJJVkFURSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cbi8qKlxuICogQHByaXZhdGVcbiAqIENyZWF0ZSBhIHN0cmVhbSB3aXRoIG5vIGRlcGVuZGVuY2llcyBhbmQgbm8gdmFsdWVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZseWQgc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0cmVhbSgpIHtcbiAgZnVuY3Rpb24gcyhuKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBzLnZhbFxuICAgIHVwZGF0ZVN0cmVhbVZhbHVlKG4sIHMpXG4gICAgcmV0dXJuIHNcbiAgfVxuICBzLmhhc1ZhbCA9IGZhbHNlO1xuICBzLnZhbCA9IHVuZGVmaW5lZDtcbiAgcy51cGRhdGVycyA9IFtdO1xuICBzLmxpc3RlbmVycyA9IFtdO1xuICBzLnF1ZXVlZCA9IGZhbHNlO1xuICBzLmVuZCA9IHVuZGVmaW5lZDtcblxuICAvLyBmYW50YXN5LWxhbmQgY29tcGF0aWJpbGl0eVxuICBzLmFwID0gYm91bmRBcDtcbiAgc1snZmFudGFzeS1sYW5kL21hcCddID0gcy5tYXAgPSBib3VuZE1hcDtcbiAgc1snZmFudGFzeS1sYW5kL2FwJ10gPSBmYW50YXN5X2xhbmRfYXA7XG4gIHNbJ2ZhbnRhc3ktbGFuZC9vZiddID0gcy5vZiA9IGZseWQuc3RyZWFtO1xuICBzWydmYW50YXN5LWxhbmQvY2hhaW4nXSA9IHMuY2hhaW4gPSBib3VuZENoYWluO1xuXG4gIHMucGlwZSA9IG9wZXJhdG9yX3BpcGU7XG5cbiAgLy8gQWNjb3JkaW5nIHRvIHRoZSBmYW50YXN5LWxhbmQgQXBwbGljYXRpdmUgc3BlY2lmaWNhdGlvblxuICAvLyBHaXZlbiBhIHZhbHVlIGYsIG9uZSBjYW4gYWNjZXNzIGl0cyB0eXBlIHJlcHJlc2VudGF0aXZlIHZpYSB0aGUgY29uc3RydWN0b3IgcHJvcGVydHk6XG4gIC8vIGBmLmNvbnN0cnVjdG9yLm9mYFxuICBzLmNvbnN0cnVjdG9yID0gZmx5ZC5zdHJlYW07XG5cbiAgcy50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcy52YWw7XG4gIH1cbiAgcy50b1N0cmluZyA9IHN0cmVhbVRvU3RyaW5nO1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ3JlYXRlIGEgZGVwZW5kZW50IHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXMgLSBhbiBhcnJheSBvZiB0aGUgc3RyZWFtc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ldyBzdHJlYW0gdmFsdWVcbiAqIGZyb20gdGhlIGRlcGVuZGVuY2llc1xuICogQHJldHVybiB7c3RyZWFtfSB0aGUgY3JlYXRlZCBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGVwZW5kZW50U3RyZWFtKGRlcHMsIGZuKSB7XG4gIHZhciBzID0gY3JlYXRlU3RyZWFtKCk7XG4gIHMuZm4gPSBmbjtcbiAgcy5kZXBzID0gZGVwcztcbiAgcy5kZXBzTWV0ID0gZmFsc2U7XG4gIHMuZGVwc0NoYW5nZWQgPSBkZXBzLmxlbmd0aCA+IDAgPyBbXSA6IHVuZGVmaW5lZDtcbiAgcy5zaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgYWRkTGlzdGVuZXJzKGRlcHMsIHMpO1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ2hlY2sgaWYgYWxsIHRoZSBkZXBlbmRlbmNpZXMgaGF2ZSB2YWx1ZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIGNoZWNrIGRlcGVuY2VuY2llcyBmcm9tXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYWxsIGRlcGVuZGVuY2llcyBoYXZlIHZhbGVzLCBgZmFsc2VgIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBpbml0aWFsRGVwZW5kZW5jaWVzTWV0KHN0cmVhbSkge1xuICBzdHJlYW0uZGVwc01ldCA9IHN0cmVhbS5kZXBzLmV2ZXJ5KGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gcy5oYXNWYWw7XG4gIH0pO1xuICByZXR1cm4gc3RyZWFtLmRlcHNNZXQ7XG59XG5cbmZ1bmN0aW9uIGRlcGVuZGVuY2llc0FyZU1ldChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5kZXBzTWV0ID09PSB0cnVlIHx8IGluaXRpYWxEZXBlbmRlbmNpZXNNZXQoc3RyZWFtKTtcbn1cblxuZnVuY3Rpb24gaXNFbmRlZChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5lbmQgJiYgc3RyZWFtLmVuZC52YWwgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGxpc3RlbmVyc05lZWRVcGRhdGluZyhzKSB7XG4gIHJldHVybiBzLmxpc3RlbmVycy5zb21lKGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMuc2hvdWxkVXBkYXRlOyB9KTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogVXBkYXRlIGEgZGVwZW5kZW50IHN0cmVhbSB1c2luZyBpdHMgZGVwZW5kZW5jaWVzIGluIGFuIGF0b21pYyB3YXlcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIHVwZGF0ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVTdHJlYW0ocykge1xuICBpZiAoaXNFbmRlZChzKSB8fCAhZGVwZW5kZW5jaWVzQXJlTWV0KHMpKSByZXR1cm47XG4gIGlmIChpblN0cmVhbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVTdHJlYW0sIHMpO1xuICAgIHJldHVybjtcbiAgfVxuICBpblN0cmVhbSA9IHM7XG4gIGlmIChzLmRlcHNDaGFuZ2VkKSBzLmZuQXJnc1tzLmZuQXJncy5sZW5ndGggLSAxXSA9IHMuZGVwc0NoYW5nZWQ7XG4gIHZhciByZXR1cm5WYWwgPSBzLmZuLmFwcGx5KHMuZm4sIHMuZm5BcmdzKTtcbiAgaWYgKHJldHVyblZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcyhyZXR1cm5WYWwpO1xuICB9XG4gIGluU3RyZWFtID0gdW5kZWZpbmVkO1xuICBpZiAocy5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBzLmRlcHNDaGFuZ2VkID0gW107XG4gIHMuc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gIGlmIChmbHVzaGluZygpID09PSBmYWxzZSkgZmx1c2hVcGRhdGUoKTtcbiAgaWYgKGxpc3RlbmVyc05lZWRVcGRhdGluZyhzKSkge1xuICAgIGlmICghZmx1c2hpbmdTdHJlYW1WYWx1ZSkgcyhzLnZhbClcbiAgICBlbHNlIHtcbiAgICAgIHMubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyLnNob3VsZFVwZGF0ZSkgdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVTdHJlYW0sIGxpc3RlbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBVcGRhdGUgdGhlIGRlcGVuZGVuY2llcyBvZiBhIHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICovXG5mdW5jdGlvbiB1cGRhdGVMaXN0ZW5lcnMocykge1xuICB2YXIgaSwgbywgbGlzdFxuICB2YXIgbGlzdGVuZXJzID0gcy5saXN0ZW5lcnM7XG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICBsaXN0ID0gbGlzdGVuZXJzW2ldO1xuICAgIGlmIChsaXN0LmVuZCA9PT0gcykge1xuICAgICAgZW5kU3RyZWFtKGxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGlzdC5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBsaXN0LmRlcHNDaGFuZ2VkLnB1c2gocyk7XG4gICAgICBsaXN0LnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICBmaW5kRGVwcyhsaXN0KTtcbiAgICB9XG4gIH1cbiAgZm9yICg7IG9yZGVyTmV4dElkeCA+PSAwOyAtLW9yZGVyTmV4dElkeCkge1xuICAgIG8gPSBvcmRlcltvcmRlck5leHRJZHhdO1xuICAgIGlmIChvLnNob3VsZFVwZGF0ZSA9PT0gdHJ1ZSkgdXBkYXRlU3RyZWFtKG8pO1xuICAgIG8ucXVldWVkID0gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQWRkIHN0cmVhbSBkZXBlbmRlbmNpZXMgdG8gdGhlIGdsb2JhbCBgb3JkZXJgIHF1ZXVlLlxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHNlZSB1cGRhdGVEZXBzXG4gKi9cbmZ1bmN0aW9uIGZpbmREZXBzKHMpIHtcbiAgdmFyIGlcbiAgdmFyIGxpc3RlbmVycyA9IHMubGlzdGVuZXJzO1xuICBpZiAocy5xdWV1ZWQgPT09IGZhbHNlKSB7XG4gICAgcy5xdWV1ZWQgPSB0cnVlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGZpbmREZXBzKGxpc3RlbmVyc1tpXSk7XG4gICAgfVxuICAgIG9yZGVyWysrb3JkZXJOZXh0SWR4XSA9IHM7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVyLCBzdHJlYW0pIHtcbiAgdG9VcGRhdGUucHVzaChzdHJlYW0pO1xuICBzdHJlYW0udXBkYXRlcnMucHVzaCh1cGRhdGVyKTtcbiAgc3RyZWFtLnNob3VsZFVwZGF0ZSA9IHRydWU7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZmx1c2hVcGRhdGUoKSB7XG4gIGZsdXNoaW5nVXBkYXRlUXVldWUgPSB0cnVlO1xuICB3aGlsZSAodG9VcGRhdGUubGVuZ3RoID4gMCkge1xuICAgIHZhciBzdHJlYW0gPSB0b1VwZGF0ZS5zaGlmdCgpO1xuICAgIHZhciBuZXh0VXBkYXRlRm4gPSBzdHJlYW0udXBkYXRlcnMuc2hpZnQoKTtcbiAgICBpZiAobmV4dFVwZGF0ZUZuICYmIHN0cmVhbS5zaG91bGRVcGRhdGUpIG5leHRVcGRhdGVGbihzdHJlYW0pO1xuICB9XG4gIGZsdXNoaW5nVXBkYXRlUXVldWUgPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogUHVzaCBkb3duIGEgdmFsdWUgaW50byBhIHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVTdHJlYW1WYWx1ZShuLCBzKSB7XG4gIHMudmFsID0gbjtcbiAgcy5oYXNWYWwgPSB0cnVlO1xuICBpZiAoaW5TdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgIGZsdXNoaW5nU3RyZWFtVmFsdWUgPSB0cnVlO1xuICAgIHVwZGF0ZUxpc3RlbmVycyhzKTtcbiAgICBpZiAodG9VcGRhdGUubGVuZ3RoID4gMCkgZmx1c2hVcGRhdGUoKTtcbiAgICBmbHVzaGluZ1N0cmVhbVZhbHVlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaW5TdHJlYW0gPT09IHMpIHtcbiAgICBtYXJrTGlzdGVuZXJzKHMsIHMubGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVMYXRlclVzaW5nKGZ1bmN0aW9uKHMpIHsgdXBkYXRlU3RyZWFtVmFsdWUobiwgcyk7IH0sIHMpO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFya0xpc3RlbmVycyhzLCBsaXN0cykge1xuICB2YXIgaSwgbGlzdDtcbiAgZm9yIChpID0gMDsgaSA8IGxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgbGlzdCA9IGxpc3RzW2ldO1xuICAgIGlmIChsaXN0LmVuZCAhPT0gcykge1xuICAgICAgaWYgKGxpc3QuZGVwc0NoYW5nZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsaXN0LmRlcHNDaGFuZ2VkLnB1c2gocyk7XG4gICAgICB9XG4gICAgICBsaXN0LnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuZFN0cmVhbShsaXN0KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQWRkIGRlcGVuZGVuY2llcyB0byBhIHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGRlcHMsIHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgKytpKSB7XG4gICAgZGVwc1tpXS5saXN0ZW5lcnMucHVzaChzKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBSZW1vdmVzIGFuIHN0cmVhbSBmcm9tIGEgZGVwZW5kZW5jeSBhcnJheVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIocywgbGlzdGVuZXJzKSB7XG4gIHZhciBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihzKTtcbiAgbGlzdGVuZXJzW2lkeF0gPSBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdO1xuICBsaXN0ZW5lcnMubGVuZ3RoLS07XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIERldGFjaCBhIHN0cmVhbSBmcm9tIGl0cyBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gZGV0YWNoRGVwcyhzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5kZXBzLmxlbmd0aDsgKytpKSB7XG4gICAgcmVtb3ZlTGlzdGVuZXIocywgcy5kZXBzW2ldLmxpc3RlbmVycyk7XG4gIH1cbiAgcy5kZXBzLmxlbmd0aCA9IDA7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIEVuZHMgYSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gZW5kU3RyZWFtKHMpIHtcbiAgaWYgKHMuZGVwcyAhPT0gdW5kZWZpbmVkKSBkZXRhY2hEZXBzKHMpO1xuICBpZiAocy5lbmQgIT09IHVuZGVmaW5lZCkgZGV0YWNoRGVwcyhzLmVuZCk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuLyoqXG4gKiBAcHJpdmF0ZVxuICogdHJhbnNkdWNlciBzdHJlYW0gdHJhbnNmb3JtZXJcbiAqL1xuZnVuY3Rpb24gU3RyZWFtVHJhbnNmb3JtZXIoKSB7IH1cblN0cmVhbVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkgeyB9O1xuU3RyZWFtVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbigpIHsgfTtcblN0cmVhbVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHMsIHYpIHsgcmV0dXJuIHY7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZmx5ZDtcbiIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcblxudmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2N1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGUgc3BlY2lmaWVkXG4gKiBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0c1xuICogYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzIGBSLmN1cnJ5TigzLCBmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgW2BSLl9fYF0oI19fKSBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIFtgUi5fX2BdKCNfXyksXG4gKiB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC41LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IGZvciB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc3VtQXJncyA9ICguLi5hcmdzKSA9PiBSLnN1bShhcmdzKTtcbiAqXG4gKiAgICAgIHZhciBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5Tig0LCBzdW1BcmdzKTtcbiAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIHZhciBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG5cblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGN1cnJ5TihsZW5ndGgsIGZuKSB7XG4gIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjdXJyeU47IiwiZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDc6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDg6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDEwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gX2FyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gX2FyaXR5OyIsInZhciBfaXNQbGFjZWhvbGRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIG9uZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgX2lzUGxhY2Vob2xkZXIoYSkpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MScpO1xuXG52YXIgX2lzUGxhY2Vob2xkZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gX2N1cnJ5Mihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjIoYSwgYikge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gZjI7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSA/IGYyIDogX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IpO1xuICAgICAgICB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYyIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkxKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgIHJldHVybiBmbihfYSwgYik7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYik7XG4gICAgICAgIH0pIDogZm4oYSwgYik7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyOyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fYXJpdHknKTtcblxudmFyIF9pc1BsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmICghX2lzUGxhY2Vob2xkZXIocmVjZWl2ZWRbY29tYmluZWRJZHhdKSB8fCBhcmdzSWR4ID49IGFyZ3VtZW50cy5sZW5ndGgpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlY2VpdmVkW2NvbWJpbmVkSWR4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1thcmdzSWR4XTtcbiAgICAgICAgYXJnc0lkeCArPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRbY29tYmluZWRJZHhdID0gcmVzdWx0O1xuICAgICAgaWYgKCFfaXNQbGFjZWhvbGRlcihyZXN1bHQpKSB7XG4gICAgICAgIGxlZnQgLT0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkSWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBsZWZ0IDw9IDAgPyBmbi5hcHBseSh0aGlzLCBjb21iaW5lZCkgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnlOOyIsImZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgICAgICByZXR1cm4gYSAhPSBudWxsICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzUGxhY2Vob2xkZXI7IiwiaW1wb3J0IF9hcml0eSBmcm9tICcuL2ludGVybmFsL19hcml0eS5qcyc7XG5pbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGlzIGJvdW5kIHRvIGEgY29udGV4dC5cbiAqIE5vdGU6IGBSLmJpbmRgIGRvZXMgbm90IHByb3ZpZGUgdGhlIGFkZGl0aW9uYWwgYXJndW1lbnQtYmluZGluZyBjYXBhYmlsaXRpZXMgb2ZcbiAqIFtGdW5jdGlvbi5wcm90b3R5cGUuYmluZF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vYmluZCkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKCogLT4gKikgLT4geyp9IC0+ICgqIC0+ICopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmluZCB0byBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc09iaiBUaGUgY29udGV4dCB0byBiaW5kIGBmbmAgdG9cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBleGVjdXRlIGluIHRoZSBjb250ZXh0IG9mIGB0aGlzT2JqYC5cbiAqIEBzZWUgUi5wYXJ0aWFsXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgbG9nID0gUi5iaW5kKGNvbnNvbGUubG9nLCBjb25zb2xlKTtcbiAqICAgICAgUi5waXBlKFIuYXNzb2MoJ2EnLCAyKSwgUi50YXAobG9nKSwgUi5hc3NvYygnYScsIDMpKSh7YTogMX0pOyAvLz0+IHthOiAzfVxuICogICAgICAvLyBsb2dzIHthOiAyfVxuICogQHN5bWIgUi5iaW5kKGYsIG8pKGEsIGIpID0gZi5jYWxsKG8sIGEsIGIpXG4gKi9cbnZhciBiaW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYmluZChmbiwgdGhpc09iaikge1xuICByZXR1cm4gX2FyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzT2JqLCBhcmd1bWVudHMpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgYmluZDsiLCJpbXBvcnQgcGlwZSBmcm9tICcuL3BpcGUuanMnO1xuaW1wb3J0IHJldmVyc2UgZnJvbSAnLi9yZXZlcnNlLmpzJztcblxuLyoqXG4gKiBQZXJmb3JtcyByaWdodC10by1sZWZ0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLiBUaGUgcmlnaHRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gKiBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmcgZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogKipOb3RlOioqIFRoZSByZXN1bHQgb2YgY29tcG9zZSBpcyBub3QgYXV0b21hdGljYWxseSBjdXJyaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoeSAtPiB6KSwgKHggLT4geSksIC4uLiwgKG8gLT4gcCksICgoYSwgYiwgLi4uLCBuKSAtPiBvKSkgLT4gKChhLCBiLCAuLi4sIG4pIC0+IHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSAuLi5mdW5jdGlvbnMgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5waXBlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgY2xhc3N5R3JlZXRpbmcgPSAoZmlyc3ROYW1lLCBsYXN0TmFtZSkgPT4gXCJUaGUgbmFtZSdzIFwiICsgbGFzdE5hbWUgKyBcIiwgXCIgKyBmaXJzdE5hbWUgKyBcIiBcIiArIGxhc3ROYW1lXG4gKiAgICAgIGNvbnN0IHllbGxHcmVldGluZyA9IFIuY29tcG9zZShSLnRvVXBwZXIsIGNsYXNzeUdyZWV0aW5nKTtcbiAqICAgICAgeWVsbEdyZWV0aW5nKCdKYW1lcycsICdCb25kJyk7IC8vPT4gXCJUSEUgTkFNRSdTIEJPTkQsIEpBTUVTIEJPTkRcIlxuICpcbiAqICAgICAgUi5jb21wb3NlKE1hdGguYWJzLCBSLmFkZCgxKSwgUi5tdWx0aXBseSgyKSkoLTQpIC8vPT4gN1xuICpcbiAqIEBzeW1iIFIuY29tcG9zZShmLCBnLCBoKShhLCBiKSA9IGYoZyhoKGEsIGIpKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvc2UgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIHBpcGUuYXBwbHkodGhpcywgcmV2ZXJzZShhcmd1bWVudHMpKTtcbn0iLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IGN1cnJ5TiBmcm9tICcuL2N1cnJ5Ti5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZVxuICogYXQgYSB0aW1lLiBJZiBgZmAgaXMgYSB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgZ2AgaXMgYFIuY3VycnkoZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeU4sIFIucGFydGlhbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGFkZEZvdXJOdW1iZXJzID0gKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQ7XG4gKlxuICogICAgICBjb25zdCBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5KGFkZEZvdXJOdW1iZXJzKTtcbiAqICAgICAgY29uc3QgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgY29uc3QgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xudmFyIGN1cnJ5ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gY3VycnkoZm4pIHtcbiAgcmV0dXJuIGN1cnJ5Tihmbi5sZW5ndGgsIGZuKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgY3Vycnk7IiwiaW1wb3J0IF9hcml0eSBmcm9tICcuL2ludGVybmFsL19hcml0eS5qcyc7XG5pbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcbmltcG9ydCBfY3VycnlOIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Ti5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24sIHdpdGggdGhlIHNwZWNpZmllZFxuICogYXJpdHkuIFRoZSBjdXJyaWVkIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHNcbiAqIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZSBhdCBhIHRpbWUuIElmIGBnYCBpcyBgUi5jdXJyeU4oMywgZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3Qgc3VtQXJncyA9ICguLi5hcmdzKSA9PiBSLnN1bShhcmdzKTtcbiAqXG4gKiAgICAgIGNvbnN0IGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnlOKDQsIHN1bUFyZ3MpO1xuICogICAgICBjb25zdCBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICBjb25zdCBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gY3VycnlOKGxlbmd0aCwgZm4pIHtcbiAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBfY3VycnkxKGZuKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGxlbmd0aCwgX2N1cnJ5TihsZW5ndGgsIFtdLCBmbikpO1xufSk7XG5leHBvcnQgZGVmYXVsdCBjdXJyeU47IiwiaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcbmltcG9ydCBfZXF1YWxzIGZyb20gJy4vaW50ZXJuYWwvX2VxdWFscy5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgaXRzIGFyZ3VtZW50cyBhcmUgZXF1aXZhbGVudCwgYGZhbHNlYCBvdGhlcndpc2UuIEhhbmRsZXNcbiAqIGN5Y2xpY2FsIGRhdGEgc3RydWN0dXJlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHN5bW1ldHJpY2FsbHkgdG8gdGhlIGBlcXVhbHNgIG1ldGhvZHMgb2YgYm90aCBhcmd1bWVudHMsIGlmXG4gKiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBhIC0+IGIgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lcXVhbHMoMSwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmVxdWFscygxLCAnMScpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZXF1YWxzKFsxLCAyLCAzXSwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gKlxuICogICAgICBjb25zdCBhID0ge307IGEudiA9IGE7XG4gKiAgICAgIGNvbnN0IGIgPSB7fTsgYi52ID0gYjtcbiAqICAgICAgUi5lcXVhbHMoYSwgYik7IC8vPT4gdHJ1ZVxuICovXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIF9lcXVhbHMoYSwgYiwgW10sIFtdKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgZXF1YWxzOyIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX2Rpc3BhdGNoYWJsZSBmcm9tICcuL2ludGVybmFsL19kaXNwYXRjaGFibGUuanMnO1xuaW1wb3J0IF9maWx0ZXIgZnJvbSAnLi9pbnRlcm5hbC9fZmlsdGVyLmpzJztcbmltcG9ydCBfaXNPYmplY3QgZnJvbSAnLi9pbnRlcm5hbC9faXNPYmplY3QuanMnO1xuaW1wb3J0IF9yZWR1Y2UgZnJvbSAnLi9pbnRlcm5hbC9fcmVkdWNlLmpzJztcbmltcG9ydCBfeGZpbHRlciBmcm9tICcuL2ludGVybmFsL194ZmlsdGVyLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUgYW5kIGEgYEZpbHRlcmFibGVgLCBhbmQgcmV0dXJucyBhIG5ldyBmaWx0ZXJhYmxlIG9mIHRoZVxuICogc2FtZSB0eXBlIGNvbnRhaW5pbmcgdGhlIG1lbWJlcnMgb2YgdGhlIGdpdmVuIGZpbHRlcmFibGUgd2hpY2ggc2F0aXNmeSB0aGVcbiAqIGdpdmVuIHByZWRpY2F0ZS4gRmlsdGVyYWJsZSBvYmplY3RzIGluY2x1ZGUgcGxhaW4gb2JqZWN0cyBvciBhbnkgb2JqZWN0XG4gKiB0aGF0IGhhcyBhIGZpbHRlciBtZXRob2Qgc3VjaCBhcyBgQXJyYXlgLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBmaWx0ZXJgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX0gRmlsdGVyYWJsZVxuICogQHNlZSBSLnJlamVjdCwgUi50cmFuc2R1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBpc0V2ZW4gPSBuID0+IG4gJSAyID09PSAwO1xuICpcbiAqICAgICAgUi5maWx0ZXIoaXNFdmVuLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsyLCA0XVxuICpcbiAqICAgICAgUi5maWx0ZXIoaXNFdmVuLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBkOiA0fVxuICovXG52YXIgZmlsdGVyID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZmlsdGVyJ10sIF94ZmlsdGVyLCBmdW5jdGlvbiAocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gX2lzT2JqZWN0KGZpbHRlcmFibGUpID8gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICBpZiAocHJlZChmaWx0ZXJhYmxlW2tleV0pKSB7XG4gICAgICBhY2Nba2V5XSA9IGZpbHRlcmFibGVba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30sIGtleXMoZmlsdGVyYWJsZSkpIDpcbiAgLy8gZWxzZVxuICBfZmlsdGVyKHByZWQsIGZpbHRlcmFibGUpO1xufSkpO1xuZXhwb3J0IGRlZmF1bHQgZmlsdGVyOyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5pbXBvcnQgY3VycnlOIGZyb20gJy4vY3VycnlOLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIG11Y2ggbGlrZSB0aGUgc3VwcGxpZWQgb25lLCBleGNlcHQgdGhhdCB0aGUgZmlyc3QgdHdvXG4gKiBhcmd1bWVudHMnIG9yZGVyIGlzIHJldmVyc2VkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoYSwgYiwgYywgLi4uKSAtPiB6KSAtPiAoYiAtPiBhIC0+IGMgLT4gLi4uIC0+IHopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gaW52b2tlIHdpdGggaXRzIGZpcnN0IHR3byBwYXJhbWV0ZXJzIHJldmVyc2VkLlxuICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiBpbnZva2luZyBgZm5gIHdpdGggaXRzIGZpcnN0IHR3byBwYXJhbWV0ZXJzJyBvcmRlciByZXZlcnNlZC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBtZXJnZVRocmVlID0gKGEsIGIsIGMpID0+IFtdLmNvbmNhdChhLCBiLCBjKTtcbiAqXG4gKiAgICAgIG1lcmdlVGhyZWUoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIDNdXG4gKlxuICogICAgICBSLmZsaXAobWVyZ2VUaHJlZSkoMSwgMiwgMyk7IC8vPT4gWzIsIDEsIDNdXG4gKiBAc3ltYiBSLmZsaXAoZikoYSwgYiwgYykgPSBmKGIsIGEsIGMpXG4gKi9cbnZhciBmbGlwID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gZmxpcChmbikge1xuICByZXR1cm4gY3VycnlOKGZuLmxlbmd0aCwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJnc1swXSA9IGI7XG4gICAgYXJnc1sxXSA9IGE7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgZmxpcDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgODpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUZyb21JdGVyYXRvcihpdGVyKSB7XG4gIHZhciBsaXN0ID0gW107XG4gIHZhciBuZXh0O1xuICB3aGlsZSAoIShuZXh0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICBsaXN0LnB1c2gobmV4dC52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59IiwiaW1wb3J0IF9pc0FycmF5IGZyb20gJy4vX2lzQXJyYXkuanMnO1xuXG4vKipcbiAqIFRoaXMgY2hlY2tzIHdoZXRoZXIgYSBmdW5jdGlvbiBoYXMgYSBbbWV0aG9kbmFtZV0gZnVuY3Rpb24uIElmIGl0IGlzbid0IGFuXG4gKiBhcnJheSBpdCB3aWxsIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiBvdGhlcndpc2UgaXQgd2lsbCBkZWZhdWx0IHRvIHRoZSByYW1kYVxuICogaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHJhbWRhIGltcGxlbXRhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZG5hbWUgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtPYmplY3R9IFdoYXRldmVyIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIG1ldGhvZCBpcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NoZWNrRm9yTWV0aG9kKG1ldGhvZG5hbWUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIHZhciBvYmogPSBhcmd1bWVudHNbbGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF9pc0FycmF5KG9iaikgfHwgdHlwZW9mIG9ialttZXRob2RuYW1lXSAhPT0gJ2Z1bmN0aW9uJyA/IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBvYmpbbWV0aG9kbmFtZV0uYXBwbHkob2JqLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGxlbmd0aCAtIDEpKTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY29tcGxlbWVudChmKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICFmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59IiwiaW1wb3J0IF9pc1BsYWNlaG9sZGVyIGZyb20gJy4vX2lzUGxhY2Vob2xkZXIuanMnO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCBvbmUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgX2lzUGxhY2Vob2xkZXIoYSkpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufSIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vX2N1cnJ5MS5qcyc7XG5pbXBvcnQgX2lzUGxhY2Vob2xkZXIgZnJvbSAnLi9faXNQbGFjZWhvbGRlci5qcyc7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmMiA6IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iKTtcbiAgICAgICAgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBmMiA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IpO1xuICAgICAgICB9KSA6IGZuKGEsIGIpO1xuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL19jdXJyeTEuanMnO1xuaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9fY3VycnkyLmpzJztcbmltcG9ydCBfaXNQbGFjZWhvbGRlciBmcm9tICcuL19pc1BsYWNlaG9sZGVyLmpzJztcblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdGhyZWUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3VycnkzKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMyhhLCBiLCBjKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjMgOiBfY3VycnkyKGZ1bmN0aW9uIChfYiwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IsIF9jKTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYzIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkyKGZ1bmN0aW9uIChfYSwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIsIF9jKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTIoZnVuY3Rpb24gKF9iLCBfYykge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYiwgX2MpO1xuICAgICAgICB9KSA6IF9jdXJyeTEoZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIF9jKTtcbiAgICAgICAgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBmMyA6IF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MihmdW5jdGlvbiAoX2EsIF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBfYiwgYyk7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkyKGZ1bmN0aW9uIChfYSwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIsIF9jKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTIoZnVuY3Rpb24gKF9iLCBfYykge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYiwgX2MpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIsIGMpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IsIGMpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgX2MpO1xuICAgICAgICB9KSA6IGZuKGEsIGIsIGMpO1xuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgX2FyaXR5IGZyb20gJy4vX2FyaXR5LmpzJztcbmltcG9ydCBfaXNQbGFjZWhvbGRlciBmcm9tICcuL19pc1BsYWNlaG9sZGVyLmpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jdXJyeU4obGVuZ3RoLCByZWNlaXZlZCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgdmFyIGxlZnQgPSBsZW5ndGg7XG4gICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpZiAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggJiYgKCFfaXNQbGFjZWhvbGRlcihyZWNlaXZlZFtjb21iaW5lZElkeF0pIHx8IGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAoIV9pc1BsYWNlaG9sZGVyKHJlc3VsdCkpIHtcbiAgICAgICAgbGVmdCAtPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRJZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnQgPD0gMCA/IGZuLmFwcGx5KHRoaXMsIGNvbWJpbmVkKSA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gIH07XG59IiwiaW1wb3J0IF9pc0FycmF5IGZyb20gJy4vX2lzQXJyYXkuanMnO1xuaW1wb3J0IF9pc1RyYW5zZm9ybWVyIGZyb20gJy4vX2lzVHJhbnNmb3JtZXIuanMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGRpc3BhdGNoZXMgd2l0aCBkaWZmZXJlbnQgc3RyYXRlZ2llcyBiYXNlZCBvbiB0aGVcbiAqIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uIChsYXN0IGFyZ3VtZW50KS4gSWYgaXQgaXMgYW4gYXJyYXksIGV4ZWN1dGVzIFtmbl0uXG4gKiBPdGhlcndpc2UsIGlmIGl0IGhhcyBhIGZ1bmN0aW9uIHdpdGggb25lIG9mIHRoZSBnaXZlbiBtZXRob2QgbmFtZXMsIGl0IHdpbGxcbiAqIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiAoZnVuY3RvciBjYXNlKS4gT3RoZXJ3aXNlLCBpZiBpdCBpcyBhIHRyYW5zZm9ybWVyLFxuICogdXNlcyB0cmFuc2R1Y2VyIFt4Zl0gdG8gcmV0dXJuIGEgbmV3IHRyYW5zZm9ybWVyICh0cmFuc2R1Y2VyIGNhc2UpLlxuICogT3RoZXJ3aXNlLCBpdCB3aWxsIGRlZmF1bHQgdG8gZXhlY3V0aW5nIFtmbl0uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZE5hbWVzIHByb3BlcnRpZXMgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB4ZiB0cmFuc2R1Y2VyIHRvIGluaXRpYWxpemUgaWYgb2JqZWN0IGlzIHRyYW5zZm9ybWVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBkZWZhdWx0IHJhbWRhIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3BhdGNoZXMgb24gb2JqZWN0IGluIGxpc3QgcG9zaXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Rpc3BhdGNoYWJsZShtZXRob2ROYW1lcywgeGYsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgdmFyIG9iaiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKCFfaXNBcnJheShvYmopKSB7XG4gICAgICB2YXIgaWR4ID0gMDtcbiAgICAgIHdoaWxlIChpZHggPCBtZXRob2ROYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbbWV0aG9kTmFtZXNbaWR4XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW21ldGhvZE5hbWVzW2lkeF1dLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoX2lzVHJhbnNmb3JtZXIob2JqKSkge1xuICAgICAgICB2YXIgdHJhbnNkdWNlciA9IHhmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdHJhbnNkdWNlcihvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn0iLCJpbXBvcnQgX2FycmF5RnJvbUl0ZXJhdG9yIGZyb20gJy4vX2FycmF5RnJvbUl0ZXJhdG9yLmpzJztcbmltcG9ydCBfaW5jbHVkZXNXaXRoIGZyb20gJy4vX2luY2x1ZGVzV2l0aC5qcyc7XG5pbXBvcnQgX2Z1bmN0aW9uTmFtZSBmcm9tICcuL19mdW5jdGlvbk5hbWUuanMnO1xuaW1wb3J0IF9oYXMgZnJvbSAnLi9faGFzLmpzJztcbmltcG9ydCBfb2JqZWN0SXMgZnJvbSAnLi9fb2JqZWN0SXMuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi4va2V5cy5qcyc7XG5pbXBvcnQgdHlwZSBmcm9tICcuLi90eXBlLmpzJztcblxuLyoqXG4gKiBwcml2YXRlIF91bmlxQ29udGVudEVxdWFscyBmdW5jdGlvbi5cbiAqIFRoYXQgZnVuY3Rpb24gaXMgY2hlY2tpbmcgZXF1YWxpdHkgb2YgMiBpdGVyYXRvciBjb250ZW50cyB3aXRoIDIgYXNzdW1wdGlvbnNcbiAqIC0gaXRlcmF0b3JzIGxlbmd0aHMgYXJlIHRoZSBzYW1lXG4gKiAtIGl0ZXJhdG9ycyB2YWx1ZXMgYXJlIHVuaXF1ZVxuICpcbiAqIGZhbHNlLXBvc2l0aXZlIHJlc3VsdCB3aWxsIGJlIHJldHVybmVkIGZvciBjb21wYXJpc2lvbiBvZiwgZS5nLlxuICogLSBbMSwyLDNdIGFuZCBbMSwyLDMsNF1cbiAqIC0gWzEsMSwxXSBhbmQgWzEsMiwzXVxuICogKi9cblxuZnVuY3Rpb24gX3VuaXFDb250ZW50RXF1YWxzKGFJdGVyYXRvciwgYkl0ZXJhdG9yLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgYSA9IF9hcnJheUZyb21JdGVyYXRvcihhSXRlcmF0b3IpO1xuICB2YXIgYiA9IF9hcnJheUZyb21JdGVyYXRvcihiSXRlcmF0b3IpO1xuXG4gIGZ1bmN0aW9uIGVxKF9hLCBfYikge1xuICAgIHJldHVybiBfZXF1YWxzKF9hLCBfYiwgc3RhY2tBLnNsaWNlKCksIHN0YWNrQi5zbGljZSgpKTtcbiAgfVxuXG4gIC8vIGlmICphKiBhcnJheSBjb250YWlucyBhbnkgZWxlbWVudCB0aGF0IGlzIG5vdCBpbmNsdWRlZCBpbiAqYipcbiAgcmV0dXJuICFfaW5jbHVkZXNXaXRoKGZ1bmN0aW9uIChiLCBhSXRlbSkge1xuICAgIHJldHVybiAhX2luY2x1ZGVzV2l0aChlcSwgYUl0ZW0sIGIpO1xuICB9LCBiLCBhKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2VxdWFscyhhLCBiLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoX29iamVjdElzKGEsIGIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgdHlwZUEgPSB0eXBlKGEpO1xuXG4gIGlmICh0eXBlQSAhPT0gdHlwZShiKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhWydmYW50YXN5LWxhbmQvZXF1YWxzJ10gPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGJbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlb2YgYVsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nICYmIGFbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXShiKSAmJiB0eXBlb2YgYlsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nICYmIGJbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXShhKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBhLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyAmJiBhLmVxdWFscyhiKSAmJiB0eXBlb2YgYi5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiYgYi5lcXVhbHMoYSk7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGVBKSB7XG4gICAgY2FzZSAnQXJndW1lbnRzJzpcbiAgICBjYXNlICdBcnJheSc6XG4gICAgY2FzZSAnT2JqZWN0JzpcbiAgICAgIGlmICh0eXBlb2YgYS5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiBfZnVuY3Rpb25OYW1lKGEuY29uc3RydWN0b3IpID09PSAnUHJvbWlzZScpIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdCb29sZWFuJzpcbiAgICBjYXNlICdOdW1iZXInOlxuICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICBpZiAoISh0eXBlb2YgYSA9PT0gdHlwZW9mIGIgJiYgX29iamVjdElzKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgaWYgKCFfb2JqZWN0SXMoYS52YWx1ZU9mKCksIGIudmFsdWVPZigpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFcnJvcic6XG4gICAgICByZXR1cm4gYS5uYW1lID09PSBiLm5hbWUgJiYgYS5tZXNzYWdlID09PSBiLm1lc3NhZ2U7XG4gICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgIGlmICghKGEuc291cmNlID09PSBiLnNvdXJjZSAmJiBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiYgYS5pZ25vcmVDYXNlID09PSBiLmlnbm9yZUNhc2UgJiYgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmIGEuc3RpY2t5ID09PSBiLnN0aWNreSAmJiBhLnVuaWNvZGUgPT09IGIudW5pY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cblxuICB2YXIgaWR4ID0gc3RhY2tBLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIGlmIChzdGFja0FbaWR4XSA9PT0gYSkge1xuICAgICAgcmV0dXJuIHN0YWNrQltpZHhdID09PSBiO1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZUEpIHtcbiAgICBjYXNlICdNYXAnOlxuICAgICAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF91bmlxQ29udGVudEVxdWFscyhhLmVudHJpZXMoKSwgYi5lbnRyaWVzKCksIHN0YWNrQS5jb25jYXQoW2FdKSwgc3RhY2tCLmNvbmNhdChbYl0pKTtcbiAgICBjYXNlICdTZXQnOlxuICAgICAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF91bmlxQ29udGVudEVxdWFscyhhLnZhbHVlcygpLCBiLnZhbHVlcygpLCBzdGFja0EuY29uY2F0KFthXSksIHN0YWNrQi5jb25jYXQoW2JdKSk7XG4gICAgY2FzZSAnQXJndW1lbnRzJzpcbiAgICBjYXNlICdBcnJheSc6XG4gICAgY2FzZSAnT2JqZWN0JzpcbiAgICBjYXNlICdCb29sZWFuJzpcbiAgICBjYXNlICdOdW1iZXInOlxuICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgY2FzZSAnRGF0ZSc6XG4gICAgY2FzZSAnRXJyb3InOlxuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgY2FzZSAnSW50OEFycmF5JzpcbiAgICBjYXNlICdVaW50OEFycmF5JzpcbiAgICBjYXNlICdVaW50OENsYW1wZWRBcnJheSc6XG4gICAgY2FzZSAnSW50MTZBcnJheSc6XG4gICAgY2FzZSAnVWludDE2QXJyYXknOlxuICAgIGNhc2UgJ0ludDMyQXJyYXknOlxuICAgIGNhc2UgJ1VpbnQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDMyQXJyYXknOlxuICAgIGNhc2UgJ0Zsb2F0NjRBcnJheSc6XG4gICAgY2FzZSAnQXJyYXlCdWZmZXInOlxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIFZhbHVlcyBvZiBvdGhlciB0eXBlcyBhcmUgb25seSBlcXVhbCBpZiBpZGVudGljYWwuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBrZXlzKGEpO1xuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBleHRlbmRlZFN0YWNrQSA9IHN0YWNrQS5jb25jYXQoW2FdKTtcbiAgdmFyIGV4dGVuZGVkU3RhY2tCID0gc3RhY2tCLmNvbmNhdChbYl0pO1xuXG4gIGlkeCA9IGtleXNBLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIHZhciBrZXkgPSBrZXlzQVtpZHhdO1xuICAgIGlmICghKF9oYXMoa2V5LCBiKSAmJiBfZXF1YWxzKGJba2V5XSwgYVtrZXldLCBleHRlbmRlZFN0YWNrQSwgZXh0ZW5kZWRTdGFja0IpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZmlsdGVyKGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGxpc3RbaWR4XTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZnVuY3Rpb25OYW1lKGYpIHtcbiAgLy8gU3RyaW5nKHggPT4geCkgZXZhbHVhdGVzIHRvIFwieCA9PiB4XCIsIHNvIHRoZSBwYXR0ZXJuIG1heSBub3QgbWF0Y2guXG4gIHZhciBtYXRjaCA9IFN0cmluZyhmKS5tYXRjaCgvXmZ1bmN0aW9uIChcXHcqKS8pO1xuICByZXR1cm4gbWF0Y2ggPT0gbnVsbCA/ICcnIDogbWF0Y2hbMV07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2hhcyhwcm9wLCBvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufSIsImltcG9ydCBfaW5kZXhPZiBmcm9tICcuL19pbmRleE9mLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luY2x1ZGVzKGEsIGxpc3QpIHtcbiAgcmV0dXJuIF9pbmRleE9mKGxpc3QsIGEsIDApID49IDA7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luY2x1ZGVzV2l0aChwcmVkLCB4LCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChwcmVkKHgsIGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IGVxdWFscyBmcm9tICcuLi9lcXVhbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5kZXhPZihsaXN0LCBhLCBpZHgpIHtcbiAgdmFyIGluZiwgaXRlbTtcbiAgLy8gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgZG9lc24ndCBleGlzdCBiZWxvdyBJRTlcbiAgaWYgKHR5cGVvZiBsaXN0LmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpZiAoYSA9PT0gMCkge1xuICAgICAgICAgIC8vIG1hbnVhbGx5IGNyYXdsIHRoZSBsaXN0IHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gKzAgYW5kIC0wXG4gICAgICAgICAgaW5mID0gMSAvIGE7XG4gICAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IDAgJiYgMSAvIGl0ZW0gPT09IGluZikge1xuICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhICE9PSBhKSB7XG4gICAgICAgICAgLy8gTmFOXG4gICAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJyAmJiBpdGVtICE9PSBpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vbi16ZXJvIG51bWJlcnMgY2FuIHV0aWxpc2UgU2V0XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcblxuICAgICAgLy8gYWxsIHRoZXNlIHR5cGVzIGNhbiB1dGlsaXNlIFNldFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihhLCBpZHgpO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoYSA9PT0gbnVsbCkge1xuICAgICAgICAgIC8vIG51bGwgY2FuIHV0aWxpc2UgU2V0XG4gICAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihhLCBpZHgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGFueXRoaW5nIGVsc2Ugbm90IGNvdmVyZWQgYWJvdmUsIGRlZmVyIHRvIFIuZXF1YWxzXG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGlmIChlcXVhbHMobGlzdFtpZHhdLCBhKSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufSIsImltcG9ydCBfaGFzIGZyb20gJy4vX2hhcy5qcyc7XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgX2lzQXJndW1lbnRzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXScgPyBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbiAgfSA6IGZ1bmN0aW9uIF9pc0FyZ3VtZW50cyh4KSB7XG4gICAgcmV0dXJuIF9oYXMoJ2NhbGxlZScsIHgpO1xuICB9O1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBfaXNBcmd1bWVudHM7IiwiLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgdmFsYCBpcyBhbiBhcnJheSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2lzQXJyYXkoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXkobnVsbCk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXkoe30pOyAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gX2lzQXJyYXkodmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwubGVuZ3RoID49IDAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59OyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vX2N1cnJ5MS5qcyc7XG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi9faXNBcnJheS5qcyc7XG5pbXBvcnQgX2lzU3RyaW5nIGZyb20gJy4vX2lzU3RyaW5nLmpzJztcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgc2ltaWxhciB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaGFzIGEgbnVtZXJpYyBsZW5ndGggcHJvcGVydHkgYW5kIGV4dHJlbWUgaW5kaWNlcyBkZWZpbmVkOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfaXNBcnJheUxpa2UoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXlMaWtlKHRydWUpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHtsZW5ndGg6IDEwfSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHswOiAnemVybycsIDk6ICduaW5lJywgbGVuZ3RoOiAxMH0pOyAvLz0+IHRydWVcbiAqL1xudmFyIF9pc0FycmF5TGlrZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHgpIHtcbiAgaWYgKF9pc0FycmF5KHgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCF4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKF9pc1N0cmluZyh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIHJldHVybiAhIXgubGVuZ3RoO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4geC5oYXNPd25Qcm9wZXJ0eSgwKSAmJiB4Lmhhc093blByb3BlcnR5KHgubGVuZ3RoIC0gMSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSk7XG5leHBvcnQgZGVmYXVsdCBfaXNBcnJheUxpa2U7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2lzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pc09iamVjdCh4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgICAgICByZXR1cm4gYSAhPSBudWxsICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNTdHJpbmcoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNUcmFuc2Zvcm1lcihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmpbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPT09ICdmdW5jdGlvbic7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX21hcChmbiwgZnVuY3Rvcikge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGZ1bmN0b3IubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHJlc3VsdFtpZHhdID0gZm4oZnVuY3RvcltpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSIsIi8vIEJhc2VkIG9uIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuZnVuY3Rpb24gX29iamVjdElzKGEsIGIpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoYSA9PT0gYikge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIGEgIT09IGEgJiYgYiAhPT0gYjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgT2JqZWN0LmlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmlzIDogX29iamVjdElzOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9waXBlKGYsIGcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZy5jYWxsKHRoaXMsIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3F1b3RlKHMpIHtcbiAgdmFyIGVzY2FwZWQgPSBzLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykucmVwbGFjZSgvW1xcYl0vZywgJ1xcXFxiJykgLy8gXFxiIG1hdGNoZXMgd29yZCBib3VuZGFyeTsgW1xcYl0gbWF0Y2hlcyBiYWNrc3BhY2VcbiAgLnJlcGxhY2UoL1xcZi9nLCAnXFxcXGYnKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykucmVwbGFjZSgvXFxyL2csICdcXFxccicpLnJlcGxhY2UoL1xcdC9nLCAnXFxcXHQnKS5yZXBsYWNlKC9cXHYvZywgJ1xcXFx2JykucmVwbGFjZSgvXFwwL2csICdcXFxcMCcpO1xuXG4gIHJldHVybiAnXCInICsgZXNjYXBlZC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCInO1xufSIsImltcG9ydCBfaXNBcnJheUxpa2UgZnJvbSAnLi9faXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IF94d3JhcCBmcm9tICcuL194d3JhcC5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuLi9iaW5kLmpzJztcblxuZnVuY3Rpb24gX2FycmF5UmVkdWNlKHhmLCBhY2MsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgbGlzdFtpZHhdKTtcbiAgICBpZiAoYWNjICYmIGFjY1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgYWNjID0gYWNjWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShhY2MpO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVSZWR1Y2UoeGYsIGFjYywgaXRlcikge1xuICB2YXIgc3RlcCA9IGl0ZXIubmV4dCgpO1xuICB3aGlsZSAoIXN0ZXAuZG9uZSkge1xuICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgc3RlcC52YWx1ZSk7XG4gICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc3RlcCA9IGl0ZXIubmV4dCgpO1xuICB9XG4gIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG59XG5cbmZ1bmN0aW9uIF9tZXRob2RSZWR1Y2UoeGYsIGFjYywgb2JqLCBtZXRob2ROYW1lKSB7XG4gIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKG9ialttZXRob2ROYW1lXShiaW5kKHhmWydAQHRyYW5zZHVjZXIvc3RlcCddLCB4ZiksIGFjYykpO1xufVxuXG52YXIgc3ltSXRlcmF0b3IgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbC5pdGVyYXRvciA6ICdAQGl0ZXJhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3JlZHVjZShmbiwgYWNjLCBsaXN0KSB7XG4gIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IF94d3JhcChmbik7XG4gIH1cbiAgaWYgKF9pc0FycmF5TGlrZShsaXN0KSkge1xuICAgIHJldHVybiBfYXJyYXlSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsaXN0WydmYW50YXN5LWxhbmQvcmVkdWNlJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0LCAnZmFudGFzeS1sYW5kL3JlZHVjZScpO1xuICB9XG4gIGlmIChsaXN0W3N5bUl0ZXJhdG9yXSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIF9pdGVyYWJsZVJlZHVjZShmbiwgYWNjLCBsaXN0W3N5bUl0ZXJhdG9yXSgpKTtcbiAgfVxuICBpZiAodHlwZW9mIGxpc3QubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsaXN0LnJlZHVjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBfbWV0aG9kUmVkdWNlKGZuLCBhY2MsIGxpc3QsICdyZWR1Y2UnKTtcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3JlZHVjZTogbGlzdCBtdXN0IGJlIGFycmF5IG9yIGl0ZXJhYmxlJyk7XG59IiwiLyoqXG4gKiBQb2x5ZmlsbCBmcm9tIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlL3RvSVNPU3RyaW5nPi5cbiAqL1xudmFyIHBhZCA9IGZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiAobiA8IDEwID8gJzAnIDogJycpICsgbjtcbn07XG5cbnZhciBfdG9JU09TdHJpbmcgPSB0eXBlb2YgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicgPyBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICByZXR1cm4gZC50b0lTT1N0cmluZygpO1xufSA6IGZ1bmN0aW9uIF90b0lTT1N0cmluZyhkKSB7XG4gIHJldHVybiBkLmdldFVUQ0Z1bGxZZWFyKCkgKyAnLScgKyBwYWQoZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgKyBwYWQoZC5nZXRVVENEYXRlKCkpICsgJ1QnICsgcGFkKGQuZ2V0VVRDSG91cnMoKSkgKyAnOicgKyBwYWQoZC5nZXRVVENNaW51dGVzKCkpICsgJzonICsgcGFkKGQuZ2V0VVRDU2Vjb25kcygpKSArICcuJyArIChkLmdldFVUQ01pbGxpc2Vjb25kcygpIC8gMTAwMCkudG9GaXhlZCgzKS5zbGljZSgyLCA1KSArICdaJztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IF90b0lTT1N0cmluZzsiLCJpbXBvcnQgX2luY2x1ZGVzIGZyb20gJy4vX2luY2x1ZGVzLmpzJztcbmltcG9ydCBfbWFwIGZyb20gJy4vX21hcC5qcyc7XG5pbXBvcnQgX3F1b3RlIGZyb20gJy4vX3F1b3RlLmpzJztcbmltcG9ydCBfdG9JU09TdHJpbmcgZnJvbSAnLi9fdG9JU09TdHJpbmcuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi4va2V5cy5qcyc7XG5pbXBvcnQgcmVqZWN0IGZyb20gJy4uL3JlamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1N0cmluZyh4LCBzZWVuKSB7XG4gIHZhciByZWN1ciA9IGZ1bmN0aW9uIHJlY3VyKHkpIHtcbiAgICB2YXIgeHMgPSBzZWVuLmNvbmNhdChbeF0pO1xuICAgIHJldHVybiBfaW5jbHVkZXMoeSwgeHMpID8gJzxDaXJjdWxhcj4nIDogX3RvU3RyaW5nKHksIHhzKTtcbiAgfTtcblxuICAvLyAgbWFwUGFpcnMgOjogKE9iamVjdCwgW1N0cmluZ10pIC0+IFtTdHJpbmddXG4gIHZhciBtYXBQYWlycyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICByZXR1cm4gX21hcChmdW5jdGlvbiAoaykge1xuICAgICAgcmV0dXJuIF9xdW90ZShrKSArICc6ICcgKyByZWN1cihvYmpba10pO1xuICAgIH0sIGtleXMuc2xpY2UoKS5zb3J0KCkpO1xuICB9O1xuXG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpKSB7XG4gICAgY2FzZSAnW29iamVjdCBBcmd1bWVudHNdJzpcbiAgICAgIHJldHVybiAnKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCcgKyBfbWFwKHJlY3VyLCB4KS5qb2luKCcsICcpICsgJykpJztcbiAgICBjYXNlICdbb2JqZWN0IEFycmF5XSc6XG4gICAgICByZXR1cm4gJ1snICsgX21hcChyZWN1ciwgeCkuY29uY2F0KG1hcFBhaXJzKHgsIHJlamVjdChmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gKC9eXFxkKyQvLnRlc3QoaylcbiAgICAgICAgKTtcbiAgICAgIH0sIGtleXMoeCkpKSkuam9pbignLCAnKSArICddJztcbiAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IEJvb2xlYW4oJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IHgudG9TdHJpbmcoKTtcbiAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIHJldHVybiAnbmV3IERhdGUoJyArIChpc05hTih4LnZhbHVlT2YoKSkgPyByZWN1cihOYU4pIDogX3F1b3RlKF90b0lTT1N0cmluZyh4KSkpICsgJyknO1xuICAgIGNhc2UgJ1tvYmplY3QgTnVsbF0nOlxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgTnVtYmVyKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiAxIC8geCA9PT0gLUluZmluaXR5ID8gJy0wJyA6IHgudG9TdHJpbmcoMTApO1xuICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBTdHJpbmcoJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IF9xdW90ZSh4KTtcbiAgICBjYXNlICdbb2JqZWN0IFVuZGVmaW5lZF0nOlxuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAodHlwZW9mIHgudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIHJlcHIgPSB4LnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChyZXByICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgIHJldHVybiByZXByO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3snICsgbWFwUGFpcnMoeCwga2V5cyh4KSkuam9pbignLCAnKSArICd9JztcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG4gIH0sXG4gIHJlc3VsdDogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfVxufTsiLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL19jdXJyeTIuanMnO1xuaW1wb3J0IF94ZkJhc2UgZnJvbSAnLi9feGZCYXNlLmpzJztcblxudmFyIFhGaWx0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBYRmlsdGVyKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSA6IHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gWEZpbHRlcjtcbn0oKTtcblxudmFyIF94ZmlsdGVyID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hmaWx0ZXIoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRmlsdGVyKGYsIHhmKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgX3hmaWx0ZXI7IiwidmFyIFhXcmFwID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gWFdyYXAoZm4pIHtcbiAgICB0aGlzLmYgPSBmbjtcbiAgfVxuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbml0IG5vdCBpbXBsZW1lbnRlZCBvbiBYV3JhcCcpO1xuICB9O1xuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gYWNjO1xuICB9O1xuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAoYWNjLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICB9O1xuXG4gIHJldHVybiBYV3JhcDtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3h3cmFwKGZuKSB7XG4gIHJldHVybiBuZXcgWFdyYXAoZm4pO1xufSIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX2lzRnVuY3Rpb24gZnJvbSAnLi9pbnRlcm5hbC9faXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgY3VycnlOIGZyb20gJy4vY3VycnlOLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBUdXJucyBhIG5hbWVkIG1ldGhvZCB3aXRoIGEgc3BlY2lmaWVkIGFyaXR5IGludG8gYSBmdW5jdGlvbiB0aGF0IGNhbiBiZVxuICogY2FsbGVkIGRpcmVjdGx5IHN1cHBsaWVkIHdpdGggYXJndW1lbnRzIGFuZCBhIHRhcmdldCBvYmplY3QuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzIGN1cnJpZWQgYW5kIGFjY2VwdHMgYGFyaXR5ICsgMWAgcGFyYW1ldGVycyB3aGVyZVxuICogdGhlIGZpbmFsIHBhcmFtZXRlciBpcyB0aGUgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IChhIC0+IGIgLT4gLi4uIC0+IG4gLT4gT2JqZWN0IC0+ICopXG4gKiBAcGFyYW0ge051bWJlcn0gYXJpdHkgTnVtYmVyIG9mIGFyZ3VtZW50cyB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gc2hvdWxkIHRha2VcbiAqICAgICAgICBiZWZvcmUgdGhlIHRhcmdldCBvYmplY3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIE5hbWUgb2YgdGhlIG1ldGhvZCB0byBjYWxsLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY29uc3RydWN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3Qgc2xpY2VGcm9tID0gUi5pbnZva2VyKDEsICdzbGljZScpO1xuICogICAgICBzbGljZUZyb20oNiwgJ2FiY2RlZmdoaWprbG0nKTsgLy89PiAnZ2hpamtsbSdcbiAqICAgICAgY29uc3Qgc2xpY2VGcm9tNiA9IFIuaW52b2tlcigyLCAnc2xpY2UnKSg2KTtcbiAqICAgICAgc2xpY2VGcm9tNig4LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaCdcbiAqIEBzeW1iIFIuaW52b2tlcigwLCAnbWV0aG9kJykobykgPSBvWydtZXRob2QnXSgpXG4gKiBAc3ltYiBSLmludm9rZXIoMSwgJ21ldGhvZCcpKGEsIG8pID0gb1snbWV0aG9kJ10oYSlcbiAqIEBzeW1iIFIuaW52b2tlcigyLCAnbWV0aG9kJykoYSwgYiwgbykgPSBvWydtZXRob2QnXShhLCBiKVxuICovXG52YXIgaW52b2tlciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGludm9rZXIoYXJpdHksIG1ldGhvZCkge1xuICByZXR1cm4gY3VycnlOKGFyaXR5ICsgMSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbYXJpdHldO1xuICAgIGlmICh0YXJnZXQgIT0gbnVsbCAmJiBfaXNGdW5jdGlvbih0YXJnZXRbbWV0aG9kXSkpIHtcbiAgICAgIHJldHVybiB0YXJnZXRbbWV0aG9kXS5hcHBseSh0YXJnZXQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgYXJpdHkpKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcih0b1N0cmluZyh0YXJnZXQpICsgJyBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwiJyArIG1ldGhvZCArICdcIicpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgaW52b2tlcjsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IF9oYXMgZnJvbSAnLi9pbnRlcm5hbC9faGFzLmpzJztcbmltcG9ydCBfaXNBcmd1bWVudHMgZnJvbSAnLi9pbnRlcm5hbC9faXNBcmd1bWVudHMuanMnO1xuXG4vLyBjb3ZlciBJRSA8IDkga2V5cyBpc3N1ZXNcbnZhciBoYXNFbnVtQnVnID0gISAvKiNfX1BVUkVfXyoveyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xudmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsnY29uc3RydWN0b3InLCAndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2hhc093blByb3BlcnR5JywgJ3RvTG9jYWxlU3RyaW5nJ107XG4vLyBTYWZhcmkgYnVnXG52YXIgaGFzQXJnc0VudW1CdWcgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5wcm9wZXJ0eUlzRW51bWVyYWJsZSgnbGVuZ3RoJyk7XG59KCk7XG5cbnZhciBjb250YWlucyA9IGZ1bmN0aW9uIGNvbnRhaW5zKGxpc3QsIGl0ZW0pIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGlmIChsaXN0W2lkeF0gPT09IGl0ZW0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IGNvbnRhaW5pbmcgdGhlIG5hbWVzIG9mIGFsbCB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZlxuICogdGhlIHN1cHBsaWVkIG9iamVjdC5cbiAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50XG4gKiBhY3Jvc3MgZGlmZmVyZW50IEpTIHBsYXRmb3Jtcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6IHZ9IC0+IFtrXVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgcHJvcGVydGllcyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICogQHNlZSBSLmtleXNJbiwgUi52YWx1ZXNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmtleXMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAqL1xudmFyIGtleXMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgIWhhc0FyZ3NFbnVtQnVnID8gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgcmV0dXJuIE9iamVjdChvYmopICE9PSBvYmogPyBbXSA6IE9iamVjdC5rZXlzKG9iaik7XG59KSA6IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGtleXMob2JqKSB7XG4gIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciBwcm9wLCBuSWR4O1xuICB2YXIga3MgPSBbXTtcbiAgdmFyIGNoZWNrQXJnc0xlbmd0aCA9IGhhc0FyZ3NFbnVtQnVnICYmIF9pc0FyZ3VtZW50cyhvYmopO1xuICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgaWYgKF9oYXMocHJvcCwgb2JqKSAmJiAoIWNoZWNrQXJnc0xlbmd0aCB8fCBwcm9wICE9PSAnbGVuZ3RoJykpIHtcbiAgICAgIGtzW2tzLmxlbmd0aF0gPSBwcm9wO1xuICAgIH1cbiAgfVxuICBpZiAoaGFzRW51bUJ1Zykge1xuICAgIG5JZHggPSBub25FbnVtZXJhYmxlUHJvcHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAobklkeCA+PSAwKSB7XG4gICAgICBwcm9wID0gbm9uRW51bWVyYWJsZVByb3BzW25JZHhdO1xuICAgICAgaWYgKF9oYXMocHJvcCwgb2JqKSAmJiAhY29udGFpbnMoa3MsIHByb3ApKSB7XG4gICAgICAgIGtzW2tzLmxlbmd0aF0gPSBwcm9wO1xuICAgICAgfVxuICAgICAgbklkeCAtPSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4ga3M7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGtleXM7IiwiaW1wb3J0IF9hcml0eSBmcm9tICcuL2ludGVybmFsL19hcml0eS5qcyc7XG5pbXBvcnQgX3BpcGUgZnJvbSAnLi9pbnRlcm5hbC9fcGlwZS5qcyc7XG5pbXBvcnQgcmVkdWNlIGZyb20gJy4vcmVkdWNlLmpzJztcbmltcG9ydCB0YWlsIGZyb20gJy4vdGFpbC5qcyc7XG5cbi8qKlxuICogUGVyZm9ybXMgbGVmdC10by1yaWdodCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gKiBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmcgZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgc2VxdWVuY2VgLlxuICpcbiAqICoqTm90ZToqKiBUaGUgcmVzdWx0IG9mIHBpcGUgaXMgbm90IGF1dG9tYXRpY2FsbHkgY3VycmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKChhLCBiLCAuLi4sIG4pIC0+IG8pLCAobyAtPiBwKSwgLi4uLCAoeCAtPiB5KSwgKHkgLT4geikpIC0+ICgoYSwgYiwgLi4uLCBuKSAtPiB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgZiA9IFIucGlwZShNYXRoLnBvdywgUi5uZWdhdGUsIFIuaW5jKTtcbiAqXG4gKiAgICAgIGYoMywgNCk7IC8vIC0oM140KSArIDFcbiAqIEBzeW1iIFIucGlwZShmLCBnLCBoKShhLCBiKSA9IGgoZyhmKGEsIGIpKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGlwZSgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BpcGUgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShhcmd1bWVudHNbMF0ubGVuZ3RoLCByZWR1Y2UoX3BpcGUsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG59IiwiaW1wb3J0IF9jdXJyeTMgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkzLmpzJztcbmltcG9ydCBfcmVkdWNlIGZyb20gJy4vaW50ZXJuYWwvX3JlZHVjZS5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZSBpdGVtIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIHRoZSBsaXN0LCBzdWNjZXNzaXZlbHkgY2FsbGluZ1xuICogdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudFxuICogdmFsdWUgZnJvbSB0aGUgYXJyYXksIGFuZCB0aGVuIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgbmV4dCBjYWxsLlxuICpcbiAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKGFjYywgdmFsdWUpKi4gSXQgbWF5IHVzZVxuICogW2BSLnJlZHVjZWRgXSgjcmVkdWNlZCkgdG8gc2hvcnRjdXQgdGhlIGl0ZXJhdGlvbi5cbiAqXG4gKiBUaGUgYXJndW1lbnRzJyBvcmRlciBvZiBbYHJlZHVjZVJpZ2h0YF0oI3JlZHVjZVJpZ2h0KSdzIGl0ZXJhdG9yIGZ1bmN0aW9uXG4gKiBpcyAqKHZhbHVlLCBhY2MpKi5cbiAqXG4gKiBOb3RlOiBgUi5yZWR1Y2VgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZVxuICogYXJyYXlzKSwgdW5saWtlIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlsc1xuICogb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlI0Rlc2NyaXB0aW9uXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHJlZHVjZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC4gV2hlblxuICogZG9pbmcgc28sIGl0IGlzIHVwIHRvIHRoZSB1c2VyIHRvIGhhbmRsZSB0aGUgW2BSLnJlZHVjZWRgXSgjcmVkdWNlZClcbiAqIHNob3J0Y3V0aW5nLCBhcyB0aGlzIGlzIG5vdCBpbXBsZW1lbnRlZCBieSBgcmVkdWNlYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5yZWR1Y2VkLCBSLmFkZEluZGV4LCBSLnJlZHVjZVJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5yZWR1Y2UoUi5zdWJ0cmFjdCwgMCwgWzEsIDIsIDMsIDRdKSAvLyA9PiAoKCgoMCAtIDEpIC0gMikgLSAzKSAtIDQpID0gLTEwXG4gKiAgICAgIC8vICAgICAgICAgIC0gICAgICAgICAgICAgICAtMTBcbiAqICAgICAgLy8gICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAgICAgICAtICAgNCAgICAgICAgICAgLTYgICA0XG4gKiAgICAgIC8vICAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgLy8gICAgICAtICAgMyAgID09PiAgICAgLTMgICAzXG4gKiAgICAgIC8vICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAgIC0gICAyICAgICAgICAgICAtMSAgIDJcbiAqICAgICAgLy8gICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAwICAgMSAgICAgICAgICAgIDAgICAxXG4gKlxuICogQHN5bWIgUi5yZWR1Y2UoZiwgYSwgW2IsIGMsIGRdKSA9IGYoZihmKGEsIGIpLCBjKSwgZClcbiAqL1xudmFyIHJlZHVjZSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKF9yZWR1Y2UpO1xuZXhwb3J0IGRlZmF1bHQgcmVkdWNlOyIsImltcG9ydCBfY29tcGxlbWVudCBmcm9tICcuL2ludGVybmFsL19jb21wbGVtZW50LmpzJztcbmltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgZmlsdGVyIGZyb20gJy4vZmlsdGVyLmpzJztcblxuLyoqXG4gKiBUaGUgY29tcGxlbWVudCBvZiBbYGZpbHRlcmBdKCNmaWx0ZXIpLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi4gRmlsdGVyYWJsZVxuICogb2JqZWN0cyBpbmNsdWRlIHBsYWluIG9iamVjdHMgb3IgYW55IG9iamVjdCB0aGF0IGhhcyBhIGZpbHRlciBtZXRob2Qgc3VjaFxuICogYXMgYEFycmF5YC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5maWx0ZXIsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgaXNPZGQgPSAobikgPT4gbiAlIDIgPT09IDE7XG4gKlxuICogICAgICBSLnJlamVjdChpc09kZCwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAqXG4gKiAgICAgIFIucmVqZWN0KGlzT2RkLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBkOiA0fVxuICovXG52YXIgcmVqZWN0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcmVqZWN0KHByZWQsIGZpbHRlcmFibGUpIHtcbiAgcmV0dXJuIGZpbHRlcihfY29tcGxlbWVudChwcmVkKSwgZmlsdGVyYWJsZSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IHJlamVjdDsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IF9pc1N0cmluZyBmcm9tICcuL2ludGVybmFsL19pc1N0cmluZy5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IG9yIHN0cmluZyB3aXRoIHRoZSBlbGVtZW50cyBvciBjaGFyYWN0ZXJzIGluIHJldmVyc2VcbiAqIG9yZGVyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gbGlzdFxuICogQHJldHVybiB7QXJyYXl8U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmV2ZXJzZShbMSwgMiwgM10pOyAgLy89PiBbMywgMiwgMV1cbiAqICAgICAgUi5yZXZlcnNlKFsxLCAyXSk7ICAgICAvLz0+IFsyLCAxXVxuICogICAgICBSLnJldmVyc2UoWzFdKTsgICAgICAgIC8vPT4gWzFdXG4gKiAgICAgIFIucmV2ZXJzZShbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi5yZXZlcnNlKCdhYmMnKTsgICAgICAvLz0+ICdjYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYWInKTsgICAgICAgLy89PiAnYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYScpOyAgICAgICAgLy89PiAnYSdcbiAqICAgICAgUi5yZXZlcnNlKCcnKTsgICAgICAgICAvLz0+ICcnXG4gKi9cbnZhciByZXZlcnNlID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gcmV2ZXJzZShsaXN0KSB7XG4gIHJldHVybiBfaXNTdHJpbmcobGlzdCkgPyBsaXN0LnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5yZXZlcnNlKCk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IHJldmVyc2U7IiwiaW1wb3J0IF9jaGVja0Zvck1ldGhvZCBmcm9tICcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZC5qcyc7XG5pbXBvcnQgX2N1cnJ5MyBmcm9tICcuL2ludGVybmFsL19jdXJyeTMuanMnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZyAob3Igb2JqZWN0IHdpdGggYSBgc2xpY2VgXG4gKiBtZXRob2QpIGZyb20gYGZyb21JbmRleGAgKGluY2x1c2l2ZSkgdG8gYHRvSW5kZXhgIChleGNsdXNpdmUpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzbGljZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjRcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tSW5kZXggVGhlIHN0YXJ0IGluZGV4IChpbmNsdXNpdmUpLlxuICogQHBhcmFtIHtOdW1iZXJ9IHRvSW5kZXggVGhlIGVuZCBpbmRleCAoZXhjbHVzaXZlKS5cbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnNsaWNlKDEsIDMsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAgIC8vPT4gWydiJywgJ2MnXVxuICogICAgICBSLnNsaWNlKDEsIEluZmluaXR5LCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7IC8vPT4gWydiJywgJ2MnLCAnZCddXG4gKiAgICAgIFIuc2xpY2UoMCwgLTEsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgtMywgLTEsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgwLCAzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAgICAgICAvLz0+ICdyYW0nXG4gKi9cbnZhciBzbGljZSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKCAvKiNfX1BVUkVfXyovX2NoZWNrRm9yTWV0aG9kKCdzbGljZScsIGZ1bmN0aW9uIHNsaWNlKGZyb21JbmRleCwgdG9JbmRleCwgbGlzdCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgZnJvbUluZGV4LCB0b0luZGV4KTtcbn0pKTtcbmV4cG9ydCBkZWZhdWx0IHNsaWNlOyIsImltcG9ydCBfY2hlY2tGb3JNZXRob2QgZnJvbSAnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QuanMnO1xuaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBzbGljZSBmcm9tICcuL3NsaWNlLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBidXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nIChvciBvYmplY3RcbiAqIHdpdGggYSBgdGFpbGAgbWV0aG9kKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgc2xpY2VgIG1ldGhvZCBvZiB0aGUgZmlyc3QgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5oZWFkLCBSLmluaXQsIFIubGFzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudGFpbChbMSwgMiwgM10pOyAgLy89PiBbMiwgM11cbiAqICAgICAgUi50YWlsKFsxLCAyXSk7ICAgICAvLz0+IFsyXVxuICogICAgICBSLnRhaWwoWzFdKTsgICAgICAgIC8vPT4gW11cbiAqICAgICAgUi50YWlsKFtdKTsgICAgICAgICAvLz0+IFtdXG4gKlxuICogICAgICBSLnRhaWwoJ2FiYycpOyAgLy89PiAnYmMnXG4gKiAgICAgIFIudGFpbCgnYWInKTsgICAvLz0+ICdiJ1xuICogICAgICBSLnRhaWwoJ2EnKTsgICAgLy89PiAnJ1xuICogICAgICBSLnRhaWwoJycpOyAgICAgLy89PiAnJ1xuICovXG52YXIgdGFpbCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKCAvKiNfX1BVUkVfXyovX2NoZWNrRm9yTWV0aG9kKCd0YWlsJywgLyojX19QVVJFX18qL3NsaWNlKDEsIEluZmluaXR5KSkpO1xuZXhwb3J0IGRlZmF1bHQgdGFpbDsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IF90b1N0cmluZyBmcm9tICcuL2ludGVybmFsL190b1N0cmluZy5qcyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiB2YWx1ZS4gYGV2YWxgJ2luZyB0aGUgb3V0cHV0XG4gKiBzaG91bGQgcmVzdWx0IGluIGEgdmFsdWUgZXF1aXZhbGVudCB0byB0aGUgaW5wdXQgdmFsdWUuIE1hbnkgb2YgdGhlIGJ1aWx0LWluXG4gKiBgdG9TdHJpbmdgIG1ldGhvZHMgZG8gbm90IHNhdGlzZnkgdGhpcyByZXF1aXJlbWVudC5cbiAqXG4gKiBJZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYFtvYmplY3QgT2JqZWN0XWAgd2l0aCBhIGB0b1N0cmluZ2AgbWV0aG9kIG90aGVyXG4gKiB0aGFuIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCwgdGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aXRoIG5vIGFyZ3VtZW50c1xuICogdG8gcHJvZHVjZSB0aGUgcmV0dXJuIHZhbHVlLiBUaGlzIG1lYW5zIHVzZXItZGVmaW5lZCBjb25zdHJ1Y3RvciBmdW5jdGlvbnNcbiAqIGNhbiBwcm92aWRlIGEgc3VpdGFibGUgYHRvU3RyaW5nYCBtZXRob2QuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gKiAgICAgICB0aGlzLnggPSB4O1xuICogICAgICAgdGhpcy55ID0geTtcbiAqICAgICB9XG4gKlxuICogICAgIFBvaW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuICduZXcgUG9pbnQoJyArIHRoaXMueCArICcsICcgKyB0aGlzLnkgKyAnKSc7XG4gKiAgICAgfTtcbiAqXG4gKiAgICAgUi50b1N0cmluZyhuZXcgUG9pbnQoMSwgMikpOyAvLz0+ICduZXcgUG9pbnQoMSwgMiknXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyAqIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRvU3RyaW5nKDQyKTsgLy89PiAnNDInXG4gKiAgICAgIFIudG9TdHJpbmcoJ2FiYycpOyAvLz0+ICdcImFiY1wiJ1xuICogICAgICBSLnRvU3RyaW5nKFsxLCAyLCAzXSk7IC8vPT4gJ1sxLCAyLCAzXSdcbiAqICAgICAgUi50b1N0cmluZyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30pOyAvLz0+ICd7XCJiYXJcIjogMiwgXCJiYXpcIjogMywgXCJmb29cIjogMX0nXG4gKiAgICAgIFIudG9TdHJpbmcobmV3IERhdGUoJzIwMDEtMDItMDNUMDQ6MDU6MDZaJykpOyAvLz0+ICduZXcgRGF0ZShcIjIwMDEtMDItMDNUMDQ6MDU6MDYuMDAwWlwiKSdcbiAqL1xudmFyIHRvU3RyaW5nID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdG9TdHJpbmcodmFsKSB7XG4gIHJldHVybiBfdG9TdHJpbmcodmFsLCBbXSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IHRvU3RyaW5nOyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5cbi8qKlxuICogR2l2ZXMgYSBzaW5nbGUtd29yZCBzdHJpbmcgZGVzY3JpcHRpb24gb2YgdGhlIChuYXRpdmUpIHR5cGUgb2YgYSB2YWx1ZSxcbiAqIHJldHVybmluZyBzdWNoIGFuc3dlcnMgYXMgJ09iamVjdCcsICdOdW1iZXInLCAnQXJyYXknLCBvciAnTnVsbCcuIERvZXMgbm90XG4gKiBhdHRlbXB0IHRvIGRpc3Rpbmd1aXNoIHVzZXIgT2JqZWN0IHR5cGVzIGFueSBmdXJ0aGVyLCByZXBvcnRpbmcgdGhlbSBhbGwgYXNcbiAqICdPYmplY3QnLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKCogLT4geyp9KSAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50eXBlKHt9KTsgLy89PiBcIk9iamVjdFwiXG4gKiAgICAgIFIudHlwZSgxKTsgLy89PiBcIk51bWJlclwiXG4gKiAgICAgIFIudHlwZShmYWxzZSk7IC8vPT4gXCJCb29sZWFuXCJcbiAqICAgICAgUi50eXBlKCdzJyk7IC8vPT4gXCJTdHJpbmdcIlxuICogICAgICBSLnR5cGUobnVsbCk7IC8vPT4gXCJOdWxsXCJcbiAqICAgICAgUi50eXBlKFtdKTsgLy89PiBcIkFycmF5XCJcbiAqICAgICAgUi50eXBlKC9bQS16XS8pOyAvLz0+IFwiUmVnRXhwXCJcbiAqICAgICAgUi50eXBlKCgpID0+IHt9KTsgLy89PiBcIkZ1bmN0aW9uXCJcbiAqICAgICAgUi50eXBlKHVuZGVmaW5lZCk7IC8vPT4gXCJVbmRlZmluZWRcIlxuICovXG52YXIgdHlwZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHR5cGUodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IG51bGwgPyAnTnVsbCcgOiB2YWwgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xufSk7XG5leHBvcnQgZGVmYXVsdCB0eXBlOyIsImltcG9ydCB7IHZub2RlIH0gZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaChzZWwsIGIsIGMpIHtcbiAgICB2YXIgZGF0YSA9IHt9LCBjaGlsZHJlbiwgdGV4dCwgaTtcbiAgICBpZiAoYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRhdGEgPSBiO1xuICAgICAgICBpZiAoaXMuYXJyYXkoYykpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHtcbiAgICAgICAgICAgIHRleHQgPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgJiYgYy5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2NdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXMuYXJyYXkoYikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYikpIHtcbiAgICAgICAgICAgIHRleHQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIgJiYgYi5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2JdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaXMucHJpbWl0aXZlKGNoaWxkcmVuW2ldKSlcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IHZub2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuO1xuZXhwb3J0IGRlZmF1bHQgaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0IHZhciBodG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0IGRlZmF1bHQgaHRtbERvbUFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxkb21hcGkuanMubWFwIiwiZXhwb3J0IHZhciBhcnJheSA9IEFycmF5LmlzQXJyYXk7XG5leHBvcnQgZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLmpzLm1hcCIsImltcG9ydCB2bm9kZSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCAqIGFzIGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGh0bWxEb21BcGkgZnJvbSAnLi9odG1sZG9tYXBpJztcbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cbnZhciBlbXB0eU5vZGUgPSB2bm9kZSgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbmV4cG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZXhwb3J0IHsgdGh1bmsgfSBmcm9tICcuL3RodW5rJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sRG9tQXBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaG9vayA9IG1vZHVsZXNbal1baG9va3NbaV1dO1xuICAgICAgICAgICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNic1tob29rc1tpXV0ucHVzaChob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbXB0eU5vZGVBdChlbG0pIHtcbiAgICAgICAgdmFyIGlkID0gZWxtLmlkID8gJyMnICsgZWxtLmlkIDogJyc7XG4gICAgICAgIHZhciBjID0gZWxtLmNsYXNzTmFtZSA/ICcuJyArIGVsbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcbiAgICAgICAgcmV0dXJuIHZub2RlKGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSArIGlkICsgYywge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcm1DYigpIHtcbiAgICAgICAgICAgIGlmICgtLWxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50XzEsIGNoaWxkRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiwgc2VsID0gdm5vZGUuc2VsO1xuICAgICAgICBpZiAoc2VsID09PSAnIScpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICAgICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgICAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IGlzRGVmKGRhdGEpICYmIGlzRGVmKGkgPSBkYXRhLm5zKSA/IGFwaS5jcmVhdGVFbGVtZW50TlMoaSwgdGFnKVxuICAgICAgICAgICAgICAgIDogYXBpLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgICAgIGlmIChoYXNoIDwgZG90KVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpKTtcbiAgICAgICAgICAgIGlmIChkb3RJZHggPiAwKVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgc2VsLnNsaWNlKGRvdCArIDEpLnJlcGxhY2UoL1xcLi9nLCAnICcpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgICAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgICAgICB2YXIgb2xkS2V5VG9JZHg7XG4gICAgICAgIHZhciBpZHhJbk9sZDtcbiAgICAgICAgdmFyIGVsbVRvTW92ZTtcbiAgICAgICAgdmFyIGJlZm9yZTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07IC8vIFZub2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvbGRFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhvbGRFbmRWbm9kZS5lbG0pKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkge1xuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCB8fCBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ld0NoW25ld0VuZElkeCArIDFdID09IG51bGwgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgaG9vaztcbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhKSAmJiBpc0RlZihob29rID0gaS5ob29rKSAmJiBpc0RlZihpID0gaG9vay5wcmVwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2bm9kZS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSlcbiAgICAgICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoICE9PSBjaClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMoZWxtLCBudWxsLCBjaCwgMCwgY2gubGVuZ3RoIC0gMSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCB2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEZWYoaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucG9zdHBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwYXRjaChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGVsbSwgcGFyZW50O1xuICAgICAgICB2YXIgaW5zZXJ0ZWRWbm9kZVF1ZXVlID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucHJlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnByZVtpXSgpO1xuICAgICAgICBpZiAoIWlzVm5vZGUob2xkVm5vZGUpKSB7XG4gICAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICAgICAgcGFyZW50ID0gYXBpLnBhcmVudE5vZGUoZWxtKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudCwgdm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcoZWxtKSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudCwgW29sZFZub2RlXSwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGluc2VydGVkVm5vZGVRdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQoaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnBvc3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucG9zdFtpXSgpO1xuICAgICAgICByZXR1cm4gdm5vZGU7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNuYWJiZG9tLmpzLm1hcCIsImltcG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG9sZEFyZ3NbaV0gIT09IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weVRvVGh1bmsob2xkVm5vZGUsIHRodW5rKTtcbn1cbmV4cG9ydCB2YXIgdGh1bmsgPSBmdW5jdGlvbiB0aHVuayhzZWwsIGtleSwgZm4sIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBmbjtcbiAgICAgICAgZm4gPSBrZXk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCB0aHVuaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRodW5rLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnQgZGVmYXVsdCB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBpcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuZnVuY3Rpb24gYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCkge1xuICAgIGRhdGEubnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGlmIChzZWwgIT09ICdmb3JlaWduT2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZERhdGEgPSBjaGlsZHJlbltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGNoaWxkRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWRkTlMoY2hpbGREYXRhLCBjaGlsZHJlbltpXS5jaGlsZHJlbiwgY2hpbGRyZW5baV0uc2VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGlzLnByaW1pdGl2ZShjaGlsZHJlbltpXSkpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB2bm9kZV8xLnZub2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZV8xLnZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLmggPSBoO1xuO1xuZXhwb3J0cy5kZWZhdWx0ID0gaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudCh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dCk7XG59XG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xufVxuZnVuY3Rpb24gbmV4dFNpYmxpbmcobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xufVxuZnVuY3Rpb24gdGFnTmFtZShlbG0pIHtcbiAgICByZXR1cm4gZWxtLnRhZ05hbWU7XG59XG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChub2RlLCB0ZXh0KSB7XG4gICAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5mdW5jdGlvbiBnZXRUZXh0Q29udGVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQ7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxO1xufVxuZnVuY3Rpb24gaXNUZXh0KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMztcbn1cbmZ1bmN0aW9uIGlzQ29tbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDg7XG59XG5leHBvcnRzLmh0bWxEb21BcGkgPSB7XG4gICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcbiAgICBjcmVhdGVUZXh0Tm9kZTogY3JlYXRlVGV4dE5vZGUsXG4gICAgY3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcbiAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcbiAgICByZW1vdmVDaGlsZDogcmVtb3ZlQ2hpbGQsXG4gICAgYXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgbmV4dFNpYmxpbmc6IG5leHRTaWJsaW5nLFxuICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuICAgIGdldFRleHRDb250ZW50OiBnZXRUZXh0Q29udGVudCxcbiAgICBpc0VsZW1lbnQ6IGlzRWxlbWVudCxcbiAgICBpc1RleHQ6IGlzVGV4dCxcbiAgICBpc0NvbW1lbnQ6IGlzQ29tbWVudCxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcnJheSA9IEFycmF5LmlzQXJyYXk7XG5mdW5jdGlvbiBwcmltaXRpdmUocykge1xuICAgIHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHMgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5wcmltaXRpdmUgPSBwcmltaXRpdmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB4bGlua05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xudmFyIHhtbE5TID0gJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSc7XG52YXIgY29sb25DaGFyID0gNTg7XG52YXIgeENoYXIgPSAxMjA7XG5mdW5jdGlvbiB1cGRhdGVBdHRycyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBlbG0gPSB2bm9kZS5lbG0sIG9sZEF0dHJzID0gb2xkVm5vZGUuZGF0YS5hdHRycywgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzO1xuICAgIGlmICghb2xkQXR0cnMgJiYgIWF0dHJzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZEF0dHJzID09PSBhdHRycylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZEF0dHJzID0gb2xkQXR0cnMgfHwge307XG4gICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICAvLyB1cGRhdGUgbW9kaWZpZWQgYXR0cmlidXRlcywgYWRkIG5ldyBhdHRyaWJ1dGVzXG4gICAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgdmFyIGN1ciA9IGF0dHJzW2tleV07XG4gICAgICAgIHZhciBvbGQgPSBvbGRBdHRyc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIpIHtcbiAgICAgICAgICAgIGlmIChjdXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjdXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5jaGFyQ29kZUF0KDApICE9PSB4Q2hhcikge1xuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5LmNoYXJDb2RlQXQoMykgPT09IGNvbG9uQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgeG1sIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlTlMoeG1sTlMsIGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5LmNoYXJDb2RlQXQoNSkgPT09IGNvbG9uQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgeGxpbmsgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlbW92ZWQgYXR0cmlidXRlc1xuICAgIC8vIHVzZSBgaW5gIG9wZXJhdG9yIHNpbmNlIHRoZSBwcmV2aW91cyBgZm9yYCBpdGVyYXRpb24gdXNlcyBpdCAoLmkuZS4gYWRkIGV2ZW4gYXR0cmlidXRlcyB3aXRoIHVuZGVmaW5lZCB2YWx1ZSlcbiAgICAvLyB0aGUgb3RoZXIgb3B0aW9uIGlzIHRvIHJlbW92ZSBhbGwgYXR0cmlidXRlcyB3aXRoIHZhbHVlID09IHVuZGVmaW5lZFxuICAgIGZvciAoa2V5IGluIG9sZEF0dHJzKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBhdHRycykpIHtcbiAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuYXR0cmlidXRlc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVBdHRycywgdXBkYXRlOiB1cGRhdGVBdHRycyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5hdHRyaWJ1dGVzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXR0cmlidXRlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZUNsYXNzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBjdXIsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgb2xkQ2xhc3MgPSBvbGRWbm9kZS5kYXRhLmNsYXNzLCBrbGFzcyA9IHZub2RlLmRhdGEuY2xhc3M7XG4gICAgaWYgKCFvbGRDbGFzcyAmJiAha2xhc3MpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQ2xhc3MgPT09IGtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkQ2xhc3MgPSBvbGRDbGFzcyB8fCB7fTtcbiAgICBrbGFzcyA9IGtsYXNzIHx8IHt9O1xuICAgIGZvciAobmFtZSBpbiBvbGRDbGFzcykge1xuICAgICAgICBpZiAoIWtsYXNzW25hbWVdKSB7XG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4ga2xhc3MpIHtcbiAgICAgICAgY3VyID0ga2xhc3NbbmFtZV07XG4gICAgICAgIGlmIChjdXIgIT09IG9sZENsYXNzW25hbWVdKSB7XG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0W2N1ciA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5jbGFzc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVDbGFzcywgdXBkYXRlOiB1cGRhdGVDbGFzcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5jbGFzc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsYXNzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaW52b2tlSGFuZGxlcihoYW5kbGVyLCB2bm9kZSwgZXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBjYWxsIGZ1bmN0aW9uIGhhbmRsZXJcbiAgICAgICAgaGFuZGxlci5jYWxsKHZub2RlLCBldmVudCwgdm5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAvLyBjYWxsIGhhbmRsZXIgd2l0aCBhcmd1bWVudHNcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyWzBdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3Igc2luZ2xlIGFyZ3VtZW50IGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgaWYgKGhhbmRsZXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5jYWxsKHZub2RlLCBoYW5kbGVyWzFdLCBldmVudCwgdm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBoYW5kbGVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyWzBdLmFwcGx5KHZub2RlLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGwgbXVsdGlwbGUgaGFuZGxlcnNcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGludm9rZUhhbmRsZXIoaGFuZGxlcltpXSwgdm5vZGUsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50LCB2bm9kZSkge1xuICAgIHZhciBuYW1lID0gZXZlbnQudHlwZSwgb24gPSB2bm9kZS5kYXRhLm9uO1xuICAgIC8vIGNhbGwgZXZlbnQgaGFuZGxlcihzKSBpZiBleGlzdHNcbiAgICBpZiAob24gJiYgb25bbmFtZV0pIHtcbiAgICAgICAgaW52b2tlSGFuZGxlcihvbltuYW1lXSwgdm5vZGUsIGV2ZW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVMaXN0ZW5lcigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICBoYW5kbGVFdmVudChldmVudCwgaGFuZGxlci52bm9kZSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUV2ZW50TGlzdGVuZXJzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvbGRPbiA9IG9sZFZub2RlLmRhdGEub24sIG9sZExpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIsIG9sZEVsbSA9IG9sZFZub2RlLmVsbSwgb24gPSB2bm9kZSAmJiB2bm9kZS5kYXRhLm9uLCBlbG0gPSAodm5vZGUgJiYgdm5vZGUuZWxtKSwgbmFtZTtcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIHJldXNlZCBpbW11dGFibGUgaGFuZGxlcnNcbiAgICBpZiAob2xkT24gPT09IG9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGxpc3RlbmVycyB3aGljaCBubyBsb25nZXIgdXNlZFxuICAgIGlmIChvbGRPbiAmJiBvbGRMaXN0ZW5lcikge1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgZGVsZXRlZCB3ZSByZW1vdmUgYWxsIGV4aXN0aW5nIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgZXhpc3RpbmcgbGlzdGVuZXJzIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGV4aXN0aW5nIGxpc3RlbmVyIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEVsbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIG9sZExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCBuZXcgbGlzdGVuZXJzIHdoaWNoIGhhcyBub3QgYWxyZWFkeSBhdHRhY2hlZFxuICAgIGlmIChvbikge1xuICAgICAgICAvLyByZXVzZSBleGlzdGluZyBsaXN0ZW5lciBvciBjcmVhdGUgbmV3XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHZub2RlLmxpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIgfHwgY3JlYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gdXBkYXRlIHZub2RlIGZvciBsaXN0ZW5lclxuICAgICAgICBsaXN0ZW5lci52bm9kZSA9IHZub2RlO1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgYWRkZWQgd2UgYWRkIGFsbCBuZWVkZWQgbGlzdGVuZXJzIHVuY29uZGl0aW9uYWxseVxuICAgICAgICBpZiAoIW9sZE9uKSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgZWxlbWVudCB3YXMgY2hhbmdlZCBvciBuZXcgbGlzdGVuZXJzIGFkZGVkXG4gICAgICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbikge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lciBpZiBuZXcgbGlzdGVuZXIgYWRkZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9sZE9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZSA9IHtcbiAgICBjcmVhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIHVwZGF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZGVzdHJveTogdXBkYXRlRXZlbnRMaXN0ZW5lcnNcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmV2ZW50TGlzdGVuZXJzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRsaXN0ZW5lcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLCBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEucHJvcHMsIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcztcbiAgICBpZiAoIW9sZFByb3BzICYmICFwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRQcm9wcyA9PT0gcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRQcm9wcyA9IG9sZFByb3BzIHx8IHt9O1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wc1trZXldKSB7XG4gICAgICAgICAgICBkZWxldGUgZWxtW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAgICAgb2xkID0gb2xkUHJvcHNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyICYmIChrZXkgIT09ICd2YWx1ZScgfHwgZWxtW2tleV0gIT09IGN1cikpIHtcbiAgICAgICAgICAgIGVsbVtrZXldID0gY3VyO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5wcm9wc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVQcm9wcywgdXBkYXRlOiB1cGRhdGVQcm9wcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5wcm9wc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gQmluZGlnIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGxpa2UgdGhpcyBmaXhlcyBhIGJ1ZyBpbiBJRS9FZGdlLiBTZWUgIzM2MCBhbmQgIzQwOS5cbnZhciByYWYgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpLmJpbmQod2luZG93KSkgfHwgc2V0VGltZW91dDtcbnZhciBuZXh0RnJhbWUgPSBmdW5jdGlvbiAoZm4pIHsgcmFmKGZ1bmN0aW9uICgpIHsgcmFmKGZuKTsgfSk7IH07XG52YXIgcmVmbG93Rm9yY2VkID0gZmFsc2U7XG5mdW5jdGlvbiBzZXROZXh0RnJhbWUob2JqLCBwcm9wLCB2YWwpIHtcbiAgICBuZXh0RnJhbWUoZnVuY3Rpb24gKCkgeyBvYmpbcHJvcF0gPSB2YWw7IH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlU3R5bGUob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGN1ciwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBvbGRTdHlsZSA9IG9sZFZub2RlLmRhdGEuc3R5bGUsIHN0eWxlID0gdm5vZGUuZGF0YS5zdHlsZTtcbiAgICBpZiAoIW9sZFN0eWxlICYmICFzdHlsZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRTdHlsZSA9PT0gc3R5bGUpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRTdHlsZSA9IG9sZFN0eWxlIHx8IHt9O1xuICAgIHN0eWxlID0gc3R5bGUgfHwge307XG4gICAgdmFyIG9sZEhhc0RlbCA9ICdkZWxheWVkJyBpbiBvbGRTdHlsZTtcbiAgICBmb3IgKG5hbWUgaW4gb2xkU3R5bGUpIHtcbiAgICAgICAgaWYgKCFzdHlsZVtuYW1lXSkge1xuICAgICAgICAgICAgaWYgKG5hbWVbMF0gPT09ICctJyAmJiBuYW1lWzFdID09PSAnLScpIHtcbiAgICAgICAgICAgICAgICBlbG0uc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbG0uc3R5bGVbbmFtZV0gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgY3VyID0gc3R5bGVbbmFtZV07XG4gICAgICAgIGlmIChuYW1lID09PSAnZGVsYXllZCcgJiYgc3R5bGUuZGVsYXllZCkge1xuICAgICAgICAgICAgZm9yICh2YXIgbmFtZTIgaW4gc3R5bGUuZGVsYXllZCkge1xuICAgICAgICAgICAgICAgIGN1ciA9IHN0eWxlLmRlbGF5ZWRbbmFtZTJdO1xuICAgICAgICAgICAgICAgIGlmICghb2xkSGFzRGVsIHx8IGN1ciAhPT0gb2xkU3R5bGUuZGVsYXllZFtuYW1lMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0TmV4dEZyYW1lKGVsbS5zdHlsZSwgbmFtZTIsIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgIT09ICdyZW1vdmUnICYmIGN1ciAhPT0gb2xkU3R5bGVbbmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzBdID09PSAnLScgJiYgbmFtZVsxXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGN1cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbG0uc3R5bGVbbmFtZV0gPSBjdXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBhcHBseURlc3Ryb3lTdHlsZSh2bm9kZSkge1xuICAgIHZhciBzdHlsZSwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBzID0gdm5vZGUuZGF0YS5zdHlsZTtcbiAgICBpZiAoIXMgfHwgIShzdHlsZSA9IHMuZGVzdHJveSkpXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKG5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gc3R5bGVbbmFtZV07XG4gICAgfVxufVxuZnVuY3Rpb24gYXBwbHlSZW1vdmVTdHlsZSh2bm9kZSwgcm0pIHtcbiAgICB2YXIgcyA9IHZub2RlLmRhdGEuc3R5bGU7XG4gICAgaWYgKCFzIHx8ICFzLnJlbW92ZSkge1xuICAgICAgICBybSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcmVmbG93Rm9yY2VkKSB7XG4gICAgICAgIGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkudHJhbnNmb3JtO1xuICAgICAgICByZWZsb3dGb3JjZWQgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBpID0gMCwgY29tcFN0eWxlLCBzdHlsZSA9IHMucmVtb3ZlLCBhbW91bnQgPSAwLCBhcHBsaWVkID0gW107XG4gICAgZm9yIChuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGFwcGxpZWQucHVzaChuYW1lKTtcbiAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gc3R5bGVbbmFtZV07XG4gICAgfVxuICAgIGNvbXBTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxtKTtcbiAgICB2YXIgcHJvcHMgPSBjb21wU3R5bGVbJ3RyYW5zaXRpb24tcHJvcGVydHknXS5zcGxpdCgnLCAnKTtcbiAgICBmb3IgKDsgaSA8IHByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChhcHBsaWVkLmluZGV4T2YocHJvcHNbaV0pICE9PSAtMSlcbiAgICAgICAgICAgIGFtb3VudCsrO1xuICAgIH1cbiAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoZXYudGFyZ2V0ID09PSBlbG0pXG4gICAgICAgICAgICAtLWFtb3VudDtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gMClcbiAgICAgICAgICAgIHJtKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmb3JjZVJlZmxvdygpIHtcbiAgICByZWZsb3dGb3JjZWQgPSBmYWxzZTtcbn1cbmV4cG9ydHMuc3R5bGVNb2R1bGUgPSB7XG4gICAgcHJlOiBmb3JjZVJlZmxvdyxcbiAgICBjcmVhdGU6IHVwZGF0ZVN0eWxlLFxuICAgIHVwZGF0ZTogdXBkYXRlU3R5bGUsXG4gICAgZGVzdHJveTogYXBwbHlEZXN0cm95U3R5bGUsXG4gICAgcmVtb3ZlOiBhcHBseVJlbW92ZVN0eWxlXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5zdHlsZU1vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0eWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBodG1sZG9tYXBpXzEgPSByZXF1aXJlKFwiLi9odG1sZG9tYXBpXCIpO1xuZnVuY3Rpb24gdG9WTm9kZShub2RlLCBkb21BcGkpIHtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sZG9tYXBpXzEuZGVmYXVsdDtcbiAgICB2YXIgdGV4dDtcbiAgICBpZiAoYXBpLmlzRWxlbWVudChub2RlKSkge1xuICAgICAgICB2YXIgaWQgPSBub2RlLmlkID8gJyMnICsgbm9kZS5pZCA6ICcnO1xuICAgICAgICB2YXIgY24gPSBub2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgdmFyIGMgPSBjbiA/ICcuJyArIGNuLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHZhciBzZWwgPSBhcGkudGFnTmFtZShub2RlKS50b0xvd2VyQ2FzZSgpICsgaWQgKyBjO1xuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgICAgIHZhciBuYW1lXzE7XG4gICAgICAgIHZhciBpID0gdm9pZCAwLCBuID0gdm9pZCAwO1xuICAgICAgICB2YXIgZWxtQXR0cnMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgICAgIHZhciBlbG1DaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUF0dHJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbmFtZV8xID0gZWxtQXR0cnNbaV0ubm9kZU5hbWU7XG4gICAgICAgICAgICBpZiAobmFtZV8xICE9PSAnaWQnICYmIG5hbWVfMSAhPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgIGF0dHJzW25hbWVfMV0gPSBlbG1BdHRyc1tpXS5ub2RlVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUNoaWxkcmVuLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0b1ZOb2RlKGVsbUNoaWxkcmVuW2ldLCBkb21BcGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KHNlbCwgeyBhdHRyczogYXR0cnMgfSwgY2hpbGRyZW4sIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFwaS5pc1RleHQobm9kZSkpIHtcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0ZXh0LCBub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYXBpLmlzQ29tbWVudChub2RlKSkge1xuICAgICAgICB0ZXh0ID0gYXBpLmdldFRleHRDb250ZW50KG5vZGUpO1xuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KCchJywge30sIFtdLCB0ZXh0LCBub2RlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG59XG5leHBvcnRzLnRvVk5vZGUgPSB0b1ZOb2RlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdG9WTm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvdm5vZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnRzLnZub2RlID0gdm5vZGU7XG5leHBvcnRzLmRlZmF1bHQgPSB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsInZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGF0ZS5jc3NcIik7XG5cbmlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xufVxuXG52YXIgb3B0aW9ucyA9IHt9XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmIChjb250ZW50LmxvY2Fscykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlcyA9IFtdO1xuICB2YXIgbmV3U3R5bGVzID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjc3MgPSBpdGVtWzFdO1xuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl07XG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfTtcblxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBwYXJ0czogW3BhcnRdXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldO1xuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuICAgIHZhciBqID0gMDtcblxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrO1xuXG4gICAgICBmb3IgKDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge1xuICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgcmVmczogMSxcbiAgICAgICAgcGFydHM6IHBhcnRzXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIG9wdGlvbnMuYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKG9wdGlvbnMuYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgb3B0aW9ucy5hdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuYXR0cmlidXRlcyA9IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICdvYmplY3QnID8gb3B0aW9ucy5hdHRyaWJ1dGVzIDoge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldO1xuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cbiAgICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgICBkb21TdHlsZS5yZWZzLS07XG4gICAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgdmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcbiAgICAgIGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1heVJlbW92ZS5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfZG9tU3R5bGUgPSBtYXlSZW1vdmVbX2ldO1xuXG4gICAgICBpZiAoX2RvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBfZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBfZG9tU3R5bGUucGFydHNbal0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtfZG9tU3R5bGUuaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07IiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgYm91bmQgdG8gYSBjb250ZXh0LlxuICogTm90ZTogYFIuYmluZGAgZG9lcyBub3QgcHJvdmlkZSB0aGUgYWRkaXRpb25hbCBhcmd1bWVudC1iaW5kaW5nIGNhcGFiaWxpdGllcyBvZlxuICogW0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoKiAtPiAqKSAtPiB7Kn0gLT4gKCogLT4gKilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiaW5kIHRvIGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzT2JqIFRoZSBjb250ZXh0IHRvIGJpbmQgYGZuYCB0b1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIGV4ZWN1dGUgaW4gdGhlIGNvbnRleHQgb2YgYHRoaXNPYmpgLlxuICogQHNlZSBSLnBhcnRpYWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbG9nID0gUi5iaW5kKGNvbnNvbGUubG9nLCBjb25zb2xlKTtcbiAqICAgICAgUi5waXBlKFIuYXNzb2MoJ2EnLCAyKSwgUi50YXAobG9nKSwgUi5hc3NvYygnYScsIDMpKSh7YTogMX0pOyAvLz0+IHthOiAzfVxuICogICAgICAvLyBsb2dzIHthOiAyfVxuICogQHN5bWIgUi5iaW5kKGYsIG8pKGEsIGIpID0gZi5jYWxsKG8sIGEsIGIpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBiaW5kKGZuLCB0aGlzT2JqKSB7XG4gIHJldHVybiBfYXJpdHkoZm4ubGVuZ3RoLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc09iaiwgYXJndW1lbnRzKTtcbiAgfSk7XG59KTtcbiIsInZhciBwaXBlID0gcmVxdWlyZSgnLi9waXBlJyk7XG52YXIgcmV2ZXJzZSA9IHJlcXVpcmUoJy4vcmV2ZXJzZScpO1xuXG5cbi8qKlxuICogUGVyZm9ybXMgcmlnaHQtdG8tbGVmdCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIHJpZ2h0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZVxuICogYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICpcbiAqICoqTm90ZToqKiBUaGUgcmVzdWx0IG9mIGNvbXBvc2UgaXMgbm90IGF1dG9tYXRpY2FsbHkgY3VycmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKHkgLT4geiksICh4IC0+IHkpLCAuLi4sIChvIC0+IHApLCAoKGEsIGIsIC4uLiwgbikgLT4gbykpIC0+ICgoYSwgYiwgLi4uLCBuKSAtPiB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gLi4uZnVuY3Rpb25zIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIucGlwZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBjbGFzc3lHcmVldGluZyA9IChmaXJzdE5hbWUsIGxhc3ROYW1lKSA9PiBcIlRoZSBuYW1lJ3MgXCIgKyBsYXN0TmFtZSArIFwiLCBcIiArIGZpcnN0TmFtZSArIFwiIFwiICsgbGFzdE5hbWVcbiAqICAgICAgdmFyIHllbGxHcmVldGluZyA9IFIuY29tcG9zZShSLnRvVXBwZXIsIGNsYXNzeUdyZWV0aW5nKTtcbiAqICAgICAgeWVsbEdyZWV0aW5nKCdKYW1lcycsICdCb25kJyk7IC8vPT4gXCJUSEUgTkFNRSdTIEJPTkQsIEpBTUVTIEJPTkRcIlxuICpcbiAqICAgICAgUi5jb21wb3NlKE1hdGguYWJzLCBSLmFkZCgxKSwgUi5tdWx0aXBseSgyKSkoLTQpIC8vPT4gN1xuICpcbiAqIEBzeW1iIFIuY29tcG9zZShmLCBnLCBoKShhLCBiKSA9IGYoZyhoKGEsIGIpKSlcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wb3NlKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY29tcG9zZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gcGlwZS5hcHBseSh0aGlzLCByZXZlcnNlKGFyZ3VtZW50cykpO1xufTtcbiIsInZhciBfYXJpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xudmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2N1cnJ5TiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5TicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24sIHdpdGggdGhlIHNwZWNpZmllZFxuICogYXJpdHkuIFRoZSBjdXJyaWVkIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHNcbiAqIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZSBhdCBhIHRpbWUuIElmIGBnYCBpcyBgUi5jdXJyeU4oMywgZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHN1bUFyZ3MgPSAoLi4uYXJncykgPT4gUi5zdW0oYXJncyk7XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgc3VtQXJncyk7XG4gKiAgICAgIHZhciBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICB2YXIgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGN1cnJ5TihsZW5ndGgsIGZuKSB7XG4gIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEwKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDY6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNzogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgODogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDk6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMTA6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIF9hcml0eSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgbm8gZ3JlYXRlciB0aGFuIHRlbicpO1xuICB9XG59O1xuIiwidmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi9faXNBcnJheScpO1xuXG5cbi8qKlxuICogVGhpcyBjaGVja3Mgd2hldGhlciBhIGZ1bmN0aW9uIGhhcyBhIFttZXRob2RuYW1lXSBmdW5jdGlvbi4gSWYgaXQgaXNuJ3QgYW5cbiAqIGFycmF5IGl0IHdpbGwgZXhlY3V0ZSB0aGF0IGZ1bmN0aW9uIG90aGVyd2lzZSBpdCB3aWxsIGRlZmF1bHQgdG8gdGhlIHJhbWRhXG4gKiBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gcmFtZGEgaW1wbGVtdGF0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kbmFtZSBwcm9wZXJ0eSB0byBjaGVjayBmb3IgYSBjdXN0b20gaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm4ge09iamVjdH0gV2hhdGV2ZXIgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgbWV0aG9kIGlzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jaGVja0Zvck1ldGhvZChtZXRob2RuYW1lLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIHZhciBvYmogPSBhcmd1bWVudHNbbGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIChfaXNBcnJheShvYmopIHx8IHR5cGVvZiBvYmpbbWV0aG9kbmFtZV0gIT09ICdmdW5jdGlvbicpID9cbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOlxuICAgICAgb2JqW21ldGhvZG5hbWVdLmFwcGx5KG9iaiwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBsZW5ndGggLSAxKSk7XG4gIH07XG59O1xuIiwidmFyIF9pc1BsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIG9uZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5MShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjEoYSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IF9pc1BsYWNlaG9sZGVyKGEpKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vX2N1cnJ5MScpO1xudmFyIF9pc1BsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5Mihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjIoYSwgYikge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gZjI7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSA/IGYyXG4gICAgICAgICAgICAgOiBfY3VycnkxKGZ1bmN0aW9uKF9iKSB7IHJldHVybiBmbihhLCBfYik7IH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjJcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbihfYSkgeyByZXR1cm4gZm4oX2EsIGIpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uKF9iKSB7IHJldHVybiBmbihhLCBfYik7IH0pXG4gICAgICAgICAgICAgOiBmbihhLCBiKTtcbiAgICB9XG4gIH07XG59O1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL19jdXJyeTEnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG52YXIgX2lzUGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdGhyZWUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTMoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYzKGEsIGIsIGMpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYzO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmM1xuICAgICAgICAgICAgIDogX2N1cnJ5MihmdW5jdGlvbihfYiwgX2MpIHsgcmV0dXJuIGZuKGEsIF9iLCBfYyk7IH0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBmM1xuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkyKGZ1bmN0aW9uKF9hLCBfYykgeyByZXR1cm4gZm4oX2EsIGIsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MihmdW5jdGlvbihfYiwgX2MpIHsgcmV0dXJuIGZuKGEsIF9iLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBfY3VycnkxKGZ1bmN0aW9uKF9jKSB7IHJldHVybiBmbihhLCBiLCBfYyk7IH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gZjNcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MihmdW5jdGlvbihfYSwgX2IpIHsgcmV0dXJuIGZuKF9hLCBfYiwgYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2EsIF9jKSB7IHJldHVybiBmbihfYSwgYiwgX2MpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYikgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkyKGZ1bmN0aW9uKF9iLCBfYykgeyByZXR1cm4gZm4oYSwgX2IsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbihfYSkgeyByZXR1cm4gZm4oX2EsIGIsIGMpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uKF9iKSB7IHJldHVybiBmbihhLCBfYiwgYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2MpIHsgcmV0dXJuIGZuKGEsIGIsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IGZuKGEsIGIsIGMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9fYXJpdHknKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIEludGVybmFsIGN1cnJ5TiBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBvZiB0aGUgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHJlY2VpdmVkIEFuIGFycmF5IG9mIGFyZ3VtZW50cyByZWNlaXZlZCB0aHVzIGZhci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgdmFyIGxlZnQgPSBsZW5ndGg7XG4gICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpZiAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggJiZcbiAgICAgICAgICAoIV9pc1BsYWNlaG9sZGVyKHJlY2VpdmVkW2NvbWJpbmVkSWR4XSkgfHxcbiAgICAgICAgICAgYXJnc0lkeCA+PSBhcmd1bWVudHMubGVuZ3RoKSkge1xuICAgICAgICByZXN1bHQgPSByZWNlaXZlZFtjb21iaW5lZElkeF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbYXJnc0lkeF07XG4gICAgICAgIGFyZ3NJZHggKz0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkW2NvbWJpbmVkSWR4XSA9IHJlc3VsdDtcbiAgICAgIGlmICghX2lzUGxhY2Vob2xkZXIocmVzdWx0KSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpXG4gICAgICAgICAgICAgICAgICAgICA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gIH07XG59O1xuIiwiLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgdmFsYCBpcyBhbiBhcnJheSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2lzQXJyYXkoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXkobnVsbCk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXkoe30pOyAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBfaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuICh2YWwgIT0gbnVsbCAmJlxuICAgICAgICAgIHZhbC5sZW5ndGggPj0gMCAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nKTtcbn07XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vX2N1cnJ5MScpO1xudmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi9faXNBcnJheScpO1xudmFyIF9pc1N0cmluZyA9IHJlcXVpcmUoJy4vX2lzU3RyaW5nJyk7XG5cblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgc2ltaWxhciB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaGFzIGEgbnVtZXJpYyBsZW5ndGggcHJvcGVydHkgYW5kIGV4dHJlbWUgaW5kaWNlcyBkZWZpbmVkOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfaXNBcnJheUxpa2UoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXlMaWtlKHRydWUpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHtsZW5ndGg6IDEwfSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHswOiAnemVybycsIDk6ICduaW5lJywgbGVuZ3RoOiAxMH0pOyAvLz0+IHRydWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHgpIHtcbiAgaWYgKF9pc0FycmF5KHgpKSB7IHJldHVybiB0cnVlOyB9XG4gIGlmICgheCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHR5cGVvZiB4ICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKF9pc1N0cmluZyh4KSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHgubm9kZVR5cGUgPT09IDEpIHsgcmV0dXJuICEheC5sZW5ndGg7IH1cbiAgaWYgKHgubGVuZ3RoID09PSAwKSB7IHJldHVybiB0cnVlOyB9XG4gIGlmICh4Lmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4geC5oYXNPd25Qcm9wZXJ0eSgwKSAmJiB4Lmhhc093blByb3BlcnR5KHgubGVuZ3RoIC0gMSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgcmV0dXJuIGEgIT0gbnVsbCAmJlxuICAgICAgICAgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmXG4gICAgICAgICBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9pc1N0cmluZyh4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX3BpcGUoZiwgZykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGcuY2FsbCh0aGlzLCBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufTtcbiIsInZhciBfaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL19pc0FycmF5TGlrZScpO1xudmFyIF94d3JhcCA9IHJlcXVpcmUoJy4vX3h3cmFwJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2JpbmQnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gX2FycmF5UmVkdWNlKHhmLCBhY2MsIGxpc3QpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgYWNjID0geGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10oYWNjLCBsaXN0W2lkeF0pO1xuICAgICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgICAgYWNjID0gYWNjWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9pdGVyYWJsZVJlZHVjZSh4ZiwgYWNjLCBpdGVyKSB7XG4gICAgdmFyIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgICB3aGlsZSAoIXN0ZXAuZG9uZSkge1xuICAgICAgYWNjID0geGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10oYWNjLCBzdGVwLnZhbHVlKTtcbiAgICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgc3RlcCA9IGl0ZXIubmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShhY2MpO1xuICB9XG5cbiAgZnVuY3Rpb24gX21ldGhvZFJlZHVjZSh4ZiwgYWNjLCBvYmosIG1ldGhvZE5hbWUpIHtcbiAgICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShvYmpbbWV0aG9kTmFtZV0oYmluZCh4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgeGYpLCBhY2MpKTtcbiAgfVxuXG4gIHZhciBzeW1JdGVyYXRvciA9ICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJykgPyBTeW1ib2wuaXRlcmF0b3IgOiAnQEBpdGVyYXRvcic7XG4gIHJldHVybiBmdW5jdGlvbiBfcmVkdWNlKGZuLCBhY2MsIGxpc3QpIHtcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmbiA9IF94d3JhcChmbik7XG4gICAgfVxuICAgIGlmIChfaXNBcnJheUxpa2UobGlzdCkpIHtcbiAgICAgIHJldHVybiBfYXJyYXlSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGlzdFsnZmFudGFzeS1sYW5kL3JlZHVjZSddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0LCAnZmFudGFzeS1sYW5kL3JlZHVjZScpO1xuICAgIH1cbiAgICBpZiAobGlzdFtzeW1JdGVyYXRvcl0gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIF9pdGVyYWJsZVJlZHVjZShmbiwgYWNjLCBsaXN0W3N5bUl0ZXJhdG9yXSgpKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsaXN0Lm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGlzdC5yZWR1Y2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBfbWV0aG9kUmVkdWNlKGZuLCBhY2MsIGxpc3QsICdyZWR1Y2UnKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xuICB9O1xufSgpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYV3JhcChmbikge1xuICAgIHRoaXMuZiA9IGZuO1xuICB9XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdCBub3QgaW1wbGVtZW50ZWQgb24gWFdyYXAnKTtcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihhY2MpIHsgcmV0dXJuIGFjYzsgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24oYWNjLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBfeHdyYXAoZm4pIHsgcmV0dXJuIG5ldyBYV3JhcChmbik7IH07XG59KCkpO1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX3BpcGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19waXBlJyk7XG52YXIgcmVkdWNlID0gcmVxdWlyZSgnLi9yZWR1Y2UnKTtcbnZhciB0YWlsID0gcmVxdWlyZSgnLi90YWlsJyk7XG5cblxuLyoqXG4gKiBQZXJmb3JtcyBsZWZ0LXRvLXJpZ2h0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLiBUaGUgbGVmdG1vc3QgZnVuY3Rpb24gbWF5IGhhdmVcbiAqIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAqXG4gKiBJbiBzb21lIGxpYnJhcmllcyB0aGlzIGZ1bmN0aW9uIGlzIG5hbWVkIGBzZXF1ZW5jZWAuXG4gKlxuICogKipOb3RlOioqIFRoZSByZXN1bHQgb2YgcGlwZSBpcyBub3QgYXV0b21hdGljYWxseSBjdXJyaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoKGEsIGIsIC4uLiwgbikgLT4gbyksIChvIC0+IHApLCAuLi4sICh4IC0+IHkpLCAoeSAtPiB6KSkgLT4gKChhLCBiLCAuLi4sIG4pIC0+IHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jdGlvbnNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLmNvbXBvc2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZiA9IFIucGlwZShNYXRoLnBvdywgUi5uZWdhdGUsIFIuaW5jKTtcbiAqXG4gKiAgICAgIGYoMywgNCk7IC8vIC0oM140KSArIDFcbiAqIEBzeW1iIFIucGlwZShmLCBnLCBoKShhLCBiKSA9IGgoZyhmKGEsIGIpKSlcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwaXBlKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGlwZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGFyZ3VtZW50c1swXS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcmVkdWNlKF9waXBlLCBhcmd1bWVudHNbMF0sIHRhaWwoYXJndW1lbnRzKSkpO1xufTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZSBpdGVtIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIHRoZSBsaXN0LCBzdWNjZXNzaXZlbHkgY2FsbGluZ1xuICogdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudFxuICogdmFsdWUgZnJvbSB0aGUgYXJyYXksIGFuZCB0aGVuIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgbmV4dCBjYWxsLlxuICpcbiAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKGFjYywgdmFsdWUpKi4gSXQgbWF5IHVzZVxuICogW2BSLnJlZHVjZWRgXSgjcmVkdWNlZCkgdG8gc2hvcnRjdXQgdGhlIGl0ZXJhdGlvbi5cbiAqXG4gKiBUaGUgYXJndW1lbnRzJyBvcmRlciBvZiBbYHJlZHVjZVJpZ2h0YF0oI3JlZHVjZVJpZ2h0KSdzIGl0ZXJhdG9yIGZ1bmN0aW9uXG4gKiBpcyAqKHZhbHVlLCBhY2MpKi5cbiAqXG4gKiBOb3RlOiBgUi5yZWR1Y2VgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZVxuICogYXJyYXlzKSwgdW5saWtlIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlsc1xuICogb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlI0Rlc2NyaXB0aW9uXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHJlZHVjZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC4gV2hlblxuICogZG9pbmcgc28sIGl0IGlzIHVwIHRvIHRoZSB1c2VyIHRvIGhhbmRsZSB0aGUgW2BSLnJlZHVjZWRgXSgjcmVkdWNlZClcbiAqIHNob3J0Y3V0aW5nLCBhcyB0aGlzIGlzIG5vdCBpbXBsZW1lbnRlZCBieSBgcmVkdWNlYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5yZWR1Y2VkLCBSLmFkZEluZGV4LCBSLnJlZHVjZVJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5yZWR1Y2UoUi5zdWJ0cmFjdCwgMCwgWzEsIDIsIDMsIDRdKSAvLyA9PiAoKCgoMCAtIDEpIC0gMikgLSAzKSAtIDQpID0gLTEwXG4gKiAgICAgICAgICAgICAgICAtICAgICAgICAgICAgICAgLTEwXG4gKiAgICAgICAgICAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgICAgICAgICAtICAgNCAgICAgICAgICAgLTYgICA0XG4gKiAgICAgICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgICAgIC0gICAzICAgPT0+ICAgICAtMyAgIDNcbiAqICAgICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgICAtICAgMiAgICAgICAgICAgLTEgICAyXG4gKiAgICAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgICAwICAgMSAgICAgICAgICAgIDAgICAxXG4gKlxuICogQHN5bWIgUi5yZWR1Y2UoZiwgYSwgW2IsIGMsIGRdKSA9IGYoZihmKGEsIGIpLCBjKSwgZClcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKF9yZWR1Y2UpO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc1N0cmluZycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IG9yIHN0cmluZyB3aXRoIHRoZSBlbGVtZW50cyBvciBjaGFyYWN0ZXJzIGluIHJldmVyc2VcbiAqIG9yZGVyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gbGlzdFxuICogQHJldHVybiB7QXJyYXl8U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmV2ZXJzZShbMSwgMiwgM10pOyAgLy89PiBbMywgMiwgMV1cbiAqICAgICAgUi5yZXZlcnNlKFsxLCAyXSk7ICAgICAvLz0+IFsyLCAxXVxuICogICAgICBSLnJldmVyc2UoWzFdKTsgICAgICAgIC8vPT4gWzFdXG4gKiAgICAgIFIucmV2ZXJzZShbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi5yZXZlcnNlKCdhYmMnKTsgICAgICAvLz0+ICdjYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYWInKTsgICAgICAgLy89PiAnYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYScpOyAgICAgICAgLy89PiAnYSdcbiAqICAgICAgUi5yZXZlcnNlKCcnKTsgICAgICAgICAvLz0+ICcnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiByZXZlcnNlKGxpc3QpIHtcbiAgcmV0dXJuIF9pc1N0cmluZyhsaXN0KSA/IGxpc3Quc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5yZXZlcnNlKCk7XG59KTtcbiIsInZhciBfY2hlY2tGb3JNZXRob2QgPSByZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xudmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZyAob3Igb2JqZWN0IHdpdGggYSBgc2xpY2VgXG4gKiBtZXRob2QpIGZyb20gYGZyb21JbmRleGAgKGluY2x1c2l2ZSkgdG8gYHRvSW5kZXhgIChleGNsdXNpdmUpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzbGljZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjRcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tSW5kZXggVGhlIHN0YXJ0IGluZGV4IChpbmNsdXNpdmUpLlxuICogQHBhcmFtIHtOdW1iZXJ9IHRvSW5kZXggVGhlIGVuZCBpbmRleCAoZXhjbHVzaXZlKS5cbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnNsaWNlKDEsIDMsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAgIC8vPT4gWydiJywgJ2MnXVxuICogICAgICBSLnNsaWNlKDEsIEluZmluaXR5LCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7IC8vPT4gWydiJywgJ2MnLCAnZCddXG4gKiAgICAgIFIuc2xpY2UoMCwgLTEsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgtMywgLTEsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgwLCAzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAgICAgICAvLz0+ICdyYW0nXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhfY2hlY2tGb3JNZXRob2QoJ3NsaWNlJywgZnVuY3Rpb24gc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4LCBsaXN0KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBmcm9tSW5kZXgsIHRvSW5kZXgpO1xufSkpO1xuIiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kJyk7XG52YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIHNsaWNlID0gcmVxdWlyZSgnLi9zbGljZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhbGwgYnV0IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZyAob3Igb2JqZWN0XG4gKiB3aXRoIGEgYHRhaWxgIG1ldGhvZCkuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHNsaWNlYCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuaGVhZCwgUi5pbml0LCBSLmxhc3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRhaWwoWzEsIDIsIDNdKTsgIC8vPT4gWzIsIDNdXG4gKiAgICAgIFIudGFpbChbMSwgMl0pOyAgICAgLy89PiBbMl1cbiAqICAgICAgUi50YWlsKFsxXSk7ICAgICAgICAvLz0+IFtdXG4gKiAgICAgIFIudGFpbChbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi50YWlsKCdhYmMnKTsgIC8vPT4gJ2JjJ1xuICogICAgICBSLnRhaWwoJ2FiJyk7ICAgLy89PiAnYidcbiAqICAgICAgUi50YWlsKCdhJyk7ICAgIC8vPT4gJydcbiAqICAgICAgUi50YWlsKCcnKTsgICAgIC8vPT4gJydcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKF9jaGVja0Zvck1ldGhvZCgndGFpbCcsIHNsaWNlKDEsIEluZmluaXR5KSkpO1xuIiwidmFyIGN1cnJ5TiA9IHJlcXVpcmUoJ3JhbWRhL3NyYy9jdXJyeU4nKTtcbnZhciBjb21wb3NlID0gcmVxdWlyZSgncmFtZGEvc3JjL2NvbXBvc2UnKTtcbnZhciBpc1N0cmluZyA9IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJzsgfTtcbnZhciBpc051bWJlciA9IGZ1bmN0aW9uKG4pIHsgcmV0dXJuIHR5cGVvZiBuID09PSAnbnVtYmVyJzsgfTtcbnZhciBpc0Jvb2xlYW4gPSBmdW5jdGlvbihiKSB7IHJldHVybiB0eXBlb2YgYiA9PT0gJ2Jvb2xlYW4nOyB9O1xudmFyIGlzT2JqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59O1xudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbihmKSB7IHJldHVybiB0eXBlb2YgZiA9PT0gJ2Z1bmN0aW9uJzsgfTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihhKSB7IHJldHVybiAnbGVuZ3RoJyBpbiBhOyB9O1xuXG52YXIgbWFwQ29uc3RyVG9GbiA9IGZ1bmN0aW9uKGdyb3VwLCBjb25zdHIpIHtcbiAgcmV0dXJuIGNvbnN0ciA9PT0gU3RyaW5nICAgID8gaXNTdHJpbmdcbiAgICAgICA6IGNvbnN0ciA9PT0gTnVtYmVyICAgID8gaXNOdW1iZXJcbiAgICAgICA6IGNvbnN0ciA9PT0gQm9vbGVhbiAgID8gaXNCb29sZWFuXG4gICAgICAgOiBjb25zdHIgPT09IE9iamVjdCAgICA/IGlzT2JqZWN0XG4gICAgICAgOiBjb25zdHIgPT09IEFycmF5ICAgICA/IGlzQXJyYXlcbiAgICAgICA6IGNvbnN0ciA9PT0gRnVuY3Rpb24gID8gaXNGdW5jdGlvblxuICAgICAgIDogY29uc3RyID09PSB1bmRlZmluZWQgPyBncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjb25zdHI7XG59O1xuXG52YXIgbnVtVG9TdHIgPSBbJ2ZpcnN0JywgJ3NlY29uZCcsICd0aGlyZCcsICdmb3VydGgnLCAnZmlmdGgnLCAnc2l4dGgnLCAnc2V2ZW50aCcsICdlaWdodGgnLCAnbmludGgnLCAndGVudGgnXTtcblxudmFyIHZhbGlkYXRlID0gZnVuY3Rpb24oZ3JvdXAsIHZhbGlkYXRvcnMsIG5hbWUsIGFyZ3MpIHtcbiAgdmFyIHZhbGlkYXRvciwgdiwgaTtcbiAgaWYgKGFyZ3MubGVuZ3RoID4gdmFsaWRhdG9ycy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0b28gbWFueSBhcmd1bWVudHMgc3VwcGxpZWQgdG8gY29uc3RydWN0b3IgJyArIG5hbWVcbiAgICAgICsgJyAoZXhwZWN0ZWQgJyArIHZhbGlkYXRvcnMubGVuZ3RoICsgJyBidXQgZ290ICcgKyBhcmdzLmxlbmd0aCArICcpJyk7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2ID0gYXJnc1tpXTtcbiAgICB2YWxpZGF0b3IgPSBtYXBDb25zdHJUb0ZuKGdyb3VwLCB2YWxpZGF0b3JzW2ldKTtcbiAgICBpZiAoVHlwZS5jaGVjayA9PT0gdHJ1ZSAmJlxuICAgICAgICAodmFsaWRhdG9yLnByb3RvdHlwZSA9PT0gdW5kZWZpbmVkIHx8ICF2YWxpZGF0b3IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YodikpICYmXG4gICAgICAgICh0eXBlb2YgdmFsaWRhdG9yICE9PSAnZnVuY3Rpb24nIHx8ICF2YWxpZGF0b3IodikpKSB7XG4gICAgICB2YXIgc3RyVmFsID0gdHlwZW9mIHYgPT09ICdzdHJpbmcnID8gXCInXCIgKyB2ICsgXCInXCIgOiB2OyAvLyBwdXQgdGhlIHZhbHVlIGluIHF1b3RlcyBpZiBpdCdzIGEgc3RyaW5nXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd3cm9uZyB2YWx1ZSAnICsgc3RyVmFsICsgJyBwYXNzZWQgYXMgJyArIG51bVRvU3RyW2ldICsgJyBhcmd1bWVudCB0byBjb25zdHJ1Y3RvciAnICsgbmFtZSk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiB2YWx1ZVRvQXJyYXkodmFsdWUpIHtcbiAgdmFyIGksIGFyciA9IFtdO1xuICBmb3IgKGkgPSAwOyBpIDwgdmFsdWUuX2tleXMubGVuZ3RoOyArK2kpIHtcbiAgICBhcnIucHVzaCh2YWx1ZVt2YWx1ZS5fa2V5c1tpXV0pO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RWYWx1ZXMoa2V5cywgb2JqKSB7XG4gIHZhciBhcnIgPSBbXSwgaTtcbiAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIGFycltpXSA9IG9ialtrZXlzW2ldXTtcbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0b3IoZ3JvdXAsIG5hbWUsIGZpZWxkcykge1xuICB2YXIgdmFsaWRhdG9ycywga2V5cyA9IE9iamVjdC5rZXlzKGZpZWxkcyksIGk7XG4gIGlmIChpc0FycmF5KGZpZWxkcykpIHtcbiAgICB2YWxpZGF0b3JzID0gZmllbGRzO1xuICB9IGVsc2Uge1xuICAgIHZhbGlkYXRvcnMgPSBleHRyYWN0VmFsdWVzKGtleXMsIGZpZWxkcyk7XG4gIH1cbiAgZnVuY3Rpb24gY29uc3RydWN0KCkge1xuICAgIHZhciB2YWwgPSBPYmplY3QuY3JlYXRlKGdyb3VwLnByb3RvdHlwZSksIGk7XG4gICAgdmFsLl9rZXlzID0ga2V5cztcbiAgICB2YWwuX25hbWUgPSBuYW1lO1xuICAgIGlmIChUeXBlLmNoZWNrID09PSB0cnVlKSB7XG4gICAgICB2YWxpZGF0ZShncm91cCwgdmFsaWRhdG9ycywgbmFtZSwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFsW2tleXNbaV1dID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9XG4gIGdyb3VwW25hbWVdID0ga2V5cy5sZW5ndGggPT09IDAgPyBjb25zdHJ1Y3QoKSA6IGN1cnJ5TihrZXlzLmxlbmd0aCwgY29uc3RydWN0KTtcbiAgaWYgKGtleXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGdyb3VwW25hbWUrJ09mJ10gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3QuYXBwbHkodW5kZWZpbmVkLCBleHRyYWN0VmFsdWVzKGtleXMsIG9iaikpO1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmF3Q2FzZSh0eXBlLCBjYXNlcywgdmFsdWUsIGFyZykge1xuICB2YXIgd2lsZGNhcmQgPSBmYWxzZTtcbiAgdmFyIGhhbmRsZXIgPSBjYXNlc1t2YWx1ZS5fbmFtZV07XG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyID0gY2FzZXNbJ18nXTtcbiAgICB3aWxkY2FyZCA9IHRydWU7XG4gIH1cbiAgaWYgKFR5cGUuY2hlY2sgPT09IHRydWUpIHtcbiAgICBpZiAoIXR5cGUucHJvdG90eXBlLmlzUHJvdG90eXBlT2YodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd3cm9uZyB0eXBlIHBhc3NlZCB0byBjYXNlJyk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm9uLWV4aGF1c3RpdmUgcGF0dGVybnMgaW4gYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgfVxuICBpZiAoaGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGFyZ3MgPSB3aWxkY2FyZCA9PT0gdHJ1ZSA/IFthcmddXG4gICAgICAgICAgICAgOiBhcmcgIT09IHVuZGVmaW5lZCA/IHZhbHVlVG9BcnJheSh2YWx1ZSkuY29uY2F0KFthcmddKVxuICAgICAgICAgICAgIDogdmFsdWVUb0FycmF5KHZhbHVlKTtcbiAgICByZXR1cm4gaGFuZGxlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICB9XG59XG5cbnZhciB0eXBlQ2FzZSA9IGN1cnJ5TigzLCByYXdDYXNlKTtcbnZhciBjYXNlT24gPSBjdXJyeU4oNCwgcmF3Q2FzZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yKCkge1xuICByZXR1cm4ge1xuICAgIGlkeDogMCxcbiAgICB2YWw6IHRoaXMsXG4gICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIga2V5cyA9IHRoaXMudmFsLl9rZXlzO1xuICAgICAgcmV0dXJuIHRoaXMuaWR4ID09PSBrZXlzLmxlbmd0aFxuICAgICAgICA/IHtkb25lOiB0cnVlfVxuICAgICAgICA6IHt2YWx1ZTogdGhpcy52YWxba2V5c1t0aGlzLmlkeCsrXV19O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gVHlwZShkZXNjKSB7XG4gIHZhciBrZXksIHJlcywgb2JqID0ge307XG4gIG9iai5jYXNlID0gdHlwZUNhc2Uob2JqKTtcbiAgb2JqLmNhc2VPbiA9IGNhc2VPbihvYmopO1xuXG4gIG9iai5wcm90b3R5cGUgPSB7fTtcbiAgb2JqLnByb3RvdHlwZVtTeW1ib2wgPyBTeW1ib2wuaXRlcmF0b3IgOiAnQEBpdGVyYXRvciddID0gY3JlYXRlSXRlcmF0b3I7XG4gIG9iai5wcm90b3R5cGUuY2FzZSA9IGZ1bmN0aW9uIChjYXNlcykgeyByZXR1cm4gb2JqLmNhc2UoY2FzZXMsIHRoaXMpOyB9O1xuICBvYmoucHJvdG90eXBlLmNhc2VPbiA9IGZ1bmN0aW9uIChjYXNlcykgeyByZXR1cm4gb2JqLmNhc2VPbihjYXNlcywgdGhpcyk7IH07XG5cbiAgZm9yIChrZXkgaW4gZGVzYykge1xuICAgIHJlcyA9IGNvbnN0cnVjdG9yKG9iaiwga2V5LCBkZXNjW2tleV0pO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cblR5cGUuY2hlY2sgPSB0cnVlO1xuXG5UeXBlLkxpc3RPZiA9IGZ1bmN0aW9uIChUKSB7XG4gIHZhciBMaXN0ID0gVHlwZSh7TGlzdDpbQXJyYXldfSk7XG4gIHZhciBpbm5lclR5cGUgPSBUeXBlKHtUOiBbVF19KS5UO1xuICB2YXIgdmFsaWRhdGUgPSBMaXN0LmNhc2Uoe1xuICAgIExpc3Q6IGZ1bmN0aW9uIChhcnJheSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yKHZhciBuID0gMDsgbiA8IGFycmF5Lmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgaW5uZXJUeXBlKGFycmF5W25dKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd3cm9uZyB2YWx1ZSAnKyBhcnJheVtuXSArICcgcGFzc2VkIHRvIGxvY2F0aW9uICcgKyBudW1Ub1N0cltuXSArICcgaW4gTGlzdCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbXBvc2UodmFsaWRhdGUsIExpc3QuTGlzdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGU7XG4iLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJztcbmltcG9ydCByYXcgZnJvbSAnLi9yYXcnO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi4vdXRpbCc7XG5jb25zdCB7aCwgbW91bnRlckZvcn0gPSB1dGlsO1xuY29uc3QgZm9yd2FyZFRvID0gcmVxdWlyZSgnZmx5ZC1mb3J3YXJkdG8nKTtcbmNvbnN0IFR5cGUgPSByZXF1aXJlKCd1bmlvbi10eXBlJyk7XG5cbmNvbnN0IG9mID0gKENvbXBvbmVudCwgYXJncykgPT4ge1xuICAvLyBtb2RlbFxuICAvLyB7XG4gIC8vICAgY29sbGFwc2VkOiBib29sXG4gIC8vICAgY29udGVudHM6IGNoaWxkIGNvbXBvbmVudCBtb2RlbFxuICAvLyB9XG4gIGNvbnN0IGluaXQgPSAoY29sbGFwc2VkPWZhbHNlLCBjb250ZW50cz1Db21wb25lbnQuaW5pdCguLi5hcmdzKSkgPT4gKHtcbiAgICBjb2xsYXBzZWQsXG4gICAgY29udGVudHMsXG4gIH0pO1xuXG4gIGNvbnN0IEFjdGlvbiA9IFR5cGUoe1xuICAgIFRvZ2dsZTogW10sXG4gICAgTW9kaWZ5OiBbQ29tcG9uZW50LkFjdGlvbl0sXG4gIH0pO1xuXG4gIGNvbnN0IHVwZGF0ZSA9IEFjdGlvbi5jYXNlT24oe1xuICAgIFRvZ2dsZTogKG1vZGVsKSA9PiAoey4uLm1vZGVsLCBjb2xsYXBzZWQ6ICFtb2RlbC5jb2xsYXBzZWR9KSxcbiAgICBNb2RpZnk6IChjb21wb25lbnRBY3Rpb24sIG1vZGVsKSA9PiAoey4uLm1vZGVsLCBjb250ZW50czogQ29tcG9uZW50LnVwZGF0ZShjb21wb25lbnRBY3Rpb24sIG1vZGVsLmNvbnRlbnRzKX0pLFxuICB9KTtcblxuICBjb25zdCB2aWV3ID0gUi5jdXJyeSgoYWN0aW9uJCwgbW9kZWwpID0+XG4gICAgaCgnZGl2LmNvbGxhcHNlJywgW1xuICAgICAgaCgnYnV0dG9uJywge29uOiB7Y2xpY2s6IFthY3Rpb24kLCBBY3Rpb24uVG9nZ2xlXX19LCAnQ29sbGFwc2UgU2VjdGlvbicpLFxuICAgICAgaCgnZGl2Jywge3N0eWxlOiBtb2RlbC5jb2xsYXBzZWQgPyB7aGVpZ2h0OiAnMXB4Jywgb3ZlcmZsb3c6ICdoaWRkZW4nfSA6IHtvdmVyZmxvdzogJ2hpZGRlbid9fSxcbiAgICAgICAgW1xuICAgICAgICAgIENvbXBvbmVudC52aWV3KGZvcndhcmRUbyhhY3Rpb24kLCBBY3Rpb24uTW9kaWZ5KSwgbW9kZWwuY29udGVudHMpLFxuICAgICAgICBdXG4gICAgICApLFxuICAgIF0pXG4gICk7XG5cbiAgY29uc3QgbW91bnQgPSBtb3VudGVyRm9yKHt2aWV3LCB1cGRhdGV9KTtcbiAgcmV0dXJuIHtpbml0LCB2aWV3LCB1cGRhdGUsIEFjdGlvbiwgbW91bnR9O1xufVxuXG5jb25zdCBkZWZhdWx0Q29sbGFwc2VyID0gb2YocmF3KTtcbi8vIGV4cG9ydCBjb25zdCBjb2xsYXBzZXIgPSB7b2YsIC4uLmRlZmF1bHRDb2xsYXBzZXJ9XG5leHBvcnQgZGVmYXVsdCB7b2YsIC4uLmRlZmF1bHRDb2xsYXBzZXJ9IiwiY29uc3QgVHlwZSA9IHJlcXVpcmUoJ3VuaW9uLXR5cGUnKTtcblxuY29uc3QgaW5pdCA9IChjb250ZW50KSA9PiBjb250ZW50XG5cbmNvbnN0IEFjdGlvbiA9IFR5cGUoe30pO1xuXG5jb25zdCB1cGRhdGUgPSAoYWN0aW9uLCBtb2RlbCkgPT4gbW9kZWxcblxuY29uc3QgdmlldyA9IChhY3Rpb24kLCBtb2RlbCkgPT4gbW9kZWxcblxuZXhwb3J0IGRlZmF1bHQge2luaXQsIHZpZXcsIHVwZGF0ZSwgQWN0aW9ufSIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi4vdXRpbCc7XG5jb25zdCB7aCwgbW91bnRlckZvcn0gPSB1dGlsO1xuaW1wb3J0IHJhdyBmcm9tICcuL3Jhdyc7XG5jb25zdCBmb3J3YXJkVG8gPSByZXF1aXJlKCdmbHlkLWZvcndhcmR0bycpO1xuY29uc3QgVHlwZSA9IHJlcXVpcmUoJ3VuaW9uLXR5cGUnKTtcblxuY29uc3Qgb2YgPSAoQ29tcG9uZW50LCBhcmdzKSA9PiB7XG4gIC8vIG1vZGVsXG4gIC8vIHtcbiAgLy8gICB3aWR0aDogTnVtYmVyXG4gIC8vICAgY29udGVudHM6IGNoaWxkIGNvbXBvbmVudCBtb2RlbFxuICAvLyB9XG4gIGNvbnN0IEFjdGlvbiA9IFR5cGUoe1xuICAgIFNldFdpZHRoOiBbTnVtYmVyXSxcbiAgICBNb2RpZnk6IFtDb21wb25lbnQuQWN0aW9uXSxcbiAgfSk7XG5cbiAgY29uc3QgaW5pdCA9ICh3aWR0aCwgY29udGVudHM9Q29tcG9uZW50LmluaXQoLi4uYXJncykpID0+ICh7XG4gICAgd2lkdGgsXG4gICAgY29udGVudHMsXG4gIH0pO1xuXG4gIGNvbnN0IHVwZGF0ZSA9IEFjdGlvbi5jYXNlT24oe1xuICAgIFNldFdpZHRoOiAod2lkdGgsIG1vZGVsKSA9PiAoey4uLm1vZGVsLCB3aWR0aDogd2lkdGh9KSxcbiAgICBNb2RpZnk6IChjb21wb25lbnRBY3Rpb24sIG1vZGVsKSA9PiAoey4uLm1vZGVsLCBjb250ZW50czogQ29tcG9uZW50LnVwZGF0ZShjb21wb25lbnRBY3Rpb24sIG1vZGVsLmNvbnRlbnRzKX0pLFxuICB9KTtcblxuICBjb25zdCB2aWV3ID0gUi5jdXJyeSgoYWN0aW9uJCwgbW9kZWwpID0+XG4gICAgaCgnZGl2JywgW1xuICAgICAgaCgnYnV0dG9uJywge29uOiB7Y2xpY2s6IFthY3Rpb24kLCBBY3Rpb24uU2V0V2lkdGgoMzIwKV19fSwgJ01vYmlsZScpLFxuICAgICAgaCgnYnV0dG9uJywge29uOiB7Y2xpY2s6IFthY3Rpb24kLCBBY3Rpb24uU2V0V2lkdGgoMTMwMCldfX0sICdEZXNrdG9wJyksXG4gICAgICBoKCdkaXYnLCB7c3R5bGU6IHt3aWR0aDogYCR7bW9kZWwud2lkdGh9cHhgLCB0cmFuc2l0aW9uOiAnd2lkdGggMC41cyd9fSxcbiAgICAgICAgW1xuICAgICAgICAgIENvbXBvbmVudC52aWV3KGZvcndhcmRUbyhhY3Rpb24kLCBBY3Rpb24uTW9kaWZ5KSwgbW9kZWwuY29udGVudHMpLFxuICAgICAgICBdXG4gICAgICApLFxuICAgIF0pXG4gICk7XG5cbiAgY29uc3QgdGFyZ2V0VmFsdWUgPSAoZXYpID0+IGV2LnRhcmdldC52YWx1ZTtcblxuICBjb25zdCBpZkVudGVyID0gUi5jdXJyeShmdW5jdGlvbihmbiwgdmFsLCBldikge1xuICAgIGlmIChldi5rZXlDb2RlID09PSAxMykgcmV0dXJuIGZuKHZhbCk7XG4gIH0pO1xuXG4gIGNvbnN0IGlucHV0VmlldyA9IFIuY3VycnkoKGFjdGlvbiQsIG1vZGVsKSA9PlxuICAgIGgoJ2RpdicsIFtcbiAgICAgIGgoJ2lucHV0Jywge29uOiB7a2V5ZG93bjogKGV2LCBlbCkgPT4gaWZFbnRlcihSLmNvbXBvc2UoYWN0aW9uJCwgQWN0aW9uLlNldFdpZHRoLCBwYXJzZUludCksIHRhcmdldFZhbHVlKGV2KSwgZXYpfX0sICdNb2JpbGUnKSxcbiAgICAgIGgoJ2RpdicsIHtzdHlsZToge3dpZHRoOiBgJHttb2RlbC53aWR0aH1weGAsIHRyYW5zaXRpb246ICd3aWR0aCAwLjVzJ319LFxuICAgICAgICBbXG4gICAgICAgICAgQ29tcG9uZW50LnZpZXcoZm9yd2FyZFRvKGFjdGlvbiQsIEFjdGlvbi5Nb2RpZnkpLCBtb2RlbC5jb250ZW50cyksXG4gICAgICAgIF1cbiAgICAgICksXG4gICAgXSlcbiAgKTtcblxuICBjb25zdCBtb3VudCA9IG1vdW50ZXJGb3Ioe3ZpZXcsIHVwZGF0ZX0pO1xuICByZXR1cm4ge2luaXQsIHZpZXcsIHVwZGF0ZSwgQWN0aW9uLCBtb3VudH07XG59XG5cbmNvbnN0IGRlZmF1bHRSZXNpemVyID0gb2YocmF3KTtcbmV4cG9ydCBkZWZhdWx0IHtvZiwgLi4uZGVmYXVsdFJlc2l6ZXJ9OyIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnO1xuY29uc3QgZmx5ZCA9IHJlcXVpcmUoJ2ZseWQnKTtcbmNvbnN0IHNuYWJiZG9tID0gcmVxdWlyZSgnc25hYmJkb20nKTtcbmNvbnN0IHBhdGNoID0gc25hYmJkb20uaW5pdChbIC8vIEluaXQgcGF0Y2ggZnVuY3Rpb24gd2l0aCBjaG9zZW4gbW9kdWxlc1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2NsYXNzJykuZGVmYXVsdCwgLy8gbWFrZXMgaXQgZWFzeSB0byB0b2dnbGUgY2xhc3Nlc1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL3Byb3BzJykuZGVmYXVsdCwgLy8gZm9yIHNldHRpbmcgcHJvcGVydGllcyBvbiBET00gZWxlbWVudHNcbiAgcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9zdHlsZScpLmRlZmF1bHQsIC8vIGhhbmRsZXMgc3R5bGluZyBvbiBlbGVtZW50cyB3aXRoIHN1cHBvcnQgZm9yIGFuaW1hdGlvbnNcbiAgcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzJykuZGVmYXVsdCwgLy8gZm9yIHNldHRpbmcgYXR0cmlidXRlcyBvbiBET00gZWxlbWVudHNcbiAgcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9ldmVudGxpc3RlbmVycycpLmRlZmF1bHQsIC8vIGF0dGFjaGVzIGV2ZW50IGxpc3RlbmVyc1xuXSk7XG5jb25zdCBoID0gcmVxdWlyZSgnc25hYmJkb20vaCcpLmRlZmF1bHQ7IC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgdm5vZGVzXG5jb25zdCB0b1ZOb2RlID0gcmVxdWlyZSgnc25hYmJkb20vdG92bm9kZScpLmRlZmF1bHQ7XG5cbmNvbnN0IHFzID0gUi5pbnZva2VyKDEsICdxdWVyeVNlbGVjdG9yJyk7XG5jb25zdCBxc0FsbCA9IFIuaW52b2tlcigxLCAncXVlcnlTZWxlY3RvckFsbCcpO1xuXG5jb25zdCBsID0gUi5jdXJyeSgodGFnLCB4KSA9PiB7Y29uc29sZS5sb2codGFnLCB4KTsgcmV0dXJuIHh9KVxuXG5jb25zdCBvblJlYWR5ID0gKGNiKSA9PiB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCJcbiAgICAgICB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRlZFwiXG4gICAgICAgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XG4gICAgY2IuYmluZCh0aGlzKSgpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYi5iaW5kKHRoaXMpKTtcbiAgfVxufVxuXG5jb25zdCBtb3VudGVyRm9yID0gKENvbXBvbmVudCkgPT4ge1xuICBjb25zdCB7dmlldywgdXBkYXRlfSA9IENvbXBvbmVudDtcbiAgcmV0dXJuIChpbml0aWFsU3RhdGUsIGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFjdGlvbiQgPSBmbHlkLnN0cmVhbSgpO1xuICAgIGNvbnN0IG1vZGVsJCA9IGZseWQuc2NhbihSLmZsaXAodXBkYXRlKSwgaW5pdGlhbFN0YXRlLCBhY3Rpb24kKTtcbiAgICBjb25zdCB2bm9kZSQgPSBmbHlkLm1hcCh2aWV3KGFjdGlvbiQpLCBtb2RlbCQpO1xuICAgIGZseWQuc2NhbihwYXRjaCwgY29udGFpbmVyLCB2bm9kZSQpO1xuICB9XG59XG5cbmNvbnN0IG5vRlJQTW91bnRlckZvciA9IChDb21wb25lbnQpID0+IHtcbiAgY29uc3Qge3ZpZXcsIHVwZGF0ZX0gPSBDb21wb25lbnQ7XG4gIHJldHVybiAob2xkU3RhdGUsIG9sZFZub2RlKSA9PiB7XG4gICAgY29uc3QgbmV3Vm5vZGUgPSB2aWV3KChhY3Rpb24pID0+IHtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gdXBkYXRlKG9sZFN0YXRlLCBhY3Rpb24pO1xuICAgICAgcnVuKG5ld1N0YXRlLCBuZXdWbm9kZSk7XG4gICAgfSwgb2xkU3RhdGUpO1xuICAgIHBhdGNoKG9sZFZub2RlLCBuZXdWbm9kZSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgcGF0Y2gsIG9uUmVhZHksIG1vdW50ZXJGb3IsIHRvVk5vZGUsIGgsIGwsIHFzfTtcbmV4cG9ydCB7XG4gIHFzLFxuICBxc0FsbCxcbiAgb25SZWFkeSxcbiAgbW91bnRlckZvcixcbiAgdG9WTm9kZSxcbiAgcGF0Y2gsXG4gIGgsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuLi8uLi9zdGF0ZS5odG1sJztcbmltcG9ydCAnLi4vLi4vc3RhdGUuY3NzJztcblxuaW1wb3J0IHtvblJlYWR5LCB0b1ZOb2RlfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCByZXNpemVyIGZyb20gJy4uL2NvbXBvbmVudHMvcmVzaXplcic7XG5pbXBvcnQgIGNvbGxhcHNlciBmcm9tICcuLi9jb21wb25lbnRzL2NvbGxhcHNlcic7XG5cbm9uUmVhZHkoKCkgPT4ge1xuICBjb25zdCBjb2xsYXBzZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbGxhcHNlcicpO1xuICBjb2xsYXBzZXIubW91bnQoY29sbGFwc2VyLmluaXQoZmFsc2UsIHRvVk5vZGUoY29sbGFwc2VFbC5jaGlsZHJlblswXSkpLCBjb2xsYXBzZUVsKTtcblxuICBjb25zdCByZXNpemVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZXNpemVyJyk7XG4gIHJlc2l6ZXIubW91bnQocmVzaXplci5pbml0KDEzMDAsIHRvVk5vZGUocmVzaXplRWwuY2hpbGRyZW5bMF0pKSwgcmVzaXplRWwpO1xuXG4gIGNvbnN0IGNvbGxhcHNhYmxlUmVzaXplckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc2l6ZS1pbnNpZGUtY29sbGFwc2UnKTtcbiAgY29uc3QgY29sbGFwc2FibGVSZXNpemVyID0gY29sbGFwc2VyLm9mKHJlc2l6ZXIsIFsxMzAwLCB0b1ZOb2RlKGNvbGxhcHNhYmxlUmVzaXplckVsLmNoaWxkcmVuWzBdKV0pO1xuICBjb2xsYXBzYWJsZVJlc2l6ZXIubW91bnQoY29sbGFwc2FibGVSZXNpemVyLmluaXQoZmFsc2UpLCBjb2xsYXBzYWJsZVJlc2l6ZXJFbCk7XG5cbiAgY29uc3QgcmVzaXphYmxlQ29sbGFwc2VyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY29sbGFwc2UtaW5zaWRlLXJlc2l6ZScpO1xuICBjb25zdCByZXNpemFibGVDb2xsYXBzZXIgPSByZXNpemVyLm9mKGNvbGxhcHNlciwgW2ZhbHNlLCB0b1ZOb2RlKHJlc2l6YWJsZUNvbGxhcHNlckVsLmNoaWxkcmVuWzBdKV0pO1xuICByZXNpemFibGVDb2xsYXBzZXIubW91bnQocmVzaXphYmxlQ29sbGFwc2VyLmluaXQoMTMwMCksIHJlc2l6YWJsZUNvbGxhcHNlckVsKTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=