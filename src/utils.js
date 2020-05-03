/**
 * Checks if n is between start and up to, but not including, end.
 * If end is not specified, it's set to start with start then set to 0.
 * If start is greater than end the params are swapped to support negative ranges.
 *
 * @param {Number} num - The number to check.
 * @param {Number} [start=0] - The start of the range.
 * @param {Number} end - The end of the range.
 * @returns {Boolean} true if number is in the range otherwise false.
 */
function inRange(num, start = 0, end) {
  if (end === undefined) {
    end = start
    start = 0
  }
  return num >= Math.min(start, end) && num < Math.max(start, end)
}

/**
 * Invokes the iteratee n times, returning an array of the results of each invocation.
 *
 * @param {Number} n - The number of times to invoke the iteratee function.
 * @param {Function} [func = i => i] - The function invoked each iteration.
 * @returns {Array} The Array of results.
 */
function times(n, func = i => i) {
  return Array.from({ length: n }).map((_, i) => func(i))
}

/**
 * Creates a function that returns value.
 *
 * @param {*} value - The value to return from the new function.
 * @returns {Function} The new constant function.
 */
function constant(value) {
  return function() {
    return value
  }
}
/**
 * Creates a function that invokes func with boundArgs prepended to the arguments it receives.
 *
 * @param {Function} func - The function to partially apply arguments to.
 * @param  {...any} boundArgs - The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 */
function partial(func, ...boundArgs) {
  return function(...remainingArgs) {
    return func(...boundArgs, ...remainingArgs)
  }
}

/**
 * Checks if a is less than b.
 *
 * @param {*} a
 * @param {*} b
 * @returns {Boolean} Returns true if value is less than other, else false.
 */
function lessThan(a, b) {
  return a < b
}

function shuffle(a) {
  let counter = a.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = a[counter];
        a[counter] = a[index];
        a[index] = temp;
    }

  return a;
}

export { inRange, times, constant, partial, lessThan, shuffle }
