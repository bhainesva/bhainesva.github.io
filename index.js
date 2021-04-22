/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ./assets/dragon.jpg */ "./src/assets/dragon.jpg"));
// Module
exports.push([module.id, ".Interstitial\n{\n  display: flex;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding-top: 30px;\n\topacity: 1;\n\ttransition: all 2s;\n\ttransform: scale(1) rotate(0deg);\n\topacity: 1;\n  font-size: 50px;\n  font-family: \"Comic Sans MS\";\n  color: red;\n}\n\n.Interstitial--dragon\n{\n  background-image: url(" + ___CSS_LOADER_URL___0___ + ");\n}\n\n.Interstitial.is-dismissed\n{\n\ttransform: scale(0) rotate(720deg);\n\topacity: 0;\n}\n", ""]);


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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, needQuotes) {
  // eslint-disable-next-line no-underscore-dangle, no-param-reassign
  url = url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/assets/dragon.jpg":
/*!*******************************!*\
  !*** ./src/assets/dragon.jpg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0b4f2f3955cc36b0bdee3b1352e02393.jpg";

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "index.html";

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

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var content = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

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
  !*** ./src/js/pages/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../index.html */ "./src/index.html");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_2__);




(0,_util__WEBPACK_IMPORTED_MODULE_0__.onReady)(() => {
  const interstitial = document.querySelector('.js-interstitial');
  interstitial.addEventListener('click', () => {
    interstitial.innerText = 'slick';
    window.setTimeout(() => interstitial.classList.toggle('is-dismissed'), 300);
  });
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL2Fzc2V0cy9kcmFnb24uanBnIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbGliL2luZGV4LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2N1cnJ5Ti5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fYXJpdHkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5MS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9iaW5kLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvY3VycnkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9lcXVhbHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9mbGlwLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2FyaXR5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2FycmF5RnJvbUl0ZXJhdG9yLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2NvbXBsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY3VycnkxLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2N1cnJ5Mi5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2VxdWFscy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fZnVuY3Rpb25OYW1lLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2hhcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pbmNsdWRlc1dpdGguanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faW5kZXhPZi5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0FycmF5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNQbGFjZWhvbGRlci5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc1N0cmluZy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc1RyYW5zZm9ybWVyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX21hcC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19vYmplY3RJcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19xdW90ZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9JU09TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feGZCYXNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX3hmaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feHdyYXAuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnZva2VyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMva2V5cy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3JlamVjdC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvdHlwZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2guanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9odG1sZG9tYXBpLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9zbmFiYmRvbS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3RodW5rLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvdm5vZGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9oLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vaHRtbGRvbWFwaS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2lzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL3Byb3BzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9zdHlsZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL3Rvdm5vZGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS92bm9kZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL2luZGV4LmNzcz9kMTA1Iiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL3NyYy9qcy91dGlsLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvanMvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQTJCLG1CQUFPLENBQUMscUdBQWdEO0FBQ25GO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLDJHQUFtRDtBQUN4RSxzQ0FBc0MsbUJBQU8sQ0FBQyxvREFBcUI7QUFDbkU7QUFDQSwwQ0FBMEMsa0JBQWtCLDRCQUE0QixvQkFBb0IsV0FBVyxZQUFZLGFBQWEsY0FBYyxzQkFBc0IsZUFBZSx1QkFBdUIscUNBQXFDLGVBQWUsb0JBQW9CLG1DQUFtQyxlQUFlLEdBQUcsNEJBQTRCLDREQUE0RCxHQUFHLGlDQUFpQyx1Q0FBdUMsZUFBZSxHQUFHOzs7Ozs7Ozs7Ozs7QUNML2Y7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7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QWE7QUFDdEI7QUFDQTtBQUNBLDZCQUE2QiwwQ0FBTTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsYUFBYTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsQ0FBQywrQ0FBK0MsRUFBQzs7Ozs7OztVQ2pEaEU7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRCx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNma0M7QUFDUjtBQUNEOztBQUV6Qiw4Q0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBJbXBvcnRzXG52YXIgZ2V0VXJsID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fID0gZ2V0VXJsKHJlcXVpcmUoXCIuL2Fzc2V0cy9kcmFnb24uanBnXCIpKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkludGVyc3RpdGlhbFxcbntcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHBhZGRpbmctdG9wOiAzMHB4O1xcblxcdG9wYWNpdHk6IDE7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDJzO1xcblxcdHRyYW5zZm9ybTogc2NhbGUoMSkgcm90YXRlKDBkZWcpO1xcblxcdG9wYWNpdHk6IDE7XFxuICBmb250LXNpemU6IDUwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkNvbWljIFNhbnMgTVNcXFwiO1xcbiAgY29sb3I6IHJlZDtcXG59XFxuXFxuLkludGVyc3RpdGlhbC0tZHJhZ29uXFxue1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fICsgXCIpO1xcbn1cXG5cXG4uSW50ZXJzdGl0aWFsLmlzLWRpc21pc3NlZFxcbntcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKDApIHJvdGF0ZSg3MjBkZWcpO1xcblxcdG9wYWNpdHk6IDA7XFxufVxcblwiLCBcIlwiXSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIntcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tfaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiKFwiLmNvbmNhdChpdGVtWzJdLCBcIikgYW5kIChcIikuY29uY2F0KG1lZGlhUXVlcnksIFwiKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290KS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG5lZWRRdW90ZXMpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuICB1cmwgPSB1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsO1xuXG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSB8fCBuZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMGI0ZjJmMzk1NWNjMzZiMGJkZWUzYjEzNTJlMDIzOTMuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW5kZXguaHRtbFwiOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJ3JhbWRhL3NyYy9jdXJyeU4nKTtcblxuLy8gVXRpbGl0eVxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuICEhKG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNhbGwgJiYgb2JqLmFwcGx5KTtcbn1cbmZ1bmN0aW9uIHRydWVGbigpIHsgcmV0dXJuIHRydWU7IH1cblxuLy8gR2xvYmFsc1xudmFyIHRvVXBkYXRlID0gW107XG52YXIgaW5TdHJlYW07XG52YXIgb3JkZXIgPSBbXTtcbnZhciBvcmRlck5leHRJZHggPSAtMTtcbnZhciBmbHVzaGluZ1VwZGF0ZVF1ZXVlID0gZmFsc2U7XG52YXIgZmx1c2hpbmdTdHJlYW1WYWx1ZSA9IGZhbHNlO1xuXG5mdW5jdGlvbiBmbHVzaGluZygpIHtcbiAgcmV0dXJuIGZsdXNoaW5nVXBkYXRlUXVldWUgfHwgZmx1c2hpbmdTdHJlYW1WYWx1ZTtcbn1cblxuXG4vKiogQG5hbWVzcGFjZSAqL1xudmFyIGZseWQgPSB7fVxuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQVBJIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAvL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgc3RyZWFtXG4gKlxuICogX19TaWduYXR1cmVfXzogYGEgLT4gU3RyZWFtIGFgXG4gKlxuICogQG5hbWUgZmx5ZC5zdHJlYW1cbiAqIEBwYXJhbSB7Kn0gaW5pdGlhbFZhbHVlIC0gKE9wdGlvbmFsKSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgc3RyZWFtXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4gPSBmbHlkLnN0cmVhbSgxKTsgLy8gU3RyZWFtIHdpdGggaW5pdGlhbCB2YWx1ZSBgMWBcbiAqIHZhciBzID0gZmx5ZC5zdHJlYW0oKTsgLy8gU3RyZWFtIHdpdGggbm8gaW5pdGlhbCB2YWx1ZVxuICovXG5mbHlkLnN0cmVhbSA9IGZ1bmN0aW9uKGluaXRpYWxWYWx1ZSkge1xuICB2YXIgZW5kU3RyZWFtID0gY3JlYXRlRGVwZW5kZW50U3RyZWFtKFtdLCB0cnVlRm4pO1xuICB2YXIgcyA9IGNyZWF0ZVN0cmVhbSgpO1xuICBzLmVuZCA9IGVuZFN0cmVhbTtcbiAgcy5mbkFyZ3MgPSBbXTtcbiAgZW5kU3RyZWFtLmxpc3RlbmVycy5wdXNoKHMpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHMoaW5pdGlhbFZhbHVlKTtcbiAgcmV0dXJuIHM7XG59XG4vLyBmYW50YXN5LWxhbmQgQXBwbGljYXRpdmVcbmZseWQuc3RyZWFtWydmYW50YXN5LWxhbmQvb2YnXSA9IGZseWQuc3RyZWFtLm9mID0gZmx5ZC5zdHJlYW07XG5cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgZGVwZW5kZW50IHN0cmVhbVxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAoLi4uU3RyZWFtICogLT4gU3RyZWFtIGIgLT4gYikgLT4gW1N0cmVhbSAqXSAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBmbHlkLmNvbWJpbmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHVzZWQgdG8gY29tYmluZSB0aGUgc3RyZWFtc1xuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXMgLSB0aGUgc3RyZWFtcyB0aGF0IHRoaXMgb25lIGRlcGVuZHMgb25cbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIGRlcGVuZGVudCBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4xID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgbjIgPSBmbHlkLnN0cmVhbSgwKTtcbiAqIHZhciBtYXggPSBmbHlkLmNvbWJpbmUoZnVuY3Rpb24objEsIG4yLCBzZWxmLCBjaGFuZ2VkKSB7XG4gKiAgIHJldHVybiBuMSgpID4gbjIoKSA/IG4xKCkgOiBuMigpO1xuICogfSwgW24xLCBuMl0pO1xuICovXG5mbHlkLmNvbWJpbmUgPSBjdXJyeU4oMiwgY29tYmluZSk7XG5mdW5jdGlvbiBjb21iaW5lKGZuLCBzdHJlYW1zKSB7XG4gIHZhciBpLCBzLCBkZXBzLCBkZXBFbmRTdHJlYW1zO1xuICB2YXIgZW5kU3RyZWFtID0gY3JlYXRlRGVwZW5kZW50U3RyZWFtKFtdLCB0cnVlRm4pO1xuICBkZXBzID0gW107IGRlcEVuZFN0cmVhbXMgPSBbXTtcbiAgZm9yIChpID0gMDsgaSA8IHN0cmVhbXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoc3RyZWFtc1tpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZXBzLnB1c2goc3RyZWFtc1tpXSk7XG4gICAgICBpZiAoc3RyZWFtc1tpXS5lbmQgIT09IHVuZGVmaW5lZCkgZGVwRW5kU3RyZWFtcy5wdXNoKHN0cmVhbXNbaV0uZW5kKTtcbiAgICB9XG4gIH1cbiAgcyA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShkZXBzLCBmbik7XG4gIHMuZGVwc0NoYW5nZWQgPSBbXTtcbiAgcy5mbkFyZ3MgPSBzLmRlcHMuY29uY2F0KFtzLCBzLmRlcHNDaGFuZ2VkXSk7XG4gIHMuZW5kID0gZW5kU3RyZWFtO1xuICBlbmRTdHJlYW0ubGlzdGVuZXJzLnB1c2gocyk7XG4gIGFkZExpc3RlbmVycyhkZXBFbmRTdHJlYW1zLCBlbmRTdHJlYW0pO1xuICBlbmRTdHJlYW0uZGVwcyA9IGRlcEVuZFN0cmVhbXM7XG4gIHVwZGF0ZVN0cmVhbShzKTtcbiAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHN1cHBsaWVkIGFyZ3VtZW50IGlzIGEgRmx5ZCBzdHJlYW0gYW5kIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAqIC0+IEJvb2xlYW5gXG4gKlxuICogQG5hbWUgZmx5ZC5pc1N0cmVhbVxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgaXMgYSBGbHlkIHN0cmVhbW4sIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzID0gZmx5ZC5zdHJlYW0oMSk7XG4gKiB2YXIgbiA9IDE7XG4gKiBmbHlkLmlzU3RyZWFtKHMpOyAvLz0+IHRydWVcbiAqIGZseWQuaXNTdHJlYW0obik7IC8vPT4gZmFsc2VcbiAqL1xuZmx5ZC5pc1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICByZXR1cm4gaXNGdW5jdGlvbihzdHJlYW0pICYmICdoYXNWYWwnIGluIHN0cmVhbTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIHRoZSBib2R5ICh0aGUgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSB2YWx1ZSkgb2YgYSBkZXBlbmRlbnQgc3RyZWFtXG4gKlxuICogQnkgZGVmYXVsdCB0aGUgYm9keSBvZiBhIGRlcGVuZGVudCBzdHJlYW0gaXMgb25seSBjYWxsZWQgd2hlbiBhbGwgdGhlIHN0cmVhbXNcbiAqIHVwb24gd2hpY2ggaXQgZGVwZW5kcyBoYXMgYSB2YWx1ZS4gYGltbWVkaWF0ZWAgY2FuIGNpcmN1bXZlbnQgdGhpcyBiZWhhdmlvdXIuXG4gKiBJdCBpbW1lZGlhdGVseSBpbnZva2VzIHRoZSBib2R5IG9mIGEgZGVwZW5kZW50IHN0cmVhbS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgU3RyZWFtIGEgLT4gU3RyZWFtIGFgXG4gKlxuICogQG5hbWUgZmx5ZC5pbW1lZGlhdGVcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgZGVwZW5kZW50IHN0cmVhbVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgc2FtZSBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHMgPSBmbHlkLnN0cmVhbSgpO1xuICogdmFyIGhhc0l0ZW1zID0gZmx5ZC5pbW1lZGlhdGUoZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKHMpIHtcbiAqICAgcmV0dXJuIHMoKSAhPT0gdW5kZWZpbmVkICYmIHMoKS5sZW5ndGggPiAwO1xuICogfSwgW3NdKTtcbiAqIGNvbnNvbGUubG9nKGhhc0l0ZW1zKCkpOyAvLyBsb2dzIGBmYWxzZWAuIEhhZCBgaW1tZWRpYXRlYCBub3QgYmVlblxuICogICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZWQgYGhhc0l0ZW1zKClgIHdvdWxkJ3ZlIHJldHVybmVkIGB1bmRlZmluZWRgXG4gKiBzKFsxXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgdHJ1ZWAuXG4gKiBzKFtdKTtcbiAqIGNvbnNvbGUubG9nKGhhc0l0ZW1zKCkpOyAvLyBsb2dzIGBmYWxzZWAuXG4gKi9cbmZseWQuaW1tZWRpYXRlID0gZnVuY3Rpb24ocykge1xuICBpZiAocy5kZXBzTWV0ID09PSBmYWxzZSkge1xuICAgIHMuZGVwc01ldCA9IHRydWU7XG4gICAgdXBkYXRlU3RyZWFtKHMpO1xuICB9XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIENoYW5nZXMgd2hpY2ggYGVuZHNTdHJlYW1gIHNob3VsZCB0cmlnZ2VyIHRoZSBlbmRpbmcgb2YgYHNgLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBTdHJlYW0gYSAtPiBTdHJlYW0gYiAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBmbHlkLmVuZHNPblxuICogQHBhcmFtIHtzdHJlYW19IGVuZFN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gdHJpZ2dlciB0aGUgZW5kaW5nXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIHN0cmVhbSB0byBiZSBlbmRlZCBieSB0aGUgZW5kU3RyZWFtXG4gKiBAcGFyYW0ge3N0cmVhbX0gdGhlIHN0cmVhbSBtb2RpZmllZCB0byBiZSBlbmRlZCBieSBlbmRTdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4gPSBmbHlkLnN0cmVhbSgxKTtcbiAqIHZhciBraWxsZXIgPSBmbHlkLnN0cmVhbSgpO1xuICogLy8gYGRvdWJsZWAgZW5kcyB3aGVuIGBuYCBlbmRzIG9yIHdoZW4gYGtpbGxlcmAgZW1pdHMgYW55IHZhbHVlXG4gKiB2YXIgZG91YmxlID0gZmx5ZC5lbmRzT24oZmx5ZC5tZXJnZShuLmVuZCwga2lsbGVyKSwgZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKG4pIHtcbiAqICAgcmV0dXJuIDIgKiBuKCk7XG4gKiB9LCBbbl0pO1xuKi9cbmZseWQuZW5kc09uID0gZnVuY3Rpb24oZW5kUywgcykge1xuICBkZXRhY2hEZXBzKHMuZW5kKTtcbiAgZW5kUy5saXN0ZW5lcnMucHVzaChzLmVuZCk7XG4gIHMuZW5kLmRlcHMucHVzaChlbmRTKTtcbiAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogTWFwIGEgc3RyZWFtXG4gKlxuICogUmV0dXJucyBhIG5ldyBzdHJlYW0gY29uc2lzdGluZyBvZiBldmVyeSB2YWx1ZSBmcm9tIGBzYCBwYXNzZWQgdGhyb3VnaFxuICogYGZuYC4gSS5lLiBgbWFwYCBjcmVhdGVzIGEgbmV3IHN0cmVhbSB0aGF0IGxpc3RlbnMgdG8gYHNgIGFuZFxuICogYXBwbGllcyBgZm5gIHRvIGV2ZXJ5IG5ldyB2YWx1ZS5cbiAqIF9fU2lnbmF0dXJlX186IGAoYSAtPiByZXN1bHQpIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSByZXN1bHRgXG4gKlxuICogQG5hbWUgZmx5ZC5tYXBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgdGhlIGVsZW1lbnRzIG9mIHRoZSBuZXcgc3RyZWFtXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIHN0cmVhbSB0byBtYXBcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggdGhlIG1hcHBlZCB2YWx1ZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG51bWJlcnMgPSBmbHlkLnN0cmVhbSgwKTtcbiAqIHZhciBzcXVhcmVkTnVtYmVycyA9IGZseWQubWFwKGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4qbjsgfSwgbnVtYmVycyk7XG4gKi9cbi8vIExpYnJhcnkgZnVuY3Rpb25zIHVzZSBzZWxmIGNhbGxiYWNrIHRvIGFjY2VwdCAobnVsbCwgdW5kZWZpbmVkKSB1cGRhdGUgdHJpZ2dlcnMuXG5mdW5jdGlvbiBtYXAoZiwgcykge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzLCBzZWxmKSB7IHNlbGYoZihzLnZhbCkpOyB9LCBbc10pO1xufVxuZmx5ZC5tYXAgPSBjdXJyeU4oMiwgbWFwKVxuXG4vKipcbiAqIENoYWluIGEgc3RyZWFtXG4gKlxuICogYWxzbyBrbm93biBhcyBmbGF0TWFwXG4gKlxuICogV2hlcmUgYGZuYCByZXR1cm5zIGEgc3RyZWFtIHRoaXMgZnVuY3Rpb24gd2lsbCBmbGF0dGVuIHRoZSByZXN1bHRpbmcgc3RyZWFtcy5cbiAqIEV2ZXJ5IHRpbWUgYGZuYCBpcyBjYWxsZWQgdGhlIGNvbnRleHQgb2YgdGhlIHJldHVybmVkIHN0cmVhbSB3aWxsIFwic3dpdGNoXCIgdG8gdGhhdCBzdHJlYW0uXG4gKlxuICogX19TaWduYXR1cmVfXzogYChhIC0+IFN0cmVhbSBiKSAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBmbHlkLmNoYWluXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIHRoZSBzdHJlYW1zIHRvIGJlIGZsYXR0ZW5lZFxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gbWFwXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBtYXBwZWQgdmFsdWVzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBmaWx0ZXIgPSBmbHlkLnN0cmVhbSgnd2hvJyk7XG4gKiB2YXIgaXRlbXMgPSBmbHlkLmNoYWluKGZ1bmN0aW9uKGZpbHRlcil7XG4gKiAgIHJldHVybiBmbHlkLnN0cmVhbShmaW5kVXNlcnMoZmlsdGVyKSk7XG4gKiB9LCBmaWx0ZXIpO1xuICovXG5mbHlkLmNoYWluID0gY3VycnlOKDIsIGNoYWluKTtcblxuLyoqXG4gKiBBcHBseSBhIHN0cmVhbVxuICpcbiAqIEFwcGxpZXMgdGhlIHZhbHVlIGluIGBzMmAgdG8gdGhlIGZ1bmN0aW9uIGluIGBzMWAuXG4gKlxuICogX19TaWduYXR1cmVfXzogYFN0cmVhbSAoYSAtPiBiKSAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBmbHlkLmFwXG4gKiBAcGFyYW0ge3N0cmVhbX0gczEgLSBUaGUgdmFsdWUgdG8gYmUgYXBwbGllZFxuICogQHBhcmFtIHtzdHJlYW19IHMyIC0gVGhlIGZ1bmN0aW9uIGV4cGVjdGluZyB0aGUgdmFsdWVcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggdGhlIG1hcHBlZCB2YWx1ZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGFkZCA9IHN0cmVhbShhID0+IGIgPT4gYSArIGIpXG4gKiB2YXIgbjEgPSBzdHJlYW0oMSlcbiAqIHZhciBuMiA9IHN0cmVhbSgyKVxuICpcbiAqIHZhciBhZGRlZCA9IGZseWQuYXAobjIsIGZseWQuYXAobjEsIGFkZCkpIC8vIHN0cmVhbSgzKVxuICogLy8gY2FuIGFsc28gYmUgd3JpdHRlbiB1c2luZyBwaXBlXG4gKiB2YXIgYWRkZWRfcGlwZSA9IGFkZFxuICogICAucGlwZShhcChuMSkpXG4gKiAgIC5waXBlKGFwKG4yKSk7XG4gKiBhZGRlZF9waXBlKCkgLy8gM1xuICovXG5mbHlkLmFwID0gY3VycnlOKDIsIGFwKTtcblxuLyoqXG4gKiBMaXN0ZW4gdG8gc3RyZWFtIGV2ZW50c1xuICpcbiAqIFNpbWlsYXIgdG8gYG1hcGAgZXhjZXB0IHRoYXQgdGhlIHJldHVybmVkIHN0cmVhbSBpcyBlbXB0eS4gVXNlIGBvbmAgZm9yIGRvaW5nXG4gKiBzaWRlIGVmZmVjdHMgaW4gcmVhY3Rpb24gdG8gc3RyZWFtIGNoYW5nZXMuIFVzZSB0aGUgcmV0dXJuZWQgc3RyZWFtIG9ubHkgaWYgeW91XG4gKiBuZWVkIHRvIG1hbnVhbGx5IGVuZCBpdC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKGEgLT4gcmVzdWx0KSAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gdW5kZWZpbmVkYFxuICpcbiAqIEBuYW1lIGZseWQub25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gdGhlIGNhbGxiYWNrXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIHN0cmVhbVxuICogQHJldHVybiB7c3RyZWFtfSBhbiBlbXB0eSBzdHJlYW0gKGNhbiBiZSBlbmRlZClcbiAqL1xuZmx5ZC5vbiA9IGN1cnJ5TigyLCBmdW5jdGlvbihmLCBzKSB7XG4gIHJldHVybiBjb21iaW5lKGZ1bmN0aW9uKHMpIHsgZihzLnZhbCk7IH0sIFtzXSk7XG59KVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgc3RyZWFtIHdpdGggdGhlIHJlc3VsdHMgb2YgY2FsbGluZyB0aGUgZnVuY3Rpb24gb24gZXZlcnkgaW5jb21pbmdcbiAqIHN0cmVhbSB3aXRoIGFuZCBhY2N1bXVsYXRvciBhbmQgdGhlIGluY29taW5nIHZhbHVlLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAoYSAtPiBiIC0+IGEpIC0+IGEgLT4gU3RyZWFtIGIgLT4gU3RyZWFtIGFgXG4gKlxuICogQG5hbWUgZmx5ZC5zY2FuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0geyp9IHZhbCAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBhY2N1bXVsYXRvclxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gc291cmNlXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBuZXcgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBudW1iZXJzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIHZhciBzdW0gPSBmbHlkLnNjYW4oZnVuY3Rpb24oc3VtLCBuKSB7IHJldHVybiBzdW0rbjsgfSwgMCwgbnVtYmVycyk7XG4gKiBudW1iZXJzKDIpKDMpKDUpO1xuICogc3VtKCk7IC8vIDEwXG4gKi9cbmZseWQuc2NhbiA9IGN1cnJ5TigzLCBmdW5jdGlvbihmLCBhY2MsIHMpIHtcbiAgdmFyIG5zID0gY29tYmluZShmdW5jdGlvbihzLCBzZWxmKSB7XG4gICAgc2VsZihhY2MgPSBmKGFjYywgcy52YWwpKTtcbiAgfSwgW3NdKTtcbiAgaWYgKCFucy5oYXNWYWwpIG5zKGFjYyk7XG4gIHJldHVybiBucztcbn0pO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgc3RyZWFtIGRvd24gd2hpY2ggYWxsIHZhbHVlcyBmcm9tIGJvdGggYHN0cmVhbTFgIGFuZCBgc3RyZWFtMmBcbiAqIHdpbGwgYmUgc2VudC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgU3RyZWFtIGEgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGFgXG4gKlxuICogQG5hbWUgZmx5ZC5tZXJnZVxuICogQHBhcmFtIHtzdHJlYW19IHNvdXJjZTEgLSBvbmUgc3RyZWFtIHRvIGJlIG1lcmdlZFxuICogQHBhcmFtIHtzdHJlYW19IHNvdXJjZTIgLSB0aGUgb3RoZXIgc3RyZWFtIHRvIGJlIG1lcmdlZFxuICogQHJldHVybiB7c3RyZWFtfSBhIHN0cmVhbSB3aXRoIHRoZSB2YWx1ZXMgZnJvbSBib3RoIHNvdXJjZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGJ0bjFDbGlja3MgPSBmbHlkLnN0cmVhbSgpO1xuICogYnV0dG9uMUVsbS5hZGRFdmVudExpc3RlbmVyKGJ0bjFDbGlja3MpO1xuICogdmFyIGJ0bjJDbGlja3MgPSBmbHlkLnN0cmVhbSgpO1xuICogYnV0dG9uMkVsbS5hZGRFdmVudExpc3RlbmVyKGJ0bjJDbGlja3MpO1xuICogdmFyIGFsbENsaWNrcyA9IGZseWQubWVyZ2UoYnRuMUNsaWNrcywgYnRuMkNsaWNrcyk7XG4gKi9cbmZseWQubWVyZ2UgPSBjdXJyeU4oMiwgZnVuY3Rpb24oczEsIHMyKSB7XG4gIHZhciBzID0gZmx5ZC5pbW1lZGlhdGUoY29tYmluZShmdW5jdGlvbihzMSwgczIsIHNlbGYsIGNoYW5nZWQpIHtcbiAgICBpZiAoY2hhbmdlZFswXSkge1xuICAgICAgc2VsZihjaGFuZ2VkWzBdKCkpO1xuICAgIH0gZWxzZSBpZiAoczEuaGFzVmFsKSB7XG4gICAgICBzZWxmKHMxLnZhbCk7XG4gICAgfSBlbHNlIGlmIChzMi5oYXNWYWwpIHtcbiAgICAgIHNlbGYoczIudmFsKTtcbiAgICB9XG4gIH0sIFtzMSwgczJdKSk7XG4gIGZseWQuZW5kc09uKGNvbWJpbmUoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFtzMS5lbmQsIHMyLmVuZF0pLCBzKTtcbiAgcmV0dXJuIHM7XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbSByZXN1bHRpbmcgZnJvbSBhcHBseWluZyBgdHJhbnNkdWNlcmAgdG8gYHN0cmVhbWAuXG4gKlxuICogX19TaWduYXR1cmVfXzogYFRyYW5zZHVjZXIgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC50cmFuc2R1Y2VcbiAqIEBwYXJhbSB7VHJhbnNkdWNlcn0geGZvcm0gLSB0aGUgdHJhbnNkdWNlciB0cmFuc2Zvcm1hdGlvblxuICogQHBhcmFtIHtzdHJlYW19IHNvdXJjZSAtIHRoZSBzdHJlYW0gc291cmNlXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBuZXcgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciB0ID0gcmVxdWlyZSgndHJhbnNkdWNlcnMuanMnKTtcbiAqXG4gKiB2YXIgcmVzdWx0cyA9IFtdO1xuICogdmFyIHMxID0gZmx5ZC5zdHJlYW0oKTtcbiAqIHZhciB0eCA9IHQuY29tcG9zZSh0Lm1hcChmdW5jdGlvbih4KSB7IHJldHVybiB4ICogMjsgfSksIHQuZGVkdXBlKCkpO1xuICogdmFyIHMyID0gZmx5ZC50cmFuc2R1Y2UodHgsIHMxKTtcbiAqIGZseWQuY29tYmluZShmdW5jdGlvbihzMikgeyByZXN1bHRzLnB1c2goczIoKSk7IH0sIFtzMl0pO1xuICogczEoMSkoMSkoMikoMykoMykoMykoNCk7XG4gKiByZXN1bHRzOyAvLyA9PiBbMiwgNCwgNiwgOF1cbiAqL1xuZmx5ZC50cmFuc2R1Y2UgPSBjdXJyeU4oMiwgZnVuY3Rpb24oeGZvcm0sIHNvdXJjZSkge1xuICB4Zm9ybSA9IHhmb3JtKG5ldyBTdHJlYW1UcmFuc2Zvcm1lcigpKTtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24oc291cmNlLCBzZWxmKSB7XG4gICAgdmFyIHJlcyA9IHhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKHVuZGVmaW5lZCwgc291cmNlLnZhbCk7XG4gICAgaWYgKHJlcyAmJiByZXNbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10gPT09IHRydWUpIHtcbiAgICAgIHNlbGYuZW5kKHRydWUpO1xuICAgICAgcmV0dXJuIHJlc1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9LCBbc291cmNlXSk7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGBmbmAgY3VycmllZCB0byBgbmAuIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIGN1cnJ5IGZ1bmN0aW9ucyBleHBvc2VkIGJ5XG4gKiBtb2R1bGVzIGZvciBGbHlkLlxuICpcbiAqIEBuYW1lIGZseWQuY3VycnlOXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7SW50ZWdlcn0gYXJpdHkgLSB0aGUgZnVuY3Rpb24gYXJpdHlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRvIGN1cnJ5XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gdGhlIGN1cnJpZWQgZnVuY3Rpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gYWRkKHgsIHkpIHsgcmV0dXJuIHggKyB5OyB9O1xuICogdmFyIGEgPSBmbHlkLmN1cnJ5TigyLCBhZGQpO1xuICogYSgyKSg0KSAvLyA9PiA2XG4gKi9cbmZseWQuY3VycnlOID0gY3VycnlOXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBzdHJlYW0gaWRlbnRpY2FsIHRvIHRoZSBvcmlnaW5hbCBleGNlcHQgZXZlcnlcbiAqIHZhbHVlIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggYGZgLlxuICpcbiAqIF9Ob3RlOl8gVGhpcyBmdW5jdGlvbiBpcyBpbmNsdWRlZCBpbiBvcmRlciB0byBzdXBwb3J0IHRoZSBmYW50YXN5IGxhbmRcbiAqIHNwZWNpZmljYXRpb24uXG4gKlxuICogX19TaWduYXR1cmVfXzogQ2FsbGVkIGJvdW5kIHRvIGBTdHJlYW0gYWA6IGAoYSAtPiBiKSAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBzdHJlYW0ubWFwXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbiAtIHRoZSBmdW5jdGlvbiB0byBhcHBseVxuICogQHJldHVybiB7c3RyZWFtfSBhIG5ldyBzdHJlYW0gd2l0aCB0aGUgdmFsdWVzIG1hcHBlZFxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbnVtYmVycyA9IGZseWQuc3RyZWFtKDApO1xuICogdmFyIHNxdWFyZWROdW1iZXJzID0gbnVtYmVycy5tYXAoZnVuY3Rpb24obikgeyByZXR1cm4gbipuOyB9KTtcbiAqL1xuZnVuY3Rpb24gYm91bmRNYXAoZikgeyByZXR1cm4gbWFwKGYsIHRoaXMpOyB9XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGZ1bmN0aW9uIGBmbmAgdG8gdGhpcyBzdHJlYW1cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSBhYDogYChhIC0+IFN0cmVhbSBiKSAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAbmFtZSBzdHJlYW0ucGlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gYXBwbHlcbiAqIEByZXR1cm4ge3N0cmVhbX0gQSBuZXcgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBudW1iZXJzID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgc3F1YXJlZE51bWJlcnMgPSBudW1iZXJzLnBpcGUoZmx5ZC5tYXAoZnVuY3Rpb24obil7IHJldHVybiBuKm47IH0pKTtcbiAqL1xuZnVuY3Rpb24gb3BlcmF0b3JfcGlwZShmKSB7IHJldHVybiBmKHRoaXMpIH1cblxuZnVuY3Rpb24gYm91bmRDaGFpbihmKSB7XG4gIHJldHVybiBjaGFpbihmLCB0aGlzKTtcbn1cblxuZnVuY3Rpb24gY2hhaW4oZiwgcykge1xuICAvLyBJbnRlcm5hbCBzdGF0ZSB0byBlbmQgZmxhdCBtYXAgc3RyZWFtXG4gIHZhciBmbGF0RW5kID0gZmx5ZC5zdHJlYW0oMSk7XG4gIHZhciBpbnRlcm5hbEVuZGVkID0gZmx5ZC5vbihmdW5jdGlvbigpIHtcbiAgICB2YXIgYWxpdmUgPSBmbGF0RW5kKCkgLSAxO1xuICAgIGZsYXRFbmQoYWxpdmUpO1xuICAgIGlmIChhbGl2ZSA8PSAwKSB7XG4gICAgICBmbGF0RW5kLmVuZCh0cnVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGludGVybmFsRW5kZWQocy5lbmQpO1xuICB2YXIgbGFzdCA9IGZseWQuc3RyZWFtKCk7XG4gIHZhciBmbGF0U3RyZWFtID0gZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKHMsIG93bikge1xuICAgIGxhc3QuZW5kKHRydWUpXG4gICAgLy8gT3VyIGZuIHN0cmVhbSBtYWtlcyBzdHJlYW1zXG4gICAgdmFyIG5ld1MgPSBmKHMoKSk7XG4gICAgZmxhdEVuZChmbGF0RW5kKCkgKyAxKTtcbiAgICBpbnRlcm5hbEVuZGVkKG5ld1MuZW5kKTtcblxuICAgIC8vIFVwZGF0ZSBzZWxmIG9uIGNhbGwgLS0gbmV3UyBpcyBuZXZlciBoYW5kZWQgb3V0IHNvIGRlcHMgZG9uJ3QgbWF0dGVyXG4gICAgbGFzdCA9IG1hcChvd24sIG5ld1MpO1xuICB9LCBbc10pO1xuXG4gIGZseWQuZW5kc09uKGZsYXRFbmQuZW5kLCBmbGF0U3RyZWFtKTtcblxuICByZXR1cm4gZmxhdFN0cmVhbTtcbn1cblxuZmx5ZC5mcm9tUHJvbWlzZSA9IGZ1bmN0aW9uIGZyb21Qcm9taXNlKHApIHtcbiAgdmFyIHMgPSBmbHlkLnN0cmVhbSgpO1xuICBwLnRoZW4oZnVuY3Rpb24odmFsKSB7XG4gICAgcyh2YWwpO1xuICAgIHMuZW5kKHRydWUpO1xuICB9KTtcbiAgcmV0dXJuIHM7XG59XG5cbmZseWQuZmxhdHRlblByb21pc2UgPSBmdW5jdGlvbiBmbGF0dGVuUHJvbWlzZShzKSB7XG4gIHJldHVybiBjb21iaW5lKGZ1bmN0aW9uKHMsIHNlbGYpIHtcbiAgICBzKCkudGhlbihzZWxmKTtcbiAgfSwgW3NdKVxufVxuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBzdHJlYW0gd2hpY2ggaXMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGVcbiAqIGZ1bmN0aW9ucyBmcm9tIGB0aGlzYCBzdHJlYW0gdG8gdGhlIHZhbHVlcyBpbiBgc3RyZWFtYCBwYXJhbWV0ZXIuXG4gKlxuICogYHRoaXNgIHN0cmVhbSBtdXN0IGJlIGEgc3RyZWFtIG9mIGZ1bmN0aW9ucy5cbiAqXG4gKiBfTm90ZTpfIFRoaXMgZnVuY3Rpb24gaXMgaW5jbHVkZWQgaW4gb3JkZXIgdG8gc3VwcG9ydCB0aGUgZmFudGFzeSBsYW5kXG4gKiBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IENhbGxlZCBib3VuZCB0byBgU3RyZWFtIChhIC0+IGIpYDogYGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgc3RyZWFtLmFwXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIHZhbHVlcyBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggdGhlIGZ1bmN0aW9ucyBhcHBsaWVkIHRvIHZhbHVlc1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWRkID0gZmx5ZC5jdXJyeU4oMiwgZnVuY3Rpb24oeCwgeSkgeyByZXR1cm4geCArIHk7IH0pO1xuICogdmFyIG51bWJlcnMxID0gZmx5ZC5zdHJlYW0oKTtcbiAqIHZhciBudW1iZXJzMiA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgYWRkVG9OdW1iZXJzMSA9IGZseWQubWFwKGFkZCwgbnVtYmVyczEpO1xuICogdmFyIGFkZGVkID0gYWRkVG9OdW1iZXJzMS5hcChudW1iZXJzMik7XG4gKi9cbmZ1bmN0aW9uIGFwKHMyLCBzMSkge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzMSwgczIsIHNlbGYpIHsgc2VsZihzMS52YWwoczIudmFsKSk7IH0sIFtzMSwgczJdKTtcbn1cblxuZnVuY3Rpb24gYm91bmRBcChzMikge1xuICByZXR1cm4gYXAoczIsIHRoaXMpO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGZhbnRhc3lfbGFuZF9hcChzMSkge1xuICByZXR1cm4gYXAodGhpcywgczEpO1xufVxuXG4vKipcbiAqIEdldCBhIGh1bWFuIHJlYWRhYmxlIHZpZXcgb2YgYSBzdHJlYW1cbiAqIEBuYW1lIHN0cmVhbS50b1N0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSB0aGUgc3RyZWFtIHN0cmluZyByZXByZXNlbnRhdGlvblxuICovXG5mdW5jdGlvbiBzdHJlYW1Ub1N0cmluZygpIHtcbiAgcmV0dXJuICdzdHJlYW0oJyArIHRoaXMudmFsICsgJyknO1xufVxuXG4vKipcbiAqIEBuYW1lIHN0cmVhbS5lbmRcbiAqIEBtZW1iZXJvZiBzdHJlYW1cbiAqIEEgc3RyZWFtIHRoYXQgZW1pdHMgYHRydWVgIHdoZW4gdGhlIHN0cmVhbSBlbmRzLiBJZiBgdHJ1ZWAgaXMgcHVzaGVkIGRvd24gdGhlXG4gKiBzdHJlYW0gdGhlIHBhcmVudCBzdHJlYW0gZW5kcy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0cmVhbS5vZlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2Ygc3RyZWFtXG4gKiBSZXR1cm5zIGEgbmV3IHN0cmVhbSB3aXRoIGB2YWx1ZWAgYXMgaXRzIGluaXRpYWwgdmFsdWUuIEl0IGlzIGlkZW50aWNhbCB0b1xuICogY2FsbGluZyBgZmx5ZC5zdHJlYW1gIHdpdGggb25lIGFyZ3VtZW50LlxuICpcbiAqIF9fU2lnbmF0dXJlX186IENhbGxlZCBib3VuZCB0byBgU3RyZWFtIChhKWA6IGBiIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbiA9IGZseWQuc3RyZWFtKDEpO1xuICogdmFyIG0gPSBuLm9mKDEpO1xuICovXG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBQUklWQVRFIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAvL1xuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ3JlYXRlIGEgc3RyZWFtIHdpdGggbm8gZGVwZW5kZW5jaWVzIGFuZCBubyB2YWx1ZVxuICogQHJldHVybiB7RnVuY3Rpb259IGEgZmx5ZCBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3RyZWFtKCkge1xuICBmdW5jdGlvbiBzKG4pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHMudmFsXG4gICAgdXBkYXRlU3RyZWFtVmFsdWUobiwgcylcbiAgICByZXR1cm4gc1xuICB9XG4gIHMuaGFzVmFsID0gZmFsc2U7XG4gIHMudmFsID0gdW5kZWZpbmVkO1xuICBzLnVwZGF0ZXJzID0gW107XG4gIHMubGlzdGVuZXJzID0gW107XG4gIHMucXVldWVkID0gZmFsc2U7XG4gIHMuZW5kID0gdW5kZWZpbmVkO1xuXG4gIC8vIGZhbnRhc3ktbGFuZCBjb21wYXRpYmlsaXR5XG4gIHMuYXAgPSBib3VuZEFwO1xuICBzWydmYW50YXN5LWxhbmQvbWFwJ10gPSBzLm1hcCA9IGJvdW5kTWFwO1xuICBzWydmYW50YXN5LWxhbmQvYXAnXSA9IGZhbnRhc3lfbGFuZF9hcDtcbiAgc1snZmFudGFzeS1sYW5kL29mJ10gPSBzLm9mID0gZmx5ZC5zdHJlYW07XG4gIHNbJ2ZhbnRhc3ktbGFuZC9jaGFpbiddID0gcy5jaGFpbiA9IGJvdW5kQ2hhaW47XG5cbiAgcy5waXBlID0gb3BlcmF0b3JfcGlwZTtcblxuICAvLyBBY2NvcmRpbmcgdG8gdGhlIGZhbnRhc3ktbGFuZCBBcHBsaWNhdGl2ZSBzcGVjaWZpY2F0aW9uXG4gIC8vIEdpdmVuIGEgdmFsdWUgZiwgb25lIGNhbiBhY2Nlc3MgaXRzIHR5cGUgcmVwcmVzZW50YXRpdmUgdmlhIHRoZSBjb25zdHJ1Y3RvciBwcm9wZXJ0eTpcbiAgLy8gYGYuY29uc3RydWN0b3Iub2ZgXG4gIHMuY29uc3RydWN0b3IgPSBmbHlkLnN0cmVhbTtcblxuICBzLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzLnZhbDtcbiAgfVxuICBzLnRvU3RyaW5nID0gc3RyZWFtVG9TdHJpbmc7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBDcmVhdGUgYSBkZXBlbmRlbnQgc3RyZWFtXG4gKiBAcGFyYW0ge0FycmF5PHN0cmVhbT59IGRlcGVuZGVuY2llcyAtIGFuIGFycmF5IG9mIHRoZSBzdHJlYW1zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3IHN0cmVhbSB2YWx1ZVxuICogZnJvbSB0aGUgZGVwZW5kZW5jaWVzXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBjcmVhdGVkIHN0cmVhbVxuICovXG5mdW5jdGlvbiBjcmVhdGVEZXBlbmRlbnRTdHJlYW0oZGVwcywgZm4pIHtcbiAgdmFyIHMgPSBjcmVhdGVTdHJlYW0oKTtcbiAgcy5mbiA9IGZuO1xuICBzLmRlcHMgPSBkZXBzO1xuICBzLmRlcHNNZXQgPSBmYWxzZTtcbiAgcy5kZXBzQ2hhbmdlZCA9IGRlcHMubGVuZ3RoID4gMCA/IFtdIDogdW5kZWZpbmVkO1xuICBzLnNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICBhZGRMaXN0ZW5lcnMoZGVwcywgcyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBDaGVjayBpZiBhbGwgdGhlIGRlcGVuZGVuY2llcyBoYXZlIHZhbHVlc1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gY2hlY2sgZGVwZW5jZW5jaWVzIGZyb21cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBhbGwgZGVwZW5kZW5jaWVzIGhhdmUgdmFsZXMsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxEZXBlbmRlbmNpZXNNZXQoc3RyZWFtKSB7XG4gIHN0cmVhbS5kZXBzTWV0ID0gc3RyZWFtLmRlcHMuZXZlcnkoZnVuY3Rpb24ocykge1xuICAgIHJldHVybiBzLmhhc1ZhbDtcbiAgfSk7XG4gIHJldHVybiBzdHJlYW0uZGVwc01ldDtcbn1cblxuZnVuY3Rpb24gZGVwZW5kZW5jaWVzQXJlTWV0KHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtLmRlcHNNZXQgPT09IHRydWUgfHwgaW5pdGlhbERlcGVuZGVuY2llc01ldChzdHJlYW0pO1xufVxuXG5mdW5jdGlvbiBpc0VuZGVkKHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtLmVuZCAmJiBzdHJlYW0uZW5kLnZhbCA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuZXJzTmVlZFVwZGF0aW5nKHMpIHtcbiAgcmV0dXJuIHMubGlzdGVuZXJzLnNvbWUoZnVuY3Rpb24ocykgeyByZXR1cm4gcy5zaG91bGRVcGRhdGU7IH0pO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBVcGRhdGUgYSBkZXBlbmRlbnQgc3RyZWFtIHVzaW5nIGl0cyBkZXBlbmRlbmNpZXMgaW4gYW4gYXRvbWljIHdheVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gdXBkYXRlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVN0cmVhbShzKSB7XG4gIGlmIChpc0VuZGVkKHMpIHx8ICFkZXBlbmRlbmNpZXNBcmVNZXQocykpIHJldHVybjtcbiAgaWYgKGluU3RyZWFtICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cGRhdGVMYXRlclVzaW5nKHVwZGF0ZVN0cmVhbSwgcyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGluU3RyZWFtID0gcztcbiAgaWYgKHMuZGVwc0NoYW5nZWQpIHMuZm5BcmdzW3MuZm5BcmdzLmxlbmd0aCAtIDFdID0gcy5kZXBzQ2hhbmdlZDtcbiAgdmFyIHJldHVyblZhbCA9IHMuZm4uYXBwbHkocy5mbiwgcy5mbkFyZ3MpO1xuICBpZiAocmV0dXJuVmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICBzKHJldHVyblZhbCk7XG4gIH1cbiAgaW5TdHJlYW0gPSB1bmRlZmluZWQ7XG4gIGlmIChzLmRlcHNDaGFuZ2VkICE9PSB1bmRlZmluZWQpIHMuZGVwc0NoYW5nZWQgPSBbXTtcbiAgcy5zaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgaWYgKGZsdXNoaW5nKCkgPT09IGZhbHNlKSBmbHVzaFVwZGF0ZSgpO1xuICBpZiAobGlzdGVuZXJzTmVlZFVwZGF0aW5nKHMpKSB7XG4gICAgaWYgKCFmbHVzaGluZ1N0cmVhbVZhbHVlKSBzKHMudmFsKVxuICAgIGVsc2Uge1xuICAgICAgcy5saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXIuc2hvdWxkVXBkYXRlKSB1cGRhdGVMYXRlclVzaW5nKHVwZGF0ZVN0cmVhbSwgbGlzdGVuZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIFVwZGF0ZSB0aGUgZGVwZW5kZW5jaWVzIG9mIGEgc3RyZWFtXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUxpc3RlbmVycyhzKSB7XG4gIHZhciBpLCBvLCBsaXN0XG4gIHZhciBsaXN0ZW5lcnMgPSBzLmxpc3RlbmVycztcbiAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7ICsraSkge1xuICAgIGxpc3QgPSBsaXN0ZW5lcnNbaV07XG4gICAgaWYgKGxpc3QuZW5kID09PSBzKSB7XG4gICAgICBlbmRTdHJlYW0obGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChsaXN0LmRlcHNDaGFuZ2VkICE9PSB1bmRlZmluZWQpIGxpc3QuZGVwc0NoYW5nZWQucHVzaChzKTtcbiAgICAgIGxpc3Quc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgIGZpbmREZXBzKGxpc3QpO1xuICAgIH1cbiAgfVxuICBmb3IgKDsgb3JkZXJOZXh0SWR4ID49IDA7IC0tb3JkZXJOZXh0SWR4KSB7XG4gICAgbyA9IG9yZGVyW29yZGVyTmV4dElkeF07XG4gICAgaWYgKG8uc2hvdWxkVXBkYXRlID09PSB0cnVlKSB1cGRhdGVTdHJlYW0obyk7XG4gICAgby5xdWV1ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBBZGQgc3RyZWFtIGRlcGVuZGVuY2llcyB0byB0aGUgZ2xvYmFsIGBvcmRlcmAgcXVldWUuXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtXG4gKiBAc2VlIHVwZGF0ZURlcHNcbiAqL1xuZnVuY3Rpb24gZmluZERlcHMocykge1xuICB2YXIgaVxuICB2YXIgbGlzdGVuZXJzID0gcy5saXN0ZW5lcnM7XG4gIGlmIChzLnF1ZXVlZCA9PT0gZmFsc2UpIHtcbiAgICBzLnF1ZXVlZCA9IHRydWU7XG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7ICsraSkge1xuICAgICAgZmluZERlcHMobGlzdGVuZXJzW2ldKTtcbiAgICB9XG4gICAgb3JkZXJbKytvcmRlck5leHRJZHhdID0gcztcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMYXRlclVzaW5nKHVwZGF0ZXIsIHN0cmVhbSkge1xuICB0b1VwZGF0ZS5wdXNoKHN0cmVhbSk7XG4gIHN0cmVhbS51cGRhdGVycy5wdXNoKHVwZGF0ZXIpO1xuICBzdHJlYW0uc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBmbHVzaFVwZGF0ZSgpIHtcbiAgZmx1c2hpbmdVcGRhdGVRdWV1ZSA9IHRydWU7XG4gIHdoaWxlICh0b1VwZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgdmFyIHN0cmVhbSA9IHRvVXBkYXRlLnNoaWZ0KCk7XG4gICAgdmFyIG5leHRVcGRhdGVGbiA9IHN0cmVhbS51cGRhdGVycy5zaGlmdCgpO1xuICAgIGlmIChuZXh0VXBkYXRlRm4gJiYgc3RyZWFtLnNob3VsZFVwZGF0ZSkgbmV4dFVwZGF0ZUZuKHN0cmVhbSk7XG4gIH1cbiAgZmx1c2hpbmdVcGRhdGVRdWV1ZSA9IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBQdXNoIGRvd24gYSB2YWx1ZSBpbnRvIGEgc3RyZWFtXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVN0cmVhbVZhbHVlKG4sIHMpIHtcbiAgcy52YWwgPSBuO1xuICBzLmhhc1ZhbCA9IHRydWU7XG4gIGlmIChpblN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZmx1c2hpbmdTdHJlYW1WYWx1ZSA9IHRydWU7XG4gICAgdXBkYXRlTGlzdGVuZXJzKHMpO1xuICAgIGlmICh0b1VwZGF0ZS5sZW5ndGggPiAwKSBmbHVzaFVwZGF0ZSgpO1xuICAgIGZsdXNoaW5nU3RyZWFtVmFsdWUgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChpblN0cmVhbSA9PT0gcykge1xuICAgIG1hcmtMaXN0ZW5lcnMocywgcy5saXN0ZW5lcnMpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUxhdGVyVXNpbmcoZnVuY3Rpb24ocykgeyB1cGRhdGVTdHJlYW1WYWx1ZShuLCBzKTsgfSwgcyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYXJrTGlzdGVuZXJzKHMsIGxpc3RzKSB7XG4gIHZhciBpLCBsaXN0O1xuICBmb3IgKGkgPSAwOyBpIDwgbGlzdHMubGVuZ3RoOyArK2kpIHtcbiAgICBsaXN0ID0gbGlzdHNbaV07XG4gICAgaWYgKGxpc3QuZW5kICE9PSBzKSB7XG4gICAgICBpZiAobGlzdC5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxpc3QuZGVwc0NoYW5nZWQucHVzaChzKTtcbiAgICAgIH1cbiAgICAgIGxpc3Quc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW5kU3RyZWFtKGxpc3QpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBBZGQgZGVwZW5kZW5jaWVzIHRvIGEgc3RyZWFtXG4gKiBAcGFyYW0ge0FycmF5PHN0cmVhbT59IGRlcGVuZGVuY2llc1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoZGVwcywgcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyArK2kpIHtcbiAgICBkZXBzW2ldLmxpc3RlbmVycy5wdXNoKHMpO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIFJlbW92ZXMgYW4gc3RyZWFtIGZyb20gYSBkZXBlbmRlbmN5IGFycmF5XG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtXG4gKiBAcGFyYW0ge0FycmF5PHN0cmVhbT59IGRlcGVuZGVuY2llc1xuICovXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihzLCBsaXN0ZW5lcnMpIHtcbiAgdmFyIGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKHMpO1xuICBsaXN0ZW5lcnNbaWR4XSA9IGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV07XG4gIGxpc3RlbmVycy5sZW5ndGgtLTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogRGV0YWNoIGEgc3RyZWFtIGZyb20gaXRzIGRlcGVuZGVuY2llc1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICovXG5mdW5jdGlvbiBkZXRhY2hEZXBzKHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmRlcHMubGVuZ3RoOyArK2kpIHtcbiAgICByZW1vdmVMaXN0ZW5lcihzLCBzLmRlcHNbaV0ubGlzdGVuZXJzKTtcbiAgfVxuICBzLmRlcHMubGVuZ3RoID0gMDtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogRW5kcyBhIHN0cmVhbVxuICovXG5mdW5jdGlvbiBlbmRTdHJlYW0ocykge1xuICBpZiAocy5kZXBzICE9PSB1bmRlZmluZWQpIGRldGFjaERlcHMocyk7XG4gIGlmIChzLmVuZCAhPT0gdW5kZWZpbmVkKSBkZXRhY2hEZXBzKHMuZW5kKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG4vKipcbiAqIEBwcml2YXRlXG4gKiB0cmFuc2R1Y2VyIHN0cmVhbSB0cmFuc2Zvcm1lclxuICovXG5mdW5jdGlvbiBTdHJlYW1UcmFuc2Zvcm1lcigpIHsgfVxuU3RyZWFtVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24oKSB7IH07XG5TdHJlYW1UcmFuc2Zvcm1lci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKCkgeyB9O1xuU3RyZWFtVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocywgdikgeyByZXR1cm4gdjsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbHlkO1xuIiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5TicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCB3aXRoIHRoZSBzcGVjaWZpZWRcbiAqIGFyaXR5LiBUaGUgY3VycmllZCBmdW5jdGlvbiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzXG4gKiBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmUgYXQgYSB0aW1lLiBJZiBgZ2AgaXMgYFIuY3VycnlOKDMsIGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBbYFIuX19gXSgjX18pIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgW2BSLl9fYF0oI19fKSxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjUuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzdW1BcmdzID0gKC4uLmFyZ3MpID0+IFIuc3VtKGFyZ3MpO1xuICpcbiAqICAgICAgdmFyIGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnlOKDQsIHN1bUFyZ3MpO1xuICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgdmFyIGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cblxuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gY3VycnlOKGxlbmd0aCwgZm4pIHtcbiAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBfY3VycnkxKGZuKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGxlbmd0aCwgX2N1cnJ5TihsZW5ndGgsIFtdLCBmbikpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGN1cnJ5TjsiLCJmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgODpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBfYXJpdHk7IiwidmFyIF9pc1BsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgb25lLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIF9jdXJyeTEoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKGEpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBfaXNQbGFjZWhvbGRlcihhKSkge1xuICAgICAgcmV0dXJuIGYxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTE7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkxJyk7XG5cbnZhciBfaXNQbGFjZWhvbGRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnkyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMihhLCBiKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjIgOiBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYik7XG4gICAgICAgIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjIgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBiKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iKTtcbiAgICAgICAgfSkgOiBmbihhLCBiKTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTI7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19hcml0eScpO1xuXG52YXIgX2lzUGxhY2Vob2xkZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG4vKipcbiAqIEludGVybmFsIGN1cnJ5TiBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBvZiB0aGUgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHJlY2VpdmVkIEFuIGFycmF5IG9mIGFyZ3VtZW50cyByZWNlaXZlZCB0aHVzIGZhci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIF9jdXJyeU4obGVuZ3RoLCByZWNlaXZlZCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgdmFyIGxlZnQgPSBsZW5ndGg7XG4gICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpZiAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggJiYgKCFfaXNQbGFjZWhvbGRlcihyZWNlaXZlZFtjb21iaW5lZElkeF0pIHx8IGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAoIV9pc1BsYWNlaG9sZGVyKHJlc3VsdCkpIHtcbiAgICAgICAgbGVmdCAtPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRJZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnQgPD0gMCA/IGZuLmFwcGx5KHRoaXMsIGNvbWJpbmVkKSA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeU47IiwiZnVuY3Rpb24gX2lzUGxhY2Vob2xkZXIoYSkge1xuICAgICAgIHJldHVybiBhICE9IG51bGwgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaXNQbGFjZWhvbGRlcjsiLCJpbXBvcnQgX2FyaXR5IGZyb20gJy4vaW50ZXJuYWwvX2FyaXR5LmpzJztcbmltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgYm91bmQgdG8gYSBjb250ZXh0LlxuICogTm90ZTogYFIuYmluZGAgZG9lcyBub3QgcHJvdmlkZSB0aGUgYWRkaXRpb25hbCBhcmd1bWVudC1iaW5kaW5nIGNhcGFiaWxpdGllcyBvZlxuICogW0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoKiAtPiAqKSAtPiB7Kn0gLT4gKCogLT4gKilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiaW5kIHRvIGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzT2JqIFRoZSBjb250ZXh0IHRvIGJpbmQgYGZuYCB0b1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIGV4ZWN1dGUgaW4gdGhlIGNvbnRleHQgb2YgYHRoaXNPYmpgLlxuICogQHNlZSBSLnBhcnRpYWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBsb2cgPSBSLmJpbmQoY29uc29sZS5sb2csIGNvbnNvbGUpO1xuICogICAgICBSLnBpcGUoUi5hc3NvYygnYScsIDIpLCBSLnRhcChsb2cpLCBSLmFzc29jKCdhJywgMykpKHthOiAxfSk7IC8vPT4ge2E6IDN9XG4gKiAgICAgIC8vIGxvZ3Mge2E6IDJ9XG4gKiBAc3ltYiBSLmJpbmQoZiwgbykoYSwgYikgPSBmLmNhbGwobywgYSwgYilcbiAqL1xudmFyIGJpbmQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBiaW5kKGZuLCB0aGlzT2JqKSB7XG4gIHJldHVybiBfYXJpdHkoZm4ubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNPYmosIGFyZ3VtZW50cyk7XG4gIH0pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBiaW5kOyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5pbXBvcnQgY3VycnlOIGZyb20gJy4vY3VycnlOLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbi4gVGhlIGN1cnJpZWQgZnVuY3Rpb25cbiAqIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHMgYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lXG4gKiBhdCBhIHRpbWUuIElmIGBmYCBpcyBhIHRlcm5hcnkgZnVuY3Rpb24gYW5kIGBnYCBpcyBgUi5jdXJyeShmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgW2BSLl9fYF0oI19fKSBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIFtgUi5fX2BdKCNfXyksXG4gKiB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5TiwgUi5wYXJ0aWFsXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgYWRkRm91ck51bWJlcnMgPSAoYSwgYiwgYywgZCkgPT4gYSArIGIgKyBjICsgZDtcbiAqXG4gKiAgICAgIGNvbnN0IGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnkoYWRkRm91ck51bWJlcnMpO1xuICogICAgICBjb25zdCBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICBjb25zdCBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG52YXIgY3VycnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBjdXJyeShmbikge1xuICByZXR1cm4gY3VycnlOKGZuLmxlbmd0aCwgZm4pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBjdXJyeTsiLCJpbXBvcnQgX2FyaXR5IGZyb20gJy4vaW50ZXJuYWwvX2FyaXR5LmpzJztcbmltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5pbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IF9jdXJyeU4gZnJvbSAnLi9pbnRlcm5hbC9fY3VycnlOLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGUgc3BlY2lmaWVkXG4gKiBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0c1xuICogYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzIGBSLmN1cnJ5TigzLCBmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgW2BSLl9fYF0oI19fKSBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIFtgUi5fX2BdKCNfXyksXG4gKiB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC41LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IGZvciB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBzdW1BcmdzID0gKC4uLmFyZ3MpID0+IFIuc3VtKGFyZ3MpO1xuICpcbiAqICAgICAgY29uc3QgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgc3VtQXJncyk7XG4gKiAgICAgIGNvbnN0IGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIGNvbnN0IGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBjdXJyeU4obGVuZ3RoLCBmbikge1xuICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIF9jdXJyeTEoZm4pO1xuICB9XG4gIHJldHVybiBfYXJpdHkobGVuZ3RoLCBfY3VycnlOKGxlbmd0aCwgW10sIGZuKSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGN1cnJ5TjsiLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IF9lcXVhbHMgZnJvbSAnLi9pbnRlcm5hbC9fZXF1YWxzLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBpdHMgYXJndW1lbnRzIGFyZSBlcXVpdmFsZW50LCBgZmFsc2VgIG90aGVyd2lzZS4gSGFuZGxlc1xuICogY3ljbGljYWwgZGF0YSBzdHJ1Y3R1cmVzLlxuICpcbiAqIERpc3BhdGNoZXMgc3ltbWV0cmljYWxseSB0byB0aGUgYGVxdWFsc2AgbWV0aG9kcyBvZiBib3RoIGFyZ3VtZW50cywgaWZcbiAqIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTUuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIGEgLT4gYiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmVxdWFscygxLCAxKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuZXF1YWxzKDEsICcxJyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5lcXVhbHMoWzEsIDIsIDNdLCBbMSwgMiwgM10pOyAvLz0+IHRydWVcbiAqXG4gKiAgICAgIGNvbnN0IGEgPSB7fTsgYS52ID0gYTtcbiAqICAgICAgY29uc3QgYiA9IHt9OyBiLnYgPSBiO1xuICogICAgICBSLmVxdWFscyhhLCBiKTsgLy89PiB0cnVlXG4gKi9cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICByZXR1cm4gX2VxdWFscyhhLCBiLCBbXSwgW10pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBlcXVhbHM7IiwiaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcbmltcG9ydCBfZGlzcGF0Y2hhYmxlIGZyb20gJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZS5qcyc7XG5pbXBvcnQgX2ZpbHRlciBmcm9tICcuL2ludGVybmFsL19maWx0ZXIuanMnO1xuaW1wb3J0IF9pc09iamVjdCBmcm9tICcuL2ludGVybmFsL19pc09iamVjdC5qcyc7XG5pbXBvcnQgX3JlZHVjZSBmcm9tICcuL2ludGVybmFsL19yZWR1Y2UuanMnO1xuaW1wb3J0IF94ZmlsdGVyIGZyb20gJy4vaW50ZXJuYWwvX3hmaWx0ZXIuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBUYWtlcyBhIHByZWRpY2F0ZSBhbmQgYSBgRmlsdGVyYWJsZWAsIGFuZCByZXR1cm5zIGEgbmV3IGZpbHRlcmFibGUgb2YgdGhlXG4gKiBzYW1lIHR5cGUgY29udGFpbmluZyB0aGUgbWVtYmVycyBvZiB0aGUgZ2l2ZW4gZmlsdGVyYWJsZSB3aGljaCBzYXRpc2Z5IHRoZVxuICogZ2l2ZW4gcHJlZGljYXRlLiBGaWx0ZXJhYmxlIG9iamVjdHMgaW5jbHVkZSBwbGFpbiBvYmplY3RzIG9yIGFueSBvYmplY3RcbiAqIHRoYXQgaGFzIGEgZmlsdGVyIG1ldGhvZCBzdWNoIGFzIGBBcnJheWAuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGZpbHRlcmAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgRmlsdGVyYWJsZSBmID0+IChhIC0+IEJvb2xlYW4pIC0+IGYgYSAtPiBmIGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlcmFibGVcbiAqIEByZXR1cm4ge0FycmF5fSBGaWx0ZXJhYmxlXG4gKiBAc2VlIFIucmVqZWN0LCBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDA7XG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2I6IDIsIGQ6IDR9XG4gKi9cbnZhciBmaWx0ZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoWydmaWx0ZXInXSwgX3hmaWx0ZXIsIGZ1bmN0aW9uIChwcmVkLCBmaWx0ZXJhYmxlKSB7XG4gIHJldHVybiBfaXNPYmplY3QoZmlsdGVyYWJsZSkgPyBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgIGlmIChwcmVkKGZpbHRlcmFibGVba2V5XSkpIHtcbiAgICAgIGFjY1trZXldID0gZmlsdGVyYWJsZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSwga2V5cyhmaWx0ZXJhYmxlKSkgOlxuICAvLyBlbHNlXG4gIF9maWx0ZXIocHJlZCwgZmlsdGVyYWJsZSk7XG59KSk7XG5leHBvcnQgZGVmYXVsdCBmaWx0ZXI7IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBjdXJyeU4gZnJvbSAnLi9jdXJyeU4uanMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgZnVuY3Rpb24gbXVjaCBsaWtlIHRoZSBzdXBwbGllZCBvbmUsIGV4Y2VwdCB0aGF0IHRoZSBmaXJzdCB0d29cbiAqIGFyZ3VtZW50cycgb3JkZXIgaXMgcmV2ZXJzZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKChhLCBiLCBjLCAuLi4pIC0+IHopIC0+IChiIC0+IGEgLT4gYyAtPiAuLi4gLT4geilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2Ugd2l0aCBpdHMgZmlyc3QgdHdvIHBhcmFtZXRlcnMgcmV2ZXJzZWQuXG4gKiBAcmV0dXJuIHsqfSBUaGUgcmVzdWx0IG9mIGludm9raW5nIGBmbmAgd2l0aCBpdHMgZmlyc3QgdHdvIHBhcmFtZXRlcnMnIG9yZGVyIHJldmVyc2VkLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IG1lcmdlVGhyZWUgPSAoYSwgYiwgYykgPT4gW10uY29uY2F0KGEsIGIsIGMpO1xuICpcbiAqICAgICAgbWVyZ2VUaHJlZSgxLCAyLCAzKTsgLy89PiBbMSwgMiwgM11cbiAqXG4gKiAgICAgIFIuZmxpcChtZXJnZVRocmVlKSgxLCAyLCAzKTsgLy89PiBbMiwgMSwgM11cbiAqIEBzeW1iIFIuZmxpcChmKShhLCBiLCBjKSA9IGYoYiwgYSwgYylcbiAqL1xudmFyIGZsaXAgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBmbGlwKGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBhcmdzWzBdID0gYjtcbiAgICBhcmdzWzFdID0gYTtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gIH0pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBmbGlwOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcml0eShuLCBmbikge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICBzd2l0Y2ggKG4pIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMikge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA3OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNikge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA4OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgOTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSAxMDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIF9hcml0eSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgbm8gZ3JlYXRlciB0aGFuIHRlbicpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5RnJvbUl0ZXJhdG9yKGl0ZXIpIHtcbiAgdmFyIGxpc3QgPSBbXTtcbiAgdmFyIG5leHQ7XG4gIHdoaWxlICghKG5leHQgPSBpdGVyLm5leHQoKSkuZG9uZSkge1xuICAgIGxpc3QucHVzaChuZXh0LnZhbHVlKTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY29tcGxlbWVudChmKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICFmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59IiwiaW1wb3J0IF9pc1BsYWNlaG9sZGVyIGZyb20gJy4vX2lzUGxhY2Vob2xkZXIuanMnO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCBvbmUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgX2lzUGxhY2Vob2xkZXIoYSkpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufSIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vX2N1cnJ5MS5qcyc7XG5pbXBvcnQgX2lzUGxhY2Vob2xkZXIgZnJvbSAnLi9faXNQbGFjZWhvbGRlci5qcyc7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmMiA6IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iKTtcbiAgICAgICAgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBmMiA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IpO1xuICAgICAgICB9KSA6IGZuKGEsIGIpO1xuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgX2FyaXR5IGZyb20gJy4vX2FyaXR5LmpzJztcbmltcG9ydCBfaXNQbGFjZWhvbGRlciBmcm9tICcuL19pc1BsYWNlaG9sZGVyLmpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jdXJyeU4obGVuZ3RoLCByZWNlaXZlZCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgdmFyIGxlZnQgPSBsZW5ndGg7XG4gICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpZiAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggJiYgKCFfaXNQbGFjZWhvbGRlcihyZWNlaXZlZFtjb21iaW5lZElkeF0pIHx8IGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAoIV9pc1BsYWNlaG9sZGVyKHJlc3VsdCkpIHtcbiAgICAgICAgbGVmdCAtPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRJZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnQgPD0gMCA/IGZuLmFwcGx5KHRoaXMsIGNvbWJpbmVkKSA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gIH07XG59IiwiaW1wb3J0IF9pc0FycmF5IGZyb20gJy4vX2lzQXJyYXkuanMnO1xuaW1wb3J0IF9pc1RyYW5zZm9ybWVyIGZyb20gJy4vX2lzVHJhbnNmb3JtZXIuanMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGRpc3BhdGNoZXMgd2l0aCBkaWZmZXJlbnQgc3RyYXRlZ2llcyBiYXNlZCBvbiB0aGVcbiAqIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uIChsYXN0IGFyZ3VtZW50KS4gSWYgaXQgaXMgYW4gYXJyYXksIGV4ZWN1dGVzIFtmbl0uXG4gKiBPdGhlcndpc2UsIGlmIGl0IGhhcyBhIGZ1bmN0aW9uIHdpdGggb25lIG9mIHRoZSBnaXZlbiBtZXRob2QgbmFtZXMsIGl0IHdpbGxcbiAqIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiAoZnVuY3RvciBjYXNlKS4gT3RoZXJ3aXNlLCBpZiBpdCBpcyBhIHRyYW5zZm9ybWVyLFxuICogdXNlcyB0cmFuc2R1Y2VyIFt4Zl0gdG8gcmV0dXJuIGEgbmV3IHRyYW5zZm9ybWVyICh0cmFuc2R1Y2VyIGNhc2UpLlxuICogT3RoZXJ3aXNlLCBpdCB3aWxsIGRlZmF1bHQgdG8gZXhlY3V0aW5nIFtmbl0uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZE5hbWVzIHByb3BlcnRpZXMgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB4ZiB0cmFuc2R1Y2VyIHRvIGluaXRpYWxpemUgaWYgb2JqZWN0IGlzIHRyYW5zZm9ybWVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBkZWZhdWx0IHJhbWRhIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3BhdGNoZXMgb24gb2JqZWN0IGluIGxpc3QgcG9zaXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Rpc3BhdGNoYWJsZShtZXRob2ROYW1lcywgeGYsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgdmFyIG9iaiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKCFfaXNBcnJheShvYmopKSB7XG4gICAgICB2YXIgaWR4ID0gMDtcbiAgICAgIHdoaWxlIChpZHggPCBtZXRob2ROYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbbWV0aG9kTmFtZXNbaWR4XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW21ldGhvZE5hbWVzW2lkeF1dLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoX2lzVHJhbnNmb3JtZXIob2JqKSkge1xuICAgICAgICB2YXIgdHJhbnNkdWNlciA9IHhmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdHJhbnNkdWNlcihvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn0iLCJpbXBvcnQgX2FycmF5RnJvbUl0ZXJhdG9yIGZyb20gJy4vX2FycmF5RnJvbUl0ZXJhdG9yLmpzJztcbmltcG9ydCBfaW5jbHVkZXNXaXRoIGZyb20gJy4vX2luY2x1ZGVzV2l0aC5qcyc7XG5pbXBvcnQgX2Z1bmN0aW9uTmFtZSBmcm9tICcuL19mdW5jdGlvbk5hbWUuanMnO1xuaW1wb3J0IF9oYXMgZnJvbSAnLi9faGFzLmpzJztcbmltcG9ydCBfb2JqZWN0SXMgZnJvbSAnLi9fb2JqZWN0SXMuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi4va2V5cy5qcyc7XG5pbXBvcnQgdHlwZSBmcm9tICcuLi90eXBlLmpzJztcblxuLyoqXG4gKiBwcml2YXRlIF91bmlxQ29udGVudEVxdWFscyBmdW5jdGlvbi5cbiAqIFRoYXQgZnVuY3Rpb24gaXMgY2hlY2tpbmcgZXF1YWxpdHkgb2YgMiBpdGVyYXRvciBjb250ZW50cyB3aXRoIDIgYXNzdW1wdGlvbnNcbiAqIC0gaXRlcmF0b3JzIGxlbmd0aHMgYXJlIHRoZSBzYW1lXG4gKiAtIGl0ZXJhdG9ycyB2YWx1ZXMgYXJlIHVuaXF1ZVxuICpcbiAqIGZhbHNlLXBvc2l0aXZlIHJlc3VsdCB3aWxsIGJlIHJldHVybmVkIGZvciBjb21wYXJpc2lvbiBvZiwgZS5nLlxuICogLSBbMSwyLDNdIGFuZCBbMSwyLDMsNF1cbiAqIC0gWzEsMSwxXSBhbmQgWzEsMiwzXVxuICogKi9cblxuZnVuY3Rpb24gX3VuaXFDb250ZW50RXF1YWxzKGFJdGVyYXRvciwgYkl0ZXJhdG9yLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgYSA9IF9hcnJheUZyb21JdGVyYXRvcihhSXRlcmF0b3IpO1xuICB2YXIgYiA9IF9hcnJheUZyb21JdGVyYXRvcihiSXRlcmF0b3IpO1xuXG4gIGZ1bmN0aW9uIGVxKF9hLCBfYikge1xuICAgIHJldHVybiBfZXF1YWxzKF9hLCBfYiwgc3RhY2tBLnNsaWNlKCksIHN0YWNrQi5zbGljZSgpKTtcbiAgfVxuXG4gIC8vIGlmICphKiBhcnJheSBjb250YWlucyBhbnkgZWxlbWVudCB0aGF0IGlzIG5vdCBpbmNsdWRlZCBpbiAqYipcbiAgcmV0dXJuICFfaW5jbHVkZXNXaXRoKGZ1bmN0aW9uIChiLCBhSXRlbSkge1xuICAgIHJldHVybiAhX2luY2x1ZGVzV2l0aChlcSwgYUl0ZW0sIGIpO1xuICB9LCBiLCBhKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2VxdWFscyhhLCBiLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoX29iamVjdElzKGEsIGIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgdHlwZUEgPSB0eXBlKGEpO1xuXG4gIGlmICh0eXBlQSAhPT0gdHlwZShiKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhWydmYW50YXN5LWxhbmQvZXF1YWxzJ10gPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGJbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlb2YgYVsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nICYmIGFbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXShiKSAmJiB0eXBlb2YgYlsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nICYmIGJbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXShhKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBhLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyAmJiBhLmVxdWFscyhiKSAmJiB0eXBlb2YgYi5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiYgYi5lcXVhbHMoYSk7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGVBKSB7XG4gICAgY2FzZSAnQXJndW1lbnRzJzpcbiAgICBjYXNlICdBcnJheSc6XG4gICAgY2FzZSAnT2JqZWN0JzpcbiAgICAgIGlmICh0eXBlb2YgYS5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiBfZnVuY3Rpb25OYW1lKGEuY29uc3RydWN0b3IpID09PSAnUHJvbWlzZScpIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdCb29sZWFuJzpcbiAgICBjYXNlICdOdW1iZXInOlxuICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICBpZiAoISh0eXBlb2YgYSA9PT0gdHlwZW9mIGIgJiYgX29iamVjdElzKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgaWYgKCFfb2JqZWN0SXMoYS52YWx1ZU9mKCksIGIudmFsdWVPZigpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFcnJvcic6XG4gICAgICByZXR1cm4gYS5uYW1lID09PSBiLm5hbWUgJiYgYS5tZXNzYWdlID09PSBiLm1lc3NhZ2U7XG4gICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgIGlmICghKGEuc291cmNlID09PSBiLnNvdXJjZSAmJiBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiYgYS5pZ25vcmVDYXNlID09PSBiLmlnbm9yZUNhc2UgJiYgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmIGEuc3RpY2t5ID09PSBiLnN0aWNreSAmJiBhLnVuaWNvZGUgPT09IGIudW5pY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cblxuICB2YXIgaWR4ID0gc3RhY2tBLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIGlmIChzdGFja0FbaWR4XSA9PT0gYSkge1xuICAgICAgcmV0dXJuIHN0YWNrQltpZHhdID09PSBiO1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZUEpIHtcbiAgICBjYXNlICdNYXAnOlxuICAgICAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF91bmlxQ29udGVudEVxdWFscyhhLmVudHJpZXMoKSwgYi5lbnRyaWVzKCksIHN0YWNrQS5jb25jYXQoW2FdKSwgc3RhY2tCLmNvbmNhdChbYl0pKTtcbiAgICBjYXNlICdTZXQnOlxuICAgICAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF91bmlxQ29udGVudEVxdWFscyhhLnZhbHVlcygpLCBiLnZhbHVlcygpLCBzdGFja0EuY29uY2F0KFthXSksIHN0YWNrQi5jb25jYXQoW2JdKSk7XG4gICAgY2FzZSAnQXJndW1lbnRzJzpcbiAgICBjYXNlICdBcnJheSc6XG4gICAgY2FzZSAnT2JqZWN0JzpcbiAgICBjYXNlICdCb29sZWFuJzpcbiAgICBjYXNlICdOdW1iZXInOlxuICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgY2FzZSAnRGF0ZSc6XG4gICAgY2FzZSAnRXJyb3InOlxuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgY2FzZSAnSW50OEFycmF5JzpcbiAgICBjYXNlICdVaW50OEFycmF5JzpcbiAgICBjYXNlICdVaW50OENsYW1wZWRBcnJheSc6XG4gICAgY2FzZSAnSW50MTZBcnJheSc6XG4gICAgY2FzZSAnVWludDE2QXJyYXknOlxuICAgIGNhc2UgJ0ludDMyQXJyYXknOlxuICAgIGNhc2UgJ1VpbnQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDMyQXJyYXknOlxuICAgIGNhc2UgJ0Zsb2F0NjRBcnJheSc6XG4gICAgY2FzZSAnQXJyYXlCdWZmZXInOlxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIFZhbHVlcyBvZiBvdGhlciB0eXBlcyBhcmUgb25seSBlcXVhbCBpZiBpZGVudGljYWwuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBrZXlzKGEpO1xuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBleHRlbmRlZFN0YWNrQSA9IHN0YWNrQS5jb25jYXQoW2FdKTtcbiAgdmFyIGV4dGVuZGVkU3RhY2tCID0gc3RhY2tCLmNvbmNhdChbYl0pO1xuXG4gIGlkeCA9IGtleXNBLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIHZhciBrZXkgPSBrZXlzQVtpZHhdO1xuICAgIGlmICghKF9oYXMoa2V5LCBiKSAmJiBfZXF1YWxzKGJba2V5XSwgYVtrZXldLCBleHRlbmRlZFN0YWNrQSwgZXh0ZW5kZWRTdGFja0IpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZmlsdGVyKGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGxpc3RbaWR4XTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZnVuY3Rpb25OYW1lKGYpIHtcbiAgLy8gU3RyaW5nKHggPT4geCkgZXZhbHVhdGVzIHRvIFwieCA9PiB4XCIsIHNvIHRoZSBwYXR0ZXJuIG1heSBub3QgbWF0Y2guXG4gIHZhciBtYXRjaCA9IFN0cmluZyhmKS5tYXRjaCgvXmZ1bmN0aW9uIChcXHcqKS8pO1xuICByZXR1cm4gbWF0Y2ggPT0gbnVsbCA/ICcnIDogbWF0Y2hbMV07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2hhcyhwcm9wLCBvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufSIsImltcG9ydCBfaW5kZXhPZiBmcm9tICcuL19pbmRleE9mLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luY2x1ZGVzKGEsIGxpc3QpIHtcbiAgcmV0dXJuIF9pbmRleE9mKGxpc3QsIGEsIDApID49IDA7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luY2x1ZGVzV2l0aChwcmVkLCB4LCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChwcmVkKHgsIGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IGVxdWFscyBmcm9tICcuLi9lcXVhbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5kZXhPZihsaXN0LCBhLCBpZHgpIHtcbiAgdmFyIGluZiwgaXRlbTtcbiAgLy8gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgZG9lc24ndCBleGlzdCBiZWxvdyBJRTlcbiAgaWYgKHR5cGVvZiBsaXN0LmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpZiAoYSA9PT0gMCkge1xuICAgICAgICAgIC8vIG1hbnVhbGx5IGNyYXdsIHRoZSBsaXN0IHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gKzAgYW5kIC0wXG4gICAgICAgICAgaW5mID0gMSAvIGE7XG4gICAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IDAgJiYgMSAvIGl0ZW0gPT09IGluZikge1xuICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhICE9PSBhKSB7XG4gICAgICAgICAgLy8gTmFOXG4gICAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJyAmJiBpdGVtICE9PSBpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vbi16ZXJvIG51bWJlcnMgY2FuIHV0aWxpc2UgU2V0XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcblxuICAgICAgLy8gYWxsIHRoZXNlIHR5cGVzIGNhbiB1dGlsaXNlIFNldFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihhLCBpZHgpO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoYSA9PT0gbnVsbCkge1xuICAgICAgICAgIC8vIG51bGwgY2FuIHV0aWxpc2UgU2V0XG4gICAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihhLCBpZHgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGFueXRoaW5nIGVsc2Ugbm90IGNvdmVyZWQgYWJvdmUsIGRlZmVyIHRvIFIuZXF1YWxzXG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGlmIChlcXVhbHMobGlzdFtpZHhdLCBhKSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufSIsImltcG9ydCBfaGFzIGZyb20gJy4vX2hhcy5qcyc7XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgX2lzQXJndW1lbnRzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXScgPyBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbiAgfSA6IGZ1bmN0aW9uIF9pc0FyZ3VtZW50cyh4KSB7XG4gICAgcmV0dXJuIF9oYXMoJ2NhbGxlZScsIHgpO1xuICB9O1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBfaXNBcmd1bWVudHM7IiwiLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgdmFsYCBpcyBhbiBhcnJheSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2lzQXJyYXkoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXkobnVsbCk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXkoe30pOyAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gX2lzQXJyYXkodmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwubGVuZ3RoID49IDAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59OyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vX2N1cnJ5MS5qcyc7XG5pbXBvcnQgX2lzQXJyYXkgZnJvbSAnLi9faXNBcnJheS5qcyc7XG5pbXBvcnQgX2lzU3RyaW5nIGZyb20gJy4vX2lzU3RyaW5nLmpzJztcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgc2ltaWxhciB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaGFzIGEgbnVtZXJpYyBsZW5ndGggcHJvcGVydHkgYW5kIGV4dHJlbWUgaW5kaWNlcyBkZWZpbmVkOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfaXNBcnJheUxpa2UoW10pOyAvLz0+IHRydWVcbiAqICAgICAgX2lzQXJyYXlMaWtlKHRydWUpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHtsZW5ndGg6IDEwfSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHswOiAnemVybycsIDk6ICduaW5lJywgbGVuZ3RoOiAxMH0pOyAvLz0+IHRydWVcbiAqL1xudmFyIF9pc0FycmF5TGlrZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHgpIHtcbiAgaWYgKF9pc0FycmF5KHgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCF4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKF9pc1N0cmluZyh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIHJldHVybiAhIXgubGVuZ3RoO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4geC5oYXNPd25Qcm9wZXJ0eSgwKSAmJiB4Lmhhc093blByb3BlcnR5KHgubGVuZ3RoIC0gMSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSk7XG5leHBvcnQgZGVmYXVsdCBfaXNBcnJheUxpa2U7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2lzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pc09iamVjdCh4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgICAgICByZXR1cm4gYSAhPSBudWxsICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNTdHJpbmcoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNUcmFuc2Zvcm1lcihvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmpbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPT09ICdmdW5jdGlvbic7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX21hcChmbiwgZnVuY3Rvcikge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGZ1bmN0b3IubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHJlc3VsdFtpZHhdID0gZm4oZnVuY3RvcltpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSIsIi8vIEJhc2VkIG9uIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuZnVuY3Rpb24gX29iamVjdElzKGEsIGIpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoYSA9PT0gYikge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIGEgIT09IGEgJiYgYiAhPT0gYjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgT2JqZWN0LmlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmlzIDogX29iamVjdElzOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9xdW90ZShzKSB7XG4gIHZhciBlc2NhcGVkID0gcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoL1tcXGJdL2csICdcXFxcYicpIC8vIFxcYiBtYXRjaGVzIHdvcmQgYm91bmRhcnk7IFtcXGJdIG1hdGNoZXMgYmFja3NwYWNlXG4gIC5yZXBsYWNlKC9cXGYvZywgJ1xcXFxmJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKS5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JykucmVwbGFjZSgvXFx2L2csICdcXFxcdicpLnJlcGxhY2UoL1xcMC9nLCAnXFxcXDAnKTtcblxuICByZXR1cm4gJ1wiJyArIGVzY2FwZWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiJztcbn0iLCJpbXBvcnQgX2lzQXJyYXlMaWtlIGZyb20gJy4vX2lzQXJyYXlMaWtlLmpzJztcbmltcG9ydCBfeHdyYXAgZnJvbSAnLi9feHdyYXAuanMnO1xuaW1wb3J0IGJpbmQgZnJvbSAnLi4vYmluZC5qcyc7XG5cbmZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIGxpc3RbaWR4XSk7XG4gICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlUmVkdWNlKHhmLCBhY2MsIGl0ZXIpIHtcbiAgdmFyIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgd2hpbGUgKCFzdGVwLmRvbmUpIHtcbiAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIHN0ZXAudmFsdWUpO1xuICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgfVxuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShhY2MpO1xufVxuXG5mdW5jdGlvbiBfbWV0aG9kUmVkdWNlKHhmLCBhY2MsIG9iaiwgbWV0aG9kTmFtZSkge1xuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShvYmpbbWV0aG9kTmFtZV0oYmluZCh4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgeGYpLCBhY2MpKTtcbn1cblxudmFyIHN5bUl0ZXJhdG9yID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2wuaXRlcmF0b3IgOiAnQEBpdGVyYXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9yZWR1Y2UoZm4sIGFjYywgbGlzdCkge1xuICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBfeHdyYXAoZm4pO1xuICB9XG4gIGlmIChfaXNBcnJheUxpa2UobGlzdCkpIHtcbiAgICByZXR1cm4gX2FycmF5UmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGlzdFsnZmFudGFzeS1sYW5kL3JlZHVjZSddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCwgJ2ZhbnRhc3ktbGFuZC9yZWR1Y2UnKTtcbiAgfVxuICBpZiAobGlzdFtzeW1JdGVyYXRvcl0gIT0gbnVsbCkge1xuICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsaXN0Lm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGlzdC5yZWR1Y2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0LCAncmVkdWNlJyk7XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xufSIsIi8qKlxuICogUG9seWZpbGwgZnJvbSA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZS90b0lTT1N0cmluZz4uXG4gKi9cbnZhciBwYWQgPSBmdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gKG4gPCAxMCA/ICcwJyA6ICcnKSArIG47XG59O1xuXG52YXIgX3RvSVNPU3RyaW5nID0gdHlwZW9mIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb24gX3RvSVNPU3RyaW5nKGQpIHtcbiAgcmV0dXJuIGQudG9JU09TdHJpbmcoKTtcbn0gOiBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICByZXR1cm4gZC5nZXRVVENGdWxsWWVhcigpICsgJy0nICsgcGFkKGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgcGFkKGQuZ2V0VVRDRGF0ZSgpKSArICdUJyArIHBhZChkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgcGFkKGQuZ2V0VVRDTWludXRlcygpKSArICc6JyArIHBhZChkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAoZC5nZXRVVENNaWxsaXNlY29uZHMoKSAvIDEwMDApLnRvRml4ZWQoMykuc2xpY2UoMiwgNSkgKyAnWic7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBfdG9JU09TdHJpbmc7IiwiaW1wb3J0IF9pbmNsdWRlcyBmcm9tICcuL19pbmNsdWRlcy5qcyc7XG5pbXBvcnQgX21hcCBmcm9tICcuL19tYXAuanMnO1xuaW1wb3J0IF9xdW90ZSBmcm9tICcuL19xdW90ZS5qcyc7XG5pbXBvcnQgX3RvSVNPU3RyaW5nIGZyb20gJy4vX3RvSVNPU3RyaW5nLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4uL2tleXMuanMnO1xuaW1wb3J0IHJlamVjdCBmcm9tICcuLi9yZWplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9TdHJpbmcoeCwgc2Vlbikge1xuICB2YXIgcmVjdXIgPSBmdW5jdGlvbiByZWN1cih5KSB7XG4gICAgdmFyIHhzID0gc2Vlbi5jb25jYXQoW3hdKTtcbiAgICByZXR1cm4gX2luY2x1ZGVzKHksIHhzKSA/ICc8Q2lyY3VsYXI+JyA6IF90b1N0cmluZyh5LCB4cyk7XG4gIH07XG5cbiAgLy8gIG1hcFBhaXJzIDo6IChPYmplY3QsIFtTdHJpbmddKSAtPiBbU3RyaW5nXVxuICB2YXIgbWFwUGFpcnMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgcmV0dXJuIF9tYXAoZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBfcXVvdGUoaykgKyAnOiAnICsgcmVjdXIob2JqW2tdKTtcbiAgICB9LCBrZXlzLnNsaWNlKCkuc29ydCgpKTtcbiAgfTtcblxuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSkge1xuICAgIGNhc2UgJ1tvYmplY3QgQXJndW1lbnRzXSc6XG4gICAgICByZXR1cm4gJyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgnICsgX21hcChyZWN1ciwgeCkuam9pbignLCAnKSArICcpKSc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmV0dXJuICdbJyArIF9tYXAocmVjdXIsIHgpLmNvbmNhdChtYXBQYWlycyh4LCByZWplY3QoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuICgvXlxcZCskLy50ZXN0KGspXG4gICAgICAgICk7XG4gICAgICB9LCBrZXlzKHgpKSkpLmpvaW4oJywgJykgKyAnXSc7XG4gICAgY2FzZSAnW29iamVjdCBCb29sZWFuXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBCb29sZWFuKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiB4LnRvU3RyaW5nKCk7XG4gICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICByZXR1cm4gJ25ldyBEYXRlKCcgKyAoaXNOYU4oeC52YWx1ZU9mKCkpID8gcmVjdXIoTmFOKSA6IF9xdW90ZShfdG9JU09TdHJpbmcoeCkpKSArICcpJztcbiAgICBjYXNlICdbb2JqZWN0IE51bGxdJzpcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IE51bWJlcignICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogMSAvIHggPT09IC1JbmZpbml0eSA/ICctMCcgOiB4LnRvU3RyaW5nKDEwKTtcbiAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgU3RyaW5nKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiBfcXVvdGUoeCk7XG4gICAgY2FzZSAnW29iamVjdCBVbmRlZmluZWRdJzpcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHR5cGVvZiB4LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciByZXByID0geC50b1N0cmluZygpO1xuICAgICAgICBpZiAocmVwciAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICByZXR1cm4gcmVwcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICd7JyArIG1hcFBhaXJzKHgsIGtleXMoeCkpLmpvaW4oJywgJykgKyAnfSc7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xuICB9LFxuICByZXN1bHQ6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH1cbn07IiwiaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9fY3VycnkyLmpzJztcbmltcG9ydCBfeGZCYXNlIGZyb20gJy4vX3hmQmFzZS5qcyc7XG5cbnZhciBYRmlsdGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gWEZpbHRlcihmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICB9XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5mKGlucHV0KSA/IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCkgOiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhGaWx0ZXI7XG59KCk7XG5cbnZhciBfeGZpbHRlciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94ZmlsdGVyKGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWEZpbHRlcihmLCB4Zik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IF94ZmlsdGVyOyIsInZhciBYV3JhcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFhXcmFwKGZuKSB7XG4gICAgdGhpcy5mID0gZm47XG4gIH1cbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24gKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdCBub3QgaW1wbGVtZW50ZWQgb24gWFdyYXAnKTtcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAoYWNjKSB7XG4gICAgcmV0dXJuIGFjYztcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKGFjYywgeCkge1xuICAgIHJldHVybiB0aGlzLmYoYWNjLCB4KTtcbiAgfTtcblxuICByZXR1cm4gWFdyYXA7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF94d3JhcChmbikge1xuICByZXR1cm4gbmV3IFhXcmFwKGZuKTtcbn0iLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJy4vaW50ZXJuYWwvX2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGN1cnJ5TiBmcm9tICcuL2N1cnJ5Ti5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKlxuICogVHVybnMgYSBuYW1lZCBtZXRob2Qgd2l0aCBhIHNwZWNpZmllZCBhcml0eSBpbnRvIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmVcbiAqIGNhbGxlZCBkaXJlY3RseSBzdXBwbGllZCB3aXRoIGFyZ3VtZW50cyBhbmQgYSB0YXJnZXQgb2JqZWN0LlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBjdXJyaWVkIGFuZCBhY2NlcHRzIGBhcml0eSArIDFgIHBhcmFtZXRlcnMgd2hlcmVcbiAqIHRoZSBmaW5hbCBwYXJhbWV0ZXIgaXMgdGhlIHRhcmdldCBvYmplY3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiAoYSAtPiBiIC0+IC4uLiAtPiBuIC0+IE9iamVjdCAtPiAqKVxuICogQHBhcmFtIHtOdW1iZXJ9IGFyaXR5IE51bWJlciBvZiBhcmd1bWVudHMgdGhlIHJldHVybmVkIGZ1bmN0aW9uIHNob3VsZCB0YWtlXG4gKiAgICAgICAgYmVmb3JlIHRoZSB0YXJnZXQgb2JqZWN0LlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBOYW1lIG9mIHRoZSBtZXRob2QgdG8gY2FsbC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmNvbnN0cnVjdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IHNsaWNlRnJvbSA9IFIuaW52b2tlcigxLCAnc2xpY2UnKTtcbiAqICAgICAgc2xpY2VGcm9tKDYsICdhYmNkZWZnaGlqa2xtJyk7IC8vPT4gJ2doaWprbG0nXG4gKiAgICAgIGNvbnN0IHNsaWNlRnJvbTYgPSBSLmludm9rZXIoMiwgJ3NsaWNlJykoNik7XG4gKiAgICAgIHNsaWNlRnJvbTYoOCwgJ2FiY2RlZmdoaWprbG0nKTsgLy89PiAnZ2gnXG4gKiBAc3ltYiBSLmludm9rZXIoMCwgJ21ldGhvZCcpKG8pID0gb1snbWV0aG9kJ10oKVxuICogQHN5bWIgUi5pbnZva2VyKDEsICdtZXRob2QnKShhLCBvKSA9IG9bJ21ldGhvZCddKGEpXG4gKiBAc3ltYiBSLmludm9rZXIoMiwgJ21ldGhvZCcpKGEsIGIsIG8pID0gb1snbWV0aG9kJ10oYSwgYilcbiAqL1xudmFyIGludm9rZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBpbnZva2VyKGFyaXR5LCBtZXRob2QpIHtcbiAgcmV0dXJuIGN1cnJ5Tihhcml0eSArIDEsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzW2FyaXR5XTtcbiAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgX2lzRnVuY3Rpb24odGFyZ2V0W21ldGhvZF0pKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W21ldGhvZF0uYXBwbHkodGFyZ2V0LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGFyaXR5KSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcodGFyZ2V0KSArICcgZG9lcyBub3QgaGF2ZSBhIG1ldGhvZCBuYW1lZCBcIicgKyBtZXRob2QgKyAnXCInKTtcbiAgfSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGludm9rZXI7IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBfaGFzIGZyb20gJy4vaW50ZXJuYWwvX2hhcy5qcyc7XG5pbXBvcnQgX2lzQXJndW1lbnRzIGZyb20gJy4vaW50ZXJuYWwvX2lzQXJndW1lbnRzLmpzJztcblxuLy8gY292ZXIgSUUgPCA5IGtleXMgaXNzdWVzXG52YXIgaGFzRW51bUJ1ZyA9ICEgLyojX19QVVJFX18qL3sgdG9TdHJpbmc6IG51bGwgfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbnZhciBub25FbnVtZXJhYmxlUHJvcHMgPSBbJ2NvbnN0cnVjdG9yJywgJ3ZhbHVlT2YnLCAnaXNQcm90b3R5cGVPZicsICd0b1N0cmluZycsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICdoYXNPd25Qcm9wZXJ0eScsICd0b0xvY2FsZVN0cmluZyddO1xuLy8gU2FmYXJpIGJ1Z1xudmFyIGhhc0FyZ3NFbnVtQnVnID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHJldHVybiBhcmd1bWVudHMucHJvcGVydHlJc0VudW1lcmFibGUoJ2xlbmd0aCcpO1xufSgpO1xuXG52YXIgY29udGFpbnMgPSBmdW5jdGlvbiBjb250YWlucyhsaXN0LCBpdGVtKSB7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICBpZiAobGlzdFtpZHhdID09PSBpdGVtKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBjb250YWluaW5nIHRoZSBuYW1lcyBvZiBhbGwgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgb2ZcbiAqIHRoZSBzdXBwbGllZCBvYmplY3QuXG4gKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudFxuICogYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiBba11cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHByb3BlcnRpZXMgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAqIEBzZWUgUi5rZXlzSW4sIFIudmFsdWVzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5rZXlzKHthOiAxLCBiOiAyLCBjOiAzfSk7IC8vPT4gWydhJywgJ2InLCAnYyddXG4gKi9cbnZhciBrZXlzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmICFoYXNBcmdzRW51bUJ1ZyA/IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGtleXMob2JqKSB7XG4gIHJldHVybiBPYmplY3Qob2JqKSAhPT0gb2JqID8gW10gOiBPYmplY3Qua2V5cyhvYmopO1xufSkgOiAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBrZXlzKG9iaikge1xuICBpZiAoT2JqZWN0KG9iaikgIT09IG9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICB2YXIgcHJvcCwgbklkeDtcbiAgdmFyIGtzID0gW107XG4gIHZhciBjaGVja0FyZ3NMZW5ndGggPSBoYXNBcmdzRW51bUJ1ZyAmJiBfaXNBcmd1bWVudHMob2JqKTtcbiAgZm9yIChwcm9wIGluIG9iaikge1xuICAgIGlmIChfaGFzKHByb3AsIG9iaikgJiYgKCFjaGVja0FyZ3NMZW5ndGggfHwgcHJvcCAhPT0gJ2xlbmd0aCcpKSB7XG4gICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICB9XG4gIH1cbiAgaWYgKGhhc0VudW1CdWcpIHtcbiAgICBuSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKG5JZHggPj0gMCkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tuSWR4XTtcbiAgICAgIGlmIChfaGFzKHByb3AsIG9iaikgJiYgIWNvbnRhaW5zKGtzLCBwcm9wKSkge1xuICAgICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgIH1cbiAgICAgIG5JZHggLT0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtzO1xufSk7XG5leHBvcnQgZGVmYXVsdCBrZXlzOyIsImltcG9ydCBfY29tcGxlbWVudCBmcm9tICcuL2ludGVybmFsL19jb21wbGVtZW50LmpzJztcbmltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgZmlsdGVyIGZyb20gJy4vZmlsdGVyLmpzJztcblxuLyoqXG4gKiBUaGUgY29tcGxlbWVudCBvZiBbYGZpbHRlcmBdKCNmaWx0ZXIpLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi4gRmlsdGVyYWJsZVxuICogb2JqZWN0cyBpbmNsdWRlIHBsYWluIG9iamVjdHMgb3IgYW55IG9iamVjdCB0aGF0IGhhcyBhIGZpbHRlciBtZXRob2Qgc3VjaFxuICogYXMgYEFycmF5YC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5maWx0ZXIsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgaXNPZGQgPSAobikgPT4gbiAlIDIgPT09IDE7XG4gKlxuICogICAgICBSLnJlamVjdChpc09kZCwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAqXG4gKiAgICAgIFIucmVqZWN0KGlzT2RkLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBkOiA0fVxuICovXG52YXIgcmVqZWN0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcmVqZWN0KHByZWQsIGZpbHRlcmFibGUpIHtcbiAgcmV0dXJuIGZpbHRlcihfY29tcGxlbWVudChwcmVkKSwgZmlsdGVyYWJsZSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IHJlamVjdDsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IF90b1N0cmluZyBmcm9tICcuL2ludGVybmFsL190b1N0cmluZy5qcyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiB2YWx1ZS4gYGV2YWxgJ2luZyB0aGUgb3V0cHV0XG4gKiBzaG91bGQgcmVzdWx0IGluIGEgdmFsdWUgZXF1aXZhbGVudCB0byB0aGUgaW5wdXQgdmFsdWUuIE1hbnkgb2YgdGhlIGJ1aWx0LWluXG4gKiBgdG9TdHJpbmdgIG1ldGhvZHMgZG8gbm90IHNhdGlzZnkgdGhpcyByZXF1aXJlbWVudC5cbiAqXG4gKiBJZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYFtvYmplY3QgT2JqZWN0XWAgd2l0aCBhIGB0b1N0cmluZ2AgbWV0aG9kIG90aGVyXG4gKiB0aGFuIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCwgdGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aXRoIG5vIGFyZ3VtZW50c1xuICogdG8gcHJvZHVjZSB0aGUgcmV0dXJuIHZhbHVlLiBUaGlzIG1lYW5zIHVzZXItZGVmaW5lZCBjb25zdHJ1Y3RvciBmdW5jdGlvbnNcbiAqIGNhbiBwcm92aWRlIGEgc3VpdGFibGUgYHRvU3RyaW5nYCBtZXRob2QuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gKiAgICAgICB0aGlzLnggPSB4O1xuICogICAgICAgdGhpcy55ID0geTtcbiAqICAgICB9XG4gKlxuICogICAgIFBvaW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuICduZXcgUG9pbnQoJyArIHRoaXMueCArICcsICcgKyB0aGlzLnkgKyAnKSc7XG4gKiAgICAgfTtcbiAqXG4gKiAgICAgUi50b1N0cmluZyhuZXcgUG9pbnQoMSwgMikpOyAvLz0+ICduZXcgUG9pbnQoMSwgMiknXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyAqIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRvU3RyaW5nKDQyKTsgLy89PiAnNDInXG4gKiAgICAgIFIudG9TdHJpbmcoJ2FiYycpOyAvLz0+ICdcImFiY1wiJ1xuICogICAgICBSLnRvU3RyaW5nKFsxLCAyLCAzXSk7IC8vPT4gJ1sxLCAyLCAzXSdcbiAqICAgICAgUi50b1N0cmluZyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30pOyAvLz0+ICd7XCJiYXJcIjogMiwgXCJiYXpcIjogMywgXCJmb29cIjogMX0nXG4gKiAgICAgIFIudG9TdHJpbmcobmV3IERhdGUoJzIwMDEtMDItMDNUMDQ6MDU6MDZaJykpOyAvLz0+ICduZXcgRGF0ZShcIjIwMDEtMDItMDNUMDQ6MDU6MDYuMDAwWlwiKSdcbiAqL1xudmFyIHRvU3RyaW5nID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdG9TdHJpbmcodmFsKSB7XG4gIHJldHVybiBfdG9TdHJpbmcodmFsLCBbXSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IHRvU3RyaW5nOyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5cbi8qKlxuICogR2l2ZXMgYSBzaW5nbGUtd29yZCBzdHJpbmcgZGVzY3JpcHRpb24gb2YgdGhlIChuYXRpdmUpIHR5cGUgb2YgYSB2YWx1ZSxcbiAqIHJldHVybmluZyBzdWNoIGFuc3dlcnMgYXMgJ09iamVjdCcsICdOdW1iZXInLCAnQXJyYXknLCBvciAnTnVsbCcuIERvZXMgbm90XG4gKiBhdHRlbXB0IHRvIGRpc3Rpbmd1aXNoIHVzZXIgT2JqZWN0IHR5cGVzIGFueSBmdXJ0aGVyLCByZXBvcnRpbmcgdGhlbSBhbGwgYXNcbiAqICdPYmplY3QnLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKCogLT4geyp9KSAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50eXBlKHt9KTsgLy89PiBcIk9iamVjdFwiXG4gKiAgICAgIFIudHlwZSgxKTsgLy89PiBcIk51bWJlclwiXG4gKiAgICAgIFIudHlwZShmYWxzZSk7IC8vPT4gXCJCb29sZWFuXCJcbiAqICAgICAgUi50eXBlKCdzJyk7IC8vPT4gXCJTdHJpbmdcIlxuICogICAgICBSLnR5cGUobnVsbCk7IC8vPT4gXCJOdWxsXCJcbiAqICAgICAgUi50eXBlKFtdKTsgLy89PiBcIkFycmF5XCJcbiAqICAgICAgUi50eXBlKC9bQS16XS8pOyAvLz0+IFwiUmVnRXhwXCJcbiAqICAgICAgUi50eXBlKCgpID0+IHt9KTsgLy89PiBcIkZ1bmN0aW9uXCJcbiAqICAgICAgUi50eXBlKHVuZGVmaW5lZCk7IC8vPT4gXCJVbmRlZmluZWRcIlxuICovXG52YXIgdHlwZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHR5cGUodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IG51bGwgPyAnTnVsbCcgOiB2YWwgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xufSk7XG5leHBvcnQgZGVmYXVsdCB0eXBlOyIsImltcG9ydCB7IHZub2RlIH0gZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaChzZWwsIGIsIGMpIHtcbiAgICB2YXIgZGF0YSA9IHt9LCBjaGlsZHJlbiwgdGV4dCwgaTtcbiAgICBpZiAoYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRhdGEgPSBiO1xuICAgICAgICBpZiAoaXMuYXJyYXkoYykpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHtcbiAgICAgICAgICAgIHRleHQgPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgJiYgYy5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2NdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXMuYXJyYXkoYikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYikpIHtcbiAgICAgICAgICAgIHRleHQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIgJiYgYi5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2JdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaXMucHJpbWl0aXZlKGNoaWxkcmVuW2ldKSlcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IHZub2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuO1xuZXhwb3J0IGRlZmF1bHQgaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0IHZhciBodG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0IGRlZmF1bHQgaHRtbERvbUFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxkb21hcGkuanMubWFwIiwiZXhwb3J0IHZhciBhcnJheSA9IEFycmF5LmlzQXJyYXk7XG5leHBvcnQgZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLmpzLm1hcCIsImltcG9ydCB2bm9kZSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCAqIGFzIGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGh0bWxEb21BcGkgZnJvbSAnLi9odG1sZG9tYXBpJztcbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cbnZhciBlbXB0eU5vZGUgPSB2bm9kZSgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbmV4cG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZXhwb3J0IHsgdGh1bmsgfSBmcm9tICcuL3RodW5rJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sRG9tQXBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaG9vayA9IG1vZHVsZXNbal1baG9va3NbaV1dO1xuICAgICAgICAgICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNic1tob29rc1tpXV0ucHVzaChob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbXB0eU5vZGVBdChlbG0pIHtcbiAgICAgICAgdmFyIGlkID0gZWxtLmlkID8gJyMnICsgZWxtLmlkIDogJyc7XG4gICAgICAgIHZhciBjID0gZWxtLmNsYXNzTmFtZSA/ICcuJyArIGVsbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcbiAgICAgICAgcmV0dXJuIHZub2RlKGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSArIGlkICsgYywge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcm1DYigpIHtcbiAgICAgICAgICAgIGlmICgtLWxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50XzEsIGNoaWxkRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiwgc2VsID0gdm5vZGUuc2VsO1xuICAgICAgICBpZiAoc2VsID09PSAnIScpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICAgICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgICAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IGlzRGVmKGRhdGEpICYmIGlzRGVmKGkgPSBkYXRhLm5zKSA/IGFwaS5jcmVhdGVFbGVtZW50TlMoaSwgdGFnKVxuICAgICAgICAgICAgICAgIDogYXBpLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgICAgIGlmIChoYXNoIDwgZG90KVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpKTtcbiAgICAgICAgICAgIGlmIChkb3RJZHggPiAwKVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgc2VsLnNsaWNlKGRvdCArIDEpLnJlcGxhY2UoL1xcLi9nLCAnICcpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgICAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgICAgICB2YXIgb2xkS2V5VG9JZHg7XG4gICAgICAgIHZhciBpZHhJbk9sZDtcbiAgICAgICAgdmFyIGVsbVRvTW92ZTtcbiAgICAgICAgdmFyIGJlZm9yZTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07IC8vIFZub2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvbGRFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhvbGRFbmRWbm9kZS5lbG0pKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkge1xuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCB8fCBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ld0NoW25ld0VuZElkeCArIDFdID09IG51bGwgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgaG9vaztcbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhKSAmJiBpc0RlZihob29rID0gaS5ob29rKSAmJiBpc0RlZihpID0gaG9vay5wcmVwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2bm9kZS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSlcbiAgICAgICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoICE9PSBjaClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMoZWxtLCBudWxsLCBjaCwgMCwgY2gubGVuZ3RoIC0gMSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCB2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEZWYoaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucG9zdHBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwYXRjaChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGVsbSwgcGFyZW50O1xuICAgICAgICB2YXIgaW5zZXJ0ZWRWbm9kZVF1ZXVlID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucHJlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnByZVtpXSgpO1xuICAgICAgICBpZiAoIWlzVm5vZGUob2xkVm5vZGUpKSB7XG4gICAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICAgICAgcGFyZW50ID0gYXBpLnBhcmVudE5vZGUoZWxtKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudCwgdm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcoZWxtKSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudCwgW29sZFZub2RlXSwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGluc2VydGVkVm5vZGVRdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQoaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnBvc3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucG9zdFtpXSgpO1xuICAgICAgICByZXR1cm4gdm5vZGU7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNuYWJiZG9tLmpzLm1hcCIsImltcG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG9sZEFyZ3NbaV0gIT09IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weVRvVGh1bmsob2xkVm5vZGUsIHRodW5rKTtcbn1cbmV4cG9ydCB2YXIgdGh1bmsgPSBmdW5jdGlvbiB0aHVuayhzZWwsIGtleSwgZm4sIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBmbjtcbiAgICAgICAgZm4gPSBrZXk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCB0aHVuaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRodW5rLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnQgZGVmYXVsdCB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBpcyA9IHJlcXVpcmUoXCIuL2lzXCIpO1xuZnVuY3Rpb24gYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCkge1xuICAgIGRhdGEubnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGlmIChzZWwgIT09ICdmb3JlaWduT2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZERhdGEgPSBjaGlsZHJlbltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGNoaWxkRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWRkTlMoY2hpbGREYXRhLCBjaGlsZHJlbltpXS5jaGlsZHJlbiwgY2hpbGRyZW5baV0uc2VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGlzLnByaW1pdGl2ZShjaGlsZHJlbltpXSkpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB2bm9kZV8xLnZub2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZV8xLnZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLmggPSBoO1xuO1xuZXhwb3J0cy5kZWZhdWx0ID0gaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudCh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dCk7XG59XG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xufVxuZnVuY3Rpb24gbmV4dFNpYmxpbmcobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xufVxuZnVuY3Rpb24gdGFnTmFtZShlbG0pIHtcbiAgICByZXR1cm4gZWxtLnRhZ05hbWU7XG59XG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChub2RlLCB0ZXh0KSB7XG4gICAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5mdW5jdGlvbiBnZXRUZXh0Q29udGVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQ7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxO1xufVxuZnVuY3Rpb24gaXNUZXh0KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMztcbn1cbmZ1bmN0aW9uIGlzQ29tbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDg7XG59XG5leHBvcnRzLmh0bWxEb21BcGkgPSB7XG4gICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcbiAgICBjcmVhdGVUZXh0Tm9kZTogY3JlYXRlVGV4dE5vZGUsXG4gICAgY3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcbiAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcbiAgICByZW1vdmVDaGlsZDogcmVtb3ZlQ2hpbGQsXG4gICAgYXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgbmV4dFNpYmxpbmc6IG5leHRTaWJsaW5nLFxuICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuICAgIGdldFRleHRDb250ZW50OiBnZXRUZXh0Q29udGVudCxcbiAgICBpc0VsZW1lbnQ6IGlzRWxlbWVudCxcbiAgICBpc1RleHQ6IGlzVGV4dCxcbiAgICBpc0NvbW1lbnQ6IGlzQ29tbWVudCxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcnJheSA9IEFycmF5LmlzQXJyYXk7XG5mdW5jdGlvbiBwcmltaXRpdmUocykge1xuICAgIHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHMgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5wcmltaXRpdmUgPSBwcmltaXRpdmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB4bGlua05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xudmFyIHhtbE5TID0gJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSc7XG52YXIgY29sb25DaGFyID0gNTg7XG52YXIgeENoYXIgPSAxMjA7XG5mdW5jdGlvbiB1cGRhdGVBdHRycyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBlbG0gPSB2bm9kZS5lbG0sIG9sZEF0dHJzID0gb2xkVm5vZGUuZGF0YS5hdHRycywgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzO1xuICAgIGlmICghb2xkQXR0cnMgJiYgIWF0dHJzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZEF0dHJzID09PSBhdHRycylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZEF0dHJzID0gb2xkQXR0cnMgfHwge307XG4gICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICAvLyB1cGRhdGUgbW9kaWZpZWQgYXR0cmlidXRlcywgYWRkIG5ldyBhdHRyaWJ1dGVzXG4gICAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgdmFyIGN1ciA9IGF0dHJzW2tleV07XG4gICAgICAgIHZhciBvbGQgPSBvbGRBdHRyc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIpIHtcbiAgICAgICAgICAgIGlmIChjdXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKGtleSwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjdXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5jaGFyQ29kZUF0KDApICE9PSB4Q2hhcikge1xuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5LmNoYXJDb2RlQXQoMykgPT09IGNvbG9uQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgeG1sIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlTlMoeG1sTlMsIGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5LmNoYXJDb2RlQXQoNSkgPT09IGNvbG9uQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgeGxpbmsgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlbW92ZWQgYXR0cmlidXRlc1xuICAgIC8vIHVzZSBgaW5gIG9wZXJhdG9yIHNpbmNlIHRoZSBwcmV2aW91cyBgZm9yYCBpdGVyYXRpb24gdXNlcyBpdCAoLmkuZS4gYWRkIGV2ZW4gYXR0cmlidXRlcyB3aXRoIHVuZGVmaW5lZCB2YWx1ZSlcbiAgICAvLyB0aGUgb3RoZXIgb3B0aW9uIGlzIHRvIHJlbW92ZSBhbGwgYXR0cmlidXRlcyB3aXRoIHZhbHVlID09IHVuZGVmaW5lZFxuICAgIGZvciAoa2V5IGluIG9sZEF0dHJzKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBhdHRycykpIHtcbiAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuYXR0cmlidXRlc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVBdHRycywgdXBkYXRlOiB1cGRhdGVBdHRycyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5hdHRyaWJ1dGVzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXR0cmlidXRlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZUNsYXNzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBjdXIsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgb2xkQ2xhc3MgPSBvbGRWbm9kZS5kYXRhLmNsYXNzLCBrbGFzcyA9IHZub2RlLmRhdGEuY2xhc3M7XG4gICAgaWYgKCFvbGRDbGFzcyAmJiAha2xhc3MpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQ2xhc3MgPT09IGtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkQ2xhc3MgPSBvbGRDbGFzcyB8fCB7fTtcbiAgICBrbGFzcyA9IGtsYXNzIHx8IHt9O1xuICAgIGZvciAobmFtZSBpbiBvbGRDbGFzcykge1xuICAgICAgICBpZiAoIWtsYXNzW25hbWVdKSB7XG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4ga2xhc3MpIHtcbiAgICAgICAgY3VyID0ga2xhc3NbbmFtZV07XG4gICAgICAgIGlmIChjdXIgIT09IG9sZENsYXNzW25hbWVdKSB7XG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0W2N1ciA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5jbGFzc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVDbGFzcywgdXBkYXRlOiB1cGRhdGVDbGFzcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5jbGFzc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsYXNzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaW52b2tlSGFuZGxlcihoYW5kbGVyLCB2bm9kZSwgZXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBjYWxsIGZ1bmN0aW9uIGhhbmRsZXJcbiAgICAgICAgaGFuZGxlci5jYWxsKHZub2RlLCBldmVudCwgdm5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAvLyBjYWxsIGhhbmRsZXIgd2l0aCBhcmd1bWVudHNcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyWzBdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3Igc2luZ2xlIGFyZ3VtZW50IGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgaWYgKGhhbmRsZXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5jYWxsKHZub2RlLCBoYW5kbGVyWzFdLCBldmVudCwgdm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBoYW5kbGVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyWzBdLmFwcGx5KHZub2RlLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGwgbXVsdGlwbGUgaGFuZGxlcnNcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGludm9rZUhhbmRsZXIoaGFuZGxlcltpXSwgdm5vZGUsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50LCB2bm9kZSkge1xuICAgIHZhciBuYW1lID0gZXZlbnQudHlwZSwgb24gPSB2bm9kZS5kYXRhLm9uO1xuICAgIC8vIGNhbGwgZXZlbnQgaGFuZGxlcihzKSBpZiBleGlzdHNcbiAgICBpZiAob24gJiYgb25bbmFtZV0pIHtcbiAgICAgICAgaW52b2tlSGFuZGxlcihvbltuYW1lXSwgdm5vZGUsIGV2ZW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVMaXN0ZW5lcigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICBoYW5kbGVFdmVudChldmVudCwgaGFuZGxlci52bm9kZSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUV2ZW50TGlzdGVuZXJzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvbGRPbiA9IG9sZFZub2RlLmRhdGEub24sIG9sZExpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIsIG9sZEVsbSA9IG9sZFZub2RlLmVsbSwgb24gPSB2bm9kZSAmJiB2bm9kZS5kYXRhLm9uLCBlbG0gPSAodm5vZGUgJiYgdm5vZGUuZWxtKSwgbmFtZTtcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIHJldXNlZCBpbW11dGFibGUgaGFuZGxlcnNcbiAgICBpZiAob2xkT24gPT09IG9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGxpc3RlbmVycyB3aGljaCBubyBsb25nZXIgdXNlZFxuICAgIGlmIChvbGRPbiAmJiBvbGRMaXN0ZW5lcikge1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgZGVsZXRlZCB3ZSByZW1vdmUgYWxsIGV4aXN0aW5nIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgZXhpc3RpbmcgbGlzdGVuZXJzIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGV4aXN0aW5nIGxpc3RlbmVyIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEVsbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIG9sZExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCBuZXcgbGlzdGVuZXJzIHdoaWNoIGhhcyBub3QgYWxyZWFkeSBhdHRhY2hlZFxuICAgIGlmIChvbikge1xuICAgICAgICAvLyByZXVzZSBleGlzdGluZyBsaXN0ZW5lciBvciBjcmVhdGUgbmV3XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHZub2RlLmxpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIgfHwgY3JlYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gdXBkYXRlIHZub2RlIGZvciBsaXN0ZW5lclxuICAgICAgICBsaXN0ZW5lci52bm9kZSA9IHZub2RlO1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgYWRkZWQgd2UgYWRkIGFsbCBuZWVkZWQgbGlzdGVuZXJzIHVuY29uZGl0aW9uYWxseVxuICAgICAgICBpZiAoIW9sZE9uKSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgZWxlbWVudCB3YXMgY2hhbmdlZCBvciBuZXcgbGlzdGVuZXJzIGFkZGVkXG4gICAgICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbikge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lciBpZiBuZXcgbGlzdGVuZXIgYWRkZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9sZE9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZSA9IHtcbiAgICBjcmVhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIHVwZGF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZGVzdHJveTogdXBkYXRlRXZlbnRMaXN0ZW5lcnNcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmV2ZW50TGlzdGVuZXJzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRsaXN0ZW5lcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLCBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEucHJvcHMsIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcztcbiAgICBpZiAoIW9sZFByb3BzICYmICFwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRQcm9wcyA9PT0gcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRQcm9wcyA9IG9sZFByb3BzIHx8IHt9O1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wc1trZXldKSB7XG4gICAgICAgICAgICBkZWxldGUgZWxtW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAgICAgb2xkID0gb2xkUHJvcHNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyICYmIChrZXkgIT09ICd2YWx1ZScgfHwgZWxtW2tleV0gIT09IGN1cikpIHtcbiAgICAgICAgICAgIGVsbVtrZXldID0gY3VyO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5wcm9wc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVQcm9wcywgdXBkYXRlOiB1cGRhdGVQcm9wcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5wcm9wc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gQmluZGlnIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGxpa2UgdGhpcyBmaXhlcyBhIGJ1ZyBpbiBJRS9FZGdlLiBTZWUgIzM2MCBhbmQgIzQwOS5cbnZhciByYWYgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpLmJpbmQod2luZG93KSkgfHwgc2V0VGltZW91dDtcbnZhciBuZXh0RnJhbWUgPSBmdW5jdGlvbiAoZm4pIHsgcmFmKGZ1bmN0aW9uICgpIHsgcmFmKGZuKTsgfSk7IH07XG52YXIgcmVmbG93Rm9yY2VkID0gZmFsc2U7XG5mdW5jdGlvbiBzZXROZXh0RnJhbWUob2JqLCBwcm9wLCB2YWwpIHtcbiAgICBuZXh0RnJhbWUoZnVuY3Rpb24gKCkgeyBvYmpbcHJvcF0gPSB2YWw7IH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlU3R5bGUob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGN1ciwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBvbGRTdHlsZSA9IG9sZFZub2RlLmRhdGEuc3R5bGUsIHN0eWxlID0gdm5vZGUuZGF0YS5zdHlsZTtcbiAgICBpZiAoIW9sZFN0eWxlICYmICFzdHlsZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRTdHlsZSA9PT0gc3R5bGUpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRTdHlsZSA9IG9sZFN0eWxlIHx8IHt9O1xuICAgIHN0eWxlID0gc3R5bGUgfHwge307XG4gICAgdmFyIG9sZEhhc0RlbCA9ICdkZWxheWVkJyBpbiBvbGRTdHlsZTtcbiAgICBmb3IgKG5hbWUgaW4gb2xkU3R5bGUpIHtcbiAgICAgICAgaWYgKCFzdHlsZVtuYW1lXSkge1xuICAgICAgICAgICAgaWYgKG5hbWVbMF0gPT09ICctJyAmJiBuYW1lWzFdID09PSAnLScpIHtcbiAgICAgICAgICAgICAgICBlbG0uc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbG0uc3R5bGVbbmFtZV0gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgY3VyID0gc3R5bGVbbmFtZV07XG4gICAgICAgIGlmIChuYW1lID09PSAnZGVsYXllZCcgJiYgc3R5bGUuZGVsYXllZCkge1xuICAgICAgICAgICAgZm9yICh2YXIgbmFtZTIgaW4gc3R5bGUuZGVsYXllZCkge1xuICAgICAgICAgICAgICAgIGN1ciA9IHN0eWxlLmRlbGF5ZWRbbmFtZTJdO1xuICAgICAgICAgICAgICAgIGlmICghb2xkSGFzRGVsIHx8IGN1ciAhPT0gb2xkU3R5bGUuZGVsYXllZFtuYW1lMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0TmV4dEZyYW1lKGVsbS5zdHlsZSwgbmFtZTIsIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgIT09ICdyZW1vdmUnICYmIGN1ciAhPT0gb2xkU3R5bGVbbmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzBdID09PSAnLScgJiYgbmFtZVsxXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGN1cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbG0uc3R5bGVbbmFtZV0gPSBjdXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBhcHBseURlc3Ryb3lTdHlsZSh2bm9kZSkge1xuICAgIHZhciBzdHlsZSwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBzID0gdm5vZGUuZGF0YS5zdHlsZTtcbiAgICBpZiAoIXMgfHwgIShzdHlsZSA9IHMuZGVzdHJveSkpXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKG5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gc3R5bGVbbmFtZV07XG4gICAgfVxufVxuZnVuY3Rpb24gYXBwbHlSZW1vdmVTdHlsZSh2bm9kZSwgcm0pIHtcbiAgICB2YXIgcyA9IHZub2RlLmRhdGEuc3R5bGU7XG4gICAgaWYgKCFzIHx8ICFzLnJlbW92ZSkge1xuICAgICAgICBybSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcmVmbG93Rm9yY2VkKSB7XG4gICAgICAgIGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkudHJhbnNmb3JtO1xuICAgICAgICByZWZsb3dGb3JjZWQgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBpID0gMCwgY29tcFN0eWxlLCBzdHlsZSA9IHMucmVtb3ZlLCBhbW91bnQgPSAwLCBhcHBsaWVkID0gW107XG4gICAgZm9yIChuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGFwcGxpZWQucHVzaChuYW1lKTtcbiAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gc3R5bGVbbmFtZV07XG4gICAgfVxuICAgIGNvbXBTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxtKTtcbiAgICB2YXIgcHJvcHMgPSBjb21wU3R5bGVbJ3RyYW5zaXRpb24tcHJvcGVydHknXS5zcGxpdCgnLCAnKTtcbiAgICBmb3IgKDsgaSA8IHByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChhcHBsaWVkLmluZGV4T2YocHJvcHNbaV0pICE9PSAtMSlcbiAgICAgICAgICAgIGFtb3VudCsrO1xuICAgIH1cbiAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoZXYudGFyZ2V0ID09PSBlbG0pXG4gICAgICAgICAgICAtLWFtb3VudDtcbiAgICAgICAgaWYgKGFtb3VudCA9PT0gMClcbiAgICAgICAgICAgIHJtKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmb3JjZVJlZmxvdygpIHtcbiAgICByZWZsb3dGb3JjZWQgPSBmYWxzZTtcbn1cbmV4cG9ydHMuc3R5bGVNb2R1bGUgPSB7XG4gICAgcHJlOiBmb3JjZVJlZmxvdyxcbiAgICBjcmVhdGU6IHVwZGF0ZVN0eWxlLFxuICAgIHVwZGF0ZTogdXBkYXRlU3R5bGUsXG4gICAgZGVzdHJveTogYXBwbHlEZXN0cm95U3R5bGUsXG4gICAgcmVtb3ZlOiBhcHBseVJlbW92ZVN0eWxlXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5zdHlsZU1vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0eWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHZub2RlXzEgPSByZXF1aXJlKFwiLi92bm9kZVwiKTtcbnZhciBodG1sZG9tYXBpXzEgPSByZXF1aXJlKFwiLi9odG1sZG9tYXBpXCIpO1xuZnVuY3Rpb24gdG9WTm9kZShub2RlLCBkb21BcGkpIHtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sZG9tYXBpXzEuZGVmYXVsdDtcbiAgICB2YXIgdGV4dDtcbiAgICBpZiAoYXBpLmlzRWxlbWVudChub2RlKSkge1xuICAgICAgICB2YXIgaWQgPSBub2RlLmlkID8gJyMnICsgbm9kZS5pZCA6ICcnO1xuICAgICAgICB2YXIgY24gPSBub2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgdmFyIGMgPSBjbiA/ICcuJyArIGNuLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHZhciBzZWwgPSBhcGkudGFnTmFtZShub2RlKS50b0xvd2VyQ2FzZSgpICsgaWQgKyBjO1xuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgICAgIHZhciBuYW1lXzE7XG4gICAgICAgIHZhciBpID0gdm9pZCAwLCBuID0gdm9pZCAwO1xuICAgICAgICB2YXIgZWxtQXR0cnMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgICAgIHZhciBlbG1DaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUF0dHJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbmFtZV8xID0gZWxtQXR0cnNbaV0ubm9kZU5hbWU7XG4gICAgICAgICAgICBpZiAobmFtZV8xICE9PSAnaWQnICYmIG5hbWVfMSAhPT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgICAgIGF0dHJzW25hbWVfMV0gPSBlbG1BdHRyc1tpXS5ub2RlVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGVsbUNoaWxkcmVuLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0b1ZOb2RlKGVsbUNoaWxkcmVuW2ldLCBkb21BcGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KHNlbCwgeyBhdHRyczogYXR0cnMgfSwgY2hpbGRyZW4sIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFwaS5pc1RleHQobm9kZSkpIHtcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0ZXh0LCBub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYXBpLmlzQ29tbWVudChub2RlKSkge1xuICAgICAgICB0ZXh0ID0gYXBpLmdldFRleHRDb250ZW50KG5vZGUpO1xuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KCchJywge30sIFtdLCB0ZXh0LCBub2RlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG59XG5leHBvcnRzLnRvVk5vZGUgPSB0b1ZOb2RlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdG9WTm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvdm5vZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnRzLnZub2RlID0gdm5vZGU7XG5leHBvcnRzLmRlZmF1bHQgPSB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcCIsInZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIik7XG5cbmlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xufVxuXG52YXIgb3B0aW9ucyA9IHt9XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmIChjb250ZW50LmxvY2Fscykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlcyA9IFtdO1xuICB2YXIgbmV3U3R5bGVzID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjc3MgPSBpdGVtWzFdO1xuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl07XG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfTtcblxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBwYXJ0czogW3BhcnRdXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldO1xuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuICAgIHZhciBqID0gMDtcblxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrO1xuXG4gICAgICBmb3IgKDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge1xuICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgcmVmczogMSxcbiAgICAgICAgcGFydHM6IHBhcnRzXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIG9wdGlvbnMuYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKG9wdGlvbnMuYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgb3B0aW9ucy5hdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuYXR0cmlidXRlcyA9IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICdvYmplY3QnID8gb3B0aW9ucy5hdHRyaWJ1dGVzIDoge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldO1xuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cbiAgICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgICBkb21TdHlsZS5yZWZzLS07XG4gICAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgdmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcbiAgICAgIGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1heVJlbW92ZS5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfZG9tU3R5bGUgPSBtYXlSZW1vdmVbX2ldO1xuXG4gICAgICBpZiAoX2RvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBfZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBfZG9tU3R5bGUucGFydHNbal0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtfZG9tU3R5bGUuaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07IiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5jb25zdCBmbHlkID0gcmVxdWlyZSgnZmx5ZCcpO1xuY29uc3Qgc25hYmJkb20gPSByZXF1aXJlKCdzbmFiYmRvbScpO1xuY29uc3QgcGF0Y2ggPSBzbmFiYmRvbS5pbml0KFsgLy8gSW5pdCBwYXRjaCBmdW5jdGlvbiB3aXRoIGNob3NlbiBtb2R1bGVzXG4gIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvY2xhc3MnKS5kZWZhdWx0LCAvLyBtYWtlcyBpdCBlYXN5IHRvIHRvZ2dsZSBjbGFzc2VzXG4gIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvcHJvcHMnKS5kZWZhdWx0LCAvLyBmb3Igc2V0dGluZyBwcm9wZXJ0aWVzIG9uIERPTSBlbGVtZW50c1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL3N0eWxlJykuZGVmYXVsdCwgLy8gaGFuZGxlcyBzdHlsaW5nIG9uIGVsZW1lbnRzIHdpdGggc3VwcG9ydCBmb3IgYW5pbWF0aW9uc1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMnKS5kZWZhdWx0LCAvLyBmb3Igc2V0dGluZyBhdHRyaWJ1dGVzIG9uIERPTSBlbGVtZW50c1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzJykuZGVmYXVsdCwgLy8gYXR0YWNoZXMgZXZlbnQgbGlzdGVuZXJzXG5dKTtcbmNvbnN0IGggPSByZXF1aXJlKCdzbmFiYmRvbS9oJykuZGVmYXVsdDsgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBjcmVhdGluZyB2bm9kZXNcbmNvbnN0IHRvVk5vZGUgPSByZXF1aXJlKCdzbmFiYmRvbS90b3Zub2RlJykuZGVmYXVsdDtcblxuY29uc3QgcXMgPSBSLmludm9rZXIoMSwgJ3F1ZXJ5U2VsZWN0b3InKTtcbmNvbnN0IHFzQWxsID0gUi5pbnZva2VyKDEsICdxdWVyeVNlbGVjdG9yQWxsJyk7XG5cbmNvbnN0IGwgPSBSLmN1cnJ5KCh0YWcsIHgpID0+IHtjb25zb2xlLmxvZyh0YWcsIHgpOyByZXR1cm4geH0pXG5cbmNvbnN0IG9uUmVhZHkgPSAoY2IpID0+IHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIlxuICAgICAgIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGVkXCJcbiAgICAgICB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICBjYi5iaW5kKHRoaXMpKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiLmJpbmQodGhpcykpO1xuICB9XG59XG5cbmNvbnN0IG1vdW50ZXJGb3IgPSAoQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IHt2aWV3LCB1cGRhdGV9ID0gQ29tcG9uZW50O1xuICByZXR1cm4gKGluaXRpYWxTdGF0ZSwgY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgYWN0aW9uJCA9IGZseWQuc3RyZWFtKCk7XG4gICAgY29uc3QgbW9kZWwkID0gZmx5ZC5zY2FuKFIuZmxpcCh1cGRhdGUpLCBpbml0aWFsU3RhdGUsIGFjdGlvbiQpO1xuICAgIGNvbnN0IHZub2RlJCA9IGZseWQubWFwKHZpZXcoYWN0aW9uJCksIG1vZGVsJCk7XG4gICAgZmx5ZC5zY2FuKHBhdGNoLCBjb250YWluZXIsIHZub2RlJCk7XG4gIH1cbn1cblxuY29uc3Qgbm9GUlBNb3VudGVyRm9yID0gKENvbXBvbmVudCkgPT4ge1xuICBjb25zdCB7dmlldywgdXBkYXRlfSA9IENvbXBvbmVudDtcbiAgcmV0dXJuIChvbGRTdGF0ZSwgb2xkVm5vZGUpID0+IHtcbiAgICBjb25zdCBuZXdWbm9kZSA9IHZpZXcoKGFjdGlvbikgPT4ge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB1cGRhdGUob2xkU3RhdGUsIGFjdGlvbik7XG4gICAgICBydW4obmV3U3RhdGUsIG5ld1Zub2RlKTtcbiAgICB9LCBvbGRTdGF0ZSk7XG4gICAgcGF0Y2gob2xkVm5vZGUsIG5ld1Zub2RlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBwYXRjaCwgb25SZWFkeSwgbW91bnRlckZvciwgdG9WTm9kZSwgaCwgbCwgcXN9O1xuZXhwb3J0IHtcbiAgcXMsXG4gIHFzQWxsLFxuICBvblJlYWR5LFxuICBtb3VudGVyRm9yLFxuICB0b1ZOb2RlLFxuICBwYXRjaCxcbiAgaCxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBvblJlYWR5IH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgJy4uLy4uL2luZGV4Lmh0bWwnO1xuaW1wb3J0ICcuLi8uLi9pbmRleC5jc3MnO1xuXG5vblJlYWR5KCgpID0+IHtcbiAgY29uc3QgaW50ZXJzdGl0aWFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWludGVyc3RpdGlhbCcpO1xuICBpbnRlcnN0aXRpYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaW50ZXJzdGl0aWFsLmlubmVyVGV4dCA9ICdzbGljayc7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gaW50ZXJzdGl0aWFsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWRpc21pc3NlZCcpLCAzMDApO1xuICB9KTtcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9