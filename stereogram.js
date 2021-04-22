/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/stereogram.html":
/*!*****************************!*\
  !*** ./src/stereogram.html ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "stereogram.html";

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

/***/ "./src/js/autostereogram.js":
/*!**********************************!*\
  !*** ./src/js/autostereogram.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DrawAutoStereogram": () => (/* binding */ DrawAutoStereogram)
/* harmony export */ });

const DPI = 72;
const E = Math.round(2.5 * DPI);
const mu = 1/3;
const separation = (Z) => Math.round(((1-mu*Z)*E)/(2-mu*Z));

const maxX = 500;
const maxY = 500;

const random = () => Math.floor(Math.random() * 2);

const DrawAutoStereogram = (Z) => {
  const output = [...Array(maxY)].map(() => [...Array(maxX)]);
  for (let y=0; y<maxY; y++) {
    let pix = Array(maxX);
    let same = Array(maxX);

    for (let x=0; x<maxX; x++) {
      same[x] = x;
    }

    for (let x=0; x<maxX; x++) {
      const s = separation(Z[y][x]);
      let left = x - Math.floor(s/2);
      let right = left + s;
      if (0 <= left && right < maxX) {
        let visible = null;
        let t = 1;
        let zt = null;

        do {
          zt = Z[y][x] + 2*(2 - mu * Z[y][x]) * t/(mu*E);
          visible = Z[y][x-t] < zt && Z[y][x+t]<zt;
          t++
        }
        while (visible && zt < 1);
        if (visible) {
          let l = same[left];
          while (l != left && l != right) {
            if (l < right) {
              left = l;
              l = same[left];
            } else {
              same[left] = right;
              left = right;
              l = same[left];
              right = l;
            }
          }
          same[left] = right;
        }
      }
      for (let x = maxX-1 ; x >= 0; x--) {
        if (same[x] == x) {
          pix[x] = random();
        } else {
          pix[x] = pix[same[x]];
        }
        output[y][x] = pix[x];
      }
    }
  }

  return output;
}



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
/******/ 			// no module.id needed
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
  !*** ./src/js/pages/stereogram.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereogram_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stereogram.html */ "./src/stereogram.html");
/* harmony import */ var _stereogram_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stereogram_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _autostereogram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../autostereogram */ "./src/js/autostereogram.js");





const randomRGB = () => Math.floor(Math.random() * 256);

const chunkArray = (arr, size) => {
  const results = [];
  let start = 0;

  while (start < arr.length) {
      results.push(arr.slice(start, start+size));
      start += size;
  }

  return results;
}

;(0,_util__WEBPACK_IMPORTED_MODULE_1__.onReady)(() => {
  const canvas = document.querySelector('canvas.in');
  const outCanvas = document.querySelector('canvas.out');
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');
  const ctxOut = outCanvas.getContext('2d');
  ctx.lineWidth = 30;
  let drawing = false;

  window.ca = canvas;
  window.ct = ctx;

  canvas.addEventListener('mousedown', () => {
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.moveTo(x, y);
    ctx.beginPath();
    drawing = true;
  });

  canvas.addEventListener('mousemove', () => {
    if (drawing) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });

  canvas.addEventListener('mouseup', () => {
    ctx.stroke();
    drawing = false;
  });

  const button = document.querySelector('button');
  button.addEventListener('click', async () => {
    const imageData = await ctx.getImageData(0,0,500,500);
    const source = chunkArray(chunkArray(imageData.data, 4).map(pixel => pixel[3]).map(p => p==255 ? 1 : 0), 500);
    const stereo = (0,_autostereogram__WEBPACK_IMPORTED_MODULE_2__.DrawAutoStereogram)(source);
    const s = stereo.flat();
    const two55 = s.map(x => x == 1 ? 255 : 0);
    const pix255 = two55.map(x => [0, 0, 0, x]).flat();
    const d = Uint8ClampedArray.from(pix255);
    ctxOut.putImageData(new ImageData(d, 500, 500), 0, 0);
  });
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL3N0ZXJlb2dyYW0uaHRtbCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbGliL2luZGV4LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2N1cnJ5Ti5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fYXJpdHkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5MS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL2ZseWQvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnkyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvZmx5ZC9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9mbHlkL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9iaW5kLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvY3VycnkuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9lcXVhbHMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9mbGlwLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2FyaXR5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2FycmF5RnJvbUl0ZXJhdG9yLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2NvbXBsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fY3VycnkxLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2N1cnJ5Mi5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19jdXJyeU4uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2VxdWFscy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fZnVuY3Rpb25OYW1lLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2hhcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pbmNsdWRlc1dpdGguanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faW5kZXhPZi5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc0FycmF5LmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzQXJyYXlMaWtlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX2lzRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9faXNQbGFjZWhvbGRlci5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc1N0cmluZy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19pc1RyYW5zZm9ybWVyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX21hcC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19vYmplY3RJcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19xdW90ZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL2ludGVybmFsL19yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9JU09TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9fdG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feGZCYXNlLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvaW50ZXJuYWwvX3hmaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnRlcm5hbC9feHdyYXAuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9yYW1kYS9lcy9pbnZva2VyLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMva2V5cy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3JlamVjdC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3JhbWRhL2VzL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvcmFtZGEvZXMvdHlwZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2guanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9odG1sZG9tYXBpLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaXMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9zbmFiYmRvbS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3RodW5rLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvdm5vZGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9oLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vaHRtbGRvbWFwaS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2lzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL3Byb3BzLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9zdHlsZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL3Rvdm5vZGUuanMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS92bm9kZS5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL2pzL2F1dG9zdGVyZW9ncmFtLmpzIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vLi9zcmMvanMvdXRpbC5qcyIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JoYWluZXN2YS5naXRodWIuaW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmhhaW5lc3ZhLmdpdGh1Yi5pby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iaGFpbmVzdmEuZ2l0aHViLmlvLy4vc3JjL2pzL3BhZ2VzL3N0ZXJlb2dyYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsaUJBQWlCLHFCQUF1QixxQjs7Ozs7Ozs7Ozs7QUNBM0I7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLDhFQUFrQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsYUFBYTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLGNBQWM7QUFDekIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQ0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtRUFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDIiwiZmlsZSI6InN0ZXJlb2dyYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzdGVyZW9ncmFtLmh0bWxcIjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjdXJyeU4gPSByZXF1aXJlKCdyYW1kYS9zcmMvY3VycnlOJyk7XG5cbi8vIFV0aWxpdHlcbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiAhIShvYmogJiYgb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jYWxsICYmIG9iai5hcHBseSk7XG59XG5mdW5jdGlvbiB0cnVlRm4oKSB7IHJldHVybiB0cnVlOyB9XG5cbi8vIEdsb2JhbHNcbnZhciB0b1VwZGF0ZSA9IFtdO1xudmFyIGluU3RyZWFtO1xudmFyIG9yZGVyID0gW107XG52YXIgb3JkZXJOZXh0SWR4ID0gLTE7XG52YXIgZmx1c2hpbmdVcGRhdGVRdWV1ZSA9IGZhbHNlO1xudmFyIGZsdXNoaW5nU3RyZWFtVmFsdWUgPSBmYWxzZTtcblxuZnVuY3Rpb24gZmx1c2hpbmcoKSB7XG4gIHJldHVybiBmbHVzaGluZ1VwZGF0ZVF1ZXVlIHx8IGZsdXNoaW5nU3RyZWFtVmFsdWU7XG59XG5cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBmbHlkID0ge31cblxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFQSSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbVxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuc3RyZWFtXG4gKiBAcGFyYW0geyp9IGluaXRpYWxWYWx1ZSAtIChPcHRpb25hbCkgdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHN0cmVhbVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuID0gZmx5ZC5zdHJlYW0oMSk7IC8vIFN0cmVhbSB3aXRoIGluaXRpYWwgdmFsdWUgYDFgXG4gKiB2YXIgcyA9IGZseWQuc3RyZWFtKCk7IC8vIFN0cmVhbSB3aXRoIG5vIGluaXRpYWwgdmFsdWVcbiAqL1xuZmx5ZC5zdHJlYW0gPSBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgdmFyIGVuZFN0cmVhbSA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShbXSwgdHJ1ZUZuKTtcbiAgdmFyIHMgPSBjcmVhdGVTdHJlYW0oKTtcbiAgcy5lbmQgPSBlbmRTdHJlYW07XG4gIHMuZm5BcmdzID0gW107XG4gIGVuZFN0cmVhbS5saXN0ZW5lcnMucHVzaChzKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSBzKGluaXRpYWxWYWx1ZSk7XG4gIHJldHVybiBzO1xufVxuLy8gZmFudGFzeS1sYW5kIEFwcGxpY2F0aXZlXG5mbHlkLnN0cmVhbVsnZmFudGFzeS1sYW5kL29mJ10gPSBmbHlkLnN0cmVhbS5vZiA9IGZseWQuc3RyZWFtO1xuXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGRlcGVuZGVudCBzdHJlYW1cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKC4uLlN0cmVhbSAqIC0+IFN0cmVhbSBiIC0+IGIpIC0+IFtTdHJlYW0gKl0gLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5jb21iaW5lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbWJpbmUgdGhlIHN0cmVhbXNcbiAqIEBwYXJhbSB7QXJyYXk8c3RyZWFtPn0gZGVwZW5kZW5jaWVzIC0gdGhlIHN0cmVhbXMgdGhhdCB0aGlzIG9uZSBkZXBlbmRzIG9uXG4gKiBAcmV0dXJuIHtzdHJlYW19IHRoZSBkZXBlbmRlbnQgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuMSA9IGZseWQuc3RyZWFtKDApO1xuICogdmFyIG4yID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgbWF4ID0gZmx5ZC5jb21iaW5lKGZ1bmN0aW9uKG4xLCBuMiwgc2VsZiwgY2hhbmdlZCkge1xuICogICByZXR1cm4gbjEoKSA+IG4yKCkgPyBuMSgpIDogbjIoKTtcbiAqIH0sIFtuMSwgbjJdKTtcbiAqL1xuZmx5ZC5jb21iaW5lID0gY3VycnlOKDIsIGNvbWJpbmUpO1xuZnVuY3Rpb24gY29tYmluZShmbiwgc3RyZWFtcykge1xuICB2YXIgaSwgcywgZGVwcywgZGVwRW5kU3RyZWFtcztcbiAgdmFyIGVuZFN0cmVhbSA9IGNyZWF0ZURlcGVuZGVudFN0cmVhbShbXSwgdHJ1ZUZuKTtcbiAgZGVwcyA9IFtdOyBkZXBFbmRTdHJlYW1zID0gW107XG4gIGZvciAoaSA9IDA7IGkgPCBzdHJlYW1zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHN0cmVhbXNbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVwcy5wdXNoKHN0cmVhbXNbaV0pO1xuICAgICAgaWYgKHN0cmVhbXNbaV0uZW5kICE9PSB1bmRlZmluZWQpIGRlcEVuZFN0cmVhbXMucHVzaChzdHJlYW1zW2ldLmVuZCk7XG4gICAgfVxuICB9XG4gIHMgPSBjcmVhdGVEZXBlbmRlbnRTdHJlYW0oZGVwcywgZm4pO1xuICBzLmRlcHNDaGFuZ2VkID0gW107XG4gIHMuZm5BcmdzID0gcy5kZXBzLmNvbmNhdChbcywgcy5kZXBzQ2hhbmdlZF0pO1xuICBzLmVuZCA9IGVuZFN0cmVhbTtcbiAgZW5kU3RyZWFtLmxpc3RlbmVycy5wdXNoKHMpO1xuICBhZGRMaXN0ZW5lcnMoZGVwRW5kU3RyZWFtcywgZW5kU3RyZWFtKTtcbiAgZW5kU3RyZWFtLmRlcHMgPSBkZXBFbmRTdHJlYW1zO1xuICB1cGRhdGVTdHJlYW0ocyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzdXBwbGllZCBhcmd1bWVudCBpcyBhIEZseWQgc3RyZWFtIGFuZCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKiAtPiBCb29sZWFuYFxuICpcbiAqIEBuYW1lIGZseWQuaXNTdHJlYW1cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGlzIGEgRmx5ZCBzdHJlYW1uLCBgZmFsc2VgIG90aGVyd2lzZVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcyA9IGZseWQuc3RyZWFtKDEpO1xuICogdmFyIG4gPSAxO1xuICogZmx5ZC5pc1N0cmVhbShzKTsgLy89PiB0cnVlXG4gKiBmbHlkLmlzU3RyZWFtKG4pOyAvLz0+IGZhbHNlXG4gKi9cbmZseWQuaXNTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgcmV0dXJuIGlzRnVuY3Rpb24oc3RyZWFtKSAmJiAnaGFzVmFsJyBpbiBzdHJlYW07XG59XG5cbi8qKlxuICogSW52b2tlcyB0aGUgYm9keSAodGhlIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgdmFsdWUpIG9mIGEgZGVwZW5kZW50IHN0cmVhbVxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgYSBkZXBlbmRlbnQgc3RyZWFtIGlzIG9ubHkgY2FsbGVkIHdoZW4gYWxsIHRoZSBzdHJlYW1zXG4gKiB1cG9uIHdoaWNoIGl0IGRlcGVuZHMgaGFzIGEgdmFsdWUuIGBpbW1lZGlhdGVgIGNhbiBjaXJjdW12ZW50IHRoaXMgYmVoYXZpb3VyLlxuICogSXQgaW1tZWRpYXRlbHkgaW52b2tlcyB0aGUgYm9keSBvZiBhIGRlcGVuZGVudCBzdHJlYW0uXG4gKlxuICogX19TaWduYXR1cmVfXzogYFN0cmVhbSBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuaW1tZWRpYXRlXG4gKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIC0gdGhlIGRlcGVuZGVudCBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIHNhbWUgc3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIHZhciBoYXNJdGVtcyA9IGZseWQuaW1tZWRpYXRlKGZseWQuY29tYmluZShmdW5jdGlvbihzKSB7XG4gKiAgIHJldHVybiBzKCkgIT09IHVuZGVmaW5lZCAmJiBzKCkubGVuZ3RoID4gMDtcbiAqIH0sIFtzXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgZmFsc2VgLiBIYWQgYGltbWVkaWF0ZWAgbm90IGJlZW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2VkIGBoYXNJdGVtcygpYCB3b3VsZCd2ZSByZXR1cm5lZCBgdW5kZWZpbmVkYFxuICogcyhbMV0pO1xuICogY29uc29sZS5sb2coaGFzSXRlbXMoKSk7IC8vIGxvZ3MgYHRydWVgLlxuICogcyhbXSk7XG4gKiBjb25zb2xlLmxvZyhoYXNJdGVtcygpKTsgLy8gbG9ncyBgZmFsc2VgLlxuICovXG5mbHlkLmltbWVkaWF0ZSA9IGZ1bmN0aW9uKHMpIHtcbiAgaWYgKHMuZGVwc01ldCA9PT0gZmFsc2UpIHtcbiAgICBzLmRlcHNNZXQgPSB0cnVlO1xuICAgIHVwZGF0ZVN0cmVhbShzKTtcbiAgfVxuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIHdoaWNoIGBlbmRzU3RyZWFtYCBzaG91bGQgdHJpZ2dlciB0aGUgZW5kaW5nIG9mIGBzYC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgU3RyZWFtIGEgLT4gU3RyZWFtIGIgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5lbmRzT25cbiAqIEBwYXJhbSB7c3RyZWFtfSBlbmRTdHJlYW0gLSB0aGUgc3RyZWFtIHRvIHRyaWdnZXIgdGhlIGVuZGluZ1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gYmUgZW5kZWQgYnkgdGhlIGVuZFN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHRoZSBzdHJlYW0gbW9kaWZpZWQgdG8gYmUgZW5kZWQgYnkgZW5kU3RyZWFtXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuID0gZmx5ZC5zdHJlYW0oMSk7XG4gKiB2YXIga2lsbGVyID0gZmx5ZC5zdHJlYW0oKTtcbiAqIC8vIGBkb3VibGVgIGVuZHMgd2hlbiBgbmAgZW5kcyBvciB3aGVuIGBraWxsZXJgIGVtaXRzIGFueSB2YWx1ZVxuICogdmFyIGRvdWJsZSA9IGZseWQuZW5kc09uKGZseWQubWVyZ2Uobi5lbmQsIGtpbGxlciksIGZseWQuY29tYmluZShmdW5jdGlvbihuKSB7XG4gKiAgIHJldHVybiAyICogbigpO1xuICogfSwgW25dKTtcbiovXG5mbHlkLmVuZHNPbiA9IGZ1bmN0aW9uKGVuZFMsIHMpIHtcbiAgZGV0YWNoRGVwcyhzLmVuZCk7XG4gIGVuZFMubGlzdGVuZXJzLnB1c2gocy5lbmQpO1xuICBzLmVuZC5kZXBzLnB1c2goZW5kUyk7XG4gIHJldHVybiBzO1xufVxuXG4vKipcbiAqIE1hcCBhIHN0cmVhbVxuICpcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIGNvbnNpc3Rpbmcgb2YgZXZlcnkgdmFsdWUgZnJvbSBgc2AgcGFzc2VkIHRocm91Z2hcbiAqIGBmbmAuIEkuZS4gYG1hcGAgY3JlYXRlcyBhIG5ldyBzdHJlYW0gdGhhdCBsaXN0ZW5zIHRvIGBzYCBhbmRcbiAqIGFwcGxpZXMgYGZuYCB0byBldmVyeSBuZXcgdmFsdWUuXG4gKiBfX1NpZ25hdHVyZV9fOiBgKGEgLT4gcmVzdWx0KSAtPiBTdHJlYW0gYSAtPiBTdHJlYW0gcmVzdWx0YFxuICpcbiAqIEBuYW1lIGZseWQubWFwXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIHRoZSBlbGVtZW50cyBvZiB0aGUgbmV3IHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW0gdG8gbWFwXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBtYXBwZWQgdmFsdWVzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBudW1iZXJzID0gZmx5ZC5zdHJlYW0oMCk7XG4gKiB2YXIgc3F1YXJlZE51bWJlcnMgPSBmbHlkLm1hcChmdW5jdGlvbihuKSB7IHJldHVybiBuKm47IH0sIG51bWJlcnMpO1xuICovXG4vLyBMaWJyYXJ5IGZ1bmN0aW9ucyB1c2Ugc2VsZiBjYWxsYmFjayB0byBhY2NlcHQgKG51bGwsIHVuZGVmaW5lZCkgdXBkYXRlIHRyaWdnZXJzLlxuZnVuY3Rpb24gbWFwKGYsIHMpIHtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24ocywgc2VsZikgeyBzZWxmKGYocy52YWwpKTsgfSwgW3NdKTtcbn1cbmZseWQubWFwID0gY3VycnlOKDIsIG1hcClcblxuLyoqXG4gKiBDaGFpbiBhIHN0cmVhbVxuICpcbiAqIGFsc28ga25vd24gYXMgZmxhdE1hcFxuICpcbiAqIFdoZXJlIGBmbmAgcmV0dXJucyBhIHN0cmVhbSB0aGlzIGZ1bmN0aW9uIHdpbGwgZmxhdHRlbiB0aGUgcmVzdWx0aW5nIHN0cmVhbXMuXG4gKiBFdmVyeSB0aW1lIGBmbmAgaXMgY2FsbGVkIHRoZSBjb250ZXh0IG9mIHRoZSByZXR1cm5lZCBzdHJlYW0gd2lsbCBcInN3aXRjaFwiIHRvIHRoYXQgc3RyZWFtLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGAoYSAtPiBTdHJlYW0gYikgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5jaGFpblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyB0aGUgc3RyZWFtcyB0byBiZSBmbGF0dGVuZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIG1hcFxuICogQHJldHVybiB7c3RyZWFtfSBhIG5ldyBzdHJlYW0gd2l0aCB0aGUgbWFwcGVkIHZhbHVlc1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZmlsdGVyID0gZmx5ZC5zdHJlYW0oJ3dobycpO1xuICogdmFyIGl0ZW1zID0gZmx5ZC5jaGFpbihmdW5jdGlvbihmaWx0ZXIpe1xuICogICByZXR1cm4gZmx5ZC5zdHJlYW0oZmluZFVzZXJzKGZpbHRlcikpO1xuICogfSwgZmlsdGVyKTtcbiAqL1xuZmx5ZC5jaGFpbiA9IGN1cnJ5TigyLCBjaGFpbik7XG5cbi8qKlxuICogQXBwbHkgYSBzdHJlYW1cbiAqXG4gKiBBcHBsaWVzIHRoZSB2YWx1ZSBpbiBgczJgIHRvIHRoZSBmdW5jdGlvbiBpbiBgczFgLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBTdHJlYW0gKGEgLT4gYikgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgZmx5ZC5hcFxuICogQHBhcmFtIHtzdHJlYW19IHMxIC0gVGhlIHZhbHVlIHRvIGJlIGFwcGxpZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzMiAtIFRoZSBmdW5jdGlvbiBleHBlY3RpbmcgdGhlIHZhbHVlXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBtYXBwZWQgdmFsdWVzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBhZGQgPSBzdHJlYW0oYSA9PiBiID0+IGEgKyBiKVxuICogdmFyIG4xID0gc3RyZWFtKDEpXG4gKiB2YXIgbjIgPSBzdHJlYW0oMilcbiAqXG4gKiB2YXIgYWRkZWQgPSBmbHlkLmFwKG4yLCBmbHlkLmFwKG4xLCBhZGQpKSAvLyBzdHJlYW0oMylcbiAqIC8vIGNhbiBhbHNvIGJlIHdyaXR0ZW4gdXNpbmcgcGlwZVxuICogdmFyIGFkZGVkX3BpcGUgPSBhZGRcbiAqICAgLnBpcGUoYXAobjEpKVxuICogICAucGlwZShhcChuMikpO1xuICogYWRkZWRfcGlwZSgpIC8vIDNcbiAqL1xuZmx5ZC5hcCA9IGN1cnJ5TigyLCBhcCk7XG5cbi8qKlxuICogTGlzdGVuIHRvIHN0cmVhbSBldmVudHNcbiAqXG4gKiBTaW1pbGFyIHRvIGBtYXBgIGV4Y2VwdCB0aGF0IHRoZSByZXR1cm5lZCBzdHJlYW0gaXMgZW1wdHkuIFVzZSBgb25gIGZvciBkb2luZ1xuICogc2lkZSBlZmZlY3RzIGluIHJlYWN0aW9uIHRvIHN0cmVhbSBjaGFuZ2VzLiBVc2UgdGhlIHJldHVybmVkIHN0cmVhbSBvbmx5IGlmIHlvdVxuICogbmVlZCB0byBtYW51YWxseSBlbmQgaXQuXG4gKlxuICogX19TaWduYXR1cmVfXzogYChhIC0+IHJlc3VsdCkgLT4gU3RyZWFtIGEgLT4gU3RyZWFtIHVuZGVmaW5lZGBcbiAqXG4gKiBAbmFtZSBmbHlkLm9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIHRoZSBjYWxsYmFja1xuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSBzdHJlYW1cbiAqIEByZXR1cm4ge3N0cmVhbX0gYW4gZW1wdHkgc3RyZWFtIChjYW4gYmUgZW5kZWQpXG4gKi9cbmZseWQub24gPSBjdXJyeU4oMiwgZnVuY3Rpb24oZiwgcykge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzKSB7IGYocy52YWwpOyB9LCBbc10pO1xufSlcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbSB3aXRoIHRoZSByZXN1bHRzIG9mIGNhbGxpbmcgdGhlIGZ1bmN0aW9uIG9uIGV2ZXJ5IGluY29taW5nXG4gKiBzdHJlYW0gd2l0aCBhbmQgYWNjdW11bGF0b3IgYW5kIHRoZSBpbmNvbWluZyB2YWx1ZS5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBgKGEgLT4gYiAtPiBhKSAtPiBhIC0+IFN0cmVhbSBiIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQuc2NhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHsqfSB2YWwgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgYWNjdW11bGF0b3JcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHNvdXJjZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbnVtYmVycyA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgc3VtID0gZmx5ZC5zY2FuKGZ1bmN0aW9uKHN1bSwgbikgeyByZXR1cm4gc3VtK247IH0sIDAsIG51bWJlcnMpO1xuICogbnVtYmVycygyKSgzKSg1KTtcbiAqIHN1bSgpOyAvLyAxMFxuICovXG5mbHlkLnNjYW4gPSBjdXJyeU4oMywgZnVuY3Rpb24oZiwgYWNjLCBzKSB7XG4gIHZhciBucyA9IGNvbWJpbmUoZnVuY3Rpb24ocywgc2VsZikge1xuICAgIHNlbGYoYWNjID0gZihhY2MsIHMudmFsKSk7XG4gIH0sIFtzXSk7XG4gIGlmICghbnMuaGFzVmFsKSBucyhhY2MpO1xuICByZXR1cm4gbnM7XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHN0cmVhbSBkb3duIHdoaWNoIGFsbCB2YWx1ZXMgZnJvbSBib3RoIGBzdHJlYW0xYCBhbmQgYHN0cmVhbTJgXG4gKiB3aWxsIGJlIHNlbnQuXG4gKlxuICogX19TaWduYXR1cmVfXzogYFN0cmVhbSBhIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSBhYFxuICpcbiAqIEBuYW1lIGZseWQubWVyZ2VcbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UxIC0gb25lIHN0cmVhbSB0byBiZSBtZXJnZWRcbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UyIC0gdGhlIG90aGVyIHN0cmVhbSB0byBiZSBtZXJnZWRcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBzdHJlYW0gd2l0aCB0aGUgdmFsdWVzIGZyb20gYm90aCBzb3VyY2VzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBidG4xQ2xpY2tzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIGJ1dHRvbjFFbG0uYWRkRXZlbnRMaXN0ZW5lcihidG4xQ2xpY2tzKTtcbiAqIHZhciBidG4yQ2xpY2tzID0gZmx5ZC5zdHJlYW0oKTtcbiAqIGJ1dHRvbjJFbG0uYWRkRXZlbnRMaXN0ZW5lcihidG4yQ2xpY2tzKTtcbiAqIHZhciBhbGxDbGlja3MgPSBmbHlkLm1lcmdlKGJ0bjFDbGlja3MsIGJ0bjJDbGlja3MpO1xuICovXG5mbHlkLm1lcmdlID0gY3VycnlOKDIsIGZ1bmN0aW9uKHMxLCBzMikge1xuICB2YXIgcyA9IGZseWQuaW1tZWRpYXRlKGNvbWJpbmUoZnVuY3Rpb24oczEsIHMyLCBzZWxmLCBjaGFuZ2VkKSB7XG4gICAgaWYgKGNoYW5nZWRbMF0pIHtcbiAgICAgIHNlbGYoY2hhbmdlZFswXSgpKTtcbiAgICB9IGVsc2UgaWYgKHMxLmhhc1ZhbCkge1xuICAgICAgc2VsZihzMS52YWwpO1xuICAgIH0gZWxzZSBpZiAoczIuaGFzVmFsKSB7XG4gICAgICBzZWxmKHMyLnZhbCk7XG4gICAgfVxuICB9LCBbczEsIHMyXSkpO1xuICBmbHlkLmVuZHNPbihjb21iaW5lKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9LCBbczEuZW5kLCBzMi5lbmRdKSwgcyk7XG4gIHJldHVybiBzO1xufSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzdHJlYW0gcmVzdWx0aW5nIGZyb20gYXBwbHlpbmcgYHRyYW5zZHVjZXJgIHRvIGBzdHJlYW1gLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IGBUcmFuc2R1Y2VyIC0+IFN0cmVhbSBhIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIGZseWQudHJhbnNkdWNlXG4gKiBAcGFyYW0ge1RyYW5zZHVjZXJ9IHhmb3JtIC0gdGhlIHRyYW5zZHVjZXIgdHJhbnNmb3JtYXRpb25cbiAqIEBwYXJhbSB7c3RyZWFtfSBzb3VyY2UgLSB0aGUgc3RyZWFtIHNvdXJjZVxuICogQHJldHVybiB7c3RyZWFtfSB0aGUgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgdCA9IHJlcXVpcmUoJ3RyYW5zZHVjZXJzLmpzJyk7XG4gKlxuICogdmFyIHJlc3VsdHMgPSBbXTtcbiAqIHZhciBzMSA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgdHggPSB0LmNvbXBvc2UodC5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4geCAqIDI7IH0pLCB0LmRlZHVwZSgpKTtcbiAqIHZhciBzMiA9IGZseWQudHJhbnNkdWNlKHR4LCBzMSk7XG4gKiBmbHlkLmNvbWJpbmUoZnVuY3Rpb24oczIpIHsgcmVzdWx0cy5wdXNoKHMyKCkpOyB9LCBbczJdKTtcbiAqIHMxKDEpKDEpKDIpKDMpKDMpKDMpKDQpO1xuICogcmVzdWx0czsgLy8gPT4gWzIsIDQsIDYsIDhdXG4gKi9cbmZseWQudHJhbnNkdWNlID0gY3VycnlOKDIsIGZ1bmN0aW9uKHhmb3JtLCBzb3VyY2UpIHtcbiAgeGZvcm0gPSB4Zm9ybShuZXcgU3RyZWFtVHJhbnNmb3JtZXIoKSk7XG4gIHJldHVybiBjb21iaW5lKGZ1bmN0aW9uKHNvdXJjZSwgc2VsZikge1xuICAgIHZhciByZXMgPSB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSh1bmRlZmluZWQsIHNvdXJjZS52YWwpO1xuICAgIGlmIChyZXMgJiYgcmVzWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID09PSB0cnVlKSB7XG4gICAgICBzZWxmLmVuZCh0cnVlKTtcbiAgICAgIHJldHVybiByZXNbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfSwgW3NvdXJjZV0pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBgZm5gIGN1cnJpZWQgdG8gYG5gLiBVc2UgdGhpcyBmdW5jdGlvbiB0byBjdXJyeSBmdW5jdGlvbnMgZXhwb3NlZCBieVxuICogbW9kdWxlcyBmb3IgRmx5ZC5cbiAqXG4gKiBAbmFtZSBmbHlkLmN1cnJ5TlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGFyaXR5IC0gdGhlIGZ1bmN0aW9uIGFyaXR5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSBmdW5jdGlvbiB0byBjdXJyeVxuICogQHJldHVybiB7RnVuY3Rpb259IHRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIGFkZCh4LCB5KSB7IHJldHVybiB4ICsgeTsgfTtcbiAqIHZhciBhID0gZmx5ZC5jdXJyeU4oMiwgYWRkKTtcbiAqIGEoMikoNCkgLy8gPT4gNlxuICovXG5mbHlkLmN1cnJ5TiA9IGN1cnJ5TlxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIGlkZW50aWNhbCB0byB0aGUgb3JpZ2luYWwgZXhjZXB0IGV2ZXJ5XG4gKiB2YWx1ZSB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIGBmYC5cbiAqXG4gKiBfTm90ZTpfIFRoaXMgZnVuY3Rpb24gaXMgaW5jbHVkZWQgaW4gb3JkZXIgdG8gc3VwcG9ydCB0aGUgZmFudGFzeSBsYW5kXG4gKiBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIF9fU2lnbmF0dXJlX186IENhbGxlZCBib3VuZCB0byBgU3RyZWFtIGFgOiBgKGEgLT4gYikgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgc3RyZWFtLm1hcFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gLSB0aGUgZnVuY3Rpb24gdG8gYXBwbHlcbiAqIEByZXR1cm4ge3N0cmVhbX0gYSBuZXcgc3RyZWFtIHdpdGggdGhlIHZhbHVlcyBtYXBwZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG51bWJlcnMgPSBmbHlkLnN0cmVhbSgwKTtcbiAqIHZhciBzcXVhcmVkTnVtYmVycyA9IG51bWJlcnMubWFwKGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4qbjsgfSk7XG4gKi9cbmZ1bmN0aW9uIGJvdW5kTWFwKGYpIHsgcmV0dXJuIG1hcChmLCB0aGlzKTsgfVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBmdW5jdGlvbiBgZm5gIHRvIHRoaXMgc3RyZWFtXG4gKlxuICogX19TaWduYXR1cmVfXzogQ2FsbGVkIGJvdW5kIHRvIGBTdHJlYW0gYWA6IGAoYSAtPiBTdHJlYW0gYikgLT4gU3RyZWFtIGJgXG4gKlxuICogQG5hbWUgc3RyZWFtLnBpcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIGZ1bmN0aW9uIHRvIGFwcGx5XG4gKiBAcmV0dXJuIHtzdHJlYW19IEEgbmV3IHN0cmVhbVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbnVtYmVycyA9IGZseWQuc3RyZWFtKDApO1xuICogdmFyIHNxdWFyZWROdW1iZXJzID0gbnVtYmVycy5waXBlKGZseWQubWFwKGZ1bmN0aW9uKG4peyByZXR1cm4gbipuOyB9KSk7XG4gKi9cbmZ1bmN0aW9uIG9wZXJhdG9yX3BpcGUoZikgeyByZXR1cm4gZih0aGlzKSB9XG5cbmZ1bmN0aW9uIGJvdW5kQ2hhaW4oZikge1xuICByZXR1cm4gY2hhaW4oZiwgdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGNoYWluKGYsIHMpIHtcbiAgLy8gSW50ZXJuYWwgc3RhdGUgdG8gZW5kIGZsYXQgbWFwIHN0cmVhbVxuICB2YXIgZmxhdEVuZCA9IGZseWQuc3RyZWFtKDEpO1xuICB2YXIgaW50ZXJuYWxFbmRlZCA9IGZseWQub24oZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFsaXZlID0gZmxhdEVuZCgpIC0gMTtcbiAgICBmbGF0RW5kKGFsaXZlKTtcbiAgICBpZiAoYWxpdmUgPD0gMCkge1xuICAgICAgZmxhdEVuZC5lbmQodHJ1ZSk7XG4gICAgfVxuICB9KTtcblxuICBpbnRlcm5hbEVuZGVkKHMuZW5kKTtcbiAgdmFyIGxhc3QgPSBmbHlkLnN0cmVhbSgpO1xuICB2YXIgZmxhdFN0cmVhbSA9IGZseWQuY29tYmluZShmdW5jdGlvbihzLCBvd24pIHtcbiAgICBsYXN0LmVuZCh0cnVlKVxuICAgIC8vIE91ciBmbiBzdHJlYW0gbWFrZXMgc3RyZWFtc1xuICAgIHZhciBuZXdTID0gZihzKCkpO1xuICAgIGZsYXRFbmQoZmxhdEVuZCgpICsgMSk7XG4gICAgaW50ZXJuYWxFbmRlZChuZXdTLmVuZCk7XG5cbiAgICAvLyBVcGRhdGUgc2VsZiBvbiBjYWxsIC0tIG5ld1MgaXMgbmV2ZXIgaGFuZGVkIG91dCBzbyBkZXBzIGRvbid0IG1hdHRlclxuICAgIGxhc3QgPSBtYXAob3duLCBuZXdTKTtcbiAgfSwgW3NdKTtcblxuICBmbHlkLmVuZHNPbihmbGF0RW5kLmVuZCwgZmxhdFN0cmVhbSk7XG5cbiAgcmV0dXJuIGZsYXRTdHJlYW07XG59XG5cbmZseWQuZnJvbVByb21pc2UgPSBmdW5jdGlvbiBmcm9tUHJvbWlzZShwKSB7XG4gIHZhciBzID0gZmx5ZC5zdHJlYW0oKTtcbiAgcC50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgIHModmFsKTtcbiAgICBzLmVuZCh0cnVlKTtcbiAgfSk7XG4gIHJldHVybiBzO1xufVxuXG5mbHlkLmZsYXR0ZW5Qcm9taXNlID0gZnVuY3Rpb24gZmxhdHRlblByb21pc2Uocykge1xuICByZXR1cm4gY29tYmluZShmdW5jdGlvbihzLCBzZWxmKSB7XG4gICAgcygpLnRoZW4oc2VsZik7XG4gIH0sIFtzXSlcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3RyZWFtIHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlXG4gKiBmdW5jdGlvbnMgZnJvbSBgdGhpc2Agc3RyZWFtIHRvIHRoZSB2YWx1ZXMgaW4gYHN0cmVhbWAgcGFyYW1ldGVyLlxuICpcbiAqIGB0aGlzYCBzdHJlYW0gbXVzdCBiZSBhIHN0cmVhbSBvZiBmdW5jdGlvbnMuXG4gKlxuICogX05vdGU6XyBUaGlzIGZ1bmN0aW9uIGlzIGluY2x1ZGVkIGluIG9yZGVyIHRvIHN1cHBvcnQgdGhlIGZhbnRhc3kgbGFuZFxuICogc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSAoYSAtPiBiKWA6IGBhIC0+IFN0cmVhbSBiYFxuICpcbiAqIEBuYW1lIHN0cmVhbS5hcFxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSAtIHRoZSB2YWx1ZXMgc3RyZWFtXG4gKiBAcmV0dXJuIHtzdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHRoZSBmdW5jdGlvbnMgYXBwbGllZCB0byB2YWx1ZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGFkZCA9IGZseWQuY3VycnlOKDIsIGZ1bmN0aW9uKHgsIHkpIHsgcmV0dXJuIHggKyB5OyB9KTtcbiAqIHZhciBudW1iZXJzMSA9IGZseWQuc3RyZWFtKCk7XG4gKiB2YXIgbnVtYmVyczIgPSBmbHlkLnN0cmVhbSgpO1xuICogdmFyIGFkZFRvTnVtYmVyczEgPSBmbHlkLm1hcChhZGQsIG51bWJlcnMxKTtcbiAqIHZhciBhZGRlZCA9IGFkZFRvTnVtYmVyczEuYXAobnVtYmVyczIpO1xuICovXG5mdW5jdGlvbiBhcChzMiwgczEpIHtcbiAgcmV0dXJuIGNvbWJpbmUoZnVuY3Rpb24oczEsIHMyLCBzZWxmKSB7IHNlbGYoczEudmFsKHMyLnZhbCkpOyB9LCBbczEsIHMyXSk7XG59XG5cbmZ1bmN0aW9uIGJvdW5kQXAoczIpIHtcbiAgcmV0dXJuIGFwKHMyLCB0aGlzKTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBmYW50YXN5X2xhbmRfYXAoczEpIHtcbiAgcmV0dXJuIGFwKHRoaXMsIHMxKTtcbn1cblxuLyoqXG4gKiBHZXQgYSBodW1hbiByZWFkYWJsZSB2aWV3IG9mIGEgc3RyZWFtXG4gKiBAbmFtZSBzdHJlYW0udG9TdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIHN0cmVhbSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gc3RyZWFtVG9TdHJpbmcoKSB7XG4gIHJldHVybiAnc3RyZWFtKCcgKyB0aGlzLnZhbCArICcpJztcbn1cblxuLyoqXG4gKiBAbmFtZSBzdHJlYW0uZW5kXG4gKiBAbWVtYmVyb2Ygc3RyZWFtXG4gKiBBIHN0cmVhbSB0aGF0IGVtaXRzIGB0cnVlYCB3aGVuIHRoZSBzdHJlYW0gZW5kcy4gSWYgYHRydWVgIGlzIHB1c2hlZCBkb3duIHRoZVxuICogc3RyZWFtIHRoZSBwYXJlbnQgc3RyZWFtIGVuZHMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdHJlYW0ub2ZcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHN0cmVhbVxuICogUmV0dXJucyBhIG5ldyBzdHJlYW0gd2l0aCBgdmFsdWVgIGFzIGl0cyBpbml0aWFsIHZhbHVlLiBJdCBpcyBpZGVudGljYWwgdG9cbiAqIGNhbGxpbmcgYGZseWQuc3RyZWFtYCB3aXRoIG9uZSBhcmd1bWVudC5cbiAqXG4gKiBfX1NpZ25hdHVyZV9fOiBDYWxsZWQgYm91bmQgdG8gYFN0cmVhbSAoYSlgOiBgYiAtPiBTdHJlYW0gYmBcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gdGhlIGluaXRpYWwgdmFsdWVcbiAqIEByZXR1cm4ge3N0cmVhbX0gdGhlIG5ldyBzdHJlYW1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG4gPSBmbHlkLnN0cmVhbSgxKTtcbiAqIHZhciBtID0gbi5vZigxKTtcbiAqL1xuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUFJJVkFURSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gLy9cbi8qKlxuICogQHByaXZhdGVcbiAqIENyZWF0ZSBhIHN0cmVhbSB3aXRoIG5vIGRlcGVuZGVuY2llcyBhbmQgbm8gdmFsdWVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZseWQgc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0cmVhbSgpIHtcbiAgZnVuY3Rpb24gcyhuKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBzLnZhbFxuICAgIHVwZGF0ZVN0cmVhbVZhbHVlKG4sIHMpXG4gICAgcmV0dXJuIHNcbiAgfVxuICBzLmhhc1ZhbCA9IGZhbHNlO1xuICBzLnZhbCA9IHVuZGVmaW5lZDtcbiAgcy51cGRhdGVycyA9IFtdO1xuICBzLmxpc3RlbmVycyA9IFtdO1xuICBzLnF1ZXVlZCA9IGZhbHNlO1xuICBzLmVuZCA9IHVuZGVmaW5lZDtcblxuICAvLyBmYW50YXN5LWxhbmQgY29tcGF0aWJpbGl0eVxuICBzLmFwID0gYm91bmRBcDtcbiAgc1snZmFudGFzeS1sYW5kL21hcCddID0gcy5tYXAgPSBib3VuZE1hcDtcbiAgc1snZmFudGFzeS1sYW5kL2FwJ10gPSBmYW50YXN5X2xhbmRfYXA7XG4gIHNbJ2ZhbnRhc3ktbGFuZC9vZiddID0gcy5vZiA9IGZseWQuc3RyZWFtO1xuICBzWydmYW50YXN5LWxhbmQvY2hhaW4nXSA9IHMuY2hhaW4gPSBib3VuZENoYWluO1xuXG4gIHMucGlwZSA9IG9wZXJhdG9yX3BpcGU7XG5cbiAgLy8gQWNjb3JkaW5nIHRvIHRoZSBmYW50YXN5LWxhbmQgQXBwbGljYXRpdmUgc3BlY2lmaWNhdGlvblxuICAvLyBHaXZlbiBhIHZhbHVlIGYsIG9uZSBjYW4gYWNjZXNzIGl0cyB0eXBlIHJlcHJlc2VudGF0aXZlIHZpYSB0aGUgY29uc3RydWN0b3IgcHJvcGVydHk6XG4gIC8vIGBmLmNvbnN0cnVjdG9yLm9mYFxuICBzLmNvbnN0cnVjdG9yID0gZmx5ZC5zdHJlYW07XG5cbiAgcy50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcy52YWw7XG4gIH1cbiAgcy50b1N0cmluZyA9IHN0cmVhbVRvU3RyaW5nO1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ3JlYXRlIGEgZGVwZW5kZW50IHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXMgLSBhbiBhcnJheSBvZiB0aGUgc3RyZWFtc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgZnVuY3Rpb24gdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ldyBzdHJlYW0gdmFsdWVcbiAqIGZyb20gdGhlIGRlcGVuZGVuY2llc1xuICogQHJldHVybiB7c3RyZWFtfSB0aGUgY3JlYXRlZCBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGVwZW5kZW50U3RyZWFtKGRlcHMsIGZuKSB7XG4gIHZhciBzID0gY3JlYXRlU3RyZWFtKCk7XG4gIHMuZm4gPSBmbjtcbiAgcy5kZXBzID0gZGVwcztcbiAgcy5kZXBzTWV0ID0gZmFsc2U7XG4gIHMuZGVwc0NoYW5nZWQgPSBkZXBzLmxlbmd0aCA+IDAgPyBbXSA6IHVuZGVmaW5lZDtcbiAgcy5zaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgYWRkTGlzdGVuZXJzKGRlcHMsIHMpO1xuICByZXR1cm4gcztcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQ2hlY2sgaWYgYWxsIHRoZSBkZXBlbmRlbmNpZXMgaGF2ZSB2YWx1ZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIGNoZWNrIGRlcGVuY2VuY2llcyBmcm9tXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYWxsIGRlcGVuZGVuY2llcyBoYXZlIHZhbGVzLCBgZmFsc2VgIG90aGVyd2lzZVxuICovXG5mdW5jdGlvbiBpbml0aWFsRGVwZW5kZW5jaWVzTWV0KHN0cmVhbSkge1xuICBzdHJlYW0uZGVwc01ldCA9IHN0cmVhbS5kZXBzLmV2ZXJ5KGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gcy5oYXNWYWw7XG4gIH0pO1xuICByZXR1cm4gc3RyZWFtLmRlcHNNZXQ7XG59XG5cbmZ1bmN0aW9uIGRlcGVuZGVuY2llc0FyZU1ldChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5kZXBzTWV0ID09PSB0cnVlIHx8IGluaXRpYWxEZXBlbmRlbmNpZXNNZXQoc3RyZWFtKTtcbn1cblxuZnVuY3Rpb24gaXNFbmRlZChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5lbmQgJiYgc3RyZWFtLmVuZC52YWwgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGxpc3RlbmVyc05lZWRVcGRhdGluZyhzKSB7XG4gIHJldHVybiBzLmxpc3RlbmVycy5zb21lKGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMuc2hvdWxkVXBkYXRlOyB9KTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogVXBkYXRlIGEgZGVwZW5kZW50IHN0cmVhbSB1c2luZyBpdHMgZGVwZW5kZW5jaWVzIGluIGFuIGF0b21pYyB3YXlcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW0gLSB0aGUgc3RyZWFtIHRvIHVwZGF0ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVTdHJlYW0ocykge1xuICBpZiAoaXNFbmRlZChzKSB8fCAhZGVwZW5kZW5jaWVzQXJlTWV0KHMpKSByZXR1cm47XG4gIGlmIChpblN0cmVhbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVTdHJlYW0sIHMpO1xuICAgIHJldHVybjtcbiAgfVxuICBpblN0cmVhbSA9IHM7XG4gIGlmIChzLmRlcHNDaGFuZ2VkKSBzLmZuQXJnc1tzLmZuQXJncy5sZW5ndGggLSAxXSA9IHMuZGVwc0NoYW5nZWQ7XG4gIHZhciByZXR1cm5WYWwgPSBzLmZuLmFwcGx5KHMuZm4sIHMuZm5BcmdzKTtcbiAgaWYgKHJldHVyblZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcyhyZXR1cm5WYWwpO1xuICB9XG4gIGluU3RyZWFtID0gdW5kZWZpbmVkO1xuICBpZiAocy5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBzLmRlcHNDaGFuZ2VkID0gW107XG4gIHMuc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gIGlmIChmbHVzaGluZygpID09PSBmYWxzZSkgZmx1c2hVcGRhdGUoKTtcbiAgaWYgKGxpc3RlbmVyc05lZWRVcGRhdGluZyhzKSkge1xuICAgIGlmICghZmx1c2hpbmdTdHJlYW1WYWx1ZSkgcyhzLnZhbClcbiAgICBlbHNlIHtcbiAgICAgIHMubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyLnNob3VsZFVwZGF0ZSkgdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVTdHJlYW0sIGxpc3RlbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBVcGRhdGUgdGhlIGRlcGVuZGVuY2llcyBvZiBhIHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICovXG5mdW5jdGlvbiB1cGRhdGVMaXN0ZW5lcnMocykge1xuICB2YXIgaSwgbywgbGlzdFxuICB2YXIgbGlzdGVuZXJzID0gcy5saXN0ZW5lcnM7XG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICBsaXN0ID0gbGlzdGVuZXJzW2ldO1xuICAgIGlmIChsaXN0LmVuZCA9PT0gcykge1xuICAgICAgZW5kU3RyZWFtKGxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobGlzdC5kZXBzQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSBsaXN0LmRlcHNDaGFuZ2VkLnB1c2gocyk7XG4gICAgICBsaXN0LnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICBmaW5kRGVwcyhsaXN0KTtcbiAgICB9XG4gIH1cbiAgZm9yICg7IG9yZGVyTmV4dElkeCA+PSAwOyAtLW9yZGVyTmV4dElkeCkge1xuICAgIG8gPSBvcmRlcltvcmRlck5leHRJZHhdO1xuICAgIGlmIChvLnNob3VsZFVwZGF0ZSA9PT0gdHJ1ZSkgdXBkYXRlU3RyZWFtKG8pO1xuICAgIG8ucXVldWVkID0gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQWRkIHN0cmVhbSBkZXBlbmRlbmNpZXMgdG8gdGhlIGdsb2JhbCBgb3JkZXJgIHF1ZXVlLlxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHNlZSB1cGRhdGVEZXBzXG4gKi9cbmZ1bmN0aW9uIGZpbmREZXBzKHMpIHtcbiAgdmFyIGlcbiAgdmFyIGxpc3RlbmVycyA9IHMubGlzdGVuZXJzO1xuICBpZiAocy5xdWV1ZWQgPT09IGZhbHNlKSB7XG4gICAgcy5xdWV1ZWQgPSB0cnVlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGZpbmREZXBzKGxpc3RlbmVyc1tpXSk7XG4gICAgfVxuICAgIG9yZGVyWysrb3JkZXJOZXh0SWR4XSA9IHM7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGF0ZXJVc2luZyh1cGRhdGVyLCBzdHJlYW0pIHtcbiAgdG9VcGRhdGUucHVzaChzdHJlYW0pO1xuICBzdHJlYW0udXBkYXRlcnMucHVzaCh1cGRhdGVyKTtcbiAgc3RyZWFtLnNob3VsZFVwZGF0ZSA9IHRydWU7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZmx1c2hVcGRhdGUoKSB7XG4gIGZsdXNoaW5nVXBkYXRlUXVldWUgPSB0cnVlO1xuICB3aGlsZSAodG9VcGRhdGUubGVuZ3RoID4gMCkge1xuICAgIHZhciBzdHJlYW0gPSB0b1VwZGF0ZS5zaGlmdCgpO1xuICAgIHZhciBuZXh0VXBkYXRlRm4gPSBzdHJlYW0udXBkYXRlcnMuc2hpZnQoKTtcbiAgICBpZiAobmV4dFVwZGF0ZUZuICYmIHN0cmVhbS5zaG91bGRVcGRhdGUpIG5leHRVcGRhdGVGbihzdHJlYW0pO1xuICB9XG4gIGZsdXNoaW5nVXBkYXRlUXVldWUgPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogUHVzaCBkb3duIGEgdmFsdWUgaW50byBhIHN0cmVhbVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5mdW5jdGlvbiB1cGRhdGVTdHJlYW1WYWx1ZShuLCBzKSB7XG4gIHMudmFsID0gbjtcbiAgcy5oYXNWYWwgPSB0cnVlO1xuICBpZiAoaW5TdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgIGZsdXNoaW5nU3RyZWFtVmFsdWUgPSB0cnVlO1xuICAgIHVwZGF0ZUxpc3RlbmVycyhzKTtcbiAgICBpZiAodG9VcGRhdGUubGVuZ3RoID4gMCkgZmx1c2hVcGRhdGUoKTtcbiAgICBmbHVzaGluZ1N0cmVhbVZhbHVlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaW5TdHJlYW0gPT09IHMpIHtcbiAgICBtYXJrTGlzdGVuZXJzKHMsIHMubGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVMYXRlclVzaW5nKGZ1bmN0aW9uKHMpIHsgdXBkYXRlU3RyZWFtVmFsdWUobiwgcyk7IH0sIHMpO1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFya0xpc3RlbmVycyhzLCBsaXN0cykge1xuICB2YXIgaSwgbGlzdDtcbiAgZm9yIChpID0gMDsgaSA8IGxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgbGlzdCA9IGxpc3RzW2ldO1xuICAgIGlmIChsaXN0LmVuZCAhPT0gcykge1xuICAgICAgaWYgKGxpc3QuZGVwc0NoYW5nZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsaXN0LmRlcHNDaGFuZ2VkLnB1c2gocyk7XG4gICAgICB9XG4gICAgICBsaXN0LnNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuZFN0cmVhbShsaXN0KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQWRkIGRlcGVuZGVuY2llcyB0byBhIHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGRlcHMsIHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgKytpKSB7XG4gICAgZGVwc1tpXS5saXN0ZW5lcnMucHVzaChzKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBSZW1vdmVzIGFuIHN0cmVhbSBmcm9tIGEgZGVwZW5kZW5jeSBhcnJheVxuICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbVxuICogQHBhcmFtIHtBcnJheTxzdHJlYW0+fSBkZXBlbmRlbmNpZXNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIocywgbGlzdGVuZXJzKSB7XG4gIHZhciBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihzKTtcbiAgbGlzdGVuZXJzW2lkeF0gPSBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdO1xuICBsaXN0ZW5lcnMubGVuZ3RoLS07XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIERldGFjaCBhIHN0cmVhbSBmcm9tIGl0cyBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7c3RyZWFtfSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gZGV0YWNoRGVwcyhzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5kZXBzLmxlbmd0aDsgKytpKSB7XG4gICAgcmVtb3ZlTGlzdGVuZXIocywgcy5kZXBzW2ldLmxpc3RlbmVycyk7XG4gIH1cbiAgcy5kZXBzLmxlbmd0aCA9IDA7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIEVuZHMgYSBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gZW5kU3RyZWFtKHMpIHtcbiAgaWYgKHMuZGVwcyAhPT0gdW5kZWZpbmVkKSBkZXRhY2hEZXBzKHMpO1xuICBpZiAocy5lbmQgIT09IHVuZGVmaW5lZCkgZGV0YWNoRGVwcyhzLmVuZCk7XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuLyoqXG4gKiBAcHJpdmF0ZVxuICogdHJhbnNkdWNlciBzdHJlYW0gdHJhbnNmb3JtZXJcbiAqL1xuZnVuY3Rpb24gU3RyZWFtVHJhbnNmb3JtZXIoKSB7IH1cblN0cmVhbVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkgeyB9O1xuU3RyZWFtVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbigpIHsgfTtcblN0cmVhbVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHMsIHYpIHsgcmV0dXJuIHY7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZmx5ZDtcbiIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcblxudmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2N1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGUgc3BlY2lmaWVkXG4gKiBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0c1xuICogYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzIGBSLmN1cnJ5TigzLCBmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgW2BSLl9fYF0oI19fKSBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIFtgUi5fX2BdKCNfXyksXG4gKiB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC41LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IGZvciB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc3VtQXJncyA9ICguLi5hcmdzKSA9PiBSLnN1bShhcmdzKTtcbiAqXG4gKiAgICAgIHZhciBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5Tig0LCBzdW1BcmdzKTtcbiAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIHZhciBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG5cblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGN1cnJ5TihsZW5ndGgsIGZuKSB7XG4gIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjdXJyeU47IiwiZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA2OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDc6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDg6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDEwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gX2FyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gX2FyaXR5OyIsInZhciBfaXNQbGFjZWhvbGRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIG9uZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgX2lzUGxhY2Vob2xkZXIoYSkpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MScpO1xuXG52YXIgX2lzUGxhY2Vob2xkZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gX2N1cnJ5Mihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjIoYSwgYikge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gZjI7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSA/IGYyIDogX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IpO1xuICAgICAgICB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYyIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkxKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgIHJldHVybiBmbihfYSwgYik7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYik7XG4gICAgICAgIH0pIDogZm4oYSwgYik7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyOyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fYXJpdHknKTtcblxudmFyIF9pc1BsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmICghX2lzUGxhY2Vob2xkZXIocmVjZWl2ZWRbY29tYmluZWRJZHhdKSB8fCBhcmdzSWR4ID49IGFyZ3VtZW50cy5sZW5ndGgpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlY2VpdmVkW2NvbWJpbmVkSWR4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1thcmdzSWR4XTtcbiAgICAgICAgYXJnc0lkeCArPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRbY29tYmluZWRJZHhdID0gcmVzdWx0O1xuICAgICAgaWYgKCFfaXNQbGFjZWhvbGRlcihyZXN1bHQpKSB7XG4gICAgICAgIGxlZnQgLT0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkSWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBsZWZ0IDw9IDAgPyBmbi5hcHBseSh0aGlzLCBjb21iaW5lZCkgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnlOOyIsImZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgICAgICByZXR1cm4gYSAhPSBudWxsICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzUGxhY2Vob2xkZXI7IiwiaW1wb3J0IF9hcml0eSBmcm9tICcuL2ludGVybmFsL19hcml0eS5qcyc7XG5pbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGlzIGJvdW5kIHRvIGEgY29udGV4dC5cbiAqIE5vdGU6IGBSLmJpbmRgIGRvZXMgbm90IHByb3ZpZGUgdGhlIGFkZGl0aW9uYWwgYXJndW1lbnQtYmluZGluZyBjYXBhYmlsaXRpZXMgb2ZcbiAqIFtGdW5jdGlvbi5wcm90b3R5cGUuYmluZF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vYmluZCkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKCogLT4gKikgLT4geyp9IC0+ICgqIC0+ICopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmluZCB0byBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc09iaiBUaGUgY29udGV4dCB0byBiaW5kIGBmbmAgdG9cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBleGVjdXRlIGluIHRoZSBjb250ZXh0IG9mIGB0aGlzT2JqYC5cbiAqIEBzZWUgUi5wYXJ0aWFsXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3QgbG9nID0gUi5iaW5kKGNvbnNvbGUubG9nLCBjb25zb2xlKTtcbiAqICAgICAgUi5waXBlKFIuYXNzb2MoJ2EnLCAyKSwgUi50YXAobG9nKSwgUi5hc3NvYygnYScsIDMpKSh7YTogMX0pOyAvLz0+IHthOiAzfVxuICogICAgICAvLyBsb2dzIHthOiAyfVxuICogQHN5bWIgUi5iaW5kKGYsIG8pKGEsIGIpID0gZi5jYWxsKG8sIGEsIGIpXG4gKi9cbnZhciBiaW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYmluZChmbiwgdGhpc09iaikge1xuICByZXR1cm4gX2FyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzT2JqLCBhcmd1bWVudHMpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgYmluZDsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IGN1cnJ5TiBmcm9tICcuL2N1cnJ5Ti5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZVxuICogYXQgYSB0aW1lLiBJZiBgZmAgaXMgYSB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgZ2AgaXMgYFIuY3VycnkoZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeU4sIFIucGFydGlhbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGFkZEZvdXJOdW1iZXJzID0gKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQ7XG4gKlxuICogICAgICBjb25zdCBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5KGFkZEZvdXJOdW1iZXJzKTtcbiAqICAgICAgY29uc3QgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgY29uc3QgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xudmFyIGN1cnJ5ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gY3VycnkoZm4pIHtcbiAgcmV0dXJuIGN1cnJ5Tihmbi5sZW5ndGgsIGZuKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgY3Vycnk7IiwiaW1wb3J0IF9hcml0eSBmcm9tICcuL2ludGVybmFsL19hcml0eS5qcyc7XG5pbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcbmltcG9ydCBfY3VycnlOIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Ti5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24sIHdpdGggdGhlIHNwZWNpZmllZFxuICogYXJpdHkuIFRoZSBjdXJyaWVkIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHNcbiAqIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZSBhdCBhIHRpbWUuIElmIGBnYCBpcyBgUi5jdXJyeU4oMywgZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgY29uc3Qgc3VtQXJncyA9ICguLi5hcmdzKSA9PiBSLnN1bShhcmdzKTtcbiAqXG4gKiAgICAgIGNvbnN0IGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnlOKDQsIHN1bUFyZ3MpO1xuICogICAgICBjb25zdCBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICBjb25zdCBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gY3VycnlOKGxlbmd0aCwgZm4pIHtcbiAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBfY3VycnkxKGZuKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGxlbmd0aCwgX2N1cnJ5TihsZW5ndGgsIFtdLCBmbikpO1xufSk7XG5leHBvcnQgZGVmYXVsdCBjdXJyeU47IiwiaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcbmltcG9ydCBfZXF1YWxzIGZyb20gJy4vaW50ZXJuYWwvX2VxdWFscy5qcyc7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgaXRzIGFyZ3VtZW50cyBhcmUgZXF1aXZhbGVudCwgYGZhbHNlYCBvdGhlcndpc2UuIEhhbmRsZXNcbiAqIGN5Y2xpY2FsIGRhdGEgc3RydWN0dXJlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHN5bW1ldHJpY2FsbHkgdG8gdGhlIGBlcXVhbHNgIG1ldGhvZHMgb2YgYm90aCBhcmd1bWVudHMsIGlmXG4gKiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBhIC0+IGIgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lcXVhbHMoMSwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmVxdWFscygxLCAnMScpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZXF1YWxzKFsxLCAyLCAzXSwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gKlxuICogICAgICBjb25zdCBhID0ge307IGEudiA9IGE7XG4gKiAgICAgIGNvbnN0IGIgPSB7fTsgYi52ID0gYjtcbiAqICAgICAgUi5lcXVhbHMoYSwgYik7IC8vPT4gdHJ1ZVxuICovXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIF9lcXVhbHMoYSwgYiwgW10sIFtdKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgZXF1YWxzOyIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX2Rpc3BhdGNoYWJsZSBmcm9tICcuL2ludGVybmFsL19kaXNwYXRjaGFibGUuanMnO1xuaW1wb3J0IF9maWx0ZXIgZnJvbSAnLi9pbnRlcm5hbC9fZmlsdGVyLmpzJztcbmltcG9ydCBfaXNPYmplY3QgZnJvbSAnLi9pbnRlcm5hbC9faXNPYmplY3QuanMnO1xuaW1wb3J0IF9yZWR1Y2UgZnJvbSAnLi9pbnRlcm5hbC9fcmVkdWNlLmpzJztcbmltcG9ydCBfeGZpbHRlciBmcm9tICcuL2ludGVybmFsL194ZmlsdGVyLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUgYW5kIGEgYEZpbHRlcmFibGVgLCBhbmQgcmV0dXJucyBhIG5ldyBmaWx0ZXJhYmxlIG9mIHRoZVxuICogc2FtZSB0eXBlIGNvbnRhaW5pbmcgdGhlIG1lbWJlcnMgb2YgdGhlIGdpdmVuIGZpbHRlcmFibGUgd2hpY2ggc2F0aXNmeSB0aGVcbiAqIGdpdmVuIHByZWRpY2F0ZS4gRmlsdGVyYWJsZSBvYmplY3RzIGluY2x1ZGUgcGxhaW4gb2JqZWN0cyBvciBhbnkgb2JqZWN0XG4gKiB0aGF0IGhhcyBhIGZpbHRlciBtZXRob2Qgc3VjaCBhcyBgQXJyYXlgLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBmaWx0ZXJgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX0gRmlsdGVyYWJsZVxuICogQHNlZSBSLnJlamVjdCwgUi50cmFuc2R1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBpc0V2ZW4gPSBuID0+IG4gJSAyID09PSAwO1xuICpcbiAqICAgICAgUi5maWx0ZXIoaXNFdmVuLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsyLCA0XVxuICpcbiAqICAgICAgUi5maWx0ZXIoaXNFdmVuLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBkOiA0fVxuICovXG52YXIgZmlsdGVyID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZmlsdGVyJ10sIF94ZmlsdGVyLCBmdW5jdGlvbiAocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gX2lzT2JqZWN0KGZpbHRlcmFibGUpID8gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICBpZiAocHJlZChmaWx0ZXJhYmxlW2tleV0pKSB7XG4gICAgICBhY2Nba2V5XSA9IGZpbHRlcmFibGVba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30sIGtleXMoZmlsdGVyYWJsZSkpIDpcbiAgLy8gZWxzZVxuICBfZmlsdGVyKHByZWQsIGZpbHRlcmFibGUpO1xufSkpO1xuZXhwb3J0IGRlZmF1bHQgZmlsdGVyOyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5pbXBvcnQgY3VycnlOIGZyb20gJy4vY3VycnlOLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIG11Y2ggbGlrZSB0aGUgc3VwcGxpZWQgb25lLCBleGNlcHQgdGhhdCB0aGUgZmlyc3QgdHdvXG4gKiBhcmd1bWVudHMnIG9yZGVyIGlzIHJldmVyc2VkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoYSwgYiwgYywgLi4uKSAtPiB6KSAtPiAoYiAtPiBhIC0+IGMgLT4gLi4uIC0+IHopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gaW52b2tlIHdpdGggaXRzIGZpcnN0IHR3byBwYXJhbWV0ZXJzIHJldmVyc2VkLlxuICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiBpbnZva2luZyBgZm5gIHdpdGggaXRzIGZpcnN0IHR3byBwYXJhbWV0ZXJzJyBvcmRlciByZXZlcnNlZC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBtZXJnZVRocmVlID0gKGEsIGIsIGMpID0+IFtdLmNvbmNhdChhLCBiLCBjKTtcbiAqXG4gKiAgICAgIG1lcmdlVGhyZWUoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIDNdXG4gKlxuICogICAgICBSLmZsaXAobWVyZ2VUaHJlZSkoMSwgMiwgMyk7IC8vPT4gWzIsIDEsIDNdXG4gKiBAc3ltYiBSLmZsaXAoZikoYSwgYiwgYykgPSBmKGIsIGEsIGMpXG4gKi9cbnZhciBmbGlwID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gZmxpcChmbikge1xuICByZXR1cm4gY3VycnlOKGZuLmxlbmd0aCwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJnc1swXSA9IGI7XG4gICAgYXJnc1sxXSA9IGE7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9KTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgZmxpcDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgODpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUZyb21JdGVyYXRvcihpdGVyKSB7XG4gIHZhciBsaXN0ID0gW107XG4gIHZhciBuZXh0O1xuICB3aGlsZSAoIShuZXh0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICBsaXN0LnB1c2gobmV4dC52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NvbXBsZW1lbnQoZikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufSIsImltcG9ydCBfaXNQbGFjZWhvbGRlciBmcm9tICcuL19pc1BsYWNlaG9sZGVyLmpzJztcblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgb25lLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2N1cnJ5MShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjEoYSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IF9pc1BsYWNlaG9sZGVyKGEpKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn0iLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL19jdXJyeTEuanMnO1xuaW1wb3J0IF9pc1BsYWNlaG9sZGVyIGZyb20gJy4vX2lzUGxhY2Vob2xkZXIuanMnO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0d28tYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3VycnkyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMihhLCBiKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjIgOiBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYik7XG4gICAgICAgIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjIgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKF9hLCBiKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iKTtcbiAgICAgICAgfSkgOiBmbihhLCBiKTtcbiAgICB9XG4gIH07XG59IiwiaW1wb3J0IF9hcml0eSBmcm9tICcuL19hcml0eS5qcyc7XG5pbXBvcnQgX2lzUGxhY2Vob2xkZXIgZnJvbSAnLi9faXNQbGFjZWhvbGRlci5qcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgY3VycnlOIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggVGhlIGFyaXR5IG9mIHRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtBcnJheX0gcmVjZWl2ZWQgQW4gYXJyYXkgb2YgYXJndW1lbnRzIHJlY2VpdmVkIHRodXMgZmFyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmICghX2lzUGxhY2Vob2xkZXIocmVjZWl2ZWRbY29tYmluZWRJZHhdKSB8fCBhcmdzSWR4ID49IGFyZ3VtZW50cy5sZW5ndGgpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlY2VpdmVkW2NvbWJpbmVkSWR4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1thcmdzSWR4XTtcbiAgICAgICAgYXJnc0lkeCArPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRbY29tYmluZWRJZHhdID0gcmVzdWx0O1xuICAgICAgaWYgKCFfaXNQbGFjZWhvbGRlcihyZXN1bHQpKSB7XG4gICAgICAgIGxlZnQgLT0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkSWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBsZWZ0IDw9IDAgPyBmbi5hcHBseSh0aGlzLCBjb21iaW5lZCkgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufSIsImltcG9ydCBfaXNBcnJheSBmcm9tICcuL19pc0FycmF5LmpzJztcbmltcG9ydCBfaXNUcmFuc2Zvcm1lciBmcm9tICcuL19pc1RyYW5zZm9ybWVyLmpzJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIHdpdGggZGlmZmVyZW50IHN0cmF0ZWdpZXMgYmFzZWQgb24gdGhlXG4gKiBvYmplY3QgaW4gbGlzdCBwb3NpdGlvbiAobGFzdCBhcmd1bWVudCkuIElmIGl0IGlzIGFuIGFycmF5LCBleGVjdXRlcyBbZm5dLlxuICogT3RoZXJ3aXNlLCBpZiBpdCBoYXMgYSBmdW5jdGlvbiB3aXRoIG9uZSBvZiB0aGUgZ2l2ZW4gbWV0aG9kIG5hbWVzLCBpdCB3aWxsXG4gKiBleGVjdXRlIHRoYXQgZnVuY3Rpb24gKGZ1bmN0b3IgY2FzZSkuIE90aGVyd2lzZSwgaWYgaXQgaXMgYSB0cmFuc2Zvcm1lcixcbiAqIHVzZXMgdHJhbnNkdWNlciBbeGZdIHRvIHJldHVybiBhIG5ldyB0cmFuc2Zvcm1lciAodHJhbnNkdWNlciBjYXNlKS5cbiAqIE90aGVyd2lzZSwgaXQgd2lsbCBkZWZhdWx0IHRvIGV4ZWN1dGluZyBbZm5dLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBtZXRob2ROYW1lcyBwcm9wZXJ0aWVzIHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0geGYgdHJhbnNkdWNlciB0byBpbml0aWFsaXplIGlmIG9iamVjdCBpcyB0cmFuc2Zvcm1lclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gZGVmYXVsdCByYW1kYSBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIG9uIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kaXNwYXRjaGFibGUobWV0aG9kTmFtZXMsIHhmLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIHZhciBvYmogPSBhcmdzLnBvcCgpO1xuICAgIGlmICghX2lzQXJyYXkob2JqKSkge1xuICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICB3aGlsZSAoaWR4IDwgbWV0aG9kTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW21ldGhvZE5hbWVzW2lkeF1dID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialttZXRob2ROYW1lc1tpZHhdXS5hcHBseShvYmosIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlkeCArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKF9pc1RyYW5zZm9ybWVyKG9iaikpIHtcbiAgICAgICAgdmFyIHRyYW5zZHVjZXIgPSB4Zi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZHVjZXIob2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59IiwiaW1wb3J0IF9hcnJheUZyb21JdGVyYXRvciBmcm9tICcuL19hcnJheUZyb21JdGVyYXRvci5qcyc7XG5pbXBvcnQgX2luY2x1ZGVzV2l0aCBmcm9tICcuL19pbmNsdWRlc1dpdGguanMnO1xuaW1wb3J0IF9mdW5jdGlvbk5hbWUgZnJvbSAnLi9fZnVuY3Rpb25OYW1lLmpzJztcbmltcG9ydCBfaGFzIGZyb20gJy4vX2hhcy5qcyc7XG5pbXBvcnQgX29iamVjdElzIGZyb20gJy4vX29iamVjdElzLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4uL2tleXMuanMnO1xuaW1wb3J0IHR5cGUgZnJvbSAnLi4vdHlwZS5qcyc7XG5cbi8qKlxuICogcHJpdmF0ZSBfdW5pcUNvbnRlbnRFcXVhbHMgZnVuY3Rpb24uXG4gKiBUaGF0IGZ1bmN0aW9uIGlzIGNoZWNraW5nIGVxdWFsaXR5IG9mIDIgaXRlcmF0b3IgY29udGVudHMgd2l0aCAyIGFzc3VtcHRpb25zXG4gKiAtIGl0ZXJhdG9ycyBsZW5ndGhzIGFyZSB0aGUgc2FtZVxuICogLSBpdGVyYXRvcnMgdmFsdWVzIGFyZSB1bmlxdWVcbiAqXG4gKiBmYWxzZS1wb3NpdGl2ZSByZXN1bHQgd2lsbCBiZSByZXR1cm5lZCBmb3IgY29tcGFyaXNpb24gb2YsIGUuZy5cbiAqIC0gWzEsMiwzXSBhbmQgWzEsMiwzLDRdXG4gKiAtIFsxLDEsMV0gYW5kIFsxLDIsM11cbiAqICovXG5cbmZ1bmN0aW9uIF91bmlxQ29udGVudEVxdWFscyhhSXRlcmF0b3IsIGJJdGVyYXRvciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGEgPSBfYXJyYXlGcm9tSXRlcmF0b3IoYUl0ZXJhdG9yKTtcbiAgdmFyIGIgPSBfYXJyYXlGcm9tSXRlcmF0b3IoYkl0ZXJhdG9yKTtcblxuICBmdW5jdGlvbiBlcShfYSwgX2IpIHtcbiAgICByZXR1cm4gX2VxdWFscyhfYSwgX2IsIHN0YWNrQS5zbGljZSgpLCBzdGFja0Iuc2xpY2UoKSk7XG4gIH1cblxuICAvLyBpZiAqYSogYXJyYXkgY29udGFpbnMgYW55IGVsZW1lbnQgdGhhdCBpcyBub3QgaW5jbHVkZWQgaW4gKmIqXG4gIHJldHVybiAhX2luY2x1ZGVzV2l0aChmdW5jdGlvbiAoYiwgYUl0ZW0pIHtcbiAgICByZXR1cm4gIV9pbmNsdWRlc1dpdGgoZXEsIGFJdGVtLCBiKTtcbiAgfSwgYiwgYSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9lcXVhbHMoYSwgYiwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKF9vYmplY3RJcyhhLCBiKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIHR5cGVBID0gdHlwZShhKTtcblxuICBpZiAodHlwZUEgIT09IHR5cGUoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYVsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBiWydmYW50YXN5LWxhbmQvZXF1YWxzJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZW9mIGFbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBhWydmYW50YXN5LWxhbmQvZXF1YWxzJ10oYikgJiYgdHlwZW9mIGJbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBiWydmYW50YXN5LWxhbmQvZXF1YWxzJ10oYSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGEuZXF1YWxzID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBiLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiYgYS5lcXVhbHMoYikgJiYgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmIGIuZXF1YWxzKGEpO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlQSkge1xuICAgIGNhc2UgJ0FyZ3VtZW50cyc6XG4gICAgY2FzZSAnQXJyYXknOlxuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgICBpZiAodHlwZW9mIGEuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiYgX2Z1bmN0aW9uTmFtZShhLmNvbnN0cnVjdG9yKSA9PT0gJ1Byb21pc2UnKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnTnVtYmVyJzpcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgaWYgKCEodHlwZW9mIGEgPT09IHR5cGVvZiBiICYmIF9vYmplY3RJcyhhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdEYXRlJzpcbiAgICAgIGlmICghX29iamVjdElzKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRXJyb3InOlxuICAgICAgcmV0dXJuIGEubmFtZSA9PT0gYi5uYW1lICYmIGEubWVzc2FnZSA9PT0gYi5tZXNzYWdlO1xuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICBpZiAoIShhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgYS5nbG9iYWwgPT09IGIuZ2xvYmFsICYmIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlICYmIGEubXVsdGlsaW5lID09PSBiLm11bHRpbGluZSAmJiBhLnN0aWNreSA9PT0gYi5zdGlja3kgJiYgYS51bmljb2RlID09PSBiLnVuaWNvZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIGlkeCA9IHN0YWNrQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICBpZiAoc3RhY2tBW2lkeF0gPT09IGEpIHtcbiAgICAgIHJldHVybiBzdGFja0JbaWR4XSA9PT0gYjtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGVBKSB7XG4gICAgY2FzZSAnTWFwJzpcbiAgICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdW5pcUNvbnRlbnRFcXVhbHMoYS5lbnRyaWVzKCksIGIuZW50cmllcygpLCBzdGFja0EuY29uY2F0KFthXSksIHN0YWNrQi5jb25jYXQoW2JdKSk7XG4gICAgY2FzZSAnU2V0JzpcbiAgICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdW5pcUNvbnRlbnRFcXVhbHMoYS52YWx1ZXMoKSwgYi52YWx1ZXMoKSwgc3RhY2tBLmNvbmNhdChbYV0pLCBzdGFja0IuY29uY2F0KFtiXSkpO1xuICAgIGNhc2UgJ0FyZ3VtZW50cyc6XG4gICAgY2FzZSAnQXJyYXknOlxuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnTnVtYmVyJzpcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgIGNhc2UgJ0RhdGUnOlxuICAgIGNhc2UgJ0Vycm9yJzpcbiAgICBjYXNlICdSZWdFeHAnOlxuICAgIGNhc2UgJ0ludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhDbGFtcGVkQXJyYXknOlxuICAgIGNhc2UgJ0ludDE2QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzpcbiAgICBjYXNlICdJbnQzMkFycmF5JzpcbiAgICBjYXNlICdVaW50MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDY0QXJyYXknOlxuICAgIGNhc2UgJ0FycmF5QnVmZmVyJzpcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBWYWx1ZXMgb2Ygb3RoZXIgdHlwZXMgYXJlIG9ubHkgZXF1YWwgaWYgaWRlbnRpY2FsLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0ga2V5cyhhKTtcbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZXh0ZW5kZWRTdGFja0EgPSBzdGFja0EuY29uY2F0KFthXSk7XG4gIHZhciBleHRlbmRlZFN0YWNrQiA9IHN0YWNrQi5jb25jYXQoW2JdKTtcblxuICBpZHggPSBrZXlzQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICB2YXIga2V5ID0ga2V5c0FbaWR4XTtcbiAgICBpZiAoIShfaGFzKGtleSwgYikgJiYgX2VxdWFscyhiW2tleV0sIGFba2V5XSwgZXh0ZW5kZWRTdGFja0EsIGV4dGVuZGVkU3RhY2tCKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2ZpbHRlcihmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Z1bmN0aW9uTmFtZShmKSB7XG4gIC8vIFN0cmluZyh4ID0+IHgpIGV2YWx1YXRlcyB0byBcInggPT4geFwiLCBzbyB0aGUgcGF0dGVybiBtYXkgbm90IG1hdGNoLlxuICB2YXIgbWF0Y2ggPSBTdHJpbmcoZikubWF0Y2goL15mdW5jdGlvbiAoXFx3KikvKTtcbiAgcmV0dXJuIG1hdGNoID09IG51bGwgPyAnJyA6IG1hdGNoWzFdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9oYXMocHJvcCwgb2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn0iLCJpbXBvcnQgX2luZGV4T2YgZnJvbSAnLi9faW5kZXhPZi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmNsdWRlcyhhLCBsaXN0KSB7XG4gIHJldHVybiBfaW5kZXhPZihsaXN0LCBhLCAwKSA+PSAwO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmNsdWRlc1dpdGgocHJlZCwgeCwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAocHJlZCh4LCBsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCBlcXVhbHMgZnJvbSAnLi4vZXF1YWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luZGV4T2YobGlzdCwgYSwgaWR4KSB7XG4gIHZhciBpbmYsIGl0ZW07XG4gIC8vIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIGRvZXNuJ3QgZXhpc3QgYmVsb3cgSUU5XG4gIGlmICh0eXBlb2YgbGlzdC5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgYSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgICAvLyBtYW51YWxseSBjcmF3bCB0aGUgbGlzdCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuICswIGFuZCAtMFxuICAgICAgICAgIGluZiA9IDEgLyBhO1xuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSAwICYmIDEgLyBpdGVtID09PSBpbmYpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSAhPT0gYSkge1xuICAgICAgICAgIC8vIE5hTlxuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicgJiYgaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub24temVybyBudW1iZXJzIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGEsIGlkeCk7XG5cbiAgICAgIC8vIGFsbCB0aGVzZSB0eXBlcyBjYW4gdXRpbGlzZSBTZXRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKGEgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBudWxsIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBhbnl0aGluZyBlbHNlIG5vdCBjb3ZlcmVkIGFib3ZlLCBkZWZlciB0byBSLmVxdWFsc1xuICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICBpZiAoZXF1YWxzKGxpc3RbaWR4XSwgYSkpIHtcbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiAtMTtcbn0iLCJpbXBvcnQgX2hhcyBmcm9tICcuL19oYXMuanMnO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIF9pc0FyZ3VtZW50cyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFyZ3VtZW50cykgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nID8gZnVuY3Rpb24gX2lzQXJndW1lbnRzKHgpIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gIH0gOiBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkge1xuICAgIHJldHVybiBfaGFzKCdjYWxsZWUnLCB4KTtcbiAgfTtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgX2lzQXJndW1lbnRzOyIsIi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHZhbGAgaXMgYW4gYXJyYXksIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIF9pc0FycmF5KFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIF9pc0FycmF5KG51bGwpOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5KHt9KTsgLy89PiBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmxlbmd0aCA+PSAwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufTsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL19jdXJyeTEuanMnO1xuaW1wb3J0IF9pc0FycmF5IGZyb20gJy4vX2lzQXJyYXkuanMnO1xuaW1wb3J0IF9pc1N0cmluZyBmcm9tICcuL19pc1N0cmluZy5qcyc7XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIHNpbWlsYXIgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBUeXBlXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAqIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0geCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGhhcyBhIG51bWVyaWMgbGVuZ3RoIHByb3BlcnR5IGFuZCBleHRyZW1lIGluZGljZXMgZGVmaW5lZDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2lzQXJyYXlMaWtlKFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh0cnVlKTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheUxpa2Uoe30pOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7bGVuZ3RoOiAxMH0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIF9pc0FycmF5TGlrZSh7MDogJ3plcm8nLCA5OiAnbmluZScsIGxlbmd0aDogMTB9KTsgLy89PiB0cnVlXG4gKi9cbnZhciBfaXNBcnJheUxpa2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gIGlmIChfaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgheCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChfaXNTdHJpbmcoeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubm9kZVR5cGUgPT09IDEpIHtcbiAgICByZXR1cm4gISF4Lmxlbmd0aDtcbiAgfVxuICBpZiAoeC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHguaGFzT3duUHJvcGVydHkoMCkgJiYgeC5oYXNPd25Qcm9wZXJ0eSh4Lmxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgX2lzQXJyYXlMaWtlOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNPYmplY3QoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXNQbGFjZWhvbGRlcihhKSB7XG4gICAgICAgcmV0dXJuIGEgIT0gbnVsbCAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWU7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2lzU3RyaW5nKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2lzVHJhbnNmb3JtZXIob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqWydAQHRyYW5zZHVjZXIvc3RlcCddID09PSAnZnVuY3Rpb24nO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9tYXAoZm4sIGZ1bmN0b3IpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBmdW5jdG9yLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbik7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICByZXN1bHRbaWR4XSA9IGZuKGZ1bmN0b3JbaWR4XSk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvLyBCYXNlZCBvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbmZ1bmN0aW9uIF9vYmplY3RJcyhhLCBiKSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKGEgPT09IGIpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IF9vYmplY3RJczsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcXVvdGUocykge1xuICB2YXIgZXNjYXBlZCA9IHMucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC9bXFxiXS9nLCAnXFxcXGInKSAvLyBcXGIgbWF0Y2hlcyB3b3JkIGJvdW5kYXJ5OyBbXFxiXSBtYXRjaGVzIGJhY2tzcGFjZVxuICAucmVwbGFjZSgvXFxmL2csICdcXFxcZicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKS5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJykucmVwbGFjZSgvXFx0L2csICdcXFxcdCcpLnJlcGxhY2UoL1xcdi9nLCAnXFxcXHYnKS5yZXBsYWNlKC9cXDAvZywgJ1xcXFwwJyk7XG5cbiAgcmV0dXJuICdcIicgKyBlc2NhcGVkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIic7XG59IiwiaW1wb3J0IF9pc0FycmF5TGlrZSBmcm9tICcuL19pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgX3h3cmFwIGZyb20gJy4vX3h3cmFwLmpzJztcbmltcG9ydCBiaW5kIGZyb20gJy4uL2JpbmQuanMnO1xuXG5mdW5jdGlvbiBfYXJyYXlSZWR1Y2UoeGYsIGFjYywgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgYWNjID0geGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10oYWNjLCBsaXN0W2lkeF0pO1xuICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG59XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVJlZHVjZSh4ZiwgYWNjLCBpdGVyKSB7XG4gIHZhciBzdGVwID0gaXRlci5uZXh0KCk7XG4gIHdoaWxlICghc3RlcC5kb25lKSB7XG4gICAgYWNjID0geGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10oYWNjLCBzdGVwLnZhbHVlKTtcbiAgICBpZiAoYWNjICYmIGFjY1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgYWNjID0gYWNjWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzdGVwID0gaXRlci5uZXh0KCk7XG4gIH1cbiAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbn1cblxuZnVuY3Rpb24gX21ldGhvZFJlZHVjZSh4ZiwgYWNjLCBvYmosIG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ob2JqW21ldGhvZE5hbWVdKGJpbmQoeGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10sIHhmKSwgYWNjKSk7XG59XG5cbnZhciBzeW1JdGVyYXRvciA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnID8gU3ltYm9sLml0ZXJhdG9yIDogJ0BAaXRlcmF0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcmVkdWNlKGZuLCBhY2MsIGxpc3QpIHtcbiAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gX3h3cmFwKGZuKTtcbiAgfVxuICBpZiAoX2lzQXJyYXlMaWtlKGxpc3QpKSB7XG4gICAgcmV0dXJuIF9hcnJheVJlZHVjZShmbiwgYWNjLCBsaXN0KTtcbiAgfVxuICBpZiAodHlwZW9mIGxpc3RbJ2ZhbnRhc3ktbGFuZC9yZWR1Y2UnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBfbWV0aG9kUmVkdWNlKGZuLCBhY2MsIGxpc3QsICdmYW50YXN5LWxhbmQvcmVkdWNlJyk7XG4gIH1cbiAgaWYgKGxpc3Rbc3ltSXRlcmF0b3JdICE9IG51bGwpIHtcbiAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3Rbc3ltSXRlcmF0b3JdKCkpO1xuICB9XG4gIGlmICh0eXBlb2YgbGlzdC5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIF9pdGVyYWJsZVJlZHVjZShmbiwgYWNjLCBsaXN0KTtcbiAgfVxuICBpZiAodHlwZW9mIGxpc3QucmVkdWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCwgJ3JlZHVjZScpO1xuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigncmVkdWNlOiBsaXN0IG11c3QgYmUgYXJyYXkgb3IgaXRlcmFibGUnKTtcbn0iLCIvKipcbiAqIFBvbHlmaWxsIGZyb20gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGUvdG9JU09TdHJpbmc+LlxuICovXG52YXIgcGFkID0gZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIChuIDwgMTAgPyAnMCcgOiAnJykgKyBuO1xufTtcblxudmFyIF90b0lTT1N0cmluZyA9IHR5cGVvZiBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJyA/IGZ1bmN0aW9uIF90b0lTT1N0cmluZyhkKSB7XG4gIHJldHVybiBkLnRvSVNPU3RyaW5nKCk7XG59IDogZnVuY3Rpb24gX3RvSVNPU3RyaW5nKGQpIHtcbiAgcmV0dXJuIGQuZ2V0VVRDRnVsbFllYXIoKSArICctJyArIHBhZChkLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArIHBhZChkLmdldFVUQ0RhdGUoKSkgKyAnVCcgKyBwYWQoZC5nZXRVVENIb3VycygpKSArICc6JyArIHBhZChkLmdldFVUQ01pbnV0ZXMoKSkgKyAnOicgKyBwYWQoZC5nZXRVVENTZWNvbmRzKCkpICsgJy4nICsgKGQuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgLyAxMDAwKS50b0ZpeGVkKDMpLnNsaWNlKDIsIDUpICsgJ1onO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgX3RvSVNPU3RyaW5nOyIsImltcG9ydCBfaW5jbHVkZXMgZnJvbSAnLi9faW5jbHVkZXMuanMnO1xuaW1wb3J0IF9tYXAgZnJvbSAnLi9fbWFwLmpzJztcbmltcG9ydCBfcXVvdGUgZnJvbSAnLi9fcXVvdGUuanMnO1xuaW1wb3J0IF90b0lTT1N0cmluZyBmcm9tICcuL190b0lTT1N0cmluZy5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuLi9rZXlzLmpzJztcbmltcG9ydCByZWplY3QgZnJvbSAnLi4vcmVqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvU3RyaW5nKHgsIHNlZW4pIHtcbiAgdmFyIHJlY3VyID0gZnVuY3Rpb24gcmVjdXIoeSkge1xuICAgIHZhciB4cyA9IHNlZW4uY29uY2F0KFt4XSk7XG4gICAgcmV0dXJuIF9pbmNsdWRlcyh5LCB4cykgPyAnPENpcmN1bGFyPicgOiBfdG9TdHJpbmcoeSwgeHMpO1xuICB9O1xuXG4gIC8vICBtYXBQYWlycyA6OiAoT2JqZWN0LCBbU3RyaW5nXSkgLT4gW1N0cmluZ11cbiAgdmFyIG1hcFBhaXJzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgIHJldHVybiBfbWFwKGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gX3F1b3RlKGspICsgJzogJyArIHJlY3VyKG9ialtrXSk7XG4gICAgfSwga2V5cy5zbGljZSgpLnNvcnQoKSk7XG4gIH07XG5cbiAgc3dpdGNoIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkpIHtcbiAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOlxuICAgICAgcmV0dXJuICcoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oJyArIF9tYXAocmVjdXIsIHgpLmpvaW4oJywgJykgKyAnKSknO1xuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzpcbiAgICAgIHJldHVybiAnWycgKyBfbWFwKHJlY3VyLCB4KS5jb25jYXQobWFwUGFpcnMoeCwgcmVqZWN0KGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldHVybiAoL15cXGQrJC8udGVzdChrKVxuICAgICAgICApO1xuICAgICAgfSwga2V5cyh4KSkpKS5qb2luKCcsICcpICsgJ10nO1xuICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgQm9vbGVhbignICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogeC50b1N0cmluZygpO1xuICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOlxuICAgICAgcmV0dXJuICduZXcgRGF0ZSgnICsgKGlzTmFOKHgudmFsdWVPZigpKSA/IHJlY3VyKE5hTikgOiBfcXVvdGUoX3RvSVNPU3RyaW5nKHgpKSkgKyAnKSc7XG4gICAgY2FzZSAnW29iamVjdCBOdWxsXSc6XG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBOdW1iZXIoJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IDEgLyB4ID09PSAtSW5maW5pdHkgPyAnLTAnIDogeC50b1N0cmluZygxMCk7XG4gICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IFN0cmluZygnICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogX3F1b3RlKHgpO1xuICAgIGNhc2UgJ1tvYmplY3QgVW5kZWZpbmVkXSc6XG4gICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh0eXBlb2YgeC50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgcmVwciA9IHgudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHJlcHIgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcHI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAneycgKyBtYXBQYWlycyh4LCBrZXlzKHgpKS5qb2luKCcsICcpICsgJ30nO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbiAgfSxcbiAgcmVzdWx0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9XG59OyIsImltcG9ydCBfY3VycnkyIGZyb20gJy4vX2N1cnJ5Mi5qcyc7XG5pbXBvcnQgX3hmQmFzZSBmcm9tICcuL194ZkJhc2UuanMnO1xuXG52YXIgWEZpbHRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFhGaWx0ZXIoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZihpbnB1dCkgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpIDogcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBYRmlsdGVyO1xufSgpO1xuXG52YXIgX3hmaWx0ZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGZpbHRlcihmLCB4Zikge1xuICByZXR1cm4gbmV3IFhGaWx0ZXIoZiwgeGYpO1xufSk7XG5leHBvcnQgZGVmYXVsdCBfeGZpbHRlcjsiLCJ2YXIgWFdyYXAgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBYV3JhcChmbikge1xuICAgIHRoaXMuZiA9IGZuO1xuICB9XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luaXQgbm90IGltcGxlbWVudGVkIG9uIFhXcmFwJyk7XG4gIH07XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKGFjYykge1xuICAgIHJldHVybiBhY2M7XG4gIH07XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChhY2MsIHgpIHtcbiAgICByZXR1cm4gdGhpcy5mKGFjYywgeCk7XG4gIH07XG5cbiAgcmV0dXJuIFhXcmFwO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfeHdyYXAoZm4pIHtcbiAgcmV0dXJuIG5ldyBYV3JhcChmbik7XG59IiwiaW1wb3J0IF9jdXJyeTIgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkyLmpzJztcbmltcG9ydCBfaXNGdW5jdGlvbiBmcm9tICcuL2ludGVybmFsL19pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBjdXJyeU4gZnJvbSAnLi9jdXJyeU4uanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIFR1cm5zIGEgbmFtZWQgbWV0aG9kIHdpdGggYSBzcGVjaWZpZWQgYXJpdHkgaW50byBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlXG4gKiBjYWxsZWQgZGlyZWN0bHkgc3VwcGxpZWQgd2l0aCBhcmd1bWVudHMgYW5kIGEgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gaXMgY3VycmllZCBhbmQgYWNjZXB0cyBgYXJpdHkgKyAxYCBwYXJhbWV0ZXJzIHdoZXJlXG4gKiB0aGUgZmluYWwgcGFyYW1ldGVyIGlzIHRoZSB0YXJnZXQgb2JqZWN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gKGEgLT4gYiAtPiAuLi4gLT4gbiAtPiBPYmplY3QgLT4gKilcbiAqIEBwYXJhbSB7TnVtYmVyfSBhcml0eSBOdW1iZXIgb2YgYXJndW1lbnRzIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBzaG91bGQgdGFrZVxuICogICAgICAgIGJlZm9yZSB0aGUgdGFyZ2V0IG9iamVjdC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgTmFtZSBvZiB0aGUgbWV0aG9kIHRvIGNhbGwuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jb25zdHJ1Y3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBzbGljZUZyb20gPSBSLmludm9rZXIoMSwgJ3NsaWNlJyk7XG4gKiAgICAgIHNsaWNlRnJvbSg2LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaGlqa2xtJ1xuICogICAgICBjb25zdCBzbGljZUZyb202ID0gUi5pbnZva2VyKDIsICdzbGljZScpKDYpO1xuICogICAgICBzbGljZUZyb202KDgsICdhYmNkZWZnaGlqa2xtJyk7IC8vPT4gJ2doJ1xuICogQHN5bWIgUi5pbnZva2VyKDAsICdtZXRob2QnKShvKSA9IG9bJ21ldGhvZCddKClcbiAqIEBzeW1iIFIuaW52b2tlcigxLCAnbWV0aG9kJykoYSwgbykgPSBvWydtZXRob2QnXShhKVxuICogQHN5bWIgUi5pbnZva2VyKDIsICdtZXRob2QnKShhLCBiLCBvKSA9IG9bJ21ldGhvZCddKGEsIGIpXG4gKi9cbnZhciBpbnZva2VyID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gaW52b2tlcihhcml0eSwgbWV0aG9kKSB7XG4gIHJldHVybiBjdXJyeU4oYXJpdHkgKyAxLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1thcml0eV07XG4gICAgaWYgKHRhcmdldCAhPSBudWxsICYmIF9pc0Z1bmN0aW9uKHRhcmdldFttZXRob2RdKSkge1xuICAgICAgcmV0dXJuIHRhcmdldFttZXRob2RdLmFwcGx5KHRhcmdldCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBhcml0eSkpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nKHRhcmdldCkgKyAnIGRvZXMgbm90IGhhdmUgYSBtZXRob2QgbmFtZWQgXCInICsgbWV0aG9kICsgJ1wiJyk7XG4gIH0pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBpbnZva2VyOyIsImltcG9ydCBfY3VycnkxIGZyb20gJy4vaW50ZXJuYWwvX2N1cnJ5MS5qcyc7XG5pbXBvcnQgX2hhcyBmcm9tICcuL2ludGVybmFsL19oYXMuanMnO1xuaW1wb3J0IF9pc0FyZ3VtZW50cyBmcm9tICcuL2ludGVybmFsL19pc0FyZ3VtZW50cy5qcyc7XG5cbi8vIGNvdmVyIElFIDwgOSBrZXlzIGlzc3Vlc1xudmFyIGhhc0VudW1CdWcgPSAhIC8qI19fUFVSRV9fKi97IHRvU3RyaW5nOiBudWxsIH0ucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG52YXIgbm9uRW51bWVyYWJsZVByb3BzID0gWydjb25zdHJ1Y3RvcicsICd2YWx1ZU9mJywgJ2lzUHJvdG90eXBlT2YnLCAndG9TdHJpbmcnLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcbi8vIFNhZmFyaSBidWdcbnZhciBoYXNBcmdzRW51bUJ1ZyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICByZXR1cm4gYXJndW1lbnRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKCdsZW5ndGgnKTtcbn0oKTtcblxudmFyIGNvbnRhaW5zID0gZnVuY3Rpb24gY29udGFpbnMobGlzdCwgaXRlbSkge1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaWYgKGxpc3RbaWR4XSA9PT0gaXRlbSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyB0aGUgbmFtZXMgb2YgYWxsIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIG9mXG4gKiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnRcbiAqIGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7azogdn0gLT4gW2tdXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBwcm9wZXJ0aWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gKiBAc2VlIFIua2V5c0luLCBSLnZhbHVlc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIua2V5cyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFsnYScsICdiJywgJ2MnXVxuICovXG52YXIga2V5cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiAhaGFzQXJnc0VudW1CdWcgPyAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBrZXlzKG9iaikge1xuICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iaiA/IFtdIDogT2JqZWN0LmtleXMob2JqKTtcbn0pIDogLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgdmFyIHByb3AsIG5JZHg7XG4gIHZhciBrcyA9IFtdO1xuICB2YXIgY2hlY2tBcmdzTGVuZ3RoID0gaGFzQXJnc0VudW1CdWcgJiYgX2lzQXJndW1lbnRzKG9iaik7XG4gIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICghY2hlY2tBcmdzTGVuZ3RoIHx8IHByb3AgIT09ICdsZW5ndGgnKSkge1xuICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgfVxuICB9XG4gIGlmIChoYXNFbnVtQnVnKSB7XG4gICAgbklkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChuSWR4ID49IDApIHtcbiAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbklkeF07XG4gICAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICFjb250YWlucyhrcywgcHJvcCkpIHtcbiAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICB9XG4gICAgICBuSWR4IC09IDE7XG4gICAgfVxuICB9XG4gIHJldHVybiBrcztcbn0pO1xuZXhwb3J0IGRlZmF1bHQga2V5czsiLCJpbXBvcnQgX2NvbXBsZW1lbnQgZnJvbSAnLi9pbnRlcm5hbC9fY29tcGxlbWVudC5qcyc7XG5pbXBvcnQgX2N1cnJ5MiBmcm9tICcuL2ludGVybmFsL19jdXJyeTIuanMnO1xuaW1wb3J0IGZpbHRlciBmcm9tICcuL2ZpbHRlci5qcyc7XG5cbi8qKlxuICogVGhlIGNvbXBsZW1lbnQgb2YgW2BmaWx0ZXJgXSgjZmlsdGVyKS5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uIEZpbHRlcmFibGVcbiAqIG9iamVjdHMgaW5jbHVkZSBwbGFpbiBvYmplY3RzIG9yIGFueSBvYmplY3QgdGhhdCBoYXMgYSBmaWx0ZXIgbWV0aG9kIHN1Y2hcbiAqIGFzIGBBcnJheWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IGYgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gZmlsdGVyYWJsZVxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAc2VlIFIuZmlsdGVyLCBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGlzT2RkID0gKG4pID0+IG4gJSAyID09PSAxO1xuICpcbiAqICAgICAgUi5yZWplY3QoaXNPZGQsIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLnJlamVjdChpc09kZCwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YjogMiwgZDogNH1cbiAqL1xudmFyIHJlamVjdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHJlamVjdChwcmVkLCBmaWx0ZXJhYmxlKSB7XG4gIHJldHVybiBmaWx0ZXIoX2NvbXBsZW1lbnQocHJlZCksIGZpbHRlcmFibGUpO1xufSk7XG5leHBvcnQgZGVmYXVsdCByZWplY3Q7IiwiaW1wb3J0IF9jdXJyeTEgZnJvbSAnLi9pbnRlcm5hbC9fY3VycnkxLmpzJztcbmltcG9ydCBfdG9TdHJpbmcgZnJvbSAnLi9pbnRlcm5hbC9fdG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gdmFsdWUuIGBldmFsYCdpbmcgdGhlIG91dHB1dFxuICogc2hvdWxkIHJlc3VsdCBpbiBhIHZhbHVlIGVxdWl2YWxlbnQgdG8gdGhlIGlucHV0IHZhbHVlLiBNYW55IG9mIHRoZSBidWlsdC1pblxuICogYHRvU3RyaW5nYCBtZXRob2RzIGRvIG5vdCBzYXRpc2Z5IHRoaXMgcmVxdWlyZW1lbnQuXG4gKlxuICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGBbb2JqZWN0IE9iamVjdF1gIHdpdGggYSBgdG9TdHJpbmdgIG1ldGhvZCBvdGhlclxuICogdGhhbiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AsIHRoaXMgbWV0aG9kIGlzIGludm9rZWQgd2l0aCBubyBhcmd1bWVudHNcbiAqIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS4gVGhpcyBtZWFucyB1c2VyLWRlZmluZWQgY29uc3RydWN0b3IgZnVuY3Rpb25zXG4gKiBjYW4gcHJvdmlkZSBhIHN1aXRhYmxlIGB0b1N0cmluZ2AgbWV0aG9kLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICogICAgICAgdGhpcy54ID0geDtcbiAqICAgICAgIHRoaXMueSA9IHk7XG4gKiAgICAgfVxuICpcbiAqICAgICBQb2ludC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiAnbmV3IFBvaW50KCcgKyB0aGlzLnggKyAnLCAnICsgdGhpcy55ICsgJyknO1xuICogICAgIH07XG4gKlxuICogICAgIFIudG9TdHJpbmcobmV3IFBvaW50KDEsIDIpKTsgLy89PiAnbmV3IFBvaW50KDEsIDIpJ1xuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgKiAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b1N0cmluZyg0Mik7IC8vPT4gJzQyJ1xuICogICAgICBSLnRvU3RyaW5nKCdhYmMnKTsgLy89PiAnXCJhYmNcIidcbiAqICAgICAgUi50b1N0cmluZyhbMSwgMiwgM10pOyAvLz0+ICdbMSwgMiwgM10nXG4gKiAgICAgIFIudG9TdHJpbmcoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9KTsgLy89PiAne1wiYmFyXCI6IDIsIFwiYmF6XCI6IDMsIFwiZm9vXCI6IDF9J1xuICogICAgICBSLnRvU3RyaW5nKG5ldyBEYXRlKCcyMDAxLTAyLTAzVDA0OjA1OjA2WicpKTsgLy89PiAnbmV3IERhdGUoXCIyMDAxLTAyLTAzVDA0OjA1OjA2LjAwMFpcIiknXG4gKi9cbnZhciB0b1N0cmluZyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHRvU3RyaW5nKHZhbCkge1xuICByZXR1cm4gX3RvU3RyaW5nKHZhbCwgW10pO1xufSk7XG5leHBvcnQgZGVmYXVsdCB0b1N0cmluZzsiLCJpbXBvcnQgX2N1cnJ5MSBmcm9tICcuL2ludGVybmFsL19jdXJyeTEuanMnO1xuXG4vKipcbiAqIEdpdmVzIGEgc2luZ2xlLXdvcmQgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSAobmF0aXZlKSB0eXBlIG9mIGEgdmFsdWUsXG4gKiByZXR1cm5pbmcgc3VjaCBhbnN3ZXJzIGFzICdPYmplY3QnLCAnTnVtYmVyJywgJ0FycmF5Jywgb3IgJ051bGwnLiBEb2VzIG5vdFxuICogYXR0ZW1wdCB0byBkaXN0aW5ndWlzaCB1c2VyIE9iamVjdCB0eXBlcyBhbnkgZnVydGhlciwgcmVwb3J0aW5nIHRoZW0gYWxsIGFzXG4gKiAnT2JqZWN0Jy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBUeXBlXG4gKiBAc2lnICgqIC0+IHsqfSkgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudHlwZSh7fSk7IC8vPT4gXCJPYmplY3RcIlxuICogICAgICBSLnR5cGUoMSk7IC8vPT4gXCJOdW1iZXJcIlxuICogICAgICBSLnR5cGUoZmFsc2UpOyAvLz0+IFwiQm9vbGVhblwiXG4gKiAgICAgIFIudHlwZSgncycpOyAvLz0+IFwiU3RyaW5nXCJcbiAqICAgICAgUi50eXBlKG51bGwpOyAvLz0+IFwiTnVsbFwiXG4gKiAgICAgIFIudHlwZShbXSk7IC8vPT4gXCJBcnJheVwiXG4gKiAgICAgIFIudHlwZSgvW0Etel0vKTsgLy89PiBcIlJlZ0V4cFwiXG4gKiAgICAgIFIudHlwZSgoKSA9PiB7fSk7IC8vPT4gXCJGdW5jdGlvblwiXG4gKiAgICAgIFIudHlwZSh1bmRlZmluZWQpOyAvLz0+IFwiVW5kZWZpbmVkXCJcbiAqL1xudmFyIHR5cGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB0eXBlKHZhbCkge1xuICByZXR1cm4gdmFsID09PSBudWxsID8gJ051bGwnIDogdmFsID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNsaWNlKDgsIC0xKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgdHlwZTsiLCJpbXBvcnQgeyB2bm9kZSB9IGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5mdW5jdGlvbiBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKSB7XG4gICAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgaWYgKHNlbCAhPT0gJ2ZvcmVpZ25PYmplY3QnICYmIGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRGF0YSA9IGNoaWxkcmVuW2ldLmRhdGE7XG4gICAgICAgICAgICBpZiAoY2hpbGREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGROUyhjaGlsZERhdGEsIGNoaWxkcmVuW2ldLmNoaWxkcmVuLCBjaGlsZHJlbltpXS5zZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGlzLnByaW1pdGl2ZShjaGlsZHJlbltpXSkpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSB2bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgdW5kZWZpbmVkKTtcbn1cbjtcbmV4cG9ydCBkZWZhdWx0IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG59XG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG59XG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xuICAgIHJldHVybiBlbG0udGFnTmFtZTtcbn1cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG59XG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xufVxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcbn1cbmV4cG9ydCB2YXIgaHRtbERvbUFwaSA9IHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnROUzogY3JlYXRlRWxlbWVudE5TLFxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gICAgcGFyZW50Tm9kZTogcGFyZW50Tm9kZSxcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBzZXRUZXh0Q29udGVudDogc2V0VGV4dENvbnRlbnQsXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzVGV4dDogaXNUZXh0LFxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxufTtcbmV4cG9ydCBkZWZhdWx0IGh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcCIsImV4cG9ydCB2YXIgYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZXhwb3J0IGZ1bmN0aW9uIHByaW1pdGl2ZShzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcyA9PT0gJ251bWJlcic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy5qcy5tYXAiLCJpbXBvcnQgdm5vZGUgZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBodG1sRG9tQXBpIGZyb20gJy4vaHRtbGRvbWFwaSc7XG5mdW5jdGlvbiBpc1VuZGVmKHMpIHsgcmV0dXJuIHMgPT09IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gaXNEZWYocykgeyByZXR1cm4gcyAhPT0gdW5kZWZpbmVkOyB9XG52YXIgZW1wdHlOb2RlID0gdm5vZGUoJycsIHt9LCBbXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuZnVuY3Rpb24gc2FtZVZub2RlKHZub2RlMSwgdm5vZGUyKSB7XG4gICAgcmV0dXJuIHZub2RlMS5rZXkgPT09IHZub2RlMi5rZXkgJiYgdm5vZGUxLnNlbCA9PT0gdm5vZGUyLnNlbDtcbn1cbmZ1bmN0aW9uIGlzVm5vZGUodm5vZGUpIHtcbiAgICByZXR1cm4gdm5vZGUuc2VsICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICAgIHZhciBpLCBtYXAgPSB7fSwga2V5LCBjaDtcbiAgICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgICAgICBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAga2V5ID0gY2gua2V5O1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG1hcFtrZXldID0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufVxudmFyIGhvb2tzID0gWydjcmVhdGUnLCAndXBkYXRlJywgJ3JlbW92ZScsICdkZXN0cm95JywgJ3ByZScsICdwb3N0J107XG5leHBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmV4cG9ydCB7IHRodW5rIH0gZnJvbSAnLi90aHVuayc7XG5leHBvcnQgZnVuY3Rpb24gaW5pdChtb2R1bGVzLCBkb21BcGkpIHtcbiAgICB2YXIgaSwgaiwgY2JzID0ge307XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbERvbUFwaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGhvb2sgPSBtb2R1bGVzW2pdW2hvb2tzW2ldXTtcbiAgICAgICAgICAgIGlmIChob29rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjYnNbaG9va3NbaV1dLnB1c2goaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgICAgIHZhciBpZCA9IGVsbS5pZCA/ICcjJyArIGVsbS5pZCA6ICcnO1xuICAgICAgICB2YXIgYyA9IGVsbS5jbGFzc05hbWUgPyAnLicgKyBlbG0uY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignLicpIDogJyc7XG4gICAgICAgIHJldHVybiB2bm9kZShhcGkudGFnTmFtZShlbG0pLnRvTG93ZXJDYXNlKCkgKyBpZCArIGMsIHt9LCBbXSwgdW5kZWZpbmVkLCBlbG0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVSbUNiKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJtQ2IoKSB7XG4gICAgICAgICAgICBpZiAoLS1saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBhcGkucGFyZW50Tm9kZShjaGlsZEVsbSk7XG4gICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudF8xLCBjaGlsZEVsbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW4sIHNlbCA9IHZub2RlLnNlbDtcbiAgICAgICAgaWYgKHNlbCA9PT0gJyEnKSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHZub2RlLnRleHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBQYXJzZSBzZWxlY3RvclxuICAgICAgICAgICAgdmFyIGhhc2hJZHggPSBzZWwuaW5kZXhPZignIycpO1xuICAgICAgICAgICAgdmFyIGRvdElkeCA9IHNlbC5pbmRleE9mKCcuJywgaGFzaElkeCk7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hJZHggPiAwID8gaGFzaElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgZG90ID0gZG90SWR4ID4gMCA/IGRvdElkeCA6IHNlbC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGFnID0gaGFzaElkeCAhPT0gLTEgfHwgZG90SWR4ICE9PSAtMSA/IHNlbC5zbGljZSgwLCBNYXRoLm1pbihoYXNoLCBkb3QpKSA6IHNlbDtcbiAgICAgICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ucykgPyBhcGkuY3JlYXRlRWxlbWVudE5TKGksIHRhZylcbiAgICAgICAgICAgICAgICA6IGFwaS5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgICAgICBpZiAoaGFzaCA8IGRvdClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdpZCcsIHNlbC5zbGljZShoYXNoICsgMSwgZG90KSk7XG4gICAgICAgICAgICBpZiAoZG90SWR4ID4gMClcbiAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdjbGFzcycsIHNlbC5zbGljZShkb3QgKyAxKS5yZXBsYWNlKC9cXC4vZywgJyAnKSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmNyZWF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgICAgICAgICAgIGlmIChpLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkuaW5zZXJ0KVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlLmVsbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpLCBiZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rKHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBqLCBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5kZXN0cm95W2ldKHZub2RlKTtcbiAgICAgICAgICAgIGlmICh2bm9kZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB2bm9kZS5jaGlsZHJlbltqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gbnVsbCAmJiB0eXBlb2YgaSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBpXzEgPSB2b2lkIDAsIGxpc3RlbmVycyA9IHZvaWQgMCwgcm0gPSB2b2lkIDAsIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKGNoLnNlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBjYnMucmVtb3ZlLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJtID0gY3JlYXRlUm1DYihjaC5lbG0sIGxpc3RlbmVycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaV8xID0gMDsgaV8xIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraV8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JzLnJlbW92ZVtpXzFdKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZihpXzEgPSBjaC5kYXRhKSAmJiBpc0RlZihpXzEgPSBpXzEuaG9vaykgJiYgaXNEZWYoaV8xID0gaV8xLnJlbW92ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfMShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudEVsbSwgY2guZWxtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgb2xkU3RhcnRJZHggPSAwLCBuZXdTdGFydElkeCA9IDA7XG4gICAgICAgIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgICAgICB2YXIgb2xkRW5kVm5vZGUgPSBvbGRDaFtvbGRFbmRJZHhdO1xuICAgICAgICB2YXIgbmV3RW5kSWR4ID0gbmV3Q2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICAgICAgdmFyIG5ld0VuZFZub2RlID0gbmV3Q2hbbmV3RW5kSWR4XTtcbiAgICAgICAgdmFyIG9sZEtleVRvSWR4O1xuICAgICAgICB2YXIgaWR4SW5PbGQ7XG4gICAgICAgIHZhciBlbG1Ub01vdmU7XG4gICAgICAgIHZhciBiZWZvcmU7XG4gICAgICAgIHdoaWxlIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggJiYgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdOyAvLyBWbm9kZSBtaWdodCBoYXZlIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2xkRW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3U3RhcnRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3RW5kVm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGRLZXlUb0lkeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHhJbk9sZCA9IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsbVRvTW92ZS5zZWwgIT09IG5ld1N0YXJ0Vm5vZGUuc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUoZWxtVG9Nb3ZlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggfHwgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhcnRJZHggPiBvbGRFbmRJZHgpIHtcbiAgICAgICAgICAgICAgICBiZWZvcmUgPSBuZXdDaFtuZXdFbmRJZHggKyAxXSA9PSBudWxsID8gbnVsbCA6IG5ld0NoW25ld0VuZElkeCArIDFdLmVsbTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGhvb2s7XG4gICAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YSkgJiYgaXNEZWYoaG9vayA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGhvb2sucHJlcGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodm5vZGUuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rO1xuICAgICAgICAgICAgaWYgKGlzRGVmKGkpICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpXG4gICAgICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpICYmIGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRDaCAhPT0gY2gpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkcmVuKGVsbSwgb2xkQ2gsIGNoLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKVxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBlbG0sIHBhcmVudDtcbiAgICAgICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wcmVbaV0oKTtcbiAgICAgICAgaWYgKCFpc1Zub2RlKG9sZFZub2RlKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgICAgIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGVsbSk7XG4gICAgICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnQsIHZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKGVsbSkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnQsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRlZFZub2RlUXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KGluc2VydGVkVm5vZGVRdWV1ZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnBvc3RbaV0oKTtcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFiYmRvbS5qcy5tYXAiLCJpbXBvcnQgeyBoIH0gZnJvbSAnLi9oJztcbmZ1bmN0aW9uIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuaykge1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbiAgICB2bm9kZS5kYXRhLmZuID0gdGh1bmsuZGF0YS5mbjtcbiAgICB2bm9kZS5kYXRhLmFyZ3MgPSB0aHVuay5kYXRhLmFyZ3M7XG4gICAgdGh1bmsuZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdGh1bmsuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB0aHVuay50ZXh0ID0gdm5vZGUudGV4dDtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG59XG5mdW5jdGlvbiBpbml0KHRodW5rKSB7XG4gICAgdmFyIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIHZub2RlID0gY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgY3VyLmFyZ3MpO1xuICAgIGNvcHlUb1RodW5rKHZub2RlLCB0aHVuayk7XG59XG5mdW5jdGlvbiBwcmVwYXRjaChvbGRWbm9kZSwgdGh1bmspIHtcbiAgICB2YXIgaSwgb2xkID0gb2xkVm5vZGUuZGF0YSwgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgb2xkQXJncyA9IG9sZC5hcmdzLCBhcmdzID0gY3VyLmFyZ3M7XG4gICAgaWYgKG9sZC5mbiAhPT0gY3VyLmZuIHx8IG9sZEFyZ3MubGVuZ3RoICE9PSBhcmdzLmxlbmd0aCkge1xuICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvbGRBcmdzW2ldICE9PSBhcmdzW2ldKSB7XG4gICAgICAgICAgICBjb3B5VG9UaHVuayhjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSwgdGh1bmspO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvcHlUb1RodW5rKG9sZFZub2RlLCB0aHVuayk7XG59XG5leHBvcnQgdmFyIHRodW5rID0gZnVuY3Rpb24gdGh1bmsoc2VsLCBrZXksIGZuLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcmdzID0gZm47XG4gICAgICAgIGZuID0ga2V5O1xuICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBoKHNlbCwge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgaG9vazogeyBpbml0OiBpbml0LCBwcmVwYXRjaDogcHJlcGF0Y2ggfSxcbiAgICAgICAgZm46IGZuLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgdGh1bms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHVuay5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0IGRlZmF1bHQgdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XG52YXIgaXMgPSByZXF1aXJlKFwiLi9pc1wiKTtcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoKHNlbCwgYiwgYykge1xuICAgIHZhciBkYXRhID0ge30sIGNoaWxkcmVuLCB0ZXh0LCBpO1xuICAgIGlmIChjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIGlmIChpcy5hcnJheShjKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShjKSkge1xuICAgICAgICAgICAgdGV4dCA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyAmJiBjLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbY107XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpcy5hcnJheShiKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShiKSkge1xuICAgICAgICAgICAgdGV4dCA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYiAmJiBiLnNlbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbYl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdm5vZGVfMS52bm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZHJlbltpXSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2VsWzBdID09PSAncycgJiYgc2VsWzFdID09PSAndicgJiYgc2VsWzJdID09PSAnZycgJiZcbiAgICAgICAgKHNlbC5sZW5ndGggPT09IDMgfHwgc2VsWzNdID09PSAnLicgfHwgc2VsWzNdID09PSAnIycpKSB7XG4gICAgICAgIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGVfMS52bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5oID0gaDtcbjtcbmV4cG9ydHMuZGVmYXVsdCA9IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0cy5odG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5odG1sRG9tQXBpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGRvbWFwaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMucHJpbWl0aXZlID0gcHJpbWl0aXZlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbnZhciB4bWxOUyA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnO1xudmFyIGNvbG9uQ2hhciA9IDU4O1xudmFyIHhDaGFyID0gMTIwO1xuZnVuY3Rpb24gdXBkYXRlQXR0cnMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgZWxtID0gdm5vZGUuZWxtLCBvbGRBdHRycyA9IG9sZFZub2RlLmRhdGEuYXR0cnMsIGF0dHJzID0gdm5vZGUuZGF0YS5hdHRycztcbiAgICBpZiAoIW9sZEF0dHJzICYmICFhdHRycylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRBdHRycyA9PT0gYXR0cnMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRBdHRycyA9IG9sZEF0dHJzIHx8IHt9O1xuICAgIGF0dHJzID0gYXR0cnMgfHwge307XG4gICAgLy8gdXBkYXRlIG1vZGlmaWVkIGF0dHJpYnV0ZXMsIGFkZCBuZXcgYXR0cmlidXRlc1xuICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgIHZhciBjdXIgPSBhdHRyc1trZXldO1xuICAgICAgICB2YXIgb2xkID0gb2xkQXR0cnNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyKSB7XG4gICAgICAgICAgICBpZiAoY3VyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChrZXkuY2hhckNvZGVBdCgwKSAhPT0geENoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDMpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhtbCBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZU5TKHhtbE5TLCBrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDUpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhsaW5rIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlTlMoeGxpbmtOUywga2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZW1vdmVkIGF0dHJpYnV0ZXNcbiAgICAvLyB1c2UgYGluYCBvcGVyYXRvciBzaW5jZSB0aGUgcHJldmlvdXMgYGZvcmAgaXRlcmF0aW9uIHVzZXMgaXQgKC5pLmUuIGFkZCBldmVuIGF0dHJpYnV0ZXMgd2l0aCB1bmRlZmluZWQgdmFsdWUpXG4gICAgLy8gdGhlIG90aGVyIG9wdGlvbiBpcyB0byByZW1vdmUgYWxsIGF0dHJpYnV0ZXMgd2l0aCB2YWx1ZSA9PSB1bmRlZmluZWRcbiAgICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgICAgICBpZiAoIShrZXkgaW4gYXR0cnMpKSB7XG4gICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmF0dHJpYnV0ZXNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQXR0cnMsIHVwZGF0ZTogdXBkYXRlQXR0cnMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuYXR0cmlidXRlc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF0dHJpYnV0ZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVDbGFzcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgY3VyLCBuYW1lLCBlbG0gPSB2bm9kZS5lbG0sIG9sZENsYXNzID0gb2xkVm5vZGUuZGF0YS5jbGFzcywga2xhc3MgPSB2bm9kZS5kYXRhLmNsYXNzO1xuICAgIGlmICghb2xkQ2xhc3MgJiYgIWtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZENsYXNzID09PSBrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZENsYXNzID0gb2xkQ2xhc3MgfHwge307XG4gICAga2xhc3MgPSBrbGFzcyB8fCB7fTtcbiAgICBmb3IgKG5hbWUgaW4gb2xkQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFrbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIGtsYXNzKSB7XG4gICAgICAgIGN1ciA9IGtsYXNzW25hbWVdO1xuICAgICAgICBpZiAoY3VyICE9PSBvbGRDbGFzc1tuYW1lXSkge1xuICAgICAgICAgICAgZWxtLmNsYXNzTGlzdFtjdXIgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuY2xhc3NNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQ2xhc3MsIHVwZGF0ZTogdXBkYXRlQ2xhc3MgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuY2xhc3NNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGFzcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGludm9rZUhhbmRsZXIoaGFuZGxlciwgdm5vZGUsIGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gY2FsbCBmdW5jdGlvbiBoYW5kbGVyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh2bm9kZSwgZXZlbnQsIHZub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIHdpdGggYXJndW1lbnRzXG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlclswXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBhcmd1bWVudCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJbMF0uY2FsbCh2bm9kZSwgaGFuZGxlclsxXSwgZXZlbnQsIHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gaGFuZGxlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5hcHBseSh2bm9kZSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjYWxsIG11bHRpcGxlIGhhbmRsZXJzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnZva2VIYW5kbGVyKGhhbmRsZXJbaV0sIHZub2RlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCwgdm5vZGUpIHtcbiAgICB2YXIgbmFtZSA9IGV2ZW50LnR5cGUsIG9uID0gdm5vZGUuZGF0YS5vbjtcbiAgICAvLyBjYWxsIGV2ZW50IGhhbmRsZXIocykgaWYgZXhpc3RzXG4gICAgaWYgKG9uICYmIG9uW25hbWVdKSB7XG4gICAgICAgIGludm9rZUhhbmRsZXIob25bbmFtZV0sIHZub2RlLCBldmVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQsIGhhbmRsZXIudm5vZGUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB1cGRhdGVFdmVudExpc3RlbmVycyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uLCBvbGRMaXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyLCBvbGRFbG0gPSBvbGRWbm9kZS5lbG0sIG9uID0gdm5vZGUgJiYgdm5vZGUuZGF0YS5vbiwgZWxtID0gKHZub2RlICYmIHZub2RlLmVsbSksIG5hbWU7XG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciByZXVzZWQgaW1tdXRhYmxlIGhhbmRsZXJzXG4gICAgaWYgKG9sZE9uID09PSBvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgd2hpY2ggbm8gbG9uZ2VyIHVzZWRcbiAgICBpZiAob2xkT24gJiYgb2xkTGlzdGVuZXIpIHtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGRlbGV0ZWQgd2UgcmVtb3ZlIGFsbCBleGlzdGluZyBsaXN0ZW5lcnMgdW5jb25kaXRpb25hbGx5XG4gICAgICAgIGlmICghb24pIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBlbGVtZW50IHdhcyBjaGFuZ2VkIG9yIGV4aXN0aW5nIGxpc3RlbmVycyByZW1vdmVkXG4gICAgICAgICAgICAgICAgb2xkRWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgb2xkTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBleGlzdGluZyBsaXN0ZW5lciByZW1vdmVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgbmV3IGxpc3RlbmVycyB3aGljaCBoYXMgbm90IGFscmVhZHkgYXR0YWNoZWRcbiAgICBpZiAob24pIHtcbiAgICAgICAgLy8gcmV1c2UgZXhpc3RpbmcgbGlzdGVuZXIgb3IgY3JlYXRlIG5ld1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSB2bm9kZS5saXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyIHx8IGNyZWF0ZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIHVwZGF0ZSB2bm9kZSBmb3IgbGlzdGVuZXJcbiAgICAgICAgbGlzdGVuZXIudm5vZGUgPSB2bm9kZTtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGFkZGVkIHdlIGFkZCBhbGwgbmVlZGVkIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbGRPbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgbmV3IGxpc3RlbmVycyBhZGRlZFxuICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgbmV3IGxpc3RlbmVyIGFkZGVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbGRPbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZXZlbnRMaXN0ZW5lcnNNb2R1bGUgPSB7XG4gICAgY3JlYXRlOiB1cGRhdGVFdmVudExpc3RlbmVycyxcbiAgICB1cGRhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGRlc3Ryb3k6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50bGlzdGVuZXJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlUHJvcHMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgY3VyLCBvbGQsIGVsbSA9IHZub2RlLmVsbSwgb2xkUHJvcHMgPSBvbGRWbm9kZS5kYXRhLnByb3BzLCBwcm9wcyA9IHZub2RlLmRhdGEucHJvcHM7XG4gICAgaWYgKCFvbGRQcm9wcyAmJiAhcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkUHJvcHMgPT09IHByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkUHJvcHMgPSBvbGRQcm9wcyB8fCB7fTtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGZvciAoa2V5IGluIG9sZFByb3BzKSB7XG4gICAgICAgIGlmICghcHJvcHNba2V5XSkge1xuICAgICAgICAgICAgZGVsZXRlIGVsbVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgICAgIG9sZCA9IG9sZFByb3BzW2tleV07XG4gICAgICAgIGlmIChvbGQgIT09IGN1ciAmJiAoa2V5ICE9PSAndmFsdWUnIHx8IGVsbVtrZXldICE9PSBjdXIpKSB7XG4gICAgICAgICAgICBlbG1ba2V5XSA9IGN1cjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMucHJvcHNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlUHJvcHMsIHVwZGF0ZTogdXBkYXRlUHJvcHMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMucHJvcHNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEJpbmRpZyBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBsaWtlIHRoaXMgZml4ZXMgYSBidWcgaW4gSUUvRWRnZS4gU2VlICMzNjAgYW5kICM0MDkuXG52YXIgcmFmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKS5iaW5kKHdpbmRvdykpIHx8IHNldFRpbWVvdXQ7XG52YXIgbmV4dEZyYW1lID0gZnVuY3Rpb24gKGZuKSB7IHJhZihmdW5jdGlvbiAoKSB7IHJhZihmbik7IH0pOyB9O1xudmFyIHJlZmxvd0ZvcmNlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2V0TmV4dEZyYW1lKG9iaiwgcHJvcCwgdmFsKSB7XG4gICAgbmV4dEZyYW1lKGZ1bmN0aW9uICgpIHsgb2JqW3Byb3BdID0gdmFsOyB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBjdXIsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgb2xkU3R5bGUgPSBvbGRWbm9kZS5kYXRhLnN0eWxlLCBzdHlsZSA9IHZub2RlLmRhdGEuc3R5bGU7XG4gICAgaWYgKCFvbGRTdHlsZSAmJiAhc3R5bGUpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkU3R5bGUgPT09IHN0eWxlKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkU3R5bGUgPSBvbGRTdHlsZSB8fCB7fTtcbiAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xuICAgIHZhciBvbGRIYXNEZWwgPSAnZGVsYXllZCcgaW4gb2xkU3R5bGU7XG4gICAgZm9yIChuYW1lIGluIG9sZFN0eWxlKSB7XG4gICAgICAgIGlmICghc3R5bGVbbmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzBdID09PSAnLScgJiYgbmFtZVsxXSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGN1ciA9IHN0eWxlW25hbWVdO1xuICAgICAgICBpZiAobmFtZSA9PT0gJ2RlbGF5ZWQnICYmIHN0eWxlLmRlbGF5ZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUyIGluIHN0eWxlLmRlbGF5ZWQpIHtcbiAgICAgICAgICAgICAgICBjdXIgPSBzdHlsZS5kZWxheWVkW25hbWUyXTtcbiAgICAgICAgICAgICAgICBpZiAoIW9sZEhhc0RlbCB8fCBjdXIgIT09IG9sZFN0eWxlLmRlbGF5ZWRbbmFtZTJdKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldE5leHRGcmFtZShlbG0uc3R5bGUsIG5hbWUyLCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lICE9PSAncmVtb3ZlJyAmJiBjdXIgIT09IG9sZFN0eWxlW25hbWVdKSB7XG4gICAgICAgICAgICBpZiAobmFtZVswXSA9PT0gJy0nICYmIG5hbWVbMV0gPT09ICctJykge1xuICAgICAgICAgICAgICAgIGVsbS5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCBjdXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxtLnN0eWxlW25hbWVdID0gY3VyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gYXBwbHlEZXN0cm95U3R5bGUodm5vZGUpIHtcbiAgICB2YXIgc3R5bGUsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgcyA9IHZub2RlLmRhdGEuc3R5bGU7XG4gICAgaWYgKCFzIHx8ICEoc3R5bGUgPSBzLmRlc3Ryb3kpKVxuICAgICAgICByZXR1cm47XG4gICAgZm9yIChuYW1lIGluIHN0eWxlKSB7XG4gICAgICAgIGVsbS5zdHlsZVtuYW1lXSA9IHN0eWxlW25hbWVdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFwcGx5UmVtb3ZlU3R5bGUodm5vZGUsIHJtKSB7XG4gICAgdmFyIHMgPSB2bm9kZS5kYXRhLnN0eWxlO1xuICAgIGlmICghcyB8fCAhcy5yZW1vdmUpIHtcbiAgICAgICAgcm0oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXJlZmxvd0ZvcmNlZCkge1xuICAgICAgICBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLnRyYW5zZm9ybTtcbiAgICAgICAgcmVmbG93Rm9yY2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgaSA9IDAsIGNvbXBTdHlsZSwgc3R5bGUgPSBzLnJlbW92ZSwgYW1vdW50ID0gMCwgYXBwbGllZCA9IFtdO1xuICAgIGZvciAobmFtZSBpbiBzdHlsZSkge1xuICAgICAgICBhcHBsaWVkLnB1c2gobmFtZSk7XG4gICAgICAgIGVsbS5zdHlsZVtuYW1lXSA9IHN0eWxlW25hbWVdO1xuICAgIH1cbiAgICBjb21wU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsbSk7XG4gICAgdmFyIHByb3BzID0gY29tcFN0eWxlWyd0cmFuc2l0aW9uLXByb3BlcnR5J10uc3BsaXQoJywgJyk7XG4gICAgZm9yICg7IGkgPCBwcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoYXBwbGllZC5pbmRleE9mKHByb3BzW2ldKSAhPT0gLTEpXG4gICAgICAgICAgICBhbW91bnQrKztcbiAgICB9XG4gICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGV2LnRhcmdldCA9PT0gZWxtKVxuICAgICAgICAgICAgLS1hbW91bnQ7XG4gICAgICAgIGlmIChhbW91bnQgPT09IDApXG4gICAgICAgICAgICBybSgpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZm9yY2VSZWZsb3coKSB7XG4gICAgcmVmbG93Rm9yY2VkID0gZmFsc2U7XG59XG5leHBvcnRzLnN0eWxlTW9kdWxlID0ge1xuICAgIHByZTogZm9yY2VSZWZsb3csXG4gICAgY3JlYXRlOiB1cGRhdGVTdHlsZSxcbiAgICB1cGRhdGU6IHVwZGF0ZVN0eWxlLFxuICAgIGRlc3Ryb3k6IGFwcGx5RGVzdHJveVN0eWxlLFxuICAgIHJlbW92ZTogYXBwbHlSZW1vdmVTdHlsZVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuc3R5bGVNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB2bm9kZV8xID0gcmVxdWlyZShcIi4vdm5vZGVcIik7XG52YXIgaHRtbGRvbWFwaV8xID0gcmVxdWlyZShcIi4vaHRtbGRvbWFwaVwiKTtcbmZ1bmN0aW9uIHRvVk5vZGUobm9kZSwgZG9tQXBpKSB7XG4gICAgdmFyIGFwaSA9IGRvbUFwaSAhPT0gdW5kZWZpbmVkID8gZG9tQXBpIDogaHRtbGRvbWFwaV8xLmRlZmF1bHQ7XG4gICAgdmFyIHRleHQ7XG4gICAgaWYgKGFwaS5pc0VsZW1lbnQobm9kZSkpIHtcbiAgICAgICAgdmFyIGlkID0gbm9kZS5pZCA/ICcjJyArIG5vZGUuaWQgOiAnJztcbiAgICAgICAgdmFyIGNuID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIHZhciBjID0gY24gPyAnLicgKyBjbi5zcGxpdCgnICcpLmpvaW4oJy4nKSA6ICcnO1xuICAgICAgICB2YXIgc2VsID0gYXBpLnRhZ05hbWUobm9kZSkudG9Mb3dlckNhc2UoKSArIGlkICsgYztcbiAgICAgICAgdmFyIGF0dHJzID0ge307XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgICAgICB2YXIgbmFtZV8xO1xuICAgICAgICB2YXIgaSA9IHZvaWQgMCwgbiA9IHZvaWQgMDtcbiAgICAgICAgdmFyIGVsbUF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgICAgICB2YXIgZWxtQ2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXM7XG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSBlbG1BdHRycy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWVfMSA9IGVsbUF0dHJzW2ldLm5vZGVOYW1lO1xuICAgICAgICAgICAgaWYgKG5hbWVfMSAhPT0gJ2lkJyAmJiBuYW1lXzEgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgICAgICBhdHRyc1tuYW1lXzFdID0gZWxtQXR0cnNbaV0ubm9kZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDAsIG4gPSBlbG1DaGlsZHJlbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godG9WTm9kZShlbG1DaGlsZHJlbltpXSwgZG9tQXBpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdChzZWwsIHsgYXR0cnM6IGF0dHJzIH0sIGNoaWxkcmVuLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhcGkuaXNUZXh0KG5vZGUpKSB7XG4gICAgICAgIHRleHQgPSBhcGkuZ2V0VGV4dENvbnRlbnQobm9kZSk7XG4gICAgICAgIHJldHVybiB2bm9kZV8xLmRlZmF1bHQodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGV4dCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFwaS5pc0NvbW1lbnQobm9kZSkpIHtcbiAgICAgICAgdGV4dCA9IGFwaS5nZXRUZXh0Q29udGVudChub2RlKTtcbiAgICAgICAgcmV0dXJuIHZub2RlXzEuZGVmYXVsdCgnIScsIHt9LCBbXSwgdGV4dCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdm5vZGVfMS5kZWZhdWx0KCcnLCB7fSwgW10sIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxufVxuZXhwb3J0cy50b1ZOb2RlID0gdG9WTm9kZTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvVk5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b3Zub2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0cy52bm9kZSA9IHZub2RlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXAiLCJcbmNvbnN0IERQSSA9IDcyO1xuY29uc3QgRSA9IE1hdGgucm91bmQoMi41ICogRFBJKTtcbmNvbnN0IG11ID0gMS8zO1xuY29uc3Qgc2VwYXJhdGlvbiA9IChaKSA9PiBNYXRoLnJvdW5kKCgoMS1tdSpaKSpFKS8oMi1tdSpaKSk7XG5cbmNvbnN0IG1heFggPSA1MDA7XG5jb25zdCBtYXhZID0gNTAwO1xuXG5jb25zdCByYW5kb20gPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcblxuY29uc3QgRHJhd0F1dG9TdGVyZW9ncmFtID0gKFopID0+IHtcbiAgY29uc3Qgb3V0cHV0ID0gWy4uLkFycmF5KG1heFkpXS5tYXAoKCkgPT4gWy4uLkFycmF5KG1heFgpXSk7XG4gIGZvciAobGV0IHk9MDsgeTxtYXhZOyB5KyspIHtcbiAgICBsZXQgcGl4ID0gQXJyYXkobWF4WCk7XG4gICAgbGV0IHNhbWUgPSBBcnJheShtYXhYKTtcblxuICAgIGZvciAobGV0IHg9MDsgeDxtYXhYOyB4KyspIHtcbiAgICAgIHNhbWVbeF0gPSB4O1xuICAgIH1cblxuICAgIGZvciAobGV0IHg9MDsgeDxtYXhYOyB4KyspIHtcbiAgICAgIGNvbnN0IHMgPSBzZXBhcmF0aW9uKFpbeV1beF0pO1xuICAgICAgbGV0IGxlZnQgPSB4IC0gTWF0aC5mbG9vcihzLzIpO1xuICAgICAgbGV0IHJpZ2h0ID0gbGVmdCArIHM7XG4gICAgICBpZiAoMCA8PSBsZWZ0ICYmIHJpZ2h0IDwgbWF4WCkge1xuICAgICAgICBsZXQgdmlzaWJsZSA9IG51bGw7XG4gICAgICAgIGxldCB0ID0gMTtcbiAgICAgICAgbGV0IHp0ID0gbnVsbDtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgenQgPSBaW3ldW3hdICsgMiooMiAtIG11ICogWlt5XVt4XSkgKiB0LyhtdSpFKTtcbiAgICAgICAgICB2aXNpYmxlID0gWlt5XVt4LXRdIDwgenQgJiYgWlt5XVt4K3RdPHp0O1xuICAgICAgICAgIHQrK1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh2aXNpYmxlICYmIHp0IDwgMSk7XG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgbGV0IGwgPSBzYW1lW2xlZnRdO1xuICAgICAgICAgIHdoaWxlIChsICE9IGxlZnQgJiYgbCAhPSByaWdodCkge1xuICAgICAgICAgICAgaWYgKGwgPCByaWdodCkge1xuICAgICAgICAgICAgICBsZWZ0ID0gbDtcbiAgICAgICAgICAgICAgbCA9IHNhbWVbbGVmdF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzYW1lW2xlZnRdID0gcmlnaHQ7XG4gICAgICAgICAgICAgIGxlZnQgPSByaWdodDtcbiAgICAgICAgICAgICAgbCA9IHNhbWVbbGVmdF07XG4gICAgICAgICAgICAgIHJpZ2h0ID0gbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2FtZVtsZWZ0XSA9IHJpZ2h0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCB4ID0gbWF4WC0xIDsgeCA+PSAwOyB4LS0pIHtcbiAgICAgICAgaWYgKHNhbWVbeF0gPT0geCkge1xuICAgICAgICAgIHBpeFt4XSA9IHJhbmRvbSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBpeFt4XSA9IHBpeFtzYW1lW3hdXTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRbeV1beF0gPSBwaXhbeF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IHsgRHJhd0F1dG9TdGVyZW9ncmFtIH07IiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5jb25zdCBmbHlkID0gcmVxdWlyZSgnZmx5ZCcpO1xuY29uc3Qgc25hYmJkb20gPSByZXF1aXJlKCdzbmFiYmRvbScpO1xuY29uc3QgcGF0Y2ggPSBzbmFiYmRvbS5pbml0KFsgLy8gSW5pdCBwYXRjaCBmdW5jdGlvbiB3aXRoIGNob3NlbiBtb2R1bGVzXG4gIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvY2xhc3MnKS5kZWZhdWx0LCAvLyBtYWtlcyBpdCBlYXN5IHRvIHRvZ2dsZSBjbGFzc2VzXG4gIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvcHJvcHMnKS5kZWZhdWx0LCAvLyBmb3Igc2V0dGluZyBwcm9wZXJ0aWVzIG9uIERPTSBlbGVtZW50c1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL3N0eWxlJykuZGVmYXVsdCwgLy8gaGFuZGxlcyBzdHlsaW5nIG9uIGVsZW1lbnRzIHdpdGggc3VwcG9ydCBmb3IgYW5pbWF0aW9uc1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMnKS5kZWZhdWx0LCAvLyBmb3Igc2V0dGluZyBhdHRyaWJ1dGVzIG9uIERPTSBlbGVtZW50c1xuICByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzJykuZGVmYXVsdCwgLy8gYXR0YWNoZXMgZXZlbnQgbGlzdGVuZXJzXG5dKTtcbmNvbnN0IGggPSByZXF1aXJlKCdzbmFiYmRvbS9oJykuZGVmYXVsdDsgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBjcmVhdGluZyB2bm9kZXNcbmNvbnN0IHRvVk5vZGUgPSByZXF1aXJlKCdzbmFiYmRvbS90b3Zub2RlJykuZGVmYXVsdDtcblxuY29uc3QgcXMgPSBSLmludm9rZXIoMSwgJ3F1ZXJ5U2VsZWN0b3InKTtcbmNvbnN0IHFzQWxsID0gUi5pbnZva2VyKDEsICdxdWVyeVNlbGVjdG9yQWxsJyk7XG5cbmNvbnN0IGwgPSBSLmN1cnJ5KCh0YWcsIHgpID0+IHtjb25zb2xlLmxvZyh0YWcsIHgpOyByZXR1cm4geH0pXG5cbmNvbnN0IG9uUmVhZHkgPSAoY2IpID0+IHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIlxuICAgICAgIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGVkXCJcbiAgICAgICB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICBjYi5iaW5kKHRoaXMpKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiLmJpbmQodGhpcykpO1xuICB9XG59XG5cbmNvbnN0IG1vdW50ZXJGb3IgPSAoQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IHt2aWV3LCB1cGRhdGV9ID0gQ29tcG9uZW50O1xuICByZXR1cm4gKGluaXRpYWxTdGF0ZSwgY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgYWN0aW9uJCA9IGZseWQuc3RyZWFtKCk7XG4gICAgY29uc3QgbW9kZWwkID0gZmx5ZC5zY2FuKFIuZmxpcCh1cGRhdGUpLCBpbml0aWFsU3RhdGUsIGFjdGlvbiQpO1xuICAgIGNvbnN0IHZub2RlJCA9IGZseWQubWFwKHZpZXcoYWN0aW9uJCksIG1vZGVsJCk7XG4gICAgZmx5ZC5zY2FuKHBhdGNoLCBjb250YWluZXIsIHZub2RlJCk7XG4gIH1cbn1cblxuY29uc3Qgbm9GUlBNb3VudGVyRm9yID0gKENvbXBvbmVudCkgPT4ge1xuICBjb25zdCB7dmlldywgdXBkYXRlfSA9IENvbXBvbmVudDtcbiAgcmV0dXJuIChvbGRTdGF0ZSwgb2xkVm5vZGUpID0+IHtcbiAgICBjb25zdCBuZXdWbm9kZSA9IHZpZXcoKGFjdGlvbikgPT4ge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB1cGRhdGUob2xkU3RhdGUsIGFjdGlvbik7XG4gICAgICBydW4obmV3U3RhdGUsIG5ld1Zub2RlKTtcbiAgICB9LCBvbGRTdGF0ZSk7XG4gICAgcGF0Y2gob2xkVm5vZGUsIG5ld1Zub2RlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBwYXRjaCwgb25SZWFkeSwgbW91bnRlckZvciwgdG9WTm9kZSwgaCwgbCwgcXN9O1xuZXhwb3J0IHtcbiAgcXMsXG4gIHFzQWxsLFxuICBvblJlYWR5LFxuICBtb3VudGVyRm9yLFxuICB0b1ZOb2RlLFxuICBwYXRjaCxcbiAgaCxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4uLy4uL3N0ZXJlb2dyYW0uaHRtbCc7XG5cbmltcG9ydCB7IG9uUmVhZHkgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IERyYXdBdXRvU3RlcmVvZ3JhbSB9IGZyb20gJy4uL2F1dG9zdGVyZW9ncmFtJztcblxuY29uc3QgcmFuZG9tUkdCID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcblxuY29uc3QgY2h1bmtBcnJheSA9IChhcnIsIHNpemUpID0+IHtcbiAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICBsZXQgc3RhcnQgPSAwO1xuXG4gIHdoaWxlIChzdGFydCA8IGFyci5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdHMucHVzaChhcnIuc2xpY2Uoc3RhcnQsIHN0YXJ0K3NpemUpKTtcbiAgICAgIHN0YXJ0ICs9IHNpemU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxub25SZWFkeSgoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcy5pbicpO1xuICBjb25zdCBvdXRDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMub3V0Jyk7XG4gIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBjb25zdCBjdHhPdXQgPSBvdXRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgY3R4LmxpbmVXaWR0aCA9IDMwO1xuICBsZXQgZHJhd2luZyA9IGZhbHNlO1xuXG4gIHdpbmRvdy5jYSA9IGNhbnZhcztcbiAgd2luZG93LmN0ID0gY3R4O1xuXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBkcmF3aW5nID0gdHJ1ZTtcbiAgfSk7XG5cbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcbiAgICBpZiAoZHJhd2luZykge1xuICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBkcmF3aW5nID0gZmFsc2U7XG4gIH0pO1xuXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaW1hZ2VEYXRhID0gYXdhaXQgY3R4LmdldEltYWdlRGF0YSgwLDAsNTAwLDUwMCk7XG4gICAgY29uc3Qgc291cmNlID0gY2h1bmtBcnJheShjaHVua0FycmF5KGltYWdlRGF0YS5kYXRhLCA0KS5tYXAocGl4ZWwgPT4gcGl4ZWxbM10pLm1hcChwID0+IHA9PTI1NSA/IDEgOiAwKSwgNTAwKTtcbiAgICBjb25zdCBzdGVyZW8gPSBEcmF3QXV0b1N0ZXJlb2dyYW0oc291cmNlKTtcbiAgICBjb25zdCBzID0gc3RlcmVvLmZsYXQoKTtcbiAgICBjb25zdCB0d281NSA9IHMubWFwKHggPT4geCA9PSAxID8gMjU1IDogMCk7XG4gICAgY29uc3QgcGl4MjU1ID0gdHdvNTUubWFwKHggPT4gWzAsIDAsIDAsIHhdKS5mbGF0KCk7XG4gICAgY29uc3QgZCA9IFVpbnQ4Q2xhbXBlZEFycmF5LmZyb20ocGl4MjU1KTtcbiAgICBjdHhPdXQucHV0SW1hZ2VEYXRhKG5ldyBJbWFnZURhdGEoZCwgNTAwLCA1MDApLCAwLCAwKTtcbiAgfSk7XG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==