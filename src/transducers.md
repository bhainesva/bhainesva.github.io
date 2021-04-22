# Composable Process Transformations

## Overview
This article will look at how we can abstract transformation processes using transducers.
It will cover what transducers are, their motivation, and their application in an example case.

### Pre-requisites
Familiarity with the concept of higher order functions, function composition, map/filter/reduce.
Familiarity with ES6 spread syntax, arrow functions.

### Syntax
The first two parts are plain javascript, with the assumption of:
* a function called `compose` used for function composition
* an implementation of `reduce` with arguments `(reducer, initialValue, input)`, as opposed to javascript's normal `Array.reduce(reducer, initialValue)` implementation

In part 3 we also assume that the `reduce` implementation supports early exit by returning a value wrapped with a special `reduced` function. ([ramda](https://ramdajs.com/) is a specific implementation like this)

## Part 1: Problem Statement

A core idea of functional programming is the building up of complex programs through composition of simpler functions. A common type of program is one that transforms input data of a particular form into output through a succession of steps, where each step takes an input and integrates it into some result (the generalization of this type of step transformation is `reduce`). In this context, two of the fundamental tools of functional programming which are frequently used are the functions `map` and `filter`.

These functions abstract two different types of transformations and allow us to concisely express processes that combine these transformations. For example, to find the odd numbers among the first five squares we could write:
`[1, 2, 3, 4, 5].map(x => x*x).filter(x % 2 == 1)`.

However, there are some limitations to these functions:

1. They know too much

   `map` and `filter` are implemented for specific types, and their outputs are implied by their input type. If we call `Array.map` we get an array as output. If we want to `map` over something else (a string, stream, channel, collection, etc.) we need to implement `map` again. If we want to map from one type to a different type, we need yet another custom `map` implementation.

2. They can't be directly composed

   Given a collection of mapping functions {f<sub>1</sub>, f<sub>2</sub>, f<sub>3</sub>, ...} we can combine them into one map call with <code>array.map(compose(f<sub>1</sub>, f<sub>2</sub>, f<sub>3</sub>, ...))</code>, and similarly with a collection of predicates and `filter`. However, there's no way to directly compose a mapping transformation with a filtering transformation. This leads to situations like our odd squares example where we call `map` and `filter` in succession. Doing this creates intermediate data structures which can be inefficient.

Given these flaws, we can describe properties of a solution we're looking for. We would like to develop 'an abstraction of a transformative process' that captures the essence of mapping/filtering (and potentially other transformations). We want to end up with a composable 'unit of transformation.' Its composability implies that it shouldn't care about the source of its inputs or the type of its eventual outputs.

## Part 2: Solution

As mentioned above, the generalization of the type of step based transformations we're looking at is `reduce`. `reduce` takes an input source, a 'step' function, and an initial value. The step function takes a result, an item from the input, and produces a new result. `reduce` repeatedly calls the step function using an item from the input and the result of the previous step (or the initial value for the first invokation).


We can implement `map` and `filter` using reduce:
```javascript
const mapStepFunction = f => (result, item) => {
  const newValue = f(item);
  result.push(newValue);
  return result;
}
const map = (arr, f) => reduce(mapStepFunction(f), [], arr);

const filterStepFunction = p => (result, item) => {
  const keep = p(item);
  if (keep) result.push(item);
  return result;
}
const filter = (arr, p) => reduce(filterStepFunction(p), [], arr);
```

This implementation lets us see more clearly the things shared by `map`/`filter` and the parts of their implementation that are problematic. Each of them takes an input, uses it in some way, then integrates it into the result (or chooses not to in the case of filter). What we would like to avoid in our unit of transformation is any specific knowledge / manipulation of the `result`, specifically the `result.push` in these examples.

One way to do this is to think of the final result building as a separate step of the transformation, distinct from the mapping step. We can extract it as a step function that is passed in as an argument which we can then defer to.

```js
const getMappingTransformation = f => step => (result, item) => {
  const newValue = f(item);
  return step(result, newValue);
}
```

The result of calling `getMappingTransformation` with a specific mapping function, for example `getMappingTransformation(x => x * x)` is a new function which takes a step function as input and produces a modified step function as output. This type of function is called a transducer, and is our unit of transformation. Transducers modify step/reducing functions. Transducers avoid directly knowledge of `result` by deferring to their step function parameter, and because their inputs and outputs have the same type (a step function), they're directly composable.

For completeness, we can do the same thing with `filter`
```js
const getFilterTransducer = p => step => (result, item) => {
  const keep = p(item);
  if (keep) {
    return step(result, item);
  }
  return result;
}
```

### <a id="usage">Usage</a>

So what do we have to do to actually use these transducers? We need
1. A transducer
4. The final step function which is responsible for building the output, and is passed to the transducer
2. An input source
3. An initial value

We can implement a helper function called `transduce` like this:
```js
function transduce(transducer, step, init, input) {
  const transformedStep = transducer(step);
  return reduce(transformedStep, init, input)
}
```
**note:** It's simple enough to seem potentially pointless. The point is that transducers can be stateful. It is not necessarily safe to reuse `transformedStep`. This construction prevents accidental reuse of a 'stale' step function. We'll see an example of a stateful transducer later.

Returning to our original example of getting the odd numbers in the first five squares, we can implement it like this:
```js
const squareMapTransducer = step => (result, item) => {
  const square = item * item;
  return step(result, square);
}

const oddFilterTransducer = step => (result, item) => {
  if (item % 2 == 0) return result;
  return step(result, item);
}

transduce(
  compose(squareMapTransducer, oddFilterTransducer),
  (result, item) => [...result, item],
  [],
  [1, 2, 3, 4, 5]
);
// Out: [1, 9, 25]
```
**note:** we could also have used our `getFilterTransducer`/`getMapTransducer` helpers, but hopefully this more direct implementation makes it easier to conceptualize a transducer as a function that modifies the behavior of a step function

## Part 3: Extended Example
We are given a set of instructions like this:
```js
const instructions = [
  ['acc', 2],
  ['nop', 2],
  ['jmp', -1],
  ['nop', 0],
  ['acc', -1],
]
```
Each instruction consists of an operation (`acc, jmp, or nop`) and a numeric argument.

- acc increases or decreases a single global value called the accumulator by the value given in the argument. For example, acc +7 would increase the accumulator by 7. The accumulator starts at 0. After an acc instruction, the instruction immediately below it is executed next.
- jmp jumps to a new instruction relative to itself. The next instruction to execute is found using the argument as an offset from the jmp instruction; for example, jmp +2 would skip the next instruction, jmp +1 would continue to the instruction immediately below it, and jmp -20 would cause the instruction 20 lines above to be executed next.
- nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.

This particular set of instructions produces an infinite loop when executed. Our goal is to write a program that can execute these instructions and can also detect infinite loops. We should halt execution and output the value of the accumulator before any instruction is executed for a second time (indicating the start of a loop).

Our program will have an instruction pointer (`ip`) variable for keeping track of the index of the instruction to be executed and an accumulator variable `acc`.

Here is a possible solution:

<details>
<summary>Expand Code</summary>

```js
function findLoop(instructions) {
  const seenIPs = new Set();
  let ip = 0;
  let acc = 0;
  let i = 0;
  while (true) {
    // -------- Debug helpers ---------
    // 1. We don't want to induce an infinite loop as we're testing
    // before the loop detection is implemented, so manually
    // break after 10 iterations
    // i += 1;
    // if (i > 10) {
    //   return;
    // }

    // 2. Log each iteration so we can inspect the processor as it runs
    // console.log("ip: ", ip, "acc: ", acc);

    if (ip > instructions.length) {
      console.log("terminated normally!");
      return
    }

    const [op, arg] = instructions[ip];
    if (op === 'nop') ip += 1;
    if (op === 'acc') {
        ip += 1;
        acc += arg;
    }
    if (op === 'jmp') {
      ip += arg;
    }
    if (seenIPs.has(ip)) {
      console.log("Found a loop, acc value is: ", acc);
      return;
    }
  }
}
```
</details>
<br />




This solution works, but there are a lot of separate things mingling in this one function.
1. The core operation of the instruction processor, reading instructions and modifying the processor's state
2. Keeping track of seen states and aborting the process when we see a repeat
2. Logging
3. Breaking out at 10

Most of these things can be defined without reference to the core problem of interpreting instructions and it would be nice if we could encapsulate each of them in their own function. That way we would be able turn them on and off easily, and reuse them in other contexts if we'd like.

So let's think about the problem as a process of transformations and approach a solution using transducers.

Referring to the [parameters](#usage) of the `transduce` function described earlier, first we'll identify the base step function.

Storing the state of our processor in an object `{ip, acc}`, the core part of the problem fits nicely into the structure of a step function: `(state, instruction) => newState`.

<details>
  <summary>Expand Code</summary>

  ```js
  const defaultStep = (state, [op, arg]) => {
    if (op === 'nop') return {...state, ip: state.ip + 1}
    if (op === 'acc') return {ip: state.ip + 1, acc: state.acc + arg}
    if (op === 'jmp') return {...state, ip: state.ip + arg}
  }
  ```
</details>
<br />

Given this representation of our state, our initial value will be `{ip: 0, acc: 0}`.

Now let's implement each of our transformation steps as a transducer.

<details>
  <summary>1. Logging</summary>

  ```js
  const logging = step => (state, instruction) => {
    console.log("State: ", state);
    return step(state, instruction);
  }
  ```
</details>

<details>
  <summary>2. Limiting</summary>

  ```js
  // an example of a stateful transducer
  const take10 = step => {
    let count = 0;
    return (state, instruction) => {
      count += 1;
      // early termination with reduced
      // if our input were finite we could also just return state
      // and eventually hit the end, but that doesn't work in
      // this case
      if (count > 10) return reduced(state);
      return step(state, instruction);
    }
  }
  ```
</details>

<details>
  <summary>3. Loop Detection</summary>

  ```js
  const loopDetecting = step => {
    const seen = new Set();
    return (state, instruction) => {
      const hashedState = JSON.stringify(state);
      if (seen.has(hashedState)) return reduced(state);
      seen.add(hashedState);
      return step(state, instruction);
    }
  }
  ```
</details>
<br />

The last parameter to identify is the input. This case is slightly tricky, we don't want to reduce directly over `instructions`, since we're not processing each instruction in order. We want to recreate the `while(true)` from our initial solution. We can do that efficiently with an infinite generator.

```js
function* infiniteGenerator() {
  while (true) yield
}
```

since our input is now an infinite stream of `true`, we'll need one more transducer to actually get the instructions that will be fed into the transformation pipeline.

```js
const instructionFeedFor = instructions => step => (state, alwaysTrue) => {
  if (state.ip > instructions.length) return reduced(state);
  return step(state, instructions[state.ip]);
}
```
**note:** this is technically cheating a little since we shouldn't know about the structure of the state in our transducer. There's probably a cleaner way to do it...

Our final invocation then is:
```js
const transducer = compose(
  instructionFeedFor(instructions),
  take10,
  loopDetecting,
  logging
);
const finalState = transduce(transducer, defaultStep, {ip: 0, acc: 0}, infiniteGenerator())
console.log("Final Accumulator Value: ", finalState.acc);
```

This feels good! We can disable our debugging tools just by commenting out the relevant line of our transducer composition. If we want to run a version of our processor without loop detection it's similarly a one line change.

### Extension

This example problem was copied from [Day 8 of Advent of Code 2020](https://adventofcode.com/2020/day/8). Part 2 of the problem asks us to actually fix the loop and tells us we will be able to do so either by swapping one `jmp` operation for a `nop` or vice versa.

Once you've figured out an approach to a solution, how could you implement it using a transducer? (For an example solution you can check this [gist](https://gist.github.com/bhainesva/3b1078ad8e31cbbcd213a60b42839987)).

## Summary

Transducers modify step (also called reducing) functions.

Transducers allow us to think of transformation processes as a series of steps. We can compose these steps with each other in an efficient way, and their implementation does not depend on the source or sink of the process as a whole.

We've seen examples of using transducers for both finite and infinite processess, operating on arrays and generators.
## Notes
* The definition of a transducer here is a simplification. Technically a transducer doesn't modify a step function, it modifies a 'transformer' which is a set of three functions:
  * a reducing function called `step`
  * an `init` function and a `result` function

  These other functions are mostly irrelevant, I don't know a case where the init function is even called. But if you're using a transducer implementation like ramda, you'll have to define your transducers to align with this structure (see the [gist](https://gist.github.com/bhainesva/3b1078ad8e31cbbcd213a60b42839987) for an example, specifically the wrap function). By convention transformers are often called `xf`.

  In clojure a transformer is a single function with 3 arities.

* The ordering of things can be unintuitive. `compose` traditionally does things right to left, but transducers work by wrapping themselves around an existing reducer. So in a composition of transducers the first listed transducer will happen first.

* A nice thing about ramda is that many of its functions will automatically act as transducers in the appropriate context. This lets you do some things that would otherwise not seem to make sense, for example `R.transduce(R.compose(R.map(x => x+1), R.map(x => x+2)), (acc, x) => [...acc, x], [], [1, 2, 3])` will return `[4, 5, 6]` because `R.map` will contextually act as a transducer.

## References:
1. This blog series is the explanation that made it click for me: https://simplectic.com/blog/2014/transducers-explained-1/
1. Another good blog post about them: https://jrsinclair.com/articles/2019/magical-mystical-js-transducers/
1. Rich Hickey's talk about transducers: https://www.youtube.com/watch?v=6mTbuzafcII, it's good but uses lisp syntax so it's a little hard to follow if you're not used to that
1.  Clojure's reference page on transducers: https://clojure.org/reference/transducers
