'use strict';

/**
 *
 * @param  {...string|function} inputs
 */
function showChangedValues(...inputs) {
  let [action, ...strings] = inputs.reverse();
  if (action instanceof Function) {
    strings.reverse().forEach(str => {
      console.log(action(str));
    });
  }
}

showChangedValues('abc', 'def', 'foo', 'bar', str => {
  return str.toUpperCase();
});
