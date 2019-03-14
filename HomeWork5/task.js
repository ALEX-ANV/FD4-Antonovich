'use strict';

/**
 *
 * @param {string[]} items
 * @param {function(string, number, string[]):Promise} action
 *
 * @return {any[]}
 */
function ParallelAsyncMap(items, action) {
  return Promise.all(
    items.map((value, index, arr) => action(value, index, arr))
  );
}

/**
 *
 * @param {string[]} items
 * @param {function(string, number, string[]):Promise} action
 *
 * @return {any[]}
 */
async function SerialAsyncMap(items, action) {
  let results = [];
  for (let i = 0; i < items.length; i++) {
    let result = await action(items[i], i, items);
    results.push(result);
  }
  return results;
}

SerialAsyncMap(['a', 'b', 'c', 'd'], (value, index, arr) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), 2000);
    console.log(`${new Date().toLocaleTimeString()} ${value}`);
  });
}).then(t => console.log(t));

ParallelAsyncMap(['a', 'b', 'c', 'd'], (value, index, arr) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), 2000);
    console.log(`${new Date().toLocaleTimeString()} ${value}`);
  });
}).then(t => console.log(t));
