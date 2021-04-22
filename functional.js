/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Tabs.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Tabs.css ***!
  \************************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.id, ".Tabs\n{\n  padding: 20px;\n  margin: 20px;\n  outline: 1px solid gray;\n  font-size: 18px;\n  width: 75%;\n}\n\n.Tabs-body\n{\n  display: none;\n}\n\n.Tabs-body.is-active\n{\n  display: block;\n}\n\n.Tabs-buttons\n{\n  margin-bottom: 10px;\n  display: flex;\n}\n\n.Tabs-button\n{\n  font-size: 14px;\n  border: 1px solid black;\n  padding: 4px;\n  background: none;\n  margin-right: 5px;\n}\n\n.Tabs-button.is-active\n{\n  background-color: rgb(236, 233, 233);\n  border-bottom: 3px solid blue;\n}\n\n.Tabs-bodies\n{\n  border: 1px solid black;\n}", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/functional.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/functional.css ***!
  \******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.id, ".row\n{\n  display: flex;\n  justify-content: center;\n}\n\npre\n{\n  background-color: #dedede;\n  padding: 10px;\n  border: 1px solid black;\n}", ""]);


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

/***/ "./src/functional.html":
/*!*****************************!*\
  !*** ./src/functional.html ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "functional.html";

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

/***/ "./node_modules/ramda/es/ap.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/ap.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");





/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */
var ap = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } : (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (acc, f) {
    return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_2__.default)(acc, (0,_map_js__WEBPACK_IMPORTED_MODULE_3__.default)(f, applyX));
  }, [], applyF);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ap);

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

/***/ "./node_modules/ramda/es/converge.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/converge.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");







/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      const average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */
var converge = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function converge(after, fns) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__.default)((0,_reduce_js__WEBPACK_IMPORTED_MODULE_2__.default)(_max_js__WEBPACK_IMPORTED_MODULE_3__.default, 0, (0,_pluck_js__WEBPACK_IMPORTED_MODULE_4__.default)('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_5__.default)(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (converge);

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

/***/ "./node_modules/ramda/es/identity.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/identity.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_identity.js */ "./node_modules/ramda/es/internal/_identity.js");



/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */
var identity = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(_internal_identity_js__WEBPACK_IMPORTED_MODULE_1__.default);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identity);

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

/***/ "./node_modules/ramda/es/internal/_concat.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_concat.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _concat)
/* harmony export */ });
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
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

/***/ "./node_modules/ramda/es/internal/_identity.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_identity.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _identity)
/* harmony export */ });
function _identity(x) {
  return x;
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

/***/ "./node_modules/ramda/es/internal/_xmap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xmap.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XMap = /*#__PURE__*/function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__.default.init;
  XMap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__.default.result;
  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function _xmap(f, xf) {
  return new XMap(f, xf);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xmap);

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

/***/ "./node_modules/ramda/es/juxt.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/juxt.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _converge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./converge.js */ "./node_modules/ramda/es/converge.js");



/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      const getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */
var juxt = /*#__PURE__*/(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function juxt(fns) {
  return (0,_converge_js__WEBPACK_IMPORTED_MODULE_1__.default)(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (juxt);

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

/***/ "./node_modules/ramda/es/map.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/map.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xmap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xmap.js */ "./node_modules/ramda/es/internal/_xmap.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");








/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */
var map = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__.default)(['fantasy-land/map', 'map'], _internal_xmap_js__WEBPACK_IMPORTED_MODULE_2__.default, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_3__.default)(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__.default)(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__.default)(functor));
    default:
      return (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_6__.default)(fn, functor);
  }
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (map);

/***/ }),

/***/ "./node_modules/ramda/es/max.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/max.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */
var max = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function max(a, b) {
  return b > a ? b : a;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (max);

/***/ }),

/***/ "./node_modules/ramda/es/path.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/path.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
var path = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (path);

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

/***/ "./node_modules/ramda/es/pluck.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pluck.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");




/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      var getAges = R.pluck('age');
 *      getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 *
 *      R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */
var pluck = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function pluck(p, list) {
  return (0,_map_js__WEBPACK_IMPORTED_MODULE_1__.default)((0,_prop_js__WEBPACK_IMPORTED_MODULE_2__.default)(p), list);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pluck);

/***/ }),

/***/ "./node_modules/ramda/es/prop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/prop.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");



/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */

var prop = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function prop(p, obj) {
  return (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.default)([p], obj);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prop);

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

/***/ "./node_modules/ramda/es/useWith.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/useWith.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");



/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */
var useWith = /*#__PURE__*/(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function useWith(fn, transformers) {
  return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_1__.default)(transformers.length, function () {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useWith);

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

/***/ "./src/Tabs.css":
/*!**********************!*\
  !*** ./src/Tabs.css ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var content = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./Tabs.css */ "./node_modules/css-loader/dist/cjs.js!./src/Tabs.css");

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

/***/ "./src/functional.css":
/*!****************************!*\
  !*** ./src/functional.css ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var content = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./functional.css */ "./node_modules/css-loader/dist/cjs.js!./src/functional.css");

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

/***/ "./src/js/tabber.js":
/*!**************************!*\
  !*** ./src/js/tabber.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tabber": () => (/* binding */ Tabber),
/* harmony export */   "initTabber": () => (/* binding */ initTabber),
/* harmony export */   "elmTabber": () => (/* binding */ elmTabber)
/* harmony export */ });
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/invoker.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/curry.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/path.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/useWith.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/identity.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/map.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/compose.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/flip.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/ap.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/juxt.js");
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/prop.js");
/* harmony import */ var union_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! union-type */ "./node_modules/union-type/union-type.js");
/* harmony import */ var union_type__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(union_type__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var snabbdom_h__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! snabbdom/h */ "./node_modules/snabbdom/h.js");




////////////////
// Helpers
////////////////
const qsAll = ramda__WEBPACK_IMPORTED_MODULE_2__.default(1, 'querySelectorAll');
const addClass = ramda__WEBPACK_IMPORTED_MODULE_3__.default((cls, el) => {
  el.classList.add(cls);
});
const removeClass = ramda__WEBPACK_IMPORTED_MODULE_3__.default((cls, el) => {
  el.classList.remove(cls);
});

////////////////
// OOP Version
///////////////
class Tabber {
  constructor (el) {
    this.el = el;
    this.tabs = [];

    const buttons = this.el.querySelectorAll('.js-Tabber-button');
    const contents = this.el.querySelectorAll('.js-Tabber-body');
    for (const button of buttons) {
      for (const content of contents) {
        if (button.dataset.tabIndex === content.dataset.tabIndex) {
          this.tabs.push({button, content});
        }
      }
    }

    for (const tab of this.tabs) {
      tab.button.addEventListener('click', () => {
        this.activateAndUpdateAll(tab);
      });
    }
  }

  activateTab(tab) {
    tab.button.classList.add('is-active');
    tab.content.classList.add('is-active');
  }

  deactivateTab(tab) {
    tab.button.classList.remove('is-active');
    tab.content.classList.remove('is-active');
  }

  activateAndUpdateAll(tabToActivate) {
    for (const tab of this.tabs) {
      if (tab !== tabToActivate) {
        this.deactivateTab(tab);
      }
    }
    this.activateTab(tabToActivate);
  }
}

//////////////
// FP Version
//////////////
// Pure
const getTabIndex = ramda__WEBPACK_IMPORTED_MODULE_4__.default(['dataset', 'tabIndex']);
const tabIndexEq = ramda__WEBPACK_IMPORTED_MODULE_5__.default(ramda__WEBPACK_IMPORTED_MODULE_6__.default, [ramda__WEBPACK_IMPORTED_MODULE_7__.default, getTabIndex]);

// Impure
const activateElsWithTabIndex = ramda__WEBPACK_IMPORTED_MODULE_3__.default((els, idx) => els.filter(tabIndexEq(idx)).map(addClass('is-active')));
const deactivateElsWithoutTabIndex = ramda__WEBPACK_IMPORTED_MODULE_3__.default((els, idx) => els.filter((el) => !tabIndexEq(idx, el)).map(removeClass('is-active')));

const initTabber = el => {
  const tabEls = ramda__WEBPACK_IMPORTED_MODULE_8__.default(ramda__WEBPACK_IMPORTED_MODULE_9__.default(Array.from, ramda__WEBPACK_IMPORTED_MODULE_10__.default(qsAll)(el)))(['.js-Tabber-button', '.js-Tabber-body']);
  const [buttons, contents] = tabEls;
  const toRun = ramda__WEBPACK_IMPORTED_MODULE_11__.default([activateElsWithTabIndex, deactivateElsWithoutTabIndex], tabEls);
  const handler = ramda__WEBPACK_IMPORTED_MODULE_9__.default(ramda__WEBPACK_IMPORTED_MODULE_12__.default(toRun), getTabIndex);
  Array.from(buttons).forEach(el => el.addEventListener('click', () => handler(el)));
}


///////////
// Elm architecture
///////////

/*
model : {
  active: Number,
  buttons: [{id: Number, content: String}],
  bodies: [{id: Number, content: String}],jj
}
*/

const getStateFromDom = (el) => {
  return {
    active: Number(el.querySelector('.js-Tabber-button.is-active').dataset.tabIndex),
    buttons: Array.from(el.querySelectorAll('.js-Tabber-button')).map(button => {return {id: Number(button.dataset.tabIndex), content: button.innerHTML}}),
    bodies: Array.from(el.querySelectorAll('.js-Tabber-body')).map(body => {return {id: Number(body.dataset.tabIndex), content: body.innerHTML}}),
  }
}

const Action = union_type__WEBPACK_IMPORTED_MODULE_0___default()({
  Update: [Number],
})

const init = (state) => {
  return state || {
    active: 0,
    buttons: [{id: 0, content: 'Tab 1'}],
    bodies: [{id: 0, content: 'Tab Content 1'}],
  }
}

const update = (state, action) => {
  return Action.case({
    Update: (i) => {return {...state, active: i}},
  }, action);
}

const view = (state, handler) => {
  return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_1__.default)('div.Tabs', [
    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_1__.default)('div.Tabs-buttons',
      state.buttons.map(button => {
        return (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_1__.default)('button.Tabs-button',
          {
            on: {click: () => handler(Action.Update(button.id))},
            class: {'is-active': button.id == state.active}
          },
          button.content)
      })
    ),
    (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_1__.default)('div.Tabs-bodies',
      state.bodies.filter(ramda__WEBPACK_IMPORTED_MODULE_9__.default(ramda__WEBPACK_IMPORTED_MODULE_6__.default(state.active), ramda__WEBPACK_IMPORTED_MODULE_13__.default('id'))).map(body => (0,snabbdom_h__WEBPACK_IMPORTED_MODULE_1__.default)('div', {props: {innerHTML: body.content}}))
    )
  ])
}

const elmTabber = {view, getStateFromDom, init, update, Action};

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
/*!************************************!*\
  !*** ./src/js/pages/functional.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functional_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../functional.html */ "./src/functional.html");
/* harmony import */ var _functional_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_functional_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functional_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../functional.css */ "./src/functional.css");
/* harmony import */ var _functional_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_functional_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Tabs_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tabs.css */ "./src/Tabs.css");
/* harmony import */ var _Tabs_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Tabs_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/invoker.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _tabber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tabber */ "./src/js/tabber.js");








const qs = ramda__WEBPACK_IMPORTED_MODULE_5__.default(1, 'querySelector');

const main = (initState, element, {view, update}) => {
  const newVnode = view(initState, event => {
    const newState = update(initState, event);
    main(newState, newVnode, {view, update});
  });
  (0,_util__WEBPACK_IMPORTED_MODULE_3__.patch)(element, newVnode);
}

;(0,_util__WEBPACK_IMPORTED_MODULE_3__.onReady)(() => {
  // Init OOP Tabber
  new _tabber__WEBPACK_IMPORTED_MODULE_4__.Tabber(document.querySelector('.js-oop-tabber'));

  // Init FP Tabber
  (0,_tabber__WEBPACK_IMPORTED_MODULE_4__.initTabber)(qs('.js-fp-tabber')(document));

  // Init elm tabber
  const initialState = _tabber__WEBPACK_IMPORTED_MODULE_4__.elmTabber.getStateFromDom(document.querySelector('.js-elm-tabber'))
  main(_tabber__WEBPACK_IMPORTED_MODULE_4__.elmTabber.init(initialState), document.querySelector('.js-elm-tabber'), _tabber__WEBPACK_IMPORTED_MODULE_4__.elmTabber)
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL1RhYnMuY3NzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvZnVuY3Rpb25hbC5jc3MiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL3NyYy9mdW5jdGlvbmFsLmh0bWwiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FyaXR5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTEuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5Mi5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnlOLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1BsYWNlaG9sZGVyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvYXAuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9iaW5kLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvY29tcG9zZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2NvbnZlcmdlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvY3VycnkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9lcXVhbHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9mbGlwLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fYXJpdHkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fYXJyYXlGcm9tSXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY29tcGxlbWVudC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19jb25jYXQuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY3VycnkxLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2N1cnJ5Mi5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19jdXJyeTMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY3VycnlOLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19lcXVhbHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fZmlsdGVyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2Z1bmN0aW9uTmFtZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19oYXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faW5jbHVkZXNXaXRoLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2luZGV4T2YuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNBcnJheS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzT2JqZWN0LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNTdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNUcmFuc2Zvcm1lci5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19tYXAuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fb2JqZWN0SXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fcGlwZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19xdW90ZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9JU09TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feGZCYXNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX3hmaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feG1hcC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL194d3JhcC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludm9rZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9qdXh0LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMva2V5cy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL21hcC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL21heC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3BhdGguanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9waXBlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvcGx1Y2suanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9wcm9wLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvcmVkdWNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvcmVqZWN0LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvcmV2ZXJzZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3NsaWNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvdGFpbC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvdHlwZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3VzZVdpdGguanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9oLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaHRtbGRvbWFwaS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2lzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvc25hYmJkb20uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy90aHVuay5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3Zub2RlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vaC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2h0bWxkb21hcGkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9pcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9wcm9wcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS90b3Zub2RlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vdm5vZGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL3NyYy9UYWJzLmNzcz84ODU2Iiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvZnVuY3Rpb25hbC5jc3M/MTI5MSIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2JpbmQuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29tcG9zZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FyaXR5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jaGVja0Zvck1ldGhvZC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkxLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5My5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnlOLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc0FycmF5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNQbGFjZWhvbGRlci5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNTdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3BpcGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3JlZHVjZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feHdyYXAuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGlwZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy91bmlvbi10eXBlL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmV2ZXJzZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zbGljZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3VuaW9uLXR5cGUvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90YWlsLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvdW5pb24tdHlwZS91bmlvbi10eXBlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvanMvdGFiYmVyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvanMvdXRpbC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL2pzL3BhZ2VzL2Z1bmN0aW9uYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQTJCLG1CQUFPLENBQUMscUdBQWdEO0FBQ25GO0FBQ0Esa0NBQWtDLGtCQUFrQixpQkFBaUIsNEJBQTRCLG9CQUFvQixlQUFlLEdBQUcsaUJBQWlCLGtCQUFrQixHQUFHLDJCQUEyQixtQkFBbUIsR0FBRyxvQkFBb0Isd0JBQXdCLGtCQUFrQixHQUFHLG1CQUFtQixvQkFBb0IsNEJBQTRCLGlCQUFpQixxQkFBcUIsc0JBQXNCLEdBQUcsNkJBQTZCLHlDQUF5QyxrQ0FBa0MsR0FBRyxtQkFBbUIsNEJBQTRCLEdBQUc7Ozs7Ozs7Ozs7O0FDRjlqQiwyQkFBMkIs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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZitCO0FBQ0Q7QUFDTjs7QUFFRztBQUNjO0FBQ2lCOztBQUUxRCxXQUFXLDBDQUFTOztBQUVwQixtQ0FBbUMsYUFBYTtBQUNoRDtBQUNBO0FBQ0EsOEJBQThCLGFBQWE7QUFDM0MsR0FBRztBQUNILEVBQUUsNENBQUs7QUFDUDs7QUFFQSwrQ0FBTztBQUNQO0FBQ0EsTUFBTSwyQ0FBTTs7QUFFWjtBQUNBLEVBQUUsbURBQVU7O0FBRVo7QUFDQSx1QkFBdUIsOERBQXlCO0FBQ2hELE9BQU8sbURBQWMsMERBQTBELDhDQUFTO0FBQ3hGLENBQUMsRSIsImZpbGUiOiJmdW5jdGlvbmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuVGFic1xcbntcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBtYXJnaW46IDIwcHg7XFxuICBvdXRsaW5lOiAxcHggc29saWQgZ3JheTtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIHdpZHRoOiA3NSU7XFxufVxcblxcbi5UYWJzLWJvZHlcXG57XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uVGFicy1ib2R5LmlzLWFjdGl2ZVxcbntcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uVGFicy1idXR0b25zXFxue1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5UYWJzLWJ1dHRvblxcbntcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgcGFkZGluZzogNHB4O1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbn1cXG5cXG4uVGFicy1idXR0b24uaXMtYWN0aXZlXFxue1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzNiwgMjMzLCAyMzMpO1xcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIGJsdWU7XFxufVxcblxcbi5UYWJzLWJvZGllc1xcbntcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cIiwgXCJcIl0pO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIucm93XFxue1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5wcmVcXG57XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGVkZWRlO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cIiwgXCJcIl0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCJ7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbX2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIihcIi5jb25jYXQoaXRlbVsyXSwgXCIpIGFuZCAoXCIpLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIilcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCkuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmdW5jdGlvbmFsLmh0bWxcIjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjdXJyeU4gPSByZXF1aXJlKCdyYW1kYS9zcmMvY3VycnlOJyk7XG5cbi8vIFV0aWxpdHlcbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiAhIShvYmogJiYgb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jYWxsICYmIG9iai5hcHBseSk7XG59XG5mdW5jdGlvbiB0cnVlRm4oKSB7IHJldHVybiB0cnVlOyB9XG5cbi8vIEdsb2JhbHNcbnZhciB0b1VwZGF0ZSA9IFtdO1xudmFyIGluU3RyZWFtO1xudmFyIG9yZGVyID0gW107XG52YXIgb3JkZXJOZXh0SWR4ID0gLTE7XG52YXIgZmx1c2hpbmdVcGRhdGVRdWV1ZSA9IGZhbHNlO1xudmFyIGZsdXNoaW5nU3RyZWFtVmFsdWUgPSBmYWxzZTtcblxuZnVuY3Rpb24gZmx1c2hpbmcoKSB7XG4gIHJldHVybiBmbHVzaGluZ1VwZGF0ZVF1ZXVlIHx8IGZsdXNoaW5nU3RyZWFtVmFsdWU7XG59XG5cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBmbHlkID0ge31cblxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFQSSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbVxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuc3RyZWFtXG4gKiBAcGFyYW0geyp9IGluaXRpYWxWYWx1ZSAtIChPcHRpb25hbCkgdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHN0cmVhbVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuID0gZmx5ZC5zdHJlYW0oMSk7IC8vIFN0cmVhbSB3aXRoIGluaXRpYWwgdmFsdWUgYDFgXG4gKiB2YXIgcyA9IGZseWQuc3RyZWFtKCk7IC8vIFN0cmVhbSB3aXRoIG5vIGluaXRpYWwgdmFsdWVcbiAqL1xuZmx5ZC5zdHJlYW0gPSBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgdmFyIGVuZFN0cmVhbSA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShbXSwgdHJ1ZUZuKTtcbiAgdmFyIHMgPSBjcmVhdGVTdHJlYW0oKTtcbiAgcy5lbmQgPSBlbmRTdHJlYW07XG4gIHMuZm5BcmdzID0gW107XG4gIGVuZFN0cmVhbS5saXN0ZW5lcnMucHVzaChzKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSBzKGluaXRpYWxWYWx1ZSk7XG4gIHJldHVybiBzO1xufVxuLy8gZmFudGFzeS1sYW5kIEFwcGxpY2F0aXZlXG5mbHlkLnN0cmVhbVsnZmFudGFzeS1sYW5kL29mJ10gPSBmbHlkLnN0cmVhbS5vZiA9IGZseWQuc3RyZWFtO1xuXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGRlcGVuZGVudCBzdHJlYW1cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKC4uLlN0cmVhbSAqIC0+IFN0cmVhbSBiIC0+IGIpIC0+IFtTdHJlYW0gKl0gLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5jb21iaW5lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbWJpbmUgdGhlIHN0cmVhbXNcbiAqIEBwYXJhbSB7QXJyYXk8c3RyZWFtPn0gZGVwZW5kZW5jaWVzIC0gdGhlIHN0cmVhbXMgdGhhdCB0aGlzIG9uZSBkZXBlbmRzIG9uXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBkZXBlbmRlbnQgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuMSA9IGZseWQuc3RyZWFtKDApO1xuICogdmFyIG4yID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgbWF4ID0gZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKG4xLCBuMiwgc2VsZiwgY2hhbmdlZCkge1xuICogICByZXR1cm4gbjEoKSA+IG4yKCkgPyBuMSgpIDogbjIoKTtcbiAqIH0sIFtuMSwgbjJdKTtcbiAqL1xuZmx5ZC5jb21iaW5lID0gY3VycnlOKDIsIGNvbWJpbmUpO1xuZnVuY3Rpb24gY29tYmluZShmbiwgc3RyZWFtcykge1xuICB2YXIgaSwgcywgZGVwcywgZGVwRW5kU3RyZWFtcztcbiAgdmFyIGVuZFN0cmVhbSA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShbXSwgdHJ1ZUZuKTtcbiAgZGVwcyA9IFtdOyBkZXBFbmRTdHJlYW1zID0gW107XG4gIGZvciAoaSA9IDA7IGkgPCBzdHJlYW1zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHN0cmVhbXNbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVwcy5wdXNoKHN0cmVhbXNbaV0pO1xuICAgICAgaWYgKHN0cmVhbXNbaV0uZW5kICE9PSB1bmRlZmluZWQpIGRlcEVuZFN0cmVhbXMucHVzaChzdHJlYW1zW2ldLmVuZCk7XG4gICAgfVxuICB9XG4gIHMgPSBjcmVhdGVEZXBlbmRlbnRTdHJlYW0oZGVwcywgZm4pO1xuICBzLmRlcHNDaGFuZ2VkID0gW107XG4gIHMuZm5BcmdzID0gcy5kZXBzLmNvbmNhdChbcywgcy5kZXBzQ2hhbmdlZF0pO1xuICBzLmVuZCA9IGVuZFN0cmVhbTtcbiAgZW5kU3RyZWFtLmxpc3RlbmVycy5wdXNoKHMpO1xuICBhZGRMaXN0ZW5lcnMoZGVwRW5kU3RyZWFtcywgZW5kU3RyZWFtKTtcbiAgZW5kU3RyZWFtLmRlcHMgPSBkZXBFbmRTdHJlYW1zO1xuICB1cGRhdGVTdHJlYW0ocyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzdXBwbGllZCBhcmd1bWVudCBpcyBhIEZseWQgc3RyZWFtIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKiAtPiBCb29sZWFuYFxuICpcbiAqIEBuYW1lIGZseWQuaXNTdHJlYW1cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGlzIGEgRmx5ZCBzdHJlYW1uLCBgZmFsc2VgIG90aGVyd2lzZVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcyA9IGZseWQuc3RyZWFtKDEpO1xuICogdmFyIG4gPSAxO1xuICogZmx5ZC5pc1N0cmVhbShzKTsgLy89PiB0cnVlXG4gKiBmbHlkLmlzU3RyZWFtKG4pOyAvLz0+IGZhbHNlXG4gKi9cbmZseWQuaXNTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgcmV0dXJuIGlzRnVuY3Rpb24oc3RyZWFtKSAmJiAnaGFzVmFsJyBpbiBzdHJlYW07XG59XG5cbi8qKlxuICogSW52b2tlcyB0aGUgYm9keSAodGhlIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgdmFsdWUpIG9mIGEgZGVwZW5kZW50IHN0cmVhbVxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgYSBkZXBlbmRlbnQgc3RyZWFtIGlzIG9ubHkgY2FsbGVkIHdoZW4gYWxsIHRoZSBzdHJlYW1zXG4gKiB1cG9uIHdoaWNoIGl0IGRlcGVuZHMgaGFzIGEgdmFsdWUuIGBpbW1lZGlhdGVgIGNhbiBjaXJjdW12ZW50IHRoaXMgYmVoYXZpb3VyLlxuICogSXQgaW1tZWRpYXRlbHkgaW52b2tlcyB0aGUgYm9keSBvZiBhIGRlcGVuZGVudCBzdHJlYW0uXG4gKlxuICogX19TaWduYXR1cmVfXzogYFN0cmVhbSBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuaW1tZWRpYXRlXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIGRlcGVuZGVudCBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIHNhbWUgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIHZhciBoYXNJdGVtcyA9IGZseWQuaW1tZWRpYXRlKGZseWQuY29tYmluZShmdW5jdGlvbihzKSB7XG4gKiAgIHJldHVybiBzKCkgIT09IHVuZGVmaW5lZCAmJiBzKCkubGVuZ3RoID4gMDtcbiAqIH0sIFtzXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgZmFsc2VgLiBIYWQgYGltbWVkaWF0ZWAgbm90IGJlZW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2VkIGBoYXNJdGVtcygpYCB3b3VsZCd2ZSByZXR1cm5lZCBgdW5kZWZpbmVkYFxuICogcyhbMV0pO1xuICogY29uc29sZS5sb2coaGFzSXRlbXMoKSk7IC8vIGxvZ3MgYHRydWVgLlxuICogcyhbXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgZmFsc2VgLlxuICovXG5mbHlkLmltbWVkaWF0ZSA9IGZ1bmN0aW9uKHMpIHtcbiAgaWYgKHMuZGVwc01ldCA9PT0gZmFsc2UpIHtcbiAgICBzLmRlcHNNZXQgPSB0cnVlO1xuICAgIHVwZGF0ZVN0cmVhbShzKTtcbiAgfVxuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIHdoaWNoIGBlbmRzU3RyZWFtYCBzaG91bGQgdHJpZ2dlciB0aGUgZW5kaW5nIG9mIGBzYC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgU3RyZWFtIGEgLT4gU3RyZWFtIGIgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5lbmRzT25cbiAqIEBwYXJhbSB7c3RyZWFtfSBlbmRTdHJlYW0gLSB0aGUgc3RyZWFtIHRvIHRyaWdnZXIgdGhlIGVuZGluZ1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gYmUgZW5kZWQgYnkgdGhlIGVuZFN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHRoZSBzdHJlYW0gbW9kaWZpZWQgdG8gYmUgZW5kZWQgYnkgZW5kU3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuID0gZmx5ZC5zdHJlYW0oMSk7XG4gKiB2YXIga2lsbGVyID0gZmx5ZC5zdHJlYW0oKTtcbiAqIC8vIGBkb3VibGVgIGVuZHMgd2hlbiBgbmAgZW5kcyBvciB3aGVuIGBraWxsZXJgIGVtaXRzIGFueSB2YWx1ZVxuICogdmFyIGRvdWJsZSA9IGZseWQuZW5kc09uKGZseWQubWVyZ2Uobi5lbmQsIGtpbGxlciksIGZseWQuY29tYmluZShmdW5jdGlvbihuKSB7XG4gKiAgIHJldHVybiAyICogbigpO1xuICogfSwgW25dKTtcbiovXG5mbHlkLmVuZHNPbiA9IGZ1bmN0aW9uKGVuZFMsIHMpIHtcbiAgZGV0YWNoRGVwcyhzLmVuZCk7XG4gIGVuZFMubGlzdGVuZXJzLnB1c2gocy5lbmQpO1xuICBzLmVuZC5kZXBzLnB1c2goZW5kUyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIE1hcCBhIHN0cmVhbVxuICpcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIGNvbnNpc3Rpbmcgb2YgZXZlcnkgdmFsdWUgZnJvbSBgc2AgcGFzc2VkIHRocm91Z2hcbiAqIGBmbmAuIEkuZS4gYG1hcGAgY3JlYXRlcyBhIG5ldyBzdHJlYW0gdGhhdCBsaXN0ZW5zIHRvIGBzYCBhbmRcbiAqIGFwcGxpZXMgYGZuYCB0byBldmVyeSBuZXcgdmFsdWUuXG4gKiBfX1NpZ25hdHVyZV9fOiBgKGEgLT4gcmVzdWx0KSAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gcmVzdWx0YFxuICpcbiAqIEBuYW1lIGZseWQubWFwXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIHRoZSBlbGVtZW50cyBvZiB0aGUgbmV3IHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gbWFwXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBtYXBwZWQgdmFsdWVzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBudW1iZXJzID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgc3F1YXJlZE51bWJlcnMgPSBmbHlkLm1hcChmdW5jdGlvbihuKSB7IHJldHVybiBuKm47IH0sIG51bWJlcnMpO1xuICovXG4vLyBMaWJyYXJ5IGZ1bmN0aW9ucyB1c2Ugc2VsZiBjYWxsYmFjayB0byBhY2NlcHQgKG51bGwsIHVuZGVmaW5lZCkgdXBkYXRlIHRyaWdnZXJzLlxuZnVuY3Rpb24gbWFwKGYsIHMpIHtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24ocywgc2VsZikgeyBzZWxmKGYocy52YWwpKTsgfSwgW3NdKTtcbn1cbmZseWQubWFwID0gY3VycnlOKDIsIG1hcClcblxuLyoqXG4gKiBDaGFpbiBhIHN0cmVhbVxuICpcbiAqIGFsc28ga25vd24gYXMgZmxhdE1hcFxuICpcbiAqIFdoZXJlIGBmbmAgcmV0dXJucyBhIHN0cmVhbSB0aGlzIGZ1bmN0aW9uIHdpbGwgZmxhdHRlbiB0aGUgcmVzdWx0aW5nIHN0cmVhbXMuXG4gKiBFdmVyeSB0aW1lIGBmbmAgaXMgY2FsbGVkIHRoZSBjb250ZXh0IG9mIHRoZSByZXR1cm5lZCBzdHJlYW0gd2lsbCBcInN3aXRjaFwiIHRvIHRoYXQgc3RyZWFtLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAoYSAtPiBTdHJlYW0gYikgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5jaGFpblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyB0aGUgc3RyZWFtcyB0byBiZSBmbGF0dGVuZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIG1hcFxuICogQHJldHVybiB7c3RyZWFtfSBhIG5ldyBzdHJlYW0gd2l0aCB0aGUgbWFwcGVkIHZhbHVlc1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZmlsdGVyID0gZmx5ZC5zdHJlYW0oJ3dobycpO1xuICogdmFyIGl0ZW1zID0gZmx5ZC5jaGFpbihmdW5jdGlvbihmaWx0ZXIpe1xuICogICByZXR1cm4gZmx5ZC5zdHJlYW0oZmluZFVzZXJzKGZpbHRlcikpO1xuICogfSwgZmlsdGVyKTtcbiAqL1xuZmx5ZC5jaGFpbiA9IGN1cnJ5TigyLCBjaGFpbik7XG5cbi8qKlxuICogQXBwbHkgYSBzdHJlYW1cbiAqXG4gKiBBcHBsaWVzIHRoZSB2YWx1ZSBpbiBgczJgIHRvIHRoZSBmdW5jdGlvbiBpbiBgczFgLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBTdHJlYW0gKGEgLT4gYikgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5hcFxuICogQHBhcmFtIHtzdHJlYW19IHMxIC0gVGhlIHZhbHVlIHRvIGJlIGFwcGxpZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzMiAtIFRoZSBmdW5jdGlvbiBleHBlY3RpbmcgdGhlIHZhbHVlXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBtYXBwZWQgdmFsdWVzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBhZGQgPSBzdHJlYW0oYSA9PiBiID0+IGEgKyBiKVxuICogdmFyIG4xID0gc3RyZWFtKDEpXG4gKiB2YXIgbjIgPSBzdHJlYW0oMilcbiAqXG4gKiB2YXIgYWRkZWQgPSBmbHlkLmFwKG4yLCBmbHlkLmFwKG4xLCBhZGQpKSAvLyBzdHJlYW0oMylcbiAqIC8vIGNhbiBhbHNvIGJlIHdyaXR0ZW4gdXNpbmcgcGlwZVxuICogdmFyIGFkZGVkX3BpcGUgPSBhZGRcbiAqICAgLnBpcGUoYXAobjEpKVxuICogICAucGlwZShhcChuMikpO1xuICogYWRkZWRfcGlwZSgpIC8vIDNcbiAqL1xuZmx5ZC5hcCA9IGN1cnJ5TigyLCBhcCk7XG5cbi8qKlxuICogTGlzdGVuIHRvIHN0cmVhbSBldmVudHNcbiAqXG4gKiBTaW1pbGFyIHRvIGBtYXBgIGV4Y2VwdCB0aGF0IHRoZSByZXR1cm5lZCBzdHJlYW0gaXMgZW1wdHkuIFVzZSBgb25gIGZvciBkb2luZ1xuICogc2lkZSBlZmZlY3RzIGluIHJlYWN0aW9uIHRvIHN0cmVhbSBjaGFuZ2VzLiBVc2UgdGhlIHJldHVybmVkIHN0cmVhbSBvbmx5IGlmIHlvdVxuICogbmVlZCB0byBtYW51YWxseSBlbmQgaXQuXG4gKlxuICogX19TaWduYXR1cmVfXzogYChhIC0+IHJlc3VsdCkgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIHVuZGVmaW5lZGBcbiAqXG4gKiBAbmFtZSBmbHlkLm9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIHRoZSBjYWxsYmFja1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gYW4gZW1wdHkgc3RyZWFtIChjYW4gYmUgZW5kZWQpXG4gKi9cbmZseWQub24gPSBjdXJyeU4oMiwgZnVuY3Rpb24oZiwgcykge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzKSB7IGYocy52YWwpOyB9LCBbc10pO1xufSlcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbSB3aXRoIHRoZSByZXN1bHRzIG9mIGNhbGxpbmcgdGhlIGZ1bmN0aW9uIG9uIGV2ZXJ5IGluY29taW5nXG4gKiBzdHJlYW0gd2l0aCBhbmQgYWNjdW11bGF0b3IgYW5kIHRoZSBpbmNvbWluZyB2YWx1ZS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKGEgLT4gYiAtPiBhKSAtPiBhIC0+IFN0cmVhbSBiIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuc2NhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHsqfSB2YWwgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgYWNjdW11bGF0b3JcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHNvdXJjZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbnVtYmVycyA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgc3VtID0gZmx5ZC5zY2FuKGZ1bmN0aW9uKHN1bSwgbikgeyByZXR1cm4gc3VtK247IH0sIDAsIG51bWJlcnMpO1xuICogbnVtYmVycygyKSgzKSg1KTtcbiAqIHN1bSgpOyAvLyAxMFxuICovXG5mbHlkLnNjYW4gPSBjdXJyeU4oMywgZnVuY3Rpb24oZiwgYWNjLCBzKSB7XG4gIHZhciBucyA9IGNvbWJpbmUoZnVuY3Rpb24ocywgc2VsZikge1xuICAgIHNlbGYoYWNjID0gZihhY2MsIHMudmFsKSk7XG4gIH0sIFtzXSk7XG4gIGlmICghbnMuaGFzVmFsKSBucyhhY2MpO1xuICByZXR1cm4gbnM7XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbSBkb3duIHdoaWNoIGFsbCB2YWx1ZXMgZnJvbSBib3RoIGBzdHJlYW0xYCBhbmQgYHN0cmVhbTJgXG4gKiB3aWxsIGJlIHNlbnQuXG4gKlxuICogX19TaWduYXR1cmVfXzogYFN0cmVhbSBhIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQubWVyZ2VcbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UxIC0gb25lIHN0cmVhbSB0byBiZSBtZXJnZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UyIC0gdGhlIG90aGVyIHN0cmVhbSB0byBiZSBtZXJnZWRcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBzdHJlYW0gd2l0aCB0aGUgdmFsdWVzIGZyb20gYm90aCBzb3VyY2VzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBidG4xQ2xpY2tzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIGJ1dHRvbjFFbG0uYWRkRXZlbnRMaXN0ZW5lcihidG4xQ2xpY2tzKTtcbiAqIHZhciBidG4yQ2xpY2tzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIGJ1dHRvbjJFbG0uYWRkRXZlbnRMaXN0ZW5lcihidG4yQ2xpY2tzKTtcbiAqIHZhciBhbGxDbGlja3MgPSBmbHlkLm1lcmdlKGJ0bjFDbGlja3MsIGJ0bjJDbGlja3MpO1xuICovXG5mbHlkLm1lcmdlID0gY3VycnlOKDIsIGZ1bmN0aW9uKHMxLCBzMikge1xuICB2YXIgcyA9IGZseWQuaW1tZWRpYXRlKGNvbWJpbmUoZnVuY3Rpb24oczEsIHMyLCBzZWxmLCBjaGFuZ2VkKSB7XG4gICAgaWYgKGNoYW5nZWRbMF0pIHtcbiAgICAgIHNlbGYoY2hhbmdlZFswXSgpKTtcbiAgICB9IGVsc2UgaWYgKHMxLmhhc1ZhbCkge1xuICAgICAgc2VsZihzMS52YWwpO1xuICAgIH0gZWxzZSBpZiAoczIuaGFzVmFsKSB7XG4gICAgICBzZWxmKHMyLnZhbCk7XG4gICAgfVxuICB9LCBbczEsIHMyXSkpO1xuICBmbHlkLmVuZHNPbihjb21iaW5lKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9LCBbczEuZW5kLCBzMi5lbmRdKSwgcyk7XG4gIHJldHVybiBzO1xufSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzdHJlYW0gcmVzdWx0aW5nIGZyb20gYXBwbHlpbmcgYHRyYW5zZHVjZXJgIHRvIGBzdHJlYW1gLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBUcmFuc2R1Y2VyIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIGZseWQudHJhbnNkdWNlXG4gKiBAcGFyYW0ge1RyYW5zZHVjZXJ9IHhmb3JtIC0gdGhlIHRyYW5zZHVjZXIgdHJhbnNmb3JtYXRpb25cbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UgLSB0aGUgc3RyZWFtIHNvdXJjZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgdCA9IHJlcXVpcmUoJ3RyYW5zZHVjZXJzLmpzJyk7XG4gKlxuICogdmFyIHJlc3VsdHMgPSBbXTtcbiAqIHZhciBzMSA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgdHggPSB0LmNvbXBvc2UodC5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4geCAqIDI7IH0pLCB0LmRlZHVwZSgpKTtcbiAqIHZhciBzMiA9IGZseWQudHJhbnNkdWNlKHR4LCBzMSk7XG4gKiBmbHlkLmNvbWJpbmUoZnVuY3Rpb24oczIpIHsgcmVzdWx0cy5wdXNoKHMyKCkpOyB9LCBbczJdKTtcbiAqIHMxKDEpKDEpKDIpKDMpKDMpKDMpKDQpO1xuICogcmVzdWx0czsgLy8gPT4gWzIsIDQsIDYsIDhdXG4gKi9cbmZseWQudHJhbnNkdWNlID0gY3VycnlOKDIsIGZ1bmN0aW9uKHhmb3JtLCBzb3VyY2UpIHtcbiAgeGZvcm0gPSB4Zm9ybShuZXcgU3RyZWFtVHJhbnNmb3JtZXIoKSk7XG4gIHJldHVybiBjb21iaW5lKGZ1bmN0aW9uKHNvdXJjZSwgc2VsZikge1xuICAgIHZhciByZXMgPSB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSh1bmRlZmluZWQsIHNvdXJjZS52YWwpO1xuICAgIGlmIChyZXMgJiYgcmVzWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID09PSB0cnVlKSB7XG4gICAgICBzZWxmLmVuZCh0cnVlKTtcbiAgICAgIHJldHVybiByZXNbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfSwgW3NvdXJjZV0pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBgZm5gIGN1cnJpZWQgdG8gYG5gLiBVc2UgdGhpcyBmdW5jdGlvbiB0byBjdXJyeSBmdW5jdGlvbnMgZXhwb3NlZCBieVxuICogbW9kdWxlcyBmb3IgRmx5ZC5cbiAqXG4gKiBAbmFtZSBmbHlkLmN1cnJ5TlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGFyaXR5IC0gdGhlIGZ1bmN0aW9uIGFyaXR5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0byBjdXJyeVxuICogQHJldHVybiB7RnVuY3Rpb259IHRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIGFkZCh4LCB5KSB7IHJldHVybiB4ICsgeTsgfTtcbiAqIHZhciBhID0gZmx5ZC5jdXJyeU4oMiwgYWRkKTtcbiAqIGEoMikoNCkgLy8gPT4gNlxuICovXG5mbHlkLmN1cnJ5TiA9IGN1cnJ5TlxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIGlkZW50aWNhbCB0byB0aGUgb3JpZ2luYWwgZXhjZXB0IGV2ZXJ5XG4gKiB2YWx1ZSB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIGBmYC5cbiAqXG4gKiBfTm90ZTpfIFRoaXMgZnVuY3Rpb24gaXMgaW5jbHVkZWQgaW4gb3JkZXIgdG8gc3VwcG9ydCB0aGUgZmFudGFzeSBsYW5kXG4gKiBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IENhbGxlZCBib3VuZCB0byBgU3RyZWFtIGFgOiBgKGEgLT4gYikgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgc3RyZWFtLm1hcFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSB0aGUgZnVuY3Rpb24gdG8gYXBwbHlcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggdGhlIHZhbHVlcyBtYXBwZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG51bWJlcnMgPSBmbHlkLnN0cmVhbSgwKTtcbiAqIHZhciBzcXVhcmVkTnVtYmVycyA9IG51bWJlcnMubWFwKGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4qbjsgfSk7XG4gKi9cbmZ1bmN0aW9uIGJvdW5kTWFwKGYpIHsgcmV0dXJuIG1hcChmLCB0aGlzKTsgfVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBmdW5jdGlvbiBgZm5gIHRvIHRoaXMgc3RyZWFtXG4gKlxuICogX19TaWduYXR1cmVfXzogQ2FsbGVkIGJvdW5kIHRvIGBTdHJlYW0gYWA6IGAoYSAtPiBTdHJlYW0gYikgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgc3RyZWFtLnBpcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRvIGFwcGx5XG4gKiBAcmV0dXJuIHtzdHJlYW19IEEgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbnVtYmVycyA9IGZseWQuc3RyZWFtKDApO1xuICogdmFyIHNxdWFyZWROdW1iZXJzID0gbnVtYmVycy5waXBlKGZseWQubWFwKGZ1bmN0aW9uKG4peyByZXR1cm4gbipuOyB9KSk7XG4gKi9cbmZ1bmN0aW9uIG9wZXJhdG9yX3BpcGUoZikgeyByZXR1cm4gZih0aGlzKSB9XG5cbmZ1bmN0aW9uIGJvdW5kQ2hhaW4oZikge1xuICByZXR1cm4gY2hhaW4oZiwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGNoYWluKGYsIHMpIHtcbiAgLy8gSW50ZXJuYWwgc3RhdGUgdG8gZW5kIGZsYXQgbWFwIHN0cmVhbVxuICB2YXIgZmxhdEVuZCA9IGZseWQuc3RyZWFtKDEpO1xuICB2YXIgaW50ZXJuYWxFbmRlZCA9IGZseWQub24oZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFsaXZlID0gZmxhdEVuZCgpIC0gMTtcbiAgICBmbGF0RW5kKGFsaXZlKTtcbiAgICBpZiAoYWxpdmUgPD0gMCkge1xuICAgICAgZmxhdEVuZC5lbmQodHJ1ZSk7XG4gICAgfVxuICB9KTtcblxuICBpbnRlcm5hbEVuZGVkKHMuZW5kKTtcbiAgdmFyIGxhc3QgPSBmbHlkLnN0cmVhbSgpO1xuICB2YXIgZmxhdFN0cmVhbSA9IGZseWQuY29tYmluZShmdW5jdGlvbihzLCBvd24pIHtcbiAgICBsYXN0LmVuZCh0cnVlKVxuICAgIC8vIE91ciBmbiBzdHJlYW0gbWFrZXMgc3RyZWFtc1xuICAgIHZhciBuZXdTID0gZihzKCkpO1xuICAgIGZsYXRFbmQoZmxhdEVuZCgpICsgMSk7XG4gICAgaW50ZXJuYWxFbmRlZChuZXdTLmVuZCk7XG5cbiAgICAvLyBVcGRhdGUgc2VsZiBvbiBjYWxsIC0tIG5ld1MgaXMgbmV2ZXIgaGFuZGVkIG91dCBzbyBkZXBzIGRvbid0IG1hdHRlclxuICAgIGxhc3QgPSBtYXAob3duLCBuZXdTKTtcbiAgfSwgW3NdKTtcblxuICBmbHlkLmVuZHNPbihmbGF0RW5kLmVuZCwgZmxhdFN0cmVhbSk7XG5cbiAgcmV0dXJuIGZsYXRTdHJlYW07XG59XG5cbmZseWQuZnJvbVByb21pc2UgPSBmdW5jdGlvbiBmcm9tUHJvbWlzZShwKSB7XG4gIHZhciBzID0gZmx5ZC5zdHJlYW0oKTtcbiAgcC50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgIHModmFsKTtcbiAgICBzLmVuZCh0cnVlKTtcbiAgfSk7XG4gIHJldHVybiBzO1xufVxuXG5mbHlkLmZsYXR0ZW5Qcm9taXNlID0gZnVuY3Rpb24gZmxhdHRlblByb21pc2Uocykge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzLCBzZWxmKSB7XG4gICAgcygpLnRoZW4oc2VsZik7XG4gIH0sIFtzXSlcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlXG4gKiBmdW5jdGlvbnMgZnJvbSBgdGhpc2Agc3RyZWFtIHRvIHRoZSB2YWx1ZXMgaW4gYHN0cmVhbWAgcGFyYW1ldGVyLlxuICpcbiAqIGB0aGlzYCBzdHJlYW0gbXVzdCBiZSBhIHN0cmVhbSBvZiBmdW5jdGlvbnMuXG4gKlxuICogX05vdGU6XyBUaGlzIGZ1bmN0aW9uIGlzIGluY2x1ZGVkIGluIG9yZGVyIHRvIHN1cHBvcnQgdGhlIGZhbnRhc3kgbGFuZFxuICogc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSAoYSAtPiBiKWA6IGBhIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIHN0cmVhbS5hcFxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSB2YWx1ZXMgc3RyZWFtXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBmdW5jdGlvbnMgYXBwbGllZCB0byB2YWx1ZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGFkZCA9IGZseWQuY3VycnlOKDIsIGZ1bmN0aW9uKHgsIHkpIHsgcmV0dXJuIHggKyB5OyB9KTtcbiAqIHZhciBudW1iZXJzMSA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgbnVtYmVyczIgPSBmbHlkLnN0cmVhbSgpO1xuICogdmFyIGFkZFRvTnVtYmVyczEgPSBmbHlkLm1hcChhZGQsIG51bWJlcnMxKTtcbiAqIHZhciBhZGRlZCA9IGFkZFRvTnVtYmVyczEuYXAobnVtYmVyczIpO1xuICovXG5mdW5jdGlvbiBhcChzMiwgczEpIHtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24oczEsIHMyLCBzZWxmKSB7IHNlbGYoczEudmFsKHMyLnZhbCkpOyB9LCBbczEsIHMyXSk7XG59XG5cbmZ1bmN0aW9uIGJvdW5kQXAoczIpIHtcbiAgcmV0dXJuIGFwKHMyLCB0aGlzKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBmYW50YXN5X2xhbmRfYXAoczEpIHtcbiAgcmV0dXJuIGFwKHRoaXMsIHMxKTtcbn1cblxuLyoqXG4gKiBHZXQgYSBodW1hbiByZWFkYWJsZSB2aWV3IG9mIGEgc3RyZWFtXG4gKiBAbmFtZSBzdHJlYW0udG9TdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHN0cmVhbSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gc3RyZWFtVG9TdHJpbmcoKSB7XG4gIHJldHVybiAnc3RyZWFtKCcgKyB0aGlzLnZhbCArICcpJztcbn1cblxuLyoqXG4gKiBAbmFtZSBzdHJlYW0uZW5kXG4gKiBAbWVtYmVyb2Ygc3RyZWFtXG4gKiBBIHN0cmVhbSB0aGF0IGVtaXRzIGB0cnVlYCB3aGVuIHRoZSBzdHJlYW0gZW5kcy4gSWYgYHRydWVgIGlzIHB1c2hlZCBkb3duIHRoZVxuICogc3RyZWFtIHRoZSBwYXJlbnQgc3RyZWFtIGVuZHMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdHJlYW0ub2ZcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHN0cmVhbVxuICogUmV0dXJucyBhIG5ldyBzdHJlYW0gd2l0aCBgdmFsdWVgIGFzIGl0cyBpbml0aWFsIHZhbHVlLiBJdCBpcyBpZGVudGljYWwgdG9cbiAqIGNhbGxpbmcgYGZseWQuc3RyZWFtYCB3aXRoIG9uZSBhcmd1bWVudC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSAoYSlgOiBgYiAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gdGhlIGluaXRpYWwgdmFsdWVcbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIG5ldyBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4gPSBmbHlkLnN0cmVhbSgxKTtcbiAqIHZhciBtID0gbi5vZigxKTtcbiAqL1xuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUFJJVkFURSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cbi8qKlxuICogQHByaXZhdGVcbiAqIENyZWF0ZSBhIHN0cmVhbSB3aXRoIG5vIGRlcGVuZGVuY2llcyBhbmQgbm8gdmFsdWVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZseWQgc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0cmVhbSgpIHtcbiAgZnVuY3Rpb24gcyhuKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBzLnZhbFxuICAgIHVwZGF0ZVN0cmVhbVZhbHVlKG4sIHMpXG4gICAgcmV0dXJuIHNcbiAgfVxuICBzLmhhc1ZhbCA9IGZhbHNlO1xuICBzLnZhbCA9IHVuZGVmaW5lZDtcbiAgcy51cGRhdGVycyA9IFtdO1xuICBzLmxpc3RlbmVycyA9IFtdO1xuICBzLnF1ZXVlZCA9IGZhbHNlO1xuICBzLmVuZCA9IHVuZGVmaW5lZDtcblxuICAvLyBmYW50YXN5LWxhbmQgY29tcGF0aWJpbGl0eVxuICBzLmFwID0gYm91bmRBcDtcbiAgc1snZmFudGFzeS1sYW5kL21hcCddID0gcy5tYXAgPSBib3VuZE1hcDtcbiAgc1snZmFudGFzeS1sYW5kL2FwJ10gPSBmYW50YXN5X2xhbmRfYXA7XG4gIHNbJ2ZhbnRhc3ktbGFuZC9vZiddID0gcy5vZiA9IGZseWQuc3RyZWFtO1xuICBzWydmYW50YXN5LWxhbmQvY2hhaW4nXSA9IHMuY2hhaW4gPSBib3VuZENoYWluO1xuXG4gIHMucGlwZSA9IG9wZXJhdG9yX3BpcGU7XG5cbiAgLy8gQWNjb3JkaW5nIHRvIHRoZSBmYW50YXN5LWxhbmQgQXBwbGljYXRpdmUgc3BlY2lmaWNhdGlvblxuICAvLyBHaXZlbiBhIHZhbHVlIGYsIG9uZSBjYW4gYWNjZXNzIGl0cyB0eXBlIHJlcHJlc2VudGF0aXZlIHZpYSB0aGUgY29uc3RydWN0b3IgcHJvcGVydHk6XG4gIC8vIGBmLmNvbnN0cnVjdG9yLm9mYFxuICBzLmNvbnN0cnVjdG9yID0gZmx5ZC5zdHJlYW07XG5cbiAgcy50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcy52YWw7XG4gIH1cbiAgcy50b1N0cmluZyA9IHN0cmVhbVRvU3RyaW5nO1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ3JlYXRlIGEgZGVwZW5kZW50IHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXMgLSBhbiBhcnJheSBvZiB0aGUgc3RyZWFtc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ldyBzdHJlYW0gdmFsdWVcbiAqIGZyb20gdGhlIGRlcGVuZGVuY2llc1xuICogQHJldHVybiB7c3RyZWFtfSB0aGUgY3JlYXRlZCBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGVwZW5kZW50U3RyZWFtKGRlcHMsIGZuKSB7XG4gIHZhciBzID0gY3JlYXRlU3RyZWFtKCk7XG4gIHMuZm4gPSBmbjtcbiAgcy5kZXBzID0gZGVwcztcbiAgcy5kZXBzTWV0ID0gZmFsc2U7XG4gIHMuZGVwc0NoYW5nZWQgPSBkZXBzLmxlbmd0aCA+IDAgPyBbXSA6IHVuZGVmaW5lZDtcbiAgcy5zaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgYWRkTGlzdGVuZXJzKGRlcHMsIHMpO1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ2hlY2sgaWYgYWxsIHRoZSBkZXBlbmRlbmNpZXMgaGF2ZSB2YWx1ZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIGNoZWNrIGRlcGVuY2VuY2llcyBmcm9tXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYWxsIGRlcGVuZGVuY2llcyBoYXZlIHZhbGVzLCBgZmFsc2VgIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBpbml0aWFsRGVwZW5kZW5jaWVzTWV0KHN0cmVhbSkge1xuICBzdHJlYW0uZGVwc01ldCA9IHN0cmVhbS5kZXBzLmV2ZXJ5KGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gcy5oYXNWYWw7XG4gIH0pO1xuICByZXR1cm4gc3RyZWFtLmRlcHNNZXQ7XG59XG5cbmZ1bmN0aW9uIGRlcGVuZGVuY2llc0FyZU1ldChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5kZXBzTWV0ID09PSB0cnVlIHx8IGluaXRpYWxEZXBlbmRlbmNpZXNNZXQoc3RyZWFtKTtcbn1cblxuZnVuY3Rpb24gaXNFbmRlZChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5lbmQgJiYgc3RyZWFtLmVuZC52YWwgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGxpc3RlbmVyc05lZWRVcGRhdGluZyhzKSB7XG4gIHJldHVybiBzLmxpc3RlbmVycy5zb21lKGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMuc2hvdWxkVXBkYXRlOyB9KTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogVXBkYXRlIGEgZGVwZW5kZW50IHN0cmVhbSB1c2luZyBpdHMgZGVwZW5kZW5jaWVzIGluIGFuIGF0b21pYyB3YXlcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIHVwZGF0ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVTdHJlYW0ocykge1xuICBpZiAoaXNFbmRlZChzKSB8fCAhZGVwZW5kZW5jaWVzQXJlTWV0KHMpKSByZXR1cm47XG4gIGlmIChpblN0cmVhbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVTdHJlYW0sIHMpO1xuICAgIHJldHVybjtcbiAgfVxuICBpblN0cmVhbSA9IHM7XG4gIGlmIChzLmRlcHNDaGFuZ2VkKSBzLmZuQXJnc1tzLmZuQXJncy5sZW5ndGggLSAxXSA9IHMuZGVwc0NoYW5nZWQ7XG4gIHZhciByZXR1cm5WYWwgPSBzLmZuLmFwcGx5KHMuZm4sIHMuZm5BcmdzKTtcbiAgaWYgKHJldHVyblZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcyhyZXR1cm5WYWwpO1xuICB9XG4gIGluU3RyZWFtID0gdW5kZWZpbmVkO1xuICBpZiAocy5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBzLmRlcHNDaGFuZ2VkID0gW107XG4gIHMuc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gIGlmIChmbHVzaGluZygpID09PSBmYWxzZSkgZmx1c2hVcGRhdGUoKTtcbiAgaWYgKGxpc3RlbmVyc05lZWRVcGRhdGluZyhzKSkge1xuICAgIGlmICghZmx1c2hpbmdTdHJlYW1WYWx1ZSkgcyhzLnZhbClcbiAgICBlbHNlIHtcbiAgICAgIHMubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyLnNob3VsZFVwZGF0ZSkgdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVTdHJlYW0sIGxpc3RlbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBVcGRhdGUgdGhlIGRlcGVuZGVuY2llcyBvZiBhIHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICovXG5mdW5jdGlvbiB1cGRhdGVMaXN0ZW5lcnMocykge1xuICB2YXIgaSwgbywgbGlzdFxuICB2YXIgbGlzdGVuZXJzID0gcy5saXN0ZW5lcnM7XG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICBsaXN0ID0gbGlzdGVuZXJzW2ldO1xuICAgIGlmIChsaXN0LmVuZCA9PT0gcykge1xuICAgICAgZW5kU3RyZWFtKGxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGlzdC5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBsaXN0LmRlcHNDaGFuZ2VkLnB1c2gocyk7XG4gICAgICBsaXN0LnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICBmaW5kRGVwcyhsaXN0KTtcbiAgICB9XG4gIH1cbiAgZm9yICg7IG9yZGVyTmV4dElkeCA+PSAwOyAtLW9yZGVyTmV4dElkeCkge1xuICAgIG8gPSBvcmRlcltvcmRlck5leHRJZHhdO1xuICAgIGlmIChvLnNob3VsZFVwZGF0ZSA9PT0gdHJ1ZSkgdXBkYXRlU3RyZWFtKG8pO1xuICAgIG8ucXVldWVkID0gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQWRkIHN0cmVhbSBkZXBlbmRlbmNpZXMgdG8gdGhlIGdsb2JhbCBgb3JkZXJgIHF1ZXVlLlxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHNlZSB1cGRhdGVEZXBzXG4gKi9cbmZ1bmN0aW9uIGZpbmREZXBzKHMpIHtcbiAgdmFyIGlcbiAgdmFyIGxpc3RlbmVycyA9IHMubGlzdGVuZXJzO1xuICBpZiAocy5xdWV1ZWQgPT09IGZhbHNlKSB7XG4gICAgcy5xdWV1ZWQgPSB0cnVlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGZpbmREZXBzKGxpc3RlbmVyc1tpXSk7XG4gICAgfVxuICAgIG9yZGVyWysrb3JkZXJOZXh0SWR4XSA9IHM7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVyLCBzdHJlYW0pIHtcbiAgdG9VcGRhdGUucHVzaChzdHJlYW0pO1xuICBzdHJlYW0udXBkYXRlcnMucHVzaCh1cGRhdGVyKTtcbiAgc3RyZWFtLnNob3VsZFVwZGF0ZSA9IHRydWU7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZmx1c2hVcGRhdGUoKSB7XG4gIGZsdXNoaW5nVXBkYXRlUXVldWUgPSB0cnVlO1xuICB3aGlsZSAodG9VcGRhdGUubGVuZ3RoID4gMCkge1xuICAgIHZhciBzdHJlYW0gPSB0b1VwZGF0ZS5zaGlmdCgpO1xuICAgIHZhciBuZXh0VXBkYXRlRm4gPSBzdHJlYW0udXBkYXRlcnMuc2hpZnQoKTtcbiAgICBpZiAobmV4dFVwZGF0ZUZuICYmIHN0cmVhbS5zaG91bGRVcGRhdGUpIG5leHRVcGRhdGVGbihzdHJlYW0pO1xuICB9XG4gIGZsdXNoaW5nVXBkYXRlUXVldWUgPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogUHVzaCBkb3duIGEgdmFsdWUgaW50byBhIHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVTdHJlYW1WYWx1ZShuLCBzKSB7XG4gIHMudmFsID0gbjtcbiAgcy5oYXNWYWwgPSB0cnVlO1xuICBpZiAoaW5TdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgIGZsdXNoaW5nU3RyZWFtVmFsdWUgPSB0cnVlO1xuICAgIHVwZGF0ZUxpc3RlbmVycyhzKTtcbiAgICBpZiAodG9VcGRhdGUubGVuZ3RoID4gMCkgZmx1c2hVcGRhdGUoKTtcbiAgICBmbHVzaGluZ1N0cmVhbVZhbHVlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaW5TdHJlYW0gPT09IHMpIHtcbiAgICBtYXJrTGlzdGVuZXJzKHMsIHMubGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVMYXRlclVzaW5nKGZ1bmN0aW9uKHMpIHsgdXBkYXRlU3RyZWFtVmFsdWUobiwgcyk7IH0sIHMpO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFya0xpc3RlbmVycyhzLCBsaXN0cykge1xuICB2YXIgaSwgbGlzdDtcbiAgZm9yIChpID0gMDsgaSA8IGxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgbGlzdCA9IGxpc3RzW2ldO1xuICAgIGlmIChsaXN0LmVuZCAhPT0gcykge1xuICAgICAgaWYgKGxpc3QuZGVwc0NoYW5nZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsaXN0LmRlcHNDaGFuZ2VkLnB1c2gocyk7XG4gICAgICB9XG4gICAgICBsaXN0LnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuZFN0cmVhbShsaXN0KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQWRkIGRlcGVuZGVuY2llcyB0byBhIHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGRlcHMsIHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgKytpKSB7XG4gICAgZGVwc1tpXS5saXN0ZW5lcnMucHVzaChzKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBSZW1vdmVzIGFuIHN0cmVhbSBmcm9tIGEgZGVwZW5kZW5jeSBhcnJheVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIocywgbGlzdGVuZXJzKSB7XG4gIHZhciBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihzKTtcbiAgbGlzdGVuZXJzW2lkeF0gPSBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdO1xuICBsaXN0ZW5lcnMubGVuZ3RoLS07XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIERldGFjaCBhIHN0cmVhbSBmcm9tIGl0cyBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gZGV0YWNoRGVwcyhzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5kZXBzLmxlbmd0aDsgKytpKSB7XG4gICAgcmVtb3ZlTGlzdGVuZXIocywgcy5kZXBzW2ldLmxpc3RlbmVycyk7XG4gIH1cbiAgcy5kZXBzLmxlbmd0aCA9IDA7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIEVuZHMgYSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gZW5kU3RyZWFtKHMpIHtcbiAgaWYgKHMuZGVwcyAhPT0gdW5kZWZpbmVkKSBkZXRhY2hEZXBzKHMpO1xuICBpZiAocy5lbmQgIT09IHVuZGVmaW5lZCkgZGV0YWNoRGVwcyhzLmVuZCk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuLyoqXG4gKiBAcHJpdmF0ZVxuICogdHJhbnNkdWNlciBzdHJlYW0gdHJhbnNmb3JtZXJcbiAqL1xuZnVuY3Rpb24gU3RyZWFtVHJhbnNmb3JtZXIoKSB7IH1cblN0cmVhbVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkgeyB9O1xuU3RyZWFtVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbigpIHsgfTtcblN0cmVhbVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHMsIHYpIHsgcmV0dXJuIHY7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZmx5ZDtcbiIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcblxudmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2N1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGUgc3BlY2lmaWVkXG4gKiBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0c1xuICogYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzIGBSLmN1cnJ5TigzLCBmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgW2BSLl9fYF0oI19fKSBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIFtgUi5fX2BdKCNfXyksXG4gKiB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC41LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IGZvciB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc3VtQXJncyA9ICguLi5hcmdzKSA9PiBSLnN1bShhcmdzKTtcbiAqXG4gKiAgICAgIHZhciBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5Tig0LCBzdW1BcmdzKTtcbiAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIHZhciBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG5cblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGN1cnJ5TihsZW5ndGgsIGZuKSB7XG4gIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjdXJyeU47IiwiZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDc6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDg6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDEwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gX2FyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gX2FyaXR5OyIsInZhciBfaXNQbGFjZWhvbGRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIG9uZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgX2lzUGxhY2Vob2xkZXIoYSkpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MScpO1xuXG52YXIgX2lzUGxhY2Vob2xkZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gX2N1cnJ5Mihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjIoYSwgYikge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gZjI7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSA/IGYyIDogX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IpO1xuICAgICAgICB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYyIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkxKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgIHJldHVybiBmbihfYSwgYik7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYik7XG4gICAgICAgIH0pIDogZm4oYSwgYik7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyOyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fYXJpdHknKTtcblxudmFyIF9pc1BsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmICghX2lzUGxhY2Vob2xkZXIocmVjZWl2ZWRbY29tYmluZWRJZHhdKSB8fCBhcmdzSWR4ID49IGFyZ3VtZW50cy5sZW5ndGgpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlY2VpdmVkW2NvbWJpbmVkSWR4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1thcmdzSWR4XTtcbiAgICAgICAgYXJnc0lkeCArPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRbY29tYmluZWRJZHhdID0gcmVzdWx0O1xuICAgICAgaWYgKCFfaXNQbGFjZWhvbGRlcihyZXN1bHQpKSB7XG4gICAgICAgIGxlZnQgLT0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkSWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBsZWZ0IDw9IDAgPyBmbi5hcHBseSh0aGlzLCBjb21iaW5lZCkgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnlOOyIsImZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgICAgICByZXR1cm4gYSAhPSBudWxsICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzUGxhY2Vob2xkZXI7IiwiaW1wb3J0IF9jb25jYXQgZnJvbSAnLi9pbnRlcm5hbC9fY29uY2F0LmpzJztcbmltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX3JlZHVjZSBmcm9tICcuL2ludGVybmFsL19yZWR1Y2UuanMnO1xuaW1wb3J0IG1hcCBmcm9tICcuL21hcC5qcyc7XG5cbi8qKlxuICogYXAgYXBwbGllcyBhIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGEgbGlzdCBvZiB2YWx1ZXMuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGFwYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC4gQWxzb1xuICogdHJlYXRzIGN1cnJpZWQgZnVuY3Rpb25zIGFzIGFwcGxpY2F0aXZlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBbYSAtPiBiXSAtPiBbYV0gLT4gW2JdXG4gKiBAc2lnIEFwcGx5IGYgPT4gZiAoYSAtPiBiKSAtPiBmIGEgLT4gZiBiXG4gKiBAc2lnIChyIC0+IGEgLT4gYikgLT4gKHIgLT4gYSkgLT4gKHIgLT4gYilcbiAqIEBwYXJhbSB7Kn0gYXBwbHlGXG4gKiBAcGFyYW0geyp9IGFwcGx5WFxuICogQHJldHVybiB7Kn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFwKFtSLm11bHRpcGx5KDIpLCBSLmFkZCgzKV0sIFsxLDIsM10pOyAvLz0+IFsyLCA0LCA2LCA0LCA1LCA2XVxuICogICAgICBSLmFwKFtSLmNvbmNhdCgndGFzdHkgJyksIFIudG9VcHBlcl0sIFsncGl6emEnLCAnc2FsYWQnXSk7IC8vPT4gW1widGFzdHkgcGl6emFcIiwgXCJ0YXN0eSBzYWxhZFwiLCBcIlBJWlpBXCIsIFwiU0FMQURcIl1cbiAqXG4gKiAgICAgIC8vIFIuYXAgY2FuIGFsc28gYmUgdXNlZCBhcyBTIGNvbWJpbmF0b3JcbiAqICAgICAgLy8gd2hlbiBvbmx5IHR3byBmdW5jdGlvbnMgYXJlIHBhc3NlZFxuICogICAgICBSLmFwKFIuY29uY2F0LCBSLnRvVXBwZXIpKCdSYW1kYScpIC8vPT4gJ1JhbWRhUkFNREEnXG4gKiBAc3ltYiBSLmFwKFtmLCBnXSwgW2EsIGJdKSA9IFtmKGEpLCBmKGIpLCBnKGEpLCBnKGIpXVxuICovXG52YXIgYXAgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBhcChhcHBseUYsIGFwcGx5WCkge1xuICByZXR1cm4gdHlwZW9mIGFwcGx5WFsnZmFudGFzeS1sYW5kL2FwJ10gPT09ICdmdW5jdGlvbicgPyBhcHBseVhbJ2ZhbnRhc3ktbGFuZC9hcCddKGFwcGx5RikgOiB0eXBlb2YgYXBwbHlGLmFwID09PSAnZnVuY3Rpb24nID8gYXBwbHlGLmFwKGFwcGx5WCkgOiB0eXBlb2YgYXBwbHlGID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gYXBwbHlGKHgpKGFwcGx5WCh4KSk7XG4gIH0gOiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGYpIHtcbiAgICByZXR1cm4gX2NvbmNhdChhY2MsIG1hcChmLCBhcHBseVgpKTtcbiAgfSwgW10sIGFwcGx5Rik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGFwOyIsImltcG9ydCBfYXJpdHkgZnJvbSAnLi9pbnRlcm5hbC9fYXJpdHkuanMnO1xuaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyBib3VuZCB0byBhIGNvbnRleHQuXG4gKiBOb3RlOiBgUi5iaW5kYCBkb2VzIG5vdCBwcm92aWRlIHRoZSBhZGRpdGlvbmFsIGFyZ3VtZW50LWJpbmRpbmcgY2FwYWJpbGl0aWVzIG9mXG4gKiBbRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL2JpbmQpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjYuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgqIC0+ICopIC0+IHsqfSAtPiAoKiAtPiAqKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJpbmQgdG8gY29udGV4dFxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNPYmogVGhlIGNvbnRleHQgdG8gYmluZCBgZm5gIHRvXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgZXhlY3V0ZSBpbiB0aGUgY29udGV4dCBvZiBgdGhpc09iamAuXG4gKiBAc2VlIFIucGFydGlhbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGxvZyA9IFIuYmluZChjb25zb2xlLmxvZywgY29uc29sZSk7XG4gKiAgICAgIFIucGlwZShSLmFzc29jKCdhJywgMiksIFIudGFwKGxvZyksIFIuYXNzb2MoJ2EnLCAzKSkoe2E6IDF9KTsgLy89PiB7YTogM31cbiAqICAgICAgLy8gbG9ncyB7YTogMn1cbiAqIEBzeW1iIFIuYmluZChmLCBvKShhLCBiKSA9IGYuY2FsbChvLCBhLCBiKVxuICovXG52YXIgYmluZCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNPYmopIHtcbiAgcmV0dXJuIF9hcml0eShmbi5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc09iaiwgYXJndW1lbnRzKTtcbiAgfSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGJpbmQ7IiwiaW1wb3J0IHBpcGUgZnJvbSAnLi9waXBlLmpzJztcbmltcG9ydCByZXZlcnNlIGZyb20gJy4vcmV2ZXJzZS5qcyc7XG5cbi8qKlxuICogUGVyZm9ybXMgcmlnaHQtdG8tbGVmdCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIHJpZ2h0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZVxuICogYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICpcbiAqICoqTm90ZToqKiBUaGUgcmVzdWx0IG9mIGNvbXBvc2UgaXMgbm90IGF1dG9tYXRpY2FsbHkgY3VycmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKHkgLT4geiksICh4IC0+IHkpLCAuLi4sIChvIC0+IHApLCAoKGEsIGIsIC4uLiwgbikgLT4gbykpIC0+ICgoYSwgYiwgLi4uLCBuKSAtPiB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gLi4uZnVuY3Rpb25zIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIucGlwZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGNsYXNzeUdyZWV0aW5nID0gKGZpcnN0TmFtZSwgbGFzdE5hbWUpID0+IFwiVGhlIG5hbWUncyBcIiArIGxhc3ROYW1lICsgXCIsIFwiICsgZmlyc3ROYW1lICsgXCIgXCIgKyBsYXN0TmFtZVxuICogICAgICBjb25zdCB5ZWxsR3JlZXRpbmcgPSBSLmNvbXBvc2UoUi50b1VwcGVyLCBjbGFzc3lHcmVldGluZyk7XG4gKiAgICAgIHllbGxHcmVldGluZygnSmFtZXMnLCAnQm9uZCcpOyAvLz0+IFwiVEhFIE5BTUUnUyBCT05ELCBKQU1FUyBCT05EXCJcbiAqXG4gKiAgICAgIFIuY29tcG9zZShNYXRoLmFicywgUi5hZGQoMSksIFIubXVsdGlwbHkoMikpKC00KSAvLz0+IDdcbiAqXG4gKiBAc3ltYiBSLmNvbXBvc2UoZiwgZywgaCkoYSwgYikgPSBmKGcoaChhLCBiKSkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjb21wb3NlIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICB9XG4gIHJldHVybiBwaXBlLmFwcGx5KHRoaXMsIHJldmVyc2UoYXJndW1lbnRzKSk7XG59IiwiaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcbmltcG9ydCBfbWFwIGZyb20gJy4vaW50ZXJuYWwvX21hcC5qcyc7XG5pbXBvcnQgY3VycnlOIGZyb20gJy4vY3VycnlOLmpzJztcbmltcG9ydCBtYXggZnJvbSAnLi9tYXguanMnO1xuaW1wb3J0IHBsdWNrIGZyb20gJy4vcGx1Y2suanMnO1xuaW1wb3J0IHJlZHVjZSBmcm9tICcuL3JlZHVjZS5qcyc7XG5cbi8qKlxuICogQWNjZXB0cyBhIGNvbnZlcmdpbmcgZnVuY3Rpb24gYW5kIGEgbGlzdCBvZiBicmFuY2hpbmcgZnVuY3Rpb25zIGFuZCByZXR1cm5zXG4gKiBhIG5ldyBmdW5jdGlvbi4gVGhlIGFyaXR5IG9mIHRoZSBuZXcgZnVuY3Rpb24gaXMgdGhlIHNhbWUgYXMgdGhlIGFyaXR5IG9mXG4gKiB0aGUgbG9uZ2VzdCBicmFuY2hpbmcgZnVuY3Rpb24uIFdoZW4gaW52b2tlZCwgdGhpcyBuZXcgZnVuY3Rpb24gaXMgYXBwbGllZFxuICogdG8gc29tZSBhcmd1bWVudHMsIGFuZCBlYWNoIGJyYW5jaGluZyBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRob3NlIHNhbWVcbiAqIGFyZ3VtZW50cy4gVGhlIHJlc3VsdHMgb2YgZWFjaCBicmFuY2hpbmcgZnVuY3Rpb24gYXJlIHBhc3NlZCBhcyBhcmd1bWVudHNcbiAqIHRvIHRoZSBjb252ZXJnaW5nIGZ1bmN0aW9uIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC40LjJcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKHgxLCB4MiwgLi4uKSAtPiB6KSAtPiBbKChhLCBiLCAuLi4pIC0+IHgxKSwgKChhLCBiLCAuLi4pIC0+IHgyKSwgLi4uXSAtPiAoYSAtPiBiIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYWZ0ZXIgQSBmdW5jdGlvbi4gYGFmdGVyYCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlcyBvZlxuICogICAgICAgIGBmbjFgIGFuZCBgZm4yYCBhcyBpdHMgYXJndW1lbnRzLlxuICogQHBhcmFtIHtBcnJheX0gZnVuY3Rpb25zIEEgbGlzdCBvZiBmdW5jdGlvbnMuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24uXG4gKiBAc2VlIFIudXNlV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGF2ZXJhZ2UgPSBSLmNvbnZlcmdlKFIuZGl2aWRlLCBbUi5zdW0sIFIubGVuZ3RoXSlcbiAqICAgICAgYXZlcmFnZShbMSwgMiwgMywgNCwgNSwgNiwgN10pIC8vPT4gNFxuICpcbiAqICAgICAgY29uc3Qgc3RyYW5nZUNvbmNhdCA9IFIuY29udmVyZ2UoUi5jb25jYXQsIFtSLnRvVXBwZXIsIFIudG9Mb3dlcl0pXG4gKiAgICAgIHN0cmFuZ2VDb25jYXQoXCJZb2RlbFwiKSAvLz0+IFwiWU9ERUx5b2RlbFwiXG4gKlxuICogQHN5bWIgUi5jb252ZXJnZShmLCBbZywgaF0pKGEsIGIpID0gZihnKGEsIGIpLCBoKGEsIGIpKVxuICovXG52YXIgY29udmVyZ2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBjb252ZXJnZShhZnRlciwgZm5zKSB7XG4gIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIGZucykpLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgIHJldHVybiBhZnRlci5hcHBseShjb250ZXh0LCBfbWFwKGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH0sIGZucykpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgY29udmVyZ2U7IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBjdXJyeU4gZnJvbSAnLi9jdXJyeU4uanMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLiBUaGUgY3VycmllZCBmdW5jdGlvblxuICogaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0cyBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmVcbiAqIGF0IGEgdGltZS4gSWYgYGZgIGlzIGEgdGVybmFyeSBmdW5jdGlvbiBhbmQgYGdgIGlzIGBSLmN1cnJ5KGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBbYFIuX19gXSgjX18pIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgW2BSLl9fYF0oI19fKSxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlOLCBSLnBhcnRpYWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBhZGRGb3VyTnVtYmVycyA9IChhLCBiLCBjLCBkKSA9PiBhICsgYiArIGMgKyBkO1xuICpcbiAqICAgICAgY29uc3QgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeShhZGRGb3VyTnVtYmVycyk7XG4gKiAgICAgIGNvbnN0IGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIGNvbnN0IGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cbnZhciBjdXJyeSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGN1cnJ5KGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmbik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGN1cnJ5OyIsImltcG9ydCBfYXJpdHkgZnJvbSAnLi9pbnRlcm5hbC9fYXJpdHkuanMnO1xuaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX2N1cnJ5TiBmcm9tICcuL2ludGVybmFsL19jdXJyeU4uanMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCB3aXRoIHRoZSBzcGVjaWZpZWRcbiAqIGFyaXR5LiBUaGUgY3VycmllZCBmdW5jdGlvbiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzXG4gKiBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmUgYXQgYSB0aW1lLiBJZiBgZ2AgaXMgYFIuY3VycnlOKDMsIGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBbYFIuX19gXSgjX18pIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgW2BSLl9fYF0oI19fKSxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjUuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IHN1bUFyZ3MgPSAoLi4uYXJncykgPT4gUi5zdW0oYXJncyk7XG4gKlxuICogICAgICBjb25zdCBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5Tig0LCBzdW1BcmdzKTtcbiAqICAgICAgY29uc3QgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgY29uc3QgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGN1cnJ5TihsZW5ndGgsIGZuKSB7XG4gIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgY3VycnlOOyIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX2VxdWFscyBmcm9tICcuL2ludGVybmFsL19lcXVhbHMuanMnO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGl0cyBhcmd1bWVudHMgYXJlIGVxdWl2YWxlbnQsIGBmYWxzZWAgb3RoZXJ3aXNlLiBIYW5kbGVzXG4gKiBjeWNsaWNhbCBkYXRhIHN0cnVjdHVyZXMuXG4gKlxuICogRGlzcGF0Y2hlcyBzeW1tZXRyaWNhbGx5IHRvIHRoZSBgZXF1YWxzYCBtZXRob2RzIG9mIGJvdGggYXJndW1lbnRzLCBpZlxuICogcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgYSAtPiBiIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZXF1YWxzKDEsIDEpOyAvLz0+IHRydWVcbiAqICAgICAgUi5lcXVhbHMoMSwgJzEnKTsgLy89PiBmYWxzZVxuICogICAgICBSLmVxdWFscyhbMSwgMiwgM10sIFsxLCAyLCAzXSk7IC8vPT4gdHJ1ZVxuICpcbiAqICAgICAgY29uc3QgYSA9IHt9OyBhLnYgPSBhO1xuICogICAgICBjb25zdCBiID0ge307IGIudiA9IGI7XG4gKiAgICAgIFIuZXF1YWxzKGEsIGIpOyAvLz0+IHRydWVcbiAqL1xudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBfZXF1YWxzKGEsIGIsIFtdLCBbXSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGVxdWFsczsiLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IF9kaXNwYXRjaGFibGUgZnJvbSAnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlLmpzJztcbmltcG9ydCBfZmlsdGVyIGZyb20gJy4vaW50ZXJuYWwvX2ZpbHRlci5qcyc7XG5pbXBvcnQgX2lzT2JqZWN0IGZyb20gJy4vaW50ZXJuYWwvX2lzT2JqZWN0LmpzJztcbmltcG9ydCBfcmVkdWNlIGZyb20gJy4vaW50ZXJuYWwvX3JlZHVjZS5qcyc7XG5pbXBvcnQgX3hmaWx0ZXIgZnJvbSAnLi9pbnRlcm5hbC9feGZpbHRlci5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIFRha2VzIGEgcHJlZGljYXRlIGFuZCBhIGBGaWx0ZXJhYmxlYCwgYW5kIHJldHVybnMgYSBuZXcgZmlsdGVyYWJsZSBvZiB0aGVcbiAqIHNhbWUgdHlwZSBjb250YWluaW5nIHRoZSBtZW1iZXJzIG9mIHRoZSBnaXZlbiBmaWx0ZXJhYmxlIHdoaWNoIHNhdGlzZnkgdGhlXG4gKiBnaXZlbiBwcmVkaWNhdGUuIEZpbHRlcmFibGUgb2JqZWN0cyBpbmNsdWRlIHBsYWluIG9iamVjdHMgb3IgYW55IG9iamVjdFxuICogdGhhdCBoYXMgYSBmaWx0ZXIgbWV0aG9kIHN1Y2ggYXMgYEFycmF5YC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmlsdGVyYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IGYgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gZmlsdGVyYWJsZVxuICogQHJldHVybiB7QXJyYXl9IEZpbHRlcmFibGVcbiAqIEBzZWUgUi5yZWplY3QsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgaXNFdmVuID0gbiA9PiBuICUgMiA9PT0gMDtcbiAqXG4gKiAgICAgIFIuZmlsdGVyKGlzRXZlbiwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAqXG4gKiAgICAgIFIuZmlsdGVyKGlzRXZlbiwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YjogMiwgZDogNH1cbiAqL1xudmFyIGZpbHRlciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ2ZpbHRlciddLCBfeGZpbHRlciwgZnVuY3Rpb24gKHByZWQsIGZpbHRlcmFibGUpIHtcbiAgcmV0dXJuIF9pc09iamVjdChmaWx0ZXJhYmxlKSA/IF9yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgaWYgKHByZWQoZmlsdGVyYWJsZVtrZXldKSkge1xuICAgICAgYWNjW2tleV0gPSBmaWx0ZXJhYmxlW2tleV07XG4gICAgfVxuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9LCBrZXlzKGZpbHRlcmFibGUpKSA6XG4gIC8vIGVsc2VcbiAgX2ZpbHRlcihwcmVkLCBmaWx0ZXJhYmxlKTtcbn0pKTtcbmV4cG9ydCBkZWZhdWx0IGZpbHRlcjsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IGN1cnJ5TiBmcm9tICcuL2N1cnJ5Ti5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiBtdWNoIGxpa2UgdGhlIHN1cHBsaWVkIG9uZSwgZXhjZXB0IHRoYXQgdGhlIGZpcnN0IHR3b1xuICogYXJndW1lbnRzJyBvcmRlciBpcyByZXZlcnNlZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKGEsIGIsIGMsIC4uLikgLT4geikgLT4gKGIgLT4gYSAtPiBjIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZSB3aXRoIGl0cyBmaXJzdCB0d28gcGFyYW1ldGVycyByZXZlcnNlZC5cbiAqIEByZXR1cm4geyp9IFRoZSByZXN1bHQgb2YgaW52b2tpbmcgYGZuYCB3aXRoIGl0cyBmaXJzdCB0d28gcGFyYW1ldGVycycgb3JkZXIgcmV2ZXJzZWQuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgbWVyZ2VUaHJlZSA9IChhLCBiLCBjKSA9PiBbXS5jb25jYXQoYSwgYiwgYyk7XG4gKlxuICogICAgICBtZXJnZVRocmVlKDEsIDIsIDMpOyAvLz0+IFsxLCAyLCAzXVxuICpcbiAqICAgICAgUi5mbGlwKG1lcmdlVGhyZWUpKDEsIDIsIDMpOyAvLz0+IFsyLCAxLCAzXVxuICogQHN5bWIgUi5mbGlwKGYpKGEsIGIsIGMpID0gZihiLCBhLCBjKVxuICovXG52YXIgZmxpcCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGZsaXAoZm4pIHtcbiAgcmV0dXJuIGN1cnJ5Tihmbi5sZW5ndGgsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3NbMF0gPSBiO1xuICAgIGFyZ3NbMV0gPSBhO1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfSk7XG59KTtcbmV4cG9ydCBkZWZhdWx0IGZsaXA7IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBfaWRlbnRpdHkgZnJvbSAnLi9pbnRlcm5hbC9faWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBkb2VzIG5vdGhpbmcgYnV0IHJldHVybiB0aGUgcGFyYW1ldGVyIHN1cHBsaWVkIHRvIGl0LiBHb29kXG4gKiBhcyBhIGRlZmF1bHQgb3IgcGxhY2Vob2xkZXIgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgYSAtPiBhXG4gKiBAcGFyYW0geyp9IHggVGhlIHZhbHVlIHRvIHJldHVybi5cbiAqIEByZXR1cm4geyp9IFRoZSBpbnB1dCB2YWx1ZSwgYHhgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaWRlbnRpdHkoMSk7IC8vPT4gMVxuICpcbiAqICAgICAgY29uc3Qgb2JqID0ge307XG4gKiAgICAgIFIuaWRlbnRpdHkob2JqKSA9PT0gb2JqOyAvLz0+IHRydWVcbiAqIEBzeW1iIFIuaWRlbnRpdHkoYSkgPSBhXG4gKi9cbnZhciBpZGVudGl0eSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKF9pZGVudGl0eSk7XG5leHBvcnQgZGVmYXVsdCBpZGVudGl0eTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgODpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUZyb21JdGVyYXRvcihpdGVyKSB7XG4gIHZhciBsaXN0ID0gW107XG4gIHZhciBuZXh0O1xuICB3aGlsZSAoIShuZXh0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICBsaXN0LnB1c2gobmV4dC52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59IiwiaW1wb3J0IF9pc0FycmF5IGZyb20gJy4vX2lzQXJyYXkuanMnO1xuXG4vKipcbiAqIFRoaXMgY2hlY2tzIHdoZXRoZXIgYSBmdW5jdGlvbiBoYXMgYSBbbWV0aG9kbmFtZV0gZnVuY3Rpb24uIElmIGl0IGlzbid0IGFuXG4gKiBhcnJheSBpdCB3aWxsIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiBvdGhlcndpc2UgaXQgd2lsbCBkZWZhdWx0IHRvIHRoZSByYW1kYVxuICogaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHJhbWRhIGltcGxlbXRhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZG5hbWUgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtPYmplY3R9IFdoYXRldmVyIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIG1ldGhvZCBpcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NoZWNrRm9yTWV0aG9kKG1ldGhvZG5hbWUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIHZhciBvYmogPSBhcmd1bWVudHNbbGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF9pc0FycmF5KG9iaikgfHwgdHlwZW9mIG9ialttZXRob2RuYW1lXSAhPT0gJ2Z1bmN0aW9uJyA/IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBvYmpbbWV0aG9kbmFtZV0uYXBwbHkob2JqLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGxlbmd0aCAtIDEpKTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY29tcGxlbWVudChmKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICFmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59IiwiLyoqXG4gKiBQcml2YXRlIGBjb25jYXRgIGZ1bmN0aW9uIHRvIG1lcmdlIHR3byBhcnJheS1saWtlIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBbc2V0MT1bXV0gQW4gYXJyYXktbGlrZSBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gW3NldDI9W11dIEFuIGFycmF5LWxpa2Ugb2JqZWN0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3LCBtZXJnZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2NvbmNhdChbNCwgNSwgNl0sIFsxLCAyLCAzXSk7IC8vPT4gWzQsIDUsIDYsIDEsIDIsIDNdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jb25jYXQoc2V0MSwgc2V0Mikge1xuICBzZXQxID0gc2V0MSB8fCBbXTtcbiAgc2V0MiA9IHNldDIgfHwgW107XG4gIHZhciBpZHg7XG4gIHZhciBsZW4xID0gc2V0MS5sZW5ndGg7XG4gIHZhciBsZW4yID0gc2V0Mi5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGVuMSkge1xuICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHNldDFbaWR4XTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGVuMikge1xuICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHNldDJbaWR4XTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCBfaXNQbGFjZWhvbGRlciBmcm9tICcuL19pc1BsYWNlaG9sZGVyLmpzJztcblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgb25lLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2N1cnJ5MShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjEoYSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IF9pc1BsYWNlaG9sZGVyKGEpKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL19jdXJyeTEuanMnO1xuaW1wb3J0IF9pc1BsYWNlaG9sZGVyIGZyb20gJy4vX2lzUGxhY2Vob2xkZXIuanMnO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3VycnkyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMihhLCBiKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjIgOiBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYik7XG4gICAgICAgIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjIgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBiKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iKTtcbiAgICAgICAgfSkgOiBmbihhLCBiKTtcbiAgICB9XG4gIH07XG59IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9fY3VycnkxLmpzJztcbmltcG9ydCBfY3VycnkyIGZyb20gJy4vX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX2lzUGxhY2Vob2xkZXIgZnJvbSAnLi9faXNQbGFjZWhvbGRlci5qcyc7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHRocmVlLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2N1cnJ5Myhmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjMoYSwgYiwgYykge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gZjM7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSA/IGYzIDogX2N1cnJ5MihmdW5jdGlvbiAoX2IsIF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iLCBfYyk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBmMyA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MihmdW5jdGlvbiAoX2EsIF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBiLCBfYyk7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkyKGZ1bmN0aW9uIChfYiwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IsIF9jKTtcbiAgICAgICAgfSkgOiBfY3VycnkxKGZ1bmN0aW9uIChfYykge1xuICAgICAgICAgIHJldHVybiBmbihhLCBiLCBfYyk7XG4gICAgICAgIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gZjMgOiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTIoZnVuY3Rpb24gKF9hLCBfYikge1xuICAgICAgICAgIHJldHVybiBmbihfYSwgX2IsIGMpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MihmdW5jdGlvbiAoX2EsIF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBiLCBfYyk7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYikgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkyKGZ1bmN0aW9uIChfYiwgX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IsIF9jKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBiLCBjKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iLCBjKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIF9jKTtcbiAgICAgICAgfSkgOiBmbihhLCBiLCBjKTtcbiAgICB9XG4gIH07XG59IiwiaW1wb3J0IF9hcml0eSBmcm9tICcuL19hcml0eS5qcyc7XG5pbXBvcnQgX2lzUGxhY2Vob2xkZXIgZnJvbSAnLi9faXNQbGFjZWhvbGRlci5qcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgY3VycnlOIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IG9mIHRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtBcnJheX0gcmVjZWl2ZWQgQW4gYXJyYXkgb2YgYXJndW1lbnRzIHJlY2VpdmVkIHRodXMgZmFyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmICghX2lzUGxhY2Vob2xkZXIocmVjZWl2ZWRbY29tYmluZWRJZHhdKSB8fCBhcmdzSWR4ID49IGFyZ3VtZW50cy5sZW5ndGgpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlY2VpdmVkW2NvbWJpbmVkSWR4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1thcmdzSWR4XTtcbiAgICAgICAgYXJnc0lkeCArPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRbY29tYmluZWRJZHhdID0gcmVzdWx0O1xuICAgICAgaWYgKCFfaXNQbGFjZWhvbGRlcihyZXN1bHQpKSB7XG4gICAgICAgIGxlZnQgLT0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkSWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBsZWZ0IDw9IDAgPyBmbi5hcHBseSh0aGlzLCBjb21iaW5lZCkgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufSIsImltcG9ydCBfaXNBcnJheSBmcm9tICcuL19pc0FycmF5LmpzJztcbmltcG9ydCBfaXNUcmFuc2Zvcm1lciBmcm9tICcuL19pc1RyYW5zZm9ybWVyLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIHdpdGggZGlmZmVyZW50IHN0cmF0ZWdpZXMgYmFzZWQgb24gdGhlXG4gKiBvYmplY3QgaW4gbGlzdCBwb3NpdGlvbiAobGFzdCBhcmd1bWVudCkuIElmIGl0IGlzIGFuIGFycmF5LCBleGVjdXRlcyBbZm5dLlxuICogT3RoZXJ3aXNlLCBpZiBpdCBoYXMgYSBmdW5jdGlvbiB3aXRoIG9uZSBvZiB0aGUgZ2l2ZW4gbWV0aG9kIG5hbWVzLCBpdCB3aWxsXG4gKiBleGVjdXRlIHRoYXQgZnVuY3Rpb24gKGZ1bmN0b3IgY2FzZSkuIE90aGVyd2lzZSwgaWYgaXQgaXMgYSB0cmFuc2Zvcm1lcixcbiAqIHVzZXMgdHJhbnNkdWNlciBbeGZdIHRvIHJldHVybiBhIG5ldyB0cmFuc2Zvcm1lciAodHJhbnNkdWNlciBjYXNlKS5cbiAqIE90aGVyd2lzZSwgaXQgd2lsbCBkZWZhdWx0IHRvIGV4ZWN1dGluZyBbZm5dLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lcyBwcm9wZXJ0aWVzIHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0geGYgdHJhbnNkdWNlciB0byBpbml0aWFsaXplIGlmIG9iamVjdCBpcyB0cmFuc2Zvcm1lclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gZGVmYXVsdCByYW1kYSBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIG9uIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kaXNwYXRjaGFibGUobWV0aG9kTmFtZXMsIHhmLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIHZhciBvYmogPSBhcmdzLnBvcCgpO1xuICAgIGlmICghX2lzQXJyYXkob2JqKSkge1xuICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICB3aGlsZSAoaWR4IDwgbWV0aG9kTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW21ldGhvZE5hbWVzW2lkeF1dID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialttZXRob2ROYW1lc1tpZHhdXS5hcHBseShvYmosIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlkeCArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKF9pc1RyYW5zZm9ybWVyKG9iaikpIHtcbiAgICAgICAgdmFyIHRyYW5zZHVjZXIgPSB4Zi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZHVjZXIob2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59IiwiaW1wb3J0IF9hcnJheUZyb21JdGVyYXRvciBmcm9tICcuL19hcnJheUZyb21JdGVyYXRvci5qcyc7XG5pbXBvcnQgX2luY2x1ZGVzV2l0aCBmcm9tICcuL19pbmNsdWRlc1dpdGguanMnO1xuaW1wb3J0IF9mdW5jdGlvbk5hbWUgZnJvbSAnLi9fZnVuY3Rpb25OYW1lLmpzJztcbmltcG9ydCBfaGFzIGZyb20gJy4vX2hhcy5qcyc7XG5pbXBvcnQgX29iamVjdElzIGZyb20gJy4vX29iamVjdElzLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4uL2tleXMuanMnO1xuaW1wb3J0IHR5cGUgZnJvbSAnLi4vdHlwZS5qcyc7XG5cbi8qKlxuICogcHJpdmF0ZSBfdW5pcUNvbnRlbnRFcXVhbHMgZnVuY3Rpb24uXG4gKiBUaGF0IGZ1bmN0aW9uIGlzIGNoZWNraW5nIGVxdWFsaXR5IG9mIDIgaXRlcmF0b3IgY29udGVudHMgd2l0aCAyIGFzc3VtcHRpb25zXG4gKiAtIGl0ZXJhdG9ycyBsZW5ndGhzIGFyZSB0aGUgc2FtZVxuICogLSBpdGVyYXRvcnMgdmFsdWVzIGFyZSB1bmlxdWVcbiAqXG4gKiBmYWxzZS1wb3NpdGl2ZSByZXN1bHQgd2lsbCBiZSByZXR1cm5lZCBmb3IgY29tcGFyaXNpb24gb2YsIGUuZy5cbiAqIC0gWzEsMiwzXSBhbmQgWzEsMiwzLDRdXG4gKiAtIFsxLDEsMV0gYW5kIFsxLDIsM11cbiAqICovXG5cbmZ1bmN0aW9uIF91bmlxQ29udGVudEVxdWFscyhhSXRlcmF0b3IsIGJJdGVyYXRvciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGEgPSBfYXJyYXlGcm9tSXRlcmF0b3IoYUl0ZXJhdG9yKTtcbiAgdmFyIGIgPSBfYXJyYXlGcm9tSXRlcmF0b3IoYkl0ZXJhdG9yKTtcblxuICBmdW5jdGlvbiBlcShfYSwgX2IpIHtcbiAgICByZXR1cm4gX2VxdWFscyhfYSwgX2IsIHN0YWNrQS5zbGljZSgpLCBzdGFja0Iuc2xpY2UoKSk7XG4gIH1cblxuICAvLyBpZiAqYSogYXJyYXkgY29udGFpbnMgYW55IGVsZW1lbnQgdGhhdCBpcyBub3QgaW5jbHVkZWQgaW4gKmIqXG4gIHJldHVybiAhX2luY2x1ZGVzV2l0aChmdW5jdGlvbiAoYiwgYUl0ZW0pIHtcbiAgICByZXR1cm4gIV9pbmNsdWRlc1dpdGgoZXEsIGFJdGVtLCBiKTtcbiAgfSwgYiwgYSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9lcXVhbHMoYSwgYiwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKF9vYmplY3RJcyhhLCBiKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIHR5cGVBID0gdHlwZShhKTtcblxuICBpZiAodHlwZUEgIT09IHR5cGUoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYVsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBiWydmYW50YXN5LWxhbmQvZXF1YWxzJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZW9mIGFbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBhWydmYW50YXN5LWxhbmQvZXF1YWxzJ10oYikgJiYgdHlwZW9mIGJbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBiWydmYW50YXN5LWxhbmQvZXF1YWxzJ10oYSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGEuZXF1YWxzID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBiLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiYgYS5lcXVhbHMoYikgJiYgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmIGIuZXF1YWxzKGEpO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlQSkge1xuICAgIGNhc2UgJ0FyZ3VtZW50cyc6XG4gICAgY2FzZSAnQXJyYXknOlxuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgICBpZiAodHlwZW9mIGEuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiYgX2Z1bmN0aW9uTmFtZShhLmNvbnN0cnVjdG9yKSA9PT0gJ1Byb21pc2UnKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnTnVtYmVyJzpcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgaWYgKCEodHlwZW9mIGEgPT09IHR5cGVvZiBiICYmIF9vYmplY3RJcyhhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdEYXRlJzpcbiAgICAgIGlmICghX29iamVjdElzKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRXJyb3InOlxuICAgICAgcmV0dXJuIGEubmFtZSA9PT0gYi5uYW1lICYmIGEubWVzc2FnZSA9PT0gYi5tZXNzYWdlO1xuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICBpZiAoIShhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgYS5nbG9iYWwgPT09IGIuZ2xvYmFsICYmIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlICYmIGEubXVsdGlsaW5lID09PSBiLm11bHRpbGluZSAmJiBhLnN0aWNreSA9PT0gYi5zdGlja3kgJiYgYS51bmljb2RlID09PSBiLnVuaWNvZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIGlkeCA9IHN0YWNrQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICBpZiAoc3RhY2tBW2lkeF0gPT09IGEpIHtcbiAgICAgIHJldHVybiBzdGFja0JbaWR4XSA9PT0gYjtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGVBKSB7XG4gICAgY2FzZSAnTWFwJzpcbiAgICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdW5pcUNvbnRlbnRFcXVhbHMoYS5lbnRyaWVzKCksIGIuZW50cmllcygpLCBzdGFja0EuY29uY2F0KFthXSksIHN0YWNrQi5jb25jYXQoW2JdKSk7XG4gICAgY2FzZSAnU2V0JzpcbiAgICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdW5pcUNvbnRlbnRFcXVhbHMoYS52YWx1ZXMoKSwgYi52YWx1ZXMoKSwgc3RhY2tBLmNvbmNhdChbYV0pLCBzdGFja0IuY29uY2F0KFtiXSkpO1xuICAgIGNhc2UgJ0FyZ3VtZW50cyc6XG4gICAgY2FzZSAnQXJyYXknOlxuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnTnVtYmVyJzpcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgIGNhc2UgJ0RhdGUnOlxuICAgIGNhc2UgJ0Vycm9yJzpcbiAgICBjYXNlICdSZWdFeHAnOlxuICAgIGNhc2UgJ0ludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhDbGFtcGVkQXJyYXknOlxuICAgIGNhc2UgJ0ludDE2QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzpcbiAgICBjYXNlICdJbnQzMkFycmF5JzpcbiAgICBjYXNlICdVaW50MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDY0QXJyYXknOlxuICAgIGNhc2UgJ0FycmF5QnVmZmVyJzpcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBWYWx1ZXMgb2Ygb3RoZXIgdHlwZXMgYXJlIG9ubHkgZXF1YWwgaWYgaWRlbnRpY2FsLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0ga2V5cyhhKTtcbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZXh0ZW5kZWRTdGFja0EgPSBzdGFja0EuY29uY2F0KFthXSk7XG4gIHZhciBleHRlbmRlZFN0YWNrQiA9IHN0YWNrQi5jb25jYXQoW2JdKTtcblxuICBpZHggPSBrZXlzQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICB2YXIga2V5ID0ga2V5c0FbaWR4XTtcbiAgICBpZiAoIShfaGFzKGtleSwgYikgJiYgX2VxdWFscyhiW2tleV0sIGFba2V5XSwgZXh0ZW5kZWRTdGFja0EsIGV4dGVuZGVkU3RhY2tCKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2ZpbHRlcihmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Z1bmN0aW9uTmFtZShmKSB7XG4gIC8vIFN0cmluZyh4ID0+IHgpIGV2YWx1YXRlcyB0byBcInggPT4geFwiLCBzbyB0aGUgcGF0dGVybiBtYXkgbm90IG1hdGNoLlxuICB2YXIgbWF0Y2ggPSBTdHJpbmcoZikubWF0Y2goL15mdW5jdGlvbiAoXFx3KikvKTtcbiAgcmV0dXJuIG1hdGNoID09IG51bGwgPyAnJyA6IG1hdGNoWzFdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9oYXMocHJvcCwgb2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaWRlbnRpdHkoeCkge1xuICByZXR1cm4geDtcbn0iLCJpbXBvcnQgX2luZGV4T2YgZnJvbSAnLi9faW5kZXhPZi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmNsdWRlcyhhLCBsaXN0KSB7XG4gIHJldHVybiBfaW5kZXhPZihsaXN0LCBhLCAwKSA+PSAwO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmNsdWRlc1dpdGgocHJlZCwgeCwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAocHJlZCh4LCBsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCBlcXVhbHMgZnJvbSAnLi4vZXF1YWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luZGV4T2YobGlzdCwgYSwgaWR4KSB7XG4gIHZhciBpbmYsIGl0ZW07XG4gIC8vIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIGRvZXNuJ3QgZXhpc3QgYmVsb3cgSUU5XG4gIGlmICh0eXBlb2YgbGlzdC5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgYSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgICAvLyBtYW51YWxseSBjcmF3bCB0aGUgbGlzdCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuICswIGFuZCAtMFxuICAgICAgICAgIGluZiA9IDEgLyBhO1xuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSAwICYmIDEgLyBpdGVtID09PSBpbmYpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSAhPT0gYSkge1xuICAgICAgICAgIC8vIE5hTlxuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicgJiYgaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub24temVybyBudW1iZXJzIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGEsIGlkeCk7XG5cbiAgICAgIC8vIGFsbCB0aGVzZSB0eXBlcyBjYW4gdXRpbGlzZSBTZXRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKGEgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBudWxsIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBhbnl0aGluZyBlbHNlIG5vdCBjb3ZlcmVkIGFib3ZlLCBkZWZlciB0byBSLmVxdWFsc1xuICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICBpZiAoZXF1YWxzKGxpc3RbaWR4XSwgYSkpIHtcbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiAtMTtcbn0iLCJpbXBvcnQgX2hhcyBmcm9tICcuL19oYXMuanMnO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIF9pc0FyZ3VtZW50cyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFyZ3VtZW50cykgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nID8gZnVuY3Rpb24gX2lzQXJndW1lbnRzKHgpIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gIH0gOiBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkge1xuICAgIHJldHVybiBfaGFzKCdjYWxsZWUnLCB4KTtcbiAgfTtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgX2lzQXJndW1lbnRzOyIsIi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHZhbGAgaXMgYW4gYXJyYXksIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIF9pc0FycmF5KFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIF9pc0FycmF5KG51bGwpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5KHt9KTsgLy89PiBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmxlbmd0aCA+PSAwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufTsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL19jdXJyeTEuanMnO1xuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4vX2lzQXJyYXkuanMnO1xuaW1wb3J0IF9pc1N0cmluZyBmcm9tICcuL19pc1N0cmluZy5qcyc7XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIHNpbWlsYXIgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBUeXBlXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAqIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0geCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGhhcyBhIG51bWVyaWMgbGVuZ3RoIHByb3BlcnR5IGFuZCBleHRyZW1lIGluZGljZXMgZGVmaW5lZDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2lzQXJyYXlMaWtlKFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh0cnVlKTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheUxpa2Uoe30pOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7bGVuZ3RoOiAxMH0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7MDogJ3plcm8nLCA5OiAnbmluZScsIGxlbmd0aDogMTB9KTsgLy89PiB0cnVlXG4gKi9cbnZhciBfaXNBcnJheUxpa2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gIGlmIChfaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgheCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChfaXNTdHJpbmcoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubm9kZVR5cGUgPT09IDEpIHtcbiAgICByZXR1cm4gISF4Lmxlbmd0aDtcbiAgfVxuICBpZiAoeC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHguaGFzT3duUHJvcGVydHkoMCkgJiYgeC5oYXNPd25Qcm9wZXJ0eSh4Lmxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgX2lzQXJyYXlMaWtlOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNPYmplY3QoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNQbGFjZWhvbGRlcihhKSB7XG4gICAgICAgcmV0dXJuIGEgIT0gbnVsbCAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWU7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2lzU3RyaW5nKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2lzVHJhbnNmb3JtZXIob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqWydAQHRyYW5zZHVjZXIvc3RlcCddID09PSAnZnVuY3Rpb24nO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9tYXAoZm4sIGZ1bmN0b3IpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBmdW5jdG9yLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbik7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICByZXN1bHRbaWR4XSA9IGZuKGZ1bmN0b3JbaWR4XSk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvLyBCYXNlZCBvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbmZ1bmN0aW9uIF9vYmplY3RJcyhhLCBiKSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKGEgPT09IGIpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IF9vYmplY3RJczsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcGlwZShmLCBnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGcuY2FsbCh0aGlzLCBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9xdW90ZShzKSB7XG4gIHZhciBlc2NhcGVkID0gcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoL1tcXGJdL2csICdcXFxcYicpIC8vIFxcYiBtYXRjaGVzIHdvcmQgYm91bmRhcnk7IFtcXGJdIG1hdGNoZXMgYmFja3NwYWNlXG4gIC5yZXBsYWNlKC9cXGYvZywgJ1xcXFxmJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKS5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JykucmVwbGFjZSgvXFx2L2csICdcXFxcdicpLnJlcGxhY2UoL1xcMC9nLCAnXFxcXDAnKTtcblxuICByZXR1cm4gJ1wiJyArIGVzY2FwZWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiJztcbn0iLCJpbXBvcnQgX2lzQXJyYXlMaWtlIGZyb20gJy4vX2lzQXJyYXlMaWtlLmpzJztcbmltcG9ydCBfeHdyYXAgZnJvbSAnLi9feHdyYXAuanMnO1xuaW1wb3J0IGJpbmQgZnJvbSAnLi4vYmluZC5qcyc7XG5cbmZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIGxpc3RbaWR4XSk7XG4gICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbn1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlUmVkdWNlKHhmLCBhY2MsIGl0ZXIpIHtcbiAgdmFyIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgd2hpbGUgKCFzdGVwLmRvbmUpIHtcbiAgICBhY2MgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShhY2MsIHN0ZXAudmFsdWUpO1xuICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgfVxuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShhY2MpO1xufVxuXG5mdW5jdGlvbiBfbWV0aG9kUmVkdWNlKHhmLCBhY2MsIG9iaiwgbWV0aG9kTmFtZSkge1xuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShvYmpbbWV0aG9kTmFtZV0oYmluZCh4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgeGYpLCBhY2MpKTtcbn1cblxudmFyIHN5bUl0ZXJhdG9yID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2wuaXRlcmF0b3IgOiAnQEBpdGVyYXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9yZWR1Y2UoZm4sIGFjYywgbGlzdCkge1xuICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm4gPSBfeHdyYXAoZm4pO1xuICB9XG4gIGlmIChfaXNBcnJheUxpa2UobGlzdCkpIHtcbiAgICByZXR1cm4gX2FycmF5UmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGlzdFsnZmFudGFzeS1sYW5kL3JlZHVjZSddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCwgJ2ZhbnRhc3ktbGFuZC9yZWR1Y2UnKTtcbiAgfVxuICBpZiAobGlzdFtzeW1JdGVyYXRvcl0gIT0gbnVsbCkge1xuICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsaXN0Lm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICB9XG4gIGlmICh0eXBlb2YgbGlzdC5yZWR1Y2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0LCAncmVkdWNlJyk7XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xufSIsIi8qKlxuICogUG9seWZpbGwgZnJvbSA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZS90b0lTT1N0cmluZz4uXG4gKi9cbnZhciBwYWQgPSBmdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gKG4gPCAxMCA/ICcwJyA6ICcnKSArIG47XG59O1xuXG52YXIgX3RvSVNPU3RyaW5nID0gdHlwZW9mIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb24gX3RvSVNPU3RyaW5nKGQpIHtcbiAgcmV0dXJuIGQudG9JU09TdHJpbmcoKTtcbn0gOiBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICByZXR1cm4gZC5nZXRVVENGdWxsWWVhcigpICsgJy0nICsgcGFkKGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgcGFkKGQuZ2V0VVRDRGF0ZSgpKSArICdUJyArIHBhZChkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgcGFkKGQuZ2V0VVRDTWludXRlcygpKSArICc6JyArIHBhZChkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAoZC5nZXRVVENNaWxsaXNlY29uZHMoKSAvIDEwMDApLnRvRml4ZWQoMykuc2xpY2UoMiwgNSkgKyAnWic7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBfdG9JU09TdHJpbmc7IiwiaW1wb3J0IF9pbmNsdWRlcyBmcm9tICcuL19pbmNsdWRlcy5qcyc7XG5pbXBvcnQgX21hcCBmcm9tICcuL19tYXAuanMnO1xuaW1wb3J0IF9xdW90ZSBmcm9tICcuL19xdW90ZS5qcyc7XG5pbXBvcnQgX3RvSVNPU3RyaW5nIGZyb20gJy4vX3RvSVNPU3RyaW5nLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4uL2tleXMuanMnO1xuaW1wb3J0IHJlamVjdCBmcm9tICcuLi9yZWplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9TdHJpbmcoeCwgc2Vlbikge1xuICB2YXIgcmVjdXIgPSBmdW5jdGlvbiByZWN1cih5KSB7XG4gICAgdmFyIHhzID0gc2Vlbi5jb25jYXQoW3hdKTtcbiAgICByZXR1cm4gX2luY2x1ZGVzKHksIHhzKSA/ICc8Q2lyY3VsYXI+JyA6IF90b1N0cmluZyh5LCB4cyk7XG4gIH07XG5cbiAgLy8gIG1hcFBhaXJzIDo6IChPYmplY3QsIFtTdHJpbmddKSAtPiBbU3RyaW5nXVxuICB2YXIgbWFwUGFpcnMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgcmV0dXJuIF9tYXAoZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBfcXVvdGUoaykgKyAnOiAnICsgcmVjdXIob2JqW2tdKTtcbiAgICB9LCBrZXlzLnNsaWNlKCkuc29ydCgpKTtcbiAgfTtcblxuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSkge1xuICAgIGNhc2UgJ1tvYmplY3QgQXJndW1lbnRzXSc6XG4gICAgICByZXR1cm4gJyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgnICsgX21hcChyZWN1ciwgeCkuam9pbignLCAnKSArICcpKSc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmV0dXJuICdbJyArIF9tYXAocmVjdXIsIHgpLmNvbmNhdChtYXBQYWlycyh4LCByZWplY3QoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuICgvXlxcZCskLy50ZXN0KGspXG4gICAgICAgICk7XG4gICAgICB9LCBrZXlzKHgpKSkpLmpvaW4oJywgJykgKyAnXSc7XG4gICAgY2FzZSAnW29iamVjdCBCb29sZWFuXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBCb29sZWFuKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiB4LnRvU3RyaW5nKCk7XG4gICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICByZXR1cm4gJ25ldyBEYXRlKCcgKyAoaXNOYU4oeC52YWx1ZU9mKCkpID8gcmVjdXIoTmFOKSA6IF9xdW90ZShfdG9JU09TdHJpbmcoeCkpKSArICcpJztcbiAgICBjYXNlICdbb2JqZWN0IE51bGxdJzpcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IE51bWJlcignICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogMSAvIHggPT09IC1JbmZpbml0eSA/ICctMCcgOiB4LnRvU3RyaW5nKDEwKTtcbiAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgU3RyaW5nKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiBfcXVvdGUoeCk7XG4gICAgY2FzZSAnW29iamVjdCBVbmRlZmluZWRdJzpcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHR5cGVvZiB4LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciByZXByID0geC50b1N0cmluZygpO1xuICAgICAgICBpZiAocmVwciAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICByZXR1cm4gcmVwcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICd7JyArIG1hcFBhaXJzKHgsIGtleXMoeCkpLmpvaW4oJywgJykgKyAnfSc7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xuICB9LFxuICByZXN1bHQ6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH1cbn07IiwiaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9fY3VycnkyLmpzJztcbmltcG9ydCBfeGZCYXNlIGZyb20gJy4vX3hmQmFzZS5qcyc7XG5cbnZhciBYRmlsdGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gWEZpbHRlcihmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICB9XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5mKGlucHV0KSA/IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCkgOiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhGaWx0ZXI7XG59KCk7XG5cbnZhciBfeGZpbHRlciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94ZmlsdGVyKGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWEZpbHRlcihmLCB4Zik7XG59KTtcbmV4cG9ydCBkZWZhdWx0IF94ZmlsdGVyOyIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX3hmQmFzZSBmcm9tICcuL194ZkJhc2UuanMnO1xuXG52YXIgWE1hcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFhNYXAoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmYoaW5wdXQpKTtcbiAgfTtcblxuICByZXR1cm4gWE1hcDtcbn0oKTtcblxudmFyIF94bWFwID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3htYXAoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYTWFwKGYsIHhmKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgX3htYXA7IiwidmFyIFhXcmFwID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gWFdyYXAoZm4pIHtcbiAgICB0aGlzLmYgPSBmbjtcbiAgfVxuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbml0IG5vdCBpbXBsZW1lbnRlZCBvbiBYV3JhcCcpO1xuICB9O1xuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gYWNjO1xuICB9O1xuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAoYWNjLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICB9O1xuXG4gIHJldHVybiBYV3JhcDtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3h3cmFwKGZuKSB7XG4gIHJldHVybiBuZXcgWFdyYXAoZm4pO1xufSIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX2lzRnVuY3Rpb24gZnJvbSAnLi9pbnRlcm5hbC9faXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgY3VycnlOIGZyb20gJy4vY3VycnlOLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBUdXJucyBhIG5hbWVkIG1ldGhvZCB3aXRoIGEgc3BlY2lmaWVkIGFyaXR5IGludG8gYSBmdW5jdGlvbiB0aGF0IGNhbiBiZVxuICogY2FsbGVkIGRpcmVjdGx5IHN1cHBsaWVkIHdpdGggYXJndW1lbnRzIGFuZCBhIHRhcmdldCBvYmplY3QuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzIGN1cnJpZWQgYW5kIGFjY2VwdHMgYGFyaXR5ICsgMWAgcGFyYW1ldGVycyB3aGVyZVxuICogdGhlIGZpbmFsIHBhcmFtZXRlciBpcyB0aGUgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IChhIC0+IGIgLT4gLi4uIC0+IG4gLT4gT2JqZWN0IC0+ICopXG4gKiBAcGFyYW0ge051bWJlcn0gYXJpdHkgTnVtYmVyIG9mIGFyZ3VtZW50cyB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gc2hvdWxkIHRha2VcbiAqICAgICAgICBiZWZvcmUgdGhlIHRhcmdldCBvYmplY3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIE5hbWUgb2YgdGhlIG1ldGhvZCB0byBjYWxsLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY29uc3RydWN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3Qgc2xpY2VGcm9tID0gUi5pbnZva2VyKDEsICdzbGljZScpO1xuICogICAgICBzbGljZUZyb20oNiwgJ2FiY2RlZmdoaWprbG0nKTsgLy89PiAnZ2hpamtsbSdcbiAqICAgICAgY29uc3Qgc2xpY2VGcm9tNiA9IFIuaW52b2tlcigyLCAnc2xpY2UnKSg2KTtcbiAqICAgICAgc2xpY2VGcm9tNig4LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaCdcbiAqIEBzeW1iIFIuaW52b2tlcigwLCAnbWV0aG9kJykobykgPSBvWydtZXRob2QnXSgpXG4gKiBAc3ltYiBSLmludm9rZXIoMSwgJ21ldGhvZCcpKGEsIG8pID0gb1snbWV0aG9kJ10oYSlcbiAqIEBzeW1iIFIuaW52b2tlcigyLCAnbWV0aG9kJykoYSwgYiwgbykgPSBvWydtZXRob2QnXShhLCBiKVxuICovXG52YXIgaW52b2tlciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGludm9rZXIoYXJpdHksIG1ldGhvZCkge1xuICByZXR1cm4gY3VycnlOKGFyaXR5ICsgMSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbYXJpdHldO1xuICAgIGlmICh0YXJnZXQgIT0gbnVsbCAmJiBfaXNGdW5jdGlvbih0YXJnZXRbbWV0aG9kXSkpIHtcbiAgICAgIHJldHVybiB0YXJnZXRbbWV0aG9kXS5hcHBseSh0YXJnZXQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgYXJpdHkpKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcih0b1N0cmluZyh0YXJnZXQpICsgJyBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwiJyArIG1ldGhvZCArICdcIicpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgaW52b2tlcjsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IGNvbnZlcmdlIGZyb20gJy4vY29udmVyZ2UuanMnO1xuXG4vKipcbiAqIGp1eHQgYXBwbGllcyBhIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGEgbGlzdCBvZiB2YWx1ZXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIFsoYSwgYiwgLi4uLCBtKSAtPiBuXSAtPiAoKGEsIGIsIC4uLiwgbSkgLT4gW25dKVxuICogQHBhcmFtIHtBcnJheX0gZm5zIEFuIGFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgbGlzdCBvZiB2YWx1ZXMgYWZ0ZXIgYXBwbHlpbmcgZWFjaCBvZiB0aGUgb3JpZ2luYWwgYGZuc2AgdG8gaXRzIHBhcmFtZXRlcnMuXG4gKiBAc2VlIFIuYXBwbHlTcGVjXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgZ2V0UmFuZ2UgPSBSLmp1eHQoW01hdGgubWluLCBNYXRoLm1heF0pO1xuICogICAgICBnZXRSYW5nZSgzLCA0LCA5LCAtMyk7IC8vPT4gWy0zLCA5XVxuICogQHN5bWIgUi5qdXh0KFtmLCBnLCBoXSkoYSwgYikgPSBbZihhLCBiKSwgZyhhLCBiKSwgaChhLCBiKV1cbiAqL1xudmFyIGp1eHQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBqdXh0KGZucykge1xuICByZXR1cm4gY29udmVyZ2UoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICB9LCBmbnMpO1xufSk7XG5leHBvcnQgZGVmYXVsdCBqdXh0OyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5pbXBvcnQgX2hhcyBmcm9tICcuL2ludGVybmFsL19oYXMuanMnO1xuaW1wb3J0IF9pc0FyZ3VtZW50cyBmcm9tICcuL2ludGVybmFsL19pc0FyZ3VtZW50cy5qcyc7XG5cbi8vIGNvdmVyIElFIDwgOSBrZXlzIGlzc3Vlc1xudmFyIGhhc0VudW1CdWcgPSAhIC8qI19fUFVSRV9fKi97IHRvU3RyaW5nOiBudWxsIH0ucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG52YXIgbm9uRW51bWVyYWJsZVByb3BzID0gWydjb25zdHJ1Y3RvcicsICd2YWx1ZU9mJywgJ2lzUHJvdG90eXBlT2YnLCAndG9TdHJpbmcnLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcbi8vIFNhZmFyaSBidWdcbnZhciBoYXNBcmdzRW51bUJ1ZyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICByZXR1cm4gYXJndW1lbnRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKCdsZW5ndGgnKTtcbn0oKTtcblxudmFyIGNvbnRhaW5zID0gZnVuY3Rpb24gY29udGFpbnMobGlzdCwgaXRlbSkge1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaWYgKGxpc3RbaWR4XSA9PT0gaXRlbSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyB0aGUgbmFtZXMgb2YgYWxsIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIG9mXG4gKiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnRcbiAqIGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7azogdn0gLT4gW2tdXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBwcm9wZXJ0aWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gKiBAc2VlIFIua2V5c0luLCBSLnZhbHVlc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIua2V5cyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFsnYScsICdiJywgJ2MnXVxuICovXG52YXIga2V5cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiAhaGFzQXJnc0VudW1CdWcgPyAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBrZXlzKG9iaikge1xuICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iaiA/IFtdIDogT2JqZWN0LmtleXMob2JqKTtcbn0pIDogLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgdmFyIHByb3AsIG5JZHg7XG4gIHZhciBrcyA9IFtdO1xuICB2YXIgY2hlY2tBcmdzTGVuZ3RoID0gaGFzQXJnc0VudW1CdWcgJiYgX2lzQXJndW1lbnRzKG9iaik7XG4gIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICghY2hlY2tBcmdzTGVuZ3RoIHx8IHByb3AgIT09ICdsZW5ndGgnKSkge1xuICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgfVxuICB9XG4gIGlmIChoYXNFbnVtQnVnKSB7XG4gICAgbklkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChuSWR4ID49IDApIHtcbiAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbklkeF07XG4gICAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICFjb250YWlucyhrcywgcHJvcCkpIHtcbiAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICB9XG4gICAgICBuSWR4IC09IDE7XG4gICAgfVxuICB9XG4gIHJldHVybiBrcztcbn0pO1xuZXhwb3J0IGRlZmF1bHQga2V5czsiLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IF9kaXNwYXRjaGFibGUgZnJvbSAnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlLmpzJztcbmltcG9ydCBfbWFwIGZyb20gJy4vaW50ZXJuYWwvX21hcC5qcyc7XG5pbXBvcnQgX3JlZHVjZSBmcm9tICcuL2ludGVybmFsL19yZWR1Y2UuanMnO1xuaW1wb3J0IF94bWFwIGZyb20gJy4vaW50ZXJuYWwvX3htYXAuanMnO1xuaW1wb3J0IGN1cnJ5TiBmcm9tICcuL2N1cnJ5Ti5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYW5kXG4gKiBhIFtmdW5jdG9yXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2Z1bmN0b3IpLFxuICogYXBwbGllcyB0aGUgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUgZnVuY3RvcidzIHZhbHVlcywgYW5kIHJldHVybnNcbiAqIGEgZnVuY3RvciBvZiB0aGUgc2FtZSBzaGFwZS5cbiAqXG4gKiBSYW1kYSBwcm92aWRlcyBzdWl0YWJsZSBgbWFwYCBpbXBsZW1lbnRhdGlvbnMgZm9yIGBBcnJheWAgYW5kIGBPYmplY3RgLFxuICogc28gdGhpcyBmdW5jdGlvbiBtYXkgYmUgYXBwbGllZCB0byBgWzEsIDIsIDNdYCBvciBge3g6IDEsIHk6IDIsIHo6IDN9YC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgbWFwYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQWxzbyB0cmVhdHMgZnVuY3Rpb25zIGFzIGZ1bmN0b3JzIGFuZCB3aWxsIGNvbXBvc2UgdGhlbSB0b2dldGhlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZ1bmN0b3IgZiA9PiAoYSAtPiBiKSAtPiBmIGEgLT4gZiBiXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gYmUgaXRlcmF0ZWQgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGxpc3QuXG4gKiBAc2VlIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgZG91YmxlID0geCA9PiB4ICogMjtcbiAqXG4gKiAgICAgIFIubWFwKGRvdWJsZSwgWzEsIDIsIDNdKTsgLy89PiBbMiwgNCwgNl1cbiAqXG4gKiAgICAgIFIubWFwKGRvdWJsZSwge3g6IDEsIHk6IDIsIHo6IDN9KTsgLy89PiB7eDogMiwgeTogNCwgejogNn1cbiAqIEBzeW1iIFIubWFwKGYsIFthLCBiXSkgPSBbZihhKSwgZihiKV1cbiAqIEBzeW1iIFIubWFwKGYsIHsgeDogYSwgeTogYiB9KSA9IHsgeDogZihhKSwgeTogZihiKSB9XG4gKiBAc3ltYiBSLm1hcChmLCBmdW5jdG9yX28pID0gZnVuY3Rvcl9vLm1hcChmKVxuICovXG52YXIgbWFwID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZmFudGFzeS1sYW5kL21hcCcsICdtYXAnXSwgX3htYXAsIGZ1bmN0aW9uIG1hcChmbiwgZnVuY3Rvcikge1xuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmdW5jdG9yKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgRnVuY3Rpb25dJzpcbiAgICAgIHJldHVybiBjdXJyeU4oZnVuY3Rvci5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZnVuY3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgIH0pO1xuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBmbihmdW5jdG9yW2tleV0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30sIGtleXMoZnVuY3RvcikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gX21hcChmbiwgZnVuY3Rvcik7XG4gIH1cbn0pKTtcbmV4cG9ydCBkZWZhdWx0IG1hcDsiLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGxhcmdlciBvZiBpdHMgdHdvIGFyZ3VtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYVxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIubWF4QnksIFIubWluXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tYXgoNzg5LCAxMjMpOyAvLz0+IDc4OVxuICogICAgICBSLm1heCgnYScsICdiJyk7IC8vPT4gJ2InXG4gKi9cbnZhciBtYXggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBtYXgoYSwgYikge1xuICByZXR1cm4gYiA+IGEgPyBiIDogYTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgbWF4OyIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHZhbHVlIGF0IGEgZ2l2ZW4gcGF0aC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4ge2F9IC0+IGEgfCBVbmRlZmluZWRcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gdXNlLlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJldHJpZXZlIHRoZSBuZXN0ZWQgcHJvcGVydHkgZnJvbS5cbiAqIEByZXR1cm4geyp9IFRoZSBkYXRhIGF0IGBwYXRoYC5cbiAqIEBzZWUgUi5wcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXRoKFsnYScsICdiJ10sIHthOiB7YjogMn19KTsgLy89PiAyXG4gKiAgICAgIFIucGF0aChbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cbnZhciBwYXRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcGF0aChwYXRocywgb2JqKSB7XG4gIHZhciB2YWwgPSBvYmo7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgcGF0aHMubGVuZ3RoKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbCA9IHZhbFtwYXRoc1tpZHhdXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gdmFsO1xufSk7XG5leHBvcnQgZGVmYXVsdCBwYXRoOyIsImltcG9ydCBfYXJpdHkgZnJvbSAnLi9pbnRlcm5hbC9fYXJpdHkuanMnO1xuaW1wb3J0IF9waXBlIGZyb20gJy4vaW50ZXJuYWwvX3BpcGUuanMnO1xuaW1wb3J0IHJlZHVjZSBmcm9tICcuL3JlZHVjZS5qcyc7XG5pbXBvcnQgdGFpbCBmcm9tICcuL3RhaWwuanMnO1xuXG4vKipcbiAqIFBlcmZvcm1zIGxlZnQtdG8tcmlnaHQgZnVuY3Rpb24gY29tcG9zaXRpb24uIFRoZSBsZWZ0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZVxuICogYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICpcbiAqIEluIHNvbWUgbGlicmFyaWVzIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYHNlcXVlbmNlYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIHJlc3VsdCBvZiBwaXBlIGlzIG5vdCBhdXRvbWF0aWNhbGx5IGN1cnJpZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCgoYSwgYiwgLi4uLCBuKSAtPiBvKSwgKG8gLT4gcCksIC4uLiwgKHggLT4geSksICh5IC0+IHopKSAtPiAoKGEsIGIsIC4uLiwgbikgLT4geilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuY29tcG9zZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGYgPSBSLnBpcGUoTWF0aC5wb3csIFIubmVnYXRlLCBSLmluYyk7XG4gKlxuICogICAgICBmKDMsIDQpOyAvLyAtKDNeNCkgKyAxXG4gKiBAc3ltYiBSLnBpcGUoZiwgZywgaCkoYSwgYikgPSBoKGcoZihhLCBiKSkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpcGUoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwaXBlIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICB9XG4gIHJldHVybiBfYXJpdHkoYXJndW1lbnRzWzBdLmxlbmd0aCwgcmVkdWNlKF9waXBlLCBhcmd1bWVudHNbMF0sIHRhaWwoYXJndW1lbnRzKSkpO1xufSIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgbWFwIGZyb20gJy4vbWFwLmpzJztcbmltcG9ydCBwcm9wIGZyb20gJy4vcHJvcC5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGJ5IHBsdWNraW5nIHRoZSBzYW1lIG5hbWVkIHByb3BlcnR5IG9mZiBhbGwgb2JqZWN0cyBpblxuICogdGhlIGxpc3Qgc3VwcGxpZWQuXG4gKlxuICogYHBsdWNrYCB3aWxsIHdvcmsgb25cbiAqIGFueSBbZnVuY3Rvcl0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNmdW5jdG9yKSBpblxuICogYWRkaXRpb24gdG8gYXJyYXlzLCBhcyBpdCBpcyBlcXVpdmFsZW50IHRvIGBSLm1hcChSLnByb3AoayksIGYpYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZ1bmN0b3IgZiA9PiBrIC0+IGYge2s6IHZ9IC0+IGYgdlxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBrZXkgVGhlIGtleSBuYW1lIHRvIHBsdWNrIG9mZiBvZiBlYWNoIG9iamVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGYgVGhlIGFycmF5IG9yIGZ1bmN0b3IgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdmFsdWVzIGZvciB0aGUgZ2l2ZW4ga2V5LlxuICogQHNlZSBSLnByb3BzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGdldEFnZXMgPSBSLnBsdWNrKCdhZ2UnKTtcbiAqICAgICAgZ2V0QWdlcyhbe25hbWU6ICdmcmVkJywgYWdlOiAyOX0sIHtuYW1lOiAnd2lsbWEnLCBhZ2U6IDI3fV0pOyAvLz0+IFsyOSwgMjddXG4gKlxuICogICAgICBSLnBsdWNrKDAsIFtbMSwgMl0sIFszLCA0XV0pOyAgICAgICAgICAgICAgIC8vPT4gWzEsIDNdXG4gKiAgICAgIFIucGx1Y2soJ3ZhbCcsIHthOiB7dmFsOiAzfSwgYjoge3ZhbDogNX19KTsgLy89PiB7YTogMywgYjogNX1cbiAqIEBzeW1iIFIucGx1Y2soJ3gnLCBbe3g6IDEsIHk6IDJ9LCB7eDogMywgeTogNH0sIHt4OiA1LCB5OiA2fV0pID0gWzEsIDMsIDVdXG4gKiBAc3ltYiBSLnBsdWNrKDAsIFtbMSwgMl0sIFszLCA0XSwgWzUsIDZdXSkgPSBbMSwgMywgNV1cbiAqL1xudmFyIHBsdWNrID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcGx1Y2socCwgbGlzdCkge1xuICByZXR1cm4gbWFwKHByb3AocCksIGxpc3QpO1xufSk7XG5leHBvcnQgZGVmYXVsdCBwbHVjazsiLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IHBhdGggZnJvbSAnLi9wYXRoLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aGVuIHN1cHBsaWVkIGFuIG9iamVjdCByZXR1cm5zIHRoZSBpbmRpY2F0ZWRcbiAqIHByb3BlcnR5IG9mIHRoYXQgb2JqZWN0LCBpZiBpdCBleGlzdHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHMgLT4ge3M6IGF9IC0+IGEgfCBVbmRlZmluZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBwIFRoZSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnlcbiAqIEByZXR1cm4geyp9IFRoZSB2YWx1ZSBhdCBgb2JqLnBgLlxuICogQHNlZSBSLnBhdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByb3AoJ3gnLCB7eDogMTAwfSk7IC8vPT4gMTAwXG4gKiAgICAgIFIucHJvcCgneCcsIHt9KTsgLy89PiB1bmRlZmluZWRcbiAqICAgICAgUi5jb21wb3NlKFIuaW5jLCBSLnByb3AoJ3gnKSkoeyB4OiAzIH0pIC8vPT4gNFxuICovXG5cbnZhciBwcm9wID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcHJvcChwLCBvYmopIHtcbiAgcmV0dXJuIHBhdGgoW3BdLCBvYmopO1xufSk7XG5leHBvcnQgZGVmYXVsdCBwcm9wOyIsImltcG9ydCBfY3VycnkzIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5My5qcyc7XG5pbXBvcnQgX3JlZHVjZSBmcm9tICcuL2ludGVybmFsL19yZWR1Y2UuanMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGUgaXRlbSBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmdcbiAqIHRoZSBpdGVyYXRvciBmdW5jdGlvbiBhbmQgcGFzc2luZyBpdCBhbiBhY2N1bXVsYXRvciB2YWx1ZSBhbmQgdGhlIGN1cnJlbnRcbiAqIHZhbHVlIGZyb20gdGhlIGFycmF5LCBhbmQgdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIHZhbHVlczogKihhY2MsIHZhbHVlKSouIEl0IG1heSB1c2VcbiAqIFtgUi5yZWR1Y2VkYF0oI3JlZHVjZWQpIHRvIHNob3J0Y3V0IHRoZSBpdGVyYXRpb24uXG4gKlxuICogVGhlIGFyZ3VtZW50cycgb3JkZXIgb2YgW2ByZWR1Y2VSaWdodGBdKCNyZWR1Y2VSaWdodCkncyBpdGVyYXRvciBmdW5jdGlvblxuICogaXMgKih2YWx1ZSwgYWNjKSouXG4gKlxuICogTm90ZTogYFIucmVkdWNlYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2VcbiAqIGFycmF5cyksIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHNcbiAqIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSNEZXNjcmlwdGlvblxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGByZWR1Y2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuIFdoZW5cbiAqIGRvaW5nIHNvLCBpdCBpcyB1cCB0byB0aGUgdXNlciB0byBoYW5kbGUgdGhlIFtgUi5yZWR1Y2VkYF0oI3JlZHVjZWQpXG4gKiBzaG9ydGN1dGluZywgYXMgdGhpcyBpcyBub3QgaW1wbGVtZW50ZWQgYnkgYHJlZHVjZWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIucmVkdWNlZCwgUi5hZGRJbmRleCwgUi5yZWR1Y2VSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVkdWNlKFIuc3VidHJhY3QsIDAsIFsxLCAyLCAzLCA0XSkgLy8gPT4gKCgoKDAgLSAxKSAtIDIpIC0gMykgLSA0KSA9IC0xMFxuICogICAgICAvLyAgICAgICAgICAtICAgICAgICAgICAgICAgLTEwXG4gKiAgICAgIC8vICAgICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAgICAgLSAgIDQgICAgICAgICAgIC02ICAgNFxuICogICAgICAvLyAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAgICAgLSAgIDMgICA9PT4gICAgIC0zICAgM1xuICogICAgICAvLyAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAtICAgMiAgICAgICAgICAgLTEgICAyXG4gKiAgICAgIC8vICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgMCAgIDEgICAgICAgICAgICAwICAgMVxuICpcbiAqIEBzeW1iIFIucmVkdWNlKGYsIGEsIFtiLCBjLCBkXSkgPSBmKGYoZihhLCBiKSwgYyksIGQpXG4gKi9cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhfcmVkdWNlKTtcbmV4cG9ydCBkZWZhdWx0IHJlZHVjZTsiLCJpbXBvcnQgX2NvbXBsZW1lbnQgZnJvbSAnLi9pbnRlcm5hbC9fY29tcGxlbWVudC5qcyc7XG5pbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IGZpbHRlciBmcm9tICcuL2ZpbHRlci5qcyc7XG5cbi8qKlxuICogVGhlIGNvbXBsZW1lbnQgb2YgW2BmaWx0ZXJgXSgjZmlsdGVyKS5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uIEZpbHRlcmFibGVcbiAqIG9iamVjdHMgaW5jbHVkZSBwbGFpbiBvYmplY3RzIG9yIGFueSBvYmplY3QgdGhhdCBoYXMgYSBmaWx0ZXIgbWV0aG9kIHN1Y2hcbiAqIGFzIGBBcnJheWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IGYgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gZmlsdGVyYWJsZVxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAc2VlIFIuZmlsdGVyLCBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGlzT2RkID0gKG4pID0+IG4gJSAyID09PSAxO1xuICpcbiAqICAgICAgUi5yZWplY3QoaXNPZGQsIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLnJlamVjdChpc09kZCwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YjogMiwgZDogNH1cbiAqL1xudmFyIHJlamVjdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHJlamVjdChwcmVkLCBmaWx0ZXJhYmxlKSB7XG4gIHJldHVybiBmaWx0ZXIoX2NvbXBsZW1lbnQocHJlZCksIGZpbHRlcmFibGUpO1xufSk7XG5leHBvcnQgZGVmYXVsdCByZWplY3Q7IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBfaXNTdHJpbmcgZnJvbSAnLi9pbnRlcm5hbC9faXNTdHJpbmcuanMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBvciBzdHJpbmcgd2l0aCB0aGUgZWxlbWVudHMgb3IgY2hhcmFjdGVycyBpbiByZXZlcnNlXG4gKiBvcmRlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV1cbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGxpc3RcbiAqIEByZXR1cm4ge0FycmF5fFN0cmluZ31cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJldmVyc2UoWzEsIDIsIDNdKTsgIC8vPT4gWzMsIDIsIDFdXG4gKiAgICAgIFIucmV2ZXJzZShbMSwgMl0pOyAgICAgLy89PiBbMiwgMV1cbiAqICAgICAgUi5yZXZlcnNlKFsxXSk7ICAgICAgICAvLz0+IFsxXVxuICogICAgICBSLnJldmVyc2UoW10pOyAgICAgICAgIC8vPT4gW11cbiAqXG4gKiAgICAgIFIucmV2ZXJzZSgnYWJjJyk7ICAgICAgLy89PiAnY2JhJ1xuICogICAgICBSLnJldmVyc2UoJ2FiJyk7ICAgICAgIC8vPT4gJ2JhJ1xuICogICAgICBSLnJldmVyc2UoJ2EnKTsgICAgICAgIC8vPT4gJ2EnXG4gKiAgICAgIFIucmV2ZXJzZSgnJyk7ICAgICAgICAgLy89PiAnJ1xuICovXG52YXIgcmV2ZXJzZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHJldmVyc2UobGlzdCkge1xuICByZXR1cm4gX2lzU3RyaW5nKGxpc3QpID8gbGlzdC5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCkucmV2ZXJzZSgpO1xufSk7XG5leHBvcnQgZGVmYXVsdCByZXZlcnNlOyIsImltcG9ydCBfY2hlY2tGb3JNZXRob2QgZnJvbSAnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QuanMnO1xuaW1wb3J0IF9jdXJyeTMgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkzLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdCB3aXRoIGEgYHNsaWNlYFxuICogbWV0aG9kKSBmcm9tIGBmcm9tSW5kZXhgIChpbmNsdXNpdmUpIHRvIGB0b0luZGV4YCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgc2xpY2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4IFRoZSBzdGFydCBpbmRleCAoaW5jbHVzaXZlKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4IFRoZSBlbmQgaW5kZXggKGV4Y2x1c2l2ZSkuXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zbGljZSgxLCAzLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgxLCBJbmZpbml0eSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAvLz0+IFsnYicsICdjJywgJ2QnXVxuICogICAgICBSLnNsaWNlKDAsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgIC8vPT4gWydhJywgJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoLTMsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgLy89PiBbJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoMCwgMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgICAgICAgLy89PiAncmFtJ1xuICovXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyggLyojX19QVVJFX18qL19jaGVja0Zvck1ldGhvZCgnc2xpY2UnLCBmdW5jdGlvbiBzbGljZShmcm9tSW5kZXgsIHRvSW5kZXgsIGxpc3QpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIGZyb21JbmRleCwgdG9JbmRleCk7XG59KSk7XG5leHBvcnQgZGVmYXVsdCBzbGljZTsiLCJpbXBvcnQgX2NoZWNrRm9yTWV0aG9kIGZyb20gJy4vaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kLmpzJztcbmltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5pbXBvcnQgc2xpY2UgZnJvbSAnLi9zbGljZS5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhbGwgYnV0IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZyAob3Igb2JqZWN0XG4gKiB3aXRoIGEgYHRhaWxgIG1ldGhvZCkuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHNsaWNlYCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuaGVhZCwgUi5pbml0LCBSLmxhc3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRhaWwoWzEsIDIsIDNdKTsgIC8vPT4gWzIsIDNdXG4gKiAgICAgIFIudGFpbChbMSwgMl0pOyAgICAgLy89PiBbMl1cbiAqICAgICAgUi50YWlsKFsxXSk7ICAgICAgICAvLz0+IFtdXG4gKiAgICAgIFIudGFpbChbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi50YWlsKCdhYmMnKTsgIC8vPT4gJ2JjJ1xuICogICAgICBSLnRhaWwoJ2FiJyk7ICAgLy89PiAnYidcbiAqICAgICAgUi50YWlsKCdhJyk7ICAgIC8vPT4gJydcbiAqICAgICAgUi50YWlsKCcnKTsgICAgIC8vPT4gJydcbiAqL1xudmFyIHRhaWwgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MSggLyojX19QVVJFX18qL19jaGVja0Zvck1ldGhvZCgndGFpbCcsIC8qI19fUFVSRV9fKi9zbGljZSgxLCBJbmZpbml0eSkpKTtcbmV4cG9ydCBkZWZhdWx0IHRhaWw7IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBfdG9TdHJpbmcgZnJvbSAnLi9pbnRlcm5hbC9fdG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gdmFsdWUuIGBldmFsYCdpbmcgdGhlIG91dHB1dFxuICogc2hvdWxkIHJlc3VsdCBpbiBhIHZhbHVlIGVxdWl2YWxlbnQgdG8gdGhlIGlucHV0IHZhbHVlLiBNYW55IG9mIHRoZSBidWlsdC1pblxuICogYHRvU3RyaW5nYCBtZXRob2RzIGRvIG5vdCBzYXRpc2Z5IHRoaXMgcmVxdWlyZW1lbnQuXG4gKlxuICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGBbb2JqZWN0IE9iamVjdF1gIHdpdGggYSBgdG9TdHJpbmdgIG1ldGhvZCBvdGhlclxuICogdGhhbiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AsIHRoaXMgbWV0aG9kIGlzIGludm9rZWQgd2l0aCBubyBhcmd1bWVudHNcbiAqIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS4gVGhpcyBtZWFucyB1c2VyLWRlZmluZWQgY29uc3RydWN0b3IgZnVuY3Rpb25zXG4gKiBjYW4gcHJvdmlkZSBhIHN1aXRhYmxlIGB0b1N0cmluZ2AgbWV0aG9kLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICogICAgICAgdGhpcy54ID0geDtcbiAqICAgICAgIHRoaXMueSA9IHk7XG4gKiAgICAgfVxuICpcbiAqICAgICBQb2ludC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiAnbmV3IFBvaW50KCcgKyB0aGlzLnggKyAnLCAnICsgdGhpcy55ICsgJyknO1xuICogICAgIH07XG4gKlxuICogICAgIFIudG9TdHJpbmcobmV3IFBvaW50KDEsIDIpKTsgLy89PiAnbmV3IFBvaW50KDEsIDIpJ1xuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgKiAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b1N0cmluZyg0Mik7IC8vPT4gJzQyJ1xuICogICAgICBSLnRvU3RyaW5nKCdhYmMnKTsgLy89PiAnXCJhYmNcIidcbiAqICAgICAgUi50b1N0cmluZyhbMSwgMiwgM10pOyAvLz0+ICdbMSwgMiwgM10nXG4gKiAgICAgIFIudG9TdHJpbmcoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9KTsgLy89PiAne1wiYmFyXCI6IDIsIFwiYmF6XCI6IDMsIFwiZm9vXCI6IDF9J1xuICogICAgICBSLnRvU3RyaW5nKG5ldyBEYXRlKCcyMDAxLTAyLTAzVDA0OjA1OjA2WicpKTsgLy89PiAnbmV3IERhdGUoXCIyMDAxLTAyLTAzVDA0OjA1OjA2LjAwMFpcIiknXG4gKi9cbnZhciB0b1N0cmluZyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHRvU3RyaW5nKHZhbCkge1xuICByZXR1cm4gX3RvU3RyaW5nKHZhbCwgW10pO1xufSk7XG5leHBvcnQgZGVmYXVsdCB0b1N0cmluZzsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuXG4vKipcbiAqIEdpdmVzIGEgc2luZ2xlLXdvcmQgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSAobmF0aXZlKSB0eXBlIG9mIGEgdmFsdWUsXG4gKiByZXR1cm5pbmcgc3VjaCBhbnN3ZXJzIGFzICdPYmplY3QnLCAnTnVtYmVyJywgJ0FycmF5Jywgb3IgJ051bGwnLiBEb2VzIG5vdFxuICogYXR0ZW1wdCB0byBkaXN0aW5ndWlzaCB1c2VyIE9iamVjdCB0eXBlcyBhbnkgZnVydGhlciwgcmVwb3J0aW5nIHRoZW0gYWxsIGFzXG4gKiAnT2JqZWN0Jy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBUeXBlXG4gKiBAc2lnICgqIC0+IHsqfSkgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudHlwZSh7fSk7IC8vPT4gXCJPYmplY3RcIlxuICogICAgICBSLnR5cGUoMSk7IC8vPT4gXCJOdW1iZXJcIlxuICogICAgICBSLnR5cGUoZmFsc2UpOyAvLz0+IFwiQm9vbGVhblwiXG4gKiAgICAgIFIudHlwZSgncycpOyAvLz0+IFwiU3RyaW5nXCJcbiAqICAgICAgUi50eXBlKG51bGwpOyAvLz0+IFwiTnVsbFwiXG4gKiAgICAgIFIudHlwZShbXSk7IC8vPT4gXCJBcnJheVwiXG4gKiAgICAgIFIudHlwZSgvW0Etel0vKTsgLy89PiBcIlJlZ0V4cFwiXG4gKiAgICAgIFIudHlwZSgoKSA9PiB7fSk7IC8vPT4gXCJGdW5jdGlvblwiXG4gKiAgICAgIFIudHlwZSh1bmRlZmluZWQpOyAvLz0+IFwiVW5kZWZpbmVkXCJcbiAqL1xudmFyIHR5cGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB0eXBlKHZhbCkge1xuICByZXR1cm4gdmFsID09PSBudWxsID8gJ051bGwnIDogdmFsID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNsaWNlKDgsIC0xKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgdHlwZTsiLCJpbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IGN1cnJ5TiBmcm9tICcuL2N1cnJ5Ti5qcyc7XG5cbi8qKlxuICogQWNjZXB0cyBhIGZ1bmN0aW9uIGBmbmAgYW5kIGEgbGlzdCBvZiB0cmFuc2Zvcm1lciBmdW5jdGlvbnMgYW5kIHJldHVybnMgYVxuICogbmV3IGN1cnJpZWQgZnVuY3Rpb24uIFdoZW4gdGhlIG5ldyBmdW5jdGlvbiBpcyBpbnZva2VkLCBpdCBjYWxscyB0aGVcbiAqIGZ1bmN0aW9uIGBmbmAgd2l0aCBwYXJhbWV0ZXJzIGNvbnNpc3Rpbmcgb2YgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIGVhY2hcbiAqIHN1cHBsaWVkIGhhbmRsZXIgb24gc3VjY2Vzc2l2ZSBhcmd1bWVudHMgdG8gdGhlIG5ldyBmdW5jdGlvbi5cbiAqXG4gKiBJZiBtb3JlIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRvIHRoZSByZXR1cm5lZCBmdW5jdGlvbiB0aGFuIHRyYW5zZm9ybWVyXG4gKiBmdW5jdGlvbnMsIHRob3NlIGFyZ3VtZW50cyBhcmUgcGFzc2VkIGRpcmVjdGx5IHRvIGBmbmAgYXMgYWRkaXRpb25hbFxuICogcGFyYW1ldGVycy4gSWYgeW91IGV4cGVjdCBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0aGF0IGRvbid0IG5lZWQgdG8gYmVcbiAqIHRyYW5zZm9ybWVkLCBhbHRob3VnaCB5b3UgY2FuIGlnbm9yZSB0aGVtLCBpdCdzIGJlc3QgdG8gcGFzcyBhbiBpZGVudGl0eVxuICogZnVuY3Rpb24gc28gdGhhdCB0aGUgbmV3IGZ1bmN0aW9uIHJlcG9ydHMgdGhlIGNvcnJlY3QgYXJpdHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCh4MSwgeDIsIC4uLikgLT4geikgLT4gWyhhIC0+IHgxKSwgKGIgLT4geDIpLCAuLi5dIC0+IChhIC0+IGIgLT4gLi4uIC0+IHopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7QXJyYXl9IHRyYW5zZm9ybWVycyBBIGxpc3Qgb2YgdHJhbnNmb3JtZXIgZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHdyYXBwZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY29udmVyZ2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnVzZVdpdGgoTWF0aC5wb3csIFtSLmlkZW50aXR5LCBSLmlkZW50aXR5XSkoMywgNCk7IC8vPT4gODFcbiAqICAgICAgUi51c2VXaXRoKE1hdGgucG93LCBbUi5pZGVudGl0eSwgUi5pZGVudGl0eV0pKDMpKDQpOyAvLz0+IDgxXG4gKiAgICAgIFIudXNlV2l0aChNYXRoLnBvdywgW1IuZGVjLCBSLmluY10pKDMsIDQpOyAvLz0+IDMyXG4gKiAgICAgIFIudXNlV2l0aChNYXRoLnBvdywgW1IuZGVjLCBSLmluY10pKDMpKDQpOyAvLz0+IDMyXG4gKiBAc3ltYiBSLnVzZVdpdGgoZiwgW2csIGhdKShhLCBiKSA9IGYoZyhhKSwgaChiKSlcbiAqL1xudmFyIHVzZVdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB1c2VXaXRoKGZuLCB0cmFuc2Zvcm1lcnMpIHtcbiAgcmV0dXJuIGN1cnJ5Tih0cmFuc2Zvcm1lcnMubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZSAoaWR4IDwgdHJhbnNmb3JtZXJzLmxlbmd0aCkge1xuICAgICAgYXJncy5wdXNoKHRyYW5zZm9ybWVyc1tpZHhdLmNhbGwodGhpcywgYXJndW1lbnRzW2lkeF0pKTtcbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCB0cmFuc2Zvcm1lcnMubGVuZ3RoKSkpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgdXNlV2l0aDsiLCJpbXBvcnQgeyB2bm9kZSB9IGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5mdW5jdGlvbiBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKSB7XG4gICAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgaWYgKHNlbCAhPT0gJ2ZvcmVpZ25PYmplY3QnICYmIGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRGF0YSA9IGNoaWxkcmVuW2ldLmRhdGE7XG4gICAgICAgICAgICBpZiAoY2hpbGREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGROUyhjaGlsZERhdGEsIGNoaWxkcmVuW2ldLmNoaWxkcmVuLCBjaGlsZHJlbltpXS5zZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGlzLnByaW1pdGl2ZShjaGlsZHJlbltpXSkpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB2bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgdW5kZWZpbmVkKTtcbn1cbjtcbmV4cG9ydCBkZWZhdWx0IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG59XG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG59XG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xuICAgIHJldHVybiBlbG0udGFnTmFtZTtcbn1cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG59XG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xufVxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcbn1cbmV4cG9ydCB2YXIgaHRtbERvbUFwaSA9IHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnROUzogY3JlYXRlRWxlbWVudE5TLFxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gICAgcGFyZW50Tm9kZTogcGFyZW50Tm9kZSxcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBzZXRUZXh0Q29udGVudDogc2V0VGV4dENvbnRlbnQsXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzVGV4dDogaXNUZXh0LFxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxufTtcbmV4cG9ydCBkZWZhdWx0IGh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsImV4cG9ydCB2YXIgYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZXhwb3J0IGZ1bmN0aW9uIHByaW1pdGl2ZShzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcyA9PT0gJ251bWJlcic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy5qcy5tYXAiLCJpbXBvcnQgdm5vZGUgZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBodG1sRG9tQXBpIGZyb20gJy4vaHRtbGRvbWFwaSc7XG5mdW5jdGlvbiBpc1VuZGVmKHMpIHsgcmV0dXJuIHMgPT09IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gaXNEZWYocykgeyByZXR1cm4gcyAhPT0gdW5kZWZpbmVkOyB9XG52YXIgZW1wdHlOb2RlID0gdm5vZGUoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuZnVuY3Rpb24gc2FtZVZub2RlKHZub2RlMSwgdm5vZGUyKSB7XG4gICAgcmV0dXJuIHZub2RlMS5rZXkgPT09IHZub2RlMi5rZXkgJiYgdm5vZGUxLnNlbCA9PT0gdm5vZGUyLnNlbDtcbn1cbmZ1bmN0aW9uIGlzVm5vZGUodm5vZGUpIHtcbiAgICByZXR1cm4gdm5vZGUuc2VsICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICAgIHZhciBpLCBtYXAgPSB7fSwga2V5LCBjaDtcbiAgICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgICAgICBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAga2V5ID0gY2gua2V5O1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG1hcFtrZXldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufVxudmFyIGhvb2tzID0gWydjcmVhdGUnLCAndXBkYXRlJywgJ3JlbW92ZScsICdkZXN0cm95JywgJ3ByZScsICdwb3N0J107XG5leHBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmV4cG9ydCB7IHRodW5rIH0gZnJvbSAnLi90aHVuayc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdChtb2R1bGVzLCBkb21BcGkpIHtcbiAgICB2YXIgaSwgaiwgY2JzID0ge307XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbERvbUFwaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGhvb2sgPSBtb2R1bGVzW2pdW2hvb2tzW2ldXTtcbiAgICAgICAgICAgIGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjYnNbaG9va3NbaV1dLnB1c2goaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgICAgIHZhciBpZCA9IGVsbS5pZCA/ICcjJyArIGVsbS5pZCA6ICcnO1xuICAgICAgICB2YXIgYyA9IGVsbS5jbGFzc05hbWUgPyAnLicgKyBlbG0uY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHJldHVybiB2bm9kZShhcGkudGFnTmFtZShlbG0pLnRvTG93ZXJDYXNlKCkgKyBpZCArIGMsIHt9LCBbXSwgdW5kZWZpbmVkLCBlbG0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVSbUNiKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJtQ2IoKSB7XG4gICAgICAgICAgICBpZiAoLS1saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBhcGkucGFyZW50Tm9kZShjaGlsZEVsbSk7XG4gICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudF8xLCBjaGlsZEVsbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW4sIHNlbCA9IHZub2RlLnNlbDtcbiAgICAgICAgaWYgKHNlbCA9PT0gJyEnKSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHZub2RlLnRleHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBQYXJzZSBzZWxlY3RvclxuICAgICAgICAgICAgdmFyIGhhc2hJZHggPSBzZWwuaW5kZXhPZignIycpO1xuICAgICAgICAgICAgdmFyIGRvdElkeCA9IHNlbC5pbmRleE9mKCcuJywgaGFzaElkeCk7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hJZHggPiAwID8gaGFzaElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZG90ID0gZG90SWR4ID4gMCA/IGRvdElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGFnID0gaGFzaElkeCAhPT0gLTEgfHwgZG90SWR4ICE9PSAtMSA/IHNlbC5zbGljZSgwLCBNYXRoLm1pbihoYXNoLCBkb3QpKSA6IHNlbDtcbiAgICAgICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ucykgPyBhcGkuY3JlYXRlRWxlbWVudE5TKGksIHRhZylcbiAgICAgICAgICAgICAgICA6IGFwaS5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgICAgICBpZiAoaGFzaCA8IGRvdClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHNlbC5zbGljZShoYXNoICsgMSwgZG90KSk7XG4gICAgICAgICAgICBpZiAoZG90SWR4ID4gMClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjbGFzcycsIHNlbC5zbGljZShkb3QgKyAxKS5yZXBsYWNlKC9cXC4vZywgJyAnKSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmNyZWF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgICAgICAgICAgIGlmIChpLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkuaW5zZXJ0KVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlLmVsbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpLCBiZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rKHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBqLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5kZXN0cm95W2ldKHZub2RlKTtcbiAgICAgICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB2bm9kZS5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gbnVsbCAmJiB0eXBlb2YgaSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBpXzEgPSB2b2lkIDAsIGxpc3RlbmVycyA9IHZvaWQgMCwgcm0gPSB2b2lkIDAsIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKGNoLnNlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJtID0gY3JlYXRlUm1DYihjaC5lbG0sIGxpc3RlbmVycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaV8xID0gMDsgaV8xIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraV8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JzLnJlbW92ZVtpXzFdKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZihpXzEgPSBjaC5kYXRhKSAmJiBpc0RlZihpXzEgPSBpXzEuaG9vaykgJiYgaXNEZWYoaV8xID0gaV8xLnJlbW92ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfMShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudEVsbSwgY2guZWxtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgb2xkU3RhcnRJZHggPSAwLCBuZXdTdGFydElkeCA9IDA7XG4gICAgICAgIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgICAgICB2YXIgb2xkRW5kVm5vZGUgPSBvbGRDaFtvbGRFbmRJZHhdO1xuICAgICAgICB2YXIgbmV3RW5kSWR4ID0gbmV3Q2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICAgICAgdmFyIG5ld0VuZFZub2RlID0gbmV3Q2hbbmV3RW5kSWR4XTtcbiAgICAgICAgdmFyIG9sZEtleVRvSWR4O1xuICAgICAgICB2YXIgaWR4SW5PbGQ7XG4gICAgICAgIHZhciBlbG1Ub01vdmU7XG4gICAgICAgIHZhciBiZWZvcmU7XG4gICAgICAgIHdoaWxlIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggJiYgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdOyAvLyBWbm9kZSBtaWdodCBoYXZlIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkRW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3U3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3RW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGRLZXlUb0lkeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHhJbk9sZCA9IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbVRvTW92ZS5zZWwgIT09IG5ld1N0YXJ0Vm5vZGUuc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUoZWxtVG9Nb3ZlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggfHwgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRJZHggPiBvbGRFbmRJZHgpIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXdDaFtuZXdFbmRJZHggKyAxXSA9PSBudWxsID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGhvb2s7XG4gICAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YSkgJiYgaXNEZWYoaG9vayA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucHJlcGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodm5vZGUuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rO1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkpICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpXG4gICAgICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpICYmIGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRDaCAhPT0gY2gpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKGVsbSwgb2xkQ2gsIGNoLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBlbG0sIHBhcmVudDtcbiAgICAgICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wcmVbaV0oKTtcbiAgICAgICAgaWYgKCFpc1Zub2RlKG9sZFZub2RlKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgICAgIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGVsbSk7XG4gICAgICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnQsIHZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKGVsbSkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnQsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRlZFZub2RlUXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KGluc2VydGVkVm5vZGVRdWV1ZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnBvc3RbaV0oKTtcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFiYmRvbS5qcy5tYXAiLCJpbXBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmZ1bmN0aW9uIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuaykge1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbiAgICB2bm9kZS5kYXRhLmZuID0gdGh1bmsuZGF0YS5mbjtcbiAgICB2bm9kZS5kYXRhLmFyZ3MgPSB0aHVuay5kYXRhLmFyZ3M7XG4gICAgdGh1bmsuZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdGh1bmsuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB0aHVuay50ZXh0ID0gdm5vZGUudGV4dDtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG59XG5mdW5jdGlvbiBpbml0KHRodW5rKSB7XG4gICAgdmFyIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIHZub2RlID0gY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgY3VyLmFyZ3MpO1xuICAgIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuayk7XG59XG5mdW5jdGlvbiBwcmVwYXRjaChvbGRWbm9kZSwgdGh1bmspIHtcbiAgICB2YXIgaSwgb2xkID0gb2xkVm5vZGUuZGF0YSwgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgb2xkQXJncyA9IG9sZC5hcmdzLCBhcmdzID0gY3VyLmFyZ3M7XG4gICAgaWYgKG9sZC5mbiAhPT0gY3VyLmZuIHx8IG9sZEFyZ3MubGVuZ3RoICE9PSBhcmdzLmxlbmd0aCkge1xuICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvbGRBcmdzW2ldICE9PSBhcmdzW2ldKSB7XG4gICAgICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvcHlUb1RodW5rKG9sZFZub2RlLCB0aHVuayk7XG59XG5leHBvcnQgdmFyIHRodW5rID0gZnVuY3Rpb24gdGh1bmsoc2VsLCBrZXksIGZuLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcmdzID0gZm47XG4gICAgICAgIGZuID0ga2V5O1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBoKHNlbCwge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaG9vazogeyBpbml0OiBpbml0LCBwcmVwYXRjaDogcHJlcGF0Y2ggfSxcbiAgICAgICAgZm46IGZuLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgdGh1bms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHVuay5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0IGRlZmF1bHQgdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XG52YXIgaXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoKHNlbCwgYiwgYykge1xuICAgIHZhciBkYXRhID0ge30sIGNoaWxkcmVuLCB0ZXh0LCBpO1xuICAgIGlmIChjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIGlmIChpcy5hcnJheShjKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShjKSkge1xuICAgICAgICAgICAgdGV4dCA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyAmJiBjLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbY107XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpcy5hcnJheShiKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShiKSkge1xuICAgICAgICAgICAgdGV4dCA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYiAmJiBiLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbYl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdm5vZGVfMS52bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGVfMS52bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5oID0gaDtcbjtcbmV4cG9ydHMuZGVmYXVsdCA9IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0cy5odG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5odG1sRG9tQXBpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGRvbWFwaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMucHJpbWl0aXZlID0gcHJpbWl0aXZlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbnZhciB4bWxOUyA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnO1xudmFyIGNvbG9uQ2hhciA9IDU4O1xudmFyIHhDaGFyID0gMTIwO1xuZnVuY3Rpb24gdXBkYXRlQXR0cnMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgZWxtID0gdm5vZGUuZWxtLCBvbGRBdHRycyA9IG9sZFZub2RlLmRhdGEuYXR0cnMsIGF0dHJzID0gdm5vZGUuZGF0YS5hdHRycztcbiAgICBpZiAoIW9sZEF0dHJzICYmICFhdHRycylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRBdHRycyA9PT0gYXR0cnMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRBdHRycyA9IG9sZEF0dHJzIHx8IHt9O1xuICAgIGF0dHJzID0gYXR0cnMgfHwge307XG4gICAgLy8gdXBkYXRlIG1vZGlmaWVkIGF0dHJpYnV0ZXMsIGFkZCBuZXcgYXR0cmlidXRlc1xuICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgIHZhciBjdXIgPSBhdHRyc1trZXldO1xuICAgICAgICB2YXIgb2xkID0gb2xkQXR0cnNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyKSB7XG4gICAgICAgICAgICBpZiAoY3VyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChrZXkuY2hhckNvZGVBdCgwKSAhPT0geENoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDMpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhtbCBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZU5TKHhtbE5TLCBrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDUpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhsaW5rIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlTlMoeGxpbmtOUywga2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZW1vdmVkIGF0dHJpYnV0ZXNcbiAgICAvLyB1c2UgYGluYCBvcGVyYXRvciBzaW5jZSB0aGUgcHJldmlvdXMgYGZvcmAgaXRlcmF0aW9uIHVzZXMgaXQgKC5pLmUuIGFkZCBldmVuIGF0dHJpYnV0ZXMgd2l0aCB1bmRlZmluZWQgdmFsdWUpXG4gICAgLy8gdGhlIG90aGVyIG9wdGlvbiBpcyB0byByZW1vdmUgYWxsIGF0dHJpYnV0ZXMgd2l0aCB2YWx1ZSA9PSB1bmRlZmluZWRcbiAgICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgICAgICBpZiAoIShrZXkgaW4gYXR0cnMpKSB7XG4gICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmF0dHJpYnV0ZXNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQXR0cnMsIHVwZGF0ZTogdXBkYXRlQXR0cnMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuYXR0cmlidXRlc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF0dHJpYnV0ZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVDbGFzcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgY3VyLCBuYW1lLCBlbG0gPSB2bm9kZS5lbG0sIG9sZENsYXNzID0gb2xkVm5vZGUuZGF0YS5jbGFzcywga2xhc3MgPSB2bm9kZS5kYXRhLmNsYXNzO1xuICAgIGlmICghb2xkQ2xhc3MgJiYgIWtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZENsYXNzID09PSBrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZENsYXNzID0gb2xkQ2xhc3MgfHwge307XG4gICAga2xhc3MgPSBrbGFzcyB8fCB7fTtcbiAgICBmb3IgKG5hbWUgaW4gb2xkQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFrbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIGtsYXNzKSB7XG4gICAgICAgIGN1ciA9IGtsYXNzW25hbWVdO1xuICAgICAgICBpZiAoY3VyICE9PSBvbGRDbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdFtjdXIgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuY2xhc3NNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQ2xhc3MsIHVwZGF0ZTogdXBkYXRlQ2xhc3MgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuY2xhc3NNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGFzcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGludm9rZUhhbmRsZXIoaGFuZGxlciwgdm5vZGUsIGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gY2FsbCBmdW5jdGlvbiBoYW5kbGVyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh2bm9kZSwgZXZlbnQsIHZub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIHdpdGggYXJndW1lbnRzXG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlclswXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBhcmd1bWVudCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJbMF0uY2FsbCh2bm9kZSwgaGFuZGxlclsxXSwgZXZlbnQsIHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gaGFuZGxlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5hcHBseSh2bm9kZSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjYWxsIG11bHRpcGxlIGhhbmRsZXJzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnZva2VIYW5kbGVyKGhhbmRsZXJbaV0sIHZub2RlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCwgdm5vZGUpIHtcbiAgICB2YXIgbmFtZSA9IGV2ZW50LnR5cGUsIG9uID0gdm5vZGUuZGF0YS5vbjtcbiAgICAvLyBjYWxsIGV2ZW50IGhhbmRsZXIocykgaWYgZXhpc3RzXG4gICAgaWYgKG9uICYmIG9uW25hbWVdKSB7XG4gICAgICAgIGludm9rZUhhbmRsZXIob25bbmFtZV0sIHZub2RlLCBldmVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQsIGhhbmRsZXIudm5vZGUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB1cGRhdGVFdmVudExpc3RlbmVycyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uLCBvbGRMaXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyLCBvbGRFbG0gPSBvbGRWbm9kZS5lbG0sIG9uID0gdm5vZGUgJiYgdm5vZGUuZGF0YS5vbiwgZWxtID0gKHZub2RlICYmIHZub2RlLmVsbSksIG5hbWU7XG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciByZXVzZWQgaW1tdXRhYmxlIGhhbmRsZXJzXG4gICAgaWYgKG9sZE9uID09PSBvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgd2hpY2ggbm8gbG9uZ2VyIHVzZWRcbiAgICBpZiAob2xkT24gJiYgb2xkTGlzdGVuZXIpIHtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGRlbGV0ZWQgd2UgcmVtb3ZlIGFsbCBleGlzdGluZyBsaXN0ZW5lcnMgdW5jb25kaXRpb25hbGx5XG4gICAgICAgIGlmICghb24pIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBlbGVtZW50IHdhcyBjaGFuZ2VkIG9yIGV4aXN0aW5nIGxpc3RlbmVycyByZW1vdmVkXG4gICAgICAgICAgICAgICAgb2xkRWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgb2xkTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBleGlzdGluZyBsaXN0ZW5lciByZW1vdmVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgbmV3IGxpc3RlbmVycyB3aGljaCBoYXMgbm90IGFscmVhZHkgYXR0YWNoZWRcbiAgICBpZiAob24pIHtcbiAgICAgICAgLy8gcmV1c2UgZXhpc3RpbmcgbGlzdGVuZXIgb3IgY3JlYXRlIG5ld1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSB2bm9kZS5saXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyIHx8IGNyZWF0ZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIHVwZGF0ZSB2bm9kZSBmb3IgbGlzdGVuZXJcbiAgICAgICAgbGlzdGVuZXIudm5vZGUgPSB2bm9kZTtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGFkZGVkIHdlIGFkZCBhbGwgbmVlZGVkIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbGRPbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgbmV3IGxpc3RlbmVycyBhZGRlZFxuICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgbmV3IGxpc3RlbmVyIGFkZGVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbGRPbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZXZlbnRMaXN0ZW5lcnNNb2R1bGUgPSB7XG4gICAgY3JlYXRlOiB1cGRhdGVFdmVudExpc3RlbmVycyxcbiAgICB1cGRhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGRlc3Ryb3k6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50bGlzdGVuZXJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlUHJvcHMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgY3VyLCBvbGQsIGVsbSA9IHZub2RlLmVsbSwgb2xkUHJvcHMgPSBvbGRWbm9kZS5kYXRhLnByb3BzLCBwcm9wcyA9IHZub2RlLmRhdGEucHJvcHM7XG4gICAgaWYgKCFvbGRQcm9wcyAmJiAhcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkUHJvcHMgPT09IHByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkUHJvcHMgPSBvbGRQcm9wcyB8fCB7fTtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGZvciAoa2V5IGluIG9sZFByb3BzKSB7XG4gICAgICAgIGlmICghcHJvcHNba2V5XSkge1xuICAgICAgICAgICAgZGVsZXRlIGVsbVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgICAgIG9sZCA9IG9sZFByb3BzW2tleV07XG4gICAgICAgIGlmIChvbGQgIT09IGN1ciAmJiAoa2V5ICE9PSAndmFsdWUnIHx8IGVsbVtrZXldICE9PSBjdXIpKSB7XG4gICAgICAgICAgICBlbG1ba2V5XSA9IGN1cjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMucHJvcHNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlUHJvcHMsIHVwZGF0ZTogdXBkYXRlUHJvcHMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMucHJvcHNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEJpbmRpZyBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBsaWtlIHRoaXMgZml4ZXMgYSBidWcgaW4gSUUvRWRnZS4gU2VlICMzNjAgYW5kICM0MDkuXG52YXIgcmFmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKS5iaW5kKHdpbmRvdykpIHx8IHNldFRpbWVvdXQ7XG52YXIgbmV4dEZyYW1lID0gZnVuY3Rpb24gKGZuKSB7IHJhZihmdW5jdGlvbiAoKSB7IHJhZihmbik7IH0pOyB9O1xudmFyIHJlZmxvd0ZvcmNlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2V0TmV4dEZyYW1lKG9iaiwgcHJvcCwgdmFsKSB7XG4gICAgbmV4dEZyYW1lKGZ1bmN0aW9uICgpIHsgb2JqW3Byb3BdID0gdmFsOyB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBjdXIsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgb2xkU3R5bGUgPSBvbGRWbm9kZS5kYXRhLnN0eWxlLCBzdHlsZSA9IHZub2RlLmRhdGEuc3R5bGU7XG4gICAgaWYgKCFvbGRTdHlsZSAmJiAhc3R5bGUpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkU3R5bGUgPT09IHN0eWxlKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkU3R5bGUgPSBvbGRTdHlsZSB8fCB7fTtcbiAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xuICAgIHZhciBvbGRIYXNEZWwgPSAnZGVsYXllZCcgaW4gb2xkU3R5bGU7XG4gICAgZm9yIChuYW1lIGluIG9sZFN0eWxlKSB7XG4gICAgICAgIGlmICghc3R5bGVbbmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzBdID09PSAnLScgJiYgbmFtZVsxXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGN1ciA9IHN0eWxlW25hbWVdO1xuICAgICAgICBpZiAobmFtZSA9PT0gJ2RlbGF5ZWQnICYmIHN0eWxlLmRlbGF5ZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUyIGluIHN0eWxlLmRlbGF5ZWQpIHtcbiAgICAgICAgICAgICAgICBjdXIgPSBzdHlsZS5kZWxheWVkW25hbWUyXTtcbiAgICAgICAgICAgICAgICBpZiAoIW9sZEhhc0RlbCB8fCBjdXIgIT09IG9sZFN0eWxlLmRlbGF5ZWRbbmFtZTJdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldE5leHRGcmFtZShlbG0uc3R5bGUsIG5hbWUyLCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lICE9PSAncmVtb3ZlJyAmJiBjdXIgIT09IG9sZFN0eWxlW25hbWVdKSB7XG4gICAgICAgICAgICBpZiAobmFtZVswXSA9PT0gJy0nICYmIG5hbWVbMV0gPT09ICctJykge1xuICAgICAgICAgICAgICAgIGVsbS5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCBjdXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gY3VyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gYXBwbHlEZXN0cm95U3R5bGUodm5vZGUpIHtcbiAgICB2YXIgc3R5bGUsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgcyA9IHZub2RlLmRhdGEuc3R5bGU7XG4gICAgaWYgKCFzIHx8ICEoc3R5bGUgPSBzLmRlc3Ryb3kpKVxuICAgICAgICByZXR1cm47XG4gICAgZm9yIChuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGVsbS5zdHlsZVtuYW1lXSA9IHN0eWxlW25hbWVdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFwcGx5UmVtb3ZlU3R5bGUodm5vZGUsIHJtKSB7XG4gICAgdmFyIHMgPSB2bm9kZS5kYXRhLnN0eWxlO1xuICAgIGlmICghcyB8fCAhcy5yZW1vdmUpIHtcbiAgICAgICAgcm0oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXJlZmxvd0ZvcmNlZCkge1xuICAgICAgICBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLnRyYW5zZm9ybTtcbiAgICAgICAgcmVmbG93Rm9yY2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgaSA9IDAsIGNvbXBTdHlsZSwgc3R5bGUgPSBzLnJlbW92ZSwgYW1vdW50ID0gMCwgYXBwbGllZCA9IFtdO1xuICAgIGZvciAobmFtZSBpbiBzdHlsZSkge1xuICAgICAgICBhcHBsaWVkLnB1c2gobmFtZSk7XG4gICAgICAgIGVsbS5zdHlsZVtuYW1lXSA9IHN0eWxlW25hbWVdO1xuICAgIH1cbiAgICBjb21wU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsbSk7XG4gICAgdmFyIHByb3BzID0gY29tcFN0eWxlWyd0cmFuc2l0aW9uLXByb3BlcnR5J10uc3BsaXQoJywgJyk7XG4gICAgZm9yICg7IGkgPCBwcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoYXBwbGllZC5pbmRleE9mKHByb3BzW2ldKSAhPT0gLTEpXG4gICAgICAgICAgICBhbW91bnQrKztcbiAgICB9XG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGV2LnRhcmdldCA9PT0gZWxtKVxuICAgICAgICAgICAgLS1hbW91bnQ7XG4gICAgICAgIGlmIChhbW91bnQgPT09IDApXG4gICAgICAgICAgICBybSgpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZm9yY2VSZWZsb3coKSB7XG4gICAgcmVmbG93Rm9yY2VkID0gZmFsc2U7XG59XG5leHBvcnRzLnN0eWxlTW9kdWxlID0ge1xuICAgIHByZTogZm9yY2VSZWZsb3csXG4gICAgY3JlYXRlOiB1cGRhdGVTdHlsZSxcbiAgICB1cGRhdGU6IHVwZGF0ZVN0eWxlLFxuICAgIGRlc3Ryb3k6IGFwcGx5RGVzdHJveVN0eWxlLFxuICAgIHJlbW92ZTogYXBwbHlSZW1vdmVTdHlsZVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuc3R5bGVNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XG52YXIgaHRtbGRvbWFwaV8xID0gcmVxdWlyZShcIi4vaHRtbGRvbWFwaVwiKTtcbmZ1bmN0aW9uIHRvVk5vZGUobm9kZSwgZG9tQXBpKSB7XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbGRvbWFwaV8xLmRlZmF1bHQ7XG4gICAgdmFyIHRleHQ7XG4gICAgaWYgKGFwaS5pc0VsZW1lbnQobm9kZSkpIHtcbiAgICAgICAgdmFyIGlkID0gbm9kZS5pZCA/ICcjJyArIG5vZGUuaWQgOiAnJztcbiAgICAgICAgdmFyIGNuID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIHZhciBjID0gY24gPyAnLicgKyBjbi5zcGxpdCgnICcpLmpvaW4oJy4nKSA6ICcnO1xuICAgICAgICB2YXIgc2VsID0gYXBpLnRhZ05hbWUobm9kZSkudG9Mb3dlckNhc2UoKSArIGlkICsgYztcbiAgICAgICAgdmFyIGF0dHJzID0ge307XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgICAgICB2YXIgbmFtZV8xO1xuICAgICAgICB2YXIgaSA9IHZvaWQgMCwgbiA9IHZvaWQgMDtcbiAgICAgICAgdmFyIGVsbUF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgICAgICB2YXIgZWxtQ2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXM7XG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSBlbG1BdHRycy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWVfMSA9IGVsbUF0dHJzW2ldLm5vZGVOYW1lO1xuICAgICAgICAgICAgaWYgKG5hbWVfMSAhPT0gJ2lkJyAmJiBuYW1lXzEgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgICAgICBhdHRyc1tuYW1lXzFdID0gZWxtQXR0cnNbaV0ubm9kZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSBlbG1DaGlsZHJlbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godG9WTm9kZShlbG1DaGlsZHJlbltpXSwgZG9tQXBpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdChzZWwsIHsgYXR0cnM6IGF0dHJzIH0sIGNoaWxkcmVuLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhcGkuaXNUZXh0KG5vZGUpKSB7XG4gICAgICAgIHRleHQgPSBhcGkuZ2V0VGV4dENvbnRlbnQobm9kZSk7XG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGV4dCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFwaS5pc0NvbW1lbnQobm9kZSkpIHtcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdCgnIScsIHt9LCBbXSwgdGV4dCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KCcnLCB7fSwgW10sIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxufVxuZXhwb3J0cy50b1ZOb2RlID0gdG9WTm9kZTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvVk5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b3Zub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0cy52bm9kZSA9IHZub2RlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCJ2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vVGFicy5jc3NcIik7XG5cbmlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xufVxuXG52YXIgb3B0aW9ucyA9IHt9XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmIChjb250ZW50LmxvY2Fscykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xufVxuIiwidmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Z1bmN0aW9uYWwuY3NzXCIpO1xuXG5pZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbn1cblxudmFyIG9wdGlvbnMgPSB7fVxuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZiAoY29udGVudC5sb2NhbHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZXMgPSBbXTtcbiAgdmFyIG5ld1N0eWxlcyA9IHt9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY3NzID0gaXRlbVsxXTtcbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdO1xuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH07XG5cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgcGFydHM6IFtwYXJ0XVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXTtcbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcbiAgICB2YXIgaiA9IDA7XG5cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrKztcblxuICAgICAgZm9yICg7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcbiAgICAgIH1cblxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuICAgICAgfVxuXG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtcbiAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgIHJlZnM6IDEsXG4gICAgICAgIHBhcnRzOiBwYXJ0c1xuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBvcHRpb25zLmF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhvcHRpb25zLmF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIG9wdGlvbnMuYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBvcHRpb25zLmF0dHJpYnV0ZXMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSAnb2JqZWN0JyA/IG9wdGlvbnMuYXR0cmlidXRlcyA6IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXTtcbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG4gICAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgICAgZG9tU3R5bGUucmVmcy0tO1xuICAgICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgICBhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtYXlSZW1vdmUubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2RvbVN0eWxlID0gbWF5UmVtb3ZlW19pXTtcblxuICAgICAgaWYgKF9kb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2RvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgX2RvbVN0eWxlLnBhcnRzW2pdKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bX2RvbVN0eWxlLmlkXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59OyIsInZhciBfYXJpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGlzIGJvdW5kIHRvIGEgY29udGV4dC5cbiAqIE5vdGU6IGBSLmJpbmRgIGRvZXMgbm90IHByb3ZpZGUgdGhlIGFkZGl0aW9uYWwgYXJndW1lbnQtYmluZGluZyBjYXBhYmlsaXRpZXMgb2ZcbiAqIFtGdW5jdGlvbi5wcm90b3R5cGUuYmluZF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vYmluZCkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKCogLT4gKikgLT4geyp9IC0+ICgqIC0+ICopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmluZCB0byBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc09iaiBUaGUgY29udGV4dCB0byBiaW5kIGBmbmAgdG9cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBleGVjdXRlIGluIHRoZSBjb250ZXh0IG9mIGB0aGlzT2JqYC5cbiAqIEBzZWUgUi5wYXJ0aWFsXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGxvZyA9IFIuYmluZChjb25zb2xlLmxvZywgY29uc29sZSk7XG4gKiAgICAgIFIucGlwZShSLmFzc29jKCdhJywgMiksIFIudGFwKGxvZyksIFIuYXNzb2MoJ2EnLCAzKSkoe2E6IDF9KTsgLy89PiB7YTogM31cbiAqICAgICAgLy8gbG9ncyB7YTogMn1cbiAqIEBzeW1iIFIuYmluZChmLCBvKShhLCBiKSA9IGYuY2FsbChvLCBhLCBiKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gYmluZChmbiwgdGhpc09iaikge1xuICByZXR1cm4gX2FyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNPYmosIGFyZ3VtZW50cyk7XG4gIH0pO1xufSk7XG4iLCJ2YXIgcGlwZSA9IHJlcXVpcmUoJy4vcGlwZScpO1xudmFyIHJldmVyc2UgPSByZXF1aXJlKCcuL3JldmVyc2UnKTtcblxuXG4vKipcbiAqIFBlcmZvcm1zIHJpZ2h0LXRvLWxlZnQgZnVuY3Rpb24gY29tcG9zaXRpb24uIFRoZSByaWdodG1vc3QgZnVuY3Rpb24gbWF5IGhhdmVcbiAqIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIHJlc3VsdCBvZiBjb21wb3NlIGlzIG5vdCBhdXRvbWF0aWNhbGx5IGN1cnJpZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCh5IC0+IHopLCAoeCAtPiB5KSwgLi4uLCAobyAtPiBwKSwgKChhLCBiLCAuLi4sIG4pIC0+IG8pKSAtPiAoKGEsIGIsIC4uLiwgbikgLT4geilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IC4uLmZ1bmN0aW9ucyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLnBpcGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgY2xhc3N5R3JlZXRpbmcgPSAoZmlyc3ROYW1lLCBsYXN0TmFtZSkgPT4gXCJUaGUgbmFtZSdzIFwiICsgbGFzdE5hbWUgKyBcIiwgXCIgKyBmaXJzdE5hbWUgKyBcIiBcIiArIGxhc3ROYW1lXG4gKiAgICAgIHZhciB5ZWxsR3JlZXRpbmcgPSBSLmNvbXBvc2UoUi50b1VwcGVyLCBjbGFzc3lHcmVldGluZyk7XG4gKiAgICAgIHllbGxHcmVldGluZygnSmFtZXMnLCAnQm9uZCcpOyAvLz0+IFwiVEhFIE5BTUUnUyBCT05ELCBKQU1FUyBCT05EXCJcbiAqXG4gKiAgICAgIFIuY29tcG9zZShNYXRoLmFicywgUi5hZGQoMSksIFIubXVsdGlwbHkoMikpKC00KSAvLz0+IDdcbiAqXG4gKiBAc3ltYiBSLmNvbXBvc2UoZiwgZywgaCkoYSwgYikgPSBmKGcoaChhLCBiKSkpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvc2UgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIHBpcGUuYXBwbHkodGhpcywgcmV2ZXJzZShhcmd1bWVudHMpKTtcbn07XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcbnZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9jdXJyeU4gPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCB3aXRoIHRoZSBzcGVjaWZpZWRcbiAqIGFyaXR5LiBUaGUgY3VycmllZCBmdW5jdGlvbiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzXG4gKiBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmUgYXQgYSB0aW1lLiBJZiBgZ2AgaXMgYFIuY3VycnlOKDMsIGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBbYFIuX19gXSgjX18pIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgW2BSLl9fYF0oI19fKSxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjUuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzdW1BcmdzID0gKC4uLmFyZ3MpID0+IFIuc3VtKGFyZ3MpO1xuICpcbiAqICAgICAgdmFyIGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnlOKDQsIHN1bUFyZ3MpO1xuICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgdmFyIGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBjdXJyeU4obGVuZ3RoLCBmbikge1xuICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIF9jdXJyeTEoZm4pO1xuICB9XG4gIHJldHVybiBfYXJpdHkobGVuZ3RoLCBfY3VycnlOKGxlbmd0aCwgW10sIGZuKSk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhMCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhMCwgYTEpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMikgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMykgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA2OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDc6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNikgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDg6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA5OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDEwOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufTtcbiIsInZhciBfaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzQXJyYXknKTtcblxuXG4vKipcbiAqIFRoaXMgY2hlY2tzIHdoZXRoZXIgYSBmdW5jdGlvbiBoYXMgYSBbbWV0aG9kbmFtZV0gZnVuY3Rpb24uIElmIGl0IGlzbid0IGFuXG4gKiBhcnJheSBpdCB3aWxsIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiBvdGhlcndpc2UgaXQgd2lsbCBkZWZhdWx0IHRvIHRoZSByYW1kYVxuICogaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHJhbWRhIGltcGxlbXRhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZG5hbWUgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtPYmplY3R9IFdoYXRldmVyIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIG1ldGhvZCBpcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY2hlY2tGb3JNZXRob2QobWV0aG9kbmFtZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2xlbmd0aCAtIDFdO1xuICAgIHJldHVybiAoX2lzQXJyYXkob2JqKSB8fCB0eXBlb2Ygb2JqW21ldGhvZG5hbWVdICE9PSAnZnVuY3Rpb24nKSA/XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDpcbiAgICAgIG9ialttZXRob2RuYW1lXS5hcHBseShvYmosIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgbGVuZ3RoIC0gMSkpO1xuICB9O1xufTtcbiIsInZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCBvbmUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTEoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKGEpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBfaXNQbGFjZWhvbGRlcihhKSkge1xuICAgICAgcmV0dXJuIGYxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG59O1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL19jdXJyeTEnKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmMlxuICAgICAgICAgICAgIDogX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IpOyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYyXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2EpIHsgcmV0dXJuIGZuKF9hLCBiKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IpOyB9KVxuICAgICAgICAgICAgIDogZm4oYSwgYik7XG4gICAgfVxuICB9O1xufTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9fY3VycnkxJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF9pc1BsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHRocmVlLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnkzKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMyhhLCBiLCBjKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjNcbiAgICAgICAgICAgICA6IF9jdXJyeTIoZnVuY3Rpb24oX2IsIF9jKSB7IHJldHVybiBmbihhLCBfYiwgX2MpOyB9KTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjNcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MihmdW5jdGlvbihfYSwgX2MpIHsgcmV0dXJuIGZuKF9hLCBiLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2IsIF9jKSB7IHJldHVybiBmbihhLCBfYiwgX2MpOyB9KVxuICAgICAgICAgICAgIDogX2N1cnJ5MShmdW5jdGlvbihfYykgeyByZXR1cm4gZm4oYSwgYiwgX2MpOyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IGYzXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2EsIF9iKSB7IHJldHVybiBmbihfYSwgX2IsIGMpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkyKGZ1bmN0aW9uKF9hLCBfYykgeyByZXR1cm4gZm4oX2EsIGIsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MihmdW5jdGlvbihfYiwgX2MpIHsgcmV0dXJuIGZuKGEsIF9iLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2EpIHsgcmV0dXJuIGZuKF9hLCBiLCBjKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbihfYikgeyByZXR1cm4gZm4oYSwgX2IsIGMpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkxKGZ1bmN0aW9uKF9jKSB7IHJldHVybiBmbihhLCBiLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBmbihhLCBiLCBjKTtcbiAgICB9XG4gIH07XG59O1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vX2FyaXR5Jyk7XG52YXIgX2lzUGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5TihsZW5ndGgsIHJlY2VpdmVkLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmXG4gICAgICAgICAgKCFfaXNQbGFjZWhvbGRlcihyZWNlaXZlZFtjb21iaW5lZElkeF0pIHx8XG4gICAgICAgICAgIGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gYXJndW1lbnRzW2FyZ3NJZHhdO1xuICAgICAgICBhcmdzSWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICBpZiAoIV9pc1BsYWNlaG9sZGVyKHJlc3VsdCkpIHtcbiAgICAgICAgbGVmdCAtPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRJZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnQgPD0gMCA/IGZuLmFwcGx5KHRoaXMsIGNvbWJpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufTtcbiIsIi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHZhbGAgaXMgYW4gYXJyYXksIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIF9pc0FycmF5KFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIF9pc0FycmF5KG51bGwpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5KHt9KTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gX2lzQXJyYXkodmFsKSB7XG4gIHJldHVybiAodmFsICE9IG51bGwgJiZcbiAgICAgICAgICB2YWwubGVuZ3RoID49IDAgJiZcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJyk7XG59O1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL19jdXJyeTEnKTtcbnZhciBfaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzQXJyYXknKTtcbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCcuL19pc1N0cmluZycpO1xuXG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIHNpbWlsYXIgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBUeXBlXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAqIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0geCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGhhcyBhIG51bWVyaWMgbGVuZ3RoIHByb3BlcnR5IGFuZCBleHRyZW1lIGluZGljZXMgZGVmaW5lZDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2lzQXJyYXlMaWtlKFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh0cnVlKTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheUxpa2Uoe30pOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7bGVuZ3RoOiAxMH0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7MDogJ3plcm8nLCA5OiAnbmluZScsIGxlbmd0aDogMTB9KTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gIGlmIChfaXNBcnJheSh4KSkgeyByZXR1cm4gdHJ1ZTsgfVxuICBpZiAoIXgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChfaXNTdHJpbmcoeCkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh4Lm5vZGVUeXBlID09PSAxKSB7IHJldHVybiAhIXgubGVuZ3RoOyB9XG4gIGlmICh4Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdHJ1ZTsgfVxuICBpZiAoeC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHguaGFzT3duUHJvcGVydHkoMCkgJiYgeC5oYXNPd25Qcm9wZXJ0eSh4Lmxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaXNQbGFjZWhvbGRlcihhKSB7XG4gIHJldHVybiBhICE9IG51bGwgJiZcbiAgICAgICAgIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaXNTdHJpbmcoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9waXBlKGYsIGcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBnLmNhbGwodGhpcywgZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn07XG4iLCJ2YXIgX2lzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9faXNBcnJheUxpa2UnKTtcbnZhciBfeHdyYXAgPSByZXF1aXJlKCcuL194d3JhcCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9iaW5kJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgbGlzdFtpZHhdKTtcbiAgICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gIH1cblxuICBmdW5jdGlvbiBfaXRlcmFibGVSZWR1Y2UoeGYsIGFjYywgaXRlcikge1xuICAgIHZhciBzdGVwID0gaXRlci5uZXh0KCk7XG4gICAgd2hpbGUgKCFzdGVwLmRvbmUpIHtcbiAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgc3RlcC52YWx1ZSk7XG4gICAgICBpZiAoYWNjICYmIGFjY1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9tZXRob2RSZWR1Y2UoeGYsIGFjYywgb2JqLCBtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ob2JqW21ldGhvZE5hbWVdKGJpbmQoeGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10sIHhmKSwgYWNjKSk7XG4gIH1cblxuICB2YXIgc3ltSXRlcmF0b3IgPSAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcpID8gU3ltYm9sLml0ZXJhdG9yIDogJ0BAaXRlcmF0b3InO1xuICByZXR1cm4gZnVuY3Rpb24gX3JlZHVjZShmbiwgYWNjLCBsaXN0KSB7XG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm4gPSBfeHdyYXAoZm4pO1xuICAgIH1cbiAgICBpZiAoX2lzQXJyYXlMaWtlKGxpc3QpKSB7XG4gICAgICByZXR1cm4gX2FycmF5UmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxpc3RbJ2ZhbnRhc3ktbGFuZC9yZWR1Y2UnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCwgJ2ZhbnRhc3ktbGFuZC9yZWR1Y2UnKTtcbiAgICB9XG4gICAgaWYgKGxpc3Rbc3ltSXRlcmF0b3JdICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGlzdC5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxpc3QucmVkdWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0LCAncmVkdWNlJyk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncmVkdWNlOiBsaXN0IG11c3QgYmUgYXJyYXkgb3IgaXRlcmFibGUnKTtcbiAgfTtcbn0oKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWFdyYXAoZm4pIHtcbiAgICB0aGlzLmYgPSBmbjtcbiAgfVxuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luaXQgbm90IGltcGxlbWVudGVkIG9uIFhXcmFwJyk7XG4gIH07XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24oYWNjKSB7IHJldHVybiBhY2M7IH07XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKGFjYywgeCkge1xuICAgIHJldHVybiB0aGlzLmYoYWNjLCB4KTtcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gX3h3cmFwKGZuKSB7IHJldHVybiBuZXcgWFdyYXAoZm4pOyB9O1xufSgpKTtcbiIsInZhciBfYXJpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xudmFyIF9waXBlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcGlwZScpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJy4vcmVkdWNlJyk7XG52YXIgdGFpbCA9IHJlcXVpcmUoJy4vdGFpbCcpO1xuXG5cbi8qKlxuICogUGVyZm9ybXMgbGVmdC10by1yaWdodCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gKiBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmcgZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgc2VxdWVuY2VgLlxuICpcbiAqICoqTm90ZToqKiBUaGUgcmVzdWx0IG9mIHBpcGUgaXMgbm90IGF1dG9tYXRpY2FsbHkgY3VycmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKChhLCBiLCAuLi4sIG4pIC0+IG8pLCAobyAtPiBwKSwgLi4uLCAoeCAtPiB5KSwgKHkgLT4geikpIC0+ICgoYSwgYiwgLi4uLCBuKSAtPiB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGYgPSBSLnBpcGUoTWF0aC5wb3csIFIubmVnYXRlLCBSLmluYyk7XG4gKlxuICogICAgICBmKDMsIDQpOyAvLyAtKDNeNCkgKyAxXG4gKiBAc3ltYiBSLnBpcGUoZiwgZywgaCkoYSwgYikgPSBoKGcoZihhLCBiKSkpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BpcGUgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShhcmd1bWVudHNbMF0ubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHJlZHVjZShfcGlwZSwgYXJndW1lbnRzWzBdLCB0YWlsKGFyZ3VtZW50cykpKTtcbn07XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIF9yZWR1Y2UgPSByZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGUgaXRlbSBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmdcbiAqIHRoZSBpdGVyYXRvciBmdW5jdGlvbiBhbmQgcGFzc2luZyBpdCBhbiBhY2N1bXVsYXRvciB2YWx1ZSBhbmQgdGhlIGN1cnJlbnRcbiAqIHZhbHVlIGZyb20gdGhlIGFycmF5LCBhbmQgdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIHZhbHVlczogKihhY2MsIHZhbHVlKSouIEl0IG1heSB1c2VcbiAqIFtgUi5yZWR1Y2VkYF0oI3JlZHVjZWQpIHRvIHNob3J0Y3V0IHRoZSBpdGVyYXRpb24uXG4gKlxuICogVGhlIGFyZ3VtZW50cycgb3JkZXIgb2YgW2ByZWR1Y2VSaWdodGBdKCNyZWR1Y2VSaWdodCkncyBpdGVyYXRvciBmdW5jdGlvblxuICogaXMgKih2YWx1ZSwgYWNjKSouXG4gKlxuICogTm90ZTogYFIucmVkdWNlYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2VcbiAqIGFycmF5cyksIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHNcbiAqIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSNEZXNjcmlwdGlvblxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGByZWR1Y2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuIFdoZW5cbiAqIGRvaW5nIHNvLCBpdCBpcyB1cCB0byB0aGUgdXNlciB0byBoYW5kbGUgdGhlIFtgUi5yZWR1Y2VkYF0oI3JlZHVjZWQpXG4gKiBzaG9ydGN1dGluZywgYXMgdGhpcyBpcyBub3QgaW1wbGVtZW50ZWQgYnkgYHJlZHVjZWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIucmVkdWNlZCwgUi5hZGRJbmRleCwgUi5yZWR1Y2VSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVkdWNlKFIuc3VidHJhY3QsIDAsIFsxLCAyLCAzLCA0XSkgLy8gPT4gKCgoKDAgLSAxKSAtIDIpIC0gMykgLSA0KSA9IC0xMFxuICogICAgICAgICAgICAgICAgLSAgICAgICAgICAgICAgIC0xMFxuICogICAgICAgICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgICAgICAgLSAgIDQgICAgICAgICAgIC02ICAgNFxuICogICAgICAgICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAgICAgICAtICAgMyAgID09PiAgICAgLTMgICAzXG4gKiAgICAgICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAgICAgLSAgIDIgICAgICAgICAgIC0xICAgMlxuICogICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgMCAgIDEgICAgICAgICAgICAwICAgMVxuICpcbiAqIEBzeW1iIFIucmVkdWNlKGYsIGEsIFtiLCBjLCBkXSkgPSBmKGYoZihhLCBiKSwgYyksIGQpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhfcmVkdWNlKTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNTdHJpbmcnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBvciBzdHJpbmcgd2l0aCB0aGUgZWxlbWVudHMgb3IgY2hhcmFjdGVycyBpbiByZXZlcnNlXG4gKiBvcmRlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV1cbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGxpc3RcbiAqIEByZXR1cm4ge0FycmF5fFN0cmluZ31cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJldmVyc2UoWzEsIDIsIDNdKTsgIC8vPT4gWzMsIDIsIDFdXG4gKiAgICAgIFIucmV2ZXJzZShbMSwgMl0pOyAgICAgLy89PiBbMiwgMV1cbiAqICAgICAgUi5yZXZlcnNlKFsxXSk7ICAgICAgICAvLz0+IFsxXVxuICogICAgICBSLnJldmVyc2UoW10pOyAgICAgICAgIC8vPT4gW11cbiAqXG4gKiAgICAgIFIucmV2ZXJzZSgnYWJjJyk7ICAgICAgLy89PiAnY2JhJ1xuICogICAgICBSLnJldmVyc2UoJ2FiJyk7ICAgICAgIC8vPT4gJ2JhJ1xuICogICAgICBSLnJldmVyc2UoJ2EnKTsgICAgICAgIC8vPT4gJ2EnXG4gKiAgICAgIFIucmV2ZXJzZSgnJyk7ICAgICAgICAgLy89PiAnJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gcmV2ZXJzZShsaXN0KSB7XG4gIHJldHVybiBfaXNTdHJpbmcobGlzdCkgPyBsaXN0LnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCkucmV2ZXJzZSgpO1xufSk7XG4iLCJ2YXIgX2NoZWNrRm9yTWV0aG9kID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QnKTtcbnZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdCB3aXRoIGEgYHNsaWNlYFxuICogbWV0aG9kKSBmcm9tIGBmcm9tSW5kZXhgIChpbmNsdXNpdmUpIHRvIGB0b0luZGV4YCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgc2xpY2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4IFRoZSBzdGFydCBpbmRleCAoaW5jbHVzaXZlKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4IFRoZSBlbmQgaW5kZXggKGV4Y2x1c2l2ZSkuXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zbGljZSgxLCAzLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgxLCBJbmZpbml0eSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAvLz0+IFsnYicsICdjJywgJ2QnXVxuICogICAgICBSLnNsaWNlKDAsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgIC8vPT4gWydhJywgJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoLTMsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgLy89PiBbJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoMCwgMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgICAgICAgLy89PiAncmFtJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoX2NoZWNrRm9yTWV0aG9kKCdzbGljZScsIGZ1bmN0aW9uIHNsaWNlKGZyb21JbmRleCwgdG9JbmRleCwgbGlzdCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgZnJvbUluZGV4LCB0b0luZGV4KTtcbn0pKTtcbiIsInZhciBfY2hlY2tGb3JNZXRob2QgPSByZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xudmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBzbGljZSA9IHJlcXVpcmUoJy4vc2xpY2UnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYWxsIGJ1dCB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdFxuICogd2l0aCBhIGB0YWlsYCBtZXRob2QpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzbGljZWAgbWV0aG9kIG9mIHRoZSBmaXJzdCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV1cbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLmhlYWQsIFIuaW5pdCwgUi5sYXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50YWlsKFsxLCAyLCAzXSk7ICAvLz0+IFsyLCAzXVxuICogICAgICBSLnRhaWwoWzEsIDJdKTsgICAgIC8vPT4gWzJdXG4gKiAgICAgIFIudGFpbChbMV0pOyAgICAgICAgLy89PiBbXVxuICogICAgICBSLnRhaWwoW10pOyAgICAgICAgIC8vPT4gW11cbiAqXG4gKiAgICAgIFIudGFpbCgnYWJjJyk7ICAvLz0+ICdiYydcbiAqICAgICAgUi50YWlsKCdhYicpOyAgIC8vPT4gJ2InXG4gKiAgICAgIFIudGFpbCgnYScpOyAgICAvLz0+ICcnXG4gKiAgICAgIFIudGFpbCgnJyk7ICAgICAvLz0+ICcnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShfY2hlY2tGb3JNZXRob2QoJ3RhaWwnLCBzbGljZSgxLCBJbmZpbml0eSkpKTtcbiIsInZhciBjdXJyeU4gPSByZXF1aXJlKCdyYW1kYS9zcmMvY3VycnlOJyk7XG52YXIgY29tcG9zZSA9IHJlcXVpcmUoJ3JhbWRhL3NyYy9jb21wb3NlJyk7XG52YXIgaXNTdHJpbmcgPSBmdW5jdGlvbihzKSB7IHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZyc7IH07XG52YXIgaXNOdW1iZXIgPSBmdW5jdGlvbihuKSB7IHJldHVybiB0eXBlb2YgbiA9PT0gJ251bWJlcic7IH07XG52YXIgaXNCb29sZWFuID0gZnVuY3Rpb24oYikgeyByZXR1cm4gdHlwZW9mIGIgPT09ICdib29sZWFuJzsgfTtcbnZhciBpc09iamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufTtcbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24oZikgeyByZXR1cm4gdHlwZW9mIGYgPT09ICdmdW5jdGlvbic7IH07XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYSkgeyByZXR1cm4gJ2xlbmd0aCcgaW4gYTsgfTtcblxudmFyIG1hcENvbnN0clRvRm4gPSBmdW5jdGlvbihncm91cCwgY29uc3RyKSB7XG4gIHJldHVybiBjb25zdHIgPT09IFN0cmluZyAgICA/IGlzU3RyaW5nXG4gICAgICAgOiBjb25zdHIgPT09IE51bWJlciAgICA/IGlzTnVtYmVyXG4gICAgICAgOiBjb25zdHIgPT09IEJvb2xlYW4gICA/IGlzQm9vbGVhblxuICAgICAgIDogY29uc3RyID09PSBPYmplY3QgICAgPyBpc09iamVjdFxuICAgICAgIDogY29uc3RyID09PSBBcnJheSAgICAgPyBpc0FycmF5XG4gICAgICAgOiBjb25zdHIgPT09IEZ1bmN0aW9uICA/IGlzRnVuY3Rpb25cbiAgICAgICA6IGNvbnN0ciA9PT0gdW5kZWZpbmVkID8gZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY29uc3RyO1xufTtcblxudmFyIG51bVRvU3RyID0gWydmaXJzdCcsICdzZWNvbmQnLCAndGhpcmQnLCAnZm91cnRoJywgJ2ZpZnRoJywgJ3NpeHRoJywgJ3NldmVudGgnLCAnZWlnaHRoJywgJ25pbnRoJywgJ3RlbnRoJ107XG5cbnZhciB2YWxpZGF0ZSA9IGZ1bmN0aW9uKGdyb3VwLCB2YWxpZGF0b3JzLCBuYW1lLCBhcmdzKSB7XG4gIHZhciB2YWxpZGF0b3IsIHYsIGk7XG4gIGlmIChhcmdzLmxlbmd0aCA+IHZhbGlkYXRvcnMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndG9vIG1hbnkgYXJndW1lbnRzIHN1cHBsaWVkIHRvIGNvbnN0cnVjdG9yICcgKyBuYW1lXG4gICAgICArICcgKGV4cGVjdGVkICcgKyB2YWxpZGF0b3JzLmxlbmd0aCArICcgYnV0IGdvdCAnICsgYXJncy5sZW5ndGggKyAnKScpO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgdiA9IGFyZ3NbaV07XG4gICAgdmFsaWRhdG9yID0gbWFwQ29uc3RyVG9Gbihncm91cCwgdmFsaWRhdG9yc1tpXSk7XG4gICAgaWYgKFR5cGUuY2hlY2sgPT09IHRydWUgJiZcbiAgICAgICAgKHZhbGlkYXRvci5wcm90b3R5cGUgPT09IHVuZGVmaW5lZCB8fCAhdmFsaWRhdG9yLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHYpKSAmJlxuICAgICAgICAodHlwZW9mIHZhbGlkYXRvciAhPT0gJ2Z1bmN0aW9uJyB8fCAhdmFsaWRhdG9yKHYpKSkge1xuICAgICAgdmFyIHN0clZhbCA9IHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IFwiJ1wiICsgdiArIFwiJ1wiIDogdjsgLy8gcHV0IHRoZSB2YWx1ZSBpbiBxdW90ZXMgaWYgaXQncyBhIHN0cmluZ1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignd3JvbmcgdmFsdWUgJyArIHN0clZhbCArICcgcGFzc2VkIGFzICcgKyBudW1Ub1N0cltpXSArICcgYXJndW1lbnQgdG8gY29uc3RydWN0b3IgJyArIG5hbWUpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gdmFsdWVUb0FycmF5KHZhbHVlKSB7XG4gIHZhciBpLCBhcnIgPSBbXTtcbiAgZm9yIChpID0gMDsgaSA8IHZhbHVlLl9rZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgYXJyLnB1c2godmFsdWVbdmFsdWUuX2tleXNbaV1dKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0VmFsdWVzKGtleXMsIG9iaikge1xuICB2YXIgYXJyID0gW10sIGk7XG4gIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSBhcnJbaV0gPSBvYmpba2V5c1tpXV07XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdG9yKGdyb3VwLCBuYW1lLCBmaWVsZHMpIHtcbiAgdmFyIHZhbGlkYXRvcnMsIGtleXMgPSBPYmplY3Qua2V5cyhmaWVsZHMpLCBpO1xuICBpZiAoaXNBcnJheShmaWVsZHMpKSB7XG4gICAgdmFsaWRhdG9ycyA9IGZpZWxkcztcbiAgfSBlbHNlIHtcbiAgICB2YWxpZGF0b3JzID0gZXh0cmFjdFZhbHVlcyhrZXlzLCBmaWVsZHMpO1xuICB9XG4gIGZ1bmN0aW9uIGNvbnN0cnVjdCgpIHtcbiAgICB2YXIgdmFsID0gT2JqZWN0LmNyZWF0ZShncm91cC5wcm90b3R5cGUpLCBpO1xuICAgIHZhbC5fa2V5cyA9IGtleXM7XG4gICAgdmFsLl9uYW1lID0gbmFtZTtcbiAgICBpZiAoVHlwZS5jaGVjayA9PT0gdHJ1ZSkge1xuICAgICAgdmFsaWRhdGUoZ3JvdXAsIHZhbGlkYXRvcnMsIG5hbWUsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhbFtrZXlzW2ldXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuICBncm91cFtuYW1lXSA9IGtleXMubGVuZ3RoID09PSAwID8gY29uc3RydWN0KCkgOiBjdXJyeU4oa2V5cy5sZW5ndGgsIGNvbnN0cnVjdCk7XG4gIGlmIChrZXlzICE9PSB1bmRlZmluZWQpIHtcbiAgICBncm91cFtuYW1lKydPZiddID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gY29uc3RydWN0LmFwcGx5KHVuZGVmaW5lZCwgZXh0cmFjdFZhbHVlcyhrZXlzLCBvYmopKTtcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJhd0Nhc2UodHlwZSwgY2FzZXMsIHZhbHVlLCBhcmcpIHtcbiAgdmFyIHdpbGRjYXJkID0gZmFsc2U7XG4gIHZhciBoYW5kbGVyID0gY2FzZXNbdmFsdWUuX25hbWVdO1xuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlciA9IGNhc2VzWydfJ107XG4gICAgd2lsZGNhcmQgPSB0cnVlO1xuICB9XG4gIGlmIChUeXBlLmNoZWNrID09PSB0cnVlKSB7XG4gICAgaWYgKCF0eXBlLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignd3JvbmcgdHlwZSBwYXNzZWQgdG8gY2FzZScpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vbi1leGhhdXN0aXZlIHBhdHRlcm5zIGluIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gIH1cbiAgaWYgKGhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBhcmdzID0gd2lsZGNhcmQgPT09IHRydWUgPyBbYXJnXVxuICAgICAgICAgICAgIDogYXJnICE9PSB1bmRlZmluZWQgPyB2YWx1ZVRvQXJyYXkodmFsdWUpLmNvbmNhdChbYXJnXSlcbiAgICAgICAgICAgICA6IHZhbHVlVG9BcnJheSh2YWx1ZSk7XG4gICAgcmV0dXJuIGhhbmRsZXIuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgfVxufVxuXG52YXIgdHlwZUNhc2UgPSBjdXJyeU4oMywgcmF3Q2FzZSk7XG52YXIgY2FzZU9uID0gY3VycnlOKDQsIHJhd0Nhc2UpO1xuXG5mdW5jdGlvbiBjcmVhdGVJdGVyYXRvcigpIHtcbiAgcmV0dXJuIHtcbiAgICBpZHg6IDAsXG4gICAgdmFsOiB0aGlzLFxuICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSB0aGlzLnZhbC5fa2V5cztcbiAgICAgIHJldHVybiB0aGlzLmlkeCA9PT0ga2V5cy5sZW5ndGhcbiAgICAgICAgPyB7ZG9uZTogdHJ1ZX1cbiAgICAgICAgOiB7dmFsdWU6IHRoaXMudmFsW2tleXNbdGhpcy5pZHgrK11dfTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIFR5cGUoZGVzYykge1xuICB2YXIga2V5LCByZXMsIG9iaiA9IHt9O1xuICBvYmouY2FzZSA9IHR5cGVDYXNlKG9iaik7XG4gIG9iai5jYXNlT24gPSBjYXNlT24ob2JqKTtcblxuICBvYmoucHJvdG90eXBlID0ge307XG4gIG9iai5wcm90b3R5cGVbU3ltYm9sID8gU3ltYm9sLml0ZXJhdG9yIDogJ0BAaXRlcmF0b3InXSA9IGNyZWF0ZUl0ZXJhdG9yO1xuICBvYmoucHJvdG90eXBlLmNhc2UgPSBmdW5jdGlvbiAoY2FzZXMpIHsgcmV0dXJuIG9iai5jYXNlKGNhc2VzLCB0aGlzKTsgfTtcbiAgb2JqLnByb3RvdHlwZS5jYXNlT24gPSBmdW5jdGlvbiAoY2FzZXMpIHsgcmV0dXJuIG9iai5jYXNlT24oY2FzZXMsIHRoaXMpOyB9O1xuXG4gIGZvciAoa2V5IGluIGRlc2MpIHtcbiAgICByZXMgPSBjb25zdHJ1Y3RvcihvYmosIGtleSwgZGVzY1trZXldKTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5UeXBlLmNoZWNrID0gdHJ1ZTtcblxuVHlwZS5MaXN0T2YgPSBmdW5jdGlvbiAoVCkge1xuICB2YXIgTGlzdCA9IFR5cGUoe0xpc3Q6W0FycmF5XX0pO1xuICB2YXIgaW5uZXJUeXBlID0gVHlwZSh7VDogW1RdfSkuVDtcbiAgdmFyIHZhbGlkYXRlID0gTGlzdC5jYXNlKHtcbiAgICBMaXN0OiBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZvcih2YXIgbiA9IDA7IG4gPCBhcnJheS5sZW5ndGg7IG4rKykge1xuICAgICAgICAgIGlubmVyVHlwZShhcnJheVtuXSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignd3JvbmcgdmFsdWUgJysgYXJyYXlbbl0gKyAnIHBhc3NlZCB0byBsb2NhdGlvbiAnICsgbnVtVG9TdHJbbl0gKyAnIGluIExpc3QnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb21wb3NlKHZhbGlkYXRlLCBMaXN0Lkxpc3QpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlO1xuIiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5pbXBvcnQgVHlwZSBmcm9tICd1bmlvbi10eXBlJztcbmltcG9ydCBoIGZyb20gJ3NuYWJiZG9tL2gnO1xuXG4vLy8vLy8vLy8vLy8vLy8vXG4vLyBIZWxwZXJzXG4vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBxc0FsbCA9IFIuaW52b2tlcigxLCAncXVlcnlTZWxlY3RvckFsbCcpO1xuY29uc3QgYWRkQ2xhc3MgPSBSLmN1cnJ5KChjbHMsIGVsKSA9PiB7XG4gIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcbn0pO1xuY29uc3QgcmVtb3ZlQ2xhc3MgPSBSLmN1cnJ5KChjbHMsIGVsKSA9PiB7XG4gIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vXG4vLyBPT1AgVmVyc2lvblxuLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY2xhc3MgVGFiYmVyIHtcbiAgY29uc3RydWN0b3IgKGVsKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudGFicyA9IFtdO1xuXG4gICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLmpzLVRhYmJlci1idXR0b24nKTtcbiAgICBjb25zdCBjb250ZW50cyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLmpzLVRhYmJlci1ib2R5Jyk7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgICAgZm9yIChjb25zdCBjb250ZW50IG9mIGNvbnRlbnRzKSB7XG4gICAgICAgIGlmIChidXR0b24uZGF0YXNldC50YWJJbmRleCA9PT0gY29udGVudC5kYXRhc2V0LnRhYkluZGV4KSB7XG4gICAgICAgICAgdGhpcy50YWJzLnB1c2goe2J1dHRvbiwgY29udGVudH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB0YWIgb2YgdGhpcy50YWJzKSB7XG4gICAgICB0YWIuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRlQW5kVXBkYXRlQWxsKHRhYik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmF0ZVRhYih0YWIpIHtcbiAgICB0YWIuYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgIHRhYi5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICB9XG5cbiAgZGVhY3RpdmF0ZVRhYih0YWIpIHtcbiAgICB0YWIuYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgIHRhYi5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICB9XG5cbiAgYWN0aXZhdGVBbmRVcGRhdGVBbGwodGFiVG9BY3RpdmF0ZSkge1xuICAgIGZvciAoY29uc3QgdGFiIG9mIHRoaXMudGFicykge1xuICAgICAgaWYgKHRhYiAhPT0gdGFiVG9BY3RpdmF0ZSkge1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGVUYWIodGFiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hY3RpdmF0ZVRhYih0YWJUb0FjdGl2YXRlKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vL1xuLy8gRlAgVmVyc2lvblxuLy8vLy8vLy8vLy8vLy9cbi8vIFB1cmVcbmNvbnN0IGdldFRhYkluZGV4ID0gUi5wYXRoKFsnZGF0YXNldCcsICd0YWJJbmRleCddKTtcbmNvbnN0IHRhYkluZGV4RXEgPSBSLnVzZVdpdGgoUi5lcXVhbHMsIFtSLmlkZW50aXR5LCBnZXRUYWJJbmRleF0pO1xuXG4vLyBJbXB1cmVcbmNvbnN0IGFjdGl2YXRlRWxzV2l0aFRhYkluZGV4ID0gUi5jdXJyeSgoZWxzLCBpZHgpID0+IGVscy5maWx0ZXIodGFiSW5kZXhFcShpZHgpKS5tYXAoYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpKSk7XG5jb25zdCBkZWFjdGl2YXRlRWxzV2l0aG91dFRhYkluZGV4ID0gUi5jdXJyeSgoZWxzLCBpZHgpID0+IGVscy5maWx0ZXIoKGVsKSA9PiAhdGFiSW5kZXhFcShpZHgsIGVsKSkubWFwKHJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKSkpO1xuXG5leHBvcnQgY29uc3QgaW5pdFRhYmJlciA9IGVsID0+IHtcbiAgY29uc3QgdGFiRWxzID0gUi5tYXAoUi5jb21wb3NlKEFycmF5LmZyb20sIFIuZmxpcChxc0FsbCkoZWwpKSkoWycuanMtVGFiYmVyLWJ1dHRvbicsICcuanMtVGFiYmVyLWJvZHknXSk7XG4gIGNvbnN0IFtidXR0b25zLCBjb250ZW50c10gPSB0YWJFbHM7XG4gIGNvbnN0IHRvUnVuID0gUi5hcChbYWN0aXZhdGVFbHNXaXRoVGFiSW5kZXgsIGRlYWN0aXZhdGVFbHNXaXRob3V0VGFiSW5kZXhdLCB0YWJFbHMpO1xuICBjb25zdCBoYW5kbGVyID0gUi5jb21wb3NlKFIuanV4dCh0b1J1biksIGdldFRhYkluZGV4KTtcbiAgQXJyYXkuZnJvbShidXR0b25zKS5mb3JFYWNoKGVsID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGFuZGxlcihlbCkpKTtcbn1cblxuXG4vLy8vLy8vLy8vL1xuLy8gRWxtIGFyY2hpdGVjdHVyZVxuLy8vLy8vLy8vLy9cblxuLypcbm1vZGVsIDoge1xuICBhY3RpdmU6IE51bWJlcixcbiAgYnV0dG9uczogW3tpZDogTnVtYmVyLCBjb250ZW50OiBTdHJpbmd9XSxcbiAgYm9kaWVzOiBbe2lkOiBOdW1iZXIsIGNvbnRlbnQ6IFN0cmluZ31dLGpqXG59XG4qL1xuXG5jb25zdCBnZXRTdGF0ZUZyb21Eb20gPSAoZWwpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhY3RpdmU6IE51bWJlcihlbC5xdWVyeVNlbGVjdG9yKCcuanMtVGFiYmVyLWJ1dHRvbi5pcy1hY3RpdmUnKS5kYXRhc2V0LnRhYkluZGV4KSxcbiAgICBidXR0b25zOiBBcnJheS5mcm9tKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1UYWJiZXItYnV0dG9uJykpLm1hcChidXR0b24gPT4ge3JldHVybiB7aWQ6IE51bWJlcihidXR0b24uZGF0YXNldC50YWJJbmRleCksIGNvbnRlbnQ6IGJ1dHRvbi5pbm5lckhUTUx9fSksXG4gICAgYm9kaWVzOiBBcnJheS5mcm9tKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1UYWJiZXItYm9keScpKS5tYXAoYm9keSA9PiB7cmV0dXJuIHtpZDogTnVtYmVyKGJvZHkuZGF0YXNldC50YWJJbmRleCksIGNvbnRlbnQ6IGJvZHkuaW5uZXJIVE1MfX0pLFxuICB9XG59XG5cbmNvbnN0IEFjdGlvbiA9IFR5cGUoe1xuICBVcGRhdGU6IFtOdW1iZXJdLFxufSlcblxuY29uc3QgaW5pdCA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4gc3RhdGUgfHwge1xuICAgIGFjdGl2ZTogMCxcbiAgICBidXR0b25zOiBbe2lkOiAwLCBjb250ZW50OiAnVGFiIDEnfV0sXG4gICAgYm9kaWVzOiBbe2lkOiAwLCBjb250ZW50OiAnVGFiIENvbnRlbnQgMSd9XSxcbiAgfVxufVxuXG5jb25zdCB1cGRhdGUgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICByZXR1cm4gQWN0aW9uLmNhc2Uoe1xuICAgIFVwZGF0ZTogKGkpID0+IHtyZXR1cm4gey4uLnN0YXRlLCBhY3RpdmU6IGl9fSxcbiAgfSwgYWN0aW9uKTtcbn1cblxuY29uc3QgdmlldyA9IChzdGF0ZSwgaGFuZGxlcikgPT4ge1xuICByZXR1cm4gaCgnZGl2LlRhYnMnLCBbXG4gICAgaCgnZGl2LlRhYnMtYnV0dG9ucycsXG4gICAgICBzdGF0ZS5idXR0b25zLm1hcChidXR0b24gPT4ge1xuICAgICAgICByZXR1cm4gaCgnYnV0dG9uLlRhYnMtYnV0dG9uJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbjoge2NsaWNrOiAoKSA9PiBoYW5kbGVyKEFjdGlvbi5VcGRhdGUoYnV0dG9uLmlkKSl9LFxuICAgICAgICAgICAgY2xhc3M6IHsnaXMtYWN0aXZlJzogYnV0dG9uLmlkID09IHN0YXRlLmFjdGl2ZX1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGJ1dHRvbi5jb250ZW50KVxuICAgICAgfSlcbiAgICApLFxuICAgIGgoJ2Rpdi5UYWJzLWJvZGllcycsXG4gICAgICBzdGF0ZS5ib2RpZXMuZmlsdGVyKFIuY29tcG9zZShSLmVxdWFscyhzdGF0ZS5hY3RpdmUpLCBSLnByb3AoJ2lkJykpKS5tYXAoYm9keSA9PiBoKCdkaXYnLCB7cHJvcHM6IHtpbm5lckhUTUw6IGJvZHkuY29udGVudH19KSlcbiAgICApXG4gIF0pXG59XG5cbmV4cG9ydCBjb25zdCBlbG1UYWJiZXIgPSB7dmlldywgZ2V0U3RhdGVGcm9tRG9tLCBpbml0LCB1cGRhdGUsIEFjdGlvbn07IiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5jb25zdCBmbHlkID0gcmVxdWlyZSgnZmx5ZCcpO1xuY29uc3Qgc25hYmJkb20gPSByZXF1aXJlKCdzbmFiYmRvbScpO1xuY29uc3QgcGF0Y2ggPSBzbmFiYmRvbS5pbml0KFsgLy8gSW5pdCBwYXRjaCBmdW5jdGlvbiB3aXRoIGNob3NlbiBtb2R1bGVzXG4gIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvY2xhc3MnKS5kZWZhdWx0LCAvLyBtYWtlcyBpdCBlYXN5IHRvIHRvZ2dsZSBjbGFzc2VzXG4gIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvcHJvcHMnKS5kZWZhdWx0LCAvLyBmb3Igc2V0dGluZyBwcm9wZXJ0aWVzIG9uIERPTSBlbGVtZW50c1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL3N0eWxlJykuZGVmYXVsdCwgLy8gaGFuZGxlcyBzdHlsaW5nIG9uIGVsZW1lbnRzIHdpdGggc3VwcG9ydCBmb3IgYW5pbWF0aW9uc1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMnKS5kZWZhdWx0LCAvLyBmb3Igc2V0dGluZyBhdHRyaWJ1dGVzIG9uIERPTSBlbGVtZW50c1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzJykuZGVmYXVsdCwgLy8gYXR0YWNoZXMgZXZlbnQgbGlzdGVuZXJzXG5dKTtcbmNvbnN0IGggPSByZXF1aXJlKCdzbmFiYmRvbS9oJykuZGVmYXVsdDsgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBjcmVhdGluZyB2bm9kZXNcbmNvbnN0IHRvVk5vZGUgPSByZXF1aXJlKCdzbmFiYmRvbS90b3Zub2RlJykuZGVmYXVsdDtcblxuY29uc3QgcXMgPSBSLmludm9rZXIoMSwgJ3F1ZXJ5U2VsZWN0b3InKTtcbmNvbnN0IHFzQWxsID0gUi5pbnZva2VyKDEsICdxdWVyeVNlbGVjdG9yQWxsJyk7XG5cbmNvbnN0IGwgPSBSLmN1cnJ5KCh0YWcsIHgpID0+IHtjb25zb2xlLmxvZyh0YWcsIHgpOyByZXR1cm4geH0pXG5cbmNvbnN0IG9uUmVhZHkgPSAoY2IpID0+IHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIlxuICAgICAgIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGVkXCJcbiAgICAgICB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICBjYi5iaW5kKHRoaXMpKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiLmJpbmQodGhpcykpO1xuICB9XG59XG5cbmNvbnN0IG1vdW50ZXJGb3IgPSAoQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IHt2aWV3LCB1cGRhdGV9ID0gQ29tcG9uZW50O1xuICByZXR1cm4gKGluaXRpYWxTdGF0ZSwgY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgYWN0aW9uJCA9IGZseWQuc3RyZWFtKCk7XG4gICAgY29uc3QgbW9kZWwkID0gZmx5ZC5zY2FuKFIuZmxpcCh1cGRhdGUpLCBpbml0aWFsU3RhdGUsIGFjdGlvbiQpO1xuICAgIGNvbnN0IHZub2RlJCA9IGZseWQubWFwKHZpZXcoYWN0aW9uJCksIG1vZGVsJCk7XG4gICAgZmx5ZC5zY2FuKHBhdGNoLCBjb250YWluZXIsIHZub2RlJCk7XG4gIH1cbn1cblxuY29uc3Qgbm9GUlBNb3VudGVyRm9yID0gKENvbXBvbmVudCkgPT4ge1xuICBjb25zdCB7dmlldywgdXBkYXRlfSA9IENvbXBvbmVudDtcbiAgcmV0dXJuIChvbGRTdGF0ZSwgb2xkVm5vZGUpID0+IHtcbiAgICBjb25zdCBuZXdWbm9kZSA9IHZpZXcoKGFjdGlvbikgPT4ge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB1cGRhdGUob2xkU3RhdGUsIGFjdGlvbik7XG4gICAgICBydW4obmV3U3RhdGUsIG5ld1Zub2RlKTtcbiAgICB9LCBvbGRTdGF0ZSk7XG4gICAgcGF0Y2gob2xkVm5vZGUsIG5ld1Zub2RlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBwYXRjaCwgb25SZWFkeSwgbW91bnRlckZvciwgdG9WTm9kZSwgaCwgbCwgcXN9O1xuZXhwb3J0IHtcbiAgcXMsXG4gIHFzQWxsLFxuICBvblJlYWR5LFxuICBtb3VudGVyRm9yLFxuICB0b1ZOb2RlLFxuICBwYXRjaCxcbiAgaCxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4uLy4uL2Z1bmN0aW9uYWwuaHRtbCc7XG5pbXBvcnQgJy4uLy4uL2Z1bmN0aW9uYWwuY3NzJztcbmltcG9ydCAnLi4vLi4vVGFicy5jc3MnO1xuXG5pbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IG9uUmVhZHksIHBhdGNoIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgeyBUYWJiZXIsIGluaXRUYWJiZXIsIGVsbVRhYmJlciB9IGZyb20gJy4uL3RhYmJlcic7XG5cbmNvbnN0IHFzID0gUi5pbnZva2VyKDEsICdxdWVyeVNlbGVjdG9yJyk7XG5cbmNvbnN0IG1haW4gPSAoaW5pdFN0YXRlLCBlbGVtZW50LCB7dmlldywgdXBkYXRlfSkgPT4ge1xuICBjb25zdCBuZXdWbm9kZSA9IHZpZXcoaW5pdFN0YXRlLCBldmVudCA9PiB7XG4gICAgY29uc3QgbmV3U3RhdGUgPSB1cGRhdGUoaW5pdFN0YXRlLCBldmVudCk7XG4gICAgbWFpbihuZXdTdGF0ZSwgbmV3Vm5vZGUsIHt2aWV3LCB1cGRhdGV9KTtcbiAgfSk7XG4gIHBhdGNoKGVsZW1lbnQsIG5ld1Zub2RlKTtcbn1cblxub25SZWFkeSgoKSA9PiB7XG4gIC8vIEluaXQgT09QIFRhYmJlclxuICBuZXcgVGFiYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1vb3AtdGFiYmVyJykpO1xuXG4gIC8vIEluaXQgRlAgVGFiYmVyXG4gIGluaXRUYWJiZXIocXMoJy5qcy1mcC10YWJiZXInKShkb2N1bWVudCkpO1xuXG4gIC8vIEluaXQgZWxtIHRhYmJlclxuICBjb25zdCBpbml0aWFsU3RhdGUgPSBlbG1UYWJiZXIuZ2V0U3RhdGVGcm9tRG9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1lbG0tdGFiYmVyJykpXG4gIG1haW4oZWxtVGFiYmVyLmluaXQoaW5pdGlhbFN0YXRlKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWVsbS10YWJiZXInKSwgZWxtVGFiYmVyKVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==